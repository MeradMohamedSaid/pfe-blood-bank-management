import React from "react";
import { AppLayout } from "../components/AppLayout";
import ClinicNavbar from "../components/ClinicNavbar";
import { useState, useEffect } from "react";
import AppNotice from "../components/AppNotice";
import {
  AdjustmentsHorizontalIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
const ClinicAppointment = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState("id"); // Default filter type is "id"
  const [searchQuery, setSearchQuery] = useState("");
  // table logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sample data for the table
  const tableData = [
    {
      clinicName: "Center A",
      stock: 50,
      isAvailable: true,
      canRequest: false,
    },
    {
      clinicName: "Center B",
      stock: 30,
      isAvailable: false,
      canRequest: true,
    },
    {
      clinicName: "Center C",
      stock: 40,
      isAvailable: false,
      canRequest: false,
    },
    {
      clinicName: "Center D",
      stock: 60,
      isAvailable: true,
      canRequest: true,
    },
    {
      clinicName: "Center E",
      stock: 55,
      isAvailable: true,
      canRequest: true,
    },
    {
      clinicName: "Center F",
      stock: 70,
      isAvailable: true,
      canRequest: true,
    },
    // Additional data entries
    {
      clinicName: "Center G",
      stock: 45,
      isAvailable: true,
      canRequest: true,
    },
    {
      clinicName: "Center H",
      stock: 65,
      isAvailable: true,
      canRequest: true,
    },
    {
      clinicName: "Center I",
      stock: 75,
      isAvailable: true,
      canRequest: true,
    },
    {
      clinicName: "Center J",
      stock: 80,
      isAvailable: true,
      canRequest: true,
    },
    {
      clinicName: "Center K",
      stock: 55,
      isAvailable: true,
      canRequest: true,
    },
    {
      clinicName: "Center L",
      stock: 65,
      isAvailable: true,
      canRequest: true,
    },
    {
      clinicName: "Center M",
      stock: 70,
      isAvailable: true,
      canRequest: true,
    },
    {
      clinicName: "Center N",
      stock: 90,
      isAvailable: true,
      canRequest: true,
    },
    {
      clinicName: "Center O",
      stock: 45,
      isAvailable: true,
      canRequest: true,
    },
    {
      clinicName: "Center P",
      stock: 55,
      isAvailable: true,
      canRequest: true,
    },
    {
      clinicName: "Center Q",
      stock: 65,
      isAvailable: true,
      canRequest: true,
    },
    {
      clinicName: "Center R",
      stock: 70,
      isAvailable: true,
      canRequest: true,
    },
    {
      clinicName: "Center S",
      stock: 80,
      isAvailable: true,
      canRequest: true,
    },
    {
      clinicName: "Center T",
      stock: 85,
      isAvailable: true,
      canRequest: true,
    },
    {
      clinicName: "Center U",
      stock: 60,
      isAvailable: true,
      canRequest: true,
    },
    // Add more data entries as needed
  ];

  // Calculate the range of items to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, tableData.length);
  const currentItems = tableData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  // Filter items based on the selected filter type and search query
  const filteredItems = tableData.filter((item) => {
    if (!searchQuery) return true; // If search query is empty, don't apply search filter

    // Apply search filter based on the selected filter type
    switch (filterType) {
      case "id":
        return item.id.toString().includes(searchQuery);
      case "center":
        return item.center.toLowerCase().includes(searchQuery.toLowerCase());
      case "dateTime":
        return item.dateTime.includes(searchQuery);
      case "capacity":
        return item.capacity.toString().includes(searchQuery);
      default:
        return true; // Return true to include all items if filter type is unknown
    }
  });

  const [loggedIn, setLoggedIn] = useState(true);
  const [role, setUserRole] = useState(-1);
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkLoggedIn = async () => {
      const data = await getUserRole();
      console.log(data.Role);
      setUserRole((old) => data.Role);
      if (data.Role !== 3) {
        setLoggedIn((loggedin) => false);
        navigate("/");
      } else {
        setLoggedIn((loggedin) => true);
      }
      new Promise((resolve) => {
        setTimeout(() => {
          setIsLoading(false);
          resolve();
        }, 500);
      });
    };
    checkLoggedIn();
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
  const navigate = useNavigate();

  useEffect(() => {
    const userStatus = async () => {
      const data = await getUserStatus();
      console.log("Data user Status : ", data);
      if (data.Stat === 0) {
        setIsVerified((old) => false);
      } else {
        setIsVerified((old) => true);
      }
      new Promise((resolve) => {
        setTimeout(() => {
          setIsLoading(false);
          resolve();
        }, 500);
      });
    };
    userStatus();
  }, []);

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

  return (
    <AppLayout>
      <ClinicNavbar />
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="container">
            {!isVerified ? (
              <AppNotice />
            ) : (
              <div className="mt-20">
                <h1 className="text-4xl mb-8">Browse Our Blood Centers</h1>
                {/* Filters */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="border border-red w-fit flex items-center justify-center gap-2 p-2 rounded-xl">
                    <MagnifyingGlassIcon className="w-6 h-6 text-red" />
                    <input
                      className="outline-none bg-transparent"
                      type="text"
                      placeholder="Search..."
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    onClick={() => {
                      setShowFilters(!showFilters);
                    }}
                    className="p-2 border border-red rounded-xl flex justify-center items-center gap-1 text-red cursor-pointer hover:bg-red hover:text-white duration-300"
                  >
                    <AdjustmentsHorizontalIcon className="w-6 h-6" />
                  </div>
                  {/* Type of filters */}
                  {showFilters ? (
                    <div className="flex justify-center items-center gap-1 fade-in">
                      <div
                        onClick={() => {
                          setFilterType("id");
                        }}
                        className={
                          filterType === "id"
                            ? "p-2 border border-red rounded-xl flex justify-center items-center gap-1 cursor-pointer bg-red text-white duration-300"
                            : "p-2 border border-gray-400 hover:border-red rounded-xl flex justify-center items-center gap-1 text-gray-400 cursor-pointer hover:bg-red hover:text-white duration-300"
                        }
                      >
                        <p className="">By Id</p>
                      </div>
                      <div
                        onClick={() => {
                          setFilterType("center");
                        }}
                        className={
                          filterType === "center"
                            ? "p-2 border border-red rounded-xl flex justify-center items-center gap-1 cursor-pointer bg-red text-white duration-300"
                            : "p-2 border border-gray-400 hover:border-red rounded-xl flex justify-center items-center gap-1 text-gray-400 cursor-pointer hover:bg-red hover:text-white duration-300"
                        }
                      >
                        <p>By Center</p>
                      </div>
                      <div
                        onClick={() => {
                          setFilterType("dateTime");
                        }}
                        className={
                          filterType === "dateTime"
                            ? "p-2 border border-red rounded-xl flex justify-center items-center gap-1 cursor-pointer bg-red text-white duration-300"
                            : "p-2 border border-gray-400 hover:border-red rounded-xl flex justify-center items-center gap-1 text-gray-400 cursor-pointer hover:bg-red hover:text-white duration-300"
                        }
                      >
                        <p>By Date</p>
                      </div>
                      <div
                        onClick={() => {
                          setFilterType("capacity");
                        }}
                        className={
                          filterType === "capacity"
                            ? "p-2 border border-red rounded-xl flex justify-center items-center gap-1 cursor-pointer bg-red text-white duration-300"
                            : "p-2 border border-gray-400 hover:border-red rounded-xl flex justify-center items-center gap-1 text-gray-400 cursor-pointer hover:bg-red hover:text-white duration-300"
                        }
                      >
                        <p>By Capacity</p>
                      </div>
                    </div>
                  ) : null}
                  <div className="p-2 border ml-auto border-red rounded-xl flex justify-center items-center gap-1 text-red cursor-pointer hover:bg-red hover:text-white duration-300">
                    <ArrowPathIcon className="w-6 h-6" />
                  </div>
                </div>
                {/* Render table */}
                <div className="rounded-xl overflow-hidden border border-red mb-4">
                  <div className="grid grid-cols-4 bg-red text-white">
                    <p className="p-4 font-bold text-xl">Center</p>
                    <p className="p-4 font-bold text-xl">Stock (packets)</p>
                    <p className="p-4 font-bold text-xl">Status</p>
                    <p className="p-4 font-bold text-xl">Make a Request</p>
                  </div>
                  {filteredItems
                    .slice(startIndex, endIndex)
                    .map((item, index) => (
                      <div
                        key={index}
                        className={`grid grid-cols-4 hover: ${
                          index % 2 === 0 ? "bg-red-200" : "bg-transparent"
                        }`}
                      >
                        {item ? (
                          <>
                            <p className="p-4">{item.clinicName}</p>
                            <p className="p-4">{item.stock}</p>
                            <p className="p-4">
                              {item.isAvailable ? (
                                <p className="bg-green-400  cursor-default text-white w-fit text-sm p-1 rounded-md">
                                  On Service
                                </p>
                              ) : (
                                <p className="bg-red  cursor-default text-white w-fit text-sm p-1 rounded-md">
                                  Closed
                                </p>
                              )}
                            </p>
                            <p className=" flex justify-center items-center">
                              {item.canRequest ? (
                                <>
                                  <button
                                    className="bg-red w-fit mx-auto py-2 px-8 text-white hover:bg-opacity-80 duration-300 cursor-pointer  rounded-md"
                                    onClick={() => {
                                      navigate(
                                        `/clinic/makeappointment?id=${item.clinicName}`
                                      );
                                      console.log("Navigate");
                                    }}
                                  >
                                    Request
                                  </button>
                                </>
                              ) : (
                                <div className="bg-zinc-400 text-zinc-600 cursor-not-allowed w-fit mx-auto py-2 px-8 rounded-md">
                                  Request
                                </div>
                              )}
                            </p>
                          </>
                        ) : (
                          <>
                            {/* do not touch :p */}
                            <p className="p-4">&nbsp;</p>
                            <p className="p-4">&nbsp;</p>
                            <p className="p-4">&nbsp;</p>
                            <p className="p-4">&nbsp;</p>
                          </>
                        )}
                      </div>
                    ))}
                </div>
                {/* Render pager */}
                <div className="flex justify-center items-center gap-4">
                  <button
                    className="p-2 border border-red rounded-xl flex justify-center items-center gap-1 text-red cursor-pointer hover:bg-red hover:text-white duration-300"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeftIcon className="w-6 h-6" />
                  </button>
                  <h1 className="text-red text-xl">
                    Page {currentPage} of {totalPages}
                  </h1>
                  <button
                    className="p-2 border border-red rounded-xl flex justify-center items-center gap-1 text-red cursor-pointer hover:bg-red hover:text-white duration-300"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRightIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </AppLayout>
  );
};

export default ClinicAppointment;
