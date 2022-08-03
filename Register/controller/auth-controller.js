const User = require('../models/user');
const Invoice = require('../models/invoice');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const {json} = require("express");


function login(req, res) {
    return res.render('login');
}

async function loginPost(req, res) {
    const email = req.body.email || '';
    const password = req.body.password || '';

    if(!email || !password) {
       return res.render('login', {
            errors: ['Invalid Email or Password']
        });
    }
    const user = await User.getByEmail(email);
    if (!user) {
        return res.render('login', {
            errors: ['Incorrect Email']
        });
    }
        if (!(await bcrypt.compare(password, user.password))){
            return res.render('login',{
                errors:['Incorrect Password']
            });
        }
        req.session.user = user;

   return res.redirect('/auth/home');
}

function register(req, res){
    return res.render('register');
}

async function registerPost(req, res){
    const name = req.body.name || '';
    const lastname = req.body.lastname || '';
    const age = Number(req.body.age || 0);
    const email = req.body.email || '';
    const password = req.body.password || '';


    if(!name || !lastname || !age || !email || !password){
        return res.render('register',{
            errors: ['User of this Email already exists']
        });
    }
    const user = await User.getByEmail(email);
    if(user){
        return res.render('register',{
            errors:['User of this Email already exists']
        });
    }

    const newUser = new User(name, lastname, age, email, password);
    req.session.user = newUser;
    console.log(newUser);
    await newUser.save();

    return res.redirect('/auth/home');
}

async function transfer(req, res) {
    console.log(req.session.user);

    const money = req.body.money || '';
    const email = req.session.user.email || '';
    const name = req.session.user.name || '';
    const lastname = req.session.user.lastname || '';
    const nameClient = req.body.name || '';
    const lastnameClient = req.body.lastname || '';
    const emailClient = req.body.email ||  '';
    const payment_date = new Date();


    if(!money || !email) {
      return  res.render('login', {
            errors:['Stop']
        });
    }

    const user = await User.getByEmail(email);
    if(!user) {
        return res.render('login', {
            errors:['No!']
        });
    }

    const userClient = await User.getByEmailClient(req.body.email);

    console.log("user",userClient)





    const newInvoice = new Invoice(money, email, name, lastname, nameClient, lastnameClient, emailClient, payment_date);
    newInvoice.name_client = userClient.name;
    newInvoice.lastname_client = userClient.lastname;
    console.log(newInvoice);
    await main(newInvoice)

    await newInvoice.save();

    res.send('The transfer successful');
}
 async function main(invoice){
    const transport = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }

    });

     await transport.sendMail({
         from: invoice.email,
         to: invoice.emailClient,
         subject: "Payment Invoice",
         text: JSON.stringify({
             from: `${invoice.name} ${invoice.lastname} ${invoice.email}`,
             money: `${invoice.money}`,

         }),
     });

}

module.exports = {
    login,
    loginPost,
    register,
    registerPost,
    transfer,

}