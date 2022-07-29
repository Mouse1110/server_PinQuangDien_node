const express = require('express');
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");
// config database
const dataController = require("./controller/data.controller");

// mailer
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'canhbaoloisolar@gmail.com',
    pass: 'Canhbao123'
  } 
});

var mailOptions = {
  from: 'canhbaoloisolar@gmail.com',
  to: 'canhbaoloisolar@gmail.com',
  subject: 'Cảnh báo',
  text: 'Hệ thống đang bị mất năng lượng. Xin hãy kiểm tra lại cáp kết nối, bề mặt pin quang điện.'
};


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});


app.get('/data',function(req,res){
  dataController.getLast().then(function(data){
    if (!data){
      res.json({err:1,data:null});
      return;
    }
    var resData = {
      _id : data._id,
      nd:parseFloat(data.nd).toFixed(2),
      bxmt:parseFloat(data.bxmt).toFixed(2),
      cdddd:parseFloat(data.cdddd).toFixed(2),
      cdddtt:parseFloat(data.cdddtt).toFixed(2),
      cstt:parseFloat(data.cstt).toFixed(2),
      csd:parseFloat(data.csd).toFixed(2),
      cb:data.nd<10?0:1,
      dahd:parseFloat(data.dahd).toFixed(2),
    }
    res.json({err:0,data:resData});
  });
    
});

var dataFirst = '';

app.post('/data',function(req,res){
  if (!req.body){
    res.json({err:2});
    return;
  }
  console.log(dataFirst);
  var data = {
    nd:req.body.nd,
    bxmt:req.body.bxmt,
    cdddd:req.body.cdddd,
    cdddtt:req.body.cdddtt,
    cstt:req.body.cstt,
    csd:req.body.csd,
    cb:req.body.cb,
    dahd:req.body.dahd,
  };
  if (dataFirst=== ''){
    dataFirst = data;
    if (parseFloat(dataFirst.cb)>=10){
      try{
        transporter.sendMail(mailOptions)
      } catch (e){
        console.log(e)
      }
      
      dataController.insert(data).then(function(log){
        if(!log){
          res.json({err:1});
          return;
        }
        res.json({err:0});
      });
    } else {
      dataController.insert(data).then(function(log){
        if(!log){
          res.json({err:1});
          return;
        }
        res.json({err:0});
      });
    }
    
  } else {
    if (parseFloat(data.cb) <10){
      dataFirst = '';
    } else {
      dataFirst = data;
    }
    dataController.insert(data).then(function(log){
     
      if(!log){
        res.json({err:1});
        return;
      }
      res.json({err:0});
    });
  }
});

// Mongoose 
const mongoose  = require("mongoose");
mongoose.connect('mongodb+srv://pinquangdien:Yp8qsaISfHr0yssn@cluster0.a4dtz.mongodb.net/pinquangdien?retryWrites=true&w=majority',function(err){
    if (err){
        console.log('err: ',err);
    }else{
        console.log('server mongo connected success');
    }
});

app.listen(PORT, () => {
  console.log(`Example app listening at : ${PORT}`)
});