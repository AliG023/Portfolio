import './Services.css'
import { Link } from 'react-router-dom';
import FS_Dev from '../assets/Fullstack Dev.png';
import BE_Dev from '../assets/Backend Dev.png';
import WA_Des from '../assets/Webapp Design.png';

export default function Services() {
    return(
        <>
            <div className='page'>
                <div className='services-container'>
                    <h2>Services</h2>
                    <div className='services-grid'>
                        {/* Service 1 */}
                        <div className='services-card'>
                            <div className='services-card-header'>
                                <h3>Full-Stack Development</h3>
                            </div>
                            <div className='services-card-content'>
                                <img className='service1-pic' src={FS_Dev} alt="Full-Stack Development" />
                                <p className='services-description'>
                                    Designing and building robust software solutions that solve real-world problems. My focus is on writing clean, efficient code that delivers a seamless user experience.
                                </p>
                                <div className='tech-stack'>
                                    <span className='tech-tag'>C#</span>
                                    <span className='tech-tag'>JavaScript</span>
                                    <span className='tech-tag'>Python</span>
                                </div>
                            </div>
                            <div className='services-card-footer'>
                                <Link to="/contact" className="contact-btn">
                                    Contact Me
                                </Link>
                            </div>
                        </div>
                        {/* Service 2 */}
                        <div className='services-card'>
                            <div className='services-card-header'>
                                <h3>Backend Development</h3>
                            </div>
                            <div className='services-card-content'>
                                <img className='service2-pic' src={BE_Dev} alt="Backend Development" />
                                <p className='services-description'>
                                    Building the engine behind the application, focusing on databases, server logic, and APIs. My goal is to create a secure, scalable, and highly-performant backbone for any project.
                                </p>
                                <div className='tech-stack'>
                                    <span className='tech-tag'>C#</span>
                                    <span className='tech-tag'>Java</span>
                                    <span className='tech-tag'>SQL</span>
                                    <span className='tech-tag'>JavaScript</span>
                                </div>
                            </div>
                            <div className='services-card-footer'>
                                <Link to="/contact" className="contact-btn">
                                    Contact Me
                                </Link>
                            </div>
                        </div>
                        {/* Service 3 */}
                        <div className='services-card'>
                            <div className='services-card-header'>
                                <h3>Web & App Design</h3>
                            </div>
                            <div className='services-card-content'>
                                <img className='service3-pic' src={WA_Des} alt="Web & App Design" />
                                <p className='services-description'>
                                    Creating engaging digital experiences through thoughtful web and app design. I combine a passion for aesthetics with a deep understanding of user experience to deliver products that stand out.
                                </p>
                                <div className='tech-stack'>
                                    <span className='tech-tag'>React</span>
                                    <span className='tech-tag'>HTML</span>
                                    <span className='tech-tag'>CSS</span>
                                    <span className='tech-tag'>JavaScript</span>
                                </div>
                            </div>
                            <div className='services-card-footer'>
                                <Link to="/contact" className="contact-btn">
                                    Contact Me
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}