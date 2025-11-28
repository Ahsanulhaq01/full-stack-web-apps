import React from "react";
import './signup.css'

function Signup({showPassword , setShowPassword}) {

    function handleshowpass(){
        setShowPassword(!showPassword);
    }
  return (
    <>
      <div className="signup-container">
        <div className="signup-form">
          <p className="signup-header">SignUp</p>
          <div className="signup-input-container">
            <input type="text" placeholder="username" />
            <input type="email" placeholder="email" />
            <div className="signup-pass-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
              />
              {showPassword ? (
                <i class="fa-solid fa-eye-slash" onClick={handleshowpass}></i>
              ) : (
                <i class="fa-solid fa-eye" onClick={handleshowpass}></i>
              )}
            </div>
          </div>
            <button className="signup-submit-form">signup</button>
        </div>
      </div>
    </>
  );
}

export default Signup;
