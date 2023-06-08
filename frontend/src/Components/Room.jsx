import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defaultImg from "../images/room-1.jpeg";

export default function Room({ room }) {
  const { name, slug, price } = room;
  const [image, setImage] = useState(defaultImg);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch("http://localhost:9292/api/room-images");
        const data = await response.json();
        if (data && data.length > 0) {
          setImage(data[0].url);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="col-md-4 col-12 mx-auto p-2">
      <div className="card shadow-lg border-0 room">
        <img src={image} alt="single room" className="img-fluid" />
        <div className="price-top">
          <h6>Rs {price}</h6>
          <p>per night</p>
        </div>
        <Link to={`/rooms/${slug}`} className="btn-warning room-link text-center">
          Features
        </Link>
        <p className="room-info">{name}</p>
      </div>
    </div>
  );
}
