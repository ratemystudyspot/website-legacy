import { React, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import LoginForm from './Components/AuthForm/LoginForm';
import RegisterForm from './Components/AuthForm/RegisterForm';
import StudySpotCard from './Components/StudyCard/StudySpotCard';
import ButtonComponent from './Components/ButtonComponent';
import StudySpots from './SampleData/StudySpots';
import ListOfStudySpotCards from './Components/StudyCard/ListOfStudySpotCards';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div>
      {
        currentForm === "login" ? <LoginForm onFormSwitch={toggleForm} /> : <RegisterForm onFormSwitch={toggleForm}/>
      }
    </div>
  );
}

export default App;
