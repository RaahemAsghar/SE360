import React from 'react'
import Rating from '@material-ui/lab/Rating';
import Heart from '@material-ui/icons/FavoriteBorder';
import Arrow from '@material-ui/icons/ArrowBack';
import { Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js'
import Load from '@material-ui/core/CircularProgress';

function ProductPage({id,addToCart}){
    const [product,setProduct] = React.useState(undefined)
    
    React.useEffect(()=>{
        let db = fireApp.database();
        db.ref("products").once('value').then((snap)=>{
        let obj = snap.val();
        let data = obj[id];
        data.id = id;
        setProduct(data)
        })
    },[id])

    return(
        <>
        {product ? <Grid container style={{marginTop:"5%"}} item xs={12}>
            <Grid item style={{marginLeft:"20%",marginTop:"5%",height:"70%"}} xs={3}>
                <img src={product.url} width="90%" height="70%"></img>
                {/* <Arrow style={{cursor:"pointer",color:"#355093",fontSize:"50px",position:"absolute",top:"68%",left:"33%"}}></Arrow> */}
            </Grid>
            <Grid item style={{backgroundColor:"#C1C8E4",height:"70%"}} xs={3}>
                <div style={{marginLeft:"5%"}}>
                    <h4>{product.name}</h4>
                    <h4>Price: Rs {product.price}</h4>
                    <h4 style={{display:"inline-block",transform:"translateY(-31%)"}}>Rating: </h4>
                    <Rating style={{marginLeft:"5%"}} name="half-rating" defaultValue={product.rating} precision={0.5} readOnly/><br></br>
                    <button onClick={()=>addToCart(id)} style={{cursor:"pointer",border:"none",backgroundColor:"#84CEEB",width:"40%",height:"40px"}}><strong>ADD TO CART</strong></button>
                    <button style={{cursor:"pointer",marginLeft:"10%",transform:"translateY(27%)",border:"none",backgroundColor:"#84CEEB",width:"17%",height:"40px"}}><Heart fontSize="large"/></button>
                </div>
                <div style={{marginLeft:"5%",marginTop:"5%",marginRight:"5%", borderTop:"1px solid black",borderBottom:"1px solid black",height:"25%"}}>
                    <h4 style={{transform:"translateY(-50%)"}}><strong>Description</strong></h4>
                    <h5 style={{transform:"translateY(-60%)",fontWeight:"normal"}}>{product.description}</h5>
                </div>
            </Grid>
        </Grid> : <Load size={60} style={{top:"50%",left:"50%",position:"absolute"}} />}
        </>
    )
}

export default ProductPage;