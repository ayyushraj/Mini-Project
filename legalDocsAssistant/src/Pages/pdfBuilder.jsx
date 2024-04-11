import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


function PdfBuilder() {
  const { questionIndexes } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const questionIndexArray = questionIndexes.split(',').map(index => parseInt(index));
    // Filter questions based on the questionIndexArray
    const filteredQuestions = questionIndexArray.map(index => questionsData[index]);
    setQuestions(filteredQuestions);
  }, [questionIndexes]);
  
  

  const handleOptionSelect = (option) => {
    setAnswers({ ...answers, [currentQuestionIndex]: option });
  };

  const handleSaveAndNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Answers:", answers);
    navigate('/thank-you');
  };

  return (
    <div>
      <h1>Question {currentQuestionIndex + 1}</h1>
      {questions.length > 0 && (
        <div>
          <p>{questions[currentQuestionIndex].question}</p>
          <ul>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <li key={index}>
                <input
                  type="radio"
                  name="options"
                  value={option}
                  checked={answers[currentQuestionIndex] === option}
                  onChange={() => handleOptionSelect(option)}
                />
                {option}
              </li>
            ))}
          </ul>
          <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</button>
          <button onClick={handleSaveAndNext} disabled={currentQuestionIndex === questions.length - 1}>Save and Next</button>
          {currentQuestionIndex === questions.length - 1 && <button onClick={handleSubmit}>Submit</button>}
        </div>
      )}
    </div>
  );
}

export default PdfBuilder;
