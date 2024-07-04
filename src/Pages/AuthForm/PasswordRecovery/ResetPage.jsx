import { React, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { updatePassword } from "../../../Services/auth";
import '../AuthForm.scss';

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
    if (submit && match && !invalidPwd) {
      updatePassword(window.location.href, pwd);
      navigate("/login");
    }
    setSubmit(false);
    return () => { };
  }, [invalidPwd, match, submit])

  return (
    <div className="auth-box">
      <form className="auth-box__auth-form" onSubmit={handleSubmit}>
        <h1 className="auth-box__title">Choose a new password</h1>
        {!match ? (
          <p className="auth-box__auth-msg auth-box__auth-msg--erorr auth-box__auth-msg--top">These passwords don't match. Try again?</p>
        ) : (invalidPwd ? (
          <p className="auth-box__auth-msg auth-box__auth-msg--error auth-box__auth-msg--top">Please set a password longer than seven characters.</p>
        ) : (null))}
        <div className="auth-box__input-box">
          <input
            className={(invalidPwd || !match) ? "auth-box__auth-input auth-box__auth-input--error" : "auth-box__auth-input"}
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <div className="auth-box__input-box">
          <input
            className={(invalidPwd || !match) ? "auth-box__auth-input auth-box__auth-input--error" : "auth-box__auth-input"}
            type="password"
            placeholder="Confirm Password"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
          />
        </div>

        <button className="auth-box__auth-button" type="submit">Submit</button>

        <div className="auth-box__return-container">
          <button className="auth-box__return-button" onClick={() => navigate('/login')}>Back to Log in</button>
        </div>
      </form>
    </div>
  );
}

export default ResetPage;