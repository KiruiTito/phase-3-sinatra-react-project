import style from "./featuredProperties.module.css";
import Loader from "../Loader/Loader";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Featured_skeleton from "../Skeletons/Featured_skeleton";
const FeaturedProperties = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const isXtraSmallScreen = useMediaQuery("(max-width: 450px)");
  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  const [featuredData, setfeaturedData] = useState([]);
  const { activePath } = useSelector((state) => state.activePath);

  const HandleClick = async (city) => {
    if (activePath === "hotel") {
      try {
        const response = await fetch(
          `http://localhost:3000/hotels/gettophotels`
        );
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          // dispatch({ type: "SET_FEATURED_DATA", payload: data });
          setfeaturedData(data);
          // Navigate("/singleHotel");
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error(error);
      }
    } else if (activePath === "hotelAndParking") {
      try {
        const response = await fetch(
          `http://localhost:3000/hotelandparking/gettophotelandparkings`
        );
        if (response.ok) {
          const data = await response.json();
          // dispatch({ type: "SET_FEATURED_DATA", payload: data });
          setfeaturedData(data);
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const setHotelData = (hotel) => {
    // console.log("data inside Sethoteldata function", hotel);
    // dispatch({ type: "SET_SELECTED_HOTEL", payload: hotel });
    dispatch({
      type: "setHotelData",
      payload: hotel,
    });
    activePath === "hotel"
      ? Navigate("/singleHotel")
      : Navigate("/singleHotelAndParking");
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  // const { featured_hotel } = useSelector((state) => state.getfeaturedhotel);
  // featured_hotel.forEach((hotel) => {
  //   if (
  //     !hotel.photos &&
  //     !hotel.photos.length > 0 &&
  //     !hotel.hotel_photos
  //     !hotel.hotel_photos.length > 0
  //   ) {
  //     dispatch({ type: "SET_FEATURED_DATA", payload: [] });
  //   }
  //   console.log("hotel", hotel.photos);
  //   console.log("hotel and parking", hotel.hotel_photos);
  // });

  // console.log("featured_hotel", featured_hotel);
  useEffect(() => {
    HandleClick();
    // dispatch({ type: "SET_FEATURED_DATA", payload: [] });
  }, [activePath]);

  return (
    <>
      <div className={`container-fluid ${style.fp}`}>
        <div className="row">
          {activePath === "hotel" &&
            featuredData.map((hotel) => {
              return (
                <div className={`col-lg-3 col-md-6 col-sm-6 col-12 my-2 `}>
                  <img
                    src={
                      hotel.photos && hotel.photos.length > 0
                        ? hotel.photos[0]
                        : null
                    }
                    alt=""
                    className={` ${style.fpImg} rounded-2`}
                  />
                  <h5 className={`${style.fpName} mt-2`}>{hotel.name}</h5>
                  <div className="d-flex justify-content-start align-items-center">
                    <Rating
                      name="hover-feedback"
                      value={hotel.rating}
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                    <small className={`${style.fpCity} ms-2 mb-2 text-muted`}>
                      {hotel.city}
                    </small>
                  </div>
                  <small className={`${style.fpPrice}`}>
                    {hotel.description
                      ? hotel.description.slice(0, 60)
                      : "No Description"}
                    ...
                  </small>
                  <div className={style.fpRating}>
                    <button
                      className={`btn btn-primary mt-2 ${
                        isXtraSmallScreen ? "btn-sm" : "btn-md"
                      } btn-block`}
                      onClick={() => setHotelData(hotel)}
                    >
                      Explore Property
                    </button>
                  </div>
                </div>
                // <div
                //   className={`col-lg-3 col-md-6 col-sm-6 col-12 my-2 mx-auto`}
                // >
                //   <img
                //     src={
                //       hotel.photos && hotel.photos.length > 0
                //         ? hotel.photos[0]
                //         : null
                //     }
                //     alt=""
                //     className={` ${style.fpImg} rounded-2`}
                //   />
                //   <h5 className={`${style.fpName} mt-2`}>{hotel.name}</h5>
                //   <div className="d-flex justify-content-start align-items-center">
                //     <Rating
                //       name="hover-feedback"
                //       value={hotel.rating}
                //       precision={0.5}
                //       emptyIcon={
                //         <StarIcon
                //           style={{ opacity: 0.55 }}
                //           fontSize="inherit"
                //         />
                //       }
                //     />
                //     <small className={`${style.fpCity} ms-2 mb-2 text-muted`}>
                //       {hotel.city}
                //     </small>
                //   </div>
                //   <small className={`${style.fpPrice}`}>
                //     {hotel.description
                //       ? hotel.description.slice(0, 60)
                //       : "No Description"}
                //     ...
                //   </small>
                //   <div className={style.fpRating}>
                //     <button
                //       className={`btn btn-primary mt-2 ${
                //         isXtraSmallScreen ? "btn-sm" : "btn-md"
                //       } btn-block`}
                //       onClick={() => setHotelData(hotel)}
                //     >
                //       Explore Property
                //     </button>
                //   </div>
                // </div>
                // <div
                //   className={`col-lg-3 col-md-6 col-sm-6 col-12 my-2 mx-auto`}
                // >
                //   <img
                //     src={
                //       hotel.photos && hotel.photos.length > 0
                //         ? hotel.photos[0]
                //         : null
                //     }
                //     alt=""
                //     className={` ${style.fpImg} rounded-2`}
                //   />
                //   <h5 className={`${style.fpName} mt-2`}>{hotel.name}</h5>
                //   <div className="d-flex justify-content-start align-items-center">
                //     <Rating
                //       name="hover-feedback"
                //       value={hotel.rating}
                //       precision={0.5}
                //       emptyIcon={
                //         <StarIcon
                //           style={{ opacity: 0.55 }}
                //           fontSize="inherit"
                //         />
                //       }
                //     />
                //     <small className={`${style.fpCity} ms-2 mb-2 text-muted`}>
                //       {hotel.city}
                //     </small>
                //   </div>
                //   <small className={`${style.fpPrice}`}>
                //     {hotel.description
                //       ? hotel.description.slice(0, 60)
                //       : "No Description"}
                //     ...
                //   </small>
                //   <div className={style.fpRating}>
                //     <button
                //       className={`btn btn-primary mt-2 ${
                //         isXtraSmallScreen ? "btn-sm" : "btn-md"
                //       } btn-block`}
                //       onClick={() => setHotelData(hotel)}
                //     >
                //       Explore Property
                //     </button>
                //   </div>
                // </div>
              );
            })}
          {activePath === "hotelAndParking" &&
            featuredData.length > 0 &&
            featuredData.map((hotel) => {
              return (
                <div className={`col-lg-3 col-md-6 col-sm-6 col-12 my-2 `}>
                  <img
                    // src={
                    //   hotel.hotel_photos[0] === null
                    //     ? hotel.hotel_photos[0]
                    //     : null
                    // }
                    src={
                      hotel.hotel_photos && hotel.hotel_photos.length > 0
                        ? hotel.hotel_photos[0]
                        : null
                    }
                    alt=""
                    className={` ${style.fpImg} rounded-2`}
                  />
                  <h5 className={`${style.fpName} mt-2`}>{hotel.hotel_name}</h5>
                  <div className="d-flex justify-content-start align-items-center">
                    <Rating
                      name="hover-feedback"
                      value={hotel.hotel_rating}
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                    <small className={`${style.fpCity} ms-2 mb-2 text-muted`}>
                      {hotel.hotel_city}
                    </small>
                  </div>
                  <small className={`${style.fpPrice}`}>
                    {hotel.hotel_description
                      ? hotel.hotel_description.slice(0, 10)
                      : "No Description"}
                    ...
                  </small>
                  <div className={style.fpRating}>
                    <button
                      className={`btn btn-primary mt-2 ${
                        isXtraSmallScreen ? "btn-sm" : "btn-md"
                      } btn-block`}
                      onClick={() => setHotelData(hotel)}
                    >
                      Explore Property
                    </button>
                  </div>
                </div>
              );
            })}
          {featuredData.length === 0 && <Featured_skeleton />}
        </div>
      </div>
    </>
  );
};
export default FeaturedProperties;
