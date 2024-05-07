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
  RouterProvider,
} from 'react-router-dom';

import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  // init router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
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
    {
      path: "verify/:userId",
      element: <Verify />,
    },
    {
      path: "/secret",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <Verify />
        }
      ]
    }
  ])

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route
//       element={
//         <ProtectedRoute >
//           <Verify />
//         </ProtectedRoute>}
//       path="teams/:teamId"
//       loader={async ({ params }) => {
//         return fetch(
//           `/fake/api/teams/${params.teamId}.json`
//         );
//       }}
//       action={async ({ request }) => {
//         return updateFakeTeam(await request.formData());
//       }}
//       errorElement={<ErrorBoundary />}
//     />
//   )
// );

  // useEffect(() => {
  //   getUser();
  // }, []);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    
    // <div>
    //   <LoginForm />
    //   <RegisterForm />
    //   <Homepage></Homepage>
    // </div>
  );
}

export default App;
