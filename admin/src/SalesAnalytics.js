import React from 'react';
import { Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js';
import SearchIcon from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

function SalesAnalytics ({totalOrders}) {
    let [monthDict, updateMonthDict] = React.useState({"January":1, "February":2, "March":3, "April":4, "May":5, "June":6, "July":7, "August":8, "September":9, "October":10, "November":11, "December":12});
    let [bgColor, updateBgColor] = React.useState({"Daily":"#C1C8E4","Monthly":"#355093","Yearly":"#355093"})
    let [textColor, updateTextColor] = React.useState({"Daily":"black","Monthly":"white","Yearly":"white"})
    let [tempState, updateTempState] = React.useState(false);
    let [yearState, updateYearState] = React.useState("Select Year");
    let [monthState, updateMonthState] = React.useState("Select Month");
    let [dayState, updateDayState] = React.useState("Select Day");
    let [pageState, updatePageState] = React.useState("Daily");
    let [incorrectDate, updateIncorrectDate] = React.useState(false);
    let [searched, updateSearched] = React.useState(false);
    let [searchedDay, updateSearchedDay] = React.useState("");
    let [searchedMonth, updateSearchedMonth] = React.useState("");
    let [searchedYear, updateSearchedYear] = React.useState("");
    let [emptyBox, updateEmptyBox] = React.useState(false);
    let [boxAppeared, updateBoxAppeared] = React.useState(false);
    let [validProducts, updateValidProducts] = React.useState({});
    let [open1, updateOpen1] = React.useState(false);
    let [validQuantities, updateValidQuantities] = React.useState({});
    let [validPrices, updateValidPrices] = React.useState({});
    let [validNames, updateValidNames] = React.useState({});
    let [bla, BlaBla] = React.useState([]);
    let [analyticsTable, updateAnalyticsTable] = React.useState([]);

    const clickTypeHandler = (event) => {
        let myDictBg = bgColor; let myDictText = textColor; let keys = Object.keys(myDictBg);
        myDictBg[event.target.innerText] = "#C1C8E4"; myDictText[event.target.innerText] = "black";
        for(let i = 0; i<keys.length; i++){
            if(keys[i]!=event.target.innerText){
                myDictBg[keys[i]] = "#355093"; myDictText[keys[i]] = "white";
            }
        }
        if(tempState){
            updateBgColor(myDictBg); updateTextColor(myDictText); updateTempState(false); updatePageState(event.target.innerText); updateMonthState("Select Month"); updateDayState("Select Day"); updateYearState("Select Year"); updateAnalyticsTable([]);
        }
    }
    
    const testIncorrect = () => {
        // updateSearchedDay(dayState); updateSearchedMonth(monthState); updateSearchedYear(yearState);
        let incorrect = false;
        if(pageState==="Yearly"){
            if(yearState === "Select Year"){
                // updateIncorrectDate(true); updateBoxAppeared(true);
                incorrect = true;
            }
        } 
        else if (pageState === "Monthly"){
            if(yearState === "Select Year" || monthState === "Select Month"){
                // updateIncorrectDate(true); updateBoxAppeared(true);
                incorrect = true;
            }
        } else{
            if(dayState === "Select Day" || monthState === "Select Month" || yearState === "Select Year"){
                // updateIncorrectDate(true); updateBoxAppeared(true);
                incorrect = true;
            }
            else {
                if(pageState === "Daily"){
                    let smallMonths = ["February","April","June","September","November"];
                    for(let i = 0; i<smallMonths.length; i++){
                        if(monthState=== smallMonths[i] && dayState==="31"){
                            // updateIncorrectDate(true); updateBoxAppeared(true);  break;
                            incorrect = true; break;
                        }
                    }
                    let selectedYear = Number(yearState);
                    if(!(selectedYear%4)){
                        if (monthState === "February" && dayState === "30"){
                            // updateIncorrectDate(true); updateBoxAppeared(true);
                            incorrect = true;
                        }
                    } else {
                        if (monthState === "February" && (dayState === "29" || dayState === "30")){
                            // updateIncorrectDate(true); updateBoxAppeared(true);
                            incorrect = true;
                        }
                    }
                }
            }
        }
        if(incorrect){
            updateIncorrectDate(true); updateBoxAppeared(true); updateOpen1(true);
        }
        else{
            updateIncorrectDate(false);
            let accepted = testEmpty();
            if(!Object.keys(accepted).length){updateEmptyBox(true);}
            else{
                tableCreator(accepted);
            }
        }
    }
    
    function tableCreator(myorders){
        let orderIds = Object.keys(myorders); let priceDict = {}; let nameDict = {}; let quantDict = {};
        // console.log(myorders);
        for(let i = 0; i<orderIds.length; i++){
            let currentQuant = myorders[orderIds[i]]["products"];
            let currentName = myorders[orderIds[i]]["product_names"];
            let currentPrices = myorders[orderIds[i]]["product_prices"]; let prodIds = Object.keys(currentName);
            console.log(currentPrices);
            // for(let j = 0; j<prodIds.length; j++){
            //     currentPrices[prodIds[j]] = (currentPrices[prodIds[j]]*currentQuant[prodIds[j]])
            // }
            // console.log(currentPrices);
            for(let j = 0; j<prodIds.length; j++){
                let exists = false; let keys = Object.keys(nameDict);
                for(let k = 0; k<keys.length; k++){
                    if(prodIds[j]===keys[k]){exists = true; break;}
                }
                if(exists){
                    console.log("Hello")
                    quantDict[prodIds[j]] = quantDict[prodIds[j]] + currentQuant[prodIds[j]];
                    priceDict[prodIds[j]] = priceDict[prodIds[j]] + (currentQuant[prodIds[j]]*currentPrices[prodIds[j]])
                }
                else{
                    quantDict[prodIds[j]] = currentQuant[prodIds[j]];
                    // priceDict[prodIds[j]] = currentPrices[prodIds[j]];
                    priceDict[prodIds[j]] = (currentQuant[prodIds[j]]*currentPrices[prodIds[j]])
                    nameDict[prodIds[j]] = currentName[prodIds[j]];
                }
            }
        }
        // console.log(nameDict); console.log(priceDict); console.log(quantDict);
        let informationList = []; let productKeys = Object.keys(nameDict); let totalEarned = 0;
        for(let i = 0; i<productKeys.length; i++){
            let tempList = []; let currProdPrice = priceDict[productKeys[i]]; totalEarned += currProdPrice;
            currProdPrice = "Rs "+(Math.round(currProdPrice)).toString()
            tempList.push(nameDict[productKeys[i]]); tempList.push(productKeys[i]);
            tempList.push(quantDict[productKeys[i]]); tempList.push(currProdPrice);
            informationList.push(tempList);
        }
        let headingList = ["Product Name","Product ID","Quantity","Total Price"]; let tableHeading = []; let headingValues = []; let tableData = []; let myTable = [];
        // for(let i = 0; i<informationList.length; i++){
        //     totalEarned = totalEarned + informationList[i][3];
        // }
        totalEarned = Math.round(totalEarned);
        
        for(let i = 0; i<headingList.length; i++){
            headingValues.push(<th style = {{border: "1px solid #828282"}}>{headingList[i]}</th>)
        }
        tableHeading.push(<tr style = {{backgroundColor: "#DBDFF0", border: "1px solid #828282", height:"30px"}}>{headingValues}</tr>);
        for(let i = 0; i<informationList.length; i++){
            let tempList = [];
            for (let j = 0; j<informationList[i].length; j++){
                tempList.push(<td style = {{border: "1px solid #828282"}}>{informationList[i][j]}</td>)
            }
            tableData.push(<tr style = {{backgroundColor: "white",border: "1px solid #828282", height:"30px"}}>{tempList}</tr>)
        }
        tableHeading.push(tableData);
        myTable = [<div style = {{width:"820px", backgroundColor: "#C1C8E4",marginTop: "20px" , height: "420px", overflowY: "scroll"}}><table style = {{border: "1px solid #828282", marginLeft: "40px" , marginTop: "20px" , width:"740px", textAlign: "center"}}>{tableHeading}</table><h6 style = {{fontFamily: "Arial",fontWeight: "bold",marginLeft: "40px",marginTop:"40px"}}>Total Earned: Rs {totalEarned}</h6></div>];
        updateAnalyticsTable(myTable);
    }
    const dateSearch = (event) => {
        event.preventDefault();
        updateSearchedDay(dayState); updateSearchedMonth(monthState); updateSearchedYear(yearState); updateAnalyticsTable([]);
        testIncorrect();
        // let accepted = testEmpty();
        // if(!incorrectDate){
        //     if(!Object.keys(accepted).length){updateEmptyBox(true);}
        // }
        updateSearched(true);
    }
    const handleClose1 = () => {
        // updateIncorrectDate(false); updateSearched(false);
        updateOpen1(false); updateSearched(false);
    }
    function displayIncorrectBox () {
        let myBox = []
        if(open1){
            myBox = [<Dialog open={open1} onClose={handleClose1} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"><DialogTitle id="alert-dialog-title">{"Incorrect Date"}</DialogTitle><DialogContent><DialogContentText id="alert-dialog-description">You have entered an incorrect Date. Please try again</DialogContentText></DialogContent><DialogActions><Button onClick={handleClose1} color="primary">Close</Button></DialogActions></Dialog>]
        }
        return myBox;
    }
    function displayEmptyBox () {
        let myBox = []
        const handleClose2 = () => {updateEmptyBox(false); updateSearched(false); /*updateBoxAppeared(true);*/}
        if(emptyBox){
            myBox = [<Dialog open={emptyBox} onClose={handleClose2} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"><DialogTitle id="alert-dialog-title">{"No Sales"}</DialogTitle><DialogContent><DialogContentText id="alert-dialog-description">No Products were sold in this time Period</DialogContentText></DialogContent><DialogActions><Button onClick={handleClose2} color="primary">Close</Button></DialogActions></Dialog>]
        }
        return myBox;
    }
    function testEmpty() {
        let keys = Object.keys(totalOrders); let acceptableOrders = {};
        // console.log(keys);
        // console.log(yearState); console.log(monthState); console.log(dayState);
        for(let i = 0; i<keys.length; i++){
            let orderDate = totalOrders[keys[i]]['date']; orderDate = orderDate.split("/");
            if (pageState === "Yearly"){
                // console.log("Yearly")
                if(yearState === orderDate[2]){
                    acceptableOrders[keys[i]] = totalOrders[keys[i]]; //console.log("Daily");
                }
            }
            else if(pageState === "Monthly"){
                // console.log("Monthly")
                if(yearState === orderDate[2] && monthDict[monthState].toString() === orderDate[1]){
                    acceptableOrders[keys[i]] = totalOrders[keys[i]]; //console.log("Daily");
                }
            }
            else if(pageState === "Daily"){
                // console.log("Daily");
                if(yearState === orderDate[2] && monthDict[monthState].toString() === orderDate[1] && dayState === orderDate[0]){
                    acceptableOrders[keys[i]] = totalOrders[keys[i]]; //console.log("Daily");
                }
            }
        }
        return acceptableOrders;
        // console.log(acceptableOrders)
        updateValidProducts(acceptableOrders);
        if(!Object.keys(acceptableOrders).length){updateEmptyBox(true);}
        // if(!incorrectDate){
        //     if(!Object.keys(acceptableOrders).length){updateEmptyBox(true);}
        // }
        
        // for(let i = 0; i< keys.length; i++){
        //     let prodQuantities = totalOrders[keys[i]]["products"];
        //     let prodPrices = totalOrders[keys[i]]["products"];
        //     let keys2 = Object.keys(prodPrices);
        //     for(let j = 0; j<keys2.length; j++){
        //         let quantities = validQuantities; let prices = validPrices;
        //     }
        // }
    }
    function Jsx () {
        const yearChange = (event) => {updateYearState(event.target.value);}
        const monthChange = (event) => {updateMonthState(event.target.value);}
        const dayChange = (event) => {updateDayState(event.target.value);}
        
        if (pageState==="Empty Page"){
            return [];
        }
        let myJsxList = []; let date = new Date(); let currentYear = date.getFullYear(); let yearList = ["Select Year"]; let monthList = ["Select Month","January", "February","March","April","May","June","July","August","September","October","November","December"]; let dayList = ["Select Day"];
        let finalList = [];
        for(let i = currentYear; i>currentYear-10; i--){
            yearList.push(i);
        }
        for(let i = 1; i<32; i++){
            dayList.push(i);
        }
        myJsxList.push(<select value = {yearState} onChange = {yearChange} style = {{width: "120px", height:"38px", borderRadius: "15px", backgroundColor: "#DBDFF0", border: "none", marginTop: "15px", marginLeft: "15px"}} required>
        {yearList ? yearList.map((val,index)=>(<option key={index}>{val}</option>)) : <h5></h5>} 
        </select>)
        if(pageState==="Yearly"){
            myJsxList.push(<SearchIcon onClick = {dateSearch} fontSize="medium" style={{transform:"rotate(10deg) translateY(-5px)",marginLeft:"10px",color:"#355093",cursor:"pointer"}}/>);
            finalList.push(<div>{myJsxList}</div>); return finalList;
        }
        myJsxList.push(<select value = {monthState} onChange = {monthChange} style = {{width: "120px", height:"38px", borderRadius: "15px", backgroundColor: "#DBDFF0", border: "none", marginTop: "15px", marginLeft: "15px"}} required>
        {monthList ? monthList.map((val,index)=>(<option key={index}>{val}</option>)) : <h5></h5>} 
        </select>)
        if(pageState==="Monthly"){
            myJsxList.push(<SearchIcon onClick = {dateSearch} fontSize="medium" style={{transform:"rotate(10deg) translateY(-5px)",marginLeft:"10px",color:"#355093",cursor:"pointer"}}/>);
            finalList.push(<div>{myJsxList}</div>); return finalList;
        }
        myJsxList.push(<select value = {dayState} onChange = {dayChange} style = {{width: "120px", height:"38px", borderRadius: "15px", backgroundColor: "#DBDFF0", border: "none", marginTop: "15px", marginLeft: "15px"}} required>
        {dayList ? dayList.map((val,index)=>(<option key={index}>{val}</option>)) : <h5></h5>} 
        </select>);
        myJsxList.push(<SearchIcon onClick = {dateSearch} fontSize="medium" style={{transform:"rotate(10deg) translateY(-5px)",marginLeft:"10px",color:"#355093",cursor:"pointer"}}/>);
        finalList.push(<div>{myJsxList}</div>); return finalList;
    }
    const initializePage = () => {
        let keys = Object.keys(totalOrders);
        if(!keys.length){return [<h6 style = {{marginTop: "20px"}}>You have made no sales yet</h6>]}        
        else{
            if(!tempState){
                updateBgColor(bgColor); updateTempState(true);
            }
            let newList = []; let myList = [];
            let dayState = ["Daily","Monthly","Yearly"];
            for(let i = 0; i< dayState.length; i++){
                newList.push(<button id = {dayState[i]} onClick = {clickTypeHandler} style = {{borderWidth: "0px",color:"black", height: "40px", width:"100px", marginTop: "20px",borderTopRightRadius: "15px", borderTopLeftRadius: "15px",backgroundColor: [bgColor[dayState[i]]], color:[textColor[dayState[i]]]}}>{dayState[i]}</button>)
            }
            myList.push(<div>{newList}</div>)
            return myList;
        }
    }
    const trial = () => {
        let myCategories = ["2021","2020","2019"] 
        let minList = [<select style = {{width: "120px", height:"38px", borderRadius: "15px", backgroundColor: "#DBDFF0", border: "none", marginTop: "15px", marginLeft: "15px"}} required>
        {myCategories ? myCategories.map((val,index)=>(<option key={index}>{val}</option>)) : <h5></h5>} 
        </select>]
        return minList
    }
    return(
        <div style = {{marginLeft: "90px", height: "680px", overflowY: "scroll"}}>
            
            <h3 style = {{marginTop: "25px", fontFamily: "Arial", fontWeight: "Bold"}}>Sales Analytics</h3>
            {/* <button id = "daily" style = {{borderWidth: "0px",color:"black", height: "40px", width:"100px", marginTop: "20px",borderTopRightRadius: "15px", borderTopLeftRadius: "15px",backgroundColor: [bgColor["Daily"]], color:[textColor["Daily"]]}}>Daily</button>
            <button id = "monthly" style = {{borderWidth: "0px", height: "40px", width:"100px", marginTop: "20px",borderTopRightRadius: "15px", borderTopLeftRadius: "15px",backgroundColor: [bgColor["Monthly"]], color: textColor["Monthly"]}}>Monthly</button>
            <button id = "yearly" style = {{borderWidth: "0px", backgroundColor: [bgColor["Yearly"]], color:"white", height: "40px", width:"100px", marginTop: "20px",borderTopRightRadius: "15px", borderTopLeftRadius: "15px", color: textColor["Yearly"]}}>Yearly</button> */}
            {initializePage()}
            <div style = {{height: "100px", backgroundColor: "#C1C8E4", width: "820px"}}>
            {Jsx()}
            {displayIncorrectBox()}
            {displayEmptyBox()}
            {analyticsTable}
            {/* {trial()} */}
            </div>
        </div>
    )
}

export {SalesAnalytics}