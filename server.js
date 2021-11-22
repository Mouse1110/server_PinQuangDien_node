const express = require('express');
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");
// config database
const dataController = require("./controller/data.controller");

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
    res.json({err:0,data:data});
  });
    
});

app.post('/data',function(req,res){
  if (!req.body){
    res.json({err:2});
    return;
  }
  var data = {nd:req.body.nd,
    bxmt:req.body.bxmt,
    cdddd:req.body.cdddd,
    cdddtt:req.body.cdddtt,
    cstt:req.body.cstt,
    csd:req.body.csd,
    cb:req.body.cb,
    dahd:req.body.dahd,};
  dataController.insert(data).then(function(log){
    console.log(log);
    if(!log){
      res.json({err:1});
      return;
    }
    res.json({err:0});
  });
});

// Mongoose 
const mongoose  = require("mongoose");
mongoose.connect('mongodb+srv://pinquangdien:cKCKJdzuBUarNx5L@cluster0.a4dtz.mongodb.net/pinquangdien?retryWrites=true&w=majority',function(err){
    if (err){
        console.log('err: ',err);
    }else{
        console.log('server mongo connected success');
    }
});

app.listen(PORT, () => {
  console.log(`Example app listening at : ${PORT}`)
});