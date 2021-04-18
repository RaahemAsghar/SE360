import React from 'react';
import { Grid } from '@material-ui/core';
import {fireApp} from './fireapp.js';
import SearchIcon from '@material-ui/icons/Search';

function Inventory({details}) {
    let [filterState, setFilterState] = React.useState("Filters");
    let [searchState, setSearchState] = React.useState("Search for a product")
    
    const createTable = () => {
        let productList = details[1]; let productKeys = Object.keys(productList);
        let requiredList = []; let headingNames = ["Product ID", "Product Name", "Brand Name", "Category","Price","Stock Remaining", "Total Sold"];
        for(let i = 0; i<productKeys.length; i++){
            let tempList = []; tempList.push(productKeys[i]);
            tempList.push(productList[productKeys[i]]["name"]);
            tempList.push(productList[productKeys[i]]["brand_name"]);
            tempList.push(productList[productKeys[i]]["category"]);
            tempList.push(productList[productKeys[i]]["price"]);
            tempList.push(productList[productKeys[i]]["stock_left"]);
            tempList.push(productList[productKeys[i]]["total_sold"]);
            requiredList.push(tempList);
        }
        console.log(requiredList);
        let majList = []; let minList = []; let finalList = []
        if(requiredList.length){
            for(let i = 0; i< headingNames.length; i++){
                minList.push(<th style = {{border: "1px solid #828282"}}>{headingNames[i]}</th>)
            }
            majList.push(<tr style = {{backgroundColor: "#c1c8e4", border: "1px solid #828282", height:"30px"}}>{minList}</tr>)
            for(let i = 0; i<requiredList.length; i++){
                let tempList = [];
                for(let j = 0; j<requiredList[i].length; j++){
                    tempList.push(<td style = {{border: "1px solid #828282"}}>{requiredList[i][j]}</td>)
                }
                majList.push(<tr style = {{border: "1px solid #828282", height:"30px"}}>{tempList}</tr>);
            }
            finalList.push(<table style = {{border: "1px solid #828282", marginTop: "40px", width:"900px", textAlign: "center"}}>{majList}</table>)
        }
        else{
            finalList.push(<h6 style = {{marginTop: "20px"}}>There are no products in inventory yet</h6>)
        }
        return finalList;
    }
    // createTable();
    return(
        <div style = {{marginLeft: "90px", overflowY: "scroll", height: "680px"}}>
            <Grid container xs = {12} style = {{marginTop: "25px"}}>
                <Grid item xs = {4}>
                    <h3 style = {{fontWeight: "bold", fontFamily: "Arial"}}>View Inventory</h3>
                </Grid>
                <Grid item xs = {1}></Grid>
                <Grid item xs = {7}>
                    <select style = {{width: "220px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none", textIndent: "15px", cursor: "not-allowed"}}>
                        <option>{filterState}</option>
                    </select>
                    <input value = {searchState} type = "text" style = {{width: "220px", height:"38px", borderRadius: "15px", backgroundColor: "#C1C8E4", border: "none" ,marginLeft: "40px", textIndent: "15px", cursor: "not-allowed"}}>
                    </input>
                    <SearchIcon fontSize="large" style={{transform:"rotate(10deg) translateY(-5px)",marginLeft:"5px",color:"#355093",cursor:"not-allowed"}}/>
                </Grid>
            </Grid>
            {createTable()}
            {/* <table style = {{border: "1px solid #828282", marginTop: "40px", width:"900px", textAlign: "center"}}>
                <tr style = {{backgroundColor: "#c1c8e4", border: "1px solid #828282", height:"30px"}}>
                    <th style = {{border: "1px solid #828282"}}>Product Id</th>
                    <th style = {{border: "1px solid #828282"}}>Product Name</th>
                </tr>
                <tr style = {{border: "1px solid #828282", height:"30px"}}>
                    <td style = {{border: "1px solid #828282"}}>Product Name</td>
                    <td style = {{border: "1px solid #828282"}}>Product Name</td>
                </tr>
            </table> */}
        </div>
    )
}

export default Inventory;