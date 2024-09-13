import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import SignUpForm from './Pages/SignUp';
import Form from './Pages/Form';
import Lease from './Pages/lease.jsx';
import Login from './Pages/Login';
import UserResponses from './Pages/Report/ReportTemplate';
import LandingPage from './Pages/LandingPage';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16"> 
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lease" element={<Lease />} />
          <Route path="/form" element={<Form />} />
          <Route path="/report/:id" element={<UserResponses />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
