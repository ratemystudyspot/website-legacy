import { React, useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import LoginForm from './Components/AuthForm/LoginForm';
import RegisterForm from './Components/AuthForm/RegisterForm';
import StudySpotCard from './Components/StudyCard/StudySpotCard';
import ButtonComponent from './Components/ButtonComponent';
import  { getUser } from './Services/userService';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      {
        currentForm === "login" ? <LoginForm onFormSwitch={toggleForm} /> : <RegisterForm onFormSwitch={toggleForm} />
      }
    </div>
  );
}

export default App;
