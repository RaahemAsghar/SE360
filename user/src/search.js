import React from 'react';
import { Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Heart from '@material-ui/icons/FavoriteBorder';
import AddCart from '@material-ui/icons/AddShoppingCart';
import Arrow from '@material-ui/icons/ArrowForward';
import {fireApp} from './fireapp.js'
import { makeStyles } from '@material-ui/core/styles';
import Load from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    effect: {
        '&:hover': {
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        }
      }
  }));


function Search({addToCart,router,navHighLight,query}){
    const classes = useStyles()
    const route = (event)=>{
        router(["homescreen","null"]);
        navHighLight("null");
    }
    const route2 = (event)=>{
        let id = event.target.dataset.id;
        router(["productpage",id,["search",query]]);
    }

    const [ProductList,setList] = React.useState(undefined)
    
    React.useEffect(()=>{
        let db = fireApp.database();
        db.ref("products").once('value').then((snap)=>{
        let obj = snap.val();
        db.ref("ratings").once('value').then(snapshot=>{
            let obje = snapshot.val()
            let data = Object.keys(obj).map((key)=>{
                obj[key].id = key;
                obj[key].price = Math.round(obj[key].price * (1-(obj[key].discount)/100))
                obj[key].rating = giverating(key,obje)
                return obj[key]
            })
            let qry = query.toLowerCase()
            let fltr = data.filter(ele=>(ele.brand_name.toLowerCase().includes(qry) || ele.category.toLowerCase().includes(qry) || ele.description.toLowerCase().includes(qry) || ele.name.toLowerCase().includes(qry)));
            fltr = fltr.filter(x=>x.stock_left>0)
            setList(fltr)
        })
     })
    },[query])

    const [startindex,setIndex] = React.useState(0);

    const giverating = (idx,record) => {
        if(record){
            let tempo = record[idx]
            if(tempo){
                tempo = Object.keys(tempo).map(key=>tempo[key])
                let ans = 0
                for(let x of tempo){
                    ans = ans + x
                }
                return ans/tempo.length
            }
        }
        return 2.5
}

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
            <h3 style={{position:"absolute",top:"10%",left:"18.5%",color:"#355093"}}>Search results for "{query}"</h3>
            {ProductList ? <Grid container style={{marginLeft:"10%",marginRight:"15%",marginTop:"5%",marginBottom:"5%"}} item xs={12} spacing={3}>
            {
            display.map((obj,index)=>(
                
                <Grid item xs={3}>
                    <div className={classes.effect} style={{borderRadius:"15px",backgroundColor:"#84CEEB",width:"85%",height:"220px"}}>
                        <div style={{textAlign:"center",marginBottom:"-12%"}}>
                            <img data-id={obj.id} onClick={route2} style={{borderRadius:"12px",transform:"translateY(10px)",marginBottom:"-10px"}} src={obj.url} width="90%" height="120px"></img>
                            <h5>{obj.category}</h5>
                            <h5 style={{transform:"translateY(-20px)"}}><strong>{obj.name}</strong></h5>
                            <Rating size="small" style={{transform:"translateY(-45px)"}} name="read-only" value={obj.rating} precision={0.5} readOnly />
                        </div>
                        <div style={{transform:"translateY(-30px)"}}>
                            <AddCart onClick={()=>addToCart(obj.id)} style={{cursor:"pointer",marginLeft:"5%",transform:"translateY(4px)"}}fontSize="small"/>
                            <Heart style={{cursor:"pointer",visibility:"hidden",marginLeft:"5%",transform:"translateY(4px)"}} fontSize="small"/>
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

export default Search;