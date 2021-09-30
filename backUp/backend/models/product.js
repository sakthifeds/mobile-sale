const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: {
        type: String
      
    },
    description: {
        type: String
      
    },
    richDescription: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    images: [{
        type: String
    }],
    brand: {
        type: String,
        default: ''
    },
    price : {
        type: Number,
        default:0
    },
    category: {
        type: String
       
        
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})

// productSchema.virtual('id').get(function () {
//     return this._id.toHexString();
// });

// productSchema.set('toJSON', {
//     virtuals: true,
// });
// category: {
//     //type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category',
//     required:true
// },

exports.Product = mongoose.model('Product', productSchema);