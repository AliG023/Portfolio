import mongoose from 'mongoose'

const QualificationSchema = new mongoose.Schema({
    type: {
        type: String,
        trim: true,
        required: 'Type is required'
    },
    Subject: {
        type: String,
        trim: true,
        required: 'Subject is required'
    },
    School: {
        type: String,
        trim: true,
        required: 'School is required'
    },
    Date: {
        type: String,
        trim: true,
        required: 'Date is required'
    }
});

export default mongoose.model('Qualifications', QualificationSchema);