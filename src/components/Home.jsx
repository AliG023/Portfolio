import './Home.css';
import { Link } from 'react-router-dom';

export default function Home(){
    return (
        <>
            <div className="mission-statement">
                <h3>Mission Statement:</h3>
                <p><em>"To build thoughtful, reliable, and impactful software by combining technical skill with a passion for problem-solving and collaboration. I’m committed to continuous learning, professional growth, and creating solutions that empower users and elevate teams."</em></p>
                <Link to="/about">More About Me</Link>
            </div>
        </>
    )
}