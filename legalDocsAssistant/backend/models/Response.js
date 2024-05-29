import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: 'User',
        required: true
    },
    responses: [{
        question: {
            type: Number,
            ref: 'Question',
            required: true
        },
        response: {
            type: String,
            required: true
        }
    }]
});

const Response = mongoose.model('Response', responseSchema);

export default Response;
