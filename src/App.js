import React, { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Pages/Structure/Layout';
import useAuth from "./hooks/useAuth";
import { handleRefreshToken } from './Services/auth';
import { jwtDecode } from "jwt-decode";
import LoaderScreen from './Components/LoaderScreen/LoaderScreen';
// Lazy load components
const RequireAuth = lazy(() => import('./Pages/Structure/RequireAuth'));
const RegisterForm = lazy(() => import('./Pages/AuthForm/RegisterForm'));
const Homepage = lazy(() => import('./Pages/Homepage'));
const ErrorPage = lazy(() => import('./Pages/Structure/Errorpage'));
const Aboutpage = lazy(() => import('./Pages/Aboutpage'));
const RecommendSpotspage = lazy(() => import('./Pages/RecommendSpotspage'));
const Seekpage = lazy(() => import('./Pages/Seekpage'));
const Verify = lazy(() => import('./Pages/AuthForm/Verify'));
const Unauthorized = lazy(() => import('./Pages/Structure/Unauthorized'));
const SpotDetail = lazy(() => import('./Pages/SpotDetailpage'));
const Reset = lazy(() => import('./Pages/AuthForm/PasswordRecovery/ResetPage'));
const AuthForm = lazy(() => import('./Pages/AuthForm/AuthForm'));
const UserSettings = lazy(() => import('./Pages/UserSettingspage'));

function App() {
  // init roles
  const ROLES = {
    User: process.env.REACT_APP_USER_ROLE,
  };

  const { auth, setAuth } = useAuth();
  const [authLoaded, setAuthLoaded] = useState(false);
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    const fetchRefreshToken = async () => {
      try {
        var response = await handleRefreshToken();
        var accessToken = response.access_token;
        var accessTokenDecoded = jwtDecode(accessToken);

        setAuth({ access_token: accessToken, user_info: accessTokenDecoded?.UserInfo }); // authorize user

        // delete all info related to access token
        response = null;
        accessToken = null;
        accessTokenDecoded = null;
      } catch (error) { // 2 scenarios: 1) user hasn't receive RT, about to login 2) expired RT
        console.error(error);
        setAppLoaded(true);
      }
    }
    fetchRefreshToken();
  }, []);

  // use to check if auth has been recieved and can be readily used in app
  useEffect(() => {
    if (!authLoaded && Object.keys(auth).length !== 0) { // only use when authLoaded is false to prevent redundant reloads and when auth has information to ensure user has been authenticated
      setAuthLoaded(true)
      setAppLoaded(true);
      return;
    }
  }, [auth]);

  return (
    <Suspense fallback={<></>}>
      {appLoaded && // used to only load everything once pre-load things such as handling authorization has been complete
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route index element={<Homepage />} />
            <Route path="about" element={<Aboutpage />} />
            <Route path="spots/seek-a-spot" element={<Seekpage />} />
            <Route path="login" element={<AuthForm />} />
            <Route path="signup" element={<RegisterForm />} />
            {/* <Route path="verify/:userId" element={<Verify />} /> !!!future todo*/}
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="spots/:id" element={<SpotDetail />} />

            {/* protected routes */}
            <Route element={<RequireAuth authLoaded={authLoaded} setAuthLoaded={setAuthLoaded} allowedRoles={[ROLES.User]} />}>
              <Route path="spots/suggest-a-spot" element={<RecommendSpotspage />} />
              <Route path="user/settings" element={<UserSettings />} />
            </Route>
            {/* password reset */}
            <Route path="password/:token" element={<Reset />} />
            {/* error page */}
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      }
    </Suspense>
  );
};

export default App;
