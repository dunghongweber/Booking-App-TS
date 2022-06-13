import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

export const getBookings = createAsyncThunk(
    'getAllBookings',
    async () => {
      let bookings: any;
      const localToken = localStorage.getItem('JWT_TOKEN');

      await axios.get('http://localhost:5000/booking/allbookings', 
      { headers: 
        { Authorization: `Bearer ${localToken}` } 
      }).then(res => bookings = res.data).catch(err => {return err});

      return bookings;
    }
  );


  export interface NewBookingInterface{
    eventType: string;
    eventLocation: string;
    datetime1: string | undefined;
    datetime2: string | undefined;
    datetime3: string | undefined;
  }
  export const createNewBooking = createAsyncThunk(
    'newBooking',
    async (myNewBooking : NewBookingInterface) => {

      const localToken = localStorage.getItem('JWT_TOKEN');
      const localUser = localStorage.getItem('JWT_USER');

      await axios.post('http://localhost:5000/booking/new', 
      {
        eventType: myNewBooking.eventType,
        eventLocation: myNewBooking.eventLocation,
        datetime1: myNewBooking.datetime1,
        datetime2: myNewBooking.datetime2,
        datetime3: myNewBooking.datetime3,
        createdBy: localUser,
      },
      { headers: 
        { Authorization: `Bearer ${localToken}`,
        'content-type': 'application/json' } 
      }).then().catch(err => {return err});
    }
  );

  export interface UserInterface{
    username: string;
    password: string;
  }
  export const userSignIn = createAsyncThunk(
    'userSignIn',
    async (credential: UserInterface) => {
      let myuser: any;

      await axios.post('http://localhost:5000/auth/signin', 
        { 
          username: credential.username, 
          password: credential.password 
        },
      { headers: 
        { 'content-type': 'application/json' } 
      }).then(res => myuser = res.data);

      localStorage.setItem('JWT_TOKEN', myuser.token);
      localStorage.setItem('JWT_USER', myuser.username);
      localStorage.setItem('JWT_ROLE', myuser.role);

      return myuser;
    }
  );

  export const userCancelBooking = createAsyncThunk(
    'userCancelBooking',
    async (id: string) => {
      let myuser: any;

      const localToken = localStorage.getItem('JWT_TOKEN');
      
      await axios.delete(`http://localhost:5000/booking/cancel/${id}`, 
      { headers: 
        { Authorization: `Bearer ${localToken}` } 
      }).then(res => myuser = res.status);

      return myuser;
    }
  );


  export interface ApproveBookingInterface{
    id: string | undefined;
    approveDate: string;
  }
  export const adminApproveBooking = createAsyncThunk(
    'userCancelBooking',
    async (approveData: ApproveBookingInterface) => {
      
      const localToken = localStorage.getItem('JWT_TOKEN');
      
      await axios.patch(`http://localhost:5000/booking/approve/${approveData.id}`, 
      {
          approvedDate: approveData.approveDate
      },
      { headers: 
        { Authorization: `Bearer ${localToken}`,
        'content-type': 'application/json' } 
      }).then(res => res.status).catch(err => err);
    }
  );


  export interface RejectBookingInterface{
    id: string | undefined;
    rejectReason: string;
  }
  export const adminRejectBooking = createAsyncThunk(
    'userCancelBooking',
    async (rejectData: RejectBookingInterface) => {
      const localToken = localStorage.getItem('JWT_TOKEN');
      
      await axios.patch(`http://localhost:5000/booking/reject/${rejectData.id}`, 
      {
          rejectedReason: rejectData.rejectReason
      },
      { headers: 
        { Authorization: `Bearer ${localToken}`,
        'content-type': 'application/json' } 
      }).then(res => res.status).catch(err => err);

      
    }
  );

export interface AppState {
    bookingList: BookingInterface[];
    listStatus: 'ok' | 'loading' | 'failed' | '';
    openModal: boolean;
    openReject: boolean;
    openApprove: boolean;
    loginStatus: 'ok' | 'loading' | 'failed' | '';
    activeBooking: BookingInterface | null;
}

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

const initialState: AppState = {
  bookingList: [],
  listStatus: '',
  openModal: false,
  openReject: false,
  openApprove: false,
  loginStatus: '',
  activeBooking: null,
};



export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addActiveBooking: (state, action) => {
      state.activeBooking = action.payload.activeBooking;
    },
    removeActiveBooking: (state) => {
      state.activeBooking = null;
    },
    openModal: (state) => {
        state.openModal = true;
    },
    closeModal: (state) => {
        state.openModal = false;
    },
    openReject: (state) => {
      state.openReject = true;
    },
    closeReject: (state) => {
        state.openReject = false;
    },
    openApprove: (state) => {
      state.openApprove = true;
    },
    closeApprove: (state) => {
        state.openApprove = false;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getBookings.pending, (state) => {
        state.listStatus = 'loading';
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.listStatus = 'ok';
        state.bookingList = action.payload;
      })
      .addCase(getBookings.rejected, (state) => {
        state.listStatus = 'failed';
      })
      .addCase(userSignIn.pending, (state) => {
        state.loginStatus = 'loading';
      })
      .addCase(userSignIn.rejected, (state) => {
        state.loginStatus = 'failed';
      })
      .addCase(userSignIn.fulfilled, (state) =>{
        state.loginStatus = 'ok';
      });
  },
});

export const { addActiveBooking, removeActiveBooking, openModal, closeModal, openReject, closeReject, openApprove, closeApprove} = bookingSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBookings = (state: RootState) => state.booking.bookingList;
export const selectListStatus = (state: RootState) => state.booking.listStatus;
export const selectOpenModal = (state: RootState) => state.booking.openModal;
export const selectOpenReject = (state: RootState) => state.booking.openReject;
export const selectOpenApprove = (state: RootState) => state.booking.openApprove;
export const selectLoginStatus = (state: RootState) => state.booking.loginStatus;
export const selectActiveBooking = (state: RootState) => state.booking.activeBooking;


export default bookingSlice.reducer;
