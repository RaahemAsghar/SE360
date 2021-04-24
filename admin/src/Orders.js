import React from 'react';
import { Box, Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js';

function Orders ({router,allOrders}) {
    // let products = {4:2,5:1,6:5,7:1,10:2,12:1,13:2}; let orderNo = 435; let emailId = "22100027@lums.edu.pk";
    // let [details, updateDetails] = React.useState([]);
    // let products = {4:2}
    const handleClick = (event) => {
        let orderNo = event.target.innerText; let emailId = allOrders[1][orderNo]["bookers_email"]; let products = allOrders[1][orderNo]["products"]; let productPrices = allOrders[1][orderNo]["product_prices"];
        let db = fireApp.database();
        db.ref("products").once('value').then((snap) => {
            let obj = snap.val();
            let keys = Object.keys(obj); let values = Object.values(obj); let myDict = {}
            for(let i = 0; i<keys.length; i++){
                myDict[keys[i]] = values[i];
            }
            let prodKeys = Object.keys(products);
            let majList = [];
            for(let i = 0; i<prodKeys.length; i++){
                let minList = []; let coeff = (100 - myDict[prodKeys[i]]["discount"])/100;
                // let price = Math.floor(coeff*myDict[prodKeys[i]]["price"]); console.log(price);
                let price = productPrices[prodKeys[i]];
                minList.push(myDict[prodKeys[i]]["name"]); //Name 
                minList.push(prodKeys[i]); // Product Id
                minList.push(products[prodKeys[i]]); // Quantity
                minList.push((Math.floor(minList[2]*price)));
                majList.push(minList);
            }
            let length = (50* (majList.length))+150;
            // console.log(length);
            let table = MakeTable(majList);
            // console.log(table);
            router(["Single Order", orderNo, emailId, table,length,allOrders]);
        })
    }

    const printAllOrders = () => {
        let deliveredIds = []; let myKeys = Object.keys(allOrders[1]);
        for(let i = 0; i<myKeys.length; i++){
            if(allOrders[1][myKeys[i]]["delivered"]){
                deliveredIds.push(myKeys[i]);
            }
        }
        for(let i = 0; i<deliveredIds.length; i++){
            delete allOrders[1][deliveredIds[i]];
        }
        const orderIds = Object.keys(allOrders[1]);
        const emailIds = Object.keys(allOrders[1]).map((key)=>allOrders[1][key]["bookers_email"]);
        let majList = [];
        for(let i = (orderIds.length-1); i>=0; i--){
            majList.push(<button style = {{marginTop: "30px", backgroundColor:"#DBDFF0", width:"820px", height:"80px",border:"none", textAlign: "left", textIndent: "10px", fontFamily: "Arial", borderRadius: "15px", cursor:"context-menu"}}><p style = {{marginTop: "15px", fontWeight: "bold"}}>Order ID: <span onClick = {handleClick} style = {{cursor: "pointer", color: "#0000EE", textDecoration: "underline"}}>{orderIds[i]}</span></p><p style = {{marginTop: "-10px",cursor: "context-menu"}}>Email ID: {emailIds[i]}</p>
            </button>)
        }
        if(!majList.length){
            majList.push(<h6 style = {{marginTop: "20px"}}>There are no pending orders yet</h6>)
        }
        return majList;
    }
    return (
        <div style = {{marginLeft: "90px", overflowY: "scroll", height: "680px"}}>
            <h3 style = {{marginTop: "25px", fontFamily: "Arial", fontWeight: "Bold"}}>Pending Orders</h3>
            {printAllOrders()}
            {/* <button style = {{marginTop: "30px", backgroundColor:"#DBDFF0", width:"820px", height:"80px",border:"none", textAlign: "left", textIndent: "10px", fontFamily: "Arial", borderRadius: "15px", cursor:"context-menu"}}><p style = {{marginTop: "15px", fontWeight: "bold"}}>Order Number: <span onClick = {handleClick} style = {{cursor: "pointer", color: "#0000EE", textDecoration: "underline"}}>435</span></p><p style = {{marginTop: "-10px",cursor: "context-menu"}}>Email ID: 22100027@lums.edu.pk</p>
            </button>

            <button style = {{marginTop: "20px", backgroundColor:"#DBDFF0", width:"820px", height:"80px",border:"none", textAlign: "left", textIndent: "10px", fontFamily: "Arial", borderRadius: "15px"}}><p style = {{marginTop: "15px", fontWeight: "bold"}}>Order Number: 435</p><p style = {{marginTop: "-10px", cursor: "context-menu"}}>Email ID: 22100027@lums.edu.pk</p></button> */}
        </div>
    )
}

function SingleOrder ({router,details}) {
    const handleGoBack = () => {
        router(details[5]);
    }
    const handleDelivered = () => {
        let db = fireApp.database();
        let myCurrentOrder = details[5][1][details[1]];
        myCurrentOrder["delivered"] = true;
        db.ref('pendingOrder').child(details[1]).update(myCurrentOrder);
        router(details[5]);
    }
    React.useEffect(() => {
        let greyHeight = details[4];
        greyHeight = greyHeight + "px";
        document.getElementById("greyArea").style.height = greyHeight;
    },[])
    return(
        // <div style = {{overflowY: "scroll"}}>
        <div style = {{marginLeft: "90px", overflowY: "scroll", height: "680px"}}>
            <div style = {{marginTop: "40px"}}></div>
            <div id = "greyArea" style = {{backgroundColor: "#DBDFF0", borderRadius: "15px", width: "860px"}}>
                <div style = {{fontFamily: "Arial", textIndent: "15px"}}>
                    <p style = {{position: "relative", fontWeight: "bold", top: "20px"}}>Order ID: {details[1]}</p>
                    <p style = {{marginTop: "25px"}}>Email Id: {details[2]}</p>
                </div>
                {details[3]}
            </div>
            <Grid container xs = {12}>
                <Grid item xs = {4}>
                    <input type = "submit" value = "Go Back to Previous page" onClick = {handleGoBack} style = {{marginTop: "30px", width: "200px", height:"38px", backgroundColor: "#5AB9EA", border: "none", borderRadius: "15px"}}></input>
                </Grid>
                <Grid item xs = {4}></Grid>
                <Grid item xs = {4}>
                <input type = "submit" value = "Mark as Delivered" onClick = {handleDelivered} style = {{marginTop: "30px", marginLeft:"35px", width: "200px", height:"38px", backgroundColor: "#5AB9EA", border: "none", borderRadius: "15px", cursor: "pointer"}}></input>
                </Grid>
            </Grid>
        </div>
        // </div>
    )
}

function MakeTable(orderDetails) {
    let majList = []; let tempList = []; let finalList = []; 
    let headerList = ["Item Name", "Product Id", "Quantity", "Price"];
    for(let i = 0; i<headerList.length; i++){
        tempList.push(<th style = {{border: "1px solid #828282"}}>{headerList[i]}</th>);
    }
    majList.push(<tr style = {{height: "40px"}}>{tempList}</tr>)
    for(let i = 0; i<orderDetails.length; i++){
        let minList = [];
        for(let j = 0; j<orderDetails[i].length; j++){
            minList.push(<td style = {{border: "1px solid #828282"}}>{(orderDetails[i][j])}</td>)
        }
        majList.push(<tr style = {{height: "40px"}}>{minList}</tr>);
    }
    finalList.push(<table style = {{textIndent: "15px", width: "720px", marginLeft: "15px", marginTop: "30px"}}>{majList}</table>)
    return finalList;
}

export {Orders, SingleOrder}
// export {SingleOrder}