import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'static',
        width: '167px',
        height: '30px',
        left: '8px',
        top: '9px',

        fontfamily: 'Manrope',
        fontstyle: 'normal',
        fontweight: 'bold',
        fontsize: '20px',
        lineheight: '150%',

        /* identical to box height, or 30px */
        display: 'flex',
        alignitems: 'center',
        textalign: 'center',
        letterspacing: '0.005em',
        color: '#FFFFFF',
          },
    
    sidebar:{
    display: 'flex',
    padding: '0px',
    position: 'absolute',
    width: '240px',
    height: '864px',
    left: '0px',
    top: '160px',
    background: '#355093',
    },
  }));

function Sidebar(){
    const classes = useStyles(); 
    return(
        <SideNav className={classes.sidebar}>
            <SideNav.Nav>
            <NavItem eventKey="Admin Panel">
            <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Admin Panel
            </NavText>
        </NavItem>
        <NavItem eventKey="Dashboard">
            <NavText>
                Dashboard
            </NavText>
        </NavItem>
        <NavItem eventKey="inventory">
            <NavText>
                View Inventory
            </NavText>
        </NavItem>
        <NavItem eventKey="stock">
            <NavText>
                Stock Update
            </NavText>
        </NavItem>
        <NavItem eventKey="add">
            <NavText>
                Add Products
            </NavText>
        </NavItem>
        <NavItem eventKey="discounts">
            <NavText>
                Discounts
            </NavText>
        </NavItem>
        <NavItem eventKey="addC">
            <NavText>
                Add Category
            </NavText>
        </NavItem>
        <NavItem eventKey="deleteP">
            <NavText>
                Delete Products
            </NavText>
        </NavItem>
        <NavItem eventKey="orders">
            <NavText>
                Orders
            </NavText>
        </NavItem>
        <NavItem eventKey="newsletter">
            <NavText>
                Newsletter
            </NavText>
        </NavItem>
        <NavItem eventKey="sales">
            <NavText>
                Sales Analytics
            </NavText>
        </NavItem>
        <NavItem eventKey="web">
            <NavText>
                Website Analytics
            </NavText>
        </NavItem>
        <NavItem eventKey="complaints">
            <NavText>
                Complaints
            </NavText>
        </NavItem>
        <NavItem eventKey="suggestions">
            <NavText>
                Suggestion
            </NavText>
        </NavItem>
            </SideNav.Nav>
    
        </SideNav>

    )
}

export default Sidebar