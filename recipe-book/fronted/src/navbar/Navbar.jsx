import './navbar.css'
import { Link } from 'react-router'
import { axiosInstance } from '../utils/axiosInstance.js';
function Navbar() {

  async function handleLogOut(e){
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/logout' , {});
      alert(response.data.message)
    } catch (error) {
      alert(error?.response.data.message);
    }
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
          <li><button className='logout-btn' onClick={handleLogOut}>Logout</button></li>
        </ul>
    </div>
   </>
  )
}

export default Navbar