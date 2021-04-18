import React from 'react'
import {fireApp} from './fireapp.js'

function History(){
    let db = fireApp.database()
    const [orders,setorders] = React.useState(undefined)
    React.useEffect(()=>{
        db.ref("pendingOrder").once('value').then(snap=>{
        let record = snap.val()
        record = Object.keys(record).map(key=>record[key])
        console.log(record)
        setorders(record)
        })
    },[])
    return(
        <>
        <h2>orders</h2>
        </>
    )
}

export default History;