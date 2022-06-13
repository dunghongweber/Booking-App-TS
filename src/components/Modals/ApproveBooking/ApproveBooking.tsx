import { motion } from "framer-motion";
import "./ApproveBooking.css";
import { useEffect, useState } from "react";
import {useAppDispatch, useAppSelector } from '../../../app/hooks';
import {closeApprove, selectActiveBooking, getBookings, removeActiveBooking, adminApproveBooking} from "../../../features/booking/bookingSlice"
import M from "materialize-css";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const ApproveBooking = () => {
    // auto init all materialize CSS, for easy use
    useEffect(() => {
        M.AutoInit();
    }, []);

    const dispatch = useAppDispatch();

    //data for reject reason
    const [approveDate, setApproveDate] = useState("");
    //data for id
    let activeId = useAppSelector(selectActiveBooking);
    

    //close approve booking popup
  const handleOnClickCancel = () => {
    dispatch(closeApprove());
  };

  //submit aprrove booking to server, POST request
  const handleOnSubmit = () => {

    const approveData = {
      id: activeId?._id,
      approveDate
    }

    //dispatch a reject reducer
    dispatch(adminApproveBooking(approveData))
    .then(() => {
      //update current bookings list
      dispatch(getBookings()).then(() =>{
        dispatch(removeActiveBooking);
      });
      dispatch(closeApprove());
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
        <h4>Approve Booking</h4>

        <div className="input-field col s12">
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Proposed Dates</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={(e) => setApproveDate(e.target.value)}
          >
            <FormControlLabel value={activeId?.datetime1} control={<Radio />} label={activeId?.datetime1} />
            <FormControlLabel value={activeId?.datetime2} control={<Radio />} label={activeId?.datetime2} />
            <FormControlLabel value={activeId?.datetime3} control={<Radio />} label={activeId?.datetime3} />
          </RadioGroup>
        </FormControl>
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
                Complete
                </button>
            </div>
        </div>
      </div>

    </motion.div>
  );
};

export default ApproveBooking;