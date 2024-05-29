/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {BASE_API} from '../api.js'
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsnChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_API}/auth/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      toast.success('Login successful');
      navigate('/lease')
    } catch (error) {
      toast.error('Login failed');
      console.error(error);
    }
  };

  return (
    <form className="card-body gap-2" onSubmit={handleSubmit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-black">Email</span>
        </label>
        <input type="eail" placeholder="example@gmail.com" className="input input-bordered border-black" required value={email} onChange={handleUsnChange} />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-black">Password</span>
        </label>
        <input type="password" placeholder="********" className="input input-bordered border-black" required value={password} onChange={handlePasswordChange} />
      </div>
      <div className="form-control mt-4">
        <button type="submit" className="btn btn-success">Login</button>
      </div>
    </form>
  );
};

export default Login;
