import React from "react";
import { AppLayout } from "../components/AppLayout";
import UserNavbar from "../components/UserNavbar";
import { useState, useEffect } from "react";
import AppNotice from "../components/AppNotice";
import Loader from "../components/Loader";
import {
  AdjustmentsHorizontalIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
const DonorHistory = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setIsLoading] = useState(true);

  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState("id"); // Default filter type is "id"
  const [searchQuery, setSearchQuery] = useState("");
  // table logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sample data for the table
  const tableData = [
    {
      id: 1234,
      dateTime: "2024-03-31 09:00",
      center: "Center A",
      capacity: 50,
    },
    {
      id: 5678,
      dateTime: "2024-03-31 10:30",
      center: "Center B",
      capacity: 30,
    },
    {
      id: 91011,
      dateTime: "2024-03-31 12:00",
      center: "Center C",
      capacity: 40,
    },
    {
      id: 121314,
      dateTime: "2024-03-31 13:30",
      center: "Center D",
      capacity: 60,
    },
    {
      id: 151617,
      dateTime: "2024-03-31 15:00",
      center: "Center E",
      capacity: 55,
    },
    {
      id: 181920,
      dateTime: "2024-03-31 16:30",
      center: "Center F",
      capacity: 70,
    },
    // Additional data entries
    {
      id: 212223,
      dateTime: "2024-03-31 18:00",
      center: "Center G",
      capacity: 45,
    },
    {
      id: 242526,
      dateTime: "2024-03-31 19:30",
      center: "Center H",
      capacity: 65,
    },
    {
      id: 272829,
      dateTime: "2024-03-31 21:00",
      center: "Center I",
      capacity: 75,
    },
    {
      id: 303132,
      dateTime: "2024-03-31 22:30",
      center: "Center J",
      capacity: 80,
    },
    {
      id: 333435,
      dateTime: "2024-03-31 00:00",
      center: "Center K",
      capacity: 55,
    },
    {
      id: 363738,
      dateTime: "2024-03-31 01:30",
      center: "Center L",
      capacity: 65,
    },
    {
      id: 394041,
      dateTime: "2024-03-31 03:00",
      center: "Center M",
      capacity: 70,
    },
    {
      id: 424344,
      dateTime: "2024-03-31 04:30",
      center: "Center N",
      capacity: 90,
    },
    {
      id: 454647,
      dateTime: "2024-03-31 06:00",
      center: "Center O",
      capacity: 45,
    },
    {
      id: 484950,
      dateTime: "2024-03-31 07:30",
      center: "Center P",
      capacity: 55,
    },
    {
      id: 515253,
      dateTime: "2024-03-31 09:00",
      center: "Center Q",
      capacity: 65,
    },
    {
      id: 545556,
      dateTime: "2024-03-31 10:30",
      center: "Center R",
      capacity: 70,
    },
    {
      id: 575859,
      dateTime: "2024-03-31 12:00",
      center: "Center S",
      capacity: 80,
    },
    {
      id: 606162,
      dateTime: "2024-03-31 13:30",
      center: "Center T",
      capacity: 85,
    },
    {
      id: 636465,
      dateTime: "2024-03-31 15:00",
      center: "Center U",
      capacity: 60,
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
      <UserNavbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container fade-in-up">
            {!isVerified ? (
              <AppNotice />
            ) : (
              <div className="mt-20">
                <h1 className="text-4xl mb-8">Browse Your Donation History</h1>
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
                    <p className="p-4 font-bold text-xl">ID</p>
                    <p className="p-4 font-bold text-xl">Date & Time</p>
                    <p className="p-4 font-bold text-xl">Center</p>
                    <p className="p-4 font-bold text-xl">Packet capacity</p>
                  </div>
                  {/* Render table rows */}
                  {/* Render table rows */}
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
                            <p className="p-4">{item.id}</p>
                            <p className="p-4">{item.dateTime}</p>
                            <p className="p-4">{item.center}</p>
                            <p className="p-4">{item.capacity}</p>
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

export default DonorHistory;
