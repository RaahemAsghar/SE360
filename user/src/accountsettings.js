import React from 'react'
import { Grid } from '@material-ui/core';

function Settings(){
    return(
        <Grid container item xs={12}>

        <Grid item xs={12}>
           <h2 style={{color:"#355093",marginTop:"3%",marginLeft:"5%"}}>Account Settings</h2>     
        </Grid>
        
        <Grid item style={{marginTop:"-20%",marginLeft:"5%"}} xs={5}>
            <h4 style={{color:"#355093"}}>Name</h4>
            <input style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black"}} type="text" placeholder="  Elon Musk"></input>
            <h4 style={{color:"#355093"}}>Address</h4>
            <input style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black"}} type="text" placeholder="  123 Example Street"></input>
            <h4 style={{color:"#355093"}}>Password</h4>
            <input style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black"}} type="text"></input><br></br>
            <button style={{transform:"translateY(30px)",border:"none",backgroundColor:"#84CEEB",cursor:"not-allowed",width:"80px",height:"25px",borderRadius:"10px"}}><strong>Update</strong></button>
        </Grid>

        <Grid item style={{marginTop:"-20%"}} xs={5}>
            <h4 style={{color:"#355093"}}>Contact Number</h4>
            <input style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black"}} type="text" placeholder="  090078601"></input>
            <h4 style={{color:"#355093"}}>City</h4>
            <input style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black"}} type="text" placeholder="  Lahore"></input>
        </Grid>

        <div style={{position:"absolute",top:"75%",left:"12.8%"}}>
            <h2 style={{color:"#355093"}}>Delete Account</h2>
            <h4 style={{color:"#355093"}}>By deleting your account, you are asking us to remove all records of your
            information from our database. That means that you will no longer be able
            to receive any discount offers from us or purchase any items online from our
            website till you make a new account again</h4>
            <button style={{border:"none",backgroundColor:"#84CEEB",cursor:"not-allowed",width:"130px",height:"25px",borderRadius:"10px"}}><strong>Delete Account</strong></button>
        </div>
    </Grid>
    )
}

export default Settings;