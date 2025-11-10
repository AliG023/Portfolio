import { Link } from 'react-router-dom';
import AGLogo from '../assets/AG-logo.svg';
import '../styles/Layout.css';

export default function Layout() {
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
                                <Link to="/">Home</Link>  |  
                                <Link to="/about"> About</Link>  |
                                <Link to="/project"> Projects</Link>  |
                                <Link to="/education"> Education</Link>  | 
                                <Link to="/service"> Services</Link>  |   
                                <Link to="/contact"> Contact</Link> 
                            </nav>
                        </div>
                    </div>
                </div>
            </>
    )
}