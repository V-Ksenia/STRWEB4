import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [ err, setError ] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/users", {
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
        .then((data) => setUsers(data))
        .catch((error) => setError(error.message));
    }, []);

    if(err) return <div>{err}</div>;

    if(!users) return <div>Loading...</div>

    return (
        <div>
            <h1>All users</h1>
            <ul>
            {users.map((user) => (
                <li key={user._id}>
                    <Link to={`/users/${user._id}`}>{user.username}</Link>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default UsersPage;