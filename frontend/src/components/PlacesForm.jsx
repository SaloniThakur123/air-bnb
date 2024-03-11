import React, { useEffect, useState } from "react";
import Perks from "./Perks";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

const PlacesForm = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setcheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);

  const [redirect, setRedirect] = useState("");

  if (action != "new") {
    useEffect(() => {
      async function getPlace() {
        const {data} = await axios.get("/places/" + action);
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setcheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      }

      getPlace();
    }, []);
  }

  async function uploadByLink(e) {
    e.preventDefault();
    const { data } = await axios.post("/uploadByLink", { link: photoLink });
    setAddedPhotos([...addedPhotos, data]);
    setPhotoLink("");
  }

  async function uploadPhoto(e) {
    const files = e.target.files;
    console.log(files);
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    const { data: filename } = await axios.post("/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    for (let i = 0; i < filename.length; i++) {
      setAddedPhotos((prev) => {
        return [...prev, filename[i]];
      });
    }
    // console.log(res);
  }

  async function submitHandler(e) {
    e.preventDefault();
    const reqBody = {
      title,
      address,
      photos: addedPhotos,
      perks,
      description,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    };

    if (action === "new") {
      const { data } = await axios.post("/places", reqBody);
    } else {
      await axios.put(`/places/${action}`, reqBody);
    }
    setRedirect("/account/places");
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  function deleteImage(e,link){
    e.preventDefault();
    setAddedPhotos([...addedPhotos.filter((image)=>image!=link)]);
  }
  
  function setAsMainImage(e,link){
    e.preventDefault();
    const notSelected=addedPhotos.filter((image)=>image!=link);
    setAddedPhotos([link,...notSelected]);
  }


  return (
    <>
      <form
        className="flex flex-col gap-1 w-1/2 m-auto my-12"
        onSubmit={submitHandler}
      >
        <h1 className="text-2xl">Title</h1>
        <p className="text-sm text-gray-400">
          Title for your, should be short and catchy as in advertisement
        </p>
        <input
          type="text"
          placeholder="Title"
          className="border rounded-xl mb-2 px-4 py-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <h1 className="text-2xl">Address</h1>
        <p className="text-sm text-gray-400">Address to this place</p>
        <input
          type="text"
          placeholder="Address"
          className="border rounded-xl mb-2 px-4 py-1"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <h1 className="text-2xl">Photos</h1>
        <p className="text-sm text-gray-400">more=better</p>
        <div>
          <input
            type="text"
            placeholder="Add using a link ...jpg"
            className="border rounded-xl mb-2 px-4 py-1"
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
          />
          <button
            onClick={(e) => uploadByLink(e)}
            className=" m-3 rounded-full px-2 py-1 bg-primary text-white"
          >
            Add photo
          </button>
        </div>
        <div className="mt-2 grid gap-2 grid-cols-3">
          {addedPhotos.length > 0 &&
            addedPhotos.map((link) => (
              <div key={link} className="h-32 flex justify-center relative">
                <img
                  src={link}
                  className="rounded-2xl w-full object-cover "
                />
                <button onClick={(e)=>deleteImage(e,link)} className="absolute bottom-1 right-1 bg-black py-1 px-2 rounded-xl text-gray-100 bg-opacity-50">
                  <i className="fa-solid fa-trash"></i>
                </button>
                <button onClick={(e)=>setAsMainImage(e,link)} className="absolute bottom-1 left-1 bg-black py-1 px-2 rounded-xl text-gray-100 bg-opacity-50">
                  {link===addedPhotos[0] &&  <i className="fa-solid fa-star"></i>}
                  {link!=addedPhotos[0] &&  <i className="fa-regular fa-star"></i>}
                </button>
              </div>
            ))}
          <label className="h-32 flex items-center justify-center cursor-pointer border rounded-2xl p-6 mb-2 text-xl">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={uploadPhoto}
            />
            Upload
          </label>
        </div>

        <h1 className="text-2xl">Description</h1>
        <p className="text-sm text-gray-400">Description of the place</p>
        <textarea
          className="border rounded-xl mb-2 px-4 py-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Perks selected={perks} onChange={setPerks} />

        <h1 className="text-2xl">Extra info</h1>
        <p className="text-sm text-gray-400">House rules,etc</p>
        <textarea
          className="border rounded-xl mb-2 px-4 py-1"
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        <h1 className="text-2xl">Check in & Check out times</h1>
        <p className="text-sm text-gray-400">
          add check in and out times, remember to have some time window for
          cleaning the room between guests
        </p>
        <div className="flex flex-wrap gap-4">
          <div>
            <h3>Check in time</h3>
            <input
              type="time"
              className="border rounded-xl px-3 py-1 mt-2"
              value={checkIn}
              onChange={(e) => setcheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3>Check out time</h3>
            <input
              type="time"
              className="border rounded-xl px-3 py-1 mt-2"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3>Max number of guests</h3>
            <input
              type="number"
              className="border rounded-xl px-3 py-1 mt-2"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
        </div>
        <div>
          <h3>Price per night</h3>
          <input
            type="number"
            className="border rounded-xl px-3 py-1 mt-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="mt-4 py-2 px-4 bg-primary rounded-full text-white "
        >
          {" "}
          Save
        </button>
      </form>
    </>
  );
};

export default PlacesForm;
