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
  ArrowLongDownIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";

import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
const ClinicAppointment = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState("center"); // Default filter type is "id"
  const [searchQuery, setSearchQuery] = useState("");
  // table logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [tableData, setTableData] = useState([]);

  const [centers, setCenters] = useState();

  useEffect(() => {
    fetchCenters();
  }, []);

  const [sort, setSort] = useState(0);

  const fetchCenters = async () => {
    setIsLoading((old) => true);
    console.log("fetching centers");
    const cent = await getCenters();
    var newCenters = [];
    cent.forEach((cen) => {
      console.log("center Row : ", cen);
      const cini = {
        id: cen.id,
        clinicName: cen.name,
        isAvailable: cen.todaySchedule.morning || cen.todaySchedule.evening,
        canRequest: cen.todaySchedule.morning || cen.todaySchedule.evening,
        stock: cen.maxCapacite,
      };
      newCenters.push(cini);
    });
    setTableData((old) => newCenters);
    setCenters((old) => newCenters);
    await new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading((old) => false);
        resolve();
      }, 500);
    });
  };

  const getCenters = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/getstroingcentre",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data) {
        throw new Error("Failed to fetch Centers data");
      }

      console.log("Centers data:", response.data.Results);
      return response.data.Results;
    } catch (error) {
      console.error("Error fetching Centers data:", error.message);
      throw error;
    }
  };

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
        return item.clinicName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      case "capacity":
        return item.stock >= searchQuery;
      default:
        return true;
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

  const setAfterSort = (n) => {
    let data = [...tableData];
    switch (n) {
      case 0:
        data = centers;
        break;
      case 1:
        data.sort((a, b) => {
          const clinicNameA = a.clinicName.toLowerCase();
          const clinicNameB = b.clinicName.toLowerCase();
          if (clinicNameA < clinicNameB) {
            return -1;
          }
          if (clinicNameA > clinicNameB) {
            return 1;
          }
          return 0;
        });
        break;
      case 2:
        data.sort((a, b) => {
          const clinicNameA = b.clinicName.toLowerCase();
          const clinicNameB = a.clinicName.toLowerCase();
          if (clinicNameA < clinicNameB) {
            return -1;
          }
          if (clinicNameA > clinicNameB) {
            return 1;
          }
          return 0;
        });
        break;
      case 3:
        data.sort((a, b) => a.stock - b.stock);
        break;
      case 4:
        data.sort((a, b) => b.stock - a.stock);
        break;
      case 5:
        data.sort((a, b) => {
          const isAvailableA = a.isAvailable ? 0 : 1;
          const isAvailableB = b.isAvailable ? 0 : 1;
          return isAvailableA - isAvailableB;
        });
        break;
      case 6:
        data.sort((b, a) => {
          const isAvailableA = a.isAvailable ? 0 : 1;
          const isAvailableB = b.isAvailable ? 0 : 1;
          return isAvailableA - isAvailableB;
        });
        break;
      default:
        data = centers || [];
    }
    setTableData(data);
    console.log("table after reSort:", data);
  };

  const handleSortName = () => {
    let n = sort;
    if (sort === 1) n = 2;
    else if (sort === 2) n = 0;
    else n = 1;
    setSort((old) => n);
    setAfterSort(n);
  };
  const handleSortStatus = () => {
    let n = sort;
    if (sort === 5) n = 6;
    else if (sort === 6) n = 0;
    else n = 5;
    setSort((old) => n);
    setAfterSort(n);
  };
  const handleSortStock = () => {
    let n = sort;
    if (sort === 3) n = 4;
    else if (sort === 4) n = 0;
    else n = 3;
    setSort((old) => n);
    setAfterSort(n);
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
          <div className="container fade-in-up">
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
                        <p>By Name</p>
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
                  <div
                    className="p-2 border ml-auto border-red rounded-xl flex justify-center items-center gap-1 text-red cursor-pointer hover:bg-red hover:text-white duration-300"
                    onClick={fetchCenters}
                  >
                    <ArrowPathIcon className="w-6 h-6" />
                  </div>
                </div>
                {/* Render table */}
                <div className="rounded-xl overflow-hidden border border-red mb-4 select-none">
                  <div className="grid grid-cols-4 bg-red text-white ">
                    <p
                      className=" p-4 font-bold text-xl flex justify-between items-center cursor-pointer bg-red hover:brightness-90 duration-500"
                      onClick={() => handleSortName()}
                    >
                      <span>Center</span>
                      <span className="cursor-pointer size-4 bg-red flex justify-center items-center">
                        {sort === 1 || sort === 2 ? (
                          <ArrowLongDownIcon
                            className={
                              sort === 1 ? "size-4" : "size-4 rotate-180"
                            }
                          />
                        ) : (
                          <ArrowsUpDownIcon className="size-4" />
                        )}
                      </span>
                    </p>
                    <p
                      className="p-4 font-bold text-xl flex justify-between items-center cursor-pointer bg-red hover:brightness-90 duration-500"
                      onClick={() => handleSortStock()}
                    >
                      Stock (packets)
                      <span className="cursor-pointer size-4 bg-red flex justify-center items-center">
                        {sort === 3 || sort === 4 ? (
                          <ArrowLongDownIcon
                            className={
                              sort === 3 ? "size-4" : "size-4 rotate-180"
                            }
                          />
                        ) : (
                          <ArrowsUpDownIcon className="size-4" />
                        )}
                      </span>
                    </p>
                    <p
                      className="p-4 font-bold text-xl flex justify-between items-center cursor-pointer bg-red hover:brightness-90 duration-500"
                      onClick={() => handleSortStatus()}
                    >
                      Status
                      <span className="cursor-pointer size-4 bg-red flex justify-center items-center">
                        {sort === 5 || sort === 6 ? (
                          <ArrowLongDownIcon
                            className={
                              sort === 5 ? "size-4" : "size-4 rotate-180"
                            }
                          />
                        ) : (
                          <ArrowsUpDownIcon className="size-4" />
                        )}
                      </span>
                    </p>
                    <p className="p-4 font-bold text-xl flex justify-between items-center">
                      Make a Request
                    </p>
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
                            <p className="flex w-full justify-center items-center">
                              {item.canRequest ? (
                                <>
                                  <button
                                    className="bg-red text-white hover:bg-opacity-80 duration-300 cursor-pointer rounded-md w-[80%] h-[80%]"
                                    onClick={() => {
                                      navigate(
                                        `/clinic/requestBlood?id=${item.id}`
                                      );
                                      console.log("Navigate");
                                    }}
                                  >
                                    Request
                                  </button>
                                </>
                              ) : (
                                <div className="bg-zinc-300 text-zinc-600 flex justify-center items-center text-center cursor-not-allowed rounded-md w-[80%] h-[80%]">
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
                {totalPages > 1 && (
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
                )}
              </div>
            )}
          </div>
        </>
      )}
    </AppLayout>
  );
};

export default ClinicAppointment;
