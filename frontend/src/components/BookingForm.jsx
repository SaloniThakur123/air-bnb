import React from "react";

const BookingForm = ({place}) => {
  return (
    <div className="border border-gray-100 p-4 w-fit h-fit flex items-center flex-col gap-4 rounded-2xl shadow-lg shadow-gray-300  ">
      <h1 className="text-lg font-bold ">Price:₹{place.price}/per night</h1>
      <form className="flex gap-4 flex-col p-2">
        <div className="flex gap-2 justify-center">
          <div className="flex flex-col">
            <label>Check in :</label>
            <input
              className="bg-transparent border rounded-lg text-sm p-1 mt-1"
              type="date"
            />
          </div>
          <div>
            <label>Check Out :</label>
            <input
              type="date"
              className="bg-transparent border rounded-lg text-sm p-1 mt-1"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label>Number of guests :</label>
          <input
            className="bg-transparent border rounded-lg text-sm p-1 mt-1"
            type="number"
          ></input>
        </div>
        <button className="px-4 py-2 bg-primary rounded-2xl text-white ">
          Book
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
