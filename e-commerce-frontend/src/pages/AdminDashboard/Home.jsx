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

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    rating: '',
    description: '',
  });
  const [image, setImage] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/api/products');

      setProducts(response.data);
    } catch (err) {
      handleSnackbar('Failed to fetch products.', 'error');
    }
  };

  const handleSnackbar = (message, severity) => {
    setSnackbarMessage({ message, severity });
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('category', product.category);
      formData.append('rating', product.rating);
      formData.append('description', product.description);

      if (!editingProductId && image) {
        formData.append('image', image);
      }

      if (editingProductId) {
        await axiosInstance.put(`/api/products/${editingProductId}`, product);
        handleSnackbar('Product updated successfully.', 'success');
      } else {
        await axiosInstance.post('/api/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        handleSnackbar('Product added successfully.', 'success');
      }

      setProduct({ name: '', price: '', category: '', rating: '', description: '' });
      setImage(null);
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

  return (
    <div className="p-6 min-h-screen flex flex-col justify-start items-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="w-[90%] bg-white rounded-lg shadow-lg p-8">
        <Button sx={{ marginBottom: "10px" }} variant="contained" color="primary" onClick={() => setOpen(true)}>
          + Add Product
        </Button>

        <MaterialReactTable
          columns={[
            {
              accessorKey: 'imageUrl',
              header: 'Image',
              Cell: ({ cell }) => (
                <>
                  <img
                    src={`${import.meta.env.VITE_APP_BACKEND_URL}${cell.getValue()}`}
                    alt="Product"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                </>
              ),
            },
            { accessorKey: 'name', header: 'Product Name' },
            { accessorKey: 'price', header: 'Price', Cell: ({ cell }) => `$${cell.getValue().toFixed(2)}` },
            { accessorKey: 'category', header: 'Category' },
            { accessorKey: 'rating', header: 'Rating', Cell: ({ cell }) => `${cell.getValue()} / 5` },
            {
              accessorKey: 'description',
              header: 'Description',
              Cell: ({ cell }) => (
                <span className="truncate">
                  {cell.getValue()?.length > 30 ? cell.getValue().slice(0, 30) + ' ...' : cell.getValue()}
                </span>
              ),
            },
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
          <DialogTitle>{editingProductId ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          <DialogContent>
            <TextField label="Product Name" name="name" value={product.name} onChange={handleChange} fullWidth margin="dense" />
            <TextField label="Price" name="price" value={product.price} onChange={handleChange} fullWidth margin="dense" type="number" />
            <Select name="category" value={product.category} onChange={handleChange} fullWidth margin="dense">
              <MenuItem value="" disabled>Select a category</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.name}>{cat.name}</MenuItem>
              ))}
            </Select>
            <TextField label="Rating (0-5)" name="rating" value={product.rating} onChange={handleChange} fullWidth margin="dense" type="number" />
            <TextField label="Description" name="description" value={product.description} onChange={handleChange} fullWidth margin="dense" multiline rows={3} />

            {!editingProductId && (
              <input type="file" accept="image/*" onChange={handleImageChange} className="mt-4" />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>{editingProductId ? 'Update' : 'Add'}</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarMessage.severity} sx={{ width: '100%' }}>
            {snackbarMessage.message}
          </Alert>
        </Snackbar>

      </div>
    </div>
  );
};

export default AdminDashboard;
