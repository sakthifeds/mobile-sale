const Customers = require("../models/customerinfo");
//const jwt = require("jsonwebtoken");

exports.createCustomers = (req, res, next) => {
    Customers.find( 
        { $or: [{ customerEmail: req.body.customerEmail}, {customerMobile: req.body.customerMobileNo}]}, function (err, custItems) {
        // Make sure user doesn't already exist
        if (custItems && custItems.length > 0) {
            if (custItems[0].customerEmail === req.body.customerEmail) {
                console.log(custItems[0].customerEmail);
                return res.status(400).send({ 
                    success:false,
                    message: "The Email Id you have entered is already associated with another account." 
                });
            } else {
                console.log(custItems[0].customerMobileNo);
                return res.status(400).send({ 
                    success:false,
                    message: "The Mobile No. you have entered is already associated with another account." 
                });
            }
        }
        else {
            const custs = new Customers({
                customerFirstName: req.body.customerFirstName,
                customerLastName: req.body.customerLastName,
                customerMobileNo:req.body.customerMobileNo,
                customerEmail: req.body.customerEmail,
                customerPassword: req.body.customerPassword,
                customerAddress:req.body.customerAddress,
                street:req.body.street,
                city:req.body.city,
                zipcode:req.body.zipcode
               });
            custs.save().then(createdCusts => {
                res.status(201).json({
                    success:true,
                    message: "Registration successful. Please go to login page",
                    custlists: {
                        ...createdCusts
                    }
                });
            })
            .catch(error => {   
                console.log(error);
                res.status(500).json({
                    success:false,
                    message: "Registration is not successfull!"
                });
            });
        }

    });
};

exports.loginCustomer =async(req, res, next) => {

    const user = await Customers.findOne({customerEmail: req.body.customerEmail});
    let isAdmin =false;
    if(req.body.customerEmail.includes("admin") ){
        isAdmin =true;
    }
    if(!user){
        return res.status(400).json({
            success:false,
            message:"User Not found",
            isAdmin:isAdmin
        });
    }

    return res.status(200).json({
        success:true,
        message:"login successful",
        isAdmin:isAdmin
    });

    // Customers.findOne ( { customerEmail: req.body.customerEmail}, '+customerPass', function (err, custLog) {
    //     if (custLog) {
    //         custLog.comparePassword(req.body.customerPass, function (err, isMatch) {
    //             console.log(custLog,isMatch);
    //             if (!isMatch) {
    //                 return res.status(401).json({message: 'Please enter your valid password'});
    //             } else {
    //                 const token = jwt.sign(
    //                     { email: custLog.customerEmail, userFname: custLog.customerFirstName, userMname: custLog.customerMiddleName, userLname: custLog.customerLastName },
    //                     'hi',
    //                     { expiresIn: "1h" }
    //                 );
    //                 res.status(200).json({
    //                     token: token,
    //                     expiresIn: 3600,
    //                     success:true,
    //                     email: custLog.customerEmail,
    //                     custFname: custLog.customerFirstName,
    //                     custMname: custLog.customerMiddleName,
    //                     custLname: custLog.customerLastName
    //                 });
    //             }
    //         });
    //     } else {
    //         res.status(500).json({
    //             success:false,
    //             message: "Please enter your valid email id."
    //         });
    //     }
    // });
};