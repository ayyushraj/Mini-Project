/* eslint-disable react/prop-types */
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
                <ul style={{ listStyleType: 'none' }}>
                    {options.map((option, index) => (
                        <li key={index}>
                            <label>
                                <input
                                    type={multiple ? 'checkbox' : 'radio'}
                                    name={multiple ? `checkboxGroup-${question}` : `radioGroup-${question}`}
                                    value={option}
                                    checked={multiple ? response.split(', ').includes(option) : response === option}
                                    onChange={handleOptionChange}
                                />
                                {option}
                            </label>
                        </li>
                    ))}
                </ul>
            );
        } else if (numInput) {
            return <input type="number" value={response} onChange={handleInputChange} style={{ marginBottom: 2 }} />;
        } else if (date) {
            return <input type="date" value={response} onChange={handleInputChange} style={{ marginBottom: 2 }} />;
        } else {
            return <textarea value={response} onChange={handleInputChange} placeholder="Your answer..." />;
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
