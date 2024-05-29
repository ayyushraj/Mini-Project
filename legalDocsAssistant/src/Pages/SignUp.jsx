import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {BASE_API} from '../api.js'



const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    try {
      await axios.post(`${BASE_API}/auth/signup`, {
        username,
        email,
        password,
      });
      toast.success('Signup successful!');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };




  return (
    <form className="card-body gap-2" onSubmit={handleSubmit}>
      <div className="form-control">
        <input type="text" placeholder="Username" className="input input-bordered border-black" required value={username} onChange={handleUsernameChange} />
      </div>
      <div className="form-control">
        <input type="email" placeholder="Email" className="input input-bordered border-black" required value={email} onChange={handleEmailChange} />
      </div>
      <div className="form-control">
        <input type="password" placeholder="Password" className="input input-bordered border-black" required value={password} onChange={handlePasswordChange} />
      </div>
      <div className="form-control mt-4">
        <button type="submit" className="btn btn-success">Submit</button>
      </div>
    </form>
  );
};

export default SignupForm;
