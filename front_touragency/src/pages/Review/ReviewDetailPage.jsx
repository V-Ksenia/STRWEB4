import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ReviewDetailPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [review, setReview] = useState(null);
  const [title, setTitle] = useState("");
  const [reviewDescr, setDescription] = useState("");
  const [rating, setRating] = useState(5);

  const [err, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/reviews/${id}`, {
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
      .then((data) => setReview(data))
      .catch((error) => setError(error.message));
  }, []);

  if (err) return <div>{err}</div>;

  if (!review) return <div>Loading...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user && user._id === review._id) {
      alert("Вы должны быть авторизованы для изменения отзыва.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/reviews/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, reviewDescr, rating }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const revData = await response.json();
      console.log(revData);
      setReview(revData);
      navigate("/reviews");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Edit</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            placeholder={review.title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Review:
          <input
            type="text"
            placeholder={review.review}
            value={reviewDescr}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Rating:
          <input
            type="number"
            min="1"
            max="5"
            placeholder={review.rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </label>
        <br />
        {err && <p style={{ color: "red" }}>{err}</p>}
        <button type="submit">Edit</button>
      </form>
      <p>Created By: {review.user.username}</p>
      <p>Created at: {new Date(review.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default ReviewDetailPage;
