import { useState } from 'react';
import './login.css'
import { axiosInstance } from '../../utils/axiosInstance';

function Login({showPassword , setShowPassword}) {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

     function handleshowpass(){
        setShowPassword(!showPassword);
    }

   async function handleLogin(e){
        e.preventDefault();
        const loginData = {email , password};

        try {
            const response = await axiosInstance.post('/login' , loginData);
            console.log(response.data);
            alert("login successfull ")
        } catch (error) {
            console.error(error?.response.data);
            alert('login-failed')
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
            </form>
        </div>
       
    </div>
    </>
  )
}

export default Login;