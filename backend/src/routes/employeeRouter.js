var employeeController = require('../contollers/employeeController');
var express = require('express');

var router = express.Router();

router.post('/signupEmployee', employeeController.signupEmployee);
router.post('/loginEmployee', employeeController.loginEmployee);
router.post('/addHotel', employeeController.addHotel);
router.post('/addRoom', employeeController.addRoom);
router.get('/room/:id', employeeController.getRoom);
router.get('/hotels', employeeController.getAllHotels);
router.put('/updateRoom', employeeController.updateRoom);
router.post('/addAmenity', employeeController.addAmenity);
router.get('/amenities', employeeController.getAmenities);
router.put('/amenity', employeeController.updateAmenity);
router.get('/rooms/:id', employeeController.getRoomsByHotelId);
router.get("/bookings/", employeeController.getAllBookings);

module.exports = router;