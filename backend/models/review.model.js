const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    title:{type:String, required:true},
    platform:{type:String, required:true},
    details:{type:String},
    review:{type:String},
    score:{type:Number, required:true, min:1, max:10},
    date:{type:Date, required:true},
    completed:{type:Boolean, default:false, required:true}
},{
    timestamps:true,
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;