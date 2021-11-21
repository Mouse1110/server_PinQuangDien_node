const express = require('express');
const app = express();
const cors = require("cors");


app.use(cors());

const PORT = process.env.PORT || 5000;

let arr = [
    {
        _id:'31231',
        nd:45,
        bxmt:10,
        cdddd:5,
        cdddtt:12,
        cstt:20,
        csd:20,
        cb:0,
        dahd:20,
    }
];

app.get('/', (req, res) => {
  res.send('Hello World!')
});
function random(max){
  return Math.floor(Math.random() * max);
}
app.get('/data',function(req,res){
   let data =  {
    _id:`${random(100)}`,
    nd:random(100),
    bxmt:random(100),
    cdddd:random(100),
    cdddtt:random(100),
    cstt:random(100),
    csd:random(100),
    cb:random(2),
    dahd:random(100),
};
    res.json(data);
});

app.post('/data',function(req,res){
  
});

app.listen(PORT, () => {
  console.log(`Example app listening at : ${PORT}`)
});