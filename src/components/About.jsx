import './About.css';
import resume from '../assets/Alastair Graham - Resume.pdf';
import head_shot from '../assets/head-shot.jpg';
export default function About() {
    return (
        <>
            <div>
                <h2>About Me:</h2>
                <div>
                    <div className='selfie-container'>
                        <img className='head-shot' src={head_shot} alt="Head Shot"/>
                    </div>
                    <div className='intro'>
                        <h3>Alastair Graham</h3>
                        <p>I'm a former Aircraft Engineer turned Software Engineering Student currently studying Software Engineering Technology at Centennial College in Toronto. I am a passionate problem solver and love learning new skills as well as working with others on projects with innovative solutions</p>
                    </div>
                    <div className='resume-frame'>
                        <iframe
                            src={resume}
                            title="Resume"
                            width="80%"
                            height="600px"
                            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
                        ></iframe>

                    </div>
                </div>
            </div>
        </>
    )
}