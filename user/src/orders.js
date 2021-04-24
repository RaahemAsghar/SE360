import React from 'react'
import { Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js'
import Details from './details.js'
import { makeStyles } from '@material-ui/core/styles';

function History({user}){
   
    let db = fireApp.database()
    const [orders,setorders] = React.useState(undefined)
    const [prod,setprod] = React.useState(undefined)
    const [focus,setfocus] = React.useState(["history","none"])
    React.useEffect(()=>{
        db.ref("pendingOrder").once('value').then(snap=>{
        let record = snap.val()
        if(record){
            record = Object.keys(record).map(key=>{
                record[key].key = key;
                return record[key]
            })
            setorders(record.reverse())
        }
        })
    },[])
    let pending = []
    let past = []
    if(orders){
        pending  = orders.filter(x => !x.delivered && x.user_id==user)
        past = orders.filter(x => x.delivered && x.user_id==user)
    }
    let placeholder = <>
    <Grid item xs={12}>
        <h3 style={{color:"#355093",marginLeft:"5%",marginTop:"3%"}}>Pending Orders</h3>
        <div style={{overflow:"auto",width:"70%",marginLeft:"1%",height:"220px"}}>
            {pending.length>0 ? pending.map(obj => (<div style={{backgroundColor:"#84CEEB",marginTop:"10px",height:"100px",marginLeft:"5%",borderRadius:"10px",paddingLeft:"1.5%"}}>
                <h4 style={{display:"inline-block"}}>Order ID: {obj.key}</h4>
                <h4 style={{display:"inline-block",float:"right",marginRight:"2%"}}>Total: RS {Math.round(obj.bill)}</h4><br/>
                <h4 style={{display:"inline-block",transform:"translateY(-22px)"}}>Date: {obj.date}</h4>
                <button onClick={()=>setfocus(["details",obj.key])} style={{float:"right",backgroundColor:"#355093",color:"white",marginRight:"2%"}}>View Details</button>
            </div>)) : <h4 style={{marginLeft:"6%"}}>No pending Orders</h4>}
        </div>
    </Grid>
    <Grid item xs={12}>
        <h3 style={{color:"#355093",marginLeft:"5%"}}>Past Orders</h3>
        <div style={{overflow:"auto",marginLeft:"1%",width:"70%",height:"220px"}}>
            {past.length>0 ? past.map(obj => (<div style={{backgroundColor:"#84CEEB",marginTop:"10px",height:"100px",marginLeft:"5%",borderRadius:"10px",paddingLeft:"1.5%"}}>
                <h4 style={{display:"inline-block"}}>Order ID: {obj.key}</h4>
                <h4 style={{display:"inline-block",float:"right",marginRight:"2%"}}>Total: RS {Math.round(obj.bill)}</h4><br/>
                <h4 style={{display:"inline-block",transform:"translateY(-22px)"}}>Date: {obj.date}</h4>
                <button onClick={()=>setfocus(["details",obj.key])} style={{float:"right",backgroundColor:"#355093",color:"white",marginRight:"2%"}}>View Details</button>
            </div>)) : <h4 style={{marginLeft:"6%"}}>No past orders</h4>}
        </div>
    </Grid>
    </>

   if(focus[0]=="history"){
       return placeholder
   }else{
       return <Details id={focus[1]} route={()=>setfocus(["history","none"])}/>
   }
}

export default History;