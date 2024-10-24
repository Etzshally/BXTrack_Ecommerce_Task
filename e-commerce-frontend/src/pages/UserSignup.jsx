import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const UserSignup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await axiosInstance.post('/users/register', { username, password });
      setSuccess('Registration successful! Please log in.');
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
    } catch (err) {
      setError('Failed to signup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center">Signup</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block text-sm">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`mt-6 w-full p-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {loading ? 'Loading...' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;
