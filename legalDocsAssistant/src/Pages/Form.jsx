import { useState, useEffect } from 'react';
import Question from '../components/QuestionComp/Questions';
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
            navigate(`/report/${userData.email}`);
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
        <div className="flex justify-center">
            <div className="w-full max-w-2xl p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Question List</h1>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
                {!loading && !error && (
                    <div>
                    
                        {questionList.map((question, index) => (
                            index === currentQuestionIndex && (
                                <div key={question.questionIndex} className="bg-white rounded-lg shadow-md p-6 mb-6">
                                    <Question
                                        question={question.question}
                                        options={question.options}
                                        multiple={question.multiple}
                                        numInput={question.numInput}
                                        date={question.date}
                                        onResponseChange={handleResponseChange}
                                        response={currentResponse}
                                        questionNumber={index + 1}
                                    />
                                    <div className="flex justify-between mt-6">
                                        {currentQuestionIndex > 0 && (
                                            <button onClick={handlePrevQuestion} className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md">Previous Question</button>
                                        )}
                                        {currentQuestionIndex < questionList.length - 1 && (
                                            <button onClick={handleNextQuestion} className="px-4 py-2 bg-blue-500 text-white rounded-md">Next Question</button>
                                        )}
                                        {currentQuestionIndex === questionList.length - 1 && (
                                            <button onClick={handleNextQuestion} className="px-4 py-2 bg-green-500 text-white rounded-md">Submit Responses</button>
                                        )}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
    
};

export default Form;
