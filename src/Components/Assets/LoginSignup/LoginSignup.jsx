import React from 'react'
import theme from '../../../theme.js'
import user_icon from '../person.png'
import email_icon from '../email.png'
import password_icon from '../password.png'

const LoginSignup = () => {
    return (
        <div>
            <div className='container' style={container}>
                <div className='header' style={header}>
                    <div className='text' style={text}>Sign Up</div>
                    <div className='underline' style={underline}></div>
                </div>
                <div className='inputs' style={inputs}>
                    <div className='input' style={input}>
                        <img src={user_icon} alt='' style={input.img}/>
                        <input type='text' placeholder='Name' style={input.input}/>
                    </div>
                    <div className='input' style={input}>
                        <img src={email_icon} alt='' style={input.img}/>
                        <input type='email' placeholder='Email' style={input.input}/>
                    </div>
                    <div className='input' style={input}>
                        <img src={password_icon} alt='' style={input.img}/>
                        <input type='password' placeholder='Password' style={input.input}/>
                    </div>
                </div>
                <div className="forgot-password" style={forgotPassword}>Forgot Password? <span style={forgotPassword.span}>Click Here!</span></div>
                <div className="submitcontainer" style={submitContainer}>
                    <div className="submit" style={submit}>Sign Up</div>
                    <div className="submit" style={submit}>Login</div>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup

const container = {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    marginTop: 200,
    width: 600,
    backgroundColor: theme.colors.primaryLightBackground,
    paddingBottom: 30,
}

const header = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 9,
    width: "100%",
    marginTop: 30,
}

const text = {
    color: theme.colors.primaryLight,
    fontSize: 48,
    fontWeight: 700,
}

const underline = {
    width: 61,
    height: 6,
    background: theme.colors.primaryLight,
    borderRadius: 9,
}

const inputs = {
    marginTop: 55,
    display: "flex",
    flexDirection: "column",
    gap: 25,
}

const input = {
    display: "flex",
    alignItems: "center",
    margin: "auto",
    width: 480,
    height: 80,
    backgroundColor: theme.colors.secondaryLightBackground,
    borderRadius: 6,
    'img': {
        margin: "0px 30px",
    },
    'input': {
        height: 50,
        width: 400,
        background: "transparent",
        border: "none",
        outline: "none",
        color: theme.colors.secondaryLightBackground,
        fontSize: 19,
    }
}

const forgotPassword = {
    paddingLeft: 62,
    marginTop: 27,
    color: theme.colors.secondaryLightBackground,
    fontSize: 18,
    'span': {
        color: theme.colors.primaryLight,
        cursor: "pointer",
    }
}

const submitContainer = {
    display: "flex",
    gap: 30,
    margin: "60px auto",
}

const submit = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 220,
    height: 59,
    color: theme.colors.primaryLightBackground,
    backgroundColor: theme.colors.primaryLight,
    borderRadius: 50,
    fontSize: 19,
    fontWeight: 700,
    cursor: "pointer",
}