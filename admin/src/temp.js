import React from 'react';
import { Box, Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js';

function Temp () {
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
            console.log(obj);
            if(obj!= null){
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
                majList.push(tempList2); majList.push(minList);
                setTable(majList);
                console.log(majList);
                // majList.push();
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
                {/* <h4 style = {{marginTop: "35px", fontFamily: "Arial", fontWeight: "Bold", marginLeft: "90px"}}>Product Information</h4>
                <table style = {{border: "1px solid #828282", marginLeft: "90px", marginTop: "20px", width:"820px", textAlign: "center"}}>
                    <tr style = {{backgroundColor: "#c1c8e4", border: "1px solid #828282", height:"40px"}}>
                        <th style = {{border: "1px solid #828282"}}>Product ID</th>
                        <th style = {{border: "1px solid #828282"}}>Product Name</th>
                        <th style = {{border: "1px solid #828282"}}>Stock</th>
                        <th style = {{border: "1px solid #828282"}}>Price</th>
                    </tr>
                    <tr style = {{border: "1px solid #828282", height:"40px"}}>
                        <td style = {{border: "1px solid #828282"}}>1024</td>
                        <td style = {{border: "1px solid #828282"}}>Dalda Cooking Oil</td>
                        <td style = {{border: "1px solid #828282"}}>24</td>
                        <td style = {{border: "1px solid #828282"}}>890</td>
                    </tr>
                </table> */}
                {myTable()}
            </div>
        </div>
    )
}

export default Temp;