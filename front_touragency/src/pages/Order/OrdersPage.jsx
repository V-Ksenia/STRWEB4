import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [err, setError] = useState("");
  
  useEffect(() => {
    fetch("http://localhost:8080/api/orders", {
        credentials: "include"
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
      .catch((error) => setError(error.message));
  }, []);

  if(err) return <div>{err}</div>

  return (
    <div>
      <h1>All orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <Link to={`/orders/${order._id}`}>{order._id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
