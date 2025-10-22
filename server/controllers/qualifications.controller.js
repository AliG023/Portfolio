import qualificationsModel from "../models/qualifications.model.js";

// CREATE NEW QUALIFICATION
export const createQualification = async (req, res) =>{
    try {
        const newQualification = new qualificationsModel(req.body);
        const savedQualification = await newQualification.save();
        res.status(200).json(savedQualification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// READ ALL QUALIFICATIONS
export const getAllQualifications = async (req, res) => {
    try {
        const qualifications = await qualificationsModel.find();
        res.status(200).json(qualifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// READ QUALIFICATION BY ID
export const getQualificationById = async (req, res) => {
    try {
        const qualification = await qualificationsModel.findById(req.params.id);
        if (!qualification) {
            return res.status(404).json({ message: 'Qualification not found' });
        }
        res.status(200).json(qualification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// UPDATE QUALIFICATION BY ID
export const updateQualificationById = async (req, res) => {
    try {
        const updatedQualification = await qualificationsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQualification) {
            return res.status(404).json({ message: 'Qualification not found' });
        }
        res.status(200).json(updatedQualification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DELETE ALL QUALIFICATIONS
export const deleteAllQualifications = async (req, res) => {
    try {
        const qualifications = await qualificationsModel.deleteMany({});
        res.status(200).json({ message: `${qualifications.deletedCount} qualifications records deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DELETE QUALIFICATION BY ID
export const deleteQualificationById = async (req, res) => {
    try {
        const deletedQualification = await qualificationsModel.findByIdAndDelete(req.params.id);
        if (!deletedQualification) {
            return res.status(404).json({ message: 'Qualification not found' });
        }
        res.status(200).json({ message: 'Qualification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default { createQualification, getAllQualifications, getQualificationById, updateQualificationById, deleteAllQualifications, deleteQualificationById };  