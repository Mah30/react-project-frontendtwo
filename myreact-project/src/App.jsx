/* import React from 'react'; */
import { Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
/* import { useEffect, useState } from 'react'; */
import Navbar from '../src/components/Navbar/Navbar';
/* import Sidebar from './components/Sidebar/Sidebar'; */
import Footer from '../src/components/Footbar/Footer';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Register/SignupPage';
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
import PrivateRoute from './components/PrivateRoute';
import AnonymousRoute from './components/AnonymousRoute';
import Classes from './pages/Classes/Classes';
import MyClasses from './pages/MyClasses/MyClasses';





function App() {
  
  return (
  
    <div>
     
      <Navbar />

  

      <main className={"styles.main"}> 

       

        <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<HomePage />} />


        <Route path="/login" element = {<AnonymousRoute><LoginPage/></AnonymousRoute>} />
        <Route path="/signup" element={<AnonymousRoute><SignupPage /></AnonymousRoute>} />

        {/* Rotas protegidas */}


        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />{/* PRIVATE PROFILE AQUI */}
        <Route path="/classes" element={<PrivateRoute><Classes/></PrivateRoute>} />
        <Route path="/myclasses" element={<PrivateRoute><MyClasses/></PrivateRoute>} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* PRIVATE PROFILE AQUI */}
        <Route path="/classes/:classId" element={<ClassesDetails />} /> {/* PRIVATE PROFILE AQUI */}
        <Route path="/bookings/:bookingId" element={<BookingDetails />} /> {/* PRIVATE PROFILE AQUI */}

        {/* Rota para páginas não encontradas */}
        <Route path="*" element={<NotFoundPage />} />

        </Routes>  

      

      </main>

      <Footer/>
  
    </div>

  )
  
  
}

export default App;
