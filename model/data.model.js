var mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    nd:Number,
    bxmt:Number,
    cdddd:Number,
    cdddtt:Number,
    cstt:Number,
    csd:Number,
    cb:Number,
    dahd:Number,
});

module.exports = mongoose.model('data',dataSchema);