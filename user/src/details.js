import React from 'react'
import { Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js'
import Load from '@material-ui/core/CircularProgress';

function Details({id,route}){

    const [prod,setprod] = React.useState(undefined)
    const [trans,settrans] = React.useState({})

    React.useEffect(()=>{
        let db = fireApp.database()
        db.ref("products").once('value').then((snap)=>{
            let obj = snap.val();
            let dict = {}
            Object.keys(obj).forEach((key)=>{
                dict[key] = obj[key].name
            })

            db.ref("pendingOrder").once('value').then(snap=>{
                let record = snap.val();
                let temp = record[id].products
                settrans(record[id])
                let newtemp =[]
                Object.keys(temp).forEach(key=>{
                    newtemp.push(
                    {
                        "name": dict[key],
                        "count": temp[key]
                    })
                })
                setprod(newtemp)
            })
        })

    },[id])

    return(
    <>
    <Grid item xs={12}>
        <h3 style={{color:"#355093",marginLeft:"5%",marginTop:"3%"}}>Order Details</h3>
        <div style={{backgroundColor:"#84CEEB",marginLeft:"5%",width:"60%",height:"470px",overflow:"auto",paddingLeft:"10px",borderRadius:"10px",paddingRight:"10px"}}>
            <h4 style={{display:"inline-block",fontWeight:"600"}}>Order ID: {id}</h4>
            <h4 style={{display:"inline-block",float:"right",fontWeight:"600"}}>Date: {trans.date} </h4><hr/>
            <h3 style={{display:"inline-block"}}>Product Name</h3>
            <h3 style={{display:"inline-block",float:"right"}}>Quantity</h3><hr/>
            {
                prod ? prod.map(obj => (
                    <>
                    <h4 style={{display:"inline-block",fontWeight:"400"}}>{obj.name}</h4>
                    <h4 style={{display:"inline-block",float:"right",marginRight:"20px",fontWeight:"400"}}>{obj.count}</h4><hr/>
                    </>
                )) : <Load size={60} style={{marginLeft:"40%"}}/>
            }
            <h3 style={{display:"inline-block"}}>Total:</h3>
            <h3 style={{display:"inline-block",float:"right"}}>{trans.bill}</h3>
        </div>
        <button onClick={route} style={{backgroundColor:"#355093",color:"white",marginLeft:"5%",marginTop:"1%"}}>Go back to my orders</button>
    </Grid>
    </>)
}

export default Details