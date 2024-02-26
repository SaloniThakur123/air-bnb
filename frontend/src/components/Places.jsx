import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PlacesForm from "./PlacesForm";
import axios from "axios";

const Places = () => {
  const { action } = useParams();
  const [places,setPlaces]=useState([]);

  useEffect(()=>{
    async function getData(){
      const {data} = await axios.get('/places');
      setPlaces(data);
    }

    getData();
  },[action])

  return (
    <div>
      {action === undefined && (
        <div>
          <div className="flex justify-center mt-8">
            <Link
              to={"/account/places/new"}
              className="bg-primary text-white rounded-full  px-4 py-1"
            >
              Add new place
            </Link>
          </div>

          <div className="flex flex-col gap-2 mt-4">
          {places.length>0 && places.map(place=>(
            <Link to={'/account/places/'+place._id}  key={place._id} className="flex p-1 rounded-xl mx-12 gap-2">
              <div className="flex w-32 h-32 grow shrink-0">
                <img className="object-cover rounded-lg " src={"http://localhost:4000"+place.photos[0]}></img>
              </div>
              <div className="grow-0 shrink">
                <h1 className="text-xl">{place.title}</h1>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
          </div>

        </div>
      )}
      {action != undefined && <PlacesForm />}
    </div>
  );
};

export default Places;
