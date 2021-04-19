import React from 'react';
// import { Grid } from '@material-ui/core';
import Login from './Login.js';
import Home from './Home.js';
import {fireApp} from './fireapp.js';

function Main ({tempList}){
    let [adminDetails, updateAdminDetails] = React.useState({});
    let [emailId, updateEmailId] = React.useState('');
    let [password, updatePassword] = React.useState('');
    let [name, updateName] = React.useState('');
    let [submitted, updateSubmitted] = React.useState(false);
    let [tag, updateTag] = React.useState([])
    let [check, setCheck] = React.useState(true);
    
    const myPage = () => {
        if(submitted && check){
            let correct = false; let adminEmails = Object.keys(adminDetails);
            for(let i = 0; i< adminEmails.length; i++){
                if(adminEmails[i]===emailId && adminDetails[adminEmails[i]][1]==password){
                    correct = true; updateName(adminDetails[adminEmails[i]][0]); break;
                }
            }
            if(correct){
                let requirements = [emailId, updateEmailId, password, updatePassword, name, updateName, updateSubmitted];
                // tempList = [<Home details = {requirements}/>];
                // console.log(tempList.length)
                setCheck(false);
                // console.log("Correct id and password")
                // return <Home details = {requirements}/>
            } else{
                console.log("incorrect Id or password")
                updateSubmitted(false); updateEmailId(''); updatePassword('');
                let requirements = [emailId, updateEmailId, password, updatePassword, name, updateName, submitted, updateSubmitted];
                tempList = [<Login details = {requirements}/>];  //updateTag(tempList);
                // return <Login details = {requirements}/>
            }
        }
        else if (check){
            let requirements = [emailId, updateEmailId, password, updatePassword, name, updateName, submitted, updateSubmitted];
            tempList = [<Login details = {requirements}/>]; //updateTag(tempList);
            // return <Login details = {requirements}/>
        }
        else {
            let requirements = [emailId, updateEmailId, password, updatePassword, name, updateName, updateSubmitted];
            tempList = [<Home details = {requirements}/>];
        }
        // console.log(tempList.length)
        return tempList;
    }
    React.useEffect(()=>{
        let db = fireApp.database();
        db.ref('adminDetail').once('value').then((snap)=>{
            let obj = snap.val();
            let myDict = {}; let keys = Object.keys(obj); let values = Object.values(obj);
            for(let i = 0; i< Object.keys(obj).length; i++){
                let adminInfo = [values[i]["name"], values[i]["password"]];
                myDict[values[i]["email"]] = adminInfo;
            }
            updateAdminDetails(myDict)
        })
    },[])
    return(
        <div>
            {myPage()}
            {/* {UpdateId({updateEmailId,updatePassword})} */}
        </div>
    )
}

export default Main;