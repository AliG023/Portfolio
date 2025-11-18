import { Link, useNavigate } from "react-router-dom";
import AGLogo from "../assets/AG-logo.svg";
import "../styles/Layout.css";
import { useUser } from "../context/usercontext.jsx";

export default function Layout() {
  // Function to get user info from localStorage
  const { user, signOut } = useUser();
  const nav = useNavigate();

  // Function to handle user logout
  const handleLogout = () => {
    signOut();
    nav("/signin");
  };

  return (
    <>
      <div className="banner">
        <div className="logo-container">
          <Link to="/">
            <img className="logo" src={AGLogo} alt="AG Logo" />
          </Link>
        </div>
        <div className="header">
          <h1>
            <em>Alastair Graham - Portfolio</em>
          </h1>
          <div className="nav-bar">
            <nav>
              ||<Link to="/"> Home</Link> |<Link to="/about"> About</Link> |
              <Link to="/project"> Projects</Link> |
              <Link to="/education"> Education</Link> |
              <Link to="/service"> Services</Link> |
              {user && user.role === "admin" ? (
                <div className="admin-link">
                  <>Admin Tools: </>
                  ||<Link to="/users"> Users </Link>|
                  <Link to="/messages"> Messages </Link>||
                </div>
              ) : (
                <Link to="/contact"> Contact </Link>
              )}
              {user ? (
                <div className="welcome-logout">
                  <span className="welcome">Welcome, {user.username}</span>
                  <span className="logout">
                    <button className="logOutBtn" onClick={handleLogout}>
                      {" "}
                      Logout
                    </button>
                  </span>
                </div>
              ) : (
                <span className="auth-links">
                  || <Link to="/signup">SignUp</Link> |
                  <Link to="/signin"> SignIn </Link>
                </span>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
