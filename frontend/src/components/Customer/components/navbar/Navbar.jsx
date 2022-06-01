import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  // const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logout');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    navigate('/');
  }

  const handleBooking = () => {
    console.log('Booking');
    navigate('/booking');
  }


  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/customer" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">SysAdmin Hotel Reservation</span>
        </Link>

          <div className="navItems">
            <button className="navButton" onClick={() => { handleBooking() }}>Bookings</button>
            <button className="navButton" onClick={() => { handleLogout() }}>Logout</button>
          </div>
        
      </div>
    </div>
  );
};

export default Navbar;
