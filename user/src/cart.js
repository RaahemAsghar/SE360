import React from 'react'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Arrow from '@material-ui/icons/ArrowBack';
import {fireApp} from './fireapp.js'

const useStyles = makeStyles((theme) => ({
    list: {
        overflowY: "auto",
        margin: 0,
        padding: 0,
        listStyle: "none",
        height: "100%",
        '&::-webkit-scrollbar': {
          width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#84CEEB',
        }
      },
    in: {
        width:"70%",
        marginLeft:"10%",
        height:"28px",
        borderRadius:"6px",
    }
  }));

function ShoppingCart({router,reset,log,navHighLight,removeFromCart,addToCart,items}){
    const route = ()=>{
        router(["homescreen","null"]);
        navHighLight("null");
    }
    const classes = useStyles();
    let db = fireApp.database();

    let [productList,setList] = React.useState(undefined)

    React.useEffect(()=>{
        db.ref("products").once('value').then((snap)=>{
        let obj = snap.val();
        let data = Object.keys(obj).map((key)=>{
            obj[key].id = key;
            obj[key].price = obj[key].price * (1-(obj[key].discount)/100)
            return obj[key]
        })
        let cartlist = data.filter((ele)=>{
            for(let x of items){
                if(ele.id === x){
                    return true
                }
            }
            return false
        })
        let finallist = cartlist.map(ele=>{
            let temp = items.filter(x=>x==ele.id)
            ele.count = temp.length
            return ele;
        })
        if(finallist.length > 0){
            setList(finallist)
        }
        if(items.length==0){
            setList(undefined)
        }
     })
    },[items])

    let trans = {
        products: [],
        bookers_email: "",
        recepient_name: "",
        address: "",
        city: "",
        phone:"",
        user_id:""

    }
    const [msg,setmsg] = React.useState("")
    const checkout = (event)=>{
        event.preventDefault()
        if(log[0]){
            db.ref("user").once('value').then(snap=>{
                let obj = snap.val()
                obj = obj[log[1]]
                trans["bookers_email"] = obj["email"]
                let temp_obj = {}
                items.forEach(x=>{
                    let temp2 = items.filter(y=>x==y)
                    temp_obj[x] = temp2.length
                })
                let prices = {}
                productList.forEach(x=>{
                    prices[x.id] = x.price
                })
                let names = {}
                productList.forEach(x=>{
                    names[x.id] = x.name
                })
                trans["product_names"] = names
                trans["product_prices"] = prices
                trans["products"] = temp_obj
                trans["user_id"] = log[1]
                trans["delivered"] = false
                let date = new Date() 
                let time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()  
                let now = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
                trans["date"] = now
                trans["time"] = time
                trans["bill"] = productList.reduce((total,obj)=>total+obj.price*obj.count,0)

                db.ref("products").once("value").then(snapshot=>{
                    let v = snapshot.val()
                    Object.keys(temp_obj).forEach(z=>{
                        let u = v[z]
                        u.stock_left = u.stock_left - temp_obj[z]
                        u.total_sold = u.total_sold + temp_obj[z]
                        db.ref("products").child(z).set(u)
                    })
                    db.ref("pendingOrder").push(trans)
                    setmsg("Your orders have been placed successfully!")
                    setTimeout(reset,2000)
                })
            })
        }else{
            setmsg("Please go the accounts and log in first")
            setTimeout(()=>setmsg(""),5000)
        }
        event.target.reset()

    }

    return (
        <>
        {productList ? <Grid item container xs={12}>
            <Grid item xs={12}>
                <h2 style={{marginLeft:"8%",marginTop:"2.5%",color:"#355093"}}>Shopping Cart</h2>
            </Grid>

            <Grid item style={{marginTop:"-10%",marginLeft:"8%"}} xs={5}>
                <div style={{marginTop:"-4%",textAlign:"center",backgroundColor:"#355093",color:"white",height:"40px"}}>
                    <h4 style={{transform:"translateY(33%)"}}> Fill out your checkout details here</h4>
                </div>
                <form onSubmit={checkout}>
                    <h4 style={{marginLeft:"10%"}}>{msg}</h4>
                    <h4 style={{marginLeft:"10%"}}>Shipping Information</h4>
                    <input onChange={(event)=>{trans["recepient_name"]=event.target.value}} className={classes.in} type="text" placeholder=" Full Name" required></input>
                    <input onChange={(event)=>{trans["address"]=event.target.value}} style={{marginTop:"5%"}} className={classes.in} type="text" placeholder=" shipping Address" required></input>
                    <input onChange={(event)=>{trans["city"]=event.target.value}} style={{marginTop:"5%"}} className={classes.in} type="text" placeholder=" City" required></input>
                    <input onChange={(event)=>{trans["phone"]=event.target.value}} style={{marginTop:"5%"}} className={classes.in} type="number" placeholder=" Phone" required></input><br/>
                    <button onClick={route} style={{cursor:"pointer",border:"none",backgroundColor:"#84CEEB",padding:"4px",transform:"translateY(30px) translateX(70%)"}}>Homepage</button>
                    <button style={{cursor:"pointer",border:"none",backgroundColor:"#84CEEB",padding:"4px",transform:"translateY(30px)translateX(280%)"}}>Ship Products</button>
                </form>
       
            </Grid>

            <Grid item style={{backgroundColor:"#D8D8D8",marginTop:"-10%",marginBottom:"5%"}} xs={5}>
                <div style={{marginTop:"-4%",textAlign:"center",backgroundColor:"#355093",color:"white",height:"40px"}}>
                    <h4 style={{transform:"translateY(33%)"}}>You have the following items in your cart</h4>
                </div>     
                <div className={classes.list} style={{ height:"260px",overflow:"auto"}}>
                    {productList.map((obj)=>(
                        <div>
                        <div style={{marginLeft:"10%",display:"inline-block"}}>
                            <img style={{marginLeft:"10%"}}src={obj.url} width="120px" height="100px"></img>
                        </div>
                        <div style={{marginLeft:"10%",transform:"translateY(-10px)",display:"inline-block"}}>
                            <h4 style={{transform:"translateY(6px)",fontWeight:"500"}}>{obj.name}</h4>
                            <h4 style={{fontWeight:"normal",marginTop:"-5%"}}>Quantity: {obj.count}<span style={{marginLeft:"25px"}}><button onClick={()=>{if(obj.count<obj.stock_left){addToCart(obj.id)}}} style={{backgroundColor:"#84CEEB"}}>+</button><button onClick={()=>removeFromCart(obj.id)} style={{marginLeft:"5px",backgroundColor:"#84CEEB"}}>--</button></span></h4>
                            <h4 style={{color:"#355093",fontWeight:"normal",transform:"translateY(-20px)"}}>RS: {Math.round(obj.price * obj.count)}</h4>
                            <h6 style={{marginTop:"-37px",color:"green"}}>Only {obj.stock_left} in stock</h6>
                        </div>
                        </div>
                ))}
                </div>
                <div style={{padding:"20px",marginLeft:"12%",marginRight:"12%",transform:"translateY(50px)",borderTop:"1px solid black",borderBottom:"1px solid black"}}>
                    <h3 style={{display:"inline"}}>Total</h3>
                    <h3 style={{marginLeft:"52%",display:"inline"}}>Rs:{Math.round(productList.reduce((total,obj)=>total+obj.price*obj.count,0))}</h3>
                </div>        
            </Grid>
        
        </Grid> : <h3 style={{top:"45%",left:"45%",position:"absolute"}}>No Items in cart</h3>}
        </>
    )
}

export default ShoppingCart;