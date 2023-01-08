import './App.css';
import Feed from './components/Feed';
import Header from './components/Header';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Widget from './components/Widget';
import { useStateValue } from './StateProvider';
import styled from 'styled-components';

function App() {
  const [{user}, dispatch] = useStateValue()
  return (
    <AppWrapper>
      {user ? (
        <>
          <Header />
          <div className='app__body'>
            <Sidebar />
            <Feed />
            <Widget />
          </div>
        </>
      ) : (
        <Login />
      )}
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  background-color: #f1f2f5;
  .app__body{
    display: flex;
  }
`

export default App;
