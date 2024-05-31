import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'; 
import { BASE_API } from '../api';

export default function Lease() {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const jwt = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      const decodedToken = jwtDecode(jwt);
      setUsername(decodedToken.username);
      setEmail(decodedToken.email);
    }
  }, [jwt]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePlace = (event) => {
    setSelectedPlace(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Selected doc:", selectedOption, selectedPlace);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_API}/auth/updateState`, {
        email: email,
        state: selectedPlace,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      navigate('/Form');
    } catch (error) {
      console.error('Failed to update state:', error);
    }
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
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Rental and Lease Agreements</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome, {username.charAt(0).toUpperCase() + username.slice(1)}!</h1>
        <p className="text-gray-700 text-center mb-4">Answer a few questions to get your customized agreement template.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="document" className="block text-sm font-medium text-gray-700">Select Document</label>
            <select
              id="document"
              value={selectedOption}
              onChange={handleSelectChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select document</option>
              {leaseSubTypes.map((lease, index) => (
                <option key={index} value={lease}>{lease}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">Select State/Territory</label>
            <select
              id="state"
              value={selectedPlace}
              onChange={handlePlace}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a state/territory</option>
              {indiaStates.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
