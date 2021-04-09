import React from 'react';
import { Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Heart from '@material-ui/icons/FavoriteBorder';
import AddCart from '@material-ui/icons/AddShoppingCart';
import Arrow from '@material-ui/icons/ArrowForward';
import Load from '@material-ui/core/CircularProgress';
import {fireApp} from './fireapp.js'


function DisplayCategory({addToCart,router,label,navHighLight}){
    const route = (event)=>{
        router(["homescreen","null"]);
        navHighLight("null");
    }
    const route2 = (event)=>{
        let id = event.target.dataset.id;
        router(["productpage",id,["category",label]]);
    }

    const [ProductList,setList] = React.useState(undefined)
    
    React.useEffect(()=>{
        let db = fireApp.database();
        db.ref("products").once('value').then((snap)=>{
        let obj = snap.val();
        let data = Object.keys(obj).map((key)=>{
            obj[key].id = key;
            return obj[key]
        })
        let list = data.filter(ele=>ele.category==label)
        setList(list)
     })
    },[label])

    const [startindex,setIndex] = React.useState(0);

    let display = [];

    if(ProductList){

        if(ProductList.length <= 8){
            display=ProductList
        }
        else{
            for(let i=startindex;i<startindex+8;i++){
                let ind = i % ProductList.length;
                display.push(ProductList[ind]);
            }
        }
    }

    return(
        <>

            {ProductList ? <Grid container alignItems="center" style={{marginLeft:"10%",marginRight:"15%",marginTop:"5%",marginBottom:"5%"}} item xs={12} spacing={3}>

            {
            display.map((obj,index)=>(
                
                <Grid item xs={3}>
                    <div style={{borderRadius:"15px",backgroundColor:"#84CEEB",width:"85%",height:"220px"}}>
                        <div style={{textAlign:"center",marginBottom:"-12%"}}>
                            <img data-id={obj.id} onClick={route2} style={{borderRadius:"12px",transform:"translateY(10px)",marginBottom:"-10px"}} src={obj.url} width="90%" height="120px"></img>
                            <h5>{obj.category}</h5>
                            <h5 style={{transform:"translateY(-20px)"}}><strong>{obj.name}</strong></h5>
                            <Rating size="small" style={{transform:"translateY(-45px)"}} name="read-only" value={obj.   rating} readOnly />
                        </div>
                        <div style={{transform:"translateY(-30px)"}}>
                            <AddCart onClick={()=>addToCart(obj.id)} style={{cursor:"pointer",marginLeft:"5%",transform:"translateY(4px)"}}fontSize="small"/>
                            <Heart style={{cursor:"pointer",marginLeft:"5%",transform:"translateY(4px)"}} fontSize="small"/>
                            <h5 style={{display:"inline",marginLeft:"24%"}}><strong>RS:{obj.price}</strong></h5>
                        </div>
                    </div>
                </Grid>))
                }
                {(()=>{

                    if(ProductList){

                        if(ProductList.length>8){
                            return (<div style={{position:"absolute",top:"54%",left:"87%"}}>
                                <Arrow onClick={()=>setIndex(startindex+8)} style={{cursor:"pointer",fontSize:"60px",   color:"#355093"}}/>
                            </div>)
                        }
                    }
                })()
                }

            </Grid> : <Load size={60} style={{top:"50%",left:"50%",position:"absolute"}} />}

        </>
    )
}

export default DisplayCategory;