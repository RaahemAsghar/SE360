import React from 'react'
import { Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js'

function History({user}){
    let db = fireApp.database()
    const [orders,setorders] = React.useState(undefined)
    const [focus,setfocus] = React.useState("details")
    React.useEffect(()=>{
        db.ref("pendingOrder").once('value').then(snap=>{
        let record = snap.val()
        record = Object.keys(record).map(key=>{
            record[key].key = key;
            return record[key]
        })
        console.log(record)
        setorders(record)
        })
    },[])
    let pending = undefined
    let past = undefined
    if(orders){
        pending  = orders.filter(x => !x.delivered && x.user_id==user)
        past = orders.filter(x => x.delivered && x.user_id==user)
    }
    let placeholder = <>
    <Grid item xs={12}>
        <h3 style={{color:"#355093",marginLeft:"5%",marginTop:"3%"}}>Pending Orders</h3>
        <div style={{overflow:"auto",height:"220px"}}>
            {pending ? pending.map(obj => (<div style={{backgroundColor:"#84CEEB",marginTop:"10px",width:"70%",height:"100px",marginLeft:"5%",borderRadius:"10px",paddingLeft:"1.5%"}}>
                <h4 style={{display:"inline-block"}}>Order ID: {obj.key}</h4>
                <h4 style={{display:"inline-block",float:"right",marginRight:"2%"}}>Total: RS {obj.bill}</h4><br/>
                <h4 style={{display:"inline-block",transform:"translateY(-22px)"}}>Date: {obj.date}</h4>
                <button style={{float:"right",backgroundColor:"#355093",color:"white",marginRight:"2%"}}>View Details</button>
            </div>)) : <h3 style={{marginLeft:"5%"}}>No pending Orders</h3>}
        </div>
    </Grid>
    <Grid item xs={12}>
        <h3 style={{color:"#355093",marginLeft:"5%"}}>Past Orders</h3>
        <div style={{overflow:"auto",height:"220px"}}>
            {past ? past.map(obj => (<div style={{backgroundColor:"#84CEEB",marginTop:"10px",width:"70%",height:"100px",marginLeft:"5%",borderRadius:"10px",paddingLeft:"1.5%"}}>
                <h4 style={{display:"inline-block"}}>Order ID: {obj.key}</h4>
                <h4 style={{display:"inline-block",float:"right",marginRight:"2%"}}>Total: RS {obj.bill}</h4><br/>
                <h4 style={{display:"inline-block",transform:"translateY(-22px)"}}>Date: {obj.date}</h4>
                <button style={{float:"right",backgroundColor:"#355093",color:"white",marginRight:"2%"}}>View Details</button>
            </div>)) : <h3 style={{marginLeft:"5%"}}>No past orders</h3>}
        </div>
    </Grid>
    </>

   if(focus=="history"){
       return placeholder
   }else{
       return details()
   }
}

function details(){
    return(
    <>
    <Grid item xs={12}>
        <div>
            <h3 style={{color:"#355093"}}>Order Details</h3>
        </div>
    </Grid>
    </>)
}

export default History;