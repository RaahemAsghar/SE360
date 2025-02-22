import React from 'react';
import Content from './ContentScreen.js';
import DisplayCategory from './category.js'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import Heart from '@material-ui/icons/FavoriteBorder';
import Cart from '@material-ui/icons/ShoppingCartOutlined';
import Circle from '@material-ui/icons/CheckCircleOutline';
import ShoppingCart from './cart.js';
import ProductPage from './productPage.js';
import Login from './LoginPage.js'
import Settings from './accountsettings.js'
import Search from './search.js'
import {fireApp} from './fireapp.js'
import History from './orders.js'
import Salespage from './sale.js'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    navbar:{
        backgroundColor: "#355093",
        color: "white",
        paddingLeft: "10px",
    },
    header:{
        borderBottom: "10px solid #355093",
    },
  }));

function Homepage() {
    const classes = useStyles(); 

    const [focus,Setfocus] = React.useState(["homescreen","Null"])
    const [navcolor,setColor] = React.useState("null")

    const [logged, setLog] = React.useState([false,"id"])

    const [cartItems,setItems] = React.useState([])

    React.useEffect(()=>{
        let id = sessionStorage.getItem("userid")
        let crt = sessionStorage.getItem("cart")
        if(id){
            setLog([true,id])
        }
        if(crt){
            crt = JSON.parse(crt)
            console.log(crt)
            setItems(crt)
        }
    },[])

    const changeFocus = (newFocus) => {
        Setfocus(newFocus);
    }

    const changeLog = (arg) => {
        setLog(arg)
    }

    const isin = (x)=>{
        for(let y of cartItems){
            if(x==y){
                return true
            }
        }
        return false
    }
    const addItems = (id) => {
        if(!isin(id)){
            sessionStorage.setItem("cart",JSON.stringify([...cartItems,id]))
            setItems([...cartItems,id])
        }
    }
    const addItems2 = (id) => {
        sessionStorage.setItem("cart",JSON.stringify([...cartItems,id]))
        setItems([...cartItems,id])
        
    }
    const removeItems = (id) =>{
        if(cartItems.length==1){
            sessionStorage.setItem("cart",JSON.stringify([]))
            setItems([])
        }else
        {
            let temp = [...cartItems];
            let indx = temp.indexOf(id)
            temp.splice(indx,1)
            sessionStorage.setItem("cart",JSON.stringify(temp))
            setItems(temp)
        }
    }
    const choose = () => {
        if(focus[0] === "homescreen"){
            return <Content  addToCart={addItems} router={changeFocus}/>
        }
        else if(focus[0] === "category"){
            return <DisplayCategory  addToCart={addItems} label={focus[1]} router={changeFocus} navHighLight={setColor}/>
        }
        else if(focus[0] === "cart"){
            return <ShoppingCart reset={()=>setItems([])} log={logged} router={changeFocus} removeFromCart={removeItems} addToCart={addItems2} items={cartItems} navHighLight={setColor}/>
        }
        else if(focus[0] === "productpage"){
            return <ProductPage log={logged} router={changeFocus} current={focus[2]} addToCart={addItems} id={focus[1]}/>
        }
        else if(focus[0] === "login"){
            return <Login router={changeFocus} set={changeLog}/>
        }
        else if(focus[0] === "settings"){
            return <Settings router={changeFocus} id={logged[1]} set={changeLog}/>
        }
        else if(focus[0] === "search"){
            return <Search query={focus[1]} addToCart={addItems} router={changeFocus} navHighLight={setColor}/>
        }
        else if(focus[0] === "My Orders"){
            return <History user={logged[1]}/>
        }
    }

    return(
        <div>
            <Grid container className={classes.root} direction="column">

                <Box mt={-2.5} height="100%" width="100%">
                     <Grid className={classes.header} alignItems="center" container>
                         <Header itms={cartItems} router={changeFocus} navHighLight={setColor}/>
                    </Grid>
                </Box>

                <Box mt={-2.8} height="100%" width="100%">
                    <Grid item xs={12} container>
                        <Grid item  xs={2} md={1} >
                            <Navbar fo={focus[0]} checklog={logged[0]} router={changeFocus} navHighLight={setColor} currentHighLight={navcolor}/>
                        </Grid>

                        <Grid container item xs={10} md={11}>
                            {choose()}
                        </Grid>
                    </Grid>
                </Box>
                
                <Box mt={-4}>
                    <Grid container style={{marginTop:"2.5%",backgroundColor: '#C3EAFA',height:"200px"}} item xs={12}>
                        <Footer  navHighLight={setColor} router={changeFocus}/>
                    </Grid>
                </Box>

            </Grid>
        </div>
    )
}

function Footer({router,navHighLight}){
    return(
        <>
        <Grid item xs={3}>
            <h1 style={{marginTop:"2%",marginLeft:"15%",color:"#355093"}}>StoreX</h1>
            <div style={{marginLeft:"15%",lineHeight:"0",color:"#355093"}}>
                <h5>Address:</h5>
                <h5>DHA Phase 5, Khayaban-e-Jinnah Road،</h5>
                <h5>Opposite Sector U Lahore, Punjab 54792</h5>
                <h5>Contact Number: 090078601</h5>
                <h5>Email: info@storeX.pk</h5>
                <h5>Copyright © StoreX 2021</h5>
            </div>
        </Grid>
        <Grid item xs={3}>
        <h4 style={{marginLeft:"15%",color:"#355093"}}>Help and Information</h4>
            <div style={{marginLeft:"15%",lineHeight:"0.1",color:"#355093"}}>
                <h5>About us</h5>
                <h5>Terms and conditions</h5>
            </div>
        </Grid>
        <Grid item xs={3}>
        <h4 style={{marginLeft:"25%",color:"#355093"}}>Quick Links</h4>
            <div style={{marginLeft:"25%",lineHeight:"0.1",color:"#355093"}}>
                <h5 onClick={()=>{router(["homescreen","null"]);navHighLight("null")}} style={{cursor:"pointer"}}>Home</h5>
                <h5 onClick={()=>{router(["cart","null"]);navHighLight("null")}} style={{cursor:"pointer"}}>Cart</h5>
            </div>
        </Grid>
        <Grid item xs={3}>
        <h4 style={{marginLeft:"5%",color:"#355093"}}>Follow us on</h4>
            <div style={{marginLeft:"5%",lineHeight:"0.1",color:"#355093"}}>
                <h5>Facebook</h5>
                <h5>Instagram</h5>
            </div>
        </Grid>
        </>
    )
}

