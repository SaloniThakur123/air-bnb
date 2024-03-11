import axios from "axios";
import React, { useEffect, useState } from "react";
import { differenceInCalendarDays, format } from "date-fns";
import { Link, useParams } from "react-router-dom";
import Booking from "./Booking";

function Bookings() {
  const {action}=useParams();
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get("/booking");

      setBookings(data);
      console.log(data);
    }

    getData();
  }, []);

  return (
    <>
      {action === undefined && (
        <div className="flex flex-col gap-4 items-center my-12">
          {bookings.length > 0 &&
            bookings.map((booking) => (
              <Link
                to={"/account/bookings/" + booking._id}
                className="p-4 flex gap-4 border border-gray-200 shadow-md"
                key={booking._id}
              >
                <div className="flex h-32 w-32 ">
                  <img
                    className="aspect-square rounded-xl "
                    src={booking.placeId.photos[0]}
                  ></img>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-bold text-xl ">
                    {booking.placeId.title}
                  </h2>
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

                  <h1 className="font-semibold text-lg ">
                    <i className="fa-regular fa-credit-card mr-2"></i>
                    Total-price : ₹{booking.price}
                  </h1>
                </div>
              </Link>
            ))}
        </div>
      )}
      {action!=undefined && <Booking bookings={bookings} bookingId={action}/>}
    </>
  );
}

export default Bookings;
