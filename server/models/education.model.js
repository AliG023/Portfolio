import mongoose from 'mongoose'

const EducationSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: 'Title is required'
    },
    firstname: {
        type: String,
        trim: true,
        required: 'First Name is required'
    },
    lastname: {
        type: String,
        trim: true,
        required: 'Last Name is required'
    },
    email: {
        type: String,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    date: {
        type: Date,
        required: 'Completion Date is required'
    },
    description: {
        type: String,
        required: 'Description is required'
    }
});

export default mongoose.model('Education', EducationSchema);