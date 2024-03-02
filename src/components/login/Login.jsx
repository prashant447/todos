import React, { useEffect, useState } from "react";

import img from "/images/img.png";
import logo from "/images/logo.png";
import google from "/images/google.jpg";
import "./login.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../ConfigFirebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // connect firebase to react
  const signIn = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      console.log(res, "userData");
      navigate("/dashboard");
    } catch (error) {
      console.log(error, "error");
    }
  };

  //  maintain data after login
  useEffect(() => {
    auth.onAuthStateChanged((userData) => {
      console.log(userData);
      if (userData?.email) {
        navigate("/dashboard");
      }
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="login">
          <div className="left">
            <div className="logo">
              <img src={logo} alt="" className="logo-img" />
            </div>

            <div className="login-form">
              <h1>LOGIN</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet
                at eleifend feugiat vitae faucibus nibh dolor dui. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Aliquet at eleifend
                feugiat vitae faucibus nibh dolor dui.{" "}
              </p>

              <button className="btn-form" onClick={signIn}>
                <img src={google} className="button-login-icon" alt="" />
                Sign in using Google
              </button>
            </div>
          </div>
          <div className="right">
            <img src={img} alt="" className="right-img" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
