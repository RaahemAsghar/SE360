import React from 'react';
import { Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js';
import SearchIcon from '@material-ui/icons/Search';

function ProductUpdate ({allProducts}) {
    let [form, updateForm] = React.useState([]);
    let [productId, updateProductId] = React.useState('');
    let [productName, updateProductName] = React.useState('');
    let [prodName, updateProdName] = React.useState('');
    let [brand, updateBrand] = React.useState('');
    let [price, updatePrice] = React.useState('');
    let [quantity, updateQuantity] = React.useState('');
    let [discount, updateDiscount] = React.useState('');
    let [url, updateUrl] = React.useState('');
    let [description, updateDescription] = React.useState('');
    let [category, updateCategory] = React.useState('');
    let [myCategories, updateMyCategories] = React.useState(['']);
    let [check, setCheck] = React.useState(false);

    const prodNameClick = (event) => {updateProdName(event.target.value);}
    
    const brandClick = (event) => {
        updateBrand(event.target.value);
    }
    const categoryClick = (event) => {
        updateCategory(event.target.value);
    } 
    const priceClick = (event) => {
        updatePrice(event.target.value);
    }
    const quantityClick = (event) => {
        updateQuantity(event.target.value);
    }
    const discountClick = (event) => {
        updateDiscount(event.target.value);
    }  
    const urlClick = (event) => {
        updateUrl(event.target.value);
    } 
    const descriptionClick = (event) => {
        updateDescription(event.target.value);
    }

    const idClick = (event) => {
        updateProductId(event.target.value);
    }
    const nameClick = (event) => {
        updateProductName(event.target.value);
    }
    const findProduct = () => {
        let myProduct = allProducts[productId];
        if(myProduct === undefined){
            updateForm([]);
        }
        else{
            updateProdName(myProduct['name']); updateBrand(myProduct['brand_name']); updatePrice(myProduct['price']); updateQuantity(myProduct['stock_left']); updateDiscount(myProduct['discount']); updateUrl(myProduct['url']); updateDescription(myProduct['description']);
            let myForm = []
        }
    }
    const submit = (event) => {
        event.preventDefault();
        findProduct();
        updateProductId(''); updateProductName('');
    }
    function initialDisplay(){
        if(!Object.keys(allProducts).length){return [<h6 style = {{marginTop: "20px"}}>There are no products in your store yet</h6>];}
        let myDisplay = [<form style = {{marginLeft: "0px"}}>
        <Grid container xs = {12}>
        <Grid item xs = {5}>
            <div style = {{marginLeft: "0px"}}>
            <label for = "name" style = {{marginTop: "15px"}}>Product ID</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
            <input type = "number" value = {productId} onChange = {idClick} style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none", textAlign: "left", textIndent:"10px"}} required></input>
            </div>
        </Grid>
        <Grid item xs = {1}></Grid>
        <Grid item xs = {5}>
            <label for = "name" style = {{marginTop: "15px"}}>Product Name</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
            <input type = "text" value = {productName} onChange = {nameClick} style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none", textIndent: "10px"}} required></input>
        </Grid>
        </Grid>
        <div style = {{marginTop:"40px", marginLeft: "0px"}}>
        <input type = "submit" value = "Search" style = {{width: "120px", height:"38px", backgroundColor: "#5AB9EA", border: "none", borderRadius: "15px"}}></input>
        </div>
        </form>]
        return myDisplay;
    }    
    
    React.useEffect(()=>{
        console.log(Object.keys(allProducts).length);
        console.log(allProducts[1]);
        let db = fireApp.database();
        db.ref("Categories").once('value').then((snap)=>{
            let obj = snap.val();
            let data = Object.keys(obj).map((key)=>obj[key]) 
            updateMyCategories(data[0]);
            if (!check){
                if(data[0].length){
                    updateCategory(data[0][0]);
                } setCheck(true);
            }
         })
    },[])
    return(
        <div style = {{marginLeft: "90px"}}>
            <h3 style = {{marginTop: "25px", fontFamily: "Arial", fontWeight: "Bold"}}>Update Products</h3>
            {initialDisplay()}
        </div>
    )
}

export {ProductUpdate}