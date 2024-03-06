import React from "react";
import { differenceInCalendarDays, format } from "date-fns";
import ImageShowcase from "./ImageShowcase";

function Booking({ bookings, bookingId }) {
  const booking = bookings.find((item) => bookingId === item._id);
  console.log(booking);
  return (
    <div className="flex flex-col gap-5 w-fit m-auto my-12">
      <div>
        <h1 className="font-semibold text-3xl ">{booking.placeId.title}</h1>
      </div>

      <div className="flex gap-2 items-center">
      <i className="fa-solid fa-location-dot"></i>
        <a href={'https://maps.google.com/?q='+booking.placeId.address} className="font-bold underline">{booking.placeId.address}</a>
      </div>

      <div className="border flex justify-between bg-gray-300 p-4 rounded-xl">
        <div>
          <p className="font-bold text-lg">Your Booking Information</p>
          <div className="flex items-center gap-2">
            <i className="fa-regular fa-moon"></i>
            {differenceInCalendarDays(
              new Date(booking.checkOut),
              new Date(booking.checkIn)
            )}
            nights:
            <i className="fa-regular fa-calendar-days"></i>
            {format(new Date(booking.checkIn), "dd-MM-yyyy")}
            <i className="fa-solid fa-arrow-right"></i>
            <i className="fa-regular fa-calendar-days"></i>
            {format(new Date(booking.checkOut), "dd-MM-yyyy")}
          </div>
        </div>
        <div className="bg-primary rounded-lg p-2 text-white">
          <p>Total Price</p>
          <p className="font-semibold">₹{booking.price}</p>
        </div>
      </div>

      <div>
        <ImageShowcase place={booking.placeId}/>
      </div>
    </div>
  );
}

export default Booking;
