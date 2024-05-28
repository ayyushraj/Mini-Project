import { useState, useEffect } from 'react';
import Question from './Question';
import { useNavigate } from 'react-router-dom'; 
import { BASE_API } from '../api';
import {jwtDecode} from 'jwt-decode';

const Form = () => {
    const navigate = useNavigate();
    const [questionList, setQuestionList] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [responses, setResponses] = useState({});
    const [currentResponse, setCurrentResponse] = useState('');
    const token = localStorage.getItem('token');
    const userData = token ? jwtDecode(token) : null;

    const fetchQuestionList = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_API}/questions/getQuestions`);
            if (!response.ok) {
                throw new Error('Failed to fetch questions');
            }
            const data = await response.json();
            setQuestionList(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleNextQuestion = async () => {
        if (!currentResponse) {
            alert('Please fill in your response');
            return;
        }

        try {
            await fetch(`${BASE_API}/response/saveResponse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userData?.email,
                    questionId: questionList[currentQuestionIndex].questionIndex,
                    response: currentResponse
                })
            });
        } catch (error) {
            console.error('Error saving response:', error);
        }

        setResponses(prevResponses => ({
            ...prevResponses,
            [questionList[currentQuestionIndex].questionIndex]: currentResponse
        }));

        setCurrentResponse('');
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);

        if (currentQuestionIndex === questionList.length - 1) {
            navigate(`/displayResponse/${userData.email}`); 
        }
        
    };

    const handlePrevQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    };

    const handleResponseChange = (response) => {
        setCurrentResponse(response);
    };

    useEffect(() => {
        fetchQuestionList();
    }, []);

    useEffect(() => {
        const currentQuestionId = questionList[currentQuestionIndex]?.questionIndex;
        if (currentQuestionId !== undefined) {
            setCurrentResponse(responses[currentQuestionId] || '');
        }
    }, [currentQuestionIndex, questionList, responses]);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
                <div>
                    <h1>Question List</h1>
                    {questionList.map((question, index) => (
                        index === currentQuestionIndex && (
                            <Question
                                key={question.questionIndex}
                                question={question.question}
                                options={question.options}
                                multiple={question.multiple}
                                numInput={question.numInput}
                                date={question.date}
                                onResponseChange={handleResponseChange}
                                response={currentResponse}
                            />
                        )
                    ))}
                    <div>
                        {currentQuestionIndex > 0 && (
                            <button onClick={handlePrevQuestion}>Previous Question</button>
                        )}
                        {currentQuestionIndex < questionList.length - 1 && (
                            <button onClick={handleNextQuestion}>Next Question</button>
                        )}
                        {currentQuestionIndex === questionList.length - 1 && (
                            <button onClick={(handleNextQuestion)}>Submit Responses</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Form;
