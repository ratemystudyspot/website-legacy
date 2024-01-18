import { React, useRef, useState, useEffect } from 'react';
import './AuthForm.css';
import { FaUser, FaLock, FaInfoCircle, FaCheck, FaTimes } from "react-icons/fa";

const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PWD_REGEX = /^(?=.*[a-z]){8,}$/;

const RegisterForm = () => {
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [enter, setEnter] = useState(false);

  const [submit, setSubmit] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  // const [success, setSuccess] = useState('');s

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
  }, [pwd])

  useEffect(() => {
    setErrMsg('');
  }, [pwd])

  return (
    <div className="wrapper">
      <form action="">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} >{errMsg}</p>

        <h1>Sign up for Seekr</h1>
        <div className="input-box">
          <input 
            type="email" 
            placeholder="Email" 
            autoComplete='off' 
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setEnter(true);
              }
            }}
            required
          />
          <FaUser className="icon" />
        </div>

        <p id='pwdnote' className={!enter || !submit || validEmail ? "offscreen" : "instructions"}>
          Please provide your email.
        </p>

        <div className="input-box">
          <input 
            type="password" 
            placeholder="Password" 
            autoComplete='off'
            onChange={(e) => setPwd(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setEnter(true);
              }
            }}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby='pwdnote'
          />
          <FaLock className="icon" />
        </div>        
        
        <p id='pwdnote' className={!enter || !submit || validPwd ? "offscreen" : "instructions"}>
          Please set a password longer than seven characters.
        </p>

        <button type="submit" onClick={() => setSubmit(true)}>
          Create Account
        </button>

        <div className="register-link">
          <p>Already have an account? <a href="#">Log in</a></p>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm