import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function CreateWarehouse() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.post(
        'http://127.0.0.1:8000/api/warehouses/',
        { name },
        config
      );

      setMessage('Warehouse created successfully!');
      setName('');
    } catch (error) {
      console.error('Error creating warehouse', error);
      setMessage('Failed to create warehouse. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Create Warehouse</h2>
      {message && <Alert variant={message.includes('successfully') ? 'success' : 'danger'}>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4">
          Create Warehouse
        </Button>
      </Form>
    </Container>
  );
}

export default CreateWarehouse;
