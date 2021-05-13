const { user } = require('../models/user');
const createUserValid = (req, res, next) => {  
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneNumberStartWith = '+380'
    const { email, phoneNumber, firstName, lastName, password } = req.body
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = password;

    if (user.email && user.phoneNumber && user.firstName && user.lastName && user.password) {
        const isEmail = emailReg.test(String(user.email).toLowerCase());
        const emailIsGmail = user.email.indexOf('@gmail.com') !== -1;
        const phoneNumberValid = user.phoneNumber.startsWith(phoneNumberStartWith);
        const emailValid = isEmail && emailIsGmail;

        if(req.body.id){
            res.body = res.status(400).json({
                error: true,
                message: "id should not be present in body"
            })
        }

        if (emailValid && phoneNumberValid) {

            req.body = {
                email: user.email, 
                phoneNumber: user.phoneNumber, 
                firstName: user.firstName, 
                lastName: user.lastName, 
                password: user.password
            }
            next();
        } else {
            res.body = res.status(400).json({
                error: true,
                message: "Email or phone number is not valid"
            })
            next(res.body);
        }
    }else{
        res.body = res.status(400).json({
            error: true,
            message: "User entity to create is not valid"
        })
        next(res.body);
    }
}

const updateUserValid = (req, res, next) => {
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneNumberStartWith = '+380';
    const fieldsToBeUpdated = ["email", "phoneNumber", "firstName", "lastName", "password"];
    const { email, phoneNumber, firstName, lastName, password } = req.body
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = password;
    
    for (let [key, value] of Object.entries(req.body)) {
        if (!fieldsToBeUpdated.includes(key)) {
            res.body = res.status(400).json({
                error: true,
                message: `Request body contains unknown property: ${key}`
            });
        }
    }

    if(req.body.id){
        res.body = res.status(400).json({
            error: true,
            message: "id should not be present in body"
        })
    }

    if (user.email && user.phoneNumber && user.firstName && user.lastName && user.password) {
        const isEmail = emailReg.test(String(user.email).toLowerCase());
        const emailIsGmail = user.email.indexOf('@gmail.com') !== -1;
        const phoneNumberValid = user.phoneNumber.startsWith(phoneNumberStartWith);
        const emailValid = isEmail && emailIsGmail;

        if (emailValid && phoneNumberValid) {
            res.body = {     
                email : user.email,
                phoneNumber : user.phoneNumber,
                firstName : user.firstName,
                lastName : user.lastName,
                password : user.password,}
            next();
        } else {
            res.body = res.status(400).json({
                error: true,
                message: "Email or phone number is not valid"
            })
            next(res.body);
        }
    }else{
        res.body = res.status(400).json({
            error: true,
            message: "User entity to create is not valid"
        })
        next(res.body);
    }
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;