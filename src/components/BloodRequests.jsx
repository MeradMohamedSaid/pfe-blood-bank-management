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

const BloodRequests = ({ handlePacketRequest }) => {
  const [loading, setLoading] = useState(true);
  const [Requests, setRequests] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const fetchCenterRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/getCenterBloodRequests`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Center Requests info:", error);
      throw error;
    }
  };

  const firstFetch = async () => {
    setLoading(true);
    const appo = await fetchCenterRequests();
    if (appo.valid) {
      console.log("Center Requests: ", appo.Requests);
      setRequests(appo.Requests);
    } else {
      setRequests([]);
    }
    new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  };

  useEffect(() => {
    firstFetch();
  }, []);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("id");
  const [showFilters, setShowFilters] = useState(false);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems = Requests.filter((item) => {
    if (!searchQuery) return true;
    switch (filterType) {
      case "id":
        return item.idRequest.toString().includes(searchQuery);
      case "name":
        return item.name.toLowerCase().includes(searchQuery);
      case "registertime":
        const ow =
          days[item.day - 1] + " - " + (item.period ? "Morning" : "Evening");
        return ow.toLowerCase().includes(searchQuery);
      default:
        return true;
    }
  });

  const handleDeleteAppo = async (id) => {
    console.log("Delete Appointment : ", id);
    const message = await handleDelete(id);
    if (message === "Appointment deleted successfully") {
      await firstFetch();
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/deleteappointment/${id}`
      );
      console.log(response.data.message);
      return response.data.message;
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const sortBy = (key) => {
    let direction = "asc";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }

    setSortConfig({ key, direction });
  };

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortConfig.key) {
      return 0;
    }
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
                  <p>By Clinic</p>
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
          <div className="mt-4 rounded-xl border border-red overflow-hidden fade-in-up">
            <div className="grid grid-cols-5 bg-red text-white font-bold text-xl">
              <p className="p-2 flex items-center justify-center">Request Id</p>

              <p
                className="p-2 flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => sortBy("urgent")}
              >
                Situation
                {sortConfig.key === "urgent" && sortConfig.direction ? (
                  <ChevronDownIcon
                    className={`w-4 h-4 ${
                      sortConfig.direction === "asc" ? "rotate-180" : ""
                    }`}
                  />
                ) : null}
              </p>
              <p
                className="p-2 flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => sortBy("status")}
              >
                Request Status
                {sortConfig.key === "status" && sortConfig.direction ? (
                  <ChevronDownIcon
                    className={`w-4 h-4 ${
                      sortConfig.direction === "asc" ? "rotate-180" : ""
                    }`}
                  />
                ) : null}
              </p>
              <p
                className="p-2 flex items-center justify-center cursor-pointer"
                onClick={() => sortBy("creation_time")}
              >
                Request Date
                {sortConfig.key === "creation_time" && sortConfig.direction ? (
                  <ChevronDownIcon
                    className={`w-4 h-4 ${
                      sortConfig.direction === "asc" ? "rotate-180" : ""
                    }`}
                  />
                ) : null}
              </p>
              <p className="p-2 flex items-center justify-center gap-2">
                Details
              </p>
            </div>
            <div className="max-h-120 overflow-y-auto ">
              {sortedItems.length > 0 ? (
                sortedItems.map((appo, index) => (
                  <div className="grid grid-cols-5" key={index}>
                    <p className=" p-4 flex items-center justify-center">
                      {appo.idRequest}
                    </p>
                    <p
                      className={
                        appo.validation === 1
                          ? "p-4 flex items-center justify-center text-bolder text-black"
                          : "p-4 flex items-center justify-center text-bolder text-red"
                      }
                      style={{ fontWeight: 500 }}
                    >
                      {appo.urgent === 1 ? "Urgent" : "Not Urgent"}
                    </p>
                    <p
                      className=" p-2 flex items-center justify-center"
                      style={{ fontWeight: 500 }}
                    >
                      {appo.status === 0
                        ? "Request Received"
                        : appo.status === 1
                        ? "Processed"
                        : appo.status === 2
                        ? "Out For Delivery"
                        : "Reached Destination"}
                    </p>
                    <p
                      className="p-4 flex items-center justify-center text-bolder text-black"
                      style={{ fontWeight: 500 }}
                    >
                      {appo.creation_time.slice(0, 10)}
                    </p>
                    <p className=" p-4 flex items-center justify-center">
                      <span
                        className="p-4 py-1 bg-red text-white rounded-md cursor-pointer hover:bg-opacity-80 duration-300"
                        // onClick={() => handleDeleteAppo(appo.appointmentID)}
                        onClick={() => {
                          handlePacketRequest(appo.idRequest);
                        }}
                      >
                        View
                      </span>
                    </p>
                  </div>
                ))
              ) : (
                <div className="grid grid-cols-1 p-4 text-center">
                  <h2>Nothing To display</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BloodRequests;
