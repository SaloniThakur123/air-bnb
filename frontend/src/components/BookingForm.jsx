import { UserContext } from "@/context/UserContext";
import React, { useContext, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate, redirect } from "react-router-dom";

const BookingForm = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setguests] = useState("");

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState(''); 
  

  const { user } = useContext(UserContext);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function submitHandler(e){
    e.preventDefault();
    const res=await axios.post('/booking',{checkIn,checkOut,name,mobile,guests,placeId:place._id,price:numberOfNights*place.price});
    setRedirect(res.data._id);
    console.log(res);
  }
  if(redirect){
    return <Navigate to={'/account/bookings'}/>
  }

  return (
    <div className="border border-gray-100 p-4 w-fit h-fit flex items-center flex-col gap-4 rounded-2xl shadow-lg shadow-gray-300  ">
      <h1 className="text-lg font-bold ">Price:₹{place.price}/per night</h1>
      <form className="flex gap-4 flex-col p-2" onSubmit={submitHandler}>
        <div className="flex gap-2 justify-center">
          <div className="flex flex-col">
            <label>Check in :</label>
            <input
              className="bg-transparent border rounded-lg text-sm p-1 mt-1"
              type="date"
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label>Check Out :</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
              }}
              className="bg-transparent border rounded-lg text-sm p-1 mt-1"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label>Number of guests :</label>
          <input
            className="bg-transparent border rounded-lg text-sm p-1 mt-1"
            type="number"
            value={guests}
            onChange={(e) => {
              setguests(e.target.value);
            }}
          ></input>
        </div>
        {numberOfNights > 0 && (
          <>
            <div className="flex flex-col">
              <label>Name :</label>
              <input
                className="bg-transparent border rounded-lg text-sm p-1 mt-1"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
            </div>
            <div className="flex flex-col">
              <label>Mobile no.</label>
              <input
                className="bg-transparent border rounded-lg text-sm p-1 mt-1"
                type="number"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
              ></input>
            </div>
          </>
        )}
        {user && (
          <>
            <button className="px-4 py-2 bg-primary rounded-2xl text-white " type="submit">
              Book
            </button>
          </>
        )}
        {!user && (
          <>
            <button className="px-4 py-2 bg-primary rounded-2xl text-white ">
              Login to continue
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default BookingForm;
