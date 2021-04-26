import React from 'react'
import { Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


function Settings({router,id,set}){

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [open1, setOpen1] = React.useState(false);

    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };
    let db = fireApp.database()
    React.useEffect(()=>{
        db.ref("user").once('value').then(snap=>{
            let dta = snap.val()
            let userdata = dta[id]
            let q = {
                name: userdata.name,
                address: userdata.address,
                contact: userdata.contact,
                email: userdata.email,
                city: userdata.city,
                password:"",
                news_letter: false
            }
            setobj(q)
        })
    },[])

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
    const handlechange = ()=>{
        handleClose1()
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
        db.ref('pendingOrder').once('value').then(snap=>{
            let ans = snap.val()
            let keys = []
            Object.keys(ans).forEach(key=>{
                if(ans[key].user_id==id){
                    keys.push(key)
                }
            })
            for (let x of keys){
                db.ref("pendingOrder/"+x).remove()
            }
            db.ref("user/"+id).remove()
            sessionStorage.removeItem("userid")
            set([false,"null"])
            router(["homescreen","null"])
        })
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
            <button onClick={handleClickOpen1} style={{transform:"translateY(30px)",border:"none",backgroundColor:"#84CEEB",cursor:"pointer",width:"80px",height:"25px",borderRadius:"10px"}}><strong>Update</strong></button>
            <Dialog
                open={open1}
                onClose={handleClose1}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Update account?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you want to update your account?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handlechange} color="primary">
                    Yes
                </Button>
                <Button onClick={handleClose1} color="primary" autoFocus>
                    No
                </Button>
                </DialogActions>
            </Dialog>
        </Grid>

        <Grid item style={{marginTop:"-20%"}} xs={5}>
            <h4 style={{color:"#355093"}}>Contact Number</h4>
            <input value={obj.contact} onChange={(event)=>setobj({...obj,contact:event.target.value})} style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black"}} type="number"></input>
            <h4 style={{color:"#355093"}}>City</h4>
            <input value={obj.city} onChange={(event)=>setobj({...obj,city:event.target.value})} style={{width:"60%",borderRadius:"15px",height:"26px",border:"1px solid black"}} type="text"></input>
        </Grid>

        <div style={{position:"absolute",top:"520px",left:"12.8%"}}>
            <h2 style={{color:"#355093"}}>Delete Account</h2>
            <h4 style={{color:"#355093"}}>By deleting your account, you are asking us to remove all records of your
            information from our database. That means that you will no longer be able
            to receive any discount offers from us or purchase any items online from our
            website till you make a new account again</h4>
            <button onClick={handleClickOpen} style={{border:"none",backgroundColor:"#84CEEB",cursor:"pointer",width:"130px",height:"25px",borderRadius:"10px"}}><strong>Delete Account</strong></button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete account?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you really want to delete your account
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handledelete} color="primary">
                    Yes
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    No
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    </Grid>
    )
}

export default Settings;