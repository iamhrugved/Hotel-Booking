const mongoose = require('mongoose');

let hotelSchema = new mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},
    photos: {type:[String]},
    basePrice: {type:Number}
},
{
    versionKey: false
});

const hotelModel = mongoose.model('Hotel', hotelSchema);
module.exports = hotelModel;