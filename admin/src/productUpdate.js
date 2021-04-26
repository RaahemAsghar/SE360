import React from 'react';
import { Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

function ProductUpdate ({allProducts}) {
    let [form, updateForm] = React.useState([]);
    let [firstFilled, updateFirstFilled] = React.useState(false);
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
    let [boxState, updateBoxState] = React.useState("none");
    let [box1, updateBox1] = React.useState(false); // Product Not found Box
    let [box2, updateBox2] = React.useState(false); // Product Updated Successfully

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
    const formMaker = () => {
        return form;
    }

    const idClick = (event) => {
        if(!firstFilled){updateProductId(event.target.value);}
    }
    const nameClick = (event) => {
        if(!firstFilled){updateProductName(event.target.value);}
    }
    const submitForm2 = (event) => {
        event.preventDefault();
        let db = fireApp.database();
        let product = {
            brand_name: brand,
            category: category,
            description: description,
            discount: Number(discount),
            name: prodName,
            price: Number(price),
            rating: allProducts[productId]['rating'],
            stock_left: Number(quantity),
            total_sold: allProducts[productId]['total_sold'],
            url: url,
        }
        db.ref('products').child(productId).update(product);
        allProducts[productId] = product;
        updateBox2(true); updateBoxState("updated successfully")
        // if(firstFilled){updateFirstFilled(false);}
        // updateFirstFilled(false); updateProductId(''); updateProductName(''); updateProdName(''); updateBrand(''); updateCategory(''); updatePrice(''); updateQuantity(''); updateDiscount(''); updateUrl(''); updateDescription('');
    }
    const formPrinter = () => {
        let majList = []
        if(firstFilled){
            majList = findProduct();
        }
        return majList;
    }
    const findProduct = () => {
        let myProduct = allProducts[productId];
        if(myProduct === undefined){
            // updateForm([]);
            return []
        }
        else{
            // updateProdName(myProduct['name']); updateBrand(myProduct['brand_name']); updatePrice(myProduct['price']); updateQuantity(myProduct['stock_left']); updateDiscount(myProduct['discount']); updateUrl(myProduct['url']); updateDescription(myProduct['description']);
            
            let myForm = [<h3 style = {{marginTop: "50px", fontFamily: "Arial", fontWeight: "Bold", marginLeft: "0px"}}>Product Details</h3>,
            <form onSubmit = {submitForm2} style = {{marginLeft: "0px"}}>
            <Grid container xs = {12}>
            <Grid item xs = {5}>
                <div style = {{marginLeft: "0px"}}>
                <label for = "name" style = {{marginTop: "15px"}}>Product Name</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                <input type = "text" value = {prodName} id = "name" onChange = {prodNameClick} style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required></input>
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
                <div style = {{marginLeft: "0px"}}>
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
                <div style = {{marginLeft: "0px"}}>
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
                <div style = {{marginLeft: "0px"}}>
                <label for = "name" style = {{marginTop: "15px"}}>Image URL</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                <input type = "text" value = {url} id = "name" onChange = {urlClick} style = {{width: "820px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required></input>
                </div>
            </Grid>
            </Grid>
            </div>

            <div style = {{marginTop:"30px"}}>
            <Grid container xs = {12}>
            <Grid item xs = {11}>
                <div style = {{marginLeft: "0px"}}>
                <label for = "name" style = {{marginTop: "15px"}}>Description</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                <input type = "text" value = {description} id = "name" onChange = {descriptionClick} style = {{width: "820px", height:"100px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required></input>
                </div>
            </Grid>
            </Grid>
            </div>
            <div style = {{marginTop:"40px", marginLeft: "0px"}}>
            <input type = "submit" value = "Update Product" style = {{width: "150px", height:"38px", backgroundColor: "#5AB9EA", border: "none", borderRadius: "15px"}}></input>
            </div>
            </form>]
            // updateForm(myForm);
            return myForm;
        }
    }
    const submit = (event) => {
        event.preventDefault();
        let myProduct = allProducts[productId];
        if(myProduct != undefined){
            if(productName.toLowerCase() == myProduct['name'].toLowerCase()){
                updateProdName(myProduct['name']); updateBrand(myProduct['brand_name']); updatePrice(myProduct['price']); updateQuantity(myProduct['stock_left']); updateDiscount(myProduct['discount']); updateUrl(myProduct['url']); updateDescription(myProduct['description']); updateCategory(myProduct['category'])
                let tempCategories = myCategories;
                for(let i = 0; i< tempCategories.length; i++){
                    if(tempCategories[i]=== myProduct['category']){
                        let temp = tempCategories[i];
                        tempCategories[i] = tempCategories[0];
                        tempCategories[0] = temp; break;
                    }
                }
                updateMyCategories(tempCategories); updateFirstFilled(true);
            }
            else{
                // updateProductName(''); updateProductId('');
                updateBox1(true); updateBoxState("not found");
            }
        }
        else{
            // updateProductName(''); updateProductId('');
            updateBox1(true); updateBoxState("not found");
        }
        // if(!firstFilled){updateFirstFilled(true);}
        // findProduct();
        // updateProductId(''); updateProductName('');
    }
    function initialDisplay(){
        if(!Object.keys(allProducts).length){return [<h6 style = {{marginTop: "20px"}}>There are no products in your store yet</h6>];}
        let myDisplay = [<form onSubmit = {submit} style = {{marginLeft: "0px"}}>
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

    const close1Click = () => {
        updateBox1(false); updateProductName(''); updateProductId('');
    }
    const close2Click = () => {
        updateBox2(false); updateFirstFilled(false); updateProductId(''); updateProductName(''); updateProdName(''); updateBrand(''); updateCategory(''); updatePrice(''); updateQuantity(''); updateDiscount(''); updateUrl(''); updateDescription('');
    }
    function notFoundBox () {
        let myBox = []
        if(box1){
            myBox = [<Dialog open={box1} onClose={close1Click} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"><DialogTitle id="alert-dialog-title">{"Not Found"}</DialogTitle><DialogContent><DialogContentText id="alert-dialog-description">This Product is not present in your inventory</DialogContentText></DialogContent><DialogActions><Button onClick={close1Click} color="primary">close</Button></DialogActions></Dialog>]
        }
        return myBox;
    }
    function successfulUpdateBox () {
        let myBox = []
        if(box2){
            myBox = [<Dialog open={box2} onClose={close2Click} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"><DialogTitle id="alert-dialog-title">{"Successful Update"}</DialogTitle><DialogContent><DialogContentText id="alert-dialog-description">This product has been updated successfully</DialogContentText></DialogContent><DialogActions><Button onClick={close2Click} color="primary">close</Button></DialogActions></Dialog>]
        }
        return myBox;
    }

    function displayBox () {
        let myBox = []
        if (boxState === "not found"){
            myBox = notFoundBox();
        } else if (boxState === "updated successfully"){
            myBox = successfulUpdateBox();
        }
        return myBox;
    }
    
    React.useEffect(()=>{
        // console.log(Object.keys(allProducts).length);
        // console.log(allProducts[1]);
        let db = fireApp.database();
        db.ref("Categories").once('value').then((snap)=>{
            let obj = snap.val();
            let data = Object.keys(obj).map((key)=>obj[key]) 
            updateMyCategories(data[0]);
            if (!check){
                if(data[0].length){
                    updateCategory(data[0][0]);
                    // updateCategory('hello');
                } setCheck(true);
            }
         })
    },[])
    return(
        <div style = {{marginLeft: "90px", height: "680px", overflowY: "scroll"}}>
            <h3 style = {{marginTop: "25px", fontFamily: "Arial", fontWeight: "Bold"}}>Update Products</h3>
            {initialDisplay()}
            {displayBox()}
            {formPrinter()}
        </div>
    )
}

export {ProductUpdate}