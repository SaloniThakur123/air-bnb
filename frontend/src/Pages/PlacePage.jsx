import BookingForm from "@/components/BookingForm";
import ImageShowcase from "@/components/ImageShowcase";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlacePage = () => {
  const { placeId } = useParams();
  const [place, setPlace] = useState(null);

  const [showAllImage, setShowAllImage] = useState(false);

  useEffect(() => {
    async function getPlace() {
      const { data } = await axios.get(`/place/${placeId}`);
      setPlace(data);
    }
    getPlace();
  }, []);

  if (showAllImage) {
    return (
      <div className="absolute inset-0 text-white h-fit bg-black p-8">
        <div className=" flex flex-col gap-2">
          <div>
            <h2 className="text-3xl">{place.title}</h2>
            <button
              onClick={() => setShowAllImage(false)}
              className="fixed right-12 top-14 bg-black p-2 rounded-xl shadow-md shadow-gray-700 "
            >
              <i className="fa-solid fa-x mr-2"></i>Close photo
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {place.photos.length > 0 &&
            place.photos.map((photo) => (
              <div key={photo} className="flex justify-center">
                <img
                  className="lg:max-w-[50%] "
                  src={"http://localhost:4000" + photo}
                ></img>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {place != null && (
        <div className="m-6 flex flex-col gap-4">
          <div className="font-semibold text-2xl">{place.title}</div>
          <div className="font-semibold text-md">
            <i className="fa-solid fa-location-dot mr-2"></i>
            {place.address}
          </div>
          <ImageShowcase place={place} setShowAllImage={setShowAllImage} />
          <div className="flex my-8 mx-auto gap-12 ">
            <div className="flex flex-col w-2/3 grow-0 shrink gap-4 ">
              <div>
                <h1 className="text-xl font-bold mb-2 ">Description</h1>
                <p>{place.description}</p>
              </div>
              <div>
                <p>
                  <span className="font-semibold mr-1">Check-In :</span>
                  {place.checkIn}
                </p>
                <p>
                  <span className="font-semibold mr-1">Check-out :</span>
                  {place.checkOut}
                </p>
                <p>
                  <span className="font-semibold mr-1">
                    Max number of guests :
                  </span>
                  {place.maxGuests}
                </p>
              </div>
            </div>
            <BookingForm place={place}/>
          </div>
          <div>
            <h1 className="font-bold">Extra Info</h1>
            <p>{place.extraInfo}</p>
          </div>
          <div>
            <h1 className="font-bold">Perks</h1>
            <div className="flex gap-4 mt-2">
              {place.perks.map((perk) => (
                <p key={perk} className="border rounded-xl px-3 py-1">{perk}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlacePage;
