import React from 'react';
import { Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js';

function AddProducts ({router}) {
    let [product, updateProduct] = React.useState(['','','','','','']);
    let [prodName, updateProdName] = React.useState('');
    let [brand, updateBrand] = React.useState('');
    let [price, updatePrice] = React.useState('');
    let [quantity, updateQuantity] = React.useState('');
    let [discount, updateDiscount] = React.useState('');
    let [url, updateUrl] = React.useState('');
    let [description, updateDescription] = React.useState('');
    let [myCategories, updateMyCategories] = React.useState([''])
    let [category, updateCategory] = React.useState('');
    let [check,setCheck] = React.useState(false);
    let [productId, updateProductId] = React.useState(0);
    let [productList, updateProductList] = React.useState({});

    const nameClick = (event) => {
        updateProdName(event.target.value);
    }
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
    const submit = (event) => {
        event.preventDefault();
        let db = fireApp.database();
        // updateProductId((len+1));
        let product = {
            brand_name: brand,
            category: category,
            description: description,
            discount: Number(discount),
            name: prodName,
            price: Number(price),
            rating: (Math.floor(Math.random() * 5)+1),
            stock_left: Number(quantity),
            total_sold: 0,
            url: url,
        }
        // console.log(typeof(productId));
            db.ref("products").child(productId).set(product);
            // db.ref("products").push(product);
            let myDict = productList;
            myDict[productId] = product;
            updateProductList(myDict); updateProductId((productId)+1); updateProdName(''); updateBrand(''); updateCategory(myCategories[0]); updatePrice(''); updateUrl(''); updateDescription(''); updateQuantity(''); updateDiscount('');
        // console.log(product);
    }
    React.useEffect(()=>{
        let db = fireApp.database();
        db.ref("Categories").once('value').then((snap)=>{
        let obj = snap.val();
        // console.log(Object.values(obj));
        let data = Object.keys(obj).map((key)=>obj[key]) 
        // console.log(data[0]);
        updateMyCategories(data[0]);
        if (!check){
            if(data[0].length){
                updateCategory(data[0][0]);
            } setCheck(true);
        }
     })

        db.ref("products").once('value').then((snap) => {
            let obj = snap.val()
            let myDict = {}
            // console.log(Object.values(obj).slice(1,3)[0])
            for(let i = 0; i<Object.keys(obj).length; i++){
                myDict[Object.keys(obj)[i]] = Object.values(obj)[i];
            }
            // console.log(myDict);
            let tempId = (Object.keys(myDict))[Object.keys(myDict).length-1]
            tempId++;
            // console.log(tempId);
            updateProductId(tempId); updateProductList(myDict);
            // updateProductId((Object.keys(obj).length)+1); updateProductList(myDict);
            // console.log(Object.values(obj)[0]);
        })

        // let tempProd = db.ref("products/1");
        // console.log(tempProd);

    },[])
    return (
        <div style = {{height: "680px", overflowY: "scroll"}}>
            <h3 style = {{marginTop: "25px", fontFamily: "Arial", fontWeight: "Bold", marginLeft: "90px"}}>Add Products</h3>
            <form onSubmit = {submit} style = {{marginLeft: "60px"}}>
            <Grid container xs = {12}>
            <Grid item xs = {5}>
                <div style = {{marginLeft: "30px"}}>
                <label for = "name" style = {{marginTop: "15px"}}>Product Name</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                <input type = "text" value = {prodName} id = "name" onChange = {nameClick} style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required></input>
                </div>
            </Grid>
            <Grid item xs = {1}></Grid>
            <Grid item xs = {5}>
                <label for = "name" style = {{marginTop: "15px"}}>Brand Name</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                <input type = "text" value = {brand} id = "name" onChange = {brandClick} style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required></input>
            </Grid>
            </Grid>

            <div style = {{marginTop:"30px"}}>
            <Grid container xs = {12}>
            <Grid item xs = {5}>
                <div style = {{marginLeft: "30px"}}>
                <label for = "name" style = {{marginTop: "15px"}}>Category Name</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                <select onChange = {categoryClick} style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required>
                {myCategories ? myCategories.map((val,index)=>(<option key={index}>{val}</option>)) : <h5></h5>} 
                </select>
                </div>
            </Grid>
            <Grid item xs = {1}></Grid>
            <Grid item xs = {5}>
                <label for = "name" style = {{marginTop: "15px"}}>Price</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                <input type = "number" min = "0" value = {price} id = "name" onChange = {priceClick} style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required></input>
            </Grid>
            </Grid>
            </div>

            <div style = {{marginTop:"30px"}}>
            <Grid container xs = {12}>
            <Grid item xs = {5}>
                <div style = {{marginLeft: "30px"}}>
                <label for = "name" style = {{marginTop: "15px"}}>Quantity</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                <input type = "number" min = "0" value = {quantity} id = "name" onChange = {quantityClick} style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required></input>
                </div>
            </Grid>
            <Grid item xs = {1}></Grid>
            <Grid item xs = {5}>
                <label for = "name" style = {{marginTop: "15px"}}>Discount (%)</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                <input type = "number" min = "0" max = "100" value = {discount} id = "name" onChange = {discountClick} style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required></input>
            </Grid>
            </Grid>
            </div>

            <div style = {{marginTop:"30px"}}>
            <Grid container xs = {12}>
            <Grid item xs = {11}>
                <div style = {{marginLeft: "30px"}}>
                <label for = "name" style = {{marginTop: "15px"}}>Image URL</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                <input type = "text" value = {url} id = "name" onChange = {urlClick} style = {{width: "820px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required></input>
                </div>
            </Grid>
            </Grid>
            </div>

            <div style = {{marginTop:"30px"}}>
            <Grid container xs = {12}>
            <Grid item xs = {11}>
                <div style = {{marginLeft: "30px"}}>
                <label for = "name" style = {{marginTop: "15px"}}>Description</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                <input type = "text" value = {description} id = "name" onChange = {descriptionClick} style = {{width: "820px", height:"100px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required></input>
                </div>
            </Grid>
            </Grid>
            </div>
            <div style = {{marginTop:"40px", marginLeft: "30px"}}>
            <input type = "submit" value = "Add Product" style = {{width: "120px", height:"38px", backgroundColor: "#5AB9EA", border: "none", borderRadius: "15px"}}></input>
            </div>
            </form>
        </div>
      )
  }

  export default AddProducts;