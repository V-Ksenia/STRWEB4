import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import Map from "../../components/Map.jsx";
import Weather from "../../components/Weather.jsx";
import "./TourDetailPage.css"

const TourDetailPage = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOrder = () => {
    if (!user) {
      navigate("/login");
    } else navigate(`/tour/${id}/order`);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/tours/${id}`)
      .then((res) => res.json())
      .then((data) => setTour(data))
      .catch((error) => console.error("Ошибка загрузки тура:", error));
  }, []);

  if (!tour) return <div>Loading...</div>;

  return (
    <div className="tourDetail">
      <h1>{tour.description}</h1>
      <hr style={{
        width: "70%",
        height: "2px",
        backgroundColor: "rgb(44, 44, 44)"
      }}/>
      <p>
        Final destination {tour.hotelName} in <b>{tour.country}</b>
      </p>
      <p>Duration: {tour.duration} weeks</p>
      <p style={{
        fontSize: "26px",
        fontWeight: "bold"
      }}>Price: {tour.price}$ / person</p>
      <div className="mapWeather">
        <Map tour={tour} />
        <Weather tour={tour} />
      </div>
      <button onClick={handleOrder}>Make an order</button>
    </div>
  );
};

export default TourDetailPage;
