import { React, useState, } from 'react';
import './AuthForm.css'
import Login from './LoginForm.jsx'
import Recovery from './PasswordRecovery/RecoveryPage.jsx';
import Reset from './PasswordRecovery/ResetPage.jsx';
import { RecoveryProvider } from '../../context/RecoveryProvider.js'
import useRecovery from '../../hooks/useRecovery.js';
import { useNavigate } from 'react-router-dom';

import { FaUser, FaLock } from "react-icons/fa";
import LogoComponent from '../../Components/LogoComponent.jsx';
import { getUser, createUser, checkCredentials } from '../../Services/user.js';
import useAuth from '../../hooks/useAuth.js';
import Alert from './PasswordRecovery/AlertPage.jsx';



const AuthForm = () => {
  const { recoveryState } = useRecovery();
  
  const navigate = useNavigate();

  const NavigatePages = () => {
    if (recoveryState?.page === "login") return <Login />
    if (recoveryState?.page === "recover") return <Recovery />
    if (recoveryState?.page === "alert") return <Alert />
    return navigate("/404-error-page-not-found"); // !!! fix
  }

  return (
    <NavigatePages />
  )
}

export default AuthForm;