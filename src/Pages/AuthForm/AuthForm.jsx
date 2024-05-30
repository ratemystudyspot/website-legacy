import { React } from 'react';
import './AuthForm.css'
import Login from './LoginForm.jsx'
import Recovery from './PasswordRecovery/RecoveryPage.jsx';
import Alert from './PasswordRecovery/AlertPage.jsx';
import Error from '../Structure/Errorpage.jsx';
import useRecovery from '../../hooks/useRecovery.js';

const AuthForm = () => {
  const { recoveryState } = useRecovery();

  const NavigatePages = () => {
    if (recoveryState?.page === "login") return <Login />
    if (recoveryState?.page === "recover") return <Recovery />
    if (recoveryState?.page === "alert") return <Alert />
    return <Error />;
  }

  return (
    <NavigatePages />
  )
}

export default AuthForm;