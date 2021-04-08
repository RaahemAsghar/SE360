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

firebase.initializeApp(firebaseConfig);

let db = firebase.database();

let data = {
    urls : ["https://firebasestorage.googleapis.com/v0/b/software-engineering-123.appspot.com/o/tricycle.jpg?alt=media&token=73107bbe-5dc0-4613-9f6c-7f6db61dd892", "https://firebasestorage.googleapis.com/v0/b/software-engineering-123.appspot.com/o/Axe-Africa-Body-Spray-150ml.jpg?alt=media&token=f5a1a4d4-cf29-4b34-bff7-c3eba4a720bf", "https://firebasestorage.googleapis.com/v0/b/software-engineering-123.appspot.com/o/Cricket%20Bat.jpg?alt=media&token=a33d3af5-1890-4a35-8685-4855ec9cf1d6", "https://firebasestorage.googleapis.com/v0/b/software-engineering-123.appspot.com/o/DellLatitude14-5480__1_.jpg?alt=media&token=a48e30e2-e631-4d10-86e6-7df33b0fafb5", "https://firebasestorage.googleapis.com/v0/b/software-engineering-123.appspot.com/o/Ray%20Ban.jpg?alt=media&token=e51c3e0d-3f18-4b4e-a349-3cb4b59bee0c","https://firebasestorage.googleapis.com/v0/b/software-engineering-123.appspot.com/o/STudy%20table.jpg?alt=media&token=5b12bb70-c2f0-4c68-844a-9cdcff74a134","https://firebasestorage.googleapis.com/v0/b/software-engineering-123.appspot.com/o/gucci%20handbag.jpg?alt=media&token=8226151d-669c-4ec3-b277-d3362e6d621e","https://firebasestorage.googleapis.com/v0/b/software-engineering-123.appspot.com/o/kettle.jpg?alt=media&token=853cdc22-5501-4ff2-9052-c89a4e5e67c1", "https://firebasestorage.googleapis.com/v0/b/software-engineering-123.appspot.com/o/makeup.webp?alt=media&token=e5be61c9-7763-41c3-a6ac-ef6cf3d19729", "https://firebasestorage.googleapis.com/v0/b/software-engineering-123.appspot.com/o/nike%20shoes.jpg?alt=media&token=49ae7986-c612-4664-bb8d-ce2a3bf13bbb","https://firebasestorage.googleapis.com/v0/b/software-engineering-123.appspot.com/o/tamp.webp?alt=media&token=b015999f-5cf0-49ba-ba85-06965624bd88","https://firebasestorage.googleapis.com/v0/b/software-engineering-123.appspot.com/o/teddy%202.jpg?alt=media&token=7aa554a4-b811-4830-954f-ae02249bf136","https://firebasestorage.googleapis.com/v0/b/software-engineering-123.appspot.com/o/dawn%20bread.webp?alt=media&token=2556c38b-69ac-4896-8bc2-7d0cd922e3cf"],
    names : ["Tricycle","Axe Body Spray","CA Cricket Bat","Dell Latitude 5480", "Ray Ban Glasses","Study Table","Gucci Handbag","Kettle","Makeup","Nike Shoes","Table Lamp","Stuffed Teddy Bear","Dawn Bread"],
    brand_names : ["None","Axe","CA","Dell","Ray Ban","None","Gucci","Kenwood","L'Oreal","Nike","None","Orange Toys","Dawn"],
    categories : ["Toys","Men","Sports","Electronics","Men","Furniture","Women","Electronics","Women","Men","Furniture","Toys","Groceries"],
    prices : [10500,550,1220,175000,10300,25000,12000,3500,32000,10500,7500,4500,100],
    leftOvers : [5,10,3,7,2,3,6,2,2,4,3,2,7],
    totalSold : [2,6,7,3,10,2,12,6,3,10,2,11,18],
    discount : [0,0,50,0,80,0,100,0,0,150,0,100,0],
    rating : [4.5,4.7,4.8,4.3,4.4,3.9,4.2,3.8,4.1,4.6,3.5,4.2,4.5],
    descriptions : ["Fun Tricycle for kids","Body Spray for Men","Superb Cricket Bat for the best players","14 inch Business Laptop","Glasses for fashion-crazy men","Wooden Study Table for students","Luxury Handbag for Ladies","Portable Kettle","Makeup Kit for Ladies","Sneakers for athletes","Table Lamp for your side Table","Cute and Soft Stuffed Teddy bear","Plain Bread for daily use"],
}
    
for (let i = 0; i<data.urls.length; i++){
    let product = {
        name: data.names[i],
        brand_name: data.brand_names[i],
        category: data.categories[i],
        price: data.prices[i],
        stock_left: data.leftOvers[i],
        total_sold: data.totalSold[i],
        discount: data.discount[i],
        rating: data.rating[i],
        url: data.urls[i],
        description: data.descriptions[i],
    }
    db.ref("products").push(product);
}

app.listen(port,()=>{console.log(`listening at localhost:${port}`)})