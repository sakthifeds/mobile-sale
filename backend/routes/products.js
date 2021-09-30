const {Product} = require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/uploads')
//     },
//     filename: function (req, file, cb) {
//       const fileName = file.originalname;//.split(' ').join('-');
//       cb(null, fileName + '-' + Date.now());
//     }
//   })
  
//   const uploadOptions = multer({ storage: storage })

//Get All products
router.get(`/`, async (req, res) =>{
    // localhost:3000/api/v1/products?categories=2342342,234234
    let filter = {};
    let productList
    if(req.query.categories && req.query.categories!=='HOME')
    {
         filter = {category: req.query.categories.split(',')}
         productList = await Product.find(filter);
    }else{

        productList = await Product.find();
    }

     

    if(!productList) {
        
        res.status(500).json({success: false})
    } 
    res.send(productList);
})

//Get an specific Product
router.get(`/:id`, async (req, res) =>{
    const product = await Product.findById(req.params.id).populate('category');

    if(!product) {
        res.status(500).json({success: false})
    } 
    res.send(product);
})

//upload new Product
//router.post(`/`,uploadOptions.single('image'), async (req, res) =>{
router.post(`/`, async (req, res) =>{
  //  const category = await Category.findById(req.body.category);
   // if(!category) return res.status(400).send('Invalid Category')
 //  const fileName = req.file.filename;
  const fileName = req.body.image;
  console.log('rq body0',req.body);
    console.log('check',fileName)
    console.log('rq body12',req.body.productName);
    const basepath = `${req.protocol}://${req.get('host')}/public/uploads/` 
    let product = new Product({
        productName: req.body.productName,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basepath}${fileName}`,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        addedToCart:req.body.isFeatured
    })
console.log ('product craeted00',product)
    product = await product.save();

    if(!product) 
    return res.status(500).send('The product cannot be created')

    res.send(product);
})

router.put('/addToCart/:id',async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id)) {
       return res.status(400).send('Invalid Product Id')
    }
    // const category = await Category.findById(req.body.category);
    // if(!category) return res.status(400).send('Invalid Category')

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
           
            addedToCart:req.body.addedToCart
        },
        { new: true}
    )

    if(!product)
    return res.status(500).send('the product cannot be updated!')

    res.send(product);
})

router.delete('/:id', (req, res)=>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product) {
            return res.status(200).json({success: true, message: 'the product is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "product not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

router.get(`/get/count`, async (req, res) =>{
    const productCount = await Product.countDocuments((count) => count)

    if(!productCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        productCount: productCount
    });
})

router.get(`/get/featured/:count`, async (req, res) =>{
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured: true}).limit(+count);

    if(!products) {
        res.status(500).json({success: false})
    } 
    res.send(products);
})

module.exports =router;