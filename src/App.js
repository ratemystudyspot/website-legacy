import { React, useState, useEffect } from 'react'
import './App.css';
import LoginForm from './Pages/AuthForm/LoginForm';
import RegisterForm from './Pages/AuthForm/RegisterForm';
import StudySpotCard from './Components/StudyCard/StudySpotCard';
import ButtonComponent from './Components/ButtonComponent';
import  { getUser } from './Services/userService';
import StudySpots from './SampleData/StudySpots';
import ListOfStudySpotCards from './Components/StudyCard/ListOfStudySpotCards';
import Homepage from './Pages/Homepage';
import UBCMap from './Components/UBCMap/UBCMap';
import ErrorPage from './Pages/Structure/Errorpage';
import Aboutpage from './Pages/Aboutpage';
import Spotspage from './Pages/Spotspage';
import Seekpage from './Pages/Seekpage'
import Verify from './Pages/AuthForm/Verify';
import { 
  Routes,
  Route,
} from 'react-router-dom';
import Layout from './Pages/Structure/Layout';
import RequireAuth from './Pages/AuthForm/RequireAuth';
import Unauthorized from './Pages/Structure/Unauthorized';

function App() {
  // init roles
  const ROLES = {
    'User': 2004,
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Homepage />} />
        <Route path="about" element={<Aboutpage />} />
        <Route path="spots" element={<Spotspage />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<RegisterForm />} />
        <Route path="verify/:userId" element={<Verify />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="spots/seek-a-spot" element={<Seekpage />} /> 
        </Route>

        {/* error page */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
