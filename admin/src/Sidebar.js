import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Icon, InlineIcon } from '@iconify/react';
import bxsDashboard from '@iconify/icons-bx/bxs-dashboard';
import Box from '@material-ui/core/Box';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'static',
        width: '240px',
        height: '48px',
        left: '0px',
        top: '48px',

        
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
            <NavItem eventKey="Admin Panel" class={classes.root}>
            
                <p style={{color: '#ffffff', fontSize: '28px', align:'center'}}>Admin Panel</p>
            
        </NavItem>
        <NavItem eventKey="Dashboard" class={classes.root}>
            
                
        <NavText>
            <Icon icon={bxsDashboard} style={{color: '#C1C8E4', fontSize: '28px', align:'center', position:"absolute"}} />
                <p style={{color: '#ffffff', fontSize: '14px', align:'center'}}>Dashboard</p>
        </NavText>
        
            
        </NavItem>
        <NavItem eventKey="inventory" class={classes.root}>
            <NavText>
                View Inventory
            </NavText>
        </NavItem>
        <NavItem eventKey="stock" class={classes.root}>
            <NavText>
                Stock Update
            </NavText>
        </NavItem>
        <NavItem eventKey="add" class={classes.root}>
            <NavText>
                Add Products
            </NavText>
        </NavItem>
        <NavItem eventKey="discounts" class={classes.root}>
            <NavText>
                Discounts
            </NavText>
        </NavItem>
        <NavItem eventKey="addC" class={classes.root}>
            <NavText>
                Add Category
            </NavText>
        </NavItem>
        <NavItem eventKey="deleteP" class={classes.root}>
            <NavText>
                Delete Products
            </NavText>
        </NavItem>
        <NavItem eventKey="orders" class={classes.root}>
            <NavText>
                Orders
            </NavText>
        </NavItem>
        <NavItem eventKey="newsletter" class={classes.root}>
            <NavText>
                Newsletter
            </NavText>
        </NavItem>
        <NavItem eventKey="sales" class={classes.root}>
            <NavText>
                Sales Analytics
            </NavText>
        </NavItem>
        <NavItem eventKey="web" class={classes.root}>
            <NavText>
                Website Analytics
            </NavText>
        </NavItem>
        <NavItem eventKey="complaints" class={classes.root}>
            <NavText>
                Complaints
            </NavText>
        </NavItem>
        <NavItem eventKey="suggestions" class={classes.root}>
            <NavText>
                Suggestion
            </NavText>
        </NavItem>
            </SideNav.Nav>
    
        </SideNav>
    )
}

export default Sidebar