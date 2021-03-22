import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import { Icon } from '@material-ui/core';
import Heart from '@material-ui/icons/FavoriteBorder';
import Cart from '@material-ui/icons/ShoppingCartOutlined';

const useStyles = makeStyles((theme) => ({
    footer:{
        backgroundColor: '#C3EAFA',
        textAlign: "center",
    },
    navbar:{
        backgroundColor: "#355093",
        color: "white",
        paddingLeft: "10px",
    },
    content:{
        
    },
    header:{
        borderBottom: "10px solid #355093",
    },
  }));

function Homepage() {
    const classes = useStyles(); 
    const [categories, setCategories] = React.useState(["Groceries","Electronics","Sports","Toys","Men","Women","Furniture"]);
    return(
        <div>
            <Grid container className={classes.root} direction="column">

                <Box mt={-2.5} height="100%" width="100%">
                     <Grid className={classes.header} alignItems="center" container>

                        <Grid item xs={4}>
                            <h1 style={{cursor:"pointer",color:"#355093",display:"inline-block",transform:"translateY(10px)",marginLeft:"8px"}}>StoreX</h1>
                        </Grid>

                        <Grid item xs={4}>
                            <div style={{textAlign:"center",transform:"translateY(10px)"}}>
                                <input style={{display:"inline-block",border:"1px solid black",borderRadius:"5px",height:"30px",width:"70%",transform:"translateY(-4px)",backgroundColor:"#C1C8E4"}} placeholder=" Search for a product"></input>
                                <SearchIcon fontSize="large" style={{transform:"rotate(10deg) translateY(8px)",marginLeft:"5px",color:"#355093",cursor:"pointer"}}/>
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <div style={{textAlign:"end",transform:"translateY(10px)"}}>
                                <h3 style={{display:"inline-block",color:"#355093",transform:"translateY(-5px)",cursor:"pointer"}}>Home</h3>
                                <h3 style={{display:"inline-block",marginLeft:"5%",color:"#EE1313",fontStyle:"italic",transform:"translateY(-5px)",cursor:"pointer"}}>Sale</h3>
                                <Heart fontSize="large" style={{transform:"translateY(8px)",marginLeft:"5%",cursor:"pointer"}}/>  
                                <Cart fontSize="large" style={{transform:"translateY(8px)",marginLeft:"5%",marginRight:"5%",cursor:"pointer"}}/>
                            </div>
                        </Grid>

                    </Grid>
                </Box>

                <Box mt={-2.8} height="100%" width="100%">
                    <Grid item xs={12} container>
                        <Grid item xs={2} md={1} >
                            <div className={classes.navbar} style={{height:"515px"}} >
                                <div>
                                    <h4>Accounts</h4>
                                    <h5 style={{paddingLeft:"8px",marginTop:"-10px",cursor:"pointer"}}>Login</h5>
                                    <h5 style={{paddingLeft:"8px",marginTop:"-10px",cursor:"pointer"}}>Sign up</h5>
                                </div>
                                
                                <div>
                                    <h4>Categories</h4>
                                    {categories.map((val,index)=>(<h5 style={{cursor:"pointer",paddingLeft:"8px",marginTop:"-10px"}} key={index}>{val}</h5>))}
                                </div>
                                
                                <div>
                                    <h4>Contact Us</h4>
                                    <h5 style={{paddingLeft:"8px",marginTop:"-10px",cursor:"pointer"}}>Complaints</h5>
                                    <h5 style={{paddingLeft:"8px",cursor:"pointer",marginTop:"-10px"}}>Suggestions</h5>
                                </div>
                            </div>
                        </Grid>
                        <Grid container item xs={10} md={11}>

                            <Grid item xs={12}>
                                <div style={{marginLeft:"5%",marginTop:"3%"}}>
                                    <h4>Slideshow</h4>
                                </div>
                            </Grid>

                            <Grid item xs={12}>
                                <div style={{marginLeft:"5%",marginTop:"3%"}}>
                                    <h4>Top Selling Sroducts</h4>
                                </div>
                            </Grid>

                            <Grid item xs={12}>
                                <div style={{marginLeft:"5%",marginTop:"3%"}}>
                                    <h4>Products On Sale</h4>
                                </div>
                            </Grid>

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


export default Homepage;