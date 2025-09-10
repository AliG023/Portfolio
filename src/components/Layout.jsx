import { Link } from 'react-router-dom';
import AGLogo from '../assets/AG_logo.png';
import './Layout.css';

export default function Layout() {
    return (
        <>
            <h1>My Portfolio</h1>

            <div>
                <nav>
                    <Link to="/">Home</Link>  |  
                    <Link to="/about"> About</Link>  |
                    <Link to="/project"> Projects</Link>  |
                    <Link to="/education"> Education</Link>  | 
                    <Link to="/service"> Services</Link>  |   
                    <Link to="/contact"> Contact</Link> 
                </nav>
            </div>
        </>
    )
}