import React, { useEffect, useState } from "react";
import { AppLayout } from "../components/AppLayout";
import UserNavbar from "../components/UserNavbar";
import AppNotice from "../components/AppNotice";
import heartIllu from "../assets/heartIllu.png";
import Loader from "../components/Loader";
import axios from "axios";
import AppointmentTimer from "../components/AppointmentTimer";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  CalendarDaysIcon,
  ChevronDownIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import "ldrs/ring2";

const SetAppoitment = () => {
  ////////////////////////////////////////////////////////////////////////////////

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  ////////////////////////////////////////////////////////////////////////////////
  const [isVerified, setIsVerified] = useState(false);
  const [isAppoinmentSet, setIsAppoinmentSet] = useState(false);
  const [center, setCenter] = useState();
  const [showModal, setShowModal] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const [id, setId] = useState();

  useEffect(() => {
    const centerPassed = queryParams.get("id");
    if (centerPassed !== null) {
      setId((oled) => centerPassed);
    } else {
      navigate("/donor");
    }
    const userStatus = async () => {
      const data = await getUserStatus();
      console.log("Data user Status : ", data);
      if (data.Stat === 0) {
        setIsVerified((old) => false);
      } else {
        setIsVerified((old) => true);
      }
      const cent = await getCenters(centerPassed);
      setCenter((old) => cent);
      setTimeSlots((oldd) => cent.weekSchedule);
      setAppointments((oldldd) => cent.appointmentCounts);
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

  function getDay(day) {
    const Days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return Days[day - 1];
  }

  const getCenters = async (centerId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/getstroingcentreInfo/${centerId}`,
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
      navigate("/donor");
      throw error;
    }
  };
  const [exists, setExist] = useState(true);
  const [isWorking, setIsWorking] = useState(false);
  const handleRequestAppointment = async () => {
    setIsWorking(true);
    const obj = {
      CenterId: center.id,
      day: selectedDay.day,
      period: selectedPeriod === "e",
    };
    console.log(obj);
    const data = await postRequest(obj);

    await new Promise((resolve) => {
      setTimeout(() => {
        if (data.res === "exist") {
          console.log("exist");
        } else {
          navigate("/donor");
        }
        setIsWorking((old) => false);

        resolve();
      }, 500);
    });

    if (data.done)
      await new Promise((resolve) => {
        setTimeout(() => {
          setIsAppoinmentSet(true);
          resolve();
        }, 100);
      });
  };

  const postRequest = async (obj) => {
    const url = "http://localhost:3000/addAppointement";
    try {
      const response = await axios.post(url, obj);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const [timeSlots, setTimeSlots] = useState([
    // { day: 1, morning: true, evening: true }, // sunday
    // { day: 2, morning: true, evening: true },
    // { day: 3, morning: true, evening: false },
    // { day: 4, morning: true, evening: true },
    // { day: 5, morning: true, evening: false },
    // { day: 6, morning: false, evening: false },
    // { day: 7, morning: false, evening: false }, //saturday
  ]);

  const [appointments, setAppointments] = useState([
    // { day: 1, count: 10 },
    // { day: 2, count: 12 },
    // { day: 3, count: 5 },
    // { day: 4, count: 22 },
    // { day: 5, count: 3 },
    // { day: 6, count: 0 },
    // { day: 7, count: 0 },
  ]);

  ///////////////////////////////////////////////////////////////////////////
  const [showDay, setShowDay] = useState(false);
  const [selectedDay, setSelectedDay] = useState();
  ///////////////////////////////////////////////////////////////////////////

  const [selectedPeriod, setSelectedPeriod] = useState("");

  useEffect(() => {
    setSelectedPeriod((old) => "");
  }, [selectedDay]);

  return (
    <AppLayout>
      <UserNavbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            {!isVerified ? (
              <AppNotice />
            ) : isAppoinmentSet ? (
              <AppointmentTimer time={1715414468} />
            ) : (
              <div className="h-[80vh] flex flex-col justify-center items-center">
                <div className="flex justify-center items-center">
                  <img src={heartIllu} alt="" style={{ height: "10rem" }} />
                </div>
                <div className="w-[26rem] flex flex-col gap-y-1">
                  <h2 className="w-full text-center text-xl mb-4">
                    Please , take a moment to set up an appointment to visit us
                  </h2>
                  <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
                    <BuildingOffice2Icon className="w-6" />
                    <p className="mr-auto ">
                      {center ? center.name : "Center Name"}
                    </p>
                  </div>
                  <div
                    className="relative bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4 cursor-pointer"
                    onClick={() => setShowDay(!showDay)}
                  >
                    <div className="mr-auto flex gap-2">
                      <CalendarDaysIcon className="w-6" />
                      <p className="select-none">
                        {selectedDay
                          ? `Prefered Day to visit us: ${getDay(
                              selectedDay.day
                            )}`
                          : "Please, select a day"}
                      </p>
                    </div>
                    {showDay && (
                      <div className="absolute z-10 top-full left-0 bg-white shadow rounded-md border border-red-500 mt-1 w-full">
                        <ul className="list-none p-0 m-0">
                          {appointments.map((day, index) => {
                            if (day.count < 30) {
                              return (
                                <li
                                  className="cursor-pointer rounded-md px-4 py-2 hover:bg-gray-100"
                                  onClick={() => {
                                    setSelectedDay(day);
                                    setShowDay(false);
                                  }}
                                  key={index}
                                >
                                  {getDay(day.day)}
                                </li>
                              );
                            } else {
                              return null; // Return null for days with count >= 30
                            }
                          })}
                        </ul>
                      </div>
                    )}
                    <ChevronDownIcon
                      className={
                        "h-6 w-6" + (showDay ? "transform rotate-180" : "")
                      }
                    />
                  </div>
                  {selectedDay && (
                    <>
                      <div className="fade-in-up">
                        <h3 className="mb-2">
                          Please Select an available period:
                        </h3>
                        <div className="flex gap-4">
                          <button
                            className={
                              timeSlots.find(
                                (slot) => slot.day === selectedDay.day
                              ).morning && selectedDay
                                ? "p-3 rounded-xl flex justify-center items-center gap-2 w-full border border-red mb-4 " +
                                  (selectedPeriod === "m"
                                    ? "bg-red text-white duration-300 cursor-not-allowed"
                                    : "bg-white text-red hover:bg-red cursor-pointer hover:text-white duration-300")
                                : "p-3 rounded-xl flex justify-center items-center gap-2 w-full border border-red mb-4 bg-white text-red opacity-60 cursor-not-allowed"
                            }
                            onClick={() => setSelectedPeriod("m")}
                            disabled={
                              !timeSlots.find(
                                (slot) => slot.day === selectedDay.day
                              ).morning
                            }
                          >
                            Morning
                          </button>
                          <button
                            className={
                              timeSlots.find(
                                (slot) => slot.day === selectedDay.day
                              ).evening
                                ? "p-3 rounded-xl flex justify-center items-center gap-2 w-full border border-red mb-4 " +
                                  (selectedPeriod === "e"
                                    ? "bg-red text-white duration-300 cursor-not-allowed"
                                    : "bg-white text-red hover:bg-red cursor-pointer hover:text-white duration-300")
                                : "p-3 rounded-xl flex justify-center items-center gap-2 w-full border border-red mb-4 bg-white text-red opacity-60 cursor-not-allowed"
                            }
                            onClick={() => setSelectedPeriod("e")}
                            disabled={
                              !timeSlots.find(
                                (slot) => slot.day === selectedDay.day
                              ).evening
                            }
                          >
                            Evening
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <button
                      className={
                        selectedDay && selectedPeriod && !isWorking
                          ? "bg-red p-3 rounded-xl h-fit flex justify-center items-center gap-2 w-full border border-red text-white mb-4 hover:bg-red cursor-pointer hover:opacity-50 duration-300"
                          : "bg-red p-3 rounded-xl h-fit flex opacity-30 justify-center items-center gap-2 w-full border border-red text-white mb-4 hover:bg-red cursor-not-allowed"
                      }
                      disabled={!selectedDay || !selectedPeriod || isWorking}
                      onClick={async () => {
                        await handleRequestAppointment();
                      }}
                    >
                      {isWorking ? (
                        <>
                          <l-ring-2
                            size="20"
                            stroke="2"
                            stroke-length="0.25"
                            bg-opacity="0.1"
                            speed="0.8"
                            color="rgb(255,197,207)"
                          ></l-ring-2>
                        </>
                      ) : (
                        <>
                          <h1 className={"text-latin"}>Set Appoitment</h1>
                        </>
                      )}
                    </button>
                    {exists && (
                      <h2 className="text-red text-center text-xs">
                        Sorry , but it seems you already have an appointment
                      </h2>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </AppLayout>
  );
};

export default SetAppoitment;
