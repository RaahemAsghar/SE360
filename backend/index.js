let express = require('express')
let firebase = require('firebase')
//let bodyParser = require('body-parser');
let cors = require('cors')
let path  = require('path')
const port = 8000;

let app = express()

app.use(cors())
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve('./public')));

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


let productTemplate = {
  name:"Dell Latitude-5880",
  brand_name: "Dell",
  category:"Electronics",
  price:3000,
  stock_left: 5,
  total_sold: 0,
  discout: 0,
  rating:2,
  url:"https://i.gadgets360cdn.com/products/laptops/large/1525206065_635_inspiron-5559.jpg?downsize=*:180&output-quality=80&output-format=webp",
  description: "laptop featuring ci7 and SSD "
}

let userTemplate = {
  email: "hamza123@gmail.com",
  name: "Hamza Shahzad",
  password: "123456",
  city: "Lahore",
  address: "Fairyland close to demon castle Mars",
  contact: "03014598454",
  news_letter: false
}
let reviewTemplate = {
  product_name: "Dell Latitude-5880",
  email: "hamza123@gamil.com",
  rating: 4,
  comments: "this is a nice product"
} 

let wishlistTemplate={ 
  email: "hamza",
  product_name: ["Dell Latitude 980","Dell Latitude 780","Dell Latitude 680"],
  wished: true
}

let categoriesTemplate = ["Groceries","Electronics","Sports","Toys","Men","Women","Furniture"]

let adminDetailTemplate = {
  email: "king@storex.com",
  password: "123456",
  name: "king"
}

let complaintTemplate = {
  user_email: "hamza@gmail.com",
  comments: "I got a faulty product"
}

let pendingOrderTemplate = {
  user_email: "hamza@gmail.com",
  products: ["Dell Latitude 5880","Sony Xperia 321","ps5 digital edition"] 
}

let TransactionTemplate = {
  user_email: "hamza@yahoo.com",
  products: ["Dell Latitude 5880","Sony Xperia 321","ps5 digital edition"],
  date: "06/2/2021",
  bill: 100000 
}

firebase.initializeApp(firebaseConfig);

let db = firebase.database();

// db.ref(Path).push(obj)
// db.ref("products").once('value').then((snap)=>{
//   let obj = snap.val();
//   let values = Object.keys(obj).map((key)=>obj[key]) 
//   console.log(values);
// })

app.get('/products',(req,res)=>{

  db.ref("products").once('value').then((snap)=>{
       let obj = snap.val();
       let values = Object.keys(obj).map((key)=>obj[key]) 
       res.send(JSON.stringify(values));
     })
})



app.listen(port,()=>{console.log(`listening at localhost:${port}`)})