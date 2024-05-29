import Response from '../models/Response.js';

export const saveResponse = async (req, res) => {
    const { userId, questionId, response } = req.body;

    if (!userId || !questionId || !response) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        let userResponse = await Response.findOne({ user: userId });

        if (!userResponse) {
            userResponse = new Response({ user: userId, responses: [] });
        }

        const existingResponseIndex = userResponse.responses.findIndex(
            r => r.question === questionId
        );

        if (existingResponseIndex !== -1) {
            userResponse.responses[existingResponseIndex].response = response;
        } else {
            userResponse.responses.push({ question: questionId, response });
        }

        await userResponse.save();
        return res.status(200).json({ message: 'Response saved successfully' });
    } catch (error) {
        console.error('Error saving response:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const fetchUserResponses = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const userResponse = await Response.findOne({ user: userId });

        if (!userResponse) {
            return res.status(404).json({ message: 'No responses found for this user' });
        }

        return res.status(200).json(userResponse.responses);
    } catch (error) {
        console.error('Error fetching responses:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
