import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
modalHeader: {
  padding: "2px 16px",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  color: "white",
  backgroundColor: "#355093",
  
},

/* Modal Body */
modalBody: {
    padding: "2px 16px",
    backgroundColor: "#FFFFFF",
},

/* Modal Footer */
modalFooter: {
  padding: "2px 16px",
  backgroundColor: "#FFFFFF",
  color: "white",
  alignItems:"center",
},

/* Modal Content */
modalContent: {
  position: "relative",
  backgroundColor: "#fefefe",
  margin: "auto",
  padding: "0",
  border: "1px solid #888",
  width: "39%",
  height:"42%",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)",
  transform:"translateX(35px) translateY(180px)",
  borderRadius: "20px",
},

  }));

function Popup ({router}) {
    const classes = useStyles(); 
    return (
        <div className={classes.modalContent}>
  <div className={classes.modalHeader}>
    <h2 style={{fontSize:"24px", textAlign:"center", marginTop:"2.5px"}}>Success</h2>
  </div>
  <div className={classes.modalBody}>
    <p style={{transform:"translateY(40px)", textAlign:"center", fontFamily:"IBM Plex Sans"}}>Product added successfully!</p>
    <p style={{transform:"translateY(40px)", textAlign:"center", fontFamily:"IBM Plex Sans"}}>Press return to go back to previous screen...</p>
  </div>
  <div className={classes.modalFooter}>
  <input type = "submit" value = "Return" style = {{width: "80px", height:"38px", backgroundColor: "#5AB9EA", border: "none", borderRadius: "15px",marginLeft:"145px", marginTop:"60px", fontWeight:"bold",borderRadius:"10px"}}></input>
  </div>
  
</div>
    )
}

export default Popup;