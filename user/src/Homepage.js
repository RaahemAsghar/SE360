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
import {fireApp} from './fireapp.js'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    footer:{
        backgroundColor: '#C3EAFA',
        textAlign: "center",
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

    const changeFocus = (newFocus) => {
        Setfocus(newFocus);
    }

    const changeLog = (arg) => {
        setLog(arg)
    }

    const addItems = (id) => {
        setItems([...cartItems,id])
    }
    const removeItems = (id) =>{
        if(cartItems.length==1){
            setItems([])
        }else
        {
            let temp = [...cartItems];
            let indx = temp.indexOf(id)
            temp.splice(indx,1)
            setItems(temp)
        }
    }
    const choose = () => {
        if(focus[0] === "homescreen"){
            return <Content addToCart={addItems} router={changeFocus}/>
        }
        else if(focus[0] === "category"){
            return <DisplayCategory addToCart={addItems} label={focus[1]} router={changeFocus} navHighLight={setColor}/>
        }
        else if(focus[0] === "cart"){
            return <ShoppingCart router={changeFocus} removeFromCart={removeItems} addToCart={addItems} items={cartItems} navHighLight={setColor}/>
        }
        else if(focus[0] === "productpage"){
            return <ProductPage addToCart={addItems} id={focus[1]}/>
        }
        else if(focus[0] === "login"){
            return <Login router={changeFocus} set={changeLog}/>
        }
        else if(focus[0] === "settings"){
            return <Settings set={changeLog}/>
        }
    }

    return(
        <div>
            <Grid container className={classes.root} direction="column">

                <Box mt={-2.5} height="100%" width="100%">
                     <Grid className={classes.header} alignItems="center" container>
                         <Header router={changeFocus} navHighLight={setColor}/>
                    </Grid>
                </Box>

                <Box mt={-2.8} height="100%" width="100%">
                    <Grid item xs={12} container>
                        <Grid item xs={2} md={1} >
                            <Navbar checklog={logged[0]} router={changeFocus} navHighLight={setColor} currentHighLight={navcolor}/>
                        </Grid>

                        <Grid container item xs={10} md={11}>
                            {choose()}
                        </Grid>
                    </Grid>
                </Box>
                
                <Box mt={-4}>
                    <Grid item xs={12}>
                        <div className={classes.footer} style={{height:"200px"}}>
                            <h1>FOOTER</h1>
                        </div>
                    </Grid>
                </Box>

            </Grid>
        </div>
    )
}

function Header({router,navHighLight}){
    const classes = useStyles();
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
                <input style={{display:"inline-block",border:"1px solid black",borderRadius:"5px",height:"30px",width:"70%",transform:"translateY(-4px)",backgroundColor:"#C1C8E4"}} placeholder=" Search for a product"></input>
                <SearchIcon fontSize="large" style={{transform:"rotate(10deg) translateY(8px)",marginLeft:"5px",color:"#355093",cursor:"pointer"}}/>
            </div>
        </Grid>

        <Grid item xs={4}>
            <div style={{textAlign:"end",transform:"translateY(10px)"}}>
                <h3 onClick={()=>route("homescreen")} style={{display:"inline-block",color:"#355093",transform:"translateY(-5px)",cursor:"pointer"}}>Home</h3>
                <h3 style={{display:"inline-block",marginLeft:"5%",color:"#EE1313",fontStyle:"italic",transform:"translateY(-5px)",cursor:"pointer"}}>Sale</h3>
                <Heart fontSize="large" style={{transform:"translateY(8px)",marginLeft:"5%",cursor:"pointer"}}/>  
                <Cart onClick={()=>route("cart")} fontSize="large" style={{transform:"translateY(8px)",marginLeft:"5%",marginRight:"5%",cursor:"pointer"}}/>
            </div>
        </Grid>
    </>
    )
}

function Navbar({router,navHighLight,currentHighLight,checklog}){
    
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
        }
        else{
            router(["category",event.target.innerText]);
        }
        navHighLight(event.target.innerText);
    }

    return(
    <div className={classes.navbar} style={{height:"600px"}} >
        <div>
            <h4>Accounts</h4>
            {!checklog && <h5 onClick={handleClick} style={{paddingLeft:"8px",marginTop:"-10px",cursor:"pointer",color: (currentHighLight=="Login" ? "orange" :"white")}}>Login</h5>}
            {checklog && <h5 onClick={handleClick} style={{color:"#28ff03",paddingLeft:"8px",marginTop:"-10px"}}><Circle style={{fontSize:"15px",transform:"translateY(2px) translateX(-3px)"}}/>Signed In</h5>}
            {checklog && <h5 onClick={handleClick} style={{paddingLeft:"8px",marginTop:"-10px",cursor:"pointer",color: (currentHighLight=="Settings" ? "orange" :"white")}}>Settings</h5>}
        </div>
        
        <div>
            <h4>Categories</h4>
            {categories ? categories.map((val,index)=>(<h5 onClick={handleClick} style={{cursor:"pointer", paddingLeft:"8px",marginTop:"-10px",color: (currentHighLight==val ? "orange" :"white")}} key={index}>{val}</h5>)) : <h5></h5>}
        </div>
        
        <div>
            <h4>Contact Us</h4>
            <h5 style={{paddingLeft:"8px",marginTop:"-10px",cursor:"pointer"}}>Complaints</h5>
            <h5 style={{paddingLeft:"8px",cursor:"pointer",marginTop:"-10px"}}>Suggestions</h5>
        </div>
    </div>
    )
}
export default Homepage;