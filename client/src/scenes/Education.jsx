import { useState } from 'react';
import '../styles/Education.css';

export default function Education () {

    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({ type: 'postsecondary', subject: '', school: '', dates: '' });
    const [educationList, setEducationList] = useState([
        { type: 'postsecondary', subject: 'Software Engineer Technology', school: 'Centennial College, Toronto', dates: 'Sep.2024 - Present' },
        { type: 'postsecondary', subject: 'Aeronautical Engineering', school: 'Defence College of Aeronautical Engineering, England', dates: 'Jun.2010 - Oct.2013' },
        { type: 'skills', subject: 'Measurement Canada Inspection Technician', school: 'Measurement Canada', dates: 'Jul.2022' },
        { type: 'skills', subject: 'NFPA 1001 Firefighter I & II', school: 'College of the Rockies', dates: 'Nov.2021' },
        { type: 'skills', subject: 'NFPA 1071 Hazmat Awareness & Operations', school: 'College of the Rockies', dates: 'Nov.2021' }
    ]);

    function openModal() {
        setForm({ type: 'postsecondary', subject: '', school: '', dates: '' });
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function handleSave(e) {
        e.preventDefault();
        if (!form.subject.trim()) return;

        const newEntry = {
            type: form.type || 'postsecondary',
            subject: form.subject.trim(),
            school: form.school.trim(),
            dates: form.dates.trim()
        };

        setEducationList(prev => [newEntry, ...prev]);

        // reset form and close
        setForm({ type: 'postsecondary', subject: '', school: '', dates: '' });
        closeModal();
    }

    return(
        <>
            <div className='page'>
                <div className='tables'>
                    <h2>Post Secondary Education</h2>
                    <div className='education-table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>School</th>
                                    <th>Dates</th>
                                </tr>
                            </thead>
                            <tbody>
                                {educationList
                                    .filter(e => e.type === 'postsecondary')
                                    .map((e, i) => (
                                        <tr key={i}>
                                            <td>{e.subject}</td>
                                            <td>{e.school}</td>
                                            <td>{e.dates}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <h3>Additional Skills & Certifications</h3>
                    <div className='skills-table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>School</th>
                                    <th>Dates</th>
                                </tr>
                            </thead>
                            <tbody>
                                {educationList
                                    .filter(e => e.type === 'skills')
                                    .map((e, i) => (
                                        <tr key={i}>
                                            <td>{e.subject}</td>
                                            <td>{e.school}</td>
                                            <td>{e.dates}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <button className='Add' onClick={openModal}> Add Education </button>
                </div>
            </div>

            {isOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <h2>Add Education</h2>
                        <form onSubmit={handleSave} className="modal-form">
                            <label>
                                Type
                                <div className="radio-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name="type"
                                            value="postsecondary"
                                            checked={form.type === 'postsecondary'}
                                            onChange={handleChange}
                                        />
                                        Post Secondary
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="type"
                                            value="skills"
                                            checked={form.type === 'skills'}
                                            onChange={handleChange}
                                        />
                                        Additional Cert
                                    </label>
                                </div>
                            </label>
                            <label>
                                Subject
                                <input name="subject" value={form.subject} onChange={handleChange} />
                            </label>
                            <label>
                                School
                                <input name="school" value={form.school} onChange={handleChange} />
                            </label>
                            <label>
                                Dates
                                <input name="dates" value={form.dates} onChange={handleChange} />
                            </label>
                            <div className="modal-actions">
                                <button type="button" onClick={closeModal}>Cancel</button>
                                <button type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}