
import { FiBell } from 'react-icons/fi'
import userPic from '../../assets/profile-pic.jpeg'
import './navbar.css'
import {Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <>
    <div className="navbar-container">
            <nav className='left-content-container'>
                <NavLink to='/' className='navbar-heading'>GourmetKitchen</NavLink>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/recipes">Recipes</NavLink></li>
                    <li><NavLink to="/add-recipes">Add Recipes</NavLink></li>
                    <li><NavLink to="/profile-page">Profile</NavLink></li>
                </ul>
            </nav>
        <div className="right-content-container">
             <div className="notification-icon">
                <FiBell size={25} color= '#a96b3c' />
            </div>
            <Link to='/profile-page'>
            <img src= {userPic}  alt="profile_picture"  />
            </Link>
        </div>
    </div>
    </>
  )
}

export default Navbar