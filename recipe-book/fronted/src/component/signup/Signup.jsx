import React from "react";
import './signup.css'
import { useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { useNavigate } from "react-router";

function Signup({showPassword , setShowPassword}) {
  const [username , setName] = useState('');
  const [email , setEmail]  = useState('');
  const [password , setPassword] = useState('');
  const navigate = useNavigate();

    function handleshowpass(){
        setShowPassword(!showPassword);
    }
    async function handleSignUp(e){
      e.preventDefault();

      const signUpData = {username , email , password}

      try {
        const response = await axiosInstance.post('/register' , signUpData);
        alert(response.data.message);
        navigate('/');

      } catch (error) {
        alert(error?.response.data.message);
      }
    }
  return (
    <>
      <div className="signup-container">
        <div className="signup-form">
          <form onSubmit={handleSignUp}>
          <p className="signup-header">SignUp</p>
          <div className="signup-input-container">
            <input type="text" placeholder="username" value={username} onChange={e=>setName(e.target.value)} />
            <input type="email" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
            <div className="signup-pass-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}
              />
              {showPassword ? (
                <i class="fa-solid fa-eye-slash" onClick={handleshowpass}></i>
              ) : (
                <i class="fa-solid fa-eye" onClick={handleshowpass}></i>
              )}
            </div>
          </div>
            <button className="signup-submit-form" type="submit">signup</button>
            </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
