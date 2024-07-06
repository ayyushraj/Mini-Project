import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Lease() {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePlace = (event) => {
    setSelectedPlace(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected doc:", selectedOption, selectedPlace);
    navigate('/Form');
  };

  const leaseSubTypes = [
    "Standard Lease Agreement",
    "Room Rental Agreement",
    "Commercial Lease Agreement",
    "Non-Disclosure Agreement",
    "Last Will"
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
      <form onSubmit={handleSubmit}>
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">Select document</option>
          {leaseSubTypes.map((lease, index) => (
            <option key={index} value={lease}>{lease}</option>
          ))}
        </select>
        {selectedOption !== '' && (
          <select value={selectedPlace} onChange={handlePlace}>
            <option value="">Select a state/territory</option>
            {indiaStates.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
