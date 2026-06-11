
import { FiBell } from 'react-icons/fi'
import userIcon from '../../assets/images/imageIcon.png'
import './navbar.css'
import {Link, NavLink } from 'react-router-dom'
import useGetUser from '../../customHook/useGetUser'
import { useState, useEffect, useContext } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { AuthContext } from '../../context/AuthContext'

function Navbar() {
    const [user] = useGetUser();
    const { isLoggedIn, authLoading } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    const lastRecipeId = localStorage.getItem('lastViewedRecipeId');
    const recipeLink = lastRecipeId ? `/recipe-details/${lastRecipeId}` : '/recipe-details';

    useEffect(() => {
        if (isLoggedIn) {
            const fetchNotifications = async () => {
                try {
                    const response = await axiosInstance.get('/notifications');
                    setNotifications(response.data.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchNotifications();
            // Optional: poll for new notifications
            const interval = setInterval(fetchNotifications, 30000);
            return () => clearInterval(interval);
        }
    }, [isLoggedIn]);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleBellClick = async () => {
        setShowNotifications(!showNotifications);
        if (!showNotifications && unreadCount > 0) {
            try {
                await axiosInstance.patch('/notifications/mark-as-read');
                setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (authLoading) return <div className="navbar-container"></div>;
    
  return (
    <>
    <div className="navbar-container">
            <nav className='left-content-container'>
                <NavLink to='/' className='navbar-heading'>GourmetKitchen</NavLink>
                {isLoggedIn ? <ul>
                    <li key={1}><NavLink to="/">Home</NavLink></li>
                    <li key={2}><NavLink to={recipeLink}>Recipes</NavLink></li>
                    <li key={3}><NavLink to="/add-recipes">Add Recipes</NavLink></li>
                    <li key={4}><NavLink to="/saved-recipes">Saved</NavLink></li>
                    <li key={5}><NavLink to="/profile">Profile</NavLink></li>
                </ul> : <ul>
                    <li key={1}><NavLink to="/signup">Get Started</NavLink></li>
                    <li key={2}><NavLink to="/login">Login</NavLink></li>
                </ul>}
            </nav>
        <div className="right-content-container">
            <Link to='/profile'>
            <img src= {user?.profileImage  || userIcon}  alt="profile_picture"  />
            </Link>
             <div className="notification-icon" onClick={handleBellClick}>
                <FiBell size={25} color= '#a96b3c' />
                {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
                
                {showNotifications && (
                    <div className="notifications-dropdown">
                        <div className="notifications-header">Notifications</div>
                        <div className="notifications-list">
                            {notifications.length > 0 ? (
                                notifications.map(n => (
                                    <div key={n._id} className={`notification-item ${!n.isRead ? 'unread' : ''}`}>
                                        <img src={n.sender.profileImage || userIcon} alt="sender" />
                                        <div className="notification-text">
                                            <p>
                                                <strong>{n.sender.name}</strong> 
                                                {n.type === 'follow' ? ' started following you' : ` saved your recipe "${n.recipe?.recipeTitle}"`}
                                            </p>
                                            <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-notifications">No notifications yet</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
    </>
  )
}

export default Navbar