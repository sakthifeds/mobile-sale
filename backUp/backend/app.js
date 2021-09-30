const express = require('express');

const mongoose = require('mongoose');
const app = express();
const Customerinfo = require('./models/customerinfo')
mongoose.connect("mongodb+srv://sakthi:pOIPm4kE6t9LvvAx@cluster0.ew6vc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(res=>{
    console.log('Connected to database');
})
.catch(()=>{
    console.log('Database connection failed');
});
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products')

//Handles the incoming request
// app.use((req, res, next)=>{
//     console.log('first middleware');
//     next();//it willsend the control to the next middleware
// });
// app.use((req, res, next)=>{
//     console.log('second middleware');
//   res.send('hello from express')
// });
//
app.use((req,res,next) =>{

    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');

    next();
})
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.post('/api/posts',(req, res, next)=>{ 
    console.log('first middleware');
 console.log('req'+JSON.stringify(req.body));
    const post = 
    {
        "mobiles": [{
            "brand": "OPPO",
            "modelno": "",
            "productTitle": "OPPO A74 5G (Fantastic Purple,6GB RAM,128GB      Storage) - 5G Android Smartphone | 5000 mAh Battery | 18W Fast Charge | 90Hz LCD Display",
            "productDescription": [{
                "OS": "Android 11.0",
                "RAM": "4GB",
                "Product Dimensions": "",
                "Item Model No": "",
                "Connectivity Technologies": "4g,WLAN,BLUETOOTH",
                "Camera": "Camera 48MP +5MP + 2MP + 2MP",
                "Display Technology": "LCD",
                "Color": "Black",
                "Batter Power": "6000"
    
            }],
            "productAmount": "17000",
            "image": ""
    
        }]
    
    }

    const customerInfo = new Customerinfo({
        customerFirstName: req.body.firstname,
        customerLastName: req.body.lastName,
        customerEmail: req.body.email,
        customerMobileNo:req.body.phone
    });
    console.log('customerInfo',customerInfo)
    customerInfo.save();    
  res.status(200).json({
    'success':true,
    'message':'submitted'
  });
});


app.get('/api/posts',(req, res, next)=>{
    Customerinfo.find().then(documents=>{
        res.status(200).json({
            'message':'successs',
            'data':documents
        });
    });
 });

module.exports = app;