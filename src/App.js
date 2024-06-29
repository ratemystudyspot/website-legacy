import { React, useState, useEffect } from 'react'
import './App.css';
import LoginForm from './Pages/AuthForm/LoginForm';
import RegisterForm from './Pages/AuthForm/RegisterForm';
import StudySpotCard from './Components/StudyCard/StudySpotCard';
import ButtonComponent from './Components/ButtonComponent';
import StudySpots from './SampleData/StudySpots';
import ListOfStudySpotCards from './Components/StudyCard/ListOfStudySpotCards';
import Homepage from './Pages/Homepage';
import UBCMap from './Components/UBCMap/UBCMap';
import ErrorPage from './Pages/Structure/Errorpage';
import Aboutpage from './Pages/Aboutpage';
import RecommendSpotspage from './Pages/RecommendSpotspage';
import Seekpage from './Pages/Seekpage'
import Verify from './Pages/AuthForm/Verify';
import { Route, Routes } from 'react-router-dom';
import Layout from './Pages/Structure/Layout';
import RequireAuth from './Pages/Structure/RequireAuth';
import Unauthorized from './Pages/Structure/Unauthorized';
import SpotDetail from './Pages/SpotDetailpage';
import Reset from './Pages/AuthForm/PasswordRecovery/ResetPage';
import AuthForm from './Pages/AuthForm/AuthForm';
import UserSettings from './Pages/UserSettingspage';
import useAuth from "./hooks/useAuth";
import { handleRefreshToken } from './Services/auth';
import { jwtDecode } from "jwt-decode";

function App() {
  // init roles
  const ROLES = {
    'User': process.env.REACT_APP_USER_ROLE,
  }

  const { auth, setAuth } = useAuth();
  const [authLoaded, setAuthLoaded] = useState(false);

  // on reload, fetch refresh token
  useEffect(() => {
    const fetchRefreshToken = async () => {
      try {
        let response = await handleRefreshToken();
        let accessToken = response.access_token;
        let accessTokenDecoded = jwtDecode(accessToken); // decode access token

        setAuth({ access_token: accessToken, user_info: accessTokenDecoded?.UserInfo }); // authorize user
        
        // delete all info related to access token
        response = null;
        accessToken = null;
        accessTokenDecoded = null;
      } catch (error) { // 2 scenarios: 1) user hasn't receive RT, about to login 2) expired RT
        console.error(error) 
        // TODO: need to also alert the user that they need to sign in again
        // alert("signed out -> refresh token expired") //delete this after todo implemention
      }
    }
    fetchRefreshToken();
  }, []);

  // use to check if auth has been recieved and can be readily used in app
  useEffect(() => {
    if (!authLoaded && Object.keys(auth).length !== 0) setAuthLoaded(true); // only use when authLoaded is false to prevent redundant reloads and when auth has information to ensure user has been authenticated
  }, [auth])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Homepage />} />
        <Route path="about" element={<Aboutpage />} />
        {/* <Route path="spots" element={<RecommendSpotspage />} /> */}
        <Route path="login" element={<AuthForm />} />
        <Route path="signup" element={<RegisterForm />} /> { /* MAYBE DELETE */}
        {/* <Route path="verify/:userId" element={<Verify />} /> !!!future todo*/}
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="spots/:id" element={<SpotDetail />} />

        {/* protected routes */}
        <Route element={<RequireAuth authLoaded={authLoaded} allowedRoles={[ROLES.User]} />}>
          <Route path="spots/seek-a-spot" element={<Seekpage />} />
          <Route path="user/settings" element={<UserSettings />} />
        </Route>

        {/* !!! protect these routes so that you cannot just access these pages */}
        <Route path="password/:token" element={<Reset />} />
        {/* <Route path="forgot-password/OTP" element={<OTPForm />} />  
        <Route path="forgot-password/recovered" element={<Recovered />} />  */}


        {/* error page */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
