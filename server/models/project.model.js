import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required'
    },
    description: {
        type: String,
        required: 'Description is required'
    },
    image: {
        type: String
    },
    liveUrl: {
        type: String
    },
    codeUrl: {
        type: String,
        required: 'Code URL is required'
    },
    tech: {
        type: [String],
        required: 'At least one technology is required'
    }
});

export default mongoose.model('Project', ProjectSchema);