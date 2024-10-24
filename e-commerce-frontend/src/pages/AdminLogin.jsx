import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const { setUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Hardcoded admin credentials
  const ADMIN_CREDENTIALS = {
    username: 'admin', // your admin username
    password: 'admin123' // your admin password
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Check if entered credentials match the hardcoded admin credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Create a dummy token (or you can fetch a real one if needed)
      const token = 'dummy-admin-token';
      const role = 'admin'; // Role for the admin user
      // Set user state with admin details
      setUser({ token, username, role });
      localStorage.setItem('token', token); // Store the dummy token
      navigate('/admin'); // Redirect to admin dashboard
    } else {
      setError('Invalid admin credentials. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;