import { useState } from 'react';
import './login.css'
import {Link, useNavigate} from 'react-router'
import { axiosInstance } from '../../utils/axiosInstance';
import { Navigate } from 'react-router';

function Login({showPassword , setShowPassword}) {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const navigate = useNavigate();
     function handleshowpass(){
        setShowPassword(!showPassword);
    }

   async function handleLogin(e){
        e.preventDefault();
        const loginData = {email , password};

        try {
            const response = await axiosInstance.post('/login' , loginData);
            alert(response.data.message)
         navigate('/')
        } catch (error) {
            alert(error?.response.data.message)
        }
        
    }
  return (
    <>
    <div className="login-container">
        <div className="login-form">
            <form onSubmit={handleLogin}>
             <p className="login-header">Login</p>
            <div className="user-inputs">
                <input type="email" placeholder='email' onChange={e => setEmail(e.target.value)} value={email} />
                
                <div className="password-input">
                    <input type={showPassword ? 'text' : 'password'} placeholder='password' onChange={e=> setPassword(e.target.value)} value={password} />
                    {
                    showPassword ? <i class="fa-solid fa-eye-slash" onClick={handleshowpass}></i>
                    : <i class="fa-solid fa-eye" onClick={handleshowpass}></i> 
                    }
                </div>
            </div>
            <button className="submit-login-page-btn" type='submit'>
                login
            </button>
            <Link to={'/register'} className='register-link'>Don't have Account ?</Link>
            </form>
        </div>
       
    </div>
    </>
  )
}

export default Login;