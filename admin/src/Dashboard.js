import React from 'react';
import { Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js';

function Random ({myDatabase}) {
    React.useEffect(()=>{
        console.log(myDatabase); 
    },[])
    return(
        <Grid item xs = {12} style = {{marginLeft: "90px", height: "680px", overflowY: "scroll",marginTop: "20px"}}>
            <Grid item xs = {5} style = {{width: "350px",height: "200px"}}>
                <h3 style = {{marginTop: "25px", fontFamily: "Arial", fontWeight: "Bold", textAlign: "center"}}>Number of Users</h3>
                <div style = {{marginTop: "20px",width: "350px",height: "200px", backgroundColor: "#C1C8E4", borderRadius: "15px"}}><img src = "https://firebasestorage.googleapis.com/v0/b/software-engineering-123.appspot.com/o/338-3388348_jumping-man-vector-happy-person-png-icon-removebg-preview.png?alt=media&token=3dcfaad7-ea40-4fe2-8d8d-aa216b518180" style = {{width: "320px", marginLeft: "-100px"}}/></div>
            </Grid>
            {/* <div style = {{width: "100px"}}></div> */}
            <Grid item xs = {2}></Grid>
            <Grid item xs = {5} style = {{width: "350px",height: "200px"}}>
                <h3 style = {{marginTop: "25px", fontFamily: "Arial", fontWeight: "Bold", textAlign: "center"}}>Number of Users</h3>
                <div style = {{marginTop: "20px",width: "350px",height: "200px", backgroundColor: "#C1C8E4", borderRadius: "15px"}}><img src = "https://firebasestorage.googleapis.com/v0/b/software-engineering-123.appspot.com/o/338-3388348_jumping-man-vector-happy-person-png-icon-removebg-preview.png?alt=media&token=3dcfaad7-ea40-4fe2-8d8d-aa216b518180" style = {{width: "320px", marginLeft: "-100px"}}/></div>
            </Grid>            
        </Grid>
    )
}

function Random2 () {
    return (
        <div style = {{marginLeft: "90px", height: "680px", overflowY: "scroll",marginTop: "20px"}}>
            <div>
                <h3 style = {{marginTop: "25px", fontFamily: "Arial", fontWeight: "Bold", textIndent: "60px"}}>Number of Users</h3>
                <div style = {{marginTop: "20px",width: "350px",height: "200px", backgroundColor: "#C1C8E4", borderRadius: "15px"}}><img src = "https://firebasestorage.googleapis.com/v0/b/software-engineering-123.appspot.com/o/338-3388348_jumping-man-vector-happy-person-png-icon-removebg-preview.png?alt=media&token=3dcfaad7-ea40-4fe2-8d8d-aa216b518180" style = {{width: "320px", marginLeft: "-100px"}}/></div>
                
            </div>
        </div>
    )
}

function Dashboard ({myDatabase}) {
    const calculateRevenue = () => {
        let myOrders = myDatabase["pendingOrder"];
        let keys = Object.keys(myOrders); let total = 0;
        for(let i = 0; i<keys.length; i++){
            total += myOrders[keys[i]]["bill"];
        }
        return total;
    }
    const pendingOrders = () => {
        let myOrders = myDatabase["pendingOrder"];
        let keys = Object.keys(myOrders); let pendOrders = []
        for(let i = 0; i<keys.length; i++){
            if(!myOrders[keys[i]]["delivered"]){pendOrders.push(myOrders[keys[i]])}
        }
        return pendOrders.length;
    }
    const calculateUsers = () => {
        return Object.keys(myDatabase["user"]).length;
    }
    const calculateProducts = () => {
        return Object.keys(myDatabase["products"]).length;
    }
    const calculateSaleItems = () => {
        let myProducts = myDatabase["products"]; let keys = Object.keys(myProducts); let saleItems = [];
        for(let i = 0; i<keys.length; i++){
            if(myProducts[keys[i]]["discount"]){saleItems.push(myProducts[keys[i]])}
        }
        return saleItems.length;
    }
    const calculateTotalOrdered = () => {
        return Object.keys(myDatabase["pendingOrder"]).length;
    }
    const calculateTotalDelivered = () => {
        return (calculateTotalOrdered() - pendingOrders())
    }
    return (
        <Grid container xs = {12}>
            <Grid item xs = {5} style = {{marginLeft: "90px"}}>
                <h3 style = {{marginTop: "25px", fontFamily: "Arial", fontWeight: "Bold", textIndent: "80px"}}>Total Revenue</h3>
                <div style = {{marginTop: "20px",width: "350px",height: "180px", backgroundColor: "#C1C8E4", borderRadius: "15px"}}>
                    <img src = "https://firebasestorage.googleapis.com/v0/b/software-engineering-123.appspot.com/o/money.png?alt=media&token=f6252b07-cf5e-4fb4-b02c-8ca71389ea11" style = {{width: "140px", marginLeft: "-0px"}}/>
                    <span style = {{fontWeight: "bold", fontSize: "30px", marginLeft: "0px",padding: "20px 0"}}>{calculateRevenue()}</span>
                </div>
            </Grid>
            <Grid item xs = {0}></Grid>
            <Grid item xs = {5}>
                <h3 style = {{marginTop: "25px", fontFamily: "Arial", fontWeight: "Bold", textIndent: "60px"}}>Pending Orders</h3>
                <div style = {{marginTop: "20px",width: "350px",height: "180px", backgroundColor: "#C1C8E4", borderRadius: "15px"}}>
                    <img src = "https://firebasestorage.googleapis.com/v0/b/software-engineering-123.appspot.com/o/Truck.png?alt=media&token=cb452064-bc82-4aea-bc2a-9c17ec60b168" style = {{width: "200px", marginLeft: "0px"}}/>
                    <span style = {{fontWeight: "bold", fontSize: "30px", marginLeft: "0px",padding: "20px 0",color: "red"}}>{pendingOrders()}</span>
                </div>
            </Grid>
            <div style = {{marginLeft: "90px", marginTop: "30px"}}>
                <h3 style = {{marginTop: "25px", fontFamily: "Arial", fontWeight: "Bold", textIndent: "320px"}}>Summary</h3>
                <div style = {{height: "300px", width: "780px" ,marginTop: "20px",backgroundColor: "#C1C8E4",overflowY: "scroll"}}>
                <table style = {{border: "1px solid #828282", marginLeft: "170px" , marginTop: "20px" , width:"400px", textAlign: "center"}}>
                <tr style = {{backgroundColor: "#DBDFF0",border: "1px solid #828282", height:"40px"}}>
                    <th style = {{border: "1px solid #828282", width: "300px", textAlign: "left", textIndent: "20px"}}>Statistics</th>
                    <td>Values</td>
                </tr>
                <tr style = {{backgroundColor: "white",border: "1px solid #828282", height:"40px"}}>
                    <th style = {{border: "1px solid #828282", width: "300px", textAlign: "left", textIndent: "20px"}}>Total Users</th>
                    <td>{calculateUsers()}</td>
                </tr>
                <tr style = {{backgroundColor: "white",border: "1px solid #828282", height:"40px"}}>
                    <th style = {{border: "1px solid #828282", width: "300px", textAlign: "left", textIndent: "20px"}}>Total Products</th>
                    <td>{calculateProducts()}</td>
                </tr>
                <tr style = {{backgroundColor: "white",border: "1px solid #828282", height:"40px"}}>
                    <th style = {{border: "1px solid #828282", width: "300px", textAlign: "left", textIndent: "20px"}}>Total Sale Items</th>
                    <td>{calculateSaleItems()}</td>
                </tr>
                <tr style = {{backgroundColor: "white",border: "1px solid #828282", height:"40px"}}>
                    <th style = {{border: "1px solid #828282", width: "300px", textAlign: "left", textIndent: "20px"}}>Total Items Delivered</th>
                    <td>{calculateTotalDelivered()}</td>
                </tr>
                <tr style = {{backgroundColor: "white",border: "1px solid #828282", height:"40px"}}>
                    <th style = {{border: "1px solid #828282", width: "300px", textAlign: "left", textIndent: "20px"}}>Total Items Ordered</th>
                    <td>{calculateTotalOrdered()}</td>
                </tr>
                </table>
                {/* <p style = {{marginTop: "20px", marginLeft: "20px", fontWeight: "bold", fontFamily: "sans-serif",fontSize: "20px"}}>Total Users: {calculateUsers()}</p>
                <p style = {{marginTop: "30px", marginLeft: "20px", fontWeight: "bold", fontFamily: "sans-serif",fontSize: "20px"}}>Total Products: {calculateProducts()}</p>
                <p style = {{marginTop: "30px", marginLeft: "20px", fontWeight: "bold", fontFamily: "sans-serif",fontSize: "20px"}}>Total Sale Items: {calculateSaleItems()}</p>
                <p style = {{marginTop: "30px", marginLeft: "20px", fontWeight: "bold", fontFamily: "sans-serif",fontSize: "20px"}}>Total Items Delivered: {calculateTotalDelivered()}</p>
                <p style = {{marginTop: "30px", marginLeft: "20px", fontWeight: "bold", fontFamily: "sans-serif",fontSize: "20px"}}>Total Items Ordered: {calculateTotalOrdered()}</p> */}
                </div>
            </div>
        </Grid>
    )
}

export default Dashboard;