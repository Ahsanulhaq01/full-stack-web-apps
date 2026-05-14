
import { FiBell } from 'react-icons/fi'
import userIcon from '../../assets/images/imageIcon.png'
import './navbar.css'
import {Link, NavLink } from 'react-router-dom'
import useGetUser from '../../customHook/useGetUser'
import useCheckAuth from '../../customHook/useCheckAuth'

function Navbar() {
    const [user] = useGetUser([]);
    const [isAuth] = useCheckAuth(null);
    
  return (
    <>
    <div className="navbar-container">
            <nav className='left-content-container'>
                <NavLink to='/' className='navbar-heading'>GourmetKitchen</NavLink>
                {isAuth ? <ul>
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
            <img src= {isAuth ? `http://localhost:3000/${user?.profileImage}`: userIcon}  alt="profile_picture"  />
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