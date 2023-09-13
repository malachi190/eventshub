import React from "react";
import "./styles/navbar.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="main_header">
      <nav className="navbar">
        <div className="logo">
          <h2>
            EventsHub 
          </h2>
        </div>

        <div className="nav_items">
          <ul className="list">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/events"}>Find Events</Link>
            </li>
            <li>
              <Link to={"/create-event"}>Create Event</Link>
            </li>
          </ul>
        </div>
        <div className="auth_routes">
          <ul>
            <li>
              {" "}
              {location.pathname !== "/" ? "" : <Link to={"/"}>Sign In</Link>}
            </li>
            <li>
              {" "}
              {location.pathname !== "/register" ? (
                ""
              ) : (
                <Link to={"/register"}>Register</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
