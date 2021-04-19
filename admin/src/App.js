import React from 'react'
import Home from './Home.js'
import Homepage from './Homepage.js'
import Sidebar from './Sidebar.js'
import Login from './Login.js'
import Navbars from './Navbars'
import Main from './main.js';

let temp = [];
function App() {
  return(
    <div>
      {/* <Home/> */}
      <Main tempList = {temp}/>
      {/* <Sidebar/> */}
      {/* <Login/> */}
    </div>
  );
}

export default App;

