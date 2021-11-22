const dataModel = require("../model/data.model");

module.exports.insert = async function(data){
    if (!data){
        return false;
    } 
    var dataNew = new dataModel({
        nd:data.nd,
        bxmt:data.bxmt,
        cdddd:data.cdddd,
        cdddtt:data.cdddtt,
        cstt:data.cstt,
        csd:data.csd,
        cb:data.cb,
        dahd:data.dahd,
    });
   await dataNew.save(function(err,result){
        if(!result){
            return false;
        } 
        return true;
    });
}

module.exports.getLast = async function(){
    var data = await dataModel.find({});
    if (!data){
        return data;
    }
    return data[data.length-1];
}