import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ListProducts from './components/ListProducts';
import CreateProduct from './components/CreateProduct';
import ListWarehouses from './components/ListWarehouses';
import CreateWarehouse from './components/CreateWarehouse';
import ListInventory from './components/ListInventory';
import CreateInventory from './components/CreateInventory';
import ListSales from './components/ListSales';
import CreateSale from './components/CreateSale';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/list-products" element={<AdminRoute><ListProducts /></AdminRoute>} />
        <Route path="/create-product" element={<AdminRoute><CreateProduct /></AdminRoute>} />
        <Route path="/list-warehouses" element={<AdminRoute><ListWarehouses /></AdminRoute>} />
        <Route path="/create-warehouse" element={<AdminRoute><CreateWarehouse /></AdminRoute>} />
        <Route path="/list-inventory" element={<AdminRoute><ListInventory /></AdminRoute>} />
        <Route path="/create-inventory" element={<AdminRoute><CreateInventory /></AdminRoute>} />
        <Route path="/list-sales" element={<PrivateRoute><ListSales /></PrivateRoute>} />
        <Route path="/create-sale" element={<PrivateRoute><CreateSale /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('is_staff') === 'true';
  return token && isAdmin ? children : <Navigate to="/dashboard" />;
}

export default App;

