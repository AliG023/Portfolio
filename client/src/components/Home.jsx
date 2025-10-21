import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <div className='page'>
                <div className='hello'>
                    <h1>Welcome</h1>
                        <p>Welcome, my name is Ali Graham and this is my portfolio page. Here you can find out more about me, my past and education as well as what I am currently working on. </p>
                </div>
                <div className="mission-statement">
                    <h3>Mission Statement:</h3>
                    <p><em>"To build thoughtful, reliable, and impactful software by combining technical skill with a passion for problem-solving and collaboration. I’m committed to continuous learning, professional growth, and creating solutions that empower users and elevate teams."</em></p>
                    <Link className='about-link' to="/about">More About Me</Link>
                </div>
            </div>
        </>
    )
}