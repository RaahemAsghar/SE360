import React from 'react';
import { Box, Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js';

function Orders ({router,updateOrder}) {
    let products = {4:2,5:1,6:5,7:1,10:2,12:1,13:2}; let orderNo = 435; let emailId = "22100027@lums.edu.pk";
    let [details, updateDetails] = React.useState([]);
    // let products = {4:2}

    const handleClick = (event) => {
        let text = event.target.innerText
        console.log(text);
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
                let minList = []; let price = myDict[prodKeys[i]]["price"];
                minList.push(myDict[prodKeys[i]]["name"]);
                minList.push(prodKeys[i]);
                minList.push(products[prodKeys[i]]);
                minList.push((minList[2]*price));
                majList.push(minList);
            }
            let length = (50* (majList.length))+150;
            // console.log(length);
            let table = MakeTable(majList);
            // console.log(table);
            router(["Single Order", orderNo, emailId, table,length]);
        })
    }
    return (
        <div style = {{marginLeft: "90px"}}>
            <h3 style = {{marginTop: "25px", fontFamily: "Arial", fontWeight: "Bold"}}>Pending Orders</h3>
            
            <button style = {{marginTop: "30px", backgroundColor:"#DBDFF0", width:"820px", height:"80px",border:"none", textAlign: "left", textIndent: "10px", fontFamily: "Arial", borderRadius: "15px", cursor:"context-menu"}}><p style = {{marginTop: "15px", fontWeight: "bold"}}>Order Number: <span onClick = {handleClick} style = {{cursor: "pointer", color: "#0000EE", textDecoration: "underline"}}>435</span></p><p style = {{marginTop: "-10px",cursor: "context-menu"}}>Email ID: 22100027@lums.edu.pk</p>
            </button>

            <button style = {{marginTop: "20px", backgroundColor:"#DBDFF0", width:"820px", height:"80px",border:"none", textAlign: "left", textIndent: "10px", fontFamily: "Arial", borderRadius: "15px"}}><p style = {{marginTop: "15px", fontWeight: "bold"}}>Order Number: 435</p><p style = {{marginTop: "-10px", cursor: "context-menu"}}>Email ID: 22100027@lums.edu.pk</p></button>
        </div>
    )
}

function SingleOrder ({details}) {
    // console.log(greyHeight);
    let [productList, updateProductList] = React.useState({});
    let [orderList, updateOrderList] = React.useState([]);
    let [table, setTable] = React.useState([]);
    const createTable = () => {
        let majList = []
        for(let i = 0; i< orderList.length; i++){
            let minList = [];
            for(let j = 0; j<orderList[i].length; i++){
                minList.push(<td style = {{border: "1px solid #828282"}}>{orderList[i][j]}</td>)
            }
            majList.push(minList);
        }
        setTable(majList);
    }

    const printTable = () => {
        return table;
    }
    React.useEffect(() => {
        let greyHeight = details[4];
        greyHeight = greyHeight + "px";
        document.getElementById("greyArea").style.height = greyHeight;
    },[])
    return(
        <div style = {{marginLeft: "90px"}}>
            <div style = {{marginTop: "40px"}}></div>
            <div id = "greyArea" style = {{backgroundColor: "#DBDFF0", borderRadius: "15px", width: "860px"}}>
                <div style = {{fontFamily: "Arial", textIndent: "15px"}}>
                    <p style = {{position: "relative", fontWeight: "bold", top: "20px"}}>Order number: {details[1]}</p>
                    <p style = {{marginTop: "25px"}}>Email Id: {details[2]}</p>
                </div>
                {details[3]}
                {/* <table style = {{textIndent: "15px", width: "720px", marginLeft: "15px", marginTop: "30px"}}>
                    <tr style = {{height: "40px"}}>
                        <th style = {{border: "1px solid #828282"}}>Item Name</th>
                        <th style = {{border: "1px solid #828282"}}>Product ID</th>
                        <th style = {{border: "1px solid #828282"}}>Quantity</th>
                        <th style = {{border: "1px solid #828282"}}>Price</th>
                    </tr> */}
                    {/* {details[3]} */}
                    {/* {orderList.map( item => <tr style = {{height: "40px"}}> <td style = {{border: "1px solid #828282"}}>{item[0]}</td><td style = {{border: "1px solid #828282"}}>{item[1]}</td><td style = {{border: "1px solid #828282"}}>{item[2]}</td><td style = {{border: "1px solid #828282"}}>{item[3]}</td></tr>)} */}
                    {/* <tr style = {{height: "40px"}}>
                        <td style = {{border: "1px solid #828282"}}>Item Name</td>
                        <td style = {{border: "1px solid #828282"}}>Product ID</td>
                        <td style = {{border: "1px solid #828282"}}>Quantity</td>
                        <td style = {{border: "1px solid #828282"}}>Price</td>
                    </tr> */}
                {/* </table> */}
            </div>
        </div>
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