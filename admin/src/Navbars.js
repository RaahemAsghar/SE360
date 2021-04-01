import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import {FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import {Form} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    width: '1700px',
    height: '80px',
    left: '0px',
    top: '0px',
    background: '#355093'
        },
  
}));
function Navbars(){
  const classes = useStyles(); 
    return(
        <div>
              <Navbar className={classes.root}>
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
        </div>
    )
}
export default Navbars;