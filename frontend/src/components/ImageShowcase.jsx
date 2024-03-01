import React from "react";

const ImageShowcase = ({place,setShowAllImage}) => {
  return (
    <div className=" relative max-h-96 m-auto ">
      <div className="flex gap-2 rounded-2xl border overflow-hidden">
        <div className="flex ">
          {place.photos?.[0] && (
            <img
              className="object-cover max-h-96"
              src={"http://localhost:4000" + place.photos[0]}
            ></img>
          )}
        </div>
        <div className="flex flex-col gap-2 max-h-96 overflow-hidden">
          <div>
            {place.photos?.[1] && (
              <img
                className="object-cover max-h-48"
                src={"http://localhost:4000" + place.photos[1]}
              ></img>
            )}
          </div>
          <div>
            {place.photos?.[2] && (
              <img
                className="object-cover max-h-48"
                src={"http://localhost:4000" + place.photos[2]}
              ></img>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowAllImage(true)}
        className="border rounded-2xl px-2 py-1 absolute bottom-0 right-0 bg-white m-1 "
      >
        <i className="fa-solid fa-grip mr-1"></i>Show all photos
      </button>
    </div>
  );
};

export default ImageShowcase;
