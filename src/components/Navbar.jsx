import React,{useState,useEffect} from 'react'
import {Link,useNavigate} from "react-router-dom"
const Navbar = () => {
  const navigate = useNavigate();
  // const loggedInUser = localStorage.getItem("loggedinUser");
  //  const loggedInEmail=localStorage.getItem("userEmail");
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("loggedInUser");
  //  localStorage.removeItem("loggedInEmail");
  //   navigate("/");
  // };
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("loggedinUser"));
  const [loggedInEmail, setLoggedInEmail] = useState(localStorage.getItem("userEmail"));

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedinUser"));
    setLoggedInEmail(localStorage.getItem("userEmail"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedinUser");
    localStorage.removeItem("userEmail"); // ✅ Fix: Corrected key name
    setLoggedInUser(null);  // ✅ Force re-render
    setLoggedInEmail(null);
    navigate("/login");
  };
  return (
    <header>
    <div className="logo">E-Fitness</div>
    <div className="link">
     <Link to='/'>Home</Link> 
    
      <Link to='/about'>About</Link>         
       
          {/* <Link to={"/login"}>Login</Link>       */}
          {loggedInUser ? (
          <>
          
            <span>Welcome, {loggedInUser}</span>
            <button className="logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
    </div>
</header>
  )
}

export default Navbar
