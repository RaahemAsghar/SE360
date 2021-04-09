import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AddProducts from './AddProducts.js';
import {fireApp} from './fireapp.js';
import AddCategory from './AddCategory.js';
import Popup from './Popup.js';

// ---------------------------------------- ICONS -------------------------------------------------------
import { Icon, InlineIcon } from '@iconify/react';
import bxsDashboard from '@iconify/icons-bx/bxs-dashboard';
import outlineInventory2 from '@iconify/icons-ic/outline-inventory-2';
import updateIcon from '@iconify/icons-dashicons/update';
import addAlt from '@iconify/icons-carbon/add-alt';
import discount2 from '@iconify/icons-tabler/discount-2';
import categoryIcon from '@iconify/icons-carbon/category';
import trashIcon from '@iconify/icons-bi/trash';
import orderBoolDescendingVariant from '@iconify/icons-mdi/order-bool-descending-variant';
import emailNewsletter from '@iconify/icons-mdi/email-newsletter';
import analyticsIcon from '@iconify/icons-carbon/analytics';
import googleAnalytics from '@iconify/icons-mdi/google-analytics';
import dialogIcon from '@iconify/icons-il/dialog';
import sparklesIcon from '@iconify/icons-emojione-monotone/sparkles';
// ----------------------------------------------------------------------------------------------------------

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
            return <AddProducts router = {setPage}/>
        } else if (page[0] === "Add Category") {
            return <AddCategory/>
        } else if (page[0] === "Suggestions") {
            return <Popup router = {setPage}/>
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
    let menu=[{
        text:'Dashboard',
        icon:bxsDashboard
    },
    {
        text:'View Inventory',
        icon:outlineInventory2
    },
    {
        text:'Stock Update',
        icon:updateIcon
    },
    {
        text:'Add Products',
        icon:addAlt
    },
    {
        text:'Discounts',
        icon:discount2
    },
    {
        text:'Add Category',
        icon:categoryIcon
    },
    {
        text:'Delete Products',
        icon:trashIcon
    },
    {
        text:'Orders',
        icon:orderBoolDescendingVariant
    },
    {
        text:'Newsletter',
        icon: emailNewsletter
    },
    {
        text:'Sales Analytics',
        icon:analyticsIcon
    },
    {
        text:'Website Analytics',
        icon:googleAnalytics
    },
    {
        text:'Complaints',
        icon:dialogIcon
    },
    {
        text:'Suggestions',
        icon:sparklesIcon
    },
    ]

    //menu.map( item=> console.log(item))

   
    //let options = ["Dashboard","View Inventory","Stock Update","Add Products","Discounts","Add Category","Delete Products","Orders","Newsletter","Sales Analytics","Website Analytics","Complaints","Suggestions"]
    //let icons =[bxsDashboard, outlineInventory2, updateIcon, addAlt, discount2, categoryIcon, trashIcon, orderBoolDescendingVariant, emailNewsletter, analyticsIcon, googleAnalytics, dialogIcon, sparklesIcon]
    const handleClick = (event) => {
        router([event.target.innerText]);
        changeTextColor(event.target.innerText);
    }
    return (
        <div className={classes.navbar} style={{height:"650px", width: "170px"}} >
            <div>
                <p style = {{fontFamily: "Arial",fontSize:"1.0em",fontWeight: "Bold",paddingLeft:"20px",marginBottom:"24px"}}>Admin Panel</p>
                {menu.map( item => <Box display='flex'> <div><Icon icon={item.icon} style={{color: (textColor==item.text ? "orange" :"#C1C8E4"), fontSize: '20px', flexDirection:"row", marginBottom: "18px"}}/> </div> <div><p onClick = {handleClick} className = {classes.text} style={{fontSize: "0.9em", cursor:"pointer", paddingLeft:"13px",marginBottom: "18px", flexDirection:"row", color: (textColor==item.text ? "orange" :"white")}}>{item.text}</p></div></Box>)}
                {/* {icons ? icons.map((val,index)=>(<div><Icon icon={val} style={{color: '#C1C8E4', fontSize: '20px', flexDirection:"row", marginBottom: "18px"}} /></div>)) : <h5></h5>}
                {options ? options.map((val,index)=>(<p onClick = {handleClick} className = {classes.text} style={{fontSize: "0.9em", cursor:"pointer", paddingLeft:"28px",marginBottom: "18px", flexDirection:"row",transform:"translateX(0px)", color: (textColor==val ? "orange" :"white")}} key={index}>{val}</p>)) : <h5></h5>} */}
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

 
  export default Home;