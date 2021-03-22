let express = require('express')
let firebase = require('firebase')
let bodyParser = require('body-parser');
let cors = require('cors')
let path  = require('path')

let app = express()
let port = 5000;
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve('./public')));

let firebaseConfig = {
    apiKey: "AIzaSyDNlnyhStKtfNc1f4LHeI_27UAwBs4XicA",
    authDomain: "cs-soft-eng.firebaseapp.com",
    projectId: "cs-soft-eng",
    storageBucket: "cs-soft-eng.appspot.com",
    messagingSenderId: "142288427446",
    appId: "1:142288427446:web:967a1c8b6a59d7ea32c917",
    measurementId: "G-Q090KBE4EW"
  };

firebase.initializeApp(firebaseConfig);

let db = firebase.database();

function Push(Path,obj){

	db.ref(Path).push(obj)
}

async function Get(Path){
	let ref = db.ref(Path);
	let snapshot  = await ref.orderByChild('cost').equalTo(31).once('value')
	let response = snapshot.val()
	return response;
}

var productTemplate = {
	name:"phone132",
	desciption:"this is a smart phone",
	cost: 31,
	url: "www.google.com"
}
//Push("products",productTemplate)

Get("products").then((x)=>{console.log(x)})


