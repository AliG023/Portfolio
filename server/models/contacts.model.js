import mongoose from 'mongoose'

const ContactsSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    phone: {
        type: String,
        trim: true,
        required: 'Phone is required'
    },
    email: {
        type: String,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    subject: {
        type: String,
        trim: true,
        required: 'Subject is required'
    },
    message:{
        type: String,
        required: 'Message is required'
    }
});

export default mongoose.model('Contacts', ContactsSchema);