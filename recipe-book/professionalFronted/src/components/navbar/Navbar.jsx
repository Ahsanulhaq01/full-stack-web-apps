
import { FiBell } from 'react-icons/fi'
import userPic from '../../assets/profile-pic.jpeg'
import './navbar.css'

function Navbar() {
  return (
    <>
    <div className="navbar-container">
            <nav className='left-content-container'>
                <a href='/' className='navbar-heading'>GourmetKitchen</a>
                <ul>
                    <li><a href="#"  className='active'>Home</a></li>
                    <li><a href="#">Recipes</a></li>
                    <li><a href="#">Add Recipes</a></li>
                    <li><a href="#">Profile</a></li>
                </ul>
            </nav>
        <div className="right-content-container">
             <div className="notification-icon">
                <FiBell size={25} color= '#a96b3c' />
            </div>
            <img src= {userPic}  alt="profile_picture"  />
        </div>
    </div>
    </>
  )
}

export default Navbar