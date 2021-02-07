import React from "react";
import { useDispatch, useSelector } from 'react-redux'

import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { logout } from '../actions/userActions'


const Header = () => {

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>ecommerce</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to='/cart'><Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link></LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/myorders'>
                  <NavDropdown.Item>My orders</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
             ) : (
             <LinkContainer to='/login'><Nav.Link><i className="fas fa-user"></i> Sign In</Nav.Link></LinkContainer>
             )}

            { userInfo && userInfo.isAdmin && (

              <NavDropdown title="Admin" id="admin-nav-dropdown">

                <LinkContainer to='/usersList'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/productsList'>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/ordersList'>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>

                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>

                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />

                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                </NavDropdown.Item>

              </NavDropdown>

            )}

          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
