import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import PersonIcon from '@mui/icons-material/Person';

function CustomNavbar({ isAuthenticated, setIsAuthenticated, user }) {
  const navigate = useNavigate();
  /*useEffect(() => {
    console.log("ii",isAuthenticated);
  }, [isAuthenticated]);
  */

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleTasksClick = () => {
    if (!isAuthenticated) {
      alert('Login to see the tasks');
      navigate('/login');
    } else {
      navigate('/taskmanager');
    }
  };
  //const user = localStorage.getItem('user')

  const navLinkStyle = {
    fontWeight: 'bold',
    color: '#333',
    fontSize: '16px',
    margin: '0 10px',
    transition: 'color 0.3s ease'
  };

  return (
    <Navbar bg="light" expand="lg" sticky='top' className="shadow-sm">
      <Container >
        <Navbar.Brand href='/' style={{fontSize: '24px', fontStyle: 'initial', fontWeight: 'bolder', color: '#007bff'}}>Todo List</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/*<Nav.Link as={Link} to="/login" style={navLinkStyle}>Login</Nav.Link>*/}
            <Nav.Link onClick={handleTasksClick} style={navLinkStyle}>Tasks</Nav.Link>
          </Nav>
          <Nav>
            {isAuthenticated && (
            <>
              <Nav.Link style={{...navLinkStyle, display: 'flex', alignItems: 'center'}}>
                <PersonIcon style={{marginRight: '5px'}}/>{user}
              </Nav.Link>
              <Nav.Link onClick={handleLogout} style={navLinkStyle}>
                Logout
              </Nav.Link>
            </>)}
            {!isAuthenticated && (
              <>
              <Nav.Link as={Link} to="/login" style={navLinkStyle}>Login</Nav.Link>
              <Nav.Link as={Link} to="/register" style={navLinkStyle}>Register</Nav.Link>
              </>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;