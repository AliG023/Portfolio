import educationModel from "../models/education.model.js"

// CREATE NEW EDUCATION
export const createEducation = async (req, res) =>{
    try {
        const newEducation = new educationModel(req.body);
        const savedEducation = await newEducation.save();
        res.status(200).json(savedEducation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// READ ALL EDUCATION
export const getAllEducation = async (req, res) => {
    try {
        const educations = await educationModel.find();
        res.status(200).json(educations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// READ EDUCATION BY ID
export const getEducationById = async (req, res) => {
    try {
        const education = await educationModel.findById(req.params.id);
        if (!education) {
            return res.status(404).json({ message: 'Education not found' });
        }
        res.status(200).json(education);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// UPDATE EDUCATION BY ID
export const updateEducationById = async (req, res) => {
    try {
        const updatedEducation = await educationModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEducation) {
            return res.status(404).json({ message: 'Education not found' });
        }
        res.status(200).json(updatedEducation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DELETE EDUCATION BY ID
export const deleteEducationById = async (req, res) => {
    try {
        const deletedEducation = await educationModel.findByIdAndDelete(req.params.id);
        if (!deletedEducation) {
            return res.status(404).json({ message: 'Education not found' });
        }
        res.status(200).json({ message: 'Education deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}