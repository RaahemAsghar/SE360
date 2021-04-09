import React from 'react'
import { Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js'

function Login({set,router}){
    const [msg,setMsg] = React.useState("")
    const [msg2,setMsg2] = React.useState("")
    let db = fireApp.database()
    let temp = {
        name: "",
        contact: "",
        city: "",
        address: "",
        email: "",
        password: "",
        news_letter: false
    }
    let login = {
        email:"",
        password:""
    }

    let repass = ""
    const handleSignIn = (event)=>{
        event.preventDefault()
        if(temp["password"] != repass){
            setMsg("Passwords did not match")
        }else{
    
            db.ref("user").once('value').then((snap)=>{
                let obj = snap.val();
                let data = Object.keys(obj).map(key=>obj[key])
                data = data.filter(ele=>ele.email==temp["email"])
                if(data.length == 0){
                    db.ref("user").push(temp)
                    setMsg("Account created!")
                }
                else{
                    setMsg("Account already exists")
                }
             })
        }
        event.target.reset()
    }
    const handleLogin = (event) => {
        event.preventDefault()
        db.ref("user").once('value').then((snap)=>{
            let obj = snap.val();
            let data = Object.keys(obj).map(key=>{
                obj[key].id = key
                return obj[key]
            })
            let newdata = data.filter(ele=>(ele.email==login.email && ele.password==login.password))
            if(newdata.length > 0){
                set([true,newdata[0].id])
                router(["homescreen","null"])
                
            }
            else{
                setMsg2("Incorrect email or password")
            }
         })
    }
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
                <form action="#" onSubmit={handleLogin} style={{transform:"translateY(50px)"}}>
                    <h5>{msg2}</h5>
                    <h4 style={{color:"#355093"}}>Login</h4>
                    <input onChange={event=>{login["email"] = event.target.value}} style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black"}} type="email" placeholder="  Email" required></input><br></br>
                    <input onChange={event=>{login["password"] = event.target.value}} style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black",transform:"translateY(15px)"}} type="password" placeholder="  Password" required></input><br></br>
                    <button style={{transform:"translateY(30px)",border:"none",backgroundColor:"#84CEEB",cursor:"pointer",width:"80px",height:"25px",borderRadius:"10px"}}><strong>Log in</strong></button>
                </form>
            </Grid>
            <Grid style={{marginTop:"-26%",textAlign:"center"}} item xs={5}>
                <form action="#" onSubmit={handleSignIn}>
                    <h5>{msg}</h5>
                    <h4 style={{color:"#355093"}}>Sign Up</h4>
                    <input onChange={event=>{temp["name"] = event.target.value}} style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black"}}type="text" placeholder="  Name" required ></input><br></br>
                    <input onChange={event=>{temp["contact"] = event.target.value}} style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black",transform:"translateY(10px)"}} type="text" placeholder="  Contact Number" required></input><br></br>
                    <input onChange={event=>{temp["city"] = event.target.value}} style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black",transform:"translateY(20px)"}} type="text" placeholder="  City" required></input><br></br>
                    <input onChange={event=>{temp["address"] = event.target.value}} style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black",transform:"translateY(30px)"}} type="text" placeholder="  Address" required></input><br></br>
                    <input onChange={event=>{temp["email"] = event.target.value}} style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black",transform:"translateY(40px)"}} type="email" placeholder="  Email" required></input><br></br>
                    <input onChange={event=>{temp["password"] = event.target.value}} style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black",transform:"translateY(50px)"}} type="password" placeholder="  Password" required></input><br></br>
                    <input onChange={event=>{repass = event.target.value}} style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black",transform:"translateY(60px)"}}type="password" placeholder="  Confirm Password" required></input><br></br>
                    <button type="submit" style={{marginTop:"4%",transform:"translateY(60px)",border:"none",backgroundColor:"#84CEEB",cursor:"pointer",width:"80px",height:"25px",borderRadius:"10px"}}><strong>Sign Up</strong></button>
                </form>
            </Grid>

        </Grid>
    )
}

export default Login;