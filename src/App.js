import { React, useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import LoginForm from './Components/AuthForm/LoginForm';
import RegisterForm from './Components/AuthForm/RegisterForm';
import StudySpotCard from './Components/StudyCard/StudySpotCard';
import ButtonComponent from './Components/ButtonComponent';
import  { getUser } from './Services/userService';
import StudySpots from './SampleData/StudySpots';
import ListOfStudySpotCards from './Components/StudyCard/ListOfStudySpotCards';
import Homepage from './Components/Homepage';
import UBCMap from './Components/UBCMap/UBCMap';
import Root from './routes/root';
import ErrorPage from './Components/Pages/Errorpage';
import Aboutpage from './Components/Pages/Aboutpage';
import Spotspage from './Components/Pages/Spotspage';
import { 
  createBrowserRouter, 
  RouterProvider,
} from 'react-router-dom';

function App() {
  // const [currentForm, setCurrentForm] = useState('login');

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // };
  
  // init router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
    },
    {
      path: "about/",
      element: <Aboutpage />,
    },
    {
      path: "spots/",
      element: <Spotspage />,
    },
    {
      path: "login/",
      element: <LoginForm />,
    },
    {
      path: "signup/",
      element: <RegisterForm />,
    },
  ]);


  // useEffect(() => {
  //   getUser();
  // }, []);
  return (
    <RouterProvider router={router} />
    // <div>
    //   {
    //     currentForm === "login" ? <LoginForm onFormSwitch={toggleForm} /> : <RegisterForm onFormSwitch={toggleForm} />
    //     <Homepage></Homepage>
    //   }
    // </div>
  );
}

export default App;
