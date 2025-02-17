import React, { useState } from "react";
import FormData from "form-data";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import style from "../Hotel_Forms/addhotel.module.css";
import AdminSidebar from "../../adminSidebar/AdminSidebar";

const UpdateHotelAndParking = () => {
  //Alerts Code
  const [alertOn, setAlertOn] = useState(false);
  const [open, setOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");

  const IsMobile = useMediaQuery("(max-width:450px)");
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);

  const defaultFormValues = {
    Facilities: [],
    _id: "643eb15477415c1e01955be6",
    hotel_name: "Grandiose Hotel",
    hotel_title: "Hotel",
    hotel_rating: 3.5,
    hotel_description:
      "Welcome to the Grandiose Hotel, where luxury meets comfort. Our hotel boasts spacious and elegantly designed rooms, complete with all the modern amenities you need for a relaxing and enjoyable stay. Our plush beds with high-quality linens will provide you with a restful night's sleep.\r\n\r\nOur on-site restaurant serves a delectable range of international cuisines prepared by our expert chefs. You can also unwind with a refreshing cocktail at our bar, which offers an extensive selection of drinks.\r\n\r\nIf you're looking to stay active during your trip, our fitness center is equipped with state-of-the-art equipment to help you maintain your fitness routine. We also have a swimming pool where you can take a refreshing dip and soak up the sun.\r\n\r\nFor business travelers, we offer a fully equipped business center and conference rooms, perfect for hosting meetings and events.\r\n\r\nAt the Grandiose Hotel, our friendly staff is always on hand to provide you with personalized service and ensure that you have a memorable stay. We look forward to welcoming you!",
    hotel_photos: [
    "http://localhost:3000/uploads/Hotel_Parking_Images/hotelPic5.jpg",
    "http://localhost:3000/uploads/Hotel_Parking_Images/hotelPic6.jpg",
    "http://localhost:3000/uploads/Hotel_Parking_Images/hotelPic7.jpg",
    "http://localhost:3000/uploads/Hotel_Parking_Images/hotelPic8.jpg",
    "http://localhost:3000/uploads/Hotel_Parking_Images/hotelPic18.jpg",
    "http://localhost:3000/uploads/Hotel_Parking_Images/hotelPic19.jpg",
    "http://localhost:3000/uploads/Hotel_Parking_Images/hotelPic20.jpg"
    
    ],
    hotel_city: "Lahore",
    hotel_country: "Pakistan",
    hotel_address: "Gulberg 3",
    parking_name: "Grandiose Pakring",
    parking_title: "Pakring ",
    parking_total_slots: 100,
    parking_booked_slots: 9,
    parking_description:
      "At the Grandiose Hotel, we understand the importance of convenient and secure parking for our guests. That's why we offer a spacious and well-lit parking area, located right on our premises.\r\n\r\nOur parking area is monitored 24/7 by security personnel, ensuring the safety of your vehicle during your stay with us. We also have surveillance cameras installed throughout the parking area for added security.\r\n\r\nOur parking area is suitable for both small and large vehicles, with ample space to accommodate cars, SUVs, and vans. We also have designated spaces for guests with disabilities.\r\n\r\nIn addition to our standard parking services, we also offer valet parking for guests who prefer a more personalized service. Our valet attendants will park your vehicle for you and bring it back to you when you're ready to leave.\r\n\r\nWhether you're visiting us for business or leisure, you can rest assured that your vehicle is in safe hands at the Grandiose Hotel's parking area.",
    parking_photos: [
      "http://localhost:3000/uploads/Hotel_Parking_Images/parking7.jpg",
      "http://localhost:3000/uploads/Hotel_Parking_Images/listing-06.jpg",
    ],
    parking_price: 50,
  };

  const [formValues, setFormValues] = useState(defaultFormValues);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const DeleteHotelImages = async (image) => {
    alert(
      `Are you Sure You Want to Delete This Image? It will be permanently deleted from the Server!`
    );

    let url = `http://localhost:3000/hotelandparking/deletehotelimage/${defaultFormValues._id}`;
    const data = { link: image }; // Request body data as an object
    const options = {
      method: "DELETE", // Replace with the desired HTTP method (e.g., POST, PUT, DELETE)
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(data), // Convert the data object to a JSON string
    };

    const response = await fetch(url, options);
    const Responsedata = await response.json();
    console.log(Responsedata);
  };

  const DeleteParkingImages = async (image) => {
    alert(
      `Are you Sure You Want to Delete This Image? It will be permanently deleted from the Server!`
    );

    let url = `http://localhost:3000/hotelandparking/deleteparkingimage/${defaultFormValues._id}`;
    const data = { link: image.blobURL }; // Request body data as an object
    const options = {
      method: "DELETE", // Replace with the desired HTTP method (e.g., POST, PUT, DELETE)
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(data), // Convert the data object to a JSON string
    };

    const response = await fetch(url, options);
    const Responsedata = await response.json();
    console.log(Responsedata);
  };

  const { mode } = useSelector((state) => state.mode);

  console.log(formValues);

  const [hotelimages, setHotelimages] = useState([]); // To Store Hotel Images Files
  const [parkingimages, setParkingimages] = useState([]); // To Store parking Images Files

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    let ArrayObj = selectedFilesArray.map((file) => {
      return { file: file, blobURL: URL.createObjectURL(file) };
    });
    let dummyArray = [...hotelimages];
    ArrayObj.forEach((newImageObj) => {
      dummyArray.push(newImageObj);
    });
    setHotelimages(dummyArray);
  };
  const onParkingSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    let ArrayObj = selectedFilesArray.map((file) => {
      return { file: file, blobURL: URL.createObjectURL(file) };
    });
    let dummyArray = [...parkingimages];
    ArrayObj.forEach((newImagrObj) => {
      dummyArray.push(newImagrObj);
    });
    setParkingimages(dummyArray);
  };

  function deleteHandler(imageObj) {
    // New Code
    setHotelimages((prevImages) => {
      prevImages.filter((image) => image !== imageObj);
    });
    // New Code

    // setSelectedImages(selectedImages.filter((e) => e !== imageObj));
    // URL.revokeObjectURL(image);
    // const newImages = [...hotelimages];
    // newImages.splice(image, 1);
    // setHotelimages(newImages);
  }
  function deleteParkingHandler(imageObj) {
    // New Code
    setParkingimages((prevImages) => {
      prevImages.filter((image) => image !== imageObj);
    });
    // New Code

    // setParkingImages(parkingImages.filter((e) => e !== image));
    // URL.revokeObjectURL(image);
    // const newImages = [...parkingimages];
    // newImages.splice(image, 1);
    // setParkingimages(newImages);
  }

  // Add Features Code
  const defaultFeatures = [
    "Luxurious Rooms and Suites",
    "Multiple Restaurants and Cafes",
    "24-hour Room Service",
    "Fitness Center",
    "Spa and Wellness Center",
    "Outdoor Swimming Pool",
    "Business Center",
    "Conference and Event Spaces",
    "Concierge Services",
    "Valet Parking",
    "Self-Parking",
    "Laundry and Dry Cleaning Services",
    "Complimentary Wi-Fi",
    "24-hour Front Desk and Security",
  ];
  const [features, setFeatures] = useState([...defaultFeatures]);
  const [newFeature, setNewFeature] = useState("");

  const handleAddFeature = (event) => {
    event.preventDefault();
    if (newFeature && !features.includes(newFeature)) {
      setFeatures([...features, newFeature]);
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (featureToRemove) => {
    setFeatures(features.filter((feature) => feature !== featureToRemove));
  };
  // Add Features Code

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    // formData.append("ownerId", loggedinUser.user._id);
    formData.append("hotel_name", formValues.hotel_name);
    formData.append("hotel_title", formValues.hotel_title);
    formData.append("parking_name", formValues.parking_name);
    formData.append("hotel_rating", formValues.hotel_rating);
    formData.append("parking_title", formValues.parking_title);
    formData.append("total_slots", formValues.parking_total_slots);
    formData.append("booked_slots", formValues.parking_booked_slots);
    formData.append("parking_description", formValues.parking_description);
    formData.append("hotel_description", formValues.hotel_description);
    formData.append("price", formValues.parking_price);
    formData.append("city", formValues.hotel_city);
    formData.append("country", formValues.hotel_country);
    formData.append("address", formValues.hotel_address);
    for (let i = 0; i < features.length; i++) {
      formData.append("facilities", features[i]);
    }

    // Append each photo in the photos array to the FormData object
    for (let i = 0; i < hotelimages.length; i++) {
      formData.append("hotelPhotos", hotelimages[i].file);
    }
    for (let i = 0; i < parkingimages.length; i++) {
      formData.append("parkingPhotos", parkingimages[i].file);
    }
    const url = `http://localhost:3000/hotelandparking/updatehotelandparkingdata/${formValues._id}}`;

    const options = {
      method: "PATCH",
      body: formData,
    };

    try {
      const response = await fetch(url, options);
      if (response.status === 200) {
        setAlertOn(true);
        setAlertType("success");
        setAlertMessage("Hotel And Parking Added Successfully");
        setTimeout(() => {
          setOpen(false);
        }, 7000);
      } else {
        setAlertOn(true);
        setAlertType("error");
        setAlertMessage("Something went wrong");
        setTimeout(() => {
          setOpen(false);
        }, 7000);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(formValues);
  console.log("Hotel Images", hotelimages);
  console.log("Parking Images", parkingimages);

  return (
    <>
      <div className="d-flex">
        <AdminSidebar />
        <div className="mt-5">
          {alertOn && (
            <Collapse in={open}>
              <Stack sx={{ width: "100%" }} spacing={1}>
                <Alert
                  sx={{
                    borderRadius: "9999px", // make the alert appear as a pill shape
                    transition: "transform 0.3s ease-in-out", // add a transition effect
                    transform: open ? "scale(1)" : "scale(0.7)", // scale the alert based on the open state
                    mt: 2,
                    mb: 2,
                    ml: 2,
                    mr: 2,
                  }}
                  severity={alertType}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                      sx={{ mt: 1.5 }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  <AlertTitle>Add Hotel</AlertTitle>
                  <strong>{alertMessage}!</strong>
                </Alert>
              </Stack>
            </Collapse>
          )}
          <div className={`container  ${IsMobile ? "" : "w-50"} `}>
            <h1 className="text-center fw-bold">Update Hotel And Parking</h1>
            <form className="needs-validation mx-4">
              <div className="row mt-2">
                <div className="col-md-6">
                  <label
                    htmlFor="validationCustom01"
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Hotel Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Parking Name"
                    name="hotel_name"
                    id="validationCustom01"
                    value={formValues.hotel_name}
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Hotel Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Hotel Title"
                    name="hotel_title"
                    value={formValues.hotel_title}
                    required
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label
                    htmlFor="validationCustom01"
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Parking Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Parking Name"
                    name="parking_name"
                    id="validationCustom01"
                    value={formValues.parking_name}
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Parking Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Parking Title"
                    name="parking_title"
                    value={formValues.parking_title}
                    required
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-4">
                  <label
                    htmlFor="validationCustom01"
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Total Slots
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Total Slots"
                    name="parking_total_slots"
                    id="validationCustom01"
                    value={formValues.parking_total_slots}
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Booked Slots
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Booked Slots"
                    name="parking_booked_slots"
                    value={formValues.parking_booked_slots}
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="validationCustom01"
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Hotel Rating
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Rating"
                    name="hotel_rating"
                    id="validationCustom01"
                    value={formValues.hotel_rating}
                    required
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mt-2">
                  <label
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Area"
                    value={formValues.hotel_address}
                    name="hotel_address"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <label
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Parking parking_price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="parking_price"
                    value={formValues.parking_price}
                    name="parking_price"
                    required
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="country"
                    value={formValues.hotel_country}
                    name="hotel_country"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="state"
                    value={formValues.hotel_city}
                    name="hotel_city"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Hotel Description
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="description"
                    value={formValues.hotel_description}
                    name="hotel_description"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Parking Description
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="description"
                    value={formValues.parking_description}
                    name="parking_description"
                    required
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row">
                <label
                  htmlFor=""
                  className={`labels mt-2 text-${
                    mode === "light" ? "dark" : "light"
                  }`}
                >
                  Available Hotel Images
                </label>
                <div className="col-md-12 col-sm-4">
                  <div className={style.image_selector}>
                    {formValues.hotel_photos &&
                      formValues.hotel_photos.map((image, index) => {
                        return (
                          <div
                            key={image}
                            className={`${style.image_preview} mx-1 my-1`}
                          >
                            <img
                              className={style.preview_image}
                              src={image}
                              alt="upload"
                            />
                            <div
                              className={`${style.image_overlay} d-flex flex-row justify-content-between`}
                            >
                              <p
                                className={`${style.image_number} text-light ms-1`}
                              >
                                {index + 1}
                              </p>
                              <IconButton
                                aria-label="delete"
                                size="small"
                                className={style.delete_button}
                              >
                                <DeleteIcon
                                  className="text-light me-1"
                                  onClick={() => DeleteHotelImages(image)}
                                  fontSize="small"
                                />
                              </IconButton>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="row">
                <label
                  htmlFor=""
                  className={`labels mt-2 text-${
                    mode === "light" ? "dark" : "light"
                  }`}
                >
                  Upload Hotel Images
                </label>
                <small>Please select 3-7 images only </small>
                <div className="col-md-12 col-sm-4">
                  <div className={style.image_selector}>
                    {hotelimages &&
                      hotelimages.map((imageObj, index) => {
                        return (
                          <div
                            key={index}
                            className={`${style.image_preview} mx-1 my-1`}
                          >
                            <img
                              className={style.preview_image}
                              src={imageObj.blobURL}
                              alt="upload"
                            />
                            <div
                              className={`${style.image_overlay} d-flex flex-row justify-content-between`}
                            >
                              <p
                                className={`${style.image_number} text-light ms-1`}
                              >
                                {index + 1}
                              </p>
                              <IconButton
                                aria-label="delete"
                                size="small"
                                className={style.delete_button}
                              >
                                <DeleteIcon
                                  className="text-light me-1"
                                  onClick={() => deleteHandler(imageObj)}
                                  fontSize="small"
                                />
                              </IconButton>
                            </div>
                          </div>
                        );
                      })}
                    <IconButton
                      color="secondary"
                      aria-label="upload picture"
                      component="label"
                      className={style.add_button}
                    >
                      <input
                        hidden
                        onChange={onSelectFile}
                        accept="image/png , image/jpeg"
                        type="file"
                        multiple
                      />
                      <AddPhotoAlternateIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
              <div className="row">
                <label
                  htmlFor=""
                  className={`labels mt-2 text-${
                    mode === "light" ? "dark" : "light"
                  }`}
                >
                  Available Parking Images
                </label>
                <small>Please select 3-7 images only </small>
                <div className="col-md-12 col-sm-4">
                  <div className={style.image_selector}>
                    {formValues.parking_photos &&
                      formValues.parking_photos.map((image, index) => {
                        return (
                          <div
                            key={image}
                            className={`${style.image_preview} mx-1 my-1`}
                          >
                            <img
                              className={style.preview_image}
                              src={image}
                              alt="upload"
                            />
                            <div
                              className={`${style.image_overlay} d-flex flex-row justify-content-between`}
                            >
                              <p
                                className={`${style.image_number} text-light ms-1`}
                              >
                                {index + 1}
                              </p>
                              <IconButton
                                aria-label="delete"
                                size="small"
                                className={style.delete_button}
                              >
                                <DeleteIcon
                                  className="text-light me-1"
                                  onClick={() => DeleteParkingImages(image)}
                                  fontSize="small"
                                />
                              </IconButton>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="row">
                <label
                  htmlFor=""
                  className={`labels mt-2 text-${
                    mode === "light" ? "dark" : "light"
                  }`}
                >
                  Upload Parking Images
                </label>
                <small>Please select 3-7 images only </small>
                <div className="col-md-12 col-sm-4">
                  <div className={style.image_selector}>
                    {parkingimages &&
                      parkingimages.map((imageObj, index) => {
                        return (
                          <div
                            key={index}
                            className={`${style.image_preview} mx-1 my-1`}
                          >
                            <img
                              className={style.preview_image}
                              src={imageObj.blobURL}
                              alt="upload"
                            />
                            <div
                              className={`${style.image_overlay} d-flex flex-row justify-content-between`}
                            >
                              <p
                                className={`${style.image_number} text-light ms-1`}
                              >
                                {index + 1}
                              </p>
                              <IconButton
                                aria-label="delete"
                                size="small"
                                className={style.delete_button}
                              >
                                <DeleteIcon
                                  className="text-light me-1"
                                  onClick={() => deleteParkingHandler(imageObj)}
                                  fontSize="small"
                                />
                              </IconButton>
                            </div>
                          </div>
                        );
                      })}
                    <IconButton
                      color="secondary"
                      aria-label="upload picture"
                      component="label"
                      className={style.add_button}
                    >
                      <input
                        hidden
                        onChange={onParkingSelectFile}
                        accept="image/png , image/jpeg"
                        type="file"
                        multiple
                      />
                      <AddPhotoAlternateIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="form-group">
                  <label htmlFor="feature">Hotel And Parking Feature</label>
                  <input
                    type="text"
                    className="form-control"
                    id="feature"
                    name="feature"
                    placeholder="Enter a feature"
                    value={newFeature}
                    onChange={(event) => setNewFeature(event.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-sm my-2 btn-primary"
                  onClick={handleAddFeature}
                >
                  Add Feature
                </button>
                <div className="mt-2">
                  {features.map((feature) => (
                    <span
                      key={feature}
                      style={{ fontSize: "14px" }}
                      className="badge badge-pill rounded-pill badge-info p-2 mx-1 mr-1 mb-1"
                    >
                      {feature}{" "}
                      <ClearIcon
                        fontSize="small"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRemoveFeature(feature)}
                      />
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary btn-lg profile-button mb-4"
                  type="submit"
                  // disabled={
                  //   hotelimages.length < 3 ||
                  //   hotelimages.length > 7 ||
                  //   parkingimages.length < 3 ||
                  //   parkingimages.length > 7
                  // }
                  onClick={handleSubmit}
                >
                  Add Hotel And Parking
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateHotelAndParking;
