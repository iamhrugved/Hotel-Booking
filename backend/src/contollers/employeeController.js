var con = require("../database/mongoConnection");
const Employee = require('../models/employeeModel');
const Hotel = require('../models/hotelModel');
const Room = require('../models/roomModel');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Amenity = require("../models/amenityModel");
const ObjectId = mongoose.Types.ObjectId;
const Booking = require("../models/bookingModel");

exports.signupEmployee = async (req, res) => {
    console.log("req.body ", req.body);
    let saltRounds = 10;
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    try{
        let isUserPresent;
        isUserPresent = await Employee.findOne({email: req.body.email});

        if(isUserPresent) {
            res.status(400).send('Employee already exists!');
        }
        else {
            /* get existing hotel id */
            const hotelName = req.body.hotelName;
            const id = await Hotel.findOne({name: hotelName});

            const newEmployee = new Employee({
                email: req.body.email,
                name: req.body.name,
                password: hashedPassword,
                contactNumber: req.body.contactNumber,
                address: req.body.address,
                hotelId: req.body.hotelId
            });
            newEmployee.save((err, data) => {
                if(err) {
                    console.log('error in saving to db ', err);
                    res.status(500).end('Error occured in saving to db');
                }
                else {
                    console.log('signup employee successful');
                    res.status(200).end('signup employee successful');
                }
            })
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).end('Error in query execution for employee signup ');
    }
}

exports.loginEmployee = async (req, res) => {
    console.log('in login backend req.body ', req.body);
    try {
        let user;
        user = await Employee.findOne({email: req.body.email});
        console.log('user from db ', user);
        console.log('passwords from req.body and db ', req.body.password, user.password);

        let isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if(isPasswordMatch) {
            console.log('passwords matched');
            res.status(200).end('employee credentials match!');
        }
        else {
            console.log('Password does not match ');
            res.status(401).end('Invalid Credentials');
        }
    }
    catch(err) {
        console.log('error ', err);
        res.status(500).end('Error occured');
    }
}

exports.addHotel = async (req, res) => {
    console.log("req.body ", req.body);

    try{

            const newHotel = new Hotel({
                name: req.body.name,
                location: req.body.location,
                description: req.body.description
            });

            newHotel.save((err, data) => {
                if(err) {
                    console.log('error in saving to db ', err);
                    res.status(500).end('Error occured in saving to db');
                }
                else {
                    console.log('Hotel added successfully'+ data);

                    res.status(200).end(JSON.stringify(data));
                }
            })

    }
    catch(err) {
        console.log(err);
        res.status(500).end('Error in query execution for hotel ');
    }
}

exports.getAllHotels = async (req, res) => {
    // console.log("req.body ", req.body);
    // const roomId = req.params.id
    try{

            let hotels  = await Hotel.find();

            if(hotels){
                res.status(200).end(JSON.stringify(hotels));
            } else {
                res.status(500).end('Error occured in fetching hotels data');
            }


    }
    catch(err) {
        console.log(err);
        res.status(500).end('Error in query execution for hotels ');
    }
}

exports.addRoom = async (req, res) => {
    console.log("req.body ", req.body);

    try{

            const newRooom = new Room({
                roomType: req.body.roomType,
                baseRent: req.body.baseRent,
                noOfGuests: req.body.noOfGuests,
                roomCount: req.body.roomCount,
                hotelId: ObjectId(req.body.hotelId)
            });

            newRooom.save((err, data) => {
                if(err) {
                    console.log('error in saving to db ', err);
                    res.status(500).end('Error occured in saving to db');
                }
                else {
                    console.log('Room added successfully');
                    res.status(200).end(JSON.stringify(data));
                }
            })

    }
    catch(err) {
        console.log(err);
        res.status(500).end('Error in query execution for room ');
    }
}


exports.getRoom = async (req, res) => {
    // console.log("req.body ", req.body);
    const roomId = req.params.id
    try{

            let room  = await Room.findById(roomId);

            if(room){
                res.status(200).end(JSON.stringify(room));
            } else {
                res.status(500).end('Error occured in fetching  room data');
            }


    }
    catch(err) {
        console.log(err);
        res.status(500).end('Error in query execution for room ');
    }
}


exports.updateRoom = async (req, res) => {
    console.log("req.body ", req.body);
    const data = req.body;
    try{

        Room.updateOne(
            {_id: data._id},
            {
                $set: {
                  roomType: data.roomType,
                  baseRent: data.baseRent,
                  noOfGuests: data.noOfGuests,
                  roomCount: data.roomCount,
                }
            },
            (err, result) => {
                if(err){
                  console.error("Error while updating room : " + err);
                  res.status(500).end('Error occured in updating to db');
                } else {
                    res.status(200).end(JSON.stringify(data));
                }
            }
            );

    }
    catch(err) {
        console.log(err);
        res.status(500).end('Error in query execution for hotel ');
    }
}

exports.addAmenity = async (req, res) => {
    console.log("req.body ", req.body);

    try{

            const newAmenity = new Amenity({
                name: req.body.name,
                charge: req.body.charge
            });

            newAmenity.save((err, data) => {
                if(err) {
                    console.log('error in saving to db ', err);
                    res.status(500).end('Error occured in saving to db');
                }
                else {
                    console.log('Amenity added successfully'+ data);
                    res.status(200).end(JSON.stringify(data));
                }
            })

    }
    catch(err) {
        console.log(err);
        res.status(500).end('Error in query execution for amenity ');
    }
}


exports.getAmenities = async (req, res) => {
    // console.log("req.body ", req.body);
    // const roomId = req.params.id
    try{

            let amenities  = await Amenity.find();

            if(amenities){
                res.status(200).end(JSON.stringify(amenities));
            } else {
                res.status(500).end('Error occured in fetching amenities data');
            }


    }
    catch(err) {
        console.log(err);
        res.status(500).end('Error in query execution for amenities ');
    }
}


exports.getRoomsByHotelId = async (req, res) => {
    // console.log("req.body ", req.body);
    const hotelId = req.params.id
    try{

            let rooms  = await Room.find({hotelId: hotelId});

            if(rooms){
                res.status(200).end(JSON.stringify(rooms));
            } else {
                res.status(500).end('Error occured in fetching  room data');
            }

    }
    catch(err) {
        console.log(err);
        res.status(500).end('Error in query execution for room ');
    }
}

exports.updateAmenity = async (req, res) => {
    console.log("req.body ", req.body);
    const data = req.body;
    try{

        Amenity.updateOne(
            {_id: data._id},
            {
                $set: {
                  name: data.name,
                  charge: data.charge,
                }
            },
            (err, result) => {
                if(err){
                  console.error("Error while updating room : " + err);
                  res.status(500).end('Error occured in updating to db');
                } else {
                    res.status(200).end(JSON.stringify(result));
                }
            }
            );

    }
    catch(err) {
        console.log(err);
        res.status(500).end('Error in query execution for hotel ');
    }
}


exports.getAllBookings = async (req, res) => {
    // console.log("req.body ", req.body);

    try{

            let bookings  = await Booking.find().sort( { 'created': -1 } );

            if(bookings){
                res.status(200).end(JSON.stringify(bookings));
            } else {
                res.status(500).end('Error occured in fetching  bookings data');
            }


    }
    catch(err) {
        console.log(err);
        res.status(500).end('Error in query execution for bookings ');
    }
}