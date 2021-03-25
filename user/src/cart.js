import React from 'react'
import { Grid } from '@material-ui/core';

function ShoppingCart(){

    const product = {
        url:"https://i.gadgets360cdn.com/products/laptops/large/1525206065_635_inspiron-5559.jpg?downsize=*:180&output-quality=80&output-format=webp",
        category:"Electronics",
        name:"Dell Latitude-5880",
        rating:1,
        description: "Lorem OPsum tosum askdasknasfnafss asjdksajkd",
        price:2000,
    }
    let productList = [product];
    return (
        <Grid item container xs={12}>
            <Grid item xs={12}>
                <h2 style={{marginLeft:"8%",marginTop:"2.5%",color:"#355093"}}>Shopping Cart</h2>
            </Grid>

            <Grid item style={{marginTop:"-10%",marginLeft:"8%"}} xs={5}>
                <div style={{marginTop:"-3.2%",textAlign:"center",backgroundColor:"#355093",color:"white",height:"40px"}}>
                    <h4 style={{transform:"translateY(33%)"}}> Fill out your checkout details here</h4>
                </div>
       
            </Grid>

            <Grid item style={{backgroundColor:"#F2F2F2",marginTop:"-10%",marginBottom:"5%"}} xs={5}>
                <div style={{marginTop:"-3.2%",textAlign:"center",backgroundColor:"#355093",color:"white",height:"40px"}}>
                    <h4 style={{transform:"translateY(33%)"}}>You have the following items in your cart</h4>
                </div>     
                <div style={{ height:"260px",overflow:"auto"}}>
                    {productList.map((obj)=>(
                        <div>
                        <div style={{marginLeft:"10%",display:"inline-block"}}>
                            <img style={{marginLeft:"10%"}}src={obj.url} width="120px"></img>
                        </div>
                        <div style={{marginLeft:"10%",display:"inline-block"}}>
                            <h4 style={{transform:"translateY(6px)",fontWeight:"500"}}>{obj.name}</h4>
                            <h4 style={{fontWeight:"normal",marginTop:"-5%"}}>Quantity: 1<span style={{marginLeft:"25px"}}><button style={{backgroundColor:"#84CEEB"}}>+</button><button style={{marginLeft:"5px",backgroundColor:"#84CEEB"}}>--</button></span></h4>
                            <h4 style={{color:"#355093",fontWeight:"normal",transform:"translateY(-20px)"}}>RS: {obj.price}</h4>
                        </div>
                        </div>
                ))}
                </div>
                <div style={{padding:"20px",marginLeft:"12%",marginRight:"12%",transform:"translateY(50px)",borderTop:"1px solid black",borderBottom:"1px solid black"}}>
                    <h3 style={{display:"inline"}}>Total</h3>
                    <h3 style={{marginLeft:"52%",display:"inline"}}>Rs:6000</h3>
                </div>        
            </Grid>
        
        </Grid>
    )
}

export default ShoppingCart;