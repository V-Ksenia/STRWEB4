import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import "./UserDetailPage.css";

const UserDetailPage = () => {
  const { id } = useParams();
  const [userr, setUser] = useState(null);
  const [err, setError] = useState("");
  const { user } = useContext(AuthContext);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/${id}`, {
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
      .then((data) => setUser(data))
      .catch((error) => setError(error.message));
  }, []);

  if (err) return <div>{err}</div>;

  if (!userr) return <div>Loading...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstname, lastname, phone, address }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const userData = await response.json();
      console.log(userData);
      setUser(userData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile">
      <h1>Username: {userr.username}</h1>
      {user.isAdmin && <p>id: {userr._id}</p>}
      <p>
        Full name:
        <input
          type="text"
          placeholder={userr.firstname}
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input 
          type="text"
          placeholder={userr.lastname}
          value={lastname}
          onChange={(e) => setLastname(e.target.value)} />
      </p>
      <p
        style={{
          fontSize: "24px",
        }}
      >
        <b>Contacts</b>
      </p>
      <hr
        style={{
          backgroundColor: "black",
          width: "30%",
          height: "1px",
        }}
      />
      <p>
        Email: <b>{userr.email}</b>  Phone: 
        <input 
          type="number"
          placeholder={userr.phone}
          value={phone}
          onChange={(e) => setPhone(e.target.value)} />
      </p>
      <p>Address: 
      <input 
          type="text"
          placeholder={userr.address}
          value={address}
          onChange={(e) => setAddress(e.target.value)} />
      </p>
      <p>
        <b>Created at: {new Date(userr.createdAt).toLocaleString()}</b>
      </p>
      <img
        src={`${userr.img || "http://localhost:8080/contact.png"}`}
        width="150px"
      />
      <button type="submit" style={{
        fontSize: "20px"
      }}>Edit</button>
    </form>
  );
};

export default UserDetailPage;
