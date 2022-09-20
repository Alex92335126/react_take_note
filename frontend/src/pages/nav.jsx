import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import { useDispatch } from 'react-redux'
import { Router, Link } from 'react-router-dom';
import { logoutThunk } from '../redux/authSlice'

function BasicExample() {
  const dispatch = useDispatch()
  let token = localStorage.getItem("TOKEN")
  console.log("token", token)
  return (
    <Nav
      className='d-flex nav-bar'
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
        <Nav.Link as={Link} to="/">Notes</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        {token ? 
          <Nav.Link as={Button} onClick={() => dispatch(logoutThunk())} >Logout</Nav.Link> :
          <Nav.Link as={Link} to="/login">LogIn</Nav.Link>}
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/signup">SignUp</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default BasicExample;