import React from 'react';
import { useAppDispatch } from '../app/hooks';
import {openReject, openApprove, userCancelBooking, getBookings, addActiveBooking} from "../features/booking/bookingSlice"

//delcare all interface that the props will use
export interface BookingInterface {
  eventType: string;
  eventLocation: string;
  datetime1: string;
  datetime2: string;
  datetime3: string;
  bookingStatus: string;
  createdBy: string;
  approvedDate: string;
  rejectedReason: string;
  __v: number;
  _id: string
  }

  //declare the props interface layout
export interface Props{
    bookingItem: BookingInterface;
}

//use React.FC to clarify props structure in typescript
const BookingItem: React.FC<Props> = ({ bookingItem }) => {
  
  const dispatch = useAppDispatch();
  const myUserRole = localStorage.getItem('JWT_ROLE');

  const handleOnClickApproved = () =>{
    //set activeId for selected booking
    dispatch(addActiveBooking({activeBooking: bookingItem}));
    //dispatch action to open approve popup
    dispatch(openApprove());
  }

  const handleOnClickRejected = () =>{
    //set activeId for selected booking
    dispatch(addActiveBooking({activeBooking: bookingItem}));
    //dispatch action to open reject popup
    dispatch(openReject());
  }

  const handleOnclickCancle = (id: string) =>{
    //dispatch action for user to cancel booking
    dispatch(userCancelBooking(id))
    .then(() => {
      dispatch(getBookings());
    });
  }

  //base on user role, display different buttons
  let bookingStatus = bookingItem.bookingStatus;
  let buttonGroup;
  if(myUserRole !== 'admin'){
    buttonGroup = (<div className="col s12">
    <button className='btn red right' onClick={() =>handleOnclickCancle(bookingItem._id)}  disabled={ bookingStatus !== 'pending'}>cancel</button>
  </div>)
  }
  else{
    buttonGroup = (
      <div className="row">
        <div className="col s6">
          <button className='btn red right' onClick={() =>handleOnClickRejected()} disabled={ bookingStatus !== 'pending'}>reject</button>
        </div>
        <div className="col s6">
          <button className='btn green right' onClick={() => handleOnClickApproved()} disabled={ bookingStatus !== 'pending'}>approve</button>
        </div>
      </div>
    )
  }

  //dateInfo will show either 3 proposed dates for pending booking
  // or approved date if booking is approved by admin
  // or rejected reason if booking is rejected by admin
  let dateInfo;
  switch (bookingItem.bookingStatus) {
    case 'Approved':
      dateInfo = (
        <span>Approved date: {bookingItem.approvedDate}</span>
      );
      break;
    case 'Rejected':
      dateInfo = (
        <span>Reason for rejection {bookingItem.rejectedReason}</span>
      );
      break;
    default:
      dateInfo = (
        <span>
            <strong>Date 1:</strong> {bookingItem.datetime1}
            <br/>
            <strong>Date 2:</strong> {bookingItem.datetime2}
            <br/>
            <strong>Date 3:</strong> {bookingItem.datetime3}
        </span>
      );
      break;
  }
  
  return (
            <li className='collection-item' >
                <span className="title"><strong>Event Type:</strong> {bookingItem.eventType}</span>
                <p><strong>Location:</strong> {bookingItem.eventLocation}
                <br/>
                <strong>status:</strong> {bookingItem.bookingStatus} 
                <span className='right'>
                  <strong>by:</strong> {bookingItem.createdBy}
                </span>
                <br/>
                  {
                    dateInfo
                  }
                </p>
                <div className="row">
                  {
                    buttonGroup
                  }
                </div>
            </li>
  );
}

export default BookingItem;
