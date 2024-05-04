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
import Root from './routes/root';
import ErrorPage from './Components/Pages/Errorpage';
import Aboutpage from './Components/Pages/Aboutpage';
import Spotspage from './Components/Pages/Spotspage';
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route,
  Routes, 
  Link,
  RouterProvider,
  Outlet 
} from 'react-router-dom';

function App() {
  // const [currentForm, setCurrentForm] = useState('login');

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // };
  
  // init router
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path="/" element={<Root />}>
  //       <Route path="/about" element={<Aboutpage />} />
  //       <Route path="/spots" element={<Spotspage />} />
  //       <Route path="/login" element={<LoginForm /* onFormSwitch={toggleForm} */ />} />
  //       <Route path="/signup" element={<RegisterForm /* onFormSwitch={toggleForm} */ />} />
  //     </Route>
  //   )
  // )

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
    // <div>
    //   <RouterProvider router={router} />
    // </div>
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
