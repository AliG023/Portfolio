import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
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
        try {
            const response = await fetch('http://localhost:3000/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                throw new Error('Sign In Failed');
            }

            const data = await response.json();
            console.log('Sign In Response:', data);
            // Set Token and Username in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.user.username);

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
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
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

      