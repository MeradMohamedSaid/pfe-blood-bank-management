import React from "react";
import { AppLayout } from "../components/AppLayout";
import { useState, useEffect } from "react";
import AppNotice from "../components/AppNotice";
import ClinicNavbar from "../components/ClinicNavbar";
import Loader from "../components/Loader";
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

import pic from "../assets/error3.png";

import axios from "axios";
const ClinicHistory = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setIsLoading] = useState(true);

  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState("id"); // Default filter type is "id"
  const [searchQuery, setSearchQuery] = useState("");
  // table logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const navigate = useNavigate();

  // Sample data for the table
  const [tableData, setTableData] = useState([]);
  const [history, setHistory] = useState([]);
  const [sort, setSort] = useState(0);

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
  const filteredItems = tableData.filter((item) => {
    if (!searchQuery) return true;
    switch (filterType) {
      case "id":
        return item.id.toString().includes(searchQuery);
      case "center":
        return item.center.toLowerCase().includes(searchQuery.toLowerCase());
      case "capacity":
        return item.stock >= searchQuery;
      default:
        return true;
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
        await getHistory();
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

  const getHistory = async () => {
    const history1 = await fetchHistory();
    console.log("clinic history retreived : : : :  : ", history1.arr);
    setTableData((old) => history1.arr);
    return;
  };

  const fetchHistory = async () => {
    setIsLoading((old) => true);
    try {
      const response = await axios.get(
        "http://localhost:3000/getClinicHistory",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.data) {
        throw new Error("Failed to fetch history");
      }
      console.log("Clinic History data:", response.data);
      if (!response.data.res) {
        console.log("No Data Found");
        return response.data;
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching Histroy data:", error.message);
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

  // 1 - 2 dates // 3 - 4 capacity  // 5 - 6 centers name
  const setAfterSort = (n) => {
    let data = [...tableData];
    switch (n) {
      case 0:
        break;
      case 1:
        data.sort((b, a) => {
          const dateA = a.dateTime;
          const dateB = b.dateTime;
          if (dateA < dateB) return 1;
          if (dateA > dateB) return -1;
          return 0;
        });
        break;
      case 2:
        data.sort((b, a) => {
          const dateA = a.dateTime;
          const dateB = b.dateTime;
          if (dateA < dateB) return -1;
          if (dateA > dateB) return 1;
          return 0;
        });
        break;
      case 3:
        data.sort((a, b) => a.status - b.status);
        break;
      case 4:
        data.sort((a, b) => b.status - a.status);
        break;
      case 5:
        data.sort((a, b) => {
          let nameA = a.center.toLowerCase();
          let nameB = b.center.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        break;
      case 6:
        data.sort((a, b) => {
          let nameA = a.center.toLowerCase();
          let nameB = b.center.toLowerCase();
          if (nameA < nameB) return 1;
          if (nameA > nameB) return -1;
          return 0;
        });
        break;
    }
    setTableData(data);
    console.log("table after reSort:", data);
  };

  const handleSortDate = () => {
    let n = sort;
    if (sort === 1) n = 2;
    else if (sort === 2) n = 0;
    else n = 1;
    setSort((old) => n);
    setAfterSort(n);
  };
  const handleSortCenterName = () => {
    let n = sort;
    if (sort === 5) n = 6;
    else if (sort === 6) n = 0;
    else n = 5;
    setSort((old) => n);
    setAfterSort(n);
  };
  const handleSortCapacity = () => {
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
        <Loader />
      ) : (
        <>
          <div className="container fade-in-up">
            {!isVerified ? (
              <AppNotice />
            ) : (
              <div className="mt-20">
                {/* Filters */}
                {tableData.length === 0 ? (
                  <>
                    <div className="flex justify-center items-center w-100">
                      <img src={pic} alt="" className="h-80" />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3 mb-4 ">
                      <h6 style={{ fontWeight: "600" }} className="text-xl">
                        We're Sorry , but we couldn't find any archeive of yours
                      </h6>
                      <p>
                        maybe you need to request your first blood packet and
                        add it to your history
                      </p>
                      <button
                        className="rounded-xl bg-red text-white px-16 py-3 hover:bg-opacity-60 duration-300"
                        onClick={() => navigate("/clinic/appointment")}
                      >
                        Request Your First Blood Packet Here
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="text-4xl mb-8">
                      Browse Your Blood Requests History
                    </h1>
                    <div className="flex items-center gap-2 mb-4"></div>
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
                        </div>
                      ) : null}
                      <div
                        onClick={async () => {
                          await getHistory();
                          new Promise(async (resolve, reject) => {
                            await setTimeout(async () => {
                              await setIsLoading((old) => false);
                              resolve();
                            }, 500);
                          });
                        }}
                        className="p-2 border ml-auto border-red rounded-xl flex justify-center items-center gap-1 text-red cursor-pointer hover:bg-red hover:text-white duration-300"
                      >
                        <ArrowPathIcon className="w-6 h-6" />
                      </div>
                    </div>
                    {/* Render table */}

                    <div className="rounded-xl overflow-hidden border border-red mb-4">
                      <div className="grid grid-cols-4 bg-red text-white select-none">
                        <p className="p-4 font-bold text-xl">ID</p>
                        <p
                          className=" p-4 font-bold text-xl flex justify-between items-center cursor-pointer bg-red hover:brightness-90 duration-500"
                          onClick={() => handleSortDate()}
                        >
                          <span>Date & Time</span>
                          {sort === 1 || sort === 2 ? (
                            <ArrowLongDownIcon
                              className={
                                sort === 1 ? "size-4" : "size-4 rotate-180"
                              }
                            />
                          ) : (
                            <ArrowsUpDownIcon className="size-4" />
                          )}
                        </p>
                        <p
                          className=" p-4 font-bold text-xl flex justify-between items-center cursor-pointer bg-red hover:brightness-90 duration-500"
                          onClick={() => handleSortCenterName()}
                        >
                          <span>Center</span>
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
                        <p
                          className=" p-4 font-bold text-xl flex justify-between items-center cursor-pointer bg-red hover:brightness-90 duration-500"
                          onClick={() => handleSortCapacity()}
                        >
                          <span>Request Status</span>
                          {sort === 3 || sort === 4 ? (
                            <ArrowLongDownIcon
                              className={
                                sort === 3 ? "size-4" : "size-4 rotate-180"
                              }
                            />
                          ) : (
                            <ArrowsUpDownIcon className="size-4" />
                          )}
                        </p>
                      </div>
                      {/* Render table rows */}
                      {/* Render table rows */}
                      <>
                        {filteredItems
                          .slice(startIndex, endIndex)
                          .map((item, index) => (
                            <div
                              key={index}
                              className={`grid grid-cols-4 hover: ${
                                index % 2 === 0
                                  ? "bg-red-200"
                                  : "bg-transparent"
                              }`}
                            >
                              {item ? (
                                <>
                                  <p className="p-4">{item.id}</p>
                                  <p className="p-4">{item.dateTime}</p>
                                  <p className="p-4">{item.center}</p>
                                  <p className="p-4">
                                    {item.status === 0
                                      ? "Request Submited"
                                      : item.status === 1
                                      ? "Processed"
                                      : item.status === 2
                                      ? "Out For Delivery"
                                      : "Packet Received"}
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
                      </>
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
                  </>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </AppLayout>
  );
};

export default ClinicHistory;
