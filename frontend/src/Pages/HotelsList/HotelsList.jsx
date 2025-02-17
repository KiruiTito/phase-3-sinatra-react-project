import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import DataTable from "../../Components/dataTable/dataTable"
// import Dropdown from "../../Components/Filterdropdown/FilterDropdown";
// import DropdownFilter from "../../Components/dropdownFilter/Dropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import DatagridHeader from "../../Components/DatagridHeader/DatagridHeader";
import {
  hotelsHeader,
  userHeader,
  bookingHeader,
  parkingHeader,
  hotelAndParkingHeader,
  bookingHotelHeader,
  bookingParkingHeader,
  bookingHotelAndParkingHeader,
} from "../../Utilis/DataTableSource";
import AdminSidebar from "../../Components/adminSidebar/AdminSidebar";

const HotelsList = () => {
  const navigate = useNavigate();
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { user } = loggedinUser;
  const id = user._id;
  const IsSmalll = useMediaQuery("(max-width:768px)");
  const IsMobilee = useMediaQuery("(max-width:450px)");

  const dispatch = useDispatch();
  const location = useLocation();
  // const { disable } = useSelector((state) => state.disable);
  // const { disabled, name } = disable;
  const { view } = useSelector((state) => state.view);
  const path = location.pathname.split("/")[1];

  if (view === "admin") {
    if (path === "hotels") {
      dispatch({
        type: "SETURL",
        payload: "http://localhost:3000/hotels/getallhotels",
      });
      dispatch({ type: "SETHEADER", payload: hotelsHeader });
    } else if (path === "users") {
      dispatch({
        type: "SETURL",
        payload: "http://localhost:3000/user/getall",
      });
      dispatch({ type: "SETHEADER", payload: userHeader });
    } else if (path === "booking") {
      dispatch({
        type: "SETURL",
        payload: "http://localhost:3000/booking/getBooking",
      });
      dispatch({ type: "SETHEADER", payload: bookingHeader });
    } else if (path === "parkings") {
      dispatch({
        type: "SETURL",
        payload: "http://localhost:3000/parking/getallparkings",
      });
      dispatch({ type: "SETHEADER", payload: parkingHeader });
    } else if (path === "HotelsAndParkings") {
      dispatch({
        type: "SETURL",
        payload: "http://localhost:3000/hotelandparking/getallhotelandparkings",
      });
      dispatch({ type: "SETHEADER", payload: hotelAndParkingHeader });
    } else if (path === "hotelRequests") {
      dispatch({
        type: "SETURL",
        payload: "http://localhost:3000/hotels/getPendinghotels",
      });
      dispatch({ type: "SETHEADER", payload: hotelsHeader });
    } else if (path === "parkingRequests") {
      dispatch({
        type: "SETURL",
        payload: "http://localhost:3000/parking/getpendingparkings",
      });
      dispatch({ type: "SETHEADER", payload: parkingHeader });
    } else if (path === "hotelAndParkingRequests") {
      dispatch({
        type: "SETURL",
        payload:
          "http://localhost:3000/hotelandparking/getPendinghotelandparkings",
      });
      dispatch({ type: "SETHEADER", payload: hotelAndParkingHeader });
    } else if (path === "cancelbooking") {
      dispatch({
        type: "SETURL",
        payload: "http://localhost:3000/booking/getCancelledBookings",
      });
      dispatch({ type: "SETHEADER", payload: bookingHeader });
    }
  } else if (view === "partner") {
    if (path === "Property") {
      if (user.partner_type === "Hotel") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:3000/hotels/getApprovedhotelbyonwerid/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: hotelsHeader });
      } else if (user.partner_type === "Parking") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:3000/parking/getApprovedParkingByOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: parkingHeader });
      } else if (user.partner_type === "HotelAndParking") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:3000/hotelandparking/getApprovedhotelandparkingbyownerid/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: hotelAndParkingHeader });
      }
    } else if (path === "PropertyRequests") {
      if (user.partner_type === "Hotel") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:3000/hotels/getUnapprovedhotelbyonwerid/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: hotelsHeader });
      } else if (user.partner_type === "Parking") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:3000/parking/getUnapprovedParkingByOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: parkingHeader });
      } else if (user.partner_type === "HotelAndParking") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:3000/hotelandparking/getUnapprovedhotelandparkingbyownerid/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: hotelAndParkingHeader });
      }
    } else if (path === "booking") {
      if (user.partner_type === "Hotel") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:3000/booking/getBookingHotelByOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingHotelHeader });
      } else if (user.partner_type === "Parking") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:3000/booking/getBookingParkingByOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingParkingHeader });
      } else if (user.partner_type === "HotelAndParking") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:3000/booking/getBookingHotelandParkingByOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingHotelAndParkingHeader });
      }
    } else if (path === "cancelbooking") {
      if (user.partner_type === "Hotel") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:3000/booking/getCancelledBookingsByHotelOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingHotelHeader });
      } else if (user.partner_type === "Parking") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:3000/booking/getCancelledBookingsByParkingOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingParkingHeader });
      } else if (user.partner_type === "HotelAndParking") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:3000/booking/getCancelledBookingsByHotelAndParkingOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingHotelAndParkingHeader });
      }
    } else if (path === "bookingRequests") {
      if (user.partner_type === "Hotel") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:3000/booking/getUpcommingBookingsByHotelOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingHotelHeader });
      } else if (user.partner_type === "Parking") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:3000/booking/getUpcommingBookingsByParkingOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingParkingHeader });
      } else if (user.partner_type === "HotelAndParking") {
        dispatch({
          type: "SETURL",
          payload: `http://localhost:3000/booking/getUpcommingBookingsByHotelparkingOwnerId/${id}`,
        });
        dispatch({ type: "SETHEADER", payload: bookingHotelAndParkingHeader });
      }
    }
  } else if (view === "user") {
    if (path === "hotelbookings") {
      dispatch({
        type: "SETURL",
        payload: `http://localhost:3000/booking/getPreviousBookingHotelByUserId/${id}`,
      });
      dispatch({ type: "SETHEADER", payload: bookingHotelHeader });
    } else if (path === "parkingbookings") {
      dispatch({
        type: "SETURL",
        payload: `http://localhost:3000/booking/getPreviousBookingParkingByUserId/${id}`,
      });
      dispatch({ type: "SETHEADER", payload: bookingParkingHeader });
    } else if (path === "hotelandparkingbookings") {
      dispatch({
        type: "SETURL",
        payload: `http://localhost:3000/booking/getPreviousBookingHotelandParkingByUserId/${id}`,
      });
      dispatch({ type: "SETHEADER", payload: bookingHotelAndParkingHeader });
    } else if (path === "upcominghotelbookings") {
      dispatch({
        type: "SETURL",
        payload: `http://localhost:3000/booking/getUpcomingBookingHotelByUserId/${id}`,
      });
      dispatch({ type: "SETHEADER", payload: bookingHotelHeader });
    } else if (path === "upcomingparkingbookings") {
      dispatch({
        type: "SETURL",
        payload: `http://localhost:3000/booking/getUpcomingBookingParkingByUserId/${id}`,
      });
      dispatch({ type: "SETHEADER", payload: bookingParkingHeader });
    } else if (path === "upcominghotelandparkingbookings") {
      dispatch({
        type: "SETURL",
        payload: `http://localhost:3000/booking/getUpcomingBookingHotelandParkingByUserId/${id}`,
      });
      dispatch({ type: "SETHEADER", payload: bookingHotelAndParkingHeader });
    } else if (path === "cancelbooking") {
      dispatch({
        type: "SETURL",
        payload: `http://localhost:3000/booking/getCancelledBookingsByUserId/${id}`,
      });
      dispatch({ type: "SETHEADER", payload: bookingHeader });
    }
  }

  const IsMedium = useMediaQuery("(max-width:1000px)");
  const IsMobile = useMediaQuery("(max-width:768px)");
  // const option = ["City"];

  // const cityOption = [
  //   "Lahore",
  //   "Karachi",
  //   "Islamabad",
  //   "Dubai",
  //   "Tokyo",
  //   "London",
  //   "Paris",
  // ];
  // const hotelOption = [
  //   "Karachi",
  //   "Islamabad",
  //   "Dubai",
  //   "Tokyo",
  //   "London",
  //   "Paris",
  // ];
  // const parkingOption = [
  //   "Lahore",
  //   "Islamabad",
  //   "Dubai",
  //   "Tokyo",
  //   "London",
  //   "Paris",
  // ];
  // const hotelParkingOption = [
  //   "Lahore",
  //   "Karachi",
  //   "Dubai",
  //   "Tokyo",
  //   "London",
  //   "Paris",
  // ];

  const Addnew = () => {
    if (
      path === "hotels" ||
      path === "hotelRequests" ||
      (path === "Property" && user.partner_type === "Hotel") ||
      (path === "PropertyRequests" && user.partner_type === "Hotel")
    ) {
      // window.location.href = "/hotelform";
      navigate("/hotelform");
    } else if (path === "users") {
      // window.location.href = "/adduser";
      navigate("/adduser");
    } else if (path === "booking") {
      // window.location.href = "/addbooking";
      navigate("/addbooking");
    } else if (
      path === "parkings" ||
      path === "parkingRequests" ||
      (path === "Property" && user.partner_type === "Parking") ||
      (path === "PropertyRequests" && user.partner_type === "Parking")
    ) {
      // window.location.href = "/parkingform";
      navigate("/parkingform");
    } else if (
      path === "HotelsAndParkings" ||
      path === "hotelAndParkingRequests" ||
      (path === "Property" && user.partner_type === "HotelAndParking") ||
      (path === "PropertyRequests" && user.partner_type === "HotelAndParking")
    ) {
      // window.location.href = "/hotelparkingform";
      
    }
  };

  return (
    <>
      
      <div className="d-flex">
        <AdminSidebar/>
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-md-12">
              {view === "admin" ? (
                path === "hotels" ? (
                  // <h2 className="fs-1 mb-2 mt-4">Hotels</h2>
                  <DatagridHeader title="Hotels" subtitle="Results" />
                ) : path === "users" ? (
                  // <h2 className="fs-1 mb-2 mt-4">Users</h2>
                  <DatagridHeader title="Users" subtitle="Results" />
                ) : path === "booking" ? (
                  // <h2 className="fs-1 mb-2 mt-4">Bookings</h2>
                  <DatagridHeader title="Bookings" subtitle="Results" />
                ) : path === "parkings" ? (
                  // <h2 className="fs-1 mb-2 mt-4">Parkings</h2>
                  <DatagridHeader title="Parkings" subtitle="Results" />
                ) : path === "HotelsAndParkings" ? (
                  // <h2 className="fs-1 mb-2 mt-4">Hotels and Parkings</h2>
                  <DatagridHeader
                    title="Hotel and Parkings"
                    subtitle="Results"
                  />
                ) : path === "hotelRequests" ? (
                  // <h2 className="fs-1 mb-2 mt-4">Pending Hotels</h2>
                  <DatagridHeader title="Pending Hotels" subtitle="Results" />
                ) : path === "parkingRequests" ? (
                  // <h2 className="fs-1 mb-2 mt-4">Pending Parkings</h2>
                  <DatagridHeader title="Pending Parkings" subtitle="Results" />
                ) : path === "hotelAndParkingRequests" ? (
                  // <h2 className="fs-1 mb-2 mt-4">Pending Hotels And Parkings</h2>
                  <DatagridHeader
                    title="Pending Hotel and Parkings"
                    subtitle="Results"
                  />
                ) : null
              ) : view === "partner" ? (
                path === "Property" ? (
                  user.partner_type === "Hotel" ? (
                    // <h2 className="fs-1 mb-2 mt-4">My Hotels</h2>
                    <DatagridHeader title="My Hotels" subtitle="Results" />
                  ) : user.partner_type === "Parking" ? (
                    // <h2 className="fs-1 mb-2 mt-4">My Parkings</h2>
                    <DatagridHeader title="My Parkings" subtitle="Results" />
                  ) : user.partner_type === "HotelAndParking" ? (
                    // <h2 className="fs-1 mb-2 mt-4">My Hotels and Parking</h2>

                    <DatagridHeader
                      title="My Hotel and Parkings"
                      subtitle="Results"
                    />
                  ) : null
                ) : path === "booking" ? (
                  user.partner_type === "Hotel" ? (
                    // <h2 className="fs-1 mb-2 mt-4">My Hotels Bookings</h2>
                    <DatagridHeader
                      title="My Hotels Bookings"
                      subtitle="Results"
                    />
                  ) : user.partner_type === "Parking" ? (
                    // <h2 className="fs-1 mb-2 mt-4">My Parkings Bookings</h2>
                    <DatagridHeader
                      title="My Parkings Bookings"
                      subtitle="Results"
                    />
                  ) : user.partner_type === "HotelAndParking" ? (
                    // <h2 className="fs-1 mb-2 mt-4">
                    //   My Hotels and Parking Bookings
                    // </h2>
                    <DatagridHeader
                      title="My Hotel and Parkings Bookings"
                      subtitle="Results"
                    />
                  ) : null
                ) : path === "PropertyRequests" ? (
                  user.partner_type === "Hotel" ? (
                    // <h2 className="fs-1 mb-2 mt-4">Pending Hotels</h2>
                    <DatagridHeader title="Pending Hotels" subtitle="Results" />
                  ) : user.partner_type === "Parking" ? (
                    // <h2 className="fs-1 mb-2 mt-4">Pending Parkings</h2>
                    <DatagridHeader
                      title="Pending Parkings"
                      subtitle="Results"
                    />
                  ) : user.partner_type === "HotelAndParking" ? (
                    // <h2 className="fs-1 mb-2 mt-4">Pending Hotels And Parkings</h2>
                    <DatagridHeader
                      title="Pending Hotel and Parkings"
                      subtitle="Results"
                    />
                  ) : null
                ) : path === "bookingRequests" ? (
                  user.partner_type === "Hotel" ? (
                    // <h2 className="fs-1 mb-2 mt-4">Pending Hotel Bookings</h2>
                    <DatagridHeader
                      title="Pending Hotel Bookings"
                      subtitle="Results"
                    />
                  ) : user.partner_type === "Parking" ? (
                    // <h2 className="fs-1 mb-2 mt-4">Pending Parkings Bookings</h2>
                    <DatagridHeader
                      title="Pending Parkings Bookings"
                      subtitle="Results"
                    />
                  ) : user.partner_type === "HotelAndParking" ? (
                    // <h2 className="fs-1 mb-2 mt-4">
                    //   Pending Hotels And Parkings Bookings
                    // </h2>
                    <DatagridHeader
                      title="Pending Hotels And Parkings Bookings"
                      subtitle="Results"
                    />
                  ) : null
                ) : null
              ) : view === "user" ? (
                path === "hotelbookings" ? (
                  // <h2 className="fs-1 mb-2 mt-4">My Hotel Bookings</h2>
                  <DatagridHeader
                    title="My Hotel Bookings"
                    subtitle="Results"
                  />
                ) : path === "parkingbookings" ? (
                  // <h2 className="fs-1 mb-2 mt-4">My Parking Bookings</h2>
                  <DatagridHeader
                    title="My Parkings Bookings"
                    subtitle="Results"
                  />
                ) : path === "hotelandparkingbookings" ? (
                  // <h2 className="fs-1 mb-2 mt-4">My Hotel and Parking Bookings</h2>
                  <DatagridHeader
                    title="My Hotel and Parkings Bookings"
                    subtitle="Results"
                  />
                ) : path === "upcominghotelbookings" ? (
                  // <h2 className="fs-1 mb-2 mt-4">Upcoming Hotel Bookings</h2>
                  <DatagridHeader
                    title="Upcoming Hotel Bookings"
                    subtitle="Results"
                  />
                ) : path === "upcomingparkingbookings" ? (
                  // <h2 className="fs-1 mb-2 mt-4">Upcoming Parking Bookings</h2>
                  <DatagridHeader
                    title="Upcoming Parkings Bookings"
                    subtitle="Results"
                  />
                ) : path === "upcominghotelandparkingbookings" ? (
                  // <h2 className="fs-1 mb-2 mt-4">
                  //   Upcoming Hotel and Parking Bookings
                  // </h2>
                  <DatagridHeader
                    title="Upcoming Hotel and Parkings Bookings"
                    subtitle="Results"
                  />
                ) : null
              ) : null}
            </div>
            {/* results */}

            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex me-2 mb-3">
                    {/* <h2 className="fs-4 my-0">Results</h2> */}
                    <button
                      className="btn btn-primary fw-bold ms-auto me-3"
                      onClick={Addnew}
                    >
                      Add new
                    </button>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="table-responsive">
                    <DataTable path={path} user={user} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelsList;