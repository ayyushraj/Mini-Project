import { useNavigate } from 'react-router-dom';
import { FaRegFileAlt, FaRobot } from 'react-icons/fa';
import logo from '../assets/DocWise_Black.png'

export default function LandingPage() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(path);
    } else {
      navigate('/signup');
    }
  };

  const handleNavigate2 = (url) => {
    window.location.href = url;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <img className="h-20 w-20" src={logo} alt="Logo" />
      <h1 className="text-6xl font-bold mb-10 text-center">Welcome to DocWise</h1>
      <p className="text-2xl font-semibold mb-16 text-center max-w-3xl">
        DocWise helps you easily summarize legal documents and generate legal document templates tailored to your needs.
      </p>
      <div className="flex space-x-8 mb-16">
        <button
          onClick={() => handleNavigate2('http://localhost:8501/')}
          className="flex items-center px-8 py-4 text-3xl font-bold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700"
        >
          <FaRobot className="mr-4" /> Use Chatbot
        </button>
        <button
          onClick={() => handleNavigate('/lease')}
          className="flex items-center px-8 py-4 text-3xl font-bold text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700"
        >
          <FaRegFileAlt className="mr-4" /> Generate Legal Document Template
        </button>
      </div>
    </div>
  );
}
