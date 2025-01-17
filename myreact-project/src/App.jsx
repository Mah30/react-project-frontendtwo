import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
/* import { useEffect, useState } from 'react'; */
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage/AboutPage';
import CoursePage from './pages/CoursePage/CoursePage';
import New from './pages/New/New';
import TalkToUs from './pages/TalkToUs/TalkToUs';
import Login from './pages/Login/Login';
import CourseDetails from './pages/CourseDetails/CourseDetails';
import Register from './pages/Login/Register';
import UserSpace from './pages/UserSpace/UserSpace';


/* import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles'; */

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';




function App() {
  
  return (
  
    <div>
     
      <Navbar />

      <main className={"styles.main"}>  
        <Routes>
          <Route path='/' element = {<HomePage />} />
          <Route path='/homepage' element = {<HomePage/>} />
          <Route path = '/aboutpage' element = {<AboutPage />} />
          <Route path='/coursepage' element = {<CoursePage />} />
          <Route path='/new' element = {<New/>} />
          <Route path = '/talktous' element = {<TalkToUs />} />
          <Route path='/login/*' element = {<Login/>} />
          <Route path = '/register' element = {<Register />} />
          <Route path = '/course/:courseId' element = {<CourseDetails />} />
          <Route path = '/userspace' element = {<UserSpace />} />
 
        <Route path="*" element={<NotFoundPage />} /> 

        </Routes>  
      </main>

      <Footer/>
  
    </div>

  )
  
  
}

export default App
