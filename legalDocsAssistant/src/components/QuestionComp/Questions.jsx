/* eslint-disable react/prop-types */
// import React from 'react';

const Question = ({ question, options, multiple, numInput, date, onResponseChange, response }) => {
    const handleOptionChange = (e) => {
        const { value, checked } = e.target;

        if (multiple) {
            let updatedResponse = response ? response.split(', ') : [];
            if (checked) {
                updatedResponse.push(value);
            } else {
                updatedResponse = updatedResponse.filter(option => option !== value);
            }
            onResponseChange(updatedResponse.join(', '));
        } else {
            onResponseChange(value);
        }
    };

    const handleInputChange = (e) => {
        onResponseChange(e.target.value);
    };

    const renderOptions = () => {
        if (options && options.length > 0) {
            return (
                <div>
                    <p className="text-xl my-2">Options:</p>
                    <ul className="list-none">
                        {options.map((option, index) => (
                            <li key={index}>
                                <label className="inline-flex items-center text-lg">
                                    <input
                                        type={multiple ? 'checkbox' : 'radio'}
                                        name={multiple ? `checkboxGroup-${question}` : `radioGroup-${question}`}
                                        value={option}
                                        checked={multiple ? response.split(', ').includes(option) : response === option}
                                        onChange={handleOptionChange}
                                        className="mr-2"
                                    />
                                    {option}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else if (numInput) {
            return <input type="number" value={response} onChange={handleInputChange} className="mb-2 p-2 rounded-md border border-gray-300" />;
        } else if (date) {
            return <input type="date" value={response} onChange={handleInputChange} className="mb-2 p-2 rounded-md border border-gray-300" />;
        } else {
            return <textarea value={response} onChange={handleInputChange} placeholder="Your answer..." className="mb-2 p-2 rounded-md border border-gray-300" />;
        }
    };

    return (
        <div className="my-4">
            <h3 className="text-2xl font-bold">{question}</h3>
            {renderOptions()}
        </div>
    );
};


export default Question;
