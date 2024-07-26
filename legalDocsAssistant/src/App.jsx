import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import SignUpForm from './Pages/SignUp';
import Form from './Pages/Form';
import Lease from './Pages/lease';
import Login from './Pages/Login';
import UserResponsesNDA from './Pages/Report/Non disclosure agreement';
import UserResponsesSLA from './Pages/Report/Standard Lease Agreement';
import UserResponsesPOA from './Pages/Report/Power of Attorney';
import UserResponsesEA from './Pages/Report/Employment agreement';
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
          <Route path="/form/:fileName" element={<Form />} />
          <Route path="/Non disclosure agreement/:id" element={<UserResponsesNDA />} />
          <Route path="/Standard Lease Agreement/:id" element={<UserResponsesSLA />} />
          <Route path="/Power of Attorney/:id" element={<UserResponsesPOA />} />
          <Route path="/Employment agreement/:id" element={<UserResponsesEA />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
