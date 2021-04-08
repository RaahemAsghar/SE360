import firebase from "firebase"

let firebaseConfig = {
    apiKey: "AIzaSyB0tpxxFNyI3ktDvOxqKpkiY9gxkrbSeVI",
    authDomain: "software-engineering-123.firebaseapp.com",
    databaseURL: "https://software-engineering-123-default-rtdb.firebaseio.com",
    projectId: "software-engineering-123",
    storageBucket: "software-engineering-123.appspot.com",
    messagingSenderId: "358980638650",
    appId: "1:358980638650:web:6e0bfb2afbe58da05f6f83",
    measurementId: "G-Y3345Q4E33"
  };

  const fireApp = firebase.initializeApp(firebaseConfig);

  export {fireApp}