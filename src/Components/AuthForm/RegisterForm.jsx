import { React, useRef, useState, useEffect } from 'react';
import './AuthForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { getUser, createUser } from '../../Services/userService.js';
import { Link, useNavigate  } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const RegisterForm = () => {
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);

  const [pwd, setPwd] = useState('');
  const [invalidPwd, setInvalidPwd] = useState(false);

  const [submit, setSubmit] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  // const [success, setSuccess] = useState('');

  // useEffect(() => {
  //   const result = PWD_REGEX.test(pwd);
  //   setValidPwd(result);
  // }, [pwd])

  // useEffect(() => {
  //   setErrMsg('');
  // }, [pwd])
  const navigate = useNavigate();

  const HandleSubmit = (e) => {
    e.preventDefault(); // if password doesn't meet the requirements, dont refresh page (prevents states resetting)
    
    // console.log(email);
    
    
    // if (!PWD_REGEX.test(pwd)) {
    
    //   setInvalidPwd(true);
    //   if (pwd.length > 0) setNonemptyPwd(true); // pwd is non-empty
    //   return;
    // }

    try {
      createUser(email, pwd);
      setInvalidEmail(false);
      setInvalidPwd(false);
      
      navigate("/verify/" + uuidv4());
    } catch (e) {
      if (e.message === 'Email error.') {
        setInvalidEmail(true);
        setInvalidPwd(false);
        setPwd('');
        console.log("invalid email");
      } else if (e.message === 'Password error.') {
        setInvalidPwd(true);
        setInvalidEmail(false);
        setPwd('');
        console.log("invalid pwd");
      } else {
        console.error("An error occurred:" + e);
      }
    }     
  }
  // useEffect(() => {
  //   getUser();
  // }, []);
  return (
    <div className="wrapper">
      <form className='auth-form' onSubmit={HandleSubmit}>
        {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} >{errMsg}</p> */}

        <h1>Register</h1>
        <div className="input-box">
          <input
            className={invalidEmail ? "auth-input error" : "auth-input"}
            type="email"
            placeholder="Email"
            autoComplete='off'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FaUser className="icon" />
          {invalidEmail && (<p className="auth-error-msg">Hmm, that email address doesn't look right.</p>)}
        </div>

        <div className="input-box">
          <input
            className={invalidPwd ? "auth-input error" : "auth-input"}
            type="password"
            placeholder="Password"
            autoComplete='off'
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
          />
          <FaLock className="icon" />
          {invalidPwd && (<p className="auth-error-msg">Please set a password longer than eight characters.</p>)}
        </div>

        <button className="auth-button" type="submit" >
          Create Account
        </button>

      </form>
      <div className="register-link">
        <p>Already have an account?&nbsp;
          <Link to="/login">
            <button>Log in</button>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterForm