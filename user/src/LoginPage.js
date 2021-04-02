import React from 'react'
import { Grid } from '@material-ui/core';

function Login(){
    return(
        <Grid container item xs={12}>
            <Grid item xs={12}>
                <div style={{textAlign:"center",marginTop:"3%"}}>
                    <h2 style={{color:"#355093"}}>Welcome to StoreX</h2>
                    <h4 style={{color:"#355093"}}>Please log in to purchase an item. If you don’t have an account, please sign up</h4>
                </div>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid style={{marginLeft:"9%", marginTop:"-26%",borderRight:"1px solid #355093",marginBottom:"5%",textAlign:"center"}} item xs={5}>
                <form style={{transform:"translateY(50px)"}}>
                    <h4 style={{color:"#355093"}}>Login</h4>
                    <input style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black"}} type="text" placeholder="  Email"></input><br></br>
                    <input style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black",transform:"translateY(15px)"}} type="text" placeholder="  Password"></input><br></br>
                    <button style={{transform:"translateY(30px)",border:"none",backgroundColor:"#84CEEB",cursor:"pointer",width:"80px",height:"25px",borderRadius:"10px"}}><strong>Log in</strong></button>
                </form>
            </Grid>
            <Grid style={{marginTop:"-26%",textAlign:"center"}} item xs={5}>
                <form>
                    <h4 style={{color:"#355093"}}>Sign Up</h4>
                    <input style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black"}}type="text" placeholder="  Name"></input><br></br>
                    <input style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black",transform:"translateY(10px)"}} type="text" placeholder="  Contact Number"></input><br></br>
                    <input style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black",transform:"translateY(20px)"}} type="text" placeholder="  City"></input><br></br>
                    <input style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black",transform:"translateY(30px)"}} type="text" placeholder="  Address"></input><br></br>
                    <input style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black",transform:"translateY(40px)"}} type="text" placeholder="  Email"></input><br></br>
                    <input style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black",transform:"translateY(50px)"}} type="text" placeholder="  Password"></input><br></br>
                    <input style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black",transform:"translateY(60px)"}}type="text" placeholder="  Confirm Password"></input><br></br>
                    <button style={{marginTop:"4%",transform:"translateY(60px)",border:"none",backgroundColor:"#84CEEB",cursor:"pointer",width:"80px",height:"25px",borderRadius:"10px"}}><strong>Sign Up</strong></button>
                </form>
            </Grid>

        </Grid>
    )
}

export default Login;