import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "ldrs/bouncy";
import "ldrs/jellyTriangle";
import { useTranslation } from "react-i18next"; // Importing translation hook
import AppointmentTimer from "./AppointmentTimer";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

import {
  CheckIcon,
  ChevronDownIcon,
  CircleStackIcon,
  DocumentDuplicateIcon,
  PhoneIcon,
  CalendarDaysIcon,
  UserIcon,
  BuildingOffice2Icon,
  ClockIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import "ldrs/ring2";

const AppNotice = () => {
  const { t, i18n } = useTranslation();

  const [isVerified, setIsVerified] = useState(false);
  const [docs, setDocs] = useState(1);
  const [loading, setIsLoading] = useState(true);
  const [role, setRole] = useState(0);
  const [centers, setCenters] = useState([]);

  ///////////////////////////////////////////////////////////////////////////
  const [showCenterSelection, setShowCenterSelection] = useState(false);
  const [center, setCenter] = useState(null);

  const [showDaySelection, setShowDaySelection] = useState(false);
  const [daySelected, setDaySected] = useState(null);

  const [showPeriodSelection, setShowPeriodSelection] = useState(false);
  const [periodSelected, setPeriodSelected] = useState(null);

  const [isWorking, setIsWorking] = useState(false);

  const [appot, SetAppoitment] = useState();

  const [realTimeSlots, setRealTimeSlots] = useState([]);

  useEffect(() => {
    appot && console.log("appot updated : ", appot);
  }, [appot]);

  const navigate = useNavigate();

  ///////////////////////////////////////////////////////////////////////////

  function getDay(day) {
    const Days = [
      "Sunday",
      "Monday",
      "Thuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return Days[day - 1];
  }

  ///////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const userStatus = async () => {
      setIsLoading(true);
      const data = await getUserStatus();
      console.log("Data user Status : ", data);
      data.Stat === 0
        ? setIsVerified((old) => false)
        : setIsVerified((old) => true);

      const centersF = await fetchCenters();

      if (data.docs === 2) {
        const appoint = await fetchAppointmentInfo(centersF);
        console.log("Appointment all data : ", appoint);
        SetAppoitment((old) => appoint);
      }
      const timeTable = await getRealTimeWeekWithTimeSlots();
      setRealTimeSlots((old) => timeTable);
      console.log(timeTable);
      setRole((old) => data.role);
      setDocs((olds) => data.docs);
      console.log("Data Info ", data);
    };
    userStatus();
    new Promise(async (resolve) => {
      setTimeout(async () => {
        setIsLoading(false);
        resolve();
      }, 500);
    });
  }, []);

  useEffect(() => {
    if (center) {
      console.table(center.weekSchedule);
    }
    setDaySected(null);
    setPeriodSelected(null);
  }, [center]);

  useEffect(() => {
    if (daySelected) {
      setPeriodSelected(null);
    }
  }, [daySelected]);
  const fetchCenters = async () => {
    console.log("fetching centers");
    const cent = await getCenters();
    setCenters((old) => cent);
    return cent;
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

  const fetchAppointmentInfo = async (centersF) => {
    const appoin = await getAppointment();
    const appointCenter = centersF.find(
      (cen) => cen.id === appoin.Appointments.centerID
    );
    console.log("Appoitment info from fetch ", appoin.Appointments);
    console.log("appointCenter :", appointCenter);
    return {
      valid: appoin.res,
      center: appointCenter,
      appointment: appoin.Appointments,
    };
  };

  const getAppointment = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/getUserAppointments"
      );
      console.log("Appointments:", response.data.Appointments);
      return response.data;
    } catch (error) {
      console.error("Error retrieving appointments:", error.message);
      throw error;
    }
  };

  const handleAppointment = async () => {
    setIsWorking((old) => true);
    const CenterId = center.id;
    const day = daySelected.day;
    const period = periodSelected - 1 ? false : true;
    console.log(
      `Set Appointment to center : ${CenterId} - day : ${getDay(
        day
      )} - period : ${period}`
    );
    const response = await addAppointment(CenterId, day, period);
    new Promise((resolve) => {
      setTimeout(() => {
        setIsWorking((old) => false);
        if (response === 1) handleAppointmentSetted();
        resolve();
      }, 1000);
    });

    console.log(response);
  };

  const addAppointment = async (CenterId, day, period) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/addVerificationAppointment",
        {
          CenterId,
          day,
          period,
        }
      );

      if (response.status === 200) {
        if (response.data.res === "exist") {
          return 2;
        }
        return 1;
      }
    } catch (error) {
      return 3;
    }
  };

  const handleAppointmentSetted = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (realTimeSlots) {
      console.log("Real Time ", realTimeSlots);
    }
  }, [realTimeSlots]);
  const getRealTimeWeekWithTimeSlots = async () => {
    try {
      const response = await axios.get("http://worldtimeapi.org/api/ip", {
        withCredentials: false,
      });
      const currentTime = new Date(response.data.utc_datetime);
      const currentDay = currentTime.getDay();
      const startDate = new Date(currentTime);
      startDate.setDate(startDate.getDate() - currentDay);
      if (currentDay === 5 || currentDay === 6) {
        startDate.setDate(startDate.getDate() + 7);
      }
      const formattedWeekData = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const dayDate = date.toISOString().split("T")[0];
        const eightAM = new Date(date);
        eightAM.setUTCHours(8, 0, 0, 0);
        const eightAMUnixTimestamp = eightAM.getTime() / 1000;
        const twoPM = new Date(date);
        twoPM.setUTCHours(14, 0, 0, 0);
        const twoPMUnixTimestamp = twoPM.getTime() / 1000;
        const dayObject = {
          day: i + 1,
          dayDate: dayDate,
          eight: eightAMUnixTimestamp,
          two: twoPMUnixTimestamp,
        };
        formattedWeekData.push(dayObject);
      }
      return formattedWeekData;
    } catch (error) {
      console.error("Error:", error.message);
      return null;
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center min-h-[80vh] max-w-[80vw] fade-in-up">
            {docs !== 0 ? (
              docs === 1 ? (
                <>
                  <div className="flex flex-col justify-center items-center min-h-[80vh] fade-in-up">
                    <l-bouncy
                      size="60"
                      speed="1.5"
                      color="rgb(240,7,59)"
                    ></l-bouncy>
                    <h1 className="text-4xl mb-4 mt-8 font-bold">
                      Your Application is being processed!
                    </h1>
                    {role === 2 && (
                      <p>Thank you for applying to become a donor. </p>
                    )}
                    <p>
                      Your application is currently being processed by our team
                      at a high pace.{" "}
                    </p>
                    <p>We appreciate your patience.</p>
                    {role === 2 ? (
                      <Link
                        to="/donor/application"
                        className="my-4 bg-red text-white py-4 px-14 hover:bg-opacity-90 duration-300  rounded-xl"
                      >
                        Review Your Application
                      </Link>
                    ) : (
                      <Link
                        to="/clinic/application"
                        className="my-4 bg-red text-white py-4 px-14 hover:bg-opacity-90 duration-300  rounded-xl"
                      >
                        Review Your Application
                      </Link>
                    )}
                    <Link
                      to="/about-us"
                      className="text-sm text-red hover:underline duration-300 cursor-pointer"
                    >
                      Or find out more About Us!
                    </Link>
                  </div>
                </>
              ) : appot.valid ? (
                <>
                  <div className="flex flex-col justify-center items-center min-h-[80vh] fade-in-up">
                    <AppointmentTimer
                      name={appot.center.name}
                      address={appot.center.address}
                      timeObject={realTimeSlots}
                      day={appot.appointment.day}
                      period={appot.appointment.period}
                      rank={appot.appointment.queueRank}
                      verify={appot.appointment.validation}
                      userRole={role}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h2>Cannot fetch the appointment informations</h2>
                </>
              )
            ) : (
              <>
                <l-jelly-triangle size="35" speed="2" color="rgb(240,7,59)" />
                {role === 2 ? (
                  <h1 className="text-4xl mb-4 mt-6 font-bold max-w-[60%] text-center">
                    Thank you for applying to become a Donor!
                  </h1>
                ) : (
                  <h1 className="text-4xl mb-4 mt-6 font-bold max-w-[60%] text-center">
                    Thank you for applying to become a Partner Clinic!
                  </h1>
                )}
                <div className="max-w-[60%] mx-auto ">
                  <p className="mb-4">
                    To complete the verification process, we kindly ask you to
                    arrange an appointment for our visit and furnish necessary
                    documentation. This includes:
                  </p>
                  <ul className="list-none text-left mx-auto max-w-[50%] flex flex-col gap-1 justify-center items-center">
                    {role === 2 ? (
                      <>
                        <li className="bg-red min-w-full rounded-md text-center text-white px-3 py-1 text-sm font-bold  flex justify-between items-center hover:px-6 duration-300 cursor-grab ">
                          Personal ID <DocumentDuplicateIcon className="w-5" />
                        </li>
                        <li className="bg-red min-w-full rounded-md text-center text-white px-3 py-1 text-sm font-bold  flex justify-between items-center hover:px-6 duration-300 cursor-grab ">
                          Hematological Phenotyping analysis{" "}
                          <DocumentDuplicateIcon className="w-5" />
                        </li>
                        <li className="bg-red min-w-full rounded-md text-center text-white px-3 py-1 text-sm font-bold  flex justify-between items-center hover:px-6 duration-300 cursor-grab ">
                          Sexually Transmitted Infection Profile{" "}
                          <DocumentDuplicateIcon className="w-5" />
                        </li>
                        <li className="bg-red min-w-full rounded-md text-center text-white px-3 py-1 text-sm font-bold flex justify-between items-center hover:px-6 duration-300 cursor-grab ">
                          Signature
                          <PencilIcon className="w-5" />
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="bg-red min-w-full rounded-md text-center text-white px-3 py-1 text-sm font-bold  flex justify-between items-center hover:px-6 duration-300 cursor-grab ">
                          Clinic Registration Document{" "}
                          <DocumentDuplicateIcon className="w-5" />
                        </li>
                        <li className="bg-red min-w-full rounded-md text-center text-white px-3 py-1 text-sm font-bold flex justify-between items-center hover:px-6 duration-300 cursor-grab ">
                          Valid Medical Practitioner License
                          <DocumentDuplicateIcon className="w-5" />
                        </li>
                        <li className="bg-red min-w-full rounded-md text-center text-white px-3 py-1 text-sm font-bold flex justify-between items-center hover:px-6 duration-300 cursor-grab ">
                          Clinic Address Proof
                          <DocumentDuplicateIcon className="w-5" />
                        </li>
                        <li className="bg-red min-w-full rounded-md text-center text-white px-3 py-1 text-sm font-bold flex justify-between items-center hover:px-6 duration-300 cursor-grab ">
                          Authorization Letter
                          <DocumentDuplicateIcon className="w-5" />
                        </li>
                        <li className="bg-red min-w-full rounded-md text-center text-white px-3 py-1 text-sm font-bold flex justify-between items-center hover:px-6 duration-300 cursor-grab ">
                          Signature
                          <PencilIcon className="w-5" />
                        </li>
                      </>
                    )}
                  </ul>
                  <h1
                    className={
                      "mt-6 mb-2 " + (periodSelected && "text-red text-bold")
                    }
                  >
                    {!center
                      ? "In order to schedule your appointment, Please Select one of these blood centers :"
                      : !daySelected
                      ? "Now, let's find the perfect day for your visit! Choose a day that works best for you :"
                      : !periodSelected
                      ? "Lastly, please select a preferred time slot for your appointment :"
                      : "You're all set to go! Simply press the big red button below to complete the process."}
                  </h1>
                  <div className="w-full flex items-center justify-between gap-2">
                    {/* center */}
                    <div
                      className={
                        !isWorking
                          ? "relative w-full bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red cursor-pointer"
                          : "relative w-full bg-white p-4 rounded-xl opacity-80 flex justify-between items-center gap-2 w-full border border-red text-red cursor-not-allowed"
                      }
                      onClick={
                        !isWorking
                          ? () => setShowCenterSelection(!showCenterSelection)
                          : null
                      }
                    >
                      <BuildingOffice2Icon className="w-6" />
                      <div className="mr-auto w-[70%] overflow-hidden whitespace-nowrap">
                        <p className="select-none">
                          {center ? `${center.name}` : "Select a center"}
                        </p>
                      </div>

                      <ChevronDownIcon className="w-6" />
                      {showCenterSelection && (
                        <div className="absolute z-10 top-full left-0 bg-white shadow rounded-md border border-red-500 mt-1 w-full">
                          <ul className="list-none p-0 m-0">
                            {centers.map((cen, index) => {
                              return (
                                <>
                                  <li
                                    key={cen.id}
                                    className="cursor-pointer rounded-md px-4 py-2 hover:bg-gray-100"
                                    onClick={() => {
                                      setCenter(cen);
                                      setShowCenterSelection(false);
                                    }}
                                  >
                                    {cen.name}
                                  </li>
                                </>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                    {/* day */}
                    <div
                      className={
                        center && !isWorking
                          ? "relative w-full bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red cursor-pointer"
                          : "relative w-full bg-white p-4 rounded-xl opacity-80 flex justify-between items-center gap-2 w-full border border-red text-red cursor-not-allowed"
                      }
                      onClick={
                        center && !isWorking
                          ? () => setShowDaySelection(!showDaySelection)
                          : null
                      }
                    >
                      <CalendarDaysIcon className="w-6" />
                      <div className="mr-auto ">
                        <p className="select-none">
                          {daySelected
                            ? `${getDay(daySelected.day)}`
                            : "Select a day"}
                        </p>
                      </div>
                      <ChevronDownIcon className="w-6" />
                      {center && showDaySelection && (
                        <div className="absolute z-10 top-full left-0 bg-white shadow rounded-md border border-red-500 mt-1 w-full">
                          <ul className="list-none p-0 m-0">
                            {center.weekSchedule.map((row, index) => {
                              if (row.morning || row.evening)
                                return (
                                  <li
                                    className="cursor-pointer rounded-md px-4 py-2 hover:bg-gray-100"
                                    key={index}
                                    onClick={() => {
                                      setDaySected(row);
                                      setShowDaySelection(false);
                                    }}
                                  >
                                    {getDay(row.day)}
                                  </li>
                                );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                    {/* period */}
                    <div
                      className={
                        daySelected && !isWorking
                          ? "relative w-full bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red cursor-pointer"
                          : "relative w-full bg-white p-4 rounded-xl opacity-80 flex justify-between items-center gap-2 w-full border border-red text-red cursor-not-allowed"
                      }
                      onClick={
                        daySelected && !isWorking
                          ? () => {
                              setShowPeriodSelection(!showPeriodSelection);
                            }
                          : null
                      }
                    >
                      <ClockIcon className="w-6" />
                      <div className="mr-auto ">
                        <p className="select-none">
                          {periodSelected
                            ? periodSelected === 1
                              ? "Morning"
                              : "Evening"
                            : "Select Period"}
                        </p>
                      </div>
                      <ChevronDownIcon className="w-6" />
                      {showPeriodSelection && (
                        <div className="absolute z-10 top-full left-0 bg-white shadow rounded-md border border-red-500 mt-1 w-full">
                          <ul className="list-none p-0 m-0">
                            {daySelected.morning && (
                              <li
                                className="cursor-pointer rounded-md px-4 py-2 hover:bg-gray-100"
                                onClick={() => {
                                  setPeriodSelected(1);
                                  setShowPeriodSelection(false);
                                }}
                              >
                                Morning
                              </li>
                            )}
                            {daySelected.evening && (
                              <li
                                className="cursor-pointer rounded-md px-4 py-2 hover:bg-gray-100"
                                onClick={() => {
                                  setPeriodSelected(2);
                                  setShowPeriodSelection(false);
                                }}
                              >
                                Evening
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* submit */}
                  <div className="w-full flex items-center justify-center p-4 gap-2">
                    <button
                      className={
                        periodSelected !== null && !isWorking
                          ? "w-[60%] min-h-[3.1rem] flex items-center justify-center  bg-red text-white text-center text-bolder rounded-xl hover:bg-opacity-60 duration-300"
                          : "w-[60%] min-h-[3.1rem]  items-center justify-center bg-red bg-opacity-40 text-white text-center text-bolder rounded-xl cursor-not-allowed"
                      }
                      disabled={periodSelected === null || isWorking}
                      onClick={() => {
                        handleAppointment();
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
                          />
                        </>
                      ) : (
                        <h1 className={"text-latin"}>Set Appointment</h1>
                      )}
                    </button>
                  </div>
                  {role === 2 ? (
                    <p>
                      Your cooperation in this matter is greatly appreciated and
                      ensures the smooth and efficient validation of your
                      request.
                    </p>
                  ) : (
                    <p>
                      Your cooperation in this matter is greatly appreciated and
                      ensures the smooth and efficient validation of our
                      partnership.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default AppNotice;
