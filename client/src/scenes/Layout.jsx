import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AGLogo from '../assets/AG-logo.svg';
import '../styles/Layout.css';

export default function Layout() {
    // Function to get user info from localStorage
    const getUserFromStorage = () => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        return token && username ? { username } : null;
    };

    // State to hold user information
    const [user, setUser] = useState(getUserFromStorage());

    // Update user state when localStorage changes
    useEffect (() => {
        setUser(getUserFromStorage());
    },[]);

    // Function to handle user logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUser(null);
    }

    return (
            <>
                <div className='banner'>
                    <div className="logo-container">
                        <Link to="/"><img className='logo' src={AGLogo} alt="AG Logo" /></Link>
                    </div>
                    <div className='header'>
                        <h1><em>Alastair Graham - Portfolio</em></h1>
                        <div className='nav-bar'>
                            <nav>
                                ||<Link to="/"> Home</Link>  |  
                                <Link to="/about"> About</Link>  |
                                <Link to="/project"> Projects</Link>  |
                                <Link to="/education"> Education</Link>  | 
                                <Link to="/service"> Services</Link>  |   
                                <Link to="/contact"> Contact  </Link>||
                                {user ? (
                                    <div className="welcome-logout">
                                        <span className="welcome">
                                            Welcome, { user.username }
                                        </span>
                                        <span className="logout">
                                            <button className='logOutBtn' onClick={handleLogout}> Logout</button>
                                        </span>
                                    </div>
                                    ) : (
                                    <span className="auth-links">
                                        <Link to="/signup">SignUp</Link>   |
                                        <Link to="/signin"> SignIn </Link>
                                    </span>
                                )}
                            </nav>
                        </div>
                    </div>
                </div>
            </>
    )
}