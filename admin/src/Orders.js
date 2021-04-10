import React from 'react';
import { Box, Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js';

function Orders ({router,updateOrder}) {
    let products = {4:2,5:1,6:5,7:1,10:2,12:1}; let orderNo = 435; let emailId = "22100027@lums.edu.pk"

    const handleClick = () => {
        router(["Single Order", orderNo, emailId, products]);
    }
    return (
        <div style = {{marginLeft: "90px"}}>
            <h3 style = {{marginTop: "25px", fontFamily: "Arial", fontWeight: "Bold"}}>Pending Orders</h3>
            
            <button onClick = {handleClick} style = {{marginTop: "30px", backgroundColor:"#DBDFF0", width:"820px", height:"80px",border:"none", textAlign: "left", textIndent: "10px", fontFamily: "Arial", borderRadius: "15px"}}><p style = {{marginTop: "15px", fontWeight: "bold"}}>Order Number: 435</p><p style = {{marginTop: "-10px"}}>Email ID: 22100027@lums.edu.pk</p></button>

            <button style = {{marginTop: "20px", backgroundColor:"#DBDFF0", width:"820px", height:"80px",border:"none", textAlign: "left", textIndent: "10px", fontFamily: "Arial", borderRadius: "15px"}}><p style = {{marginTop: "15px", fontWeight: "bold"}}>Order Number: 435</p><p style = {{marginTop: "-10px"}}>Email ID: 22100027@lums.edu.pk</p></button>
        </div>
    )
}

function SingleOrder ({details}) {
    // console.log(greyHeight);
    
    React.useEffect(() => {
        let greyHeight = 50* Object.keys(details[3]).length;
        greyHeight = greyHeight + 150;
        greyHeight = greyHeight + "px";
        document.getElementById("greyArea").style.height = greyHeight;
    },[])
    return(
        <div style = {{marginLeft: "90px"}}>
            <div style = {{marginTop: "40px"}}></div>
            <div id = "greyArea" style = {{backgroundColor: "#DBDFF0", borderRadius: "15px"}}>
                <div style = {{fontFamily: "Arial", textIndent: "15px"}}>
                    <p style = {{position: "relative", fontWeight: "bold", top: "20px"}}>Order number: {details[1]}</p>
                    <p style = {{marginTop: "25px"}}>Email Id: {details[2]}</p>
                </div>
                <table style = {{textIndent: "15px", width: "720px", marginLeft: "15px", marginTop: "30px"}}>
                    <tr style = {{height: "40px"}}>
                        <th style = {{border: "1px solid #828282"}}>Item Name</th>
                        <th style = {{border: "1px solid #828282"}}>Product ID</th>
                        <th style = {{border: "1px solid #828282"}}>Quantity</th>
                        <th style = {{border: "1px solid #828282"}}>Price</th>
                    </tr>
                    <tr style = {{height: "40px"}}>
                        <td style = {{border: "1px solid #828282"}}>Item Name</td>
                        <td style = {{border: "1px solid #828282"}}>Product ID</td>
                        <td style = {{border: "1px solid #828282"}}>Quantity</td>
                        <td style = {{border: "1px solid #828282"}}>Price</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export {Orders, SingleOrder}
// export {SingleOrder}