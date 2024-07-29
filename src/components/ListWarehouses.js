import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';

function ListWarehouses() {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get('http://127.0.0.1:8000/api/warehouses/', config);
        setWarehouses(response.data);
      } catch (error) {
        console.error('Error fetching warehouses', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="mt-5">
      <h2>Warehouses</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map(warehouse => (
            <tr key={warehouse.id}>
              <td>{warehouse.id}</td>
              <td>{warehouse.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListWarehouses;
