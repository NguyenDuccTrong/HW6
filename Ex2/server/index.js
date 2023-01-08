const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const Pusher = require("pusher")
const multer = require("multer")
const {GridFsStorage} = require("multer-gridfs-storage")
const Grid = require("gridfs-stream")
const path = require("path")
const Posts = require("./models/postsModel")
const bodyParser = require("body-parser")

Grid.mongo = mongoose.mongo
dotenv.config()          
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected!")).catch((err) => console.log(err))

const PORT = process.env.PORT || 9000

const pusher = new Pusher({
    appId: process.env.PUSHER_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "ap1",
    useTLS: true
})

const connection = mongoose.createConnection(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let gfs;

mongoose.connection.once('open', () => {
    console.log('DB Connected')
    gfs = Grid(connection.db, mongoose.mongo)
    gfs.collection('images')
})

const storage = new GridFsStorage({
    url: process.env.MONGO_URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = `image-${Date.now()}${path.extname(file.originalname)}`
            const fileInfo = {
                filename: filename,
                bucketName: 'images'
            }
            resolve(fileInfo)
        })
    }
})

const upload = multer({storage})

mongoose.connection.once('open', () => {
    const changeStream = mongoose.connection.collection('post').watch()
    changeStream.on('change', change => {
        console.log(change)
        if(change.operationType === "insert") {
            console.log('Trigerring Pusher')
            pusher.trigger('post', 'inserted', {
                change: change
            })
        } else {
            console.log('Error trigerring Pusher')
        }
    })
})

app.get('/', (req, res) => {
    res.send('BACKEND IS RUNNING')
})

app.post('/upload/image', upload.single('file'), (req, res) => {
    res.status(201).send(req.file)
})

app.get('/images/single', (req, res) => {
    gfs.files.findOne({filename: req.query.name }, (err, file) => {
        if(err) {
            res.status(500).send(err)
        }else {
            if(!file || file.length === 0) {
                res.status(404).json({err: 'file not found'})
            }else {
                const readstream = gfs.createReadStream(file.filename)
                readstream.pipe(res)
            }
        }
    })
})

app.post('/upload/post', (req, res) => {
    const dbPost =req.body
    Posts.create(dbPost, (err, data) => {
        if(err)
            res.status(500).send(err)
        else   
            res.status(201).send(data)
    })
})

app.get('/posts', (req, res) => {
    Posts.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        }else{
            data.sort((b,a) => a.timestamp - b.timestamp)
            res.status(200).send(data)
        }
    })
})

app.listen(PORT, () => {
    console.log("Backend server is running!")
}) 