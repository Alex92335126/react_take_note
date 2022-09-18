import Nav from 'react-bootstrap/Nav';
import { Router, Link } from 'react-router-dom';

function BasicExample() {
  return (
    <Nav
      className='d-flex'
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
        <Nav.Link as={Link} to="/">Notes</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/login">LogIn</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/signup">SignIn</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default BasicExample;