import React from 'react';
import { Grid } from '@material-ui/core';
import { Slide } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Heart from '@material-ui/icons/FavoriteBorder';
import AddCart from '@material-ui/icons/AddShoppingCart';
import Arrow from '@material-ui/icons/ArrowForward';

function Content(){
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

    const TopSellingList = [product,product,product,product,product,product2,product2,product2]; //plug into database
    const SaleList = [product,product,product,product,product,product2,product2,product2]; //plug into database

    const [startindexTop,setIndexTop] = React.useState(0);
    const [startindexSale,setIndexSale] = React.useState(0);

    const topFour = [];
    const SaleFour = [];

    for(let i=startindexTop;i<startindexTop+5;i++){
        let ind = i % TopSellingList.length;
        topFour.push(TopSellingList[ind]);
    }

    for(let i=startindexSale;i<startindexSale+5;i++){
        let ind = i % SaleList.length;
        SaleFour.push(SaleList[ind]);
    }

    return(
    <div>
         {/* <Grid item xs={12}>
                <div style={{marginLeft:"5%",marginTop:"3%"}}>
                    <h4>Slide show</h4>
                </div>
            </Grid> */}

        <Grid container spacing={4} item xs={12}>

        <Grid item xs={1}></Grid>

        <Grid item xs={11}>
            <h4 style={{marginTop:"3%"}}>Top Selling Products</h4>
        </Grid>

        <Grid item xs={1}></Grid>

        {
        topFour.map((obj,index)=>(
        <Slide direction="left" timeout={600} in>
        <Grid item xs={2}>
            <div style={{borderRadius:"15px",backgroundColor:"#84CEEB",marginTop:"-20%",height:"220px"}}>
                <div style={{textAlign:"center",marginBottom:"-12%"}}>
                    <img style={{borderRadius:"12px",transform:"translateY(10px)",marginBottom:"-10px"}} src={obj.url} width="90%" height="120px"></img>
                    <h5>{obj.category}</h5>
                    <h5 style={{transform:"translateY(-20px)"}}><strong>{obj.name}</strong></h5>
                    <Rating size="small" style={{transform:"translateY(-45px)"}} name="read-only" value={obj.rating} readOnly />
                </div>
                <div style={{transform:"translateY(-30px)"}}>
                    <AddCart style={{cursor:"pointer",marginLeft:"5%",transform:"translateY(4px)"}}fontSize="small"/>
                    <Heart style={{cursor:"pointer",marginLeft:"5%",transform:"translateY(4px)"}} fontSize="small"/>
                    <h5 style={{display:"inline",marginLeft:"24%"}}><strong>RS:{obj.price}</strong></h5>
                </div>
            </div>
        </Grid></Slide>))
        }

        <Grid item xs={1}>
            <Arrow onClick={()=>setIndexTop(startindexTop+1)} style={{cursor:"pointer",fontSize:"60px",color:"#355093"}}/>
        </Grid>

        </Grid>

        <Grid container spacing={4} item xs={12}>

            <Grid item xs={1}></Grid>

            <Grid item xs={11}>
                <h4 style={{transform:"translateY(-20px)"}}>Products on Sale</h4>
            </Grid>

            <Grid item xs={1}></Grid>

            {
            SaleFour.map((obj,index)=>(<Slide direction="left" timeout={600} in><Grid item xs={2}>
                <div style={{transform:"translateY(-20px)",borderRadius:"15px",backgroundColor:"#84CEEB",marginTop:"-20%",height:"220px"}}>
                    <div style={{position:"relative",textAlign:"center",marginBottom:"-12%"}}>
                        <span style={{float:"right",backgroundColor:"red",color:"white",width:"20%",paddingLeft:"3%",paddingRight:"3%",marginTop:"-10px"}}>Sale</span>
                        <img style={{borderRadius:"12px",transform:"translateY(10px)",marginTop:"-11px"}} src={obj.url} width="90%" height="120px"></img>
                        <h5 style={{marginTop:"7%"}}>{obj.category}</h5>
                        <h5 style={{transform:"translateY(-20px)"}}><strong>{obj.name}</strong></h5>
                        <Rating size="small" style={{transform:"translateY(-43px)"}} name="read-only" value={obj.rating} readOnly />
                    </div>
                    <div style={{transform:"translateY(-30px)"}}>
                        <AddCart style={{cursor:"pointer",marginLeft:"5%",transform:"translateY(4px)"}}fontSize="small"/>
                        <Heart style={{cursor:"pointer",marginLeft:"5%",transform:"translateY(4px)"}} fontSize="small"/>
                        <h5 style={{display:"inline",marginLeft:"24%"}}><strong>RS:{obj.price}</strong></h5>
                    </div>
                </div>
            </Grid></Slide>))
            }

            <Grid item xs={1}>
                <Arrow onClick={()=>setIndexSale(startindexSale+1)} style={{cursor:"pointer",fontSize:"60px",color:"#355093"}}/>
            </Grid>

        </Grid>

    </div>
);}

export default Content;