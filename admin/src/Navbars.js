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
    <Navbar.Brand href="#home" style={{color: '#ffffff', fontSize: '28px', align:'center'}}>StoreX</Navbar.Brand>
    <Nav className="mr-auto">
      
    </Nav>
    
  </Navbar>
        </div>
    )
}
export default Navbars;