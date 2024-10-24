import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    <Link to="/">E-Commerce</Link>
                </h1>
                <nav className="space-x-4">
                    {user ? (
                        <>
                            {user && user.role === "user" && (<Link to="/user" className="hover:text-gray-400">Profile</Link>)}
                            {user && user.role === "admin" && (<Link to="/admin" className="hover:text-gray-400">Dashboard</Link>)}
                            <button onClick={logout} className="hover:text-gray-400">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-gray-400">Sign In</Link>
                            <Link to="/signup" className="hover:text-gray-400">Sign Up</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;