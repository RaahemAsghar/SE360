import React from 'react';
import { Box, Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js';

function AddCategory () {
    let [categoryId, updateId] = React.useState(0);
    let [categoryName, updateName] = React.useState('');
    let [key, updateKey] = React.useState('');
    let [currentCategories, updateCurrentCategories] = React.useState([]);
    let [check, updateCheck] = React.useState(false);
    // let [newId, updateNewId] = React.useState(undefined);

    const idClick = (event) => {
        updateId(event.target.value);
    }
    const nameClick = (event) => {
        updateName(event.target.value);
    }
    
    const submit = (event) => {
        event.preventDefault();
        let db = fireApp.database();
        let tempList = currentCategories;
        let present = false;
        for(let i = 0; i<categoryId; i++){
            if(tempList[i]==categoryName){present = true; break}
        }
        if(!present){
            tempList.push(categoryName);
            db.ref("Categories").child(key).set(tempList);
            updateCurrentCategories(tempList);
            console.log(currentCategories);
            console.log(key);
            updateId((currentCategories.length)+1);
        }
        updateName('');
    }

    // React.useEffect(()=>{
    //     if(!check){
    //         console.log("Hello")
    //         pullCategories(); updateCheck(true);
    //         console.log("Key:",key); console.log(categoryId); console.log(currentCategories);
    //     }
    // },[])

    React.useEffect(()=>{
        let db = fireApp.database();
        db.ref("Categories").once('value').then((snap)=>{
        let obj = snap.val();
        // console.log(Object.values(obj)[0]);
        let data = Object.keys(obj).map((key)=>obj[key]) 
        // console.log(Object.keys(obj)[0]);
        updateKey(Object.keys(obj)[0]);
        // console.log(data[0]);
        updateId((data[0].length)+1);
        updateCurrentCategories(data[0]);
        // console.log(categoryId);

     })
    },[])
    
    return (
        <div>
            <h3 style = {{marginTop: "25px", fontFamily: "Arial", fontWeight: "Bold", marginLeft: "90px"}}>Add Category</h3>
            <form onSubmit = {submit} style = {{marginLeft: "60px"}}>
            <Grid container xs = {12}>
            <Grid item xs = {5}>
                <div style = {{marginLeft: "30px"}}>
                <label for = "name" style = {{marginTop: "15px"}}>Category ID</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                {/* <Box type = "text" value = {categoryId} id = "name" style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none", textIndent: "10px"}} required><p style = {{fontSize: "1.3em", fontFamily: "Arial"}}>{categoryId}</p></Box> */}
                <input type = "button" value = {categoryId} id = "name" style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none", textAlign: "left", textIndent:"10px", cursor: "context-menu"}}></input>
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