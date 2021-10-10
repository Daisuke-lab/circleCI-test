import React, {useEffect} from 'react'
import { Navbar, Nav, NavDropdown, FormControl, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';






function OriginalNavbar() {
    return (
    <Navbar bg="light" expand="lg" id='navbar'>
  <Navbar.Brand href="/">KJ</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/add_friend">友達を追加</Nav.Link>
      <Nav.Link href="/choose_room">ルーム選択</Nav.Link>
      <Nav.Link>Connection</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )
}

export default OriginalNavbar
