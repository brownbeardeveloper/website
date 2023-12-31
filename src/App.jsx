import React, {useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, HashRouter } from 'react-router-dom';
import './styles/App.css'
import Home from './routes/Home';
import Page1 from './routes/Page1';
import Page2 from './routes/Page2';
import Page3 from './routes/Page3';
import Calendar from './routes/Calendar';
import Login from './routes/Login';
import CreateEvent from './routes/CreateEvent';
import Error from './routes/404';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === "true");

  useEffect(() => {
    localStorage.setItem("isAuth", isAuth);
  }, [isAuth]);

  return (
    <React.StrictMode>
      <HashRouter>
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/page1' element={<Page1 />} />
            <Route path='/page2' element={<Page2 />} />
            <Route path='/page3' element={<Page3 />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
            <Route path='/create-event' element={<CreateEvent />} />
            <Route path='*' element={<Error />} />
          </Routes>
        <Footer/>
      </HashRouter>
    </React.StrictMode>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))