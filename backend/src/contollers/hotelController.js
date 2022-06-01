const hotelModel = require('../models/hotelModel')
const roomModel = require('../models/roomModel')
const amenityModel = require('../models/amenityModel')
const bookingModel = require('../models/bookingModel')
const customerModel = require('../models/customerModel')
let Holidays = require('date-holidays');
var con = require("../database/mongoConnection");

exports.getHotels = async (req, res) => {
    const { location } = req.query;
    console.log(req.query)
    try {
      const hotels = await hotelModel.find({
        location
      }).limit(req.query.limit);
      console.log(hotels)
      res.status(200).json(hotels);
    } catch (err) {
      console.log(err)
    }
  }

  exports.getHotel = async (req, res, next) => {
    console.log("inside get hotel")
    try {
      const hotel = await hotelModel.findById(req.params.id);
      res.status(200).json(hotel);
    } catch (err) {
      next(err);
    }
  };

  exports.getRooms = async (req, res, next) => {
    console.log("inside get rooms")
    try {
      const rooms = await roomModel.find({hotelId: req.params.id});
      res.status(200).json(rooms);
    } catch (err) {
      next(err);
    }
  };

  exports.getAmenities = async (req, res, next) => {
    console.log("inside get amenities")
    try {
      const amenities = await amenityModel.find();
      res.status(200).json(amenities);
    }
    catch (err) {
      next(err);
    }
  };

  exports.postBooking = async (req, res, next) => {
    console.log("inside post booking")
    console.log(req.body);
    try{
      const newBooking = new bookingModel({
          hotelId: req.body.hotelId,
          hotelName: req.body.hotelName,
          status: req.body.status,
          finalCost: req.body.finalCost,
          customerName: req.body.customerName,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          room: req.body.room,
          noOfGuests: req.body.noOfGuests
      });

      newBooking.save((err, data) => {
          if(err) {
              console.log('error in saving to db ', err);
              res.status(500).end('Error occured in saving to db');
          }
          else {
              console.log('Booking done successfully'+ data);

              
          }
      })
        const uprew = {rewards: req.body.rewards+(req.body.finalCost/10)}
        const cusrew = await customerModel.findOneAndUpdate({name: req.body.customerName}, uprew);
        res.status(200).json(cusrew);
      } 
      
      catch(err) {
        console.log(err);
        res.status(500).end('Error in query execution for Booking ');
      }

    };



  exports.getBooking = async (req, res, next) => {
    console.log("inside get booking")
    console.log(req.params.id);
    try {
      const booking = await bookingModel.find({customerName: req.params.id});
      res.status(200).json(booking);
    } catch (err) {
      next(err);
    }
  };


  exports.putBooking = async (req, res, next) => {
    console.log("inside put booking")
    console.log(req.params.id);
    const can = {status: "Cancelled"}
    try {
      const booking = await bookingModel.findOneAndUpdate({_id: req.params.id}, can);
      res.status(200).json(booking);
    } catch (err) {
      next(err);
    }
  };

  
  exports.getAllHotels = async (req, res) => {
    try {
      const hotels = await hotelModel.find();
      console.log(hotels);
      res.status(200).json(hotels);
    } catch (err) {
      console.log(err)
    }
  }

  exports.getRewards = async (req, res) => {
    try {
      const reward = await customerModel.find({name: req.params.id});
      console.log(reward);
      res.status(200).json(reward);
    } catch (err) {
      console.log(err)
    }
  }

  exports.getDiscounts = async (req, res) => {
    try {
      let surcharge = 0
      const date = new Date(req.body.startDate)
      hd = new Holidays('US', 'la', 'no')
      hd.getHolidays(date.getFullYear());
      if(hd.isHoliday(date)) {
        console.log("loop 1")
        surcharge += 10
      }
      const currentMonth = date.getMonth();
      console.log(currentMonth)
        if(currentMonth === 5 || currentMonth === 6 || currentMonth === 7 || currentMonth === 12) {
          console.log("loop 2")
          surcharge += 10
        }
      res.status(200).json(surcharge);
    } catch (err) {
      console.log(err)
      res.status(404).json(err);
    }
  }