import { useState, useEffect } from 'react';
import Homepage from './component/Homepage';
import Auth from './component/Auth';
import './App.css';

function App(){
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('token');
    if (loggedInUser) {
      // Basic check, in a real app you might want to verify the token with the backend
      setUser({ token: loggedInUser });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return(
    <>
      {user ? <Homepage onLogout={handleLogout} /> : <Auth setUser={setUser} />}
    </>
  )
}

export default App;