import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Advertising from "../../components/Advertising";
import "./TourPage.css";

const ToursPage = () => {
  //const [tours, setTours] = useState([]);
  const tours = [
    {
      _id: "1",
      country: "Italy",
      description: "Explore the beauty of Italy with us!",
      duration: 2,
      price: 1200,
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXRhbHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      _id: "2",
      country: "Japan",
      description: "Discover the wonders of Japan with us!",
      duration: 3,
      price: 1500,
      img: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFwYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
  ];

  const [filters, setFilters] = useState({
    country: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
  });

  // const fetchTours = async () => {
  //   try {
  //     const query = new URLSearchParams(
  //       Object.entries(filters).filter(([_, value]) => value),
  //     ).toString();

  //     const response = await fetch(`http://localhost:8080/api/tours?${query}`);
  //     const data = await response.json();
  //     setTours(data);
  //   } catch (error) {
  //     console.error("Error loading tours:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchTours();
  // }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Advertising />
      <div className="tours">
        <h1
          style={{
            fontVariant: "small-caps",
            fontSize: "45px",
          }}
        >
          Tours ^_^ :3
        </h1>

        <form className="searchForm">
          <div>
            <label>
              Country:
              <input
                type="text"
                name="country"
                value={filters.country}
                onChange={handleFilterChange}
                placeholder="Enter country"
              />
            </label>
          </div>
          <div>
            <label>
              Min Price:
              <input
                type="number"
                name="minPrice"
                step="100"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min price"
              />
            </label>
          </div>
          <div>
            <label>
              Max Price:
              <input
                type="number"
                name="maxPrice"
                step="100"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max price"
              />
            </label>
          </div>
          <div>
            <select
              name="sort"
              value={filters.sort}
              onChange={handleFilterChange}
            >
              <option value="">No Sorting</option>
              <option value="price">Price (Low to High)</option>
              <option value="-price">Price (High to Low)</option>
              <option value="country">Country (A-Z)</option>
              <option value="-country">Country (Z-A)</option>
            </select>
          </div>
        </form>

        <div className="toursContainer">
          {tours.map((tour) => (
            <div>
              <a href={`/tour/${tour._id}`}>{tour.description}</a>
              <div
                className="specTour"
                style={{
                  backgroundColor: "rgba(65, 65, 65, 0.315)",
                  backgroundBlendMode: "overlay",
                  backgroundImage: `url(${tour.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {tour.country}
                </p>
                <p>for {tour.duration} week</p>
                <p
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {tour.price}$ / person
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToursPage;
