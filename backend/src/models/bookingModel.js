const mongoose = require('mongoose');

let bookingSchema = new mongoose.Schema({
    hotelId: {type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true},
    hotelName: {type: mongoose.Schema.Types.String},
    status: {type: String},
    finalCost: {type: Number, required: true},
    customerName: {type: mongoose.Schema.Types.String},
    startDate: {type: Date},
    endDate: {type: Date},
    room: {type:[{"Room": String,"Guests": Number}]},
    noOfGuests: {type: Number},
    created: {type: Date, default: Date.now}
},
{
    versionKey: false,
    
},);

const bookingModel = mongoose.model('Booking', bookingSchema);
module.exports = bookingModel;