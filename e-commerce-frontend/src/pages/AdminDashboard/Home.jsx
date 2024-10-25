import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
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
  Alert,
} from '@mui/material';
import { MdEdit, MdDelete } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

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

  const handleSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="p-6 min-h-screen flex flex-col justify-start items-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="w-[90%] bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-700">Admin Dashboard - Products</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 px-5 py-2"
          >
            + Add Product
          </Button>
        </div>

        <MaterialReactTable
          columns={[
            { accessorKey: 'name', header: 'Product Name' },
            { accessorKey: 'price', header: 'Price', Cell: ({ cell }) => `$${cell.getValue().toFixed(2)}` },
            { accessorKey: 'category', header: 'Category' },
            { accessorKey: 'rating', header: 'Rating', Cell: ({ cell }) => `${cell.getValue()} / 5` },
            { accessorKey: 'description', header: 'Description', Cell: ({ cell }) => <span className="truncate">{cell.getValue() && cell.getValue().length > 30 ? cell.getValue().slice(0, 30) + " ..." : cell.getValue()}</span> },
            {
              id: 'actions',
              header: 'Actions',
              Cell: ({ row }) => (
                <div className="flex space-x-2">
                  <IconButton color="primary" onClick={() => handleEdit(row.original)}>
                    <MdEdit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(row.original._id)}>
                    <MdDelete />
                  </IconButton>
                </div>
              ),
            },
          ]}
          data={products}
          enableColumnFilterModes
          enablePagination
          muiTableBodyProps={{
            sx: { fontFamily: 'sans-serif', fontSize: '1rem', color: 'gray-700' },
          }}
          className="bg-white rounded-lg shadow-md border border-gray-200"
        />

        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle className="text-center text-gray-800 text-2xl font-semibold border-b">
            {editingProductId ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <DialogContent className="pt-6">
            <TextField
              label="Product Name"
              name="name"
              value={product.name}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
              variant="outlined"
            />
            <TextField
              label="Price"
              name="price"
              value={product.price}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
              variant="outlined"
              type="number"
            />
            <Select
              name="category"
              value={product.category}
              onChange={handleChange}
              fullWidth
              margin="dense"
              displayEmpty
            >
              <MenuItem value="" disabled>Select a category</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.name}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Rating (0-5)"
              name="rating"
              value={product.rating}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
              variant="outlined"
              type="number"
              inputProps={{ min: 0, max: 5, step: 0.1 }}
            />
            <TextField
              label="Description"
              name="description"
              value={product.description}
              onChange={handleChange}
              fullWidth
              margin="dense"
              multiline
              rows={3}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions className="p-4 border-t">
            <Button onClick={() => setOpen(false)} className="text-gray-500 hover:bg-gray-100 rounded-md px-4 py-2">
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="primary" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-md px-6 py-2 hover:from-blue-600 hover:to-blue-700">
              {editingProductId ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

      </div>
    </div>
  );
};

export default AdminDashboard;
