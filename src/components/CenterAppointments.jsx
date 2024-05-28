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

const CenterAppointments = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  const fetchCenterAppointments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/getCenterAppointments`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Center Appointments info:", error);
      throw error;
    }
  };

  const firstFetch = async () => {
    setLoading(true);
    const appo = await fetchCenterAppointments();
    if (appo.valid) {
      console.log("Center Appointments: ", appo.Appointments);
      setAppointments((oss) => appo.Appointments);
    } else {
      setAppointments((oss) => []);
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
  const [filterType, setFilterType] = useState("id"); // Default filter type is "id"
  const [showFilters, setShowFilters] = useState(false);
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredItems = appointments.filter((item) => {
    if (!searchQuery) return true; // If search query is empty, don't apply search filter
    // Apply search filter based on the selected filter type
    switch (filterType) {
      case "id":
        return item.userID.toString().includes(searchQuery);
      case "registertime":
        const ow =
          days[item.day - 1] + " - " + (item.period ? "Morning" : "Evening");
        console.log(ow);
        return ow.toLowerCase().includes(searchQuery);
      default:
        return true; // Return true to include all items if filter type is unknown
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
      console.log(response.data.message); // Log success message
      return response.data.message;
    } catch (error) {
      console.error(error.response.data); // Log error response data
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Loader></Loader>
        </>
      ) : (
        <>
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
            {/* Appointment Table */}
            <div className="mt-4 rounded-xl border border-red overflow-hidden fade-in-up">
              {/* Head */}
              <div className="grid grid-cols-5 bg-red text-white font-bold text-xl">
                <p className="p-2 flex items-center justify-center">User Id</p>
                <p className="p-2 flex items-center justify-center">Day</p>
                <p className="p-2 flex items-center justify-center gap-2">
                  Queue Rank
                </p>
                <p className="p-2 flex items-center justify-center gap-2">
                  Type
                </p>
                <p className="p-2 flex items-center justify-center gap-2">
                  Finish
                </p>
              </div>
              {/* body */}
              <>
                <div className="max-h-120 overflow-y-auto ">
                  {filteredItems.length > 0 ? (
                    <>
                      {filteredItems.map((appo, index) => {
                        return (
                          <>
                            <div className="grid grid-cols-5" key={index}>
                              <p className=" p-4 flex items-center justify-center">
                                {appo.userID}
                              </p>
                              <p
                                className=" p-2 flex items-center justify-center"
                                style={{ fontWeight: 500 }}
                              >
                                {days[appo.day - 1]} -{" "}
                                {appo.period ? "Morning" : "Evening"}
                              </p>
                              <p className="p-4 flex items-center justify-center">
                                {appo.queueRank}
                              </p>
                              <p
                                className={
                                  appo.validation === 1
                                    ? "p-4 flex items-center justify-center text-bolder text-green"
                                    : "p-4 flex items-center justify-center text-bolder text-red"
                                }
                                style={{ fontWeight: 500 }}
                              >
                                {appo.validation === 1
                                  ? "Validation"
                                  : "Donation"}
                              </p>

                              <p className=" p-4 flex items-center justify-center">
                                <span
                                  className="p-4 py-1 bg-red text-white rounded-md cursor-pointer hover:bg-opacity-80 duration-300"
                                  onClick={() =>
                                    handleDeleteAppo(appo.appointmentID)
                                  }
                                >
                                  Finish
                                </span>
                              </p>
                            </div>
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 p-4 text-center">
                        <h2>Nothing To display</h2>
                      </div>
                    </>
                  )}
                </div>
              </>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CenterAppointments;
