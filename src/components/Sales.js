import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

function Sales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://127.0.0.1:8000/api/sales/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSales(result.data);
    };

    fetchData();
  }, []);

  return (
    <Container className="mt-5">
      <h2>Sales</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Warehouse</th>
            <th>Quantity</th>
            <th>Sale Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.product}</td>
              <td>{sale.warehouse}</td>
              <td>{sale.quantity}</td>
              <td>{sale.sale_date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Sales;
