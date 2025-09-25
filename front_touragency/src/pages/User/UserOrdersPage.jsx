import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const UserOrdersPage = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/orders/user/${id}`, {
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
      .then((data) => setOrders(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (orders.length === 0) {
    return <div>You don't have any orders yet.</div>;
  }

  return (
    <div style={{
      padding: "30px"
    }}>
      <h1>Your orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <p>
              <Link to={`/orders/${order._id}`}>{order._id}</Link>
            </p>
            <p>Tour: {order.tour.description}</p>
            <p>For {order.quantity} people</p>
            <p>Price: {order.totalPrice}$</p>
            <p>
              Created at: {new Date(order.createdAt).toLocaleString()} by {order.user.username}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserOrdersPage;
