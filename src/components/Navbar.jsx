import React from 'react';

import { Navbar, Nav, Container } from 'react-bootstrap';

const NavbarComponent = ({ activelink }) => {

  return (
    <Navbar expand="lg" sticky="top" className="navbar bg-body-tertiary mb-5">
      <Container fluid>
        <Navbar.Brand href="/" className="nav-icon">Lost & Found Web</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-between">
          <Nav navbarScroll>
            <Nav.Link href="/" className={`nav-link ${activelink === '/' ? 'active-link' : ''}`}>Home</Nav.Link>
            <Nav.Link href="/items" className={`nav-link ${activelink === '/items' ? 'active-link' : ''}`}>Items</Nav.Link>
            <Nav.Link href="/report" className={`nav-link ${activelink === '/report' ? 'active-link' : ''}`}>Report</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;