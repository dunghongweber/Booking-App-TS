import { motion } from "framer-motion";
import "./NewBooking.css";
import { useEffect, useState } from "react";
import {useAppDispatch } from '../../../app/hooks';
import {closeModal, createNewBooking, getBookings} from "../../../features/booking/bookingSlice"
import M from "materialize-css";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const NewBooking = () => {
    // auto init all materialize CSS, for easy use
    useEffect(() => {
        M.AutoInit();
    }, []);

    const dispatch = useAppDispatch();

    //all data for new booking
    const [eventType, setEventType] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [dateTime1, setDateTime1] = useState<Date | null>(new Date());
    const [dateTime2, setDateTime2] = useState<Date | null>(new Date());
    const [dateTime3, setDateTime3] = useState<Date | null>(new Date());

    //cancle creating new booking
  const handleOnClickCancel = () => {
    dispatch(closeModal());
  };

  //submit new booking to server, POST request
  const handleOnSubmit = () => {
    const newBooking = {
      eventType: eventType,
      eventLocation: eventLocation,
      datetime1: dateTime1?.toString(),
      datetime2: dateTime2?.toString(),
      datetime3: dateTime3?.toString(),
    }

    dispatch(createNewBooking(newBooking))
    .then(() => {
      dispatch(closeModal());
      
      dispatch(getBookings());
    });
    
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
        <div className="input-field col s12">
            <select id="event-type" onChange={(e) => setEventType(e.target.value)} defaultValue={"prompt"}>
            <option value="prompt" disabled>
              Please select one
            </option>
            <option value="Health Talk">Health Talk</option>
            <option value="Wellness Events">Wellness Events</option>
            <option value="Fitness Activities">Fitness Activities</option>
            </select>
            <label>Type of Event</label>
        </div>

        <div className="input-field col s12">
          <input id="event-location" type="text" onChange={(e) => setEventLocation(e.target.value)}/>
          <label htmlFor="disabled">Location of Event</label>
        </div>

        <div className="input-field col s12">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Select Date #1"
              value={dateTime1}
              onChange={(newValue) => {
                setDateTime1(newValue);
              }}
            />
          </LocalizationProvider>
        </div>

        <div className="input-field col s12">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Select Date #2"
              value={dateTime2}
              onChange={(newValue) => {
                setDateTime2(newValue);
              }}
            />
          </LocalizationProvider>
        </div>

        <div className="input-field col s12">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Select Date #3"
              value={dateTime3}
              onChange={(newValue) => {
                setDateTime3(newValue);
              }}
            />
          </LocalizationProvider>
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

export default NewBooking;