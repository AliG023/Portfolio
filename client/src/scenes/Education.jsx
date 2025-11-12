import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Education.css';

export default function Education() {
    const navigate = useNavigate();

    const [isEducationOpen, setIsEducationOpen] = useState(false);
    const [educationForm, setEducationForm] = useState({
        school: '',
        degree: '',
        year: '',
    });

    const [education, setEducation] = useState([
        {
            _id: '1',
            school: 'George Brown College',
            degree: 'Computer Programming & Analysis',
            year: '2023 - Present',
        },
        {
            _id: '2',
            school: 'Toronto Metropolitan University',
            degree: 'Bachelor of Arts, Sociology',
            year: '2017 - 2021',
        },
    ]);

    const openEducationModal = () => setIsEducationOpen(true);
    const closeEducationModal = () => setIsEducationOpen(false);

    const handleEducationChange = (e) => {
        const { name, value } = e.target;
        setEducationForm(prev => ({ ...prev, [name]: value }));
    };

    const handleEducationSave = (e) => {
        e.preventDefault();
        if (!educationForm.school.trim() || !educationForm.degree.trim()) return;

        const newEducation = {
            _id: `new-${Date.now()}`,
            school: educationForm.school.trim(),
            degree: educationForm.degree.trim(),
            year: educationForm.year.trim(),
        };

        setEducation(prev => [newEducation, ...prev]);
        setEducationForm({ school: '', degree: '', year: '' });
        closeEducationModal();
    };
    
    const handleDeleteEducation = (educationId) => {
        setEducation(prev => prev.filter(edu => edu._id !== educationId));
    };

    return (
        <>
            <div className='page'>
                <div className='education-container'>
                    <h2>My Education</h2>
                    <div className='education-table-container'>
                        <table className='education-table'>
                            <thead>
                                <tr>
                                    <th>School</th>
                                    <th>Degree / Certificate</th>
                                    <th>Year</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {education.map((edu) => (
                                    <tr key={edu._id}>
                                        <td>{edu.school}</td>
                                        <td>{edu.degree}</td>
                                        <td>{edu.year}</td>
                                        <td>
                                            <div className='action-buttons'>
                                                <button className='education-btn' onClick={() => navigate(`/education-details/${edu._id}`)}>Update</button>
                                                <button className='education-btn secondary' onClick={() => handleDeleteEducation(edu._id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <button className='add-education' onClick={openEducationModal}> Add Education </button>
                </div>
            </div>

            {isEducationOpen && (
                <div className="modal-overlay" onClick={closeEducationModal}>
                    <div className="modal-card" onClick={e => e.stopPropagation()}>
                        <h2>Add New Education</h2>
                        <form className="modal-form" onSubmit={handleEducationSave}>
                            <label>
                                School:
                                <input type="text" name="school" value={educationForm.school} onChange={handleEducationChange} required />
                            </label>
                            <label>
                                Degree / Certificate:
                                <input type="text" name="degree" value={educationForm.degree} onChange={handleEducationChange} required />
                            </label>
                            <label>
                                Year:
                                <input type="text" name="year" value={educationForm.year} onChange={handleEducationChange} />
                            </label>
                            <div className="modal-actions">
                                <button type="button" onClick={closeEducationModal}>Cancel</button>
                                <button type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}