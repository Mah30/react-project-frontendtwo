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
import Signup from './pages/Register/Signup';
import HomePage from './pages/HomePage/HomePage';
import Dashboard from './pages/Dashboard/Dashboard';
/* import ClassesDetails from './pages/ClassesDetails';
 */import BookingDetails from './pages/BookingDetailsPage/BookingDetailsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

import ClassesDetails from './pages/ClassesDetails/ClassesDetails';



import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css'; 



function App() {
  
  return (
  
    <div>
     
      <Navbar />

  

      <main className={"styles.main"}> 

      <BrowserRouter>  

        <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element = {<Login/>} />
        <Route path="/signup" element={<Signup />} />

        {/* Rotas protegidas */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/classes/:classId" element={<ClassesDetails />} /> 
        <Route path="/bookings/:bookingId" element={<BookingDetails />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Rota para páginas não encontradas */}
        <Route path="*" element={<NotFoundPage />} />

        </Routes>  

      </BrowserRouter> 

      </main>

      <Footer/>
  
    </div>

  )
  
  
}

export default App;
