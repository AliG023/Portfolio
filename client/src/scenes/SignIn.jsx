import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/usercontext.jsx";

const SignIn = () => {
    const { signIn } = useUser();
    // State for form data
    const [form, setForm] = useState({
        username: '',
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
        try {
            await signIn(form.username, form.password);

            // Redirect to Home Page after successful sign in
            navigate('/');
        }
        catch (err) {
            setError(err.message);
        }
    };

    // JSX for the Sign In form
    return (
        <div className="page">
            <div className='contact-container'>
                <h2>Sign In</h2>
                    <div className="contact-form">
                        {error && <p className="error">{error}</p>}
                        <form onSubmit={handleSubmit} className="sign-in-form">
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" name="username" value={form.username} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="submit-btn">Sign In</button>
                            </div>
                        </form>
                    </div>
            </div>
        </div>
    );
};

export default SignIn;

