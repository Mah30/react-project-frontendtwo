/* import React from 'react'; */
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import './index.css';
/* import { useEffect, useState } from 'react'; */
import Navbar from '../src/components/Navbar/Navbar';
/* import Sidebar from './components/Sidebar/Sidebar'; */
import Footer from '../src/components/Footbar/Footer';
import Login from '../src/pages/Login/Login';
import Register from '../src/pages/Register/Register';



/* import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css'; */




function App() {
  
  return (
  
    <div>
     
      <Navbar />

  

      <main className={"styles.main"}> 

      <BrowserRouter>  

        <Routes>
        <Route path='/' element = {""} />
        {/* <Route path="*" element={<NotFoundPage />} />  */}
        <Route path='/login' element = {<Login/>} />
        <Route path='/register' element = {<Register/>} />
        </Routes>  

      </BrowserRouter> 

      </main>

      <Footer/>
  
    </div>

  )
  
  
}

export default App;
