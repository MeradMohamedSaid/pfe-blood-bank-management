import React, { useEffect, useState } from "react";
import {
  EyeIcon,
  FolderPlusIcon,
  InformationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ArrowPathIcon,
  ArrowUpOnSquareIcon,
  StarIcon,
  XMarkIcon,
  ArrowUpTrayIcon,
  PhoneIcon,
  EnvelopeIcon,
  BuildingOffice2Icon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import {
  CheckBadgeIcon,
  CheckIcon,
  ChevronDownIcon,
  PresentationChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Loader from "./Loader";
import axios from "axios";
const AppoTable = ({
  // tableData,
  clinicOrDonor,
  itemsPerPage,
  handleModal,
  reload,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("id"); // Default filter type is "id"
  const [showFilters, setShowFilters] = useState(false);
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    firstFetch();
  }, [reload]);

  const [tableData, setTableData] = useState([
    // {
    //   id: 192873,
    //   name: "John Doe",
    //   registertime: "2021-02-23",
    //   docs: 2,
    // },
  ]);

  const filteredItems = tableData.filter((item) => {
    if (!searchQuery) return true; // If search query is empty, don't apply search filter

    // Apply search filter based on the selected filter type
    switch (filterType) {
      case "id":
        return item.id.toString().includes(searchQuery);
      case "name":
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
      case "registertime":
        return item.registertime.toLowerCase().includes(searchQuery);
      default:
        return true; // Return true to include all items if filter type is unknown
    }
  });

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, tableData.length);
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const [load, setLoad] = useState(true);
  const firstFetch = async () => {
    setLoad((old) => true);
    var response = [];
    if (clinicOrDonor === 1) {
      response = await fetchClinicsAppointments();
    } else {
      response = await fetchDonorsAppointments();
    }
    console.log(response);
    setTableData((old) => response);
    new Promise((resolve) => {
      setTimeout(() => {
        setLoad((old) => false);
        resolve();
      }, 500);
    });
  };
  useEffect(() => {
    firstFetch();
  }, []);

  const fetchDonorsAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/appointmentsOnCenterDonors",
        {
          withCredentials: true,
        }
      );
      const appointments = response.data;
      var toReturn = [];
      appointments.forEach((row) => {
        toReturn.push({
          id: row.appointmentID,
          userID: row.id,
          name: row.name,
          registertime: row.registertime,
          docs: row.docs,
        });
      });
      return toReturn;
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data);
      } else if (error.request) {
        console.error("Error: No response received", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };
  const fetchClinicsAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/appointmentsOnCenterClinics",
        {
          withCredentials: true,
        }
      );
      const appointments = response.data;
      var toReturn = [];
      appointments.forEach((row) => {
        toReturn.push({
          id: row.appointmentID,
          userID: row.id,
          name: row.name,
          registertime: row.registertime,
          docs: row.docs,
        });
      });
      return toReturn;
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data);
      } else if (error.request) {
        console.error("Error: No response received", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
    return formattedTime;
  };

  return (
    <>
      {!load ? (
        <div className="fade-in-up">
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
                    setFilterType("name");
                  }}
                  className={
                    filterType === "name"
                      ? "p-2 border border-red rounded-xl flex justify-center items-center gap-1 cursor-pointer bg-red text-white duration-300"
                      : "p-2 border border-gray-400 hover:border-red rounded-xl flex justify-center items-center gap-1 text-gray-400 cursor-pointer hover:bg-red hover:text-white duration-300"
                  }
                >
                  <p>By Name</p>
                </div>
                <div
                  onClick={() => {
                    setFilterType("registertime");
                  }}
                  className={
                    filterType === "registertime"
                      ? "p-2 border border-red rounded-xl flex justify-center items-center gap-1 cursor-pointer bg-red text-white duration-300"
                      : "p-2 border border-gray-400 hover:border-red rounded-xl flex justify-center items-center gap-1 text-gray-400 cursor-pointer hover:bg-red hover:text-white duration-300"
                  }
                >
                  <p>By Date</p>
                </div>
              </div>
            ) : null}
            <div
              className="p-2 border ml-auto border-red rounded-xl flex justify-center items-center gap-1 text-red cursor-pointer hover:bg-red hover:text-white duration-300"
              onClick={() => firstFetch()}
            >
              <ArrowPathIcon className="w-6 h-6" />
            </div>
          </div>
          {/* Render table */}
          <div className="rounded-xl overflow-hidden border border-red mb-4 fade-in-up">
            <div className="grid grid-cols-5 bg-red text-white">
              <p className="p-4 font-bold text-xl">Id</p>
              <p className="p-4 font-bold text-xl">
                {clinicOrDonor === 1 ? "Clinic Name" : "Donor Name"}
              </p>
              <p className="p-4 font-bold text-xl">Date & Time</p>
              <p className="p-4 font-bold text-xl">Document Status</p>
              <p className="p-4 font-bold text-xl">Full Application</p>
            </div>
            {/* Render table rows */}
            {/* Render table rows */}
            {filteredItems.length === 0 ? (
              <>
                <h1 className="w-full py-4 text-center">Nothing To Display</h1>
              </>
            ) : (
              <>
                {filteredItems
                  .slice(startIndex, endIndex)
                  .map((item, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-5 hover: ${
                        index % 2 === 0 ? "bg-red-200" : "bg-transparent"
                      }`}
                    >
                      {item ? (
                        <>
                          <p className="p-4">{item.id}</p>
                          <p className="p-4">{item.name}</p>
                          <p className="p-4">
                            {formatDateTime(item.registertime)}
                          </p>
                          <p className="p-4">
                            {item.docs === 0
                              ? "Not Provided"
                              : item.docs === 2
                              ? "Not Provided"
                              : "Provided and verified"}
                          </p>
                          <div
                            onClick={() =>
                              handleModal(item.userID, clinicOrDonor)
                            }
                            className="flex justify-start items-center cursor-pointer pl-4"
                          >
                            <p className="bg-red tex-white w-[50%] rounded-md p-2 text-sm text-white flex justify-center items-center gap-2 hover:-translate-y-1 duration-300">
                              <h2 className="font-bold">View</h2>
                              <ArrowUpOnSquareIcon className="w-4" />
                            </p>
                          </div>
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
            )}
            {/* Donor Data Modal */}
          </div>
          {/* Render pager */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 fade-in-up">
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
      ) : (
        <>
          <div className="pt-10">
            <Loader />
          </div>
        </>
      )}
    </>
  );
};

export default AppoTable;
