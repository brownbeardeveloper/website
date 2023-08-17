import React, {useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './styles/App.css'
import Home from './routes/Home';
import Page1 from './routes/Page1';
import Page2 from './routes/Page2';
import Page3 from './routes/Page3';
import Calendar from './routes/Calendar';
import Login from './routes/Login';
import CreateEvent from './routes/CreateEvent';
import Error from './routes/404';
import Footer from './components/Footer';
import { useState } from 'react';


function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === "true");

  useEffect(() => {
    localStorage.setItem("isAuth", isAuth);
  }, [isAuth]);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Navbar />
        <Routes>
        {isAuth ? (<Route path='/create-event' element={<CreateEvent />} />) : null }
          <Route path='/' index element={<Home />} />
          <Route path='/page1' element={<Page1 />} />
          <Route path='/page2' element={<Page2 />} />
          <Route path='/page3' element={<Page3 />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </React.StrictMode>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))