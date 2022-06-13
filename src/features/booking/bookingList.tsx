import React, {  useEffect } from 'react';
import BookingItem from '../../components/BookingItem';


import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {selectBookings, getBookings, openModal} from "./bookingSlice"

export function BookingList() {
  const dispatch = useAppDispatch();
  const myBookings = useAppSelector(selectBookings);

  const handleOnClick = () =>{
    dispatch(openModal());
  }

  useEffect(() => {
      dispatch(getBookings());
  }, [dispatch])
  
  return (
    <div className='Bookinglist container'>
        <h3>Booking List</h3> <button className='btn' onClick={handleOnClick}>Add Booking</button>
      <ul className='collection'>
        {myBookings.map(b => (
            <BookingItem bookingItem={b} key={b._id}></BookingItem>
        ))}
      </ul>
    </div>
  );
}
