import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './Pages/SignUp';
import Form from './Pages/Form';
import Lease from './Pages/Lease';
import Login from './Pages/Login';
import UserResponses from './Pages/UserResponse';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lease" element={<Lease />} />
        <Route path="/form" element={<Form />} />
        {/* bas display krne ke liye lagaya hai */}
        <Route path="/displayResponse/:id" element={<UserResponses/>} />
      </Routes>
    </Router>
  );
}

export default App;