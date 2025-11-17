import mongoose from 'mongoose'

const QualificationSchema = new mongoose.Schema({
    school: {
        type: String,
        trim: true,
        required: 'School is required'
    },
    degree: {
        type: String,
        trim: true,
        required: 'Degree is required'
    },
    year: {
        type: String,
        trim: true,
        required: 'Year is required'
    }
});

export default mongoose.model('Qualifications', QualificationSchema);