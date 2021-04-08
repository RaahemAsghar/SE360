import React from 'react';
import { Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js';

function AddProducts ({router}) {
    let [product, updateProduct] = React.useState(['','','','','','']);
    let [prodName, updateProdName] = React.useState('');
    let [brand, updateBrand] = React.useState('');
    let [price, updatePrice] = React.useState('');
    let [url, updateUrl] = React.useState('');
    let [description, updateDescription] = React.useState('');
    let [myCategories, updateMyCategories] = React.useState([''])
    let [category, updateCategory] = React.useState('');
    let [check,setCheck] = React.useState(false);
    // let [prods, updateProds] = React.useState({0:'',1:'',2:'',3:'',4:'',5:''});

    const nameClick = (event) => {
        updateProdName(event.target.value);
    }
    const brandClick = (event) => {
        updateBrand(event.target.value);
    }
    const categoryClick = (event) => {
        // console.log(category);
        updateCategory(event.target.value);
    } 
    const priceClick = (event) => {
        updatePrice(event.target.value);
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
        let product = {
            name: prodName,
            brand_name: brand,
            category: category,
            price: price,
            stock_left: 100,
            total_sold: 0,
            discount: 0,
            rating: (Math.floor(Math.random() * 5)+1),
            url: url,
            description: description,
        }
        // console.log(product);
        db.ref("products").push(product);
        updateProdName(''); updateBrand(''); updateCategory(myCategories[0]); updatePrice(''); updateUrl(''); updateDescription('');
    }
    React.useEffect(()=>{
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
        // if(category===''){updateCategory(myCategories[0]);} // I am assuming that the admin will never delete all of the cateories
     })
    },[])
    return (
        <div>
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
                {/* <input type = "text" value = {category} id = "name" onChange = {categoryClick} style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required></input> */}
                </div>
            </Grid>
            <Grid item xs = {1}></Grid>
            <Grid item xs = {5}>
                <label for = "name" style = {{marginTop: "15px"}}>Price</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                <input type = "text" value = {price} id = "name" onChange = {priceClick} style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required></input>
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