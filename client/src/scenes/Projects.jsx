import '../styles/Project.css';
import AGLogo from '../assets/AG-logo.svg';
import Proj2 from '../assets/project2-pic.jpg';
import Proj3 from '../assets/project3-pic.jpg';

export default function Projects() {
    // Function to open links
    const openLink = (url) => {
        window.open(url, '_blank');
    };

    return(
        <>
            <div className='page'>
                <div className='projects-container'>
                    <h2>My Projects</h2>
                    <div className='projects-grid'>
                        {/* Project 1 */}
                        <div className='project-card'>
                            <div className='card-header'>
                                <h3>Personal Portfolio Website</h3>
                            </div>
                            <div className='card-content'>
                                <img className='project1-pic' src={AGLogo} alt="Project 1 Picture" />
                                <p className='project-description'>
                                    A responsive React-based portfolio showcasing modern web development skills with clean UI/UX design and interactive components.
                                </p>
                                <div className='tech-stack'>
                                    <span className='tech-tag'>React</span>
                                    <span className='tech-tag'>CSS</span>
                                    <span className='tech-tag'>JavaScript</span>
                                </div>
                            </div>
                            <div className='card-footer'>
                                <button 
                                    className='project-btn'
                                    onClick={() => openLink('https://ali-graham-portfolio.onrender.com')}
                                >
                                    View Project
                                </button>
                                <button 
                                    className='project-btn secondary'
                                    onClick={() => openLink('https://github.com/AliG023/Portfolio')}
                                >
                                    View Code
                                </button>
                            </div>
                        </div>
                        {/* Project 2 */}
                        <div className='project-card'>
                            <div className='card-header'>
                                <h3>Drag & Drop Checkers Game</h3>
                            </div>
                            <div className='card-content'>
                                <img className='project2-pic' src={Proj2} alt="Project 2 Picture" />
                                <p className='project-description'>
                                    A browser-based checkers game with intuitive drag-and-drop play using vanilla JavaScript. Includes move validation, trash collection and JavaScript alerts.
                                </p>
                                <div className='tech-stack'>
                                    <span className='tech-tag'>HTML</span>
                                    <span className='tech-tag'>CSS</span>
                                    <span className='tech-tag'>JavaScript</span>
                                </div>
                            </div>
                            <div className='card-footer'>
                                <button 
                                    className='project-btn'
                                    onClick={() => openLink('https://alig023.github.io/COMP125/Assignment04/')}
                                >
                                    View Project
                                </button>
                                <button 
                                    className='project-btn secondary'
                                    onClick={() => openLink('https://github.com/AliG023/COMP125/tree/main/Assignment04')}
                                >
                                    View Code
                                </button>
                            </div>
                        </div>
                        {/* Project 3 */}
                        <div className='project-card'>
                            <div className='card-header'>
                                <h3>Mock Web Hosting Site</h3>
                            </div>
                            <div className='card-content'>
                                <img className='project3-pic' src={Proj3} alt="Project 3 Picture" />
                                <p className='project-description'>
                                    A sleek, responsive mock web site for Web Hosting Canada using HTML, CSS, and JavaScript. Focused on clean UI, semantic structure, and interactive elements.
                                </p>
                                <div className='tech-stack'>
                                    <span className='tech-tag'>HTML</span>
                                    <span className='tech-tag'>CSS</span>
                                    <span className='tech-tag'>JavaScript</span>
                                </div>
                            </div>
                            <div className='card-footer'>
                                <button 
                                className='project-btn'
                                onClick={() => openLink('https://alig023.github.io/COMP213/FinalProject/')}
                                >
                                    View Project
                                </button>
                                <button 
                                className='project-btn secondary'
                                onClick={() => openLink('https://github.com/AliG023/COMP213/tree/main/FinalProject')}
                                >
                                    View Code
                                </button>
                            </div>
                        </div>
                        {/* Project 4 */}
                        <div className='project-card'>
                            <div className='card-header'>
                                <h3>More To Come</h3>
                            </div>
                            <div className='card-content'>
                                <p className='project-description'>
                                    I have a several projects I am working on. Stay tuned for more soon. 
                                </p>
                                <div className='tech-stack'>
                                    <span className='tech-tag'>JavaScript</span>
                                    <span className='tech-tag'>React</span>
                                    <span className='tech-tag'>Node.js</span>
                                    <span className='tech-tag'>Electron.js</span>
                                </div>
                            </div>
                            <div className='card-footer'>
                                <button className='project-btn'>View Project</button>
                                <button className='project-btn secondary'>View Code</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}