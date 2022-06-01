import "./booking.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
// import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import axios from "axios";
import moment from "moment";


const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [rerender, setRerender] = useState(false);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [rewards, setRewards] = useState(0);

  // const { data, loading, error } = useFetch(`/hotels/booking/${customerName}`);
  const { data, loading, error } = useFetch(`/hotels/booking/${localStorage.getItem('name')}`);

  useEffect(() => {
    axios.get(`/hotels/rewards/${localStorage.getItem('name')}`)
        .then(function (response) {
            // I need this data here ^^
            console.log(response.data);
            setRewards(response.data[0].rewards)
        })
        .catch(function (error) {
            console.log(error);
        });
        
  }, []);
  // const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);
  console.log(data);
  console.log(rewards);
  // const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  // function dayDifference(date1, date2) {
  //   const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  //   const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  //   return diffDays;
  // }

  // const days = dayDifference(dates[0].endDate, dates[0].startDate);

  // const handleOpen = (i) => {
  //   setSlideNumber(i);
  //   setOpen(true);
  // };

  // const handleMove = (direction) => {
  //   let newSlideNumber;

  //   if (direction === "l") {
  //     newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
  //   } else {
  //     newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
  //   }

  //   setSlideNumber(newSlideNumber);
  // };

  const handleClick = (e) => {
    // e.preventDefault()
    // if (user) {
    //   setOpenModal(true);
    // } else {
      console.log(e);
      // console.log(e.target.value);
      axios.put(`/hotels/booking/${e}`)
      .then((res) => {
        alert('Reservation Cancelled!');
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })
      setRerender(!rerender);
      // setOpenModal(true);
      // navigate("/login");
    // }
  };

  const handleHome = () => {
    
    navigate("/customer");
 
  };


  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) :(
        <div className="hotelContainer">
           <div className="hotelWrapper">
            
          {data.map((item) => (
             <div className="col">
              <div className="hotelDetailsTexts">
                 <h1 className="hotelTitle">{item.hotelName}</h1>
                 <p className="hotelDesc">Customer: {item.customerName}</p>
                 {item.room.map((r) => (
                   <span className="hotelDesc">{r.Room}: {r.Guests} &nbsp;&nbsp;&nbsp;</span>
                 ))}
                 <p className="hotelDesc">No. of Guests: {item.noOfGuests}</p>
                 <p className="hotelDesc">Reserved From: {moment(item.startDate).format('MM-DD-YYYY').toString()} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Reserved Till: {moment(item.endDate).format('MM-DD-YYYY').toString()}</p>
                 <p className="hotelDesc">Amount Paid: ${item.finalCost}</p>
                 <p className="hotelDesc">Booking Status: {item.status}</p>
                 <button className="can" onClick={() => { handleClick(`${item._id}`) }}>Cancel Reservation</button>
               </div>
            
               </div>
            
          ))}   
          <div className="bookNow">
              <div className="hotelDetailsTexts">
              </div>

              <div className="hotelDetailsPrice">
                <p className="hotelTitle">
                  Your Rewards
                </p>
                  <h2>
                  <b>{rewards.toFixed(0)}</b>
                  
                  </h2>
                <button onClick={handleHome}>Use Your Rewards on Booking!</button>
              </div>
            </div>  
          
          </div> 
             
          <MailList />
          <Footer />
        </div>
      )
      }
    </div>
  );
};

export default Hotel;
