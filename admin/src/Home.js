import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {fireApp} from './fireapp.js';

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
        // borderBottom: "10px solid #355093",
        backgroundColor: "#355093",
        // backgroundSize: "cover",
        color: "white",
        height: "100px",
    },
    text: {
        fontFamily: "Sans-Serif",
        fontWeight: "Bold",
        fontSize: "0.8em",
        cursor: "Pointer",

    },
  }));

  function Home () {
    const classes = useStyles(); 
    let [page, setPage] = React.useState(["Dashboard"]);

    const choose = () => {
        if(page[0]=="Add Products"){
            return <AddProducts/>
        }
        else{
            return <Display content={page[0]}/>
        }
    }
    return(
        <div>
            <Grid container className={classes.root} direction="column">

                <Box mt={-2.5} height="100%" width="100%">
                     <Grid className={classes.header} alignItems="center" container>
                         <Header/>
                    </Grid>
                </Box>

                {/* <Box mt={-2.8} height="100%" width="100%"> */}
                    <Grid item xs={12} container>
                        <Grid item xs={2}>
                            <Navbar router = {setPage}/>
                        </Grid>

                        <Grid container item xs={10.0}>
                            <Grid item xs = {0}>

                            </Grid>
                            <Grid item xs = {11}>
                                {choose()}
                            </Grid>
                            
                        </Grid>
                    </Grid>
                {/* </Box> */}
                
                {/* <Box mt={-4}>
                    <Grid item xs={12}>
                        <div className={classes.footer} style={{height:"200px"}}>
                            <h1>FOOTER</h1>
                        </div>
                    </Grid>
                </Box> */}

            </Grid>
        </div>
    )
  }

  function Header () {

    return(
        <Grid item xs={4}>
            <h1 style={{cursor:"pointer",color:"#FFFFFF",display:"inline-block",transform:"translateY(8px)",marginLeft:"8px",fontSize: "2.0em",textAlign:"Center"}}>StoreX</h1>
        </Grid>
    )
  }

  function Navbar ({router}) {
    let classes = useStyles();
    let [textColor, changeTextColor] = React.useState("Dashboard");
    // let [options,setOptions] = React.useState([]);
    let options = ["Dashboard","View Inventory","Stock Update","Add Products","Discounts","Add Category","Delete Products","Orders","Newsletter","Sales Analytics","Website Analytics","Complaints","Suggestions"]
    const handleClick = (event) => {
        router([event.target.innerText]);
        changeTextColor(event.target.innerText);
    }
    return (
        <div className={classes.navbar} style={{height:"650px", width: "160px"}} >
            <div>
                <p style = {{fontFamily: "Arial",fontSize:"1.0em",fontWeight: "Bold",paddingLeft:"3px",marginBottom:"24px"}}>Admin Panel</p>
                {options ? options.map((val,index)=>(<p onClick = {handleClick} className = {classes.text} style={{fontSize: "0.8em", cursor:"pointer", paddingLeft:"28px",marginBottom: "18px", color: (textColor==val ? "orange" :"white")}} key={index}>{val}</p>)) : <h5></h5>}
            </div>
        </div>
    )
  }

  function Display ({content}) {
    // content = JSON.stringify(content)
    let str = "This is the "+ content + " page";  
    return (
          <h1>{str}</h1>
      )
  }

  function AddProducts () {
    let [product, updateProduct] = React.useState(['','','','','','']);
    let [prodName, updateProdName] = React.useState('');
    let [category, updateCategory] = React.useState('');
    let [brand, updateBrand] = React.useState('');
    let [price, updatePrice] = React.useState('');
    let [url, updateUrl] = React.useState('');
    let [description, updateDescription] = React.useState('');
    let [myCategories, updateMyCategories] = React.useState(['Groceries','Electronics','Sports','Toys','Men','Women','Funiture'])
    // let [prods, updateProds] = React.useState({0:'',1:'',2:'',3:'',4:'',5:''});

    const nameClick = (event) => {
        updateProdName(event.target.value);
    }
    const brandClick = (event) => {
        updateBrand(event.target.value);
    }
    const categoryClick = (event) => {
        updateCategory(event.target.value);
    } 
    const priceClick = (event) => {
        updatePrice(event.target.value);
    } 
    const urlClick = (event) => {
        updateUrl(event.target.value);
    } 
    const descriptionClick = (event) => {
        updateDescription(event.target.value);
    }
    const submit = (event) => {
        event.preventDefault();
        let db = fireApp.database();
        let product = {
            name: prodName,
            brand_name: brand,
            category: category,
            price: price,
            stock_left: 100,
            total_sold: 0,
            discount: 0,
            rating: 0,
            url: url,
            description: description,
        }
        // console.log(product);
        db.ref("products").push(product);
        updateProdName(''); updateBrand(''); updateCategory(''); updatePrice(''); updateUrl(''); updateDescription('');
    }
    React.useEffect(()=>{
        let db = fireApp.database();
        db.ref("Categories").once('value').then((snap)=>{
        let obj = snap.val();
        let data = Object.keys(obj).map((key)=>obj[key]) 
        updateMyCategories(data[0])
     })
    },[])
    return (
        <div>
            <h3 style = {{marginTop: "25px", fontFamily: "Arial", fontWeight: "Bold", marginLeft: "90px"}}>Add Products</h3>
            <form onSubmit = {submit} style = {{marginLeft: "60px"}}>
            <Grid container xs = {12}>
            <Grid item xs = {5}>
                <div style = {{marginLeft: "30px"}}>
                <label for = "name" style = {{marginTop: "15px"}}>Product Name</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                <input type = "text" value = {prodName} id = "name" onChange = {nameClick} style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required></input>
                </div>
            </Grid>
            <Grid item xs = {1}></Grid>
            <Grid item xs = {5}>
                <label for = "name" style = {{marginTop: "15px"}}>Brand Name</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                <input type = "text" value = {brand} id = "name" onChange = {brandClick} style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required></input>
            </Grid>
            </Grid>

            <div style = {{marginTop:"30px"}}>
            <Grid container xs = {12}>
            <Grid item xs = {5}>
                <div style = {{marginLeft: "30px"}}>
                <label for = "name" style = {{marginTop: "15px"}}>Category Name</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                <select style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required>
                {myCategories ? myCategories.map((val,index)=>(<option key={index}>{val}</option>)) : <h5></h5>} 
                </select>
                {/* <input type = "text" value = {category} id = "name" onChange = {categoryClick} style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required></input> */}
                </div>
            </Grid>
            <Grid item xs = {1}></Grid>
            <Grid item xs = {5}>
                <label for = "name" style = {{marginTop: "15px"}}>Price</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                <input type = "text" value = {price} id = "name" onChange = {priceClick} style = {{width: "360px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required></input>
            </Grid>
            </Grid>
            </div>

            <div style = {{marginTop:"30px"}}>
            <Grid container xs = {12}>
            <Grid item xs = {11}>
                <div style = {{marginLeft: "30px"}}>
                <label for = "name" style = {{marginTop: "15px"}}>Image URL</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                <input type = "text" value = {url} id = "name" onChange = {urlClick} style = {{width: "820px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required></input>
                </div>
            </Grid>
            </Grid>
            </div>

            <div style = {{marginTop:"30px"}}>
            <Grid container xs = {12}>
            <Grid item xs = {11}>
                <div style = {{marginLeft: "30px"}}>
                <label for = "name" style = {{marginTop: "15px"}}>Description</label><p style = {{display: "inline", color:"red"}}>*</p><br/>
                <input type = "text" value = {description} id = "name" onChange = {descriptionClick} style = {{width: "820px", height:"100px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none"}} required></input>
                </div>
            </Grid>
            </Grid>
            </div>
            <div style = {{marginTop:"30px", marginLeft: "30px"}}>
            <input type = "submit"></input>
            </div>
            </form>
        </div>
      )
  }
  export default Home;