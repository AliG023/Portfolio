import {Routes, Route} from 'react-router-dom';
import Layout from './scenes/Layout';
import About from './scenes/About';
import Home from './scenes/Home';
import Contact from './scenes/Contact';
import Projects from './scenes/Projects';
import Education from './scenes/Education';
import Services from './scenes/Services';

export default function MainRouter () {
    return (
        <>
            <Layout />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/project' element={<Projects />} />
                <Route path='/education' element={<Education />} />
                <Route path='/service' element={<Services />} />
                <Route path='/contact' element={<Contact />} />
            </Routes>
        </>
    )
}