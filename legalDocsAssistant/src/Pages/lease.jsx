import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


export default function lease() {
// State to manage the selected option
const [selectedOption, setSelectedOption] = useState(''); // Set initial state to empty string
const [selectedPlace, setSelectedPlace] = useState(''); // Set initial state to empty string

const navigate = useNavigate(); 

// Function to handle the change in the selected option
const handleSelectChange = (event) => {
  setSelectedOption(event.target.value);
};
const handlePlace=(event)=>{
    setSelectedPlace(event.target.value);
}

const handleSubmit = () => {
    // Perform any action needed before redirection, such as validating selectedOptionIndex
    console.log("Selected doc:", selectedOption);

    // Redirect to a different route and pass selectedOptionIndex as a parameter
    navigate(`/forms/${selectedOption}/${selectedPlace}`);
  };

const leaseSubTypes = [
    "Standard Lease Agreement",
    "Room Rental Agreement",
    "Commercial Lease Agreement"
];
const indiaStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry"
  ];
return (
  <div>
    <h1>Rental and Lease Agreement Templates</h1>
    {/* Dropdown menu */}
    <select value={selectedOption} onChange={handleSelectChange}>
      {/* Default option */}
      <option value="">Select document</option>
      {/* Mapping over the array to create options */}
      {leaseSubTypes.map((lease,index)=>(
        <option key={index} value={lease}>{lease}</option>
        ))}
      
    </select>
    {selectedOption !== '' && (
        <select value={selectedPlace} onChange={handlePlace}>
          <option value="">Select a state/territory</option>
          {/* Mapping over the array to create options */}
          {indiaStates.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>
      )}

      <button onClick={handleSubmit}>Submit</button>
      
  </div>
);
}
