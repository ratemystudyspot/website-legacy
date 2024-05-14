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
import ErrorPage from './Pages/Errorpage';
import Aboutpage from './Pages/Aboutpage';
import Spotspage from './Pages/Spotspage';
import Verify from './Pages/AuthForm/Verify';
import { 
  createBrowserRouter,
  Router,
  Routes,
  Route,
  RouterProvider,
  BrowserRouter,
} from 'react-router-dom';
import Layout from './Pages/Structure/Layout';

function App() {
  // init router
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Homepage />,
  //     errorElement: <ErrorPage />,
  //   },
  //   {
  //     path: "about",
  //     element: <Aboutpage />,
  //   },
  //   {
  //     path: "spots",
  //     element: <Spotspage />,
  //   },
  //   {
  //     path: "login",
  //     element: <LoginForm />,
  //   },
  //   {
  //     path: "signup",
  //     element: <RegisterForm />,
  //   },
  //   {
  //     path: "verify/:userId",
  //     element: <Verify />,
  //   },
  // ])

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

        {/* protected routes */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}> */}
          <Route path="spots/seek-a-spot" element={<Spotspage />} /> 
        {/* </Route> */}

        {/* error page */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
    
    
    // <RouterProvider router={router} />
  );
}

export default App;
