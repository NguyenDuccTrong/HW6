const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const Pusher = require("pusher")
const Posts = require("./models/postModel")

dotenv.config()          
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://0825916808:Trong01295916808sss@devweb.vrznfpv.mongodb.net/TrongMouth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected!")).catch((err) => console.log(err))

const PORT = process.env.PORT || 9000

const pusher = new Pusher({
  appId: "1535229",
  key: "fb906d61a3b37a8ceb5d",
  secret: "2fc13e26381ae6b34aab",
  cluster: "ap1",
  useTLS: true
})

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

app.post('/upload', (req, res) => {
    const dbPost = req.body
    Posts.create(dbPost, (err, data) => {
        if(err)
            res.status(500).send(err)
        else
            res.status(201).send(data)
    })
})

app.get('/sync', (req, res) => {
    Posts.find((err, data) => {
        if(err)
            res.status(500).send(err)
        else
            res.status(201).send(data)
    })
})


app.get('/', (req, res) => {
    res.send('BACKEND IS RUNNING')
  })
  
app.listen(PORT, () => {
    console.log("Backend server is running!")
}) 