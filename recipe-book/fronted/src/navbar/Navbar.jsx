import './navbar.css'
import { Link } from 'react-router'
function Navbar() {
  return (
   <>
    <div className="container">
         <span id='logo-id'>RECIPE BOOK</span>
         <i className="fa-solid fa-bars active"></i>
        <ul className='nav-list'>
          <Link to={'/'}><li key={1}>Home</li></Link>
            
            <li key={2}>Contact</li>
            <li key={3}>About</li>
        </ul>
    </div>
   </>
  )
}

export default Navbar