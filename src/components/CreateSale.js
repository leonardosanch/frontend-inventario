import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function CreateSale() {
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [productId, setProductId] = useState('');
  const [warehouseId, setWarehouseId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const productsResponse = await axios.get('http://127.0.0.1:8000/api/products/', config);
        const warehousesResponse = await axios.get('http://127.0.0.1:8000/api/warehouses/', config);

        setProducts(productsResponse.data);
        setWarehouses(warehousesResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.post(
        'http://127.0.0.1:8000/api/record-sale/',
        {
          product: productId,
          warehouse: warehouseId,
          quantity: quantity,
        },
        config
      );

      setMessage('Sale created successfully!');
      setProductId('');
      setWarehouseId('');
      setQuantity('');
    } catch (error) {
      console.error('Error creating sale', error);
      setMessage('Failed to create sale. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Create Sale</h2>
      {message && <Alert variant={message.includes('successfully') ? 'success' : 'danger'}>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formProduct">
          <Form.Label>Product</Form.Label>
          <Form.Control as="select" value={productId} onChange={(e) => setProductId(e.target.value)} required>
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formWarehouse" className="mt-3">
          <Form.Label>Warehouse</Form.Label>
          <Form.Control as="select" value={warehouseId} onChange={(e) => setWarehouseId(e.target.value)} required>
            <option value="">Select a warehouse</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formQuantity" className="mt-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4">
          Create Sale
        </Button>
      </Form>
    </Container>
  );
}

export default CreateSale;
