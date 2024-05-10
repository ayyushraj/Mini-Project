/* eslint-disable react/prop-types */
import { useState } from 'react';

const Question = ({ question, options }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (index) => {
        setSelectedOption(index);
    };

    const renderOptions = () => {
        if (options && options.length > 0) {
            return (
                <ul>
                    {options.map((option, index) => (
                        <li key={index}>
                            <label>
                                <input
                                    type="radio"
                                    value={index}
                                    checked={selectedOption === index}
                                    onChange={() => handleOptionChange(index)}
                                />
                                {option}
                            </label>
                        </li>
                    ))}
                </ul>
            );
        } else {
            return <textarea placeholder="Your answer..." />;
        }
    };

    return (
        <div>
            <h3>{question}</h3>
            {renderOptions()}
        </div>
    );
};

export default Question;
