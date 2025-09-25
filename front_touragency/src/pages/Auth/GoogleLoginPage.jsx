import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const GoogleHandler = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchGoogleUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/auth/googleUser",
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          const user = await response.json();

          setUser(user);

          navigate("/");
        } else {
          console.error("Failed to fetch Google user data");
          navigate("/login");
        }
      } catch (err) {
        console.error("Error fetching Google user data:", err);
        navigate("/login");
      }
    };

    fetchGoogleUser();
  }, [navigate]);

  return null;
};

export default GoogleHandler;
