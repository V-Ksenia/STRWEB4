import React, { useState, useEffect } from "react";
import "./Advertising.css";

const Advertising = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/tours")
      .then((res) => res.json())
      .then((data) => setTours(data.slice(0, 3)))
      .catch((err) => console.error("Ошибка загрузки туров:", err));
  }, []);

  return (
    <section className="ad">
      <h2 style={{
        color: "rgb(254, 254, 254)"
      }}>GREAT OFFERS!</h2>
      <div>
        {tours.map((tour) => (
          <a href={`/tour/${tour._id}`} style={{
            textDecoration: "none",
            color: "rgb(44, 44, 44)",
            transition: "transform 0.5s ease, opacity 0.5s ease"
          }}>
          <div key={tour._id}>
            <p style={{ fontSize: "22px"}}>{tour.description}</p>
            <p style={{ fontSize: "22px"}}>Final destination: <b>{tour.country}</b></p>
            <p style={{ fontSize: "28px"}}><b>{tour.price} $</b> / person</p>
          </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Advertising;
