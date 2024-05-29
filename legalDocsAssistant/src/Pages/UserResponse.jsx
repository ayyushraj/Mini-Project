import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_API } from '../api';
import { useParams } from 'react-router-dom';

const UserResponses = () => {
    const { id } = useParams();
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const response = await axios.get(`${BASE_API}/response/getResponse/${id}`);
                setResponses(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchResponses();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching responses: {error.message}</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">User Responses (for user {id})</h2>
            <ul className="list-disc pl-5 space-y-2">
                {responses.map((response, index) => (
                    <li key={index} className="border-b pb-2">
                        <p className="font-semibold">Question {response.question}:</p>
                        <p>{response.response}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserResponses;
