import React from 'react';
import { Grid } from '@material-ui/core';

function Login({details}){
    const emailClick = (event) => {
        if(!details[6]){details[1](event.target.value)}
    }
    const passClick = (event) => {
        if(!details[6]){details[3](event.target.value)}
    }
    const buttonClick = (event) => {
        event.preventDefault();
        details[7](true);
    }
    return(
        <Grid container item xs={12}>
            <Grid item xs={12}>
                <div>
                    <img src="https://preview.colorlib.com/theme/bootstrap/login-form-07/images/undraw_remotely_2j6y.svg" style={{verticalAlign:"left",marginTop:"5%",width:"60%",height:"780px"}}/>
                </div>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid style={{marginLeft:"70%", marginTop:"-40%",marginBottom:"5%",textAlign:"center"}} item xs={5}>
                <form onSubmit = {buttonClick} style={{transform:"translateY(10px)"}}>
                    <h1 style={{color:"#000000", fontFamily:"Sans-Serif", fontSize:"48px", lineHeight:"66px",alignItems:"flex-start", display:"flex"}}>Sign in - Admin</h1>
                    <h2 style={{color:"#C8BABA",  fontFamily:"Sans-Serif", fontSize:"24px", lineHeight:"33px", textAlign:"left", transform:"translateY(10px)"}}>Welcome back!</h2>
                    <h2 style={{color:"#C8BABA", fontFamily:"Sans-Serif", fontSize:"24px", lineHeight:"33px", textAlign:"left"}}>Enter the details to login</h2>
                    <div>
                        <label for="name" style={{color:"#000000", fontSize:"16px", lineHeight:"33px", textAlign:"left", transform:"translateY(20px)", alignItems:"flex-start", display:"flex"}}>Email Address*</label>
                        <input value = {details[0]} onChange = {emailClick} style={{width:"428px",borderRadius:"30px",height:"48px", border:"0.5px solid black", transform:"translateY(15px)", backgroundColor:"#C1C8E4", alignItems:"flex-start", display:"flex"}} type="text" placeholder="  1234@gmail.com"></input><br></br>
                    </div>
                    <div>
                        <label for="name" style={{color:"#000000", fontSize:"16px", lineHeight:"33px", textAlign:"left", transform:"translateY(20px)", alignItems:"flex-start", display:"flex"}}>Password*</label>
                        <input type = "password" value = {details[2]} onChange = {passClick} style={{width:"428px",borderRadius:"30px",height:"48px",border:"0.5px solid black", transform:"translateY(15px)",backgroundColor:"#C1C8E4", alignItems:"flex-start", display:"flex"}} placeholder="  *************"></input><br></br>

                    </div>
                    <div>
                        <p style={{color:"#000000", fontSize:"14px", fontFamily:"Sans-Serif", lineHeight:"16px", textAlign:"left", transform:"translateY(20px)", alignItems:"flex-start", display:"flex"}}>Note: Fields marked with * are necessary, cannot be left empty.</p>
                    </div>
                    <button onClick = {buttonClick} style={{transform:"translateX(-35px) translateY(30px)",border:"none",backgroundColor:"#5AB9EA",cursor:"pointer",width:"120px",height:"40px",borderRadius:"20px", textAlign:"center"}}><strong>Login</strong></button>
                </form>
            </Grid>
            

        </Grid>
    )
}

export default Login;