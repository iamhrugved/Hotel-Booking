const mongoose = require('mongoose');

let amenitySchema = new mongoose.Schema({
    name: {type: String, required: true},
    charge: {type: Number, required: true}
},
{
    versionKey: false
});

const amenityModel = mongoose.model('Amenity', amenitySchema);
module.exports = amenityModel;