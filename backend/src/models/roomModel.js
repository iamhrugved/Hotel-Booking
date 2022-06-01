const mongoose = require('mongoose');

let roomSchema = new mongoose.Schema({
    roomType: {type: String, required: true},
    baseRent: {type: Number, required: true},
    noOfGuests: {type: Number, required: true},
    roomCount: {type: Number, required: true},
    hotelId: {type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true}
},
{
    versionKey: false
});

const roomModel = mongoose.model('Room', roomSchema);
module.exports = roomModel;