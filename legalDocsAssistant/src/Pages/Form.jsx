import  { useState, useEffect } from 'react';
import Question from './Question';

const Form = () => {
    const [questionList, setQuestionList] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // const [responses, setResponses] = useState({});

    const fetchQuestionList = async () => {
        try {
            const response = await fetch('http://localhost:5000/getQuestions');
            if (!response.ok) {
                throw new Error('Failed to fetch questions');
            }
            const data = await response.json();
            setQuestionList(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrevQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    };

    const handleSubmitResponses = () => {
        // Implement the submitResponses function
        // fetch('http://localhost:5000/submitResponses', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         userId: 'yourUserId', 
        //         responses: responses,
        //     }),
        // })
        // .then((response) => {
        //     if (!response.ok) {
        //         throw new Error('Failed to submit responses');
        //     }
        //     console.log('Responses submitted successfully');
        // })
        // .catch((error) => {
        //     console.error(error);
        // });
    };

    useEffect(() => {
        fetchQuestionList();
    }, []);

    return (
        <div>
            <h1>Question List</h1>
            {questionList.map((question, index) => (
                index === currentQuestionIndex && (
                    <Question
                        key={question._id}
                        question={question.question}
                        options={question.options}
                        // onChange={(response) => handleResponseChange(question._id, response)}
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
                    <button onClick={handleSubmitResponses}>Submit Responses</button>
                )}
            </div>
        </div>
    );
};

export default Form;
