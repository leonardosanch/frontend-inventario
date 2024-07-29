import React from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

function NavigationBar() {
  const isAdmin = localStorage.getItem('is_staff') === 'true';
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('is_staff');
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/dashboard">
          <Navbar.Brand>Gestion de Inventario</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {token && (
              <>
                <LinkContainer to="/dashboard">
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
                {isAdmin && (
                  <>
                    <NavDropdown title="Inventario" id="inventory-dropdown">
                      <LinkContainer to="/list-inventory">
                        <NavDropdown.Item>Listar Inventario</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/create-inventory">
                        <NavDropdown.Item>Crear Inventario</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                    <NavDropdown title="Productos" id="products-dropdown">
                      <LinkContainer to="/list-products">
                        <NavDropdown.Item>List Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/crear-productos">
                        <NavDropdown.Item>Create Product</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                    <NavDropdown title="Bodegas" id="warehouses-dropdown">
                      <LinkContainer to="/list-warehouses">
                        <NavDropdown.Item>Listar Bodegas</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/create-warehouse">
                        <NavDropdown.Item>Crear Bodegas</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  </>
                )}
                <NavDropdown title="Ventas" id="sales-dropdown">
                  <LinkContainer to="/list-sales">
                    <NavDropdown.Item>Listar Ventas</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/create-sale">
                    <NavDropdown.Item>Crear Venta</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              </>
            )}
          </Nav>
          {token && (
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
