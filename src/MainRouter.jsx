import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import About from './components/About';
import Home from './components/Home';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Education from './components/Education';
import Services from './components/Services';

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