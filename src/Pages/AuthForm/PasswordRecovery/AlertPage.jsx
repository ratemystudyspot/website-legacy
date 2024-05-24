import { React, useState, useEffect } from 'react';
import '../AuthForm.css'
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useRecovery from '../../../hooks/useRecovery';
import { sendEmail } from '../../../Services/user';
import Loading from '../../Structure/LoadingPage';

const AlertPage = () => {
  const { recoveryState, setRecoveryState } = useRecovery();

  return (
    <div>
      <div className="wrapper">

        <div className="return">
          <button onClick={() => { setRecoveryState({ page: "login", email: recoveryState?.email }) }}>Back to Log in</button>
        </div>
      </div>
    </div>
  )
}

export default AlertPage;