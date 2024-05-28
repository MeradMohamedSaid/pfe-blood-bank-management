import React from "react";
import AplicationIcon from "../assets/rqstIcon.svg";
import HistoryIcon from "../assets/HstryIcon.svg";
import AppointmentIcon from "../assets/rdvIcon.svg";
import {
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
  ArrowPathIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

const UserNavbar = () => {
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const logout = async () => {
    axios
      .post("http://localhost:3000/logout")
      .then((response) => {
        if (response.status === 200) {
          console.log("Logout successful");
          window.reload();
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [loggedIn, setLoggedIn] = useState(true);
  const [role, setUserRole] = useState();
  const [loading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [docs, setDocs] = useState(0);
  const [showSetting, setShowSettings] = useState(false);
  const [userID, setUserId] = useState();
  useEffect(() => {
    const checkLoggedIn = async () => {
      const data = await getUserRole();
      console.log(data.Role);
      setUserRole((old) => data.Role);
      if (data.Role !== 2) {
        setLoggedIn((loggedin) => false);
        setIsLoading(false);
        navigate("/");
      } else {
        setLoggedIn((loggedin) => true);
        setIsLoading(false);
      }
    };
    checkLoggedIn();
    const userStatus = async () => {
      const data = await getUserStatus();
      console.log("Data user Status : ", data);
      if (data.Stat === 0) {
        setIsVerified((old) => false);
      } else {
        setIsVerified((old) => true);
      }
      if (data.docs !== 1) {
        setDocs((olds) => data.docs);
        if (data.docs === 0) navigate("/donor");
      } else {
        setDocs((olds) => data.docs);
      }
      setUserId((oldid) => data.id);
      await handleFetchUserInfo(data.id);

      new Promise((resolve) => {
        setTimeout(() => {
          setIsLoading(false);
          resolve();
        }, 500);
      });
    };
    userStatus();
  }, []);

  const getUserRole = async () => {
    try {
      const response = await axios.get("http://localhost:3000/userRole", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.data) {
        throw new Error("Failed to fetch user role data");
      }

      console.log("User role data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user role data:", error.message);
      throw error;
    }
  };
  const getUserStatus = async () => {
    try {
      const response = await axios.get("http://localhost:3000/userStat", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.data) {
        throw new Error("Failed to fetch user role data");
      }

      console.log("User role data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user role data:", error.message);
      throw error;
    }
  };

  const navigate = useNavigate();

  const fetchUsersInfo = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${id}`);
      console.log("User Data:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  const handleFetchUserInfo = async (id) => {
    const response = await fetchUsersInfo(id);
    console.log("Fetch use info data : ", response.Result);
    setUserEmail((old) => response.Result.email);
    setUserName((o) => response.Result.name);
    setUserPhone((o) => response.Result.phone);
  };
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const [formValues, setFormValues] = useState({
    emailField: "",
    nameField: "",
    passwordField: "",
    newPassField: "",
    phoneField: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:3000/updateDonorInfo",
        formValues
      );
      setResponseMessage(response.data.message);
      await new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          await handleFetchUserInfo(userID);
          setShowSettings((old) => false);
          setFormValues({
            emailField: "",
            nameField: "",
            passwordField: "",
            newPassField: "",
            phoneField: "",
          });
          resolve();
        }, 500);
      });
    } catch (error) {
      setResponseMessage(
        error.response
          ? error.response.data.message
          : "Error updating donor info"
      );
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    const handleChangeResp = async () => {
      new Promise((resolve, reject) => {
        setTimeout(() => {
          setResponseMessage((old) => "");
          resolve();
        }, 4000);
      });
    };
    handleChangeResp();
  }, [responseMessage]);

  return (
    <div className="fade-in-left-to-right fixed flex flex-col  justify-center items-center top-0 border-r border-transparent shadow-xl h-full left-0 p-4 z-10">
      {/* Links */}
      <div className="flex flex-col gap-4 mt-auto">
        <Link
          to="/donor/appointment"
          className="h-fit w-fit p-4 rounded-xl bg-white hover:bg-red-100 hover:scale-110 duration-300 hover:border-red border border-transparent cursor-pointer"
        >
          <img className="w-12 h-12" src={AppointmentIcon} alt="" />
        </Link>

        {isVerified && (
          <>
            <Link
              to="/donor/history"
              className="h-fit w-fit p-4 rounded-xl bg-white hover:bg-red-100 hover:scale-110 duration-300 hover:border-red border border-transparent cursor-pointer"
            >
              <img className="w-12 h-12" src={HistoryIcon} alt="" />
            </Link>
          </>
        )}
        {!isVerified && docs !== 0 && (
          <Link
            to="/donor/application"
            className="h-fit w-fit p-4 rounded-xl bg-white hover:bg-red-100 hover:scale-110 duration-300 hover:border-red border border-transparent cursor-pointer"
          >
            <img className="w-12 h-12" src={AplicationIcon} alt="" />
          </Link>
        )}
      </div>
      {/* LogOut and Settings */}
      <div className="mt-auto flex gap-2">
        <div
          className="h-fit w-fit p-4 rounded-xl text-white bg-red hover:scale-110 duration-300 border-red border cursor-pointer"
          onClick={() => {
            handleLogout();
          }}
        >
          <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
        </div>
        <div
          onClick={() => {
            setShowSettings((old) => true);
            setFormValues({
              emailField: "",
              nameField: "",
              passwordField: "",
              newPassField: "",
              phoneField: "",
            });
            setResponseMessage("");
          }}
          className="h-fit w-fit p-4 rounded-xl bg-white text-red hover:text-white hover:bg-red hover:scale-110 duration-300 hover:border-red border border-transparent cursor-pointer"
        >
          <Cog6ToothIcon className="w-6 h-6" />
        </div>
      </div>
      {showSetting && (
        <>
          <div className="absolute top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-20 flex flex-col justify-center items-center">
            <div className="w-[40%] h-[70%] rounded-xl flex flex-col justify-center items-center gap-5 backdrop-blur-2">
              <h1 className="text-3xl font-bold">Profile Settings</h1>
              <div className="w-full bg-gray flex gap-5 px-10 items-center justify-center">
                <div>
                  <h2>User Name : </h2>
                  <div className="py-[5px] pl-2 bg-white border-[1.5px] rounded-md border-red w-full flex justify-start items-center">
                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="User Name"
                        className="w-full outline-none"
                        name="nameField"
                        value={formValues.nameField}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="px-5 flex justify-start items-center gap-[1px]">
                      <span
                        onClick={() =>
                          setFormValues((old) => ({
                            ...old,
                            nameField: userName,
                          }))
                        }
                        className="cursor-pointer px-3 py-1 rounded-md hover:bg-gray-200 duration-300"
                      >
                        <ArrowPathIcon className="w-5 " />
                      </span>
                      <span
                        onClick={() =>
                          setFormValues((old) => ({
                            ...old,
                            nameField: "",
                          }))
                        }
                        className="text-red cursor-pointer px-3 py-1  rounded-md hover:bg-gray-200 duration-300"
                      >
                        <XMarkIcon className="w-6 " />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray flex gap-5 px-10 items-center justify-center">
                <div>
                  <h2>User Email : </h2>
                  <div className="py-[5px] pl-2 bg-white border-[1.5px] rounded-md border-red w-full flex justify-start items-center">
                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="User Email"
                        className="w-full outline-none"
                        name="emailField"
                        value={formValues.emailField}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="px-5 flex justify-start items-center gap-[1px]">
                      <span
                        onClick={() =>
                          setFormValues((old) => ({
                            ...old,
                            emailField: userEmail,
                          }))
                        }
                        className="cursor-pointer px-3 py-1 rounded-md hover:bg-gray-200 duration-300"
                      >
                        <ArrowPathIcon className="w-5 " />
                      </span>
                      <span
                        onClick={() =>
                          setFormValues((old) => ({
                            ...old,
                            emailField: "",
                          }))
                        }
                        className="text-red cursor-pointer px-3 py-1  rounded-md hover:bg-gray-200 duration-300"
                      >
                        <XMarkIcon className="w-6 " />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray flex gap-5 px-10 items-center justify-center">
                <div>
                  <h2>User Phonenumber : </h2>
                  <div className="py-[5px] pl-2 bg-white border-[1.5px] rounded-md border-red w-full flex justify-start items-center">
                    <div className="w-full">
                      <input
                        type="number"
                        placeholder="User PhoneNumber"
                        className="w-full outline-none"
                        name="phoneField"
                        value={formValues.phoneField}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="px-5 flex justify-start items-center gap-[1px]">
                      <span
                        onClick={() =>
                          setFormValues((old) => ({
                            ...old,
                            phoneField: userPhone,
                          }))
                        }
                        className="cursor-pointer px-3 py-1 rounded-md hover:bg-gray-200 duration-300"
                      >
                        <ArrowPathIcon className="w-5 " />
                      </span>
                      <span
                        onClick={() =>
                          setFormValues((old) => ({
                            ...old,
                            phoneField: "",
                          }))
                        }
                        className="text-red cursor-pointer px-3 py-1  rounded-md hover:bg-gray-200 duration-300"
                      >
                        <XMarkIcon className="w-6 " />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray flex gap-5 px-10 items-center justify-center">
                <div>
                  <h2>User New Password : </h2>
                  <div className="py-[5px] pl-2 bg-white border-[1.5px] rounded-md border-red w-full flex justify-start items-center">
                    <div className="w-full">
                      <input
                        type="password"
                        placeholder="User New Password"
                        className="w-full outline-none"
                        name="newPassField"
                        value={formValues.newPassField}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="px-5 flex justify-start items-center gap-[1px]">
                      <span className="px-3 py-1 rounded-md opacity-0">
                        <ArrowPathIcon className="w-5 " />
                      </span>
                      <span
                        onClick={() =>
                          setFormValues((old) => ({
                            ...old,
                            newPassField: "",
                          }))
                        }
                        className="text-red cursor-pointer px-3 py-1  rounded-md hover:bg-gray-200 duration-300"
                      >
                        <XMarkIcon className="w-6 " />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[50%] border-b-2"></div>
              <div className="w-full bg-gray flex gap-5 px-10 items-center justify-center">
                <div>
                  <h2>Confirm password : </h2>
                  <div className="py-[5px] pl-2 bg-white border-[1.5px] rounded-md border-red w-full flex justify-start items-center">
                    <div className="w-full">
                      <input
                        type="password"
                        placeholder="Confirm password"
                        className="w-full outline-none"
                        name="passwordField"
                        value={formValues.passwordField}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="px-5 flex justify-start items-center gap-[1px] opacity-0 none">
                      <span
                        onClick={() => null}
                        className="px-3 py-1 rounded-md hover:bg-gray-200 duration-300"
                      >
                        <ArrowPathIcon className="w-5 " />
                      </span>
                      <span
                        onClick={() => null}
                        className="text-red px-3 py-1  rounded-md hover:bg-gray-200 duration-300"
                      >
                        <XMarkIcon className="w-6 " />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {responseMessage !== "" && <div>{responseMessage}</div>}
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 font-bold"
                  onClick={() => {
                    setShowSettings(false);
                    setFormValues({
                      emailField: "",
                      nameField: "",
                      passwordField: "",
                      newPassField: "",
                      phoneField: "",
                    });
                  }}
                >
                  Close
                </button>
                <button
                  className={
                    formValues.passwordField !== ""
                      ? "px-4 py-2 bg-red rounded-md text-white font-bold cursor-pointer"
                      : "px-4 py-2 bg-red rounded-md text-white font-bold cursor-not-allowed"
                  }
                  disabled={formValues.passwordField === ""}
                  onClick={() => handleSubmit()}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserNavbar;
