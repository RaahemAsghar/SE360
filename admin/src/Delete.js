import React from 'react';
import { Box, Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js';

function Delete () {
    let [productId, updateProductId] = React.useState('');
    let [productName, updateProductName] = React.useState('');
    let [table,setTable] = React.useState([]);
    
    const myTable = () => {
        return table;
    }
    const idClick = (event) => {
        updateProductId(event.target.value);
    }
    const nameClick = (event) => {
        updateProductName(event.target.value);
    }
    const findProduct = (product) => {
        let db = fireApp.database();
        let dir = 'products/' + product;
        db.ref(dir).once('value').then((snap) => {
            let obj = snap.val();
            if(obj!= null){
                let myList = [];
                myList.push(<h1>Hello World</h1>);
                setTable(myList);
            }
        });
    }

    const submit = (event) => {
        event.preventDefault();
        findProduct(productId);
        updateProductId(''); updateProductName('');
    }

    return (
        <div>
            <h3 style = {{marginTop: "25px", fontFamily: "Arial", fontWeight: "Bold", marginLeft: "90px"}}>Delete Products</h3>
            <form onSubmit = {submit} style = {{marginLeft: "60px"}}>
            <Grid container xs = {12}>
            <Grid item xs = {5}>
                <div style = {{marginLeft: "30px"}}>
                <label for = "name" style = {{marginTop: "15px"}}>Product ID</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                {/* <Box type = "text" value = {categoryId} id = "name" style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none", textIndent: "10px"}} required><p style = {{fontSize: "1.3em", fontFamily: "Arial"}}>{categoryId}</p></Box> */}
                <input type = "number" value = {productId} onChange = {idClick} style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none", textAlign: "left", textIndent:"10px"}} required></input>
                </div>
            </Grid>
            <Grid item xs = {1}></Grid>
            <Grid item xs = {5}>
                <label for = "name" style = {{marginTop: "15px"}}>Product Name</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                <input type = "text" value = {productName} id = "name" onChange = {nameClick} style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none", textIndent: "10px"}} required></input>
            </Grid>
            </Grid>
            <div style = {{marginTop:"40px", marginLeft: "30px"}}>
            <input type = "submit" value = "Search" style = {{width: "120px", height:"38px", backgroundColor: "#5AB9EA", border: "none", borderRadius: "15px"}}></input>
            </div>
            </form>
            <div>
                {myTable()}
            </div>
        </div>
    )
}

export default Delete;