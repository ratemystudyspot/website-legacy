import React from 'react'
import './AuthForm.css'
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';

const LoginForm = (props) => {
    return (
        <div className="wrapper">
            <form className='auth-form' action="">
                <h1>Login</h1>
                <div className="input-box">
                    <input className="auth-input" type="email" placeholder="Email" required />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input className="auth-input" type="password" placeholder="Password" required />
                    <FaLock className="icon" />
                </div>

                {/* <div className="remember-forgot">
                    <label><input type="checkbox" />Remember me</label>
                    
                </div> */}
                <div className='forgot-password'>
                    <a href="#">Forgot Password?</a> 
                </div>

                {/* add a link later !!! */}

                <button className="auth-button" type="submit">Login</button>
            </form>
            <div className="register-link">
                <p>Don't have an account?&nbsp;
                    <Link to="/signup">
                        <button>Register</button>
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginForm;