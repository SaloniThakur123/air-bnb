import Places from "@/components/Places";
import { UserContext } from "@/context/UserContext";
import React, { useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

const AccountPage = () => {
    
    const { user } = useContext(UserContext);
    if(!user){
        return <Navigate to={'/'}/>;
    }

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  function linkclasses(type) {
    let classes = "py-2 px-4 rounded-full";
    if (type === subpage) {
      classes += " bg-primary text-white ";
    }
    return classes;
  }

  return (
    <div>
      <div className="flex justify-center gap-8 mt-4">
        <Link className={linkclasses("profile")} to={"/account"}>
          My profile
        </Link>
        <Link className={linkclasses("bookings")} to={"/account/bookings"}>
          My Booking
        </Link>
        <Link className={linkclasses("places")} to={"/account/places"}>
          My Accomodations
        </Link>
      </div>

      {subpage === "profile" && (
        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="font-bold text-2xl ">Account Details</div>
          <div className="text-lg">
            <div>Name: {user.fullName}</div>
            <div>Email: {user.email}</div>
          </div>
        </div>
      )}
      {subpage==='places' && <Places/>}
    </div>
  );
};

export default AccountPage;
