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
        let adminDetails = details[8]; let correct = false;
        let adminEmails = Object.keys(adminDetails);
            for(let i = 0; i< adminEmails.length; i++){
                if(adminEmails[i]===details[0] && adminDetails[adminEmails[i]][1]==details[2]){
                    correct = true;  break;
                }
            }
        if(correct){
            let name = adminDetails[details[0]][0];
            // let myList = [details[0],details[2],name];
            let myList = details[0] + " " + details[2] + " " + name;
            // console.log(myList);
            sessionStorage.setItem("userid",myList);
        }
        details[7](true);
    }
    return(
        <Grid container item xs={12}>
            <Grid item xs={12}>
                <div style={{background: '#355093', width: "100%", height:"80px", position:"absolute"}}>
                    <h1 style={{cursor:"pointer",color:"#FFFFFF",display:"inline-block",transform:"translateY(20px)",marginLeft:"8px",fontSize: "2.0em",textAlign:"Center"}}>StoreX</h1>
                </div>
                <div>
                    <img src="https://preview.colorlib.com/theme/bootstrap/login-form-07/images/undraw_remotely_2j6y.svg" style={{verticalAlign:"left",marginTop:"7%",width:"60%",height:"620px"}}/>
                </div>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid style={{marginLeft:"65%", marginTop:"-39%",marginBottom:"5%",textAlign:"center"}} item xs={5}>
                <form onSubmit = {buttonClick} style={{transform:"translateY(10px)"}}>
                    <h1 style={{color:"#000000", fontFamily:"Sans-Serif", fontSize:"36px", lineHeight:"66px",alignItems:"flex-start", display:"flex"}}>Sign in - Admin</h1>
                    <h2 style={{color:"#C8BABA",  fontFamily:"Sans-Serif", fontSize:"20px", lineHeight:"33px", textAlign:"left", transform:"translateY(10px)"}}>Welcome back!</h2>
                    <h2 style={{color:"#C8BABA", fontFamily:"Sans-Serif", fontSize:"20px", lineHeight:"33px", textAlign:"left"}}>Enter the details to login</h2>
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