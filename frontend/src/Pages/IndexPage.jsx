import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const IndexPage = () => {
    const [places,setPlaces]=useState([]);
    useEffect(()=>{
        async function getPlaces(){
            const {data}=await axios.get('/allPlaces');
            console.log(data);
            setPlaces(data);
        }

        getPlaces();
    },[])
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 mx-8 gap-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link key={place._id} className="rounded-xl cursor-pointer p-4">
            <div className="flex mb-2 ">
              <img
                className=" aspect-square object-cover rounded-xl"
                src={"http://localhost:4000" + place.photos[0]}
              />
            </div>
            <div className="font-bold">{place.address}</div>
            <div className="text-sm text-gray-500">{place.title}</div>
            <div className='mt-2 '>
              {" "}
              <span className='font-semibold'>₹{place.price}</span>
              /per night
            </div>
          </Link>
        ))}
    </div>
  );
}

export default IndexPage