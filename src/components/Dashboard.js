import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

function Dashboard() {
  const [productsCount, setProductsCount] = useState(0);
  const [warehousesCount, setWarehousesCount] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const productsResponse = await axios.get('http://127.0.0.1:8000/api/products/', config);
        const warehousesResponse = await axios.get('http://127.0.0.1:8000/api/warehouses/', config);
        const inventoryResponse = await axios.get('http://127.0.0.1:8000/api/inventory/', config);
        const salesResponse = await axios.get('http://127.0.0.1:8000/api/sales/', config);

        setProductsCount(productsResponse.data.length);
        setWarehousesCount(warehousesResponse.data.length);
        setInventoryCount(inventoryResponse.data.length);
        setSalesCount(salesResponse.data.length);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="mt-5">
      <h2>Dashboard</h2>
      <p>Bienvenido al Sistema de Gestión de Inventario. Utiliza la barra de navegación para acceder a las diferentes secciones.</p>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Productos</Card.Title>
              <Card.Text>{productsCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Bodegas</Card.Title>
              <Card.Text>{warehousesCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Articulos</Card.Title>
              <Card.Text>{inventoryCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Ventas</Card.Title>
              <Card.Text>{salesCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
