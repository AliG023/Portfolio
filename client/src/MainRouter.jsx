import { Routes, Route } from "react-router-dom";
import Layout from "./scenes/Layout";
import About from "./scenes/About";
import Home from "./scenes/Home";
import Projects from "./scenes/Projects";
import Education from "./scenes/Education";
import Contact from "./scenes/Contact";
import Services from "./scenes/Services";
import Messages from "./scenes/Messages";
import User from "./scenes/User";
import SignUp from "./scenes/SignUp";
import SignIn from "./scenes/SignIn";

export default function MainRouter() {
  return (
    <>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/education" element={<Education />} />
        <Route path="/service" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/users" element={<User />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}
