import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AuthModal = ({ signinModalOpen, closeSigninModal }) => {
    return (
        <Dialog open={signinModalOpen} onClose={closeSigninModal}>
            <DialogTitle>You need to sign In as a user to continue shopping!</DialogTitle>
            <DialogContent>
                <p>Please sign in to your account or create a new one.</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeSigninModal} color="secondary">
                    Close
                </Button>
                <Button component={Link} to="/login" color="primary">
                    Sign In
                </Button>
                <Button component={Link} to="/signup" color="primary">
                    Sign Up
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AuthModal;