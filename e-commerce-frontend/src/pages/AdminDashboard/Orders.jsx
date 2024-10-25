import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { Chip, IconButton, Menu, MenuItem, Snackbar, Alert } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/api/orders');
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setSnackbar({ open: true, message: 'Failed to fetch orders', severity: 'error' });
      }
    };

    fetchOrders();
  }, []);

  const handleMenuOpen = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const handleStatusUpdate = async (status) => {
    try {
      await axiosInstance.put(`/api/orders/${selectedOrderId}/status`, { status });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrderId ? { ...order, status } : order
        )
      );
      setSnackbar({ open: true, message: `Order ${status} successfully`, severity: 'success' });
    } catch (err) {
      console.error(`Failed to update order status to ${status}:`, err);
      setSnackbar({ open: true, message: 'Failed to update order', severity: 'error' });
    }
    handleMenuClose();
  };

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };

  const pendingOrders = orders && orders.filter(order => order.status === 'pending');
  const approvedOrders = orders && orders.filter(order => order.status === 'approved');
  const declinedOrders = orders && orders.filter(order => order.status === 'declined');

  return (
    <div className='min-h-screen'>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      <section className="mb-6">
        <h3 className="text-1xl font-bold mb-4">Pending Orders</h3>
        {pendingOrders.length === 0 ? (
          <p>No pending orders found.</p>
        ) : (
          <ul>
            {pendingOrders.map((order) => (
              <li key={order._id} className="border relative p-2 mb-2">
                <Chip color="warning" label={order.status} />
                <h3 className="font-semibold">Order ID: {order._id}</h3>
                <p>Total Amount: ${order.totalAmount}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <IconButton
                  aria-controls="order-menu"
                  aria-haspopup="true"
                  onClick={(event) => handleMenuOpen(event, order._id)}
                  style={{ position: 'absolute', right: 5, top: 26 }}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="order-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleStatusUpdate('approved')}>Approve</MenuItem>
                  <MenuItem onClick={() => handleStatusUpdate('declined')}>Decline</MenuItem>
                </Menu>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-6">
        <h3 className="text-1xl font-bold mb-4">Orders in Progress</h3>
        {approvedOrders.length === 0 ? (
          <p>No orders in progress.</p>
        ) : (
          <ul>
            {approvedOrders.map((order) => (
              <li key={order._id} className="border relative p-2 mb-2">
                <Chip color="success" label={order.status} />
                <h3 className="font-semibold">Order ID: {order._id}</h3>
                <p>Total Amount: ${order.totalAmount}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="text-1xl font-bold mb-4">Declined Orders</h3>
        {declinedOrders.length === 0 ? (
          <p>No declined orders.</p>
        ) : (
          <ul>
            {declinedOrders.map((order) => (
              <li key={order._id} className="border relative p-2 mb-2">
                <Chip color="error" label={order.status} />
                <h3 className="font-semibold">Order ID: {order._id}</h3>
                <p>Total Amount: ${order.totalAmount}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Orders;