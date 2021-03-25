import React from 'react';
import { Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Heart from '@material-ui/icons/FavoriteBorder';
import AddCart from '@material-ui/icons/AddShoppingCart';
import Arrow from '@material-ui/icons/ArrowForward';


function DisplayCategory({label, router,navHighLight}){
    const route = (event)=>{
        router(["homescreen","null"]);
        navHighLight("null");
    }
    const product = {
        url:"https://i.gadgets360cdn.com/products/laptops/large/1525206065_635_inspiron-5559.jpg?downsize=*:180&output-quality=80&output-format=webp",
        category:"Electronics",
        name:"Dell Latitude-5880",
        rating:1,
        price:2000,
    }

    const product2 = {
        url:"https://cdn.mos.cms.futurecdn.net/vEcELHdn998wRTcCzqV5m9-970-80.jpg.webp",
        category:"Electronics",
        name:"Dell Latitude-5880",
        rating:3,
        price:100,
    }

    const ProductList = [product,product,product,product,product,product,product,product,product2,product2,product2,product2,product2,product2,product2,product2];

    const [startindex,setIndex] = React.useState(0);

    let display = [];
    if(ProductList.length <= 8){
        display=ProductList
    }
    else{
        for(let i=startindex;i<startindex+8;i++){
            let ind = i % ProductList.length;
            display.push(ProductList[ind]);
        }
    }

    return(
        <>

            <Grid container alignItems="center" style={{marginLeft:"10%",marginRight:"15%",marginTop:"5%",marginBottom:"5%"}} item xs={12} spacing={3}>

            {
            display.map((obj,index)=>(
                
                <Grid item xs={3}>
                    <div style={{borderRadius:"15px",backgroundColor:"#84CEEB",width:"85%",height:"220px"}}>
                        <div style={{textAlign:"center",marginBottom:"-12%"}}>
                            <img style={{borderRadius:"12px",transform:"translateY(10px)",marginBottom:"-10px"}} src={obj.url} width="90%" height="120px"></img>
                            <h5>{obj.category}</h5>
                            <h5 style={{transform:"translateY(-20px)"}}><strong>{obj.name}</strong></h5>
                            <Rating size="small" style={{transform:"translateY(-45px)"}} name="read-only" value={obj.   rating} readOnly />
                        </div>
                        <div style={{transform:"translateY(-30px)"}}>
                            <AddCart style={{cursor:"pointer",marginLeft:"5%",transform:"translateY(4px)"}}fontSize="small"/>
                            <Heart style={{cursor:"pointer",marginLeft:"5%",transform:"translateY(4px)"}} fontSize="small"/>
                            <h5 style={{display:"inline",marginLeft:"24%"}}><strong>RS:{obj.price}</strong></h5>
                        </div>
                    </div>
                </Grid>))
                }
                {(()=>{
                    if(ProductList.length>8){
                    return (<div style={{position:"absolute",top:"54%",left:"87%"}}>
                        <Arrow onClick={()=>setIndex(startindex+8)} style={{cursor:"pointer",fontSize:"60px",   color:"#355093"}}/>
                    </div>)
                    }
                })()
                }

            </Grid>

        </>
    )
}

export default DisplayCategory;