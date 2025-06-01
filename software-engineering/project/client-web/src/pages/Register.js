import React, { useState, useEffect } from 'react';
import { register, getProfile } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';

const Register = () => {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate = useNavigate();

  // If already authenticated, redirect to Home
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getProfile()
        .then(() => {
          navigate('/');
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await register({ name, email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-600 to-orange-600 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}

        {/* Name Input */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Name</label>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <User className="text-gray-400 mx-3" size={20} />
            <input
              type="text"
              className="w-full p-3 focus:outline-none"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Email</label>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <Mail className="text-gray-400 mx-3" size={20} />
            <input
              type="email"
              className="w-full p-3 focus:outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Password</label>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <Lock className="text-gray-400 mx-3" size={20} />
            <input
              type="password"
              className="w-full p-3 focus:outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition">
          Create Account
        </button>

        <p className="mt-4 text-center text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
