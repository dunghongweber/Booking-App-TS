import { motion } from "framer-motion";
import "./RejectBooking.css";
import { useEffect, useState } from "react";
import {useAppDispatch, useAppSelector } from '../../../app/hooks';
import {closeReject, getBookings, removeActiveBooking, adminRejectBooking, selectActiveBooking} from "../../../features/booking/bookingSlice"
import M from "materialize-css";

const RejectBooking = () => {
    // auto init all materialize CSS, for easy use
    useEffect(() => {
        M.AutoInit();
    }, []);

    const dispatch = useAppDispatch();

    //data for reject reason
    const [rejectReason, setRejectReason] = useState("");
    //data for id
    let activeId = useAppSelector(selectActiveBooking);
    

    //cancle creating reject booking
  const handleOnClickCancel = () => {
    dispatch(closeReject());
  };

  //submit reject booking to server, POST request
  const handleOnSubmit = () => {

    const rejectData = {
      id: activeId?._id,
      rejectReason
    }

    //dispatch a reject reducer
    dispatch(adminRejectBooking(rejectData))
    .then(() => {
      //update current bookings list
      dispatch(getBookings()).then(() =>{
        dispatch(removeActiveBooking);
      });
      dispatch(closeReject());
    })
    
    
  };

  //framer-motion variant
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  return (
    <motion.div
      className="modal-custom modal-custom-l"
      onClick={(e) => e.stopPropagation()}
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="modal-content">

        <h4>Reject Booking</h4>
        <div className="input-field col s12">
          <input id="event-location" type="text" onChange={(e) => setRejectReason(e.target.value)}/>
          <label htmlFor="disabled">Reason of Rejection</label>
        </div>

        <div className="row">
            <div className="col s6">
                <button
                className="btn red"
                onClick={() => handleOnClickCancel()}
                >
                Cancle
                </button>
            </div>
            <div className="col s6">
                <button
                className="btn"
                onClick={() => handleOnSubmit()}
                >
                Confirm
                </button>
            </div>
        </div>
      </div>

    </motion.div>
  );
};

export default RejectBooking;