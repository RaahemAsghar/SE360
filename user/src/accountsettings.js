import React from 'react'
import { Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js'

function Settings({router,id,set}){
    const [obj,setobj] = React.useState({
        name:"",
        address:"",
        contact:"",
        email:"",
        city:"",
        password:"",
        news_letter: false
    })
    let template = { name:"",
    address:"",
    contact:"",
    email:"",
    city:"",
    password:"",
    news_letter: false}

    const [msg,setmsg] = React.useState("")
    let db = fireApp.database()
    const handlechange = ()=>{
        db.ref("user").once('value').then(snap=>{
            let data = snap.val();
            data = data[id]
            let check = true;
            let temp = {...obj,news_letter:"false",email:data.email}
            temp = Object.keys(temp).map(key=>temp[key])
            for(let x of temp){
                if(x.length==0){
                    check = false
                }
            }
            if(check){
                db.ref("user").child(id).set({...obj,email:data.email})
                setobj({...template})
                setmsg("Changes have been made successfully")
                setTimeout(()=>setmsg(""),1000)
            }
            else{
                setmsg("Please fill out all fields")
                setTimeout(()=>setmsg(""),1000)
            }
        })
    }

    const handledelete = () => {
        db.ref("user/"+id).remove()
        sessionStorage.removeItem("userid")
        set([false,"null"])
        router(["homescreen","null"])
    }

    return(
        <Grid container item xs={12}>

        <Grid item xs={12}>
           <h2 style={{color:"#355093",marginTop:"3%",marginLeft:"5%"}}>Account Settings</h2>     
        </Grid>
        
        <Grid item style={{marginTop:"-20%",marginLeft:"5%"}} xs={5}>
            <h4>{msg}</h4>
            <h4 style={{color:"#355093"}}>Name</h4>
            <input value={obj.name} onChange={(event)=>setobj({...obj,name:event.target.value})} style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black"}} type="text"></input>
            <h4 style={{color:"#355093"}}>Address</h4>
            <input value={obj.address} onChange={(event)=>setobj({...obj,address:event.target.value})} style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black"}} type="text"></input>
            <h4 style={{color:"#355093"}}>Password</h4>
            <input value={obj.password} onChange={(event)=>setobj({...obj,password:event.target.value})} style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black"}} type="password"></input><br></br>
            <button onClick={handlechange} style={{transform:"translateY(30px)",border:"none",backgroundColor:"#84CEEB",cursor:"pointer",width:"80px",height:"25px",borderRadius:"10px"}}><strong>Update</strong></button>
        </Grid>

        <Grid item style={{marginTop:"-20%"}} xs={5}>
            <h4 style={{color:"#355093"}}>Contact Number</h4>
            <input value={obj.contact} onChange={(event)=>setobj({...obj,contact:event.target.value})} style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black"}} type="text"></input>
            <h4 style={{color:"#355093"}}>City</h4>
            <input value={obj.city} onChange={(event)=>setobj({...obj,city:event.target.value})} style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black"}} type="text"></input>
        </Grid>

        <div style={{position:"absolute",top:"75%",left:"12.8%"}}>
            <h2 style={{color:"#355093"}}>Delete Account</h2>
            <h4 style={{color:"#355093"}}>By deleting your account, you are asking us to remove all records of your
            information from our database. That means that you will no longer be able
            to receive any discount offers from us or purchase any items online from our
            website till you make a new account again</h4>
            <button onClick={handledelete} style={{border:"none",backgroundColor:"#84CEEB",cursor:"pointer",width:"130px",height:"25px",borderRadius:"10px"}}><strong>Delete Account</strong></button>
        </div>
    </Grid>
    )
}

export default Settings;