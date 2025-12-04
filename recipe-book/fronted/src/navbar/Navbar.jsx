import './navbar.css'
import { Link, useNavigate } from 'react-router'
import { axiosInstance } from '../utils/axiosInstance.js';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function Navbar() {

  const navigate = useNavigate();
  async function handleLogOut(e){
    e.preventDefault();

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
         <span id='logo-id'>RECIPE BOOK</span>
         <i className="fa-solid fa-bars active"></i>
        <ul className='nav-list'>
          <Link to={'/'}><li key={1}>Home</li></Link>
          <Link to={'/login'}><li key={2}>Login</li></Link>
          <Link to={'/register'}><li key={3}>Sign up</li></Link>
          <Link onClick={handleLogOut}><li key={4}>logout</li></Link>
        </ul>
    </div>
   </>
  )
}

export default Navbar