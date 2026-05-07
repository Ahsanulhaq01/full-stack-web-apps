
import { FiBell } from 'react-icons/fi'
import userPic from '../../assets/profile-pic.jpeg'
import './navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
    <div className="navbar-container">
            <nav className='left-content-container'>
                <Link to='/' className='navbar-heading'>GourmetKitchen</Link>
                <ul>
                    <li><Link to="/"  className='active'>Home</Link></li>
                    <li><Link to="/">Recipes</Link></li>
                    <li><Link to="/add-recipes">Add Recipes</Link></li>
                    <li><Link to="/profile-page">Profile</Link></li>
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