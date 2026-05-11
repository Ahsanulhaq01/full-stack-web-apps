
import { FiBell } from 'react-icons/fi'
import userPic from '../../assets/profile-pic.jpeg'
import './navbar.css'
import {Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
    const [isLoggin , SetIsLogin] = useState(true)
    // SetIsLogin(true);
    // console.log("hello")
  return (
    <>
    <div className="navbar-container">
            <nav className='left-content-container'>
                <NavLink to='/' className='navbar-heading'>GourmetKitchen</NavLink>
                {isLoggin ? <ul>
                    <li key={1}><NavLink to="/">Home</NavLink></li>
                    <li key={2}><NavLink to="/recipe-details">Recipes</NavLink></li>
                    <li key={3}><NavLink to="/add-recipes">Add Recipes</NavLink></li>
                    <li key={4}><NavLink to="/profile-page">Profile</NavLink></li>
                </ul> : <ul>
                    <li key={1}><NavLink to="/signup">Get Started</NavLink></li>
                    <li key={2}><NavLink to="/login">Login</NavLink></li>
                </ul>}
            </nav>
        <div className="right-content-container">
            <Link to='/profile-page'>
            <img src= {userPic}  alt="profile_picture"  />
            </Link>
             <div className="notification-icon">
                <FiBell size={25} color= '#a96b3c' />
            </div>
        </div>
    </div>
    </>
  )
}

export default Navbar