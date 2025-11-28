import React, { useState } from 'react'
import './login.css'

function Login() {
    const [showPassword ,setShowPassword] = useState(false);

    function handleshowpass(){
        setShowPassword(!showPassword);
    }
  return (
    <>
    <div className="login-container">
        <div className="login-form">
             <p className="login-header">Login</p>
            <div className="user-inputs">
                <input type="text" placeholder='username or email' />
                
                <div className="password-input">
                    <input type={showPassword ? 'text' : 'password'} placeholder='password' />
                    {
                    showPassword ? <i class="fa-solid fa-eye-slash" onClick={handleshowpass}></i>
                    : <i class="fa-solid fa-eye" onClick={handleshowpass}></i> 
                    }
                </div>
            </div>
            <button className="submit-login-page-btn">
                login
            </button>
        </div>
       
    </div>
    </>
  )
}

export default Login