function Header({router,itms,navHighLight}){
    const classes = useStyles();
    const [inval,setval] = React.useState('')
    const route = (label)=>{
        router([label,"null"]);
        navHighLight("null");
    } 
    return(
    <>
        <Grid item xs={4}>
            <h1 onClick={()=>route("homescreen")} style={{cursor:"pointer",color:"#355093",display:"inline-block",transform:"translateY(10px)",marginLeft:"8px"}}>StoreX</h1>
        </Grid>

        <Grid item xs={4}>
            <div style={{textAlign:"center",transform:"translateY(10px)"}}>
                <input onChange={event=>{setval(event.target.value)}} value={inval} style={{display:"inline-block",border:"1px solid black",borderRadius:"5px",height:"30px",width:"70%",transform:"translateY(-4px)",backgroundColor:"#C1C8E4"}} placeholder=" Search for a product"></input>
                <SearchIcon onClick={()=>{if(inval!=""){router(["search",inval])}; navHighLight("null");setval('')}} fontSize="large" style={{transform:"rotate(10deg) translateY(8px)",marginLeft:"5px",color:"#355093",cursor:"pointer"}}/>
            </div>
        </Grid>

        <Grid item xs={4}>
            <div style={{textAlign:"end",transform:"translateY(10px)"}}>
                <h3 onClick={()=>route("homescreen")} style={{display:"inline-block",color:"#355093",transform:"translateY(-5px)",cursor:"pointer"}}>Home</h3>
                <h3 onClick={()=>router(["category","sale"])} style={{display:"inline-block",marginLeft:"5%",color:"#EE1313",fontStyle:"italic",transform:"translateY(-5px)",cursor:"pointer"}}>Sale</h3>
                <Cart onClick={()=>route("cart")} fontSize="large" style={{transform:"translateY(8px)",marginLeft:"5%",marginRight:"5%",cursor:"pointer"}}/>
                <div style={{backgroundColor:"#355093",top:"5%",left:"93%",position:"absolute",color:"white",height:"22%",width:"18px", borderRadius:"8px",textAlign:"center"}}>
                    <h6 style={{marginTop:"-7%"}}>{itms.length}</h6>
                </div>
                
            </div>
        </Grid>
    </>
    )
}

function Navbar({router,navHighLight,currentHighLight,checklog,fo}){
    
    const classes = useStyles();
    const [categories, setCategories] = React.useState(undefined);
    
    React.useEffect(()=>{
        let db = fireApp.database();
        db.ref("Categories").once('value').then((snap)=>{
        let obj = snap.val();
        // console.log(obj);
        let data = Object.keys(obj).map((key)=>obj[key]) 
        // console.log(data);
        setCategories(data[0])
     })
    },[])
    
    
    const handleClick = (event)=>{
        if(event.target.innerText == "Login"){
            router(["login"]);
        }
        else if(event.target.innerText == "Settings"){
            router(["settings"]);
        }else if(event.target.innerText == "My Orders"){
            router(["My Orders"])
        }
        else{
            router(["category",event.target.innerText]);
        }
        navHighLight(event.target.innerText);
    }

    return(
    <div className={classes.navbar} style={{height: (fo=="homescreen" ? "900px": "650px")}} >
        <div>
            <h4>Accounts</h4>
            {!checklog && <h5 onClick={handleClick} style={{paddingLeft:"8px",marginTop:"-10px",cursor:"pointer",color: (currentHighLight=="Login" ? "orange" :"white")}}>Login</h5>}
            {checklog && <h5 style={{color:"#28ff03",paddingLeft:"8px"}}><Circle style={{fontSize:"15px",transform:"translateY(2px) translateX(-3px)"}}/>Signed In</h5>}
            {checklog && <h5 onClick={handleClick} style={{paddingLeft:"8px",cursor:"pointer",color: (currentHighLight=="Settings" ? "orange" :"white")}}>Settings</h5>}
            {checklog && <h5 onClick={handleClick} style={{paddingLeft:"8px",cursor:"pointer",color: (currentHighLight=="My Orders" ? "orange" :"white")}}>My Orders</h5>}
            {checklog && <h5 onClick={()=>{sessionStorage.removeItem("userid"); window.location.reload()}} style={{paddingLeft:"8px",cursor:"pointer"}}>Log Out</h5>}
        </div>
        
        <div>
            <h4>Categories</h4>
            {categories ? categories.map((val,index)=>(<h5 onClick={handleClick} style={{cursor:"pointer", paddingLeft:"8px",color: (currentHighLight==val ? "orange" :"white")}} key={index}>{val}</h5>)) : <h5></h5>}
        </div>
        
        {/* <div>
            <h4>Contact Us</h4>
            <h5 style={{paddingLeft:"8px",cursor:"not-allowed"}}>Complaints</h5>
        </div> */}
    </div>
    )
}
export default Homepage;