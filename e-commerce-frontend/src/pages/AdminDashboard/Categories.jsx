import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axiosInstance from '../../utils/axiosInstance';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [category, setCategory] = useState({ name: '' });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to load categories', severity: 'error' });
    }
  };

  const handleOpen = (cat = null) => {
    setEditMode(!!cat);
    setSelectedCategory(cat);
    setCategory(cat || { name: '' });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    try {
      if (editMode) {
        await axiosInstance.put(`/api/categories/${selectedCategory._id}`, category);
        setSnackbar({ open: true, message: 'Category updated successfully', severity: 'success' });
      } else {
        await axiosInstance.post('/api/categories', category);
        setSnackbar({ open: true, message: 'Category added successfully', severity: 'success' });
      }
      fetchCategories();
      handleClose();
    } catch (error) {
      setSnackbar({ open: true, message: 'Error saving category', severity: 'error' });
    }
  };

  const handleDelete = async (catId) => {
    try {
      await axiosInstance.delete(`/api/categories/${catId}`);
      fetchCategories();
      setSnackbar({ open: true, message: 'Category deleted successfully', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error deleting category', severity: 'error' });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="min-h-screen flex flex-col justify-start items-center bg-gradient-to-br from-blue-50 to-gray-100 p-8">
      <div className="w-[90%] bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col justify-center items-start gap-3 mb-8">
          <h2 className="text-4xl font-bold text-gray-700">Categories</h2>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen()}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 px-5 py-2"
          >
            + Add Category
          </Button>
        </div>

        <MaterialReactTable
          columns={[
            { accessorKey: 'name', header: 'Category Name' },
            {
              id: 'actions',
              header: 'Actions',
              Cell: ({ row }) => (
                <div className="flex space-x-2">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(row.original)}
                    className="hover:text-blue-600"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(row.original._id)}
                    className="hover:text-red-600"
                  >
                    <Delete />
                  </IconButton>
                </div>
              ),
            },
          ]}
          data={categories}
          enableColumnFilterModes
          enablePagination
          muiTableBodyProps={{
            sx: { fontFamily: 'sans-serif', fontSize: '1rem', color: 'gray-700' },
          }}
          className="bg-white rounded-lg shadow-md border border-gray-200"
        />

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle className="text-center text-gray-800 text-2xl font-semibold border-b">
            {editMode ? 'Edit Category' : 'Add Category'}
          </DialogTitle>
          <DialogContent className="pt-6">
            <TextField
              label="Category Name"
              name="name"
              value={category.name}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
              fullWidth
              margin="dense"
              variant="outlined"
              className="mb-4"
            />
          </DialogContent>
          <DialogActions className="p-4 border-t">
            <Button onClick={handleClose} className="text-gray-500 hover:bg-gray-100 rounded-md px-4 py-2">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-md px-6 py-2 hover:from-blue-600 hover:to-blue-700"
            >
              {editMode ? 'Update' : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Categories;