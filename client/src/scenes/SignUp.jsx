import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

const SignUp = () => {
    const { signUp } = useUser();
    // State for form data
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });

    // State for handling errors
    const [error, setError] = useState('');
    // Navigation hook
    const navigate = useNavigate();

    const handleChange = (e) => {
        // Prevents Page Reload
        e.preventDefault();
        
        const { name, value } = e.target;

        setForm({ ...form, [name]: value });
    }

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        
        try {
            await signUp(form.username, form.email, form.password);
            navigate('/'); 
        }
        catch (err) {
            setError(err.message);
        }
    };

    // JSX for the SignUp form
    return (
        <div className="page">
            <div className='contact-container'>
                <h2>Sign Up</h2>
                    <div className="contact-form">
                        {error && <p className="error">{error}</p>}
                        <form onSubmit={handleSubmit} className="sign-up-form">
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" name="username" value={form.username} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="submit-btn">Sign Up</button>
                            </div>
                        </form>
                    </div>
            </div>
        </div>
    );
};

export default SignUp;