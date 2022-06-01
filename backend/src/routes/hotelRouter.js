const express = require('express');
const { getHotels, 
    getHotel, 
    getRooms, 
    postBooking, 
    getBooking, 
    putBooking, 
    getAllHotels, 
    getAmenities, 
    getRewards, 
    getDiscounts } =  require("../contollers/hotelController");

const router = express.Router();

// //CREATE
// router.post("/", createHotel);

// //UPDATE
// router.put("/:id", updateHotel);
// //DELETE
// router.delete("/:id", deleteHotel);
// //GET

// router.get("/find/:id", getHotel);
//GET ALL

router.get("/", getHotels);
router.get("/find/:id", getHotel);
router.get("/rooms/:id", getRooms);
router.get("/amenities", getAmenities)
router.post("/booking/:id", postBooking);
router.get("/booking/:id", getBooking);
router.put("/booking/:id", putBooking);
router.get("/allHotels", getAllHotels);
router.get("/rewards/:id", getRewards);
router.get("/setRewards/:id", getRewards);
router.post("/getDiscounts/", getDiscounts);
// router.get("/countByCity", countByCity);
// router.get("/countByType", countByType);
// router.get("/room/:id", getHotelRooms);

module.exports = router;
