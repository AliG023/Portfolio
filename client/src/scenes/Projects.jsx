import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Project.css';
import AGLogo from '../assets/AG-logo.svg';
import Proj2 from '../assets/project2-pic.jpg';
import Proj3 from '../assets/project3-pic.jpg';

export default function Projects() {
    const navigate = useNavigate();

    const openLink = (url) => {
        window.open(url, '_blank');
    };

    const [projects, setProjects] = useState([
        {
            _id: '1',
            title: 'Personal Portfolio Website',
            description: 'A responsive React-based portfolio showcasing modern web development skills with clean UI/UX design and interactive components.',
            image: AGLogo,
            liveUrl: 'https://ali-graham-portfolio.onrender.com',
            codeUrl: 'https://github.com/AliG023/Portfolio',
            tech: ['React', 'CSS', 'JavaScript']
        },
        {
            _id: '2',
            title: 'Drag & Drop Checkers Game',
            description: 'A browser-based checkers game with intuitive drag-and-drop play using vanilla JavaScript. Includes move validation, trash collection and JavaScript alerts.',
            image: Proj2,
            liveUrl: 'https://alig023.github.io/COMP125/Assignment04/',
            codeUrl: 'https://github.com/AliG023/COMP125/tree/main/Assignment04',
            tech: ['HTML', 'CSS', 'JavaScript']
        },
        {
            _id: '3',
            title: 'Mock Web Hosting Site',
            description: 'A sleek, responsive mock web site for Web Hosting Canada using HTML, CSS, and JavaScript. Focused on clean UI, semantic structure, and interactive elements.',
            image: Proj3,
            liveUrl: 'https://alig023.github.io/COMP213/FinalProject/',
            codeUrl: 'https://github.com/AliG023/COMP213/tree/main/FinalProject',
            tech: ['HTML', 'CSS', 'JavaScript']
        }
    ]);

    const handleDeleteProject = (projectId) => {
        setProjects(prev => prev.filter(p => p._id !== projectId));
    };

    const [isProjectOpen, setIsProjectOpen] = useState(false);
    const [projectForm, setProjectForm] = useState({
        title: '',
        description: '',
        image: '',
        liveUrl: '',
        codeUrl: '',
        tech: ''
    });

    const openProjectModal = () => {
        setProjectForm({ title: '', description: '', image: '', liveUrl: '', codeUrl: '', tech: '' });
        setIsProjectOpen(true);
    };
    const closeProjectModal = () => setIsProjectOpen(false);

    const handleProjectChange = (e) => {
        const { name, value } = e.target;
        setProjectForm(prev => ({ ...prev, [name]: value }));
    };

    const handleProjectSave = (e) => {
        e.preventDefault();
        if (!projectForm.title.trim()) return; 

        const newProject = {
            _id: `new-${Date.now()}`, 
            title: projectForm.title.trim(),
            description: projectForm.description.trim(),
            image: projectForm.image.trim(),
            liveUrl: projectForm.liveUrl.trim(),
            codeUrl: projectForm.codeUrl.trim(),
            tech: projectForm.tech
                ? projectForm.tech.split(',').map(t => t.trim()).filter(Boolean)
                : []
        };

        setProjects(prev => [newProject, ...prev]);
        setProjectForm({ title: '', description: '', image: '', liveUrl: '', codeUrl: '', tech: '' });
        closeProjectModal();
    };

    return(
        <>
            <div className='page'>
                <div className='projects-container'>
                    <h2>My Projects</h2>
                    <div className='projects-table-container'>
                        <table className='projects-table'>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Tech Stack</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((p) => (
                                    <tr key={p._id}>
                                        <td>
                                            <div className='project-image-container'>
                                                <img src={p.image} alt={`${p.title} thumbnail`} className='project-image' />
                                            </div>
                                        </td>
                                        <td>{p.title}</td>
                                        <td>{p.description}</td>
                                        <td>
                                            <div className='tech-stack'>
                                                {(p.tech || []).map((t, idx) => (
                                                    <span className='tech-tag' key={idx}>{t}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='action-buttons'>
                                                <button className='project-btn' onClick={() => p.liveUrl ? openLink(p.liveUrl) : null}>View Project</button>
                                                <button className='project-btn' onClick={() => p.codeUrl ? openLink(p.codeUrl) : null}>View Code</button>
                                                <button className='project-btn' onClick={() => navigate(`/project-details/${p._id}`)}>Update</button>
                                                <button className='project-btn secondary' onClick={() => handleDeleteProject(p._id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                                Tech (comma separated)
                                <input name="tech" value={projectForm.tech} onChange={handleProjectChange} />
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