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
    let [bgColor, updateBgColor] = React.useState({"Daily":"#C1C8E4","Monthly":"#355093","Yearly":"#355093"})
    let [textColor, updateTextColor] = React.useState({"Daily":"black","Monthly":"white","Yearly":"white"})
    let [tempState, updateTempState] = React.useState(false);
    let [yearState, updateYearState] = React.useState("Select Year");
    let [monthState, updateMonthState] = React.useState("Select Month");
    let [dayState, updateDayState] = React.useState("Select Day");
    let [pageState, updatePageState] = React.useState("Daily");
    let [incorrectDate, updateIncorrectDate] = React.useState(false);
    let [ordersExist, updateOrdersExist] = React.useState(false);
    let months = {1: "January", 2: "February", 3: "March", 4: "April"};
    let days = {1:31,2:28,3:31,4:30};
    const clickTypeHandler = (event) => {
        let myDictBg = bgColor; let myDictText = textColor; let keys = Object.keys(myDictBg);
        myDictBg[event.target.innerText] = "#C1C8E4"; myDictText[event.target.innerText] = "black";
        for(let i = 0; i<keys.length; i++){
            if(keys[i]!=event.target.innerText){
                myDictBg[keys[i]] = "#355093"; myDictText[keys[i]] = "white";
            }
        }
        if(updateTempState){
            updateBgColor(myDictBg); updateTextColor(myDictText); updateTempState(false); updatePageState(event.target.innerText); updateMonthState("Select Month"); updateDayState("Select Day"); updateYearState("Select Year");
        }
    }
    
    const dateSearch = (event) => {
        event.preventDefault();
        if(dayState === "Select Day" || monthState === "Select Month" || yearState === "Select Year"){
            updateIncorrectDate(true);
        }
    }
    const handleClose1 = () => {
        updateIncorrectDate(false);
    }
    function displayIncorrectBox () {
        let myBox = []
        if(incorrectDate){
            myBox = [<Dialog open={incorrectDate} onClose={handleClose1} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"><DialogTitle id="alert-dialog-title">{"Incorrect Date"}</DialogTitle><DialogContent><DialogContentText id="alert-dialog-description">You have entered an incorrect Date. Please try again</DialogContentText></DialogContent><DialogActions><Button onClick={handleClose1} color="primary">Ok</Button></DialogActions></Dialog>]
        }
        return myBox;
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
            {/* {trial()} */}
            </div>
        </div>
    )
}

export {SalesAnalytics}