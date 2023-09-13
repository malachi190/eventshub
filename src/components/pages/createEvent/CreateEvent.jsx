import React, { useRef, useState } from "react";
import Layout from "../../layout/Layout";
import sideImg from "../../../assets/undraw_Mobile_posts_re_bpuw.png";
import { Input } from "rsuite";
import "./styles/createEventsStyles.css";
import { useStore } from "../../../store";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


export default function CreateEvent() {
  const notify = () => toast("Event added successfully!");
  const event = useStore((store) => store.events);
  const addEvent = useStore((store) => store.addEvent);
  const eventsCollection = collection(db, "events");
  const navigate = useNavigate();

  const data = [
    "concert",
    "seminar",
    "music festival",
    "meeting",
    "wedding",
    "fundraising",
    "food festival",
    "exhibition",
    "sports",
  ];

  const nameRef = useRef();
  const typeRef = useRef();
  const locationRef = useRef();
  const dateRef = useRef();
  const priceRef = useRef();
  // const imageRef = useRef();
  const venueRef = useRef();

  const handleInput = () => {
    addEvent(
      nameRef.current.value,
      typeRef.current.value,
      locationRef.current.value,
      dateRef.current.value,
      // imageRef.current.files[0],
      priceRef.current.value,
      venueRef.current.value
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(eventsCollection, event);
    notify();
    navigate('/events')
  };

  // console.log("events", event);

  return (
    <Layout>
      <div className="createEventContainer">
        <div className="createEventHeader">
          <h2>
            Welcome, fill in the necessary information to create your event
          </h2>
        </div>

        <div className="mainInformationContainer">
          <div className="mainSideImgContainer">
            <img src={sideImg} alt="" />
          </div>
          <div className="mainFormContainer">
            <ToastContainer />
            <form action="" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="">Title</label>
                <Input
                  type="text"
                  name="name"
                  ref={nameRef}
                  onChange={handleInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Type of event</label>
                <select name="type" id="" ref={typeRef} onChange={handleInput}>
                  {data?.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="">Location</label>
                <Input
                  type="text"
                  name="location"
                  ref={locationRef}
                  onChange={handleInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Date</label>
                <Input
                  type="date"
                  name="date"
                  ref={dateRef}
                  onChange={handleInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Price Range</label>
                <Input
                  type="text"
                  name="price"
                  ref={priceRef}
                  onChange={handleInput}
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="">Banner Image</label>
                <Input
                  type="file"
                  name="image"
                  ref={imageRef}
                  onChange={handleInput}
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="">Venue</label>
                <Input
                  type="text"
                  name="venue"
                  ref={venueRef}
                  onChange={handleInput}
                />
              </div>

              <div className="submtiBtn">
                <button>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
