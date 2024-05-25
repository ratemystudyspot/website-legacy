import React from 'react';
import '../AuthForm.css'
import useRecovery from '../../../hooks/useRecovery';

const AlertPage = () => {
  const { recoveryState, setRecoveryState } = useRecovery();

  return (
    <div>
      <div className="wrapper">
        <p>{`If an account exists for ${recoveryState?.email}, you will get an email with instructions on resetting your password. If it doesn't arrive, be sure to check your spam folder.`}</p>
        <div className="return">
          <button onClick={() => { setRecoveryState({ page: "login", email: recoveryState?.email }) }}>Back to Log in</button>
        </div>
      </div>
    </div>
  )
}

export default AlertPage;