import { React, useRef, useState, useEffect } from 'react';
import './AuthForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { getUser, createUser, deleteUser, updateUser } from '../../Services/userService.js';

const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PWD_REGEX = /^(?=.*[a-z]){8,}$/;

const RegisterForm = (props) => {
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [submit, setSubmit] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  // const [success, setSuccess] = useState('');

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
  }, [pwd])

  useEffect(() => {
    setErrMsg('');
  }, [pwd])

  const HandleSubmit= (e) => {
    e.preventDefault();
    console.log(email);
  }
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="wrapper">
      <form className='auth-form' onSubmit={HandleSubmit}>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} >{errMsg}</p>

        <h1>Register</h1>
        <div className="input-box">
          <input 
            className="auth-input"
            type="email" 
            placeholder="Email" 
            autoComplete='off' 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>

        <div className="input-box">
          <input 
            className="auth-input"
            type="password" 
            placeholder="Password" 
            autoComplete='off'
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby='pwdnote'
          />
          <FaLock className="icon" />
        </div>        
        
        <button className="auth-button" type="submit" onClick={createUser}>
          Create Account
        </button>
    
      </form>
      <div className="register-link">
        <p>Already have an account? <button onClick={() => props.onFormSwitch('login')}>Log in</button></p>
      </div>
    </div>
  )
}

export default RegisterForm