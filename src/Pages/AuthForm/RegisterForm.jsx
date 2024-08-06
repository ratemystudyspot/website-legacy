import React, { useState, useRef } from "react";
import "./AuthForm.scss";
import { IoMdMail } from "react-icons/io";
import { FaUser, FaLock } from "react-icons/fa";
import { register } from "../../Services/auth.js";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// type RegisterFormInputs = { // when we switch to ts
//   name: string;
//   email: string;
//   password: string;
// };

const RegisterForm = () => {
  const [duplicate, setDuplicate] = useState(false);
  const loading = useRef(false);

  const {
    formState: { errors },
    register: formRegister,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  // : SubmitHandler<RegisterFormInputs> when we switch to ts

  const onSubmit = async (data) => {
    // react hook form automatically prevents default

    if (loading.current) return; // prevent user from spam creating accounts
    loading.current = true;

    const capitalize = (str) => {
      if (typeof str !== "string" || str.length === 0) {
        return "";
      }
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const [rawFirstName, rawLastName] = data.name.trim().split(/\s+/);

    const name = `${capitalize(rawFirstName)} ${capitalize(rawLastName)}`;

    try {
      setDuplicate(false);

      await register(name, data.email, data.password);

      // if no error thrown get rid of errors and goto email verification page
      setDuplicate(false);
      navigate("/login");
      // TODO: navigate to a verify page (for future !!!)
      // navigate("/verify/" + email);
    } catch (e) {
      loading.current = false;

      if (e.message === "Email duplicate Error") {
        // if register throws a duplicate email error
        setDuplicate(true);
      } else {
        // if register throws an unexpected error
        console.error("An error occurred:", e);
      }
    }
  };

  return (
    <div className="auth-box">
      <form className="auth-box__auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="auth-box__title">Register</h1>
        {loading.current ? ( // processing request
          <p className="auth-box__auth-msg auth-box__auth-msg--loading auth-box__auth-msg--top">
            Loading...
          </p>
        ) : null}

        {errors.name && (
          <p className="auth-box__auth-msg auth-box__auth-msg--error auth-box__auth-msg--top">
            {errors.name.message}
          </p>
        )}
        <div className="auth-box__input-box">
          <input
            className="auth-box__auth-input"
            type="text"
            placeholder="Full Name"
            autoComplete="off"
            {...formRegister("name", {
              required: true,
              minLength: {
                value: 3,
                message: "Full name must be at least 3 characters long.",
              },
              maxLength: {
                value: 25,
                message: "Full name must be at most 25 characters long.",
              },
              validate: {
                isFullName: (value) =>
                  /^[a-zA-Z]+ [a-zA-Z]+$/.test(value) ||
                  "Please enter your full name.", // will contain only letters and a space
              },
            })} // is required, min length 3, max length 25
          />
          <FaUser className="auth-box__icon" />
        </div>

        {errors.email && (
          <p className="auth-box__auth-msg auth-box__auth-msg--error auth-box__auth-msg--top">
            {errors.email.message}
          </p>
        )}
        {duplicate && (
          <p className="auth-box__auth-msg auth-box__auth-msg--error auth-box__auth-msg--top">
            Email address already in use, please log in.
          </p>
        )}
        <div className="auth-box__input-box">
          <input
            className="auth-box__auth-input"
            type="email"
            placeholder="Email"
            autoComplete="off"
            {...formRegister("email", {
              required: true,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address format.",
              },
            })} // is required, email regex pattern
          />
          <IoMdMail className="auth-box__icon" />
        </div>

        {errors.password && (
          <p className="auth-box__auth-msg auth-box__auth-msg--error auth-box__auth-msg--top">
            {errors.password.message}
          </p>
        )}
        <div className="auth-box__input-box">
          <input
            className="auth-box__auth-input"
            type="password"
            placeholder="Password"
            autoComplete="off"
            {...formRegister("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long.",
              },
            })} // is required, min length 8
          />
          <FaLock className="auth-box__icon" />
        </div>

        <button
          className="auth-box__auth-button"
          type="submit"
          disabled={loading.current}
        >
          Create Account
        </button>
      </form>
      <div className="auth-box__register-link-container">
        <p>
          Already have an account?&nbsp;
          <Link to="/login">
            <button className="auth-box__register-link-button">Log in</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
