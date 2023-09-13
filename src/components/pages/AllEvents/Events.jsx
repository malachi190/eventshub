import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import { db } from "../../../firebase";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import "./styles/eventsStyles.css";

const Events = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [eventList, setEventList] = useState([]);
  const eventsCollection = collection(db, "events");

  const handleDataFetch = async () => {
    try {
      const data = await getDocs(eventsCollection);
      const mappedData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEventList(mappedData);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    handleDataFetch();
  }, []);

  const deleteEvent = async (id) => {
    const singleEvent = doc(db, "events", id);
    await deleteDoc(singleEvent);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log("error", e);
    }
  };
  return (
    <Layout>
      <div className="eventsContainer">
        <div className="logout">
          <button className="logoutBtn" onClick={handleLogout}>Logout</button>
        </div>
        <div className="mainEventContainer">
          {eventList.map((event, index) => (
            <div key={index} className="event">
              <p>{event.name}</p>
              <small>{event.type}</small>
              <p>Venue: {event.venue}, {event.location}</p>
              <p>Date: {event.date.toLocaleString()}</p>
              <p>Tickets: ${event.price}</p>
              <button className="btn" onClick={() => deleteEvent(event.id)}>
                delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Events;
