import projectModel from "../models/project.model.js"

// CREATE NEW PROJECT
export const createProject = async (req, res) =>{
    try {
        const newProject = new projectModel(req.body);
        const savedProject = await newProject.save();
        res.status(200).json(savedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// READ ALL PROJECTS
export const getAllProjects = async (req, res) => {
    try {
        const projects = await projectModel.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// READ PROJECT BY ID
export const getProjectById = async (req, res) => {
    try {
        const project = await projectModel.findById(req.params.id); 
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// UPDATE PROJECT BY ID
export const updateProjectById = async (req, res) => {
    try {
        const updatedProject = await projectModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DELETE ALL PROJECTS
export const deleteAllProjects = async (req, res) => {
    try {
        const projects = await projectModel.deleteMany({});
        res.status(200).json({message: `${projects.deletedCount} projects deleted successfully`})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DELETE PROJECT BY ID
export const deleteProjectById = async (req, res) => {
    try {
        const deletedProject = await projectModel.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default { createProject, getAllProjects, getProjectById, updateProjectById, deleteAllProjects, deleteProjectById };