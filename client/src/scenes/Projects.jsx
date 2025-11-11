import { useState } from 'react';
import '../styles/Project.css';
import AGLogo from '../assets/AG-logo.svg';
import Proj2 from '../assets/project2-pic.jpg';
import Proj3 from '../assets/project3-pic.jpg';

export default function Projects() {
    // Function to open links
    const openLink = (url) => {
        window.open(url, '_blank');
    };

    const [isProjectOpen, setIsProjectOpen] = useState(false);
    const [projectForm, setProjectForm] = useState({
        title: '',
        description: '',
        image: '',
        liveUrl: '',
        codeUrl: '',
        techs: ''
    });

    const [projects, setProjects] = useState([
        {
            title: 'Personal Portfolio Website',
            description: 'A responsive React-based portfolio showcasing modern web development skills with clean UI/UX design and interactive components.',
            image: AGLogo,
            liveUrl: 'https://ali-graham-portfolio.onrender.com',
            codeUrl: 'https://github.com/AliG023/Portfolio',
            techs: ['React', 'CSS', 'JavaScript']
        },
        {
            title: 'Drag & Drop Checkers Game',
            description: 'A browser-based checkers game with intuitive drag-and-drop play using vanilla JavaScript. Includes move validation, trash collection and JavaScript alerts.',
            image: Proj2,
            liveUrl: 'https://alig023.github.io/COMP125/Assignment04/',
            codeUrl: 'https://github.com/AliG023/COMP125/tree/main/Assignment04',
            techs: ['HTML', 'CSS', 'JavaScript']
        },
        {
            title: 'Mock Web Hosting Site',
            description: 'A sleek, responsive mock web site for Web Hosting Canada using HTML, CSS, and JavaScript. Focused on clean UI, semantic structure, and interactive elements.',
            image: Proj3,
            liveUrl: 'https://alig023.github.io/COMP213/FinalProject/',
            codeUrl: 'https://github.com/AliG023/COMP213/tree/main/FinalProject',
            techs: ['HTML', 'CSS', 'JavaScript']
        },
        {
            title: 'More To Come',
            description: 'I have several projects I am working on. Stay tuned for more soon.',
            image: '',
            liveUrl: '',
            codeUrl: '',
            techs: ['JavaScript', 'React', 'Node.js', 'Electron.js']
        }
    ]);

    const openProjectModal = () => {
        setProjectForm({ title: '', description: '', image: '', liveUrl: '', codeUrl: '', techs: '' });
        setIsProjectOpen(true);
    };
    const closeProjectModal = () => setIsProjectOpen(false);

    const handleProjectChange = (e) => {
        const { name, value } = e.target;
        setProjectForm(prev => ({ ...prev, [name]: value }));
    };

    const handleProjectSave = (e) => {
        e.preventDefault();
        if (!projectForm.title.trim()) return; // minimal validation

        const newProject = {
            title: projectForm.title.trim(),
            description: projectForm.description.trim(),
            image: projectForm.image.trim(), // allow URL or leave empty
            liveUrl: projectForm.liveUrl.trim(),
            codeUrl: projectForm.codeUrl.trim(),
            techs: projectForm.techs
                ? projectForm.techs.split(',').map(t => t.trim()).filter(Boolean)
                : []
        };

        setProjects(prev => [newProject, ...prev]);
        setProjectForm({ title: '', description: '', image: '', liveUrl: '', codeUrl: '', techs: '' });
        closeProjectModal();
    };

    return(
        <>
            <div className='page'>
                <div className='projects-container'>
                    <h2>My Projects</h2>
                    <div className='projects-grid'>
                        {projects.map((p, i) => (
                            <div className='project-card' key={i}>
                                <div className='card-header'>
                                    <h3>{p.title}</h3>
                                </div>
                                <div className='card-content'>
                                    {p.image ? (
                                        <img className={`project-pic project-pic-${i}`} src={p.image} alt={`${p.title} Picture`} />
                                    ) : null}
                                    <p className='project-description'>
                                        {p.description}
                                    </p>
                                    <div className='tech-stack'>
                                        {(p.techs || []).map((t, idx) => (
                                            <span className='tech-tag' key={idx}>{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className='card-footer'>
                                    <button
                                        className='project-btn'
                                        onClick={() => p.liveUrl ? openLink(p.liveUrl) : null}
                                    >
                                        View Project
                                    </button>
                                    <button
                                        className='project-btn secondary'
                                        onClick={() => p.codeUrl ? openLink(p.codeUrl) : null}
                                    >
                                        View Code
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <button className='add-project' onClick={openProjectModal}> Add Project </button>
                </div>
            </div>

            {isProjectOpen && (
                <div className="modal-overlay" onClick={closeProjectModal}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <h2>Add Project</h2>
                        <form onSubmit={handleProjectSave} className="modal-form">
                            <label>
                                Title
                                <input name="title" value={projectForm.title} onChange={handleProjectChange} />
                            </label>
                            <label>
                                Description
                                <textarea name="description" value={projectForm.description} onChange={handleProjectChange} />
                            </label>
                            <label>
                                Image URL
                                <input name="image" value={projectForm.image} onChange={handleProjectChange} />
                            </label>
                            <label>
                                Live URL
                                <input name="liveUrl" value={projectForm.liveUrl} onChange={handleProjectChange} />
                            </label>
                            <label>
                                Code URL
                                <input name="codeUrl" value={projectForm.codeUrl} onChange={handleProjectChange} />
                            </label>
                            <label>
                                Techs (comma separated)
                                <input name="techs" value={projectForm.techs} onChange={handleProjectChange} />
                            </label>
                            <div className="modal-actions">
                                <button type="button" onClick={closeProjectModal}>Cancel</button>
                                <button type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}