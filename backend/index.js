const express = require('express')
const app = express()
var cors = require('cors')
const port = 80
const bodyParser = require("body-parser");
const { response } = require('express');
const router = express.Router();

const Model = require('./userschema');
const db = require('./db')

var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(express.static('../frontend/build/')); 
app.use(express.json());   
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());



var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'siddharthsmtp5@gmail.com',
    pass: 'czocvmmjwtozdhew'
  }
});


app.get('*', async (req, res) => {
  res.sendFile('../frontend/build/index.html');
});

app.post('/login',async (req, res) => {
    
   var emailH = req.body.email;  
   var passH = req.body.pass; 
   
   
   const data = new Model({
    email: req.body.email,
    pass: req.body.pass

    })

    try 
      {

      const isExisting = await data.collection.findOne({email : req.body.email});
      if(isExisting){
        if(isExisting.email ==emailH && isExisting.pass == passH)
        {

          console.log(isExisting);
          return res.send(isExisting);
        }
        return res.send(false);
      }

    }
    catch (error) 
      {
        res.status(400).json({message: error.message})
      }


    res.status(200).send(false);
    
});

app.post('/signup',async (req,res) => {
  var fullnameH = req.body.fullname;
  var emailH = req.body.email;
  var passH = req.body.pass;

  
  const data = new Model({
    fullname: req.body.fullname,
    email: req.body.email,
    pass: req.body.pass

    })

    try 
      {

      const isExisting = await data.collection.findOne({email : req.body.email});
      if(isExisting){

        return res.send(false);
      }

        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
        var datahtml = `
                        <h1>Welcome</h1>
                        <h3>Your Id Id And Password For Login </h3>
                        <h4>Full Name : ${fullnameH}</h4>
                        <h4>Email : ${emailH}</h4>
                        <h4>Password : ${passH}</h4>
                        `;
                        console.log(datahtml);

        var mailOptions = {
          from: 'siddharth',
          to: emailH,
          subject: 'Login Credentials',
          html: datahtml
          

          
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }
    catch (error) 
      {
        res.status(400).json({message: error.message})
      }


});

app.listen(port, () => {
  console.log(`localhost:${port}`)
})