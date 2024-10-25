import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axiosInstance';
import { Chip, Snackbar, Alert } from '@mui/material';

const UserProfile = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [recentOrders, setRecentOrders] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const response = await axiosInstance.get(`/api/orders/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setRecentOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setSnackbar({ open: true, message: 'Failed to fetch recent orders', severity: 'error' });
      }
    };

    fetchRecentOrders();
  }, [user.id, user.token]);

  const handleChangeUsername = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.put(`/api/users/${user.id}/username`, { username }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSnackbar({ open: true, message: 'Username updated successfully', severity: 'success' });
    } catch (err) {
      console.error('Error updating username:', err);
      setSnackbar({ open: true, message: 'Failed to update username', severity: 'error' });
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.put(`/api/users/${user.id}/password`, { password }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSnackbar({ open: true, message: 'Password updated successfully', severity: 'success' });
      setPassword('');
    } catch (err) {
      console.error('Error updating password:', err);
      setSnackbar({ open: true, message: 'Failed to update password', severity: 'error' });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Personal Details</h2>
        <p>username: {user.username}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Update Personal Information</h2>
        <form onSubmit={handleChangeUsername}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Change Username
          </button>
        </form>

        <form onSubmit={handleChangePassword} className="mt-4">
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Change Password
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Recent Orders ({recentOrders.length})</h2>
        {recentOrders.length === 0 ? (
          <p>No recent orders found.</p>
        ) : (
          <ul>
            {recentOrders.map(order => (
              <li key={order._id} className="border relative p-2 mb-2">
                <h3 className="font-semibold">Order ID: {order._id}</h3>
                <p>Total Amount: ${order.totalAmount}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <Chip 
                  color={order.status === 'pending' ? "warning" : order.status ==='approved'? 'success': "error"}
                  sx={{ position: 'absolute', right: 5, top: 26 }}
                  label={order.status}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserProfile;