import './navbar.css'
import { Link, useNavigate } from 'react-router'
import { axiosInstance } from '../utils/axiosInstance.js';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../context/AthContext.jsx';

function Navbar() {
  const {user , setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  async function handleLogOut(e){
    e.preventDefault();
    if(!user){
      return toast.error("You are not Logged In")
    }
    Swal.fire({
      title : "are you sure ?",
      text : "you will be logout",
      icon : 'warning',
      width : '350px',
      showCancelButton : true,
      confirmButtonText : 'Yes , Logout',
      cancelButtonText : "Cancel"
    }).then(async(result)=>{
      if(result.isConfirmed){
        try {
      const response = await axiosInstance.post('/logout' , {});
      toast.success(response.data.message)
      setTimeout(() => {
        setUser(null)
      }, 1000);
      navigate('/')
    } catch (error) {
      toast.error(error?.response?.data.message)
    }
      }
    })
    

    
  }
  return (
   <>
    <div className="container">
         <Link to={'/'}><span id='logo-id'>RECIPE BOOK</span></Link>
         <i className="fa-solid fa-bars active"></i>
        <ul className='nav-list'>
          <Link to={'/'}><li key={1}>Home</li></Link>
          <Link to={'/login'}><li key={2}>Login</li></Link>
          <Link to={'/register'}><li key={3}>Sign up</li></Link>
          <Link onClick={handleLogOut}><li key={4}>logout</li></Link>
          <li key={5}>{user || "guest"}</li>
        </ul>
    </div>
   </>
  )
}

export default Navbar