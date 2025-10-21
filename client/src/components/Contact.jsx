import './Contact.css'

// This function handles the Contact form submission click and data capture
export default function Contact () {
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        console.log('Form Data Submitted:');
        console.log('Contact Input:', data);
        
        alert("Thank You For Reaching Out");
        e.target.reset();
    };

    return (
        <>
            <div className="page">
                <div className="contact-container">
                    <h2>Contact Me</h2>
                    <div className="contact-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name *</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    required 
                                    placeholder="Your full name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input 
                                    type="tel" 
                                    id="phone" 
                                    name="phone" 
                                    placeholder="Your phone number"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    required 
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject *</label>
                                <input 
                                    type="text" 
                                    id="subject" 
                                    name="subject" 
                                    required 
                                    placeholder="What's this about?"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message *</label>
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    required 
                                    rows="6"
                                    placeholder="Please write your message here..."
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <button type="submit" className="submit-btn">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}