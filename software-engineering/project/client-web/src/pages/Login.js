import React, { useState, useEffect } from 'react';
import { login, getProfile } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
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
          // If token is invalid, remove it
          localStorage.removeItem('token');
        });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login({ email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}

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

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition">
          Sign In
        </button>

        <p className="mt-4 text-center text-gray-500">
          Don’t have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
