import { React, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { updatePassword } from "../../../Services/auth";

const ResetPage = () => {
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [match, setMatch] = useState(true);
  const [invalidPwd, setInvalidPwd] = useState(false);
  const [submit, setSubmit] = useState(false);

  const navigate = useNavigate();

  const validatePwd = (pwd) => {
    const pwd_regex = /.{8,}/;
    return pwd_regex.test(pwd);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setInvalidPwd(!validatePwd(pwd)); // for password requirement case
    // for matching case
    if (pwd === confirmPwd) {
      setMatch(true);
    } else {
      setMatch(false);
    }

    setSubmit(true); // if passwords reach the password criteria and match, update password for user by enabling useEffect's conditional
  }

  useEffect(() => {
    if (submit && match && !invalidPwd) updatePassword(window.location.href, pwd);
    setSubmit(false);
    return () => {
      // Clean-up code here, if necessary
    };
  }, [invalidPwd, match, submit])

  return (
    <div className="wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Choose a new password</h1>
        {!match ? (
          <p className="auth-error-msg top">These passwords don't match. Try again?</p>
        ) : (invalidPwd ? (
          <p className="auth-error-msg top">Please set a password longer than seven characters.</p>
        ) : (null))}
        <div className="input-box">
          <input
            className={(invalidPwd || !match) ? "auth-input error" : "auth-input"}
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <div className="input-box">
          <input
            className={(invalidPwd || !match) ? "auth-input error" : "auth-input"}
            type="password"
            placeholder="Confirm Password"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
          />
        </div>

        <button className="auth-button" type="submit">Submit</button>

        <div className="return">
          <button onClick={() => navigate('/login')}>Back to Log in</button>
        </div>
      </form>
    </div>
  );
}

export default ResetPage;