import React from 'react';
import { Grid } from '@material-ui/core';

function Login(){
    return(
        <Grid container item xs={12}>
            <Grid item xs={12}>
                <div>
                    <img src="https://preview.colorlib.com/theme/bootstrap/login-form-07/images/undraw_remotely_2j6y.svg" style={{verticalAlign:"left",marginTop:"-0%",width:"60%",}}/>
                </div>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid style={{marginLeft:"70%", marginTop:"-45%",marginBottom:"5%",textAlign:"center"}} item xs={5}>
                <form style={{transform:"translateY(10px)"}}>
                    <h1 style={{color:"#000000", fontFamily:"Manrope", fontSize:"48px", lineHeight:"66px",alignItems:"flex-start", display:"flex"}}>Sign in - Admin</h1>
                    <h2 style={{color:"#C8BABA",  fontFamily:"Manrope", fontSize:"24px", lineHeight:"33px", textAlign:"left", transform:"translateY(10px)"}}>Welcome back!</h2>
                    <h2 style={{color:"#C8BABA", fontFamily:"Manrope", fontSize:"24px", lineHeight:"33px", textAlign:"left"}}>Enter the details to login</h2>
                    <div>
                        <label for="name" style={{color:"#000000", fontSize:"16px", lineHeight:"33px", textAlign:"left", transform:"translateY(20px)", alignItems:"flex-start", display:"flex"}}>Email Address</label>
                        <input style={{width:"428px",borderRadius:"30px",height:"48px", border:"0.5px solid black", transform:"translateY(15px)", backgroundColor:"#C1C8E4", alignItems:"flex-start", display:"flex"}} type="text" placeholder="  1234@gmail.com"></input><br></br>
                    </div>
                    <div>
                        <label for="name" style={{color:"#000000", fontSize:"16px", lineHeight:"33px", textAlign:"left", transform:"translateY(20px)", alignItems:"flex-start", display:"flex"}}>Password</label>
                        <input style={{width:"428px",borderRadius:"30px",height:"48px",border:"0.5px solid black", transform:"translateY(15px)",backgroundColor:"#C1C8E4", alignItems:"flex-start", display:"flex"}} type="text" placeholder="  ***********"></input><br></br>

                    </div>
                    <div>
                        <p style={{color:"#000000", fontSize:"14px", fontFamily:"Roboto", lineHeight:"16px", textAlign:"left", transform:"translateY(20px)", alignItems:"flex-start", display:"flex"}}>Note: Fields marked with * are necessary, cannot be left empty.</p>
                    </div>
                    <button style={{transform:"translateX(-35px) translateY(30px)",border:"none",backgroundColor:"#5AB9EA",cursor:"pointer",width:"416px",height:"61px",borderRadius:"20px", textAlign:"center"}}><strong>Login</strong></button>
                </form>
            </Grid>
            

        </Grid>
    )
}

export default Login;