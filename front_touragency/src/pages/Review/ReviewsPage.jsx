import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "./ReviewsPage.css";

const ReviewsPage = () => {
  //const [reviews, setReviews] = useState([]);
  const reviews = [{
    title: "четко вообще",
    review: "очень нравится, всем советую",
    rating: 5,
  },
  {
    title: "не оч",
    review: "ну такое, могло быть и лучше",
    rating: 3,
  },
  {
    title: "фу",
    review: "не советую, ужасный сервис",
    rating: 1,
  }];
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [review, setDescription] = useState("");
  const [rating, setRating] = useState(5);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:8080/api/reviews", {
  //     credentials: "include",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setReviews(data))
  //     .catch((error) => console.error("Error loading reviews:", error));
  // }, [reviews]);

  if (!reviews) return <div>Loading...</div>;

  const handleReview = (id) => {
    navigate(`/reviews/${id}`);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8080/api/reviews/${id}`, {
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

    //setReviews(reviews.filter((r) => r._id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user) {
      alert("Вы должны быть авторизованы для создания отзыва.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, review, rating }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const revData = await response.json();
      //setReviews([...reviews, revData]);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{
      backgroundColor: "rgb(44, 44, 44)"
    }}>
      <h1 style={{
        margin: "30px",
        color: "rgb(206, 206, 206)"
      }}>All reviews</h1>
      <ul className="allRev">
        {reviews.map((review) => (
          <div className="review">
          <li key={review._id}>
            <h1>{review.title}</h1>
            <p>{review.review}</p>
            <p>{review.rating}/5</p>
            <p>By {review.user.username}</p>
            <p><b>Created at: {new Date(review.createdAt).toLocaleString()}</b></p>
            <p><b>Edited at: {new Date(review.updatedAt).toLocaleString()}</b></p>
            {user && user.details._id === review.user._id && (
              <div style={{
                display: "flex",
                gap: "20px"
              }}>
                <button
                  className="revButton"
                  onClick={() => handleReview(review._id)}
                >
                  Edit
                </button>
                <button
                  className="revButton"
                  onClick={() => handleDelete(review._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
          </div>
        ))}
      </ul>
      {user && (
        <div className="revFormContainer">
          <h1>Leave your review</h1>
          <form onSubmit={handleSubmit} className="reviewForm">
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <br />
            <textarea
              className="longDesc"
              type=""
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <br />
            <label
              style={{
                fontSize: "20px",
              }}
            >
              Rating:
              <input
                className="rating"
                type="number"
                min="1"
                max="5"
                onChange={(e) => setRating(e.target.value)}
              />{" "}
              / 5
            </label>
            <br />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button className="revButton" type="submit">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
