import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { MdEdit, MdDelete } from 'react-icons/md';

const categories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Fashion' },
  { id: 3, name: 'Home & Kitchen' },
  { id: 4, name: 'Books' },
  { id: 5, name: 'Sports' },
];

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    rating: '',
    description: '',
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/api/products');
      setProducts(response.data);
    } catch (err) {
      handleSnackbar('Failed to fetch products.', 'error');
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProductId) {
        await axiosInstance.put(`/api/products/${editingProductId}`, product);
        handleSnackbar('Product updated successfully.', 'success');
      } else {
        await axiosInstance.post('/api/products', product);
        handleSnackbar('Product added successfully.', 'success');
      }
      setProduct({ name: '', price: '', category: '', rating: '', description: '' });
      setEditingProductId(null);
      setOpen(false);
      fetchProducts();
    } catch (err) {
      handleSnackbar('Failed to save product.', 'error');
    }
  };

  const handleEdit = (prod) => {
    setProduct(prod);
    setEditingProductId(prod._id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/products/${id}`);
      handleSnackbar('Product deleted successfully.', 'success');
      fetchProducts();
    } catch (err) {
      handleSnackbar('Failed to delete product.', 'error');
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setProduct({ name: '', price: '', category: '', rating: '', description: '' });
    setEditingProductId(null);
  };

  const handleSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New Product
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingProductId ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Product Name"
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            label="Product Price"
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            fullWidth
            required
          />
          <Select
            name="category"
            value={product.category}
            onChange={handleChange}
            fullWidth
            required
            displayEmpty
            sx={{ mt: 2 }}
          >
            <MenuItem value="" disabled>Select a category</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            margin="dense"
            label="Rating (0-5)"
            type="number"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            fullWidth
            required
            inputProps={{ min: 0, max: 5, step: 0.1 }}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingProductId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((prod) => (
              <TableRow key={prod._id}>
                <TableCell>{prod.name}</TableCell>
                <TableCell>${prod.price.toFixed(2)}</TableCell>
                <TableCell>{prod.category}</TableCell>
                <TableCell>{prod.rating}</TableCell>
                <TableCell>{prod.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(prod)} color="primary">
                    <MdEdit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(prod._id)} color="secondary">
                    <MdDelete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </div>
  );
};

export default AdminDashboard;