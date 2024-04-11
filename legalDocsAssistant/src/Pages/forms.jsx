import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function forms() {
    const { docType, state } = useParams();
    const navigate = useNavigate();
    const [questionList, setQuestionList] = useState([]);
    const jsonData = [
        {
          docType: "Standard Lease Agreement",
          state: "Assam",
          question_list: [1, 3, 5, 6, 7, 8, 9, 11]
        },
        // Add more objects as needed
      ];
    // Function to search for the JSON object based on docType and state
  const searchJsonObject = () => {
    const foundObject = jsonData.find(obj => obj.docType === docType && obj.state === state);
    if (foundObject) {
      setQuestionList(foundObject.question_list);
    } else {
      // If object not found, handle accordingly (e.g., show error message)
      console.log("Object not found");
    }
  };

  useEffect(() => {
    searchJsonObject();
  }, []); // Run once on component mount

  // Redirect to a different route with the question list as parameter
  const handleRedirect = () => {
    navigate(`/pdf-builder/${questionList.join(',')}`);
  };

  return (
    <div>
      {/* Display question list or perform other actions */}
      <button onClick={handleRedirect}>Click to generate document</button>
    </div>
  );
}
