import React from 'react';
import { Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Heart from '@material-ui/icons/FavoriteBorder';
import AddCart from '@material-ui/icons/AddShoppingCart';
import Arrow from '@material-ui/icons/ArrowForward';
import Load from '@material-ui/core/CircularProgress';
import {fireApp} from './fireapp.js'
import Back from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    effect: {
        '&:hover': {
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        }
      }
  }));


function DisplayCategory({addToCart,router,label,navHighLight}){
    const classes = useStyles()
    const route = (event)=>{
        router(["homescreen","null"]);
        navHighLight("null");
    }
    const route2 = (event)=>{
        let id = event.target.dataset.id;
        router(["productpage",id,["category",label]]);
    }

    const [ProductList,setList] = React.useState(undefined)
    
    const giverating = (idx,record) => {
        if(record){
            let obj = record[idx]
            if(obj){
                obj = Object.keys(obj).map(key=>obj[key])
                let ans = 0
                for(let x of obj){
                    ans = ans + x
                }
                return ans/obj.length
            }
        }
        return 2.5
}

    React.useEffect(()=>{
        let db = fireApp.database();
        db.ref("products").once('value').then((snap)=>{
        let obj = snap.val();
        db.ref("ratings").once('value').then(snapshot=>{
            let obje = snapshot.val()
            let data = Object.keys(obj).map((key)=>{
                obj[key].id = key;
                obj[key].newprice = Math.round(obj[key].price * (1-(obj[key].discount)/100))
                obj[key].rating = giverating(key,obje)
                return obj[key]
            })
            let list = []
            if(label=="sale"){
                list = data.filter(ele=>ele.discount>0)
            }else{
                list = data.filter(ele=>ele.category==label)
            }
            setList(list)
        })
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
            <h3 style={{position:"absolute",top:"10%",left:"18.5%",color:"#355093"}}>{label.toUpperCase()}</h3>
            {ProductList ? <Grid container style={{marginLeft:"10%",marginRight:"15%",marginTop:"5%",marginBottom:"5%"}} item xs={12} spacing={3}>

            {
            display.map((obj,index)=>(
                
                <Grid item xs={3}>
                    {label!="sale" ? <div className={classes.effect} style={{borderRadius:"15px",backgroundColor:"#84CEEB",width:"85%",height:"220px"}}>
                        <div style={{textAlign:"center",marginBottom:"-12%"}}>
                            <img data-id={obj.id} onClick={route2} style={{borderRadius:"12px",transform:"translateY(10px)",marginBottom:"-10px"}} src={obj.url} width="90%" height="120px"></img>
                            <h5>{obj.category}</h5>
                            <h5 style={{transform:"translateY(-20px)"}}><strong>{obj.name}</strong></h5>
                            <Rating size="small" style={{transform:"translateY(-45px)"}} name="read-only" value={obj.rating} precision={0.5} readOnly />
                        </div>
                        <div style={{transform:"translateY(-30px)"}}>
                            <AddCart onClick={()=>addToCart(obj.id)} style={{cursor:"pointer",marginLeft:"5%",transform:"translateY(4px)"}}fontSize="small"/>
                            <Heart style={{cursor:"pointer",visibility:"hidden",marginLeft:"5%",transform:"translateY(4px)"}} fontSize="small"/>
                            <h5 style={{display:"inline",marginLeft:"24%"}}><strong>RS:{obj.newprice}</strong></h5>
                        </div>
                    </div> : 
                    <div  className={classes.effect} style={{borderRadius:"15px",backgroundColor:"#84CEEB",width:"85%",height:"220px"}}>
                    <div style={{position:"relative",textAlign:"center",marginBottom:"-12%"}}>
                        <span style={{float:"right",backgroundColor:"red",color:"white",width:"20%",paddingLeft:"3%",paddingRight:"3%",marginTop:"-10px"}}>Sale</span>
                        <img data-id={obj.id} onClick={route2} style={{borderRadius:"12px",transform:"translateY(10px)",marginTop:"-11px"}} src={obj.url} width="90%" height="120px"></img>
                        <h5 style={{marginTop:"7%"}}>{obj.category}</h5>
                        <h5 style={{transform:"translateY(-20px)"}}><strong>{obj.name}</strong></h5>
                        <Rating size="small" style={{transform:"translateY(-43px)"}} name="read-only" value={obj.rating} precision={0.5} readOnly />
                    </div>
                    <div style={{transform:"translateY(-30px)"}}>
                        <AddCart onClick={()=>addToCart(obj.id)} data-id={obj.id} style={{cursor:"pointer",marginLeft:"5%",transform:"translateY(4px)"}}fontSize="small"/>
                        <Heart style={{cursor:"pointer",visibility:"hidden",marginLeft:"5%",transform:"translateY(4px)"}} fontSize="small"/>
                        <h5 style={{display:"inline",marginLeft:"24%"}}><strong>RS:{Math.round(obj.price*(1-obj.discount/100))}</strong></h5>
                        <h6 style={{textDecoration:"line-through",color:"red",transform:"translateX(57.5%) translateY(-200%)"}}><strong>RS:{obj.price}</strong></h6>
                    </div>
                </div>}
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
                {
                    (()=>{
                        if(startindex >= 8){
                            return (<div style={{position:"absolute",top:"54%",left:"10%"}}>
                            <Back onClick={()=>setIndex(startindex-8)} style={{cursor:"pointer",fontSize:"60px",   color:"#355093"}}/>
                        </div>)
                        }
                    })()
                }

            </Grid> : <Load size={60} style={{top:"50%",left:"50%",position:"absolute"}} />}

        </>
    )
}

export default DisplayCategory;