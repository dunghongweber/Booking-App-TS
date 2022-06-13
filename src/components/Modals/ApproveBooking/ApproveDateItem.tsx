import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {useAppDispatch } from '../../../app/hooks';
import {closeApprove} from "../../../features/booking/bookingSlice"
import M from "materialize-css";

const ApproveDateItem = () => {
    // auto init all materialize CSS, for easy use
    useEffect(() => {
        M.AutoInit();
    }, []);

    const dispatch = useAppDispatch();

    //data for reject reason
    const [rejectReason, setRejectReason] = useState("");
    
  return (
    <div
      className="approve-date-item"
    >
      <p></p>
    </div>
  );
};

export default ApproveDateItem;