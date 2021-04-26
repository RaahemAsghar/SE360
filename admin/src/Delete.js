import React from 'react';
import { Box, Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

function Delete ({router}) {
    let [productId, updateProductId] = React.useState('');
    let [productName, updateProductName] = React.useState('');
    let [table,setTable] = React.useState([]);
    let [open1, updateOpen1] = React.useState(false);
    let [open2, updateOpen2] = React.useState(false);
    let [boxState, updateBoxState] = React.useState("none");
    // let [deleted,setDeleted] = React.useState(false);
    
    const myTable = () => {
        return table;
    }
    const idClick = (event) => {
        updateProductId(event.target.value);
    }
    const nameClick = (event) => {
        updateProductName(event.target.value);
    }
    const open1Click = () => {updateOpen1(true); updateBoxState("delete product")}
    const close1Click = () => {updateOpen1(false);}
    const close2Click = () => {updateOpen2(false); updateProductId(''); updateProductName('');}
    
    function displayBox () {
        let myBox = []
        if(boxState === "not found"){
            myBox = notFound();
        } else if (boxState === "delete product"){
            myBox = askConfirmationBox();
        }
        return myBox;
    }
    function askConfirmationBox () {
        let myBox = []
        if(open1){
            myBox = [<Dialog open={open1} onClose={close1Click} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"><DialogTitle id="alert-dialog-title">{"Delete Product?"}</DialogTitle><DialogContent><DialogContentText id="alert-dialog-description">Are you sure you want to delete this product?</DialogContentText></DialogContent><DialogActions><Button onClick={deleteProduct} color="primary">Yes</Button><Button onClick={close1Click} color="primary">No</Button></DialogActions></Dialog>]
        }
        return myBox;
    }
    function notFound () {
        let myBox = []
        if(open2){
            myBox = [<Dialog open={open2} onClose={close2Click} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"><DialogTitle id="alert-dialog-title">{"Product Not Found"}</DialogTitle><DialogContent><DialogContentText id="alert-dialog-description">This item is not present in your inventory</DialogContentText></DialogContent><DialogActions><Button onClick={close2Click} color="primary">close</Button></DialogActions></Dialog>]
        }
        return myBox;
    }
    const deleteProduct = () => {
        let db = fireApp.database();
        // console.log("products/"+productId);
        db.ref("products/"+productId).remove();
        setTable([]); updateOpen1(false); updateProductId(''); updateProductName('');
        // router(["Delete Products"])
        // setDeleted(true);
    }
    const findProduct = (product) => {
        let db = fireApp.database();
        let dir = 'products/' + product;
        db.ref(dir).once('value').then((snap) => {
            let obj = snap.val();
            if(obj!= null){
                if(obj["name"].toLowerCase()===productName.toLowerCase()){
                    let majList = []; let minList = [];
                    let headerNames = ["Product ID","Product Name","Stock","Price"];
                    let dataNames = [product,obj["name"],obj["stock_left"],obj["price"]];
                    let headerCells = []; let header = [];
                    let dataCells = []; let data = [];
                    for(let i = 0; i<headerNames.length; i++){
                        headerCells.push(<th style = {{border: "1px solid #828282"}}>{headerNames[i]}</th>);
                    }
                    header.push(<tr style = {{backgroundColor: "#c1c8e4", border: "1px solid #828282", height:"40px"}}>{headerCells}</tr>);
                    for(let i = 0; i<dataNames.length; i++){
                        dataCells.push(<td style = {{border: "1px solid #828282"}}>{dataNames[i]}</td>)
                    }
                    data.push(<tr style = {{border: "1px solid #828282", height:"40px"}}>{dataCells}</tr>);
                    let tempList = []; tempList.push(header); tempList.push(data);
                    minList.push(<table style = {{border: "1px solid #828282", marginLeft: "90px", marginTop: "20px", width:"820px", textAlign: "center"}}>{tempList}</table>);
                    let tempList2 = []; tempList2.push(<h4 style = {{marginTop: "35px", fontFamily: "Arial", fontWeight: "Bold", marginLeft: "90px"}}>Product Information</h4>);
                    let tempList3 = [<input type = "submit" value = "Delete Product" onClick = {open1Click} style = {{width: "120px", height:"38px", backgroundColor: "#5AB9EA", border: "none", borderRadius: "15px", marginLeft: "90px", marginTop: "40px"}}></input>]
                    majList.push(tempList2); majList.push(minList); majList.push(tempList3);
                    setTable(majList);
                } else {
                    updateOpen2(true); setTable([]); updateBoxState("not found");
                }
            } 
            // else if(deleted) {
            //     setTable([]); setDeleted(false);
            // }
            else {
                setTable([]); updateOpen2(true); updateBoxState("not found");
            }
        });
        let dir2 = 'ratings/'+product;
        db.ref(dir2).once("value").then((snap)=>{
            let obj = snap.val();
            if(obj!=null){
                db.ref(dir2).remove();
            }
        })
    }

    const submit = (event) => {
        event.preventDefault();
        findProduct(productId);
        // updateProductId(''); updateProductName('');
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
                {displayBox()}
            </div>
        </div>
    )
}

export default Delete;