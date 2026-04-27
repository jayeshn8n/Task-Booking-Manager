import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * PrivateRoute Component
 * Responsibility: Protects routes from unauthenticated access.
 * Logic: If a JWT exists in localStorage, render the children (Dashboard).
 *        If not, redirect to the Login page.
 */
const PrivateRoute = ({ children }) => {
    // FR-10: Implement a PrivateRoute wrapper component
    const token = localStorage.getItem('token');

    // If token exists, return the component; otherwise, redirect to /login
    return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;