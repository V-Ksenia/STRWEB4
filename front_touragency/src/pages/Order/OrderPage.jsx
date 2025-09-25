import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import "./OrderPage.css"

const OrderPage = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [err, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/tours/${id}`)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw new Error(error.message || `Error ${res.status}`);
          });
        }
        return res.json();
      })
      .then((data) => setTour(data))
      .catch((error) => setError(error.message));
  }, []);

  const handleOrder = () => {
    if (!user) {
      alert("You need to sign in to order.");
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8080/api/orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tour: id,
        user: user.details._id,
        quantity,
      }),
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw new Error(error.message || `Error ${res.status}`);
          });
        }
        return res.json();
      })
      .then(() => {
        alert("Order was sucessfully created!");
        navigate(`/user/${user.details._id}/orders`);
      })
      .catch((error) => setError(error.message));
  };

  if (err) return <div>{err}</div>;

  if (!tour) return <div>Loading...</div>;

  return (
    <div className="order">
      <section className="orderInfo">
        <h1>Order</h1>
        <p>Tour: {tour.description}</p>
        <p>Price for one person: <b>{tour.price}$</b></p>
        <label>
          People:
          <input
            type="number"
            min="1"
            max="100"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </label>
        <p style={{
          marginTop: "100px",
          fontSize: "24px",
          fontWeight: "bold"
        }}>Total price: {tour.price * quantity}$</p>

        <button onClick={handleOrder}>Confirm order</button>
      </section>
      <img src={tour.img} width="60%"/>
    </div>
  );
};

export default OrderPage;
