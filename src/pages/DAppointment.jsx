import React, { useEffect, useState } from "react";
import { AppLayout } from "../components/AppLayout";
import UserNavbar from "../components/UserNavbar";
import AppNotice from "../components/AppNotice";
import heartIllu from "../assets/heartIllu.png";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Loader from "../components/Loader";
import axios from "axios";
import Countdown from "../components/Counter";
import AppointmentTimer from "../components/AppointmentTimer";
import "ldrs/jelly";
import { useNavigate } from "react-router-dom";

// Default values shown

const DonnorApp = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [docs, setDocs] = useState(false);
  const [isAppoinmentSet, setIsAppoinmentSet] = useState(true);
  const [center, setCenter] = useState({
    name: null,
    id: null,
    selected: false,
  });

  const [showModal, setShowModal] = useState(false);
  const [loading, setIsLoading] = useState(true);

  const [realTimeSlots, setRealTimeSlots] = useState([]);
  const [userRole, setUserRole] = useState();
  useEffect(() => {
    const userStatus = async () => {
      const data = await getUserStatus();
      console.log("Data user Status : ", data);
      data.Stat === 0
        ? setIsVerified((old) => false)
        : setIsVerified((old) => true);
      data.docs === 0 ? setDocs((olds) => false) : setDocs((olds) => true);
      setUserRole((oldi) => data.role);
      const timeTable = await getRealTimeWeekWithTimeSlots();
      setRealTimeSlots((old) => timeTable);
      new Promise((resolve) => {
        setTimeout(() => {
          setIsLoading(false);
          resolve();
        }, 500);
      });
    };
    const fetchCenters = async () => {
      console.log("fetching centers");
      const cent = await getCenters();
      setCenters((old) => cent);
      console.log("Centers fetched : ", cent);
    };

    const fetchAppo = async () => {
      const appo = await getUserAppoitment();
      if (!appo.res) {
        setIsAppoinmentSet((old) => false);
        await fetchCenters();
      } else {
        console.log("fetch appo : ", appo);
        setIsAppoinmentSet((old) => true);
        setAppointmentValue((oldi) => appo.Appointments);
      }
      console.log("Appointment fetched : ", appo);
    };
    userStatus();
    fetchAppo();
  }, []);

  const [cernters, setCenters] = useState([]);

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

  const [appointmentValue, setAppointmentValue] = useState();
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

  const getUserAppoitment = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/getUserAppointments",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data) {
        throw new Error("Failed to fetch user Appointments data");
      }

      console.log("User user Appointments data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user Appointments data:", error.message);
      throw error;
    }
  };
  const navigate = useNavigate();

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
    <AppLayout>
      <UserNavbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container fade-in-up">
            {!isVerified ? (
              <AppNotice />
            ) : isAppoinmentSet ? (
              <AppointmentTimer
                name={appointmentValue.name}
                address={appointmentValue.address}
                timeObject={realTimeSlots}
                day={appointmentValue.day}
                period={appointmentValue.period}
                rank={appointmentValue.queueRank}
                verify={appointmentValue.validation}
                userRole={3}
              />
            ) : (
              <div className="grid grid-cols-2 gap-8 h-[80vh]">
                {/* when appoinment is still not set */}
                {/* heart image */}
                <div className="flex justify-center items-center">
                  <img src={heartIllu} alt="" />
                </div>
                {/* text */}
                <div className="flex justify-center flex-col">
                  <h1 className="text-4xl text-red mb-4">
                    Please book your appointment!
                  </h1>
                  <p>
                    To ensure a smooth and efficient donation process, donors
                    are kindly requested to schedule an appointment before
                    visiting our blood bank. Appointments help us manage donor
                    flow, reduce wait times, and maintain safety protocols.
                  </p>
                  <div className=" flex justify-between items-center mt-10 gap-2">
                    <div
                      onClick={() => {
                        setShowModal(!showModal);
                      }}
                      className="relative bg-white  w-full py-4 px-6 rounded-xl flex justify-between items-center text-red  text-opacity-50 border hover:border-red duration-300 cursor-pointer"
                    >
                      {center == null ? (
                        <p>Find a Center</p>
                      ) : (
                        <p>{center.name}</p>
                      )}
                      <ChevronDownIcon class=" w-6 " />
                      {showModal ? (
                        <div className="absolute top-16 overflow-y-auto rounded-md max-h-40 w-full left-0 text-sm bg-white border hover:border-red flex flex-col">
                          {cernters &&
                            cernters.map((cen, k) => {
                              return (
                                <p
                                  key={k + 1}
                                  onClick={() => {
                                    setCenter((old) => ({
                                      name: cen.name + ", " + cen.address,
                                      id: cen.id,
                                      selected: true,
                                    }));
                                  }}
                                  className="py-2 px-4 hover:bg-red-50 duration-300"
                                >
                                  {`${cen.name.replace(/\b\w/g, (char) =>
                                    char.toUpperCase()
                                  )}, ${cen.address.replace(/\b\w/g, (char) =>
                                    char.toUpperCase()
                                  )}`}
                                </p>
                              );
                            })}
                        </div>
                      ) : null}
                    </div>

                    <button
                      className={
                        center.selected
                          ? "bg-red text-white py-4 px-9 rounded-xl min-w-fit hover:bg-opacity-80 duration-300"
                          : "bg-red bg-opacity-30 text-white py-4 px-9 rounded-xl min-w-fit cursor-not-allowed duration-300"
                      }
                      disabled={!center.selected}
                      onClick={() => {
                        navigate(
                          `/donor/appointment/setAppointment?id=${center.id}`
                        );
                        console.log("Navigate");
                      }}
                    >
                      Continue
                    </button>
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

export default DonnorApp;
