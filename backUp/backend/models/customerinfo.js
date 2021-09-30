const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');

const customerSchema = mongoose.Schema({

  //  customerPass: { type: String, required: true, select: false },
    customerFirstName: { type: String, required: true },
    customerLastName: { type: String, required: true },
    customerMobileNo:{type:Number, required:true},
    customerEmail: { type: String, required: true, lowercase: true, unique: true },
    customerPassword: { type: String, required: true },
    customerAddress:{ type: String, required: true },
    street:{ type: String, required: true },
    city:{ type: String, required: true },
    zipcode:{ type: Number, required: true }     
   
});


/* 
**To use our schema definition, we need to convert our categoriesSchema into a Model we can work with.
so it's this model which I'll export with the help of the module.exports syntax.
Now this mongoose model can be used outside of this model file
*/

//use it in app.js for API request
module.exports = mongoose.model('Customerinfo', customerSchema);