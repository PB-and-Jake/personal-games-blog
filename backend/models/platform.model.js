const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const platformSchema = new Schema({
    name:{type:String, required:true},
    company:{type:String, required:true},
    abbreviation:{type:String, required:true}
})

const Platform = mongoose.model('Platform', platformSchema);

module.exports = Platform;