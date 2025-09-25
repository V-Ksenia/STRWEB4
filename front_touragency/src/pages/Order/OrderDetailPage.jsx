import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [err, setError] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:8080/api/orders/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
    navigate("/");
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/orders/${id}`, {
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
      .then((data) => setOrder(data))
      .catch((error) => setError(error.message));
  }, []);

  if (err) return <div>{err}</div>;

  if (!order) return <div>Loading...</div>;

  return (
    <div className="orderInfo" style={{
      fontSize: "18px",
      padding: "20px"
    }}>
      <h1>№{order._id}</h1>
      <p>Created By: {order.user.username}</p>
      <p>
        Tour "{order.tour.description}"
      </p>
      <p style={{
        fontSize: "22px",
        fontWeight: "bold"
      }}>{order.totalPrice}$ for {order.quantity} people</p>
      <p><b>Created at: {new Date(order.createdAt).toLocaleString()}</b></p>
      <button onClick={handleDelete} style={{
        fontSize: "20px"
      }}>Delete</button>
    </div>
  );
};

export default OrderDetailPage;
