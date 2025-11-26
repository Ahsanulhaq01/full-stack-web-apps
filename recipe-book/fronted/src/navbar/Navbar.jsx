import './navbar.css'
function Navbar() {
  return (
   <>
    <div className="container">
         <span id='logo-id'>Recipe Book</span>
         <i class="fa-solid fa-bars active"></i>
        <ul className='nav-list'>
            <li key={1}>Home</li>
            <li key={2}>Contact</li>
            <li key={3}>About</li>
        </ul>
    </div>
   </>
  )
}

export default Navbar