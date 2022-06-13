import React from 'react';
import { BookingList } from './features/booking/bookingList';
import { NavBar } from './components/NavBar';
import  Modal  from './components/Modals/NewBooking/NewBooking';
import RejectBooking from './components/Modals/RejectBooking/RejectBooking';
import ApproveBooking from './components/Modals/ApproveBooking/ApproveBooking';
import {AnimatePresence} from 'framer-motion';
import { useAppSelector } from './app/hooks';
import { selectOpenModal, selectOpenApprove, selectOpenReject } from './features/booking/bookingSlice';
import { Login } from './components/pages/Login';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const openNewModal = useAppSelector(selectOpenModal);
  const openRejectModal = useAppSelector(selectOpenReject);
  const openApproveModal = useAppSelector(selectOpenApprove);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/user/booking' element={<BookingList/>}></Route>
        </Routes>
      </BrowserRouter>
      

      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {openNewModal && <Modal></Modal>} 
      </AnimatePresence>

      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {openRejectModal && <RejectBooking></RejectBooking>} 
      </AnimatePresence>

      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {openApproveModal && <ApproveBooking></ApproveBooking>} 
      </AnimatePresence>
      
    </div>
  );
}

export default App;
