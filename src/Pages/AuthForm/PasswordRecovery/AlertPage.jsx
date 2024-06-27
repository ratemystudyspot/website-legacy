import React from 'react';
import '../AuthForm.scss'
import useRecovery from '../../../hooks/useRecovery';

const AlertPage = () => {
  const { recoveryState, setRecoveryState } = useRecovery();

  return (
    <div className="auth-box">
      <p>{`If an account exists for ${recoveryState?.email}, you will get an email with instructions on resetting your password. If it doesn't arrive, be sure to check your spam folder.`}</p>
      <div className="auth-box__return-container">
        <button
          className="auth-box__return-button"
          onClick={() => { setRecoveryState({ ...recoveryState, page: "login", email: recoveryState?.email }) }}
        >
          Back to Log in
        </button>
      </div>
    </div>
  )
}

export default AlertPage;