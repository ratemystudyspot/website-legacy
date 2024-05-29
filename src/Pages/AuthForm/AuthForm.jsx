import { React } from 'react';
import './AuthForm.css'
import Login from './LoginForm.jsx'
import Recovery from './PasswordRecovery/RecoveryPage.jsx';
import Alert from './PasswordRecovery/AlertPage.jsx';
import useRecovery from '../../hooks/useRecovery.js';
import { useNavigate } from 'react-router-dom';




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