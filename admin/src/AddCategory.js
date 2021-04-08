import React from 'react';
import { Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js';

function AddCategory () {
    let [categoryId, updateId] = React.useState('');
    let [categoryName, updateName] = React.useState('');

    const idClick = (event) => {
        updateId(event.target.value);
    }
    const nameClick = (event) => {
        updateName(event.target.value);
    }
    
    return (
        <div>
            <h3 style = {{marginTop: "25px", fontFamily: "Arial", fontWeight: "Bold", marginLeft: "90px"}}>Add Category</h3>
            <form style = {{marginLeft: "60px"}}>
            <Grid container xs = {12}>
            <Grid item xs = {5}>
                <div style = {{marginLeft: "30px"}}>
                <label for = "name" style = {{marginTop: "15px"}}>Category ID</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                <input type = "text" value = {categoryId} id = "name" onChange = {idClick} style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required></input>
                </div>
            </Grid>
            <Grid item xs = {1}></Grid>
            <Grid item xs = {5}>
                <label for = "name" style = {{marginTop: "15px"}}>Category Name</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                <input type = "text" value = {categoryName} id = "name" onChange = {nameClick} style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required></input>
            </Grid>
            </Grid>
            <div style = {{marginTop:"40px", marginLeft: "30px"}}>
            <input type = "submit" value = "Add Category" style = {{width: "120px", height:"38px", backgroundColor: "#5AB9EA", border: "none", borderRadius: "15px"}}></input>
            </div>
            </form>
        </div>
    )
}

export default AddCategory;