import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { AppLayout } from "../components/AppLayout";
import AdminNavbar from "../components/AdminNavbar";
import {
  ArrowTopRightOnSquareIcon,
  ArrowUpRightIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  IdentificationIcon,
  LockClosedIcon,
  SquaresPlusIcon,
  XMarkIcon,
  CalendarDaysIcon,
  UserIcon,
  ArrowsUpDownIcon,
  MapIcon,
  PhoneIcon,
  InboxStackIcon,
} from "@heroicons/react/24/outline";
import CenterModal from "../components/CenterModel";

import Loader from "../components/Loader";
import axios from "axios";

import CenterModelInfo from "../components/CenterModelInfo";

const AdminCenters = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [creationSideBar, setCreationSideBar] = useState(false);
  const [bloodOrApp, setBloodOrApp] = useState(false);
  const [centerInfoModal, setCenterInfoModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [centers, setCenters] = useState();
  const [regLoading, setRegLoading] = useState(false);

  const managerEmailRef = useRef(null);
  const managerPasswordRef = useRef(null);
  const managerNameRef = useRef(null);
  const centerPhoneNumberRef = useRef(null);
  const centerNameRef = useRef(null);
  const centerAddressRef = useRef(null);
  const centerCapRef = useRef(null);

  const [formData, setFormData] = useState({
    managerEmail: "",
    managerPassword: "",
    managerName: "",
    centerPhoneNumber: "",
    centerName: "",
    centerAddress: "",
    weekSchedule: [
      { day: 1, morning: true, evening: true },
      { day: 2, morning: true, evening: true },
      { day: 3, morning: true, evening: true },
      { day: 4, morning: true, evening: true },
      { day: 5, morning: true, evening: true },
      { day: 6, morning: true, evening: true },
      { day: 7, morning: true, evening: true },
    ],
  });

  const handleWeekScheduleChange = (day, shift, value) => {
    const updatedSchedule = [...formData.weekSchedule];
    updatedSchedule[day - 1][shift] = value;
    setFormData({ ...formData, weekSchedule: updatedSchedule });
  };

  const resetForm = async () => {
    setRegLoading((old) => true);
    managerEmailRef.current.value = "";
    managerPasswordRef.current.value = "";
    managerNameRef.current.value = "";
    centerPhoneNumberRef.current.value = "";
    centerNameRef.current.value = "";
    centerAddressRef.current.value = "";
    centerCapRef.current.value = "";
    setFormData({
      managerEmail: "",
      managerPassword: "",
      managerName: "",
      centerPhoneNumber: "",
      centerName: "",
      centerAddress: "",
      weekSchedule: [
        { day: 1, morning: true, evening: true },
        { day: 2, morning: true, evening: true },
        { day: 3, morning: true, evening: true },
        { day: 4, morning: true, evening: true },
        { day: 5, morning: true, evening: true },
        { day: 6, morning: true, evening: true },
        { day: 7, morning: true, evening: true },
      ],
    });
    await new Promise(async (res) => {
      setTimeout(async () => {
        setRegLoading((old) => false);
        setCreationSideBar(false);
        await fetchCenters();
        res();
      }, 500);
    });
  };

  const handleSubmit = async () => {
    if (isFormValid()) {
      setRegLoading((old) => true);

      var data = {
        managerEmail: managerEmailRef.current.value,
        managerPassword: managerPasswordRef.current.value,
        managerName: managerNameRef.current.value,
        centerPhoneNumber: centerPhoneNumberRef.current.value,
        centerName: centerNameRef.current.value,
        centerAddress: centerAddressRef.current.value,
        centerCap: centerCapRef.current.value,
        weekSchedule: formData.weekSchedule,
      };

      console.log(data);
      const respo = await registerCenter(data);
      if (respo.Message === "Storing centre and manager added successfully") {
        await resetForm();
      } else {
        setRegLoading((old) => false);
      }
    }
  };
  useEffect(() => {
    fetchCenters();
  }, []);

  const registerCenter = async (data) => {
    console.log("data to post : ", data);
    try {
      const response = await axios.post(
        "http://localhost:3000/addStoringCentre",
        {
          address: data.centerAddress,
          maxCapacite: parseInt(data.centerCap),
          managerMail: data.managerEmail,
          managerName: data.managerName,
          managerPassword: data.managerPassword,
          sotringCentreNumber: data.centerPhoneNumber,
          storingCentreName: data.centerName,
          schedule: data.weekSchedule,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const isFormValid = () => {
    return (
      managerEmailRef.current.value !== "" &&
      managerPasswordRef.current.value !== "" &&
      managerNameRef.current.value !== "" &&
      centerPhoneNumberRef.current.value &&
      centerNameRef.current.value !== "" &&
      centerAddressRef.current.value !== "" &&
      centerCapRef.current.value
    );
  };

  const fetchCenters = async () => {
    setLoading((old) => true);
    console.log("fetching centers");
    const cent = await getCenters();
    var newCenters = [];
    cent.forEach((cen) => {
      console.log("center Row : ", cen);
      console.log(cen);
      const widthPercentage = Math.floor(
        (100 * cen.bloodPacketCount) / cen.maxCapacite
      );
      const cini = {
        id: cen.id,
        name: cen.name,
        address: cen.address,
        isAvailable: cen.todaySchedule.morning || cen.todaySchedule.evening,
        today: {
          morning: cen.todaySchedule.morning,
          evening: cen.todaySchedule.evening,
        },
        phone: cen.phone,
        stock: cen.maxCapacite,
        current: cen.bloodPacketCount,
        appointmentsCount: cen.appointmentCount,
        mod: cen.centreModerator,
        Created_On: cen.Created_On.slice(0, 10),
        class: `h-14 z-0 bg-red`,
        styleCLass: { width: `${widthPercentage}%` },
      };
      newCenters.push(cini);
    });
    setCenters((old) => newCenters);
    await new Promise((resolve) => {
      setTimeout(() => {
        setLoading((old) => false);
        resolve();
      }, 500);
    });
  };

  const getCenters = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/getstroingcentrecrud",
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

  const [infoCenter, setInfoCenter] = useState();

  return (
    <>
      <AppLayout />
      <AdminNavbar />
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="container fade-in-up flex-1">
            <h1 className="text-4xl font-bold">Life Flow Blood Centers</h1>
            <p className="mb-10">find and manage blood centers</p>
            <h1 className="text-2xl flex items-center  gap-2 font-bold">
              Blood Centers{" "}
              <span className="bg-red px-6 font-normal text-white text-base rounded-full">
                {centers.length}
              </span>
            </h1>
            <p className="text-sm mb-4">All registered Blood Centers</p>
            {/* grid of centers */}
            <div className="grid grid-cols-4 gap-4">
              {/* Cell */}
              <div
                onClick={() => {
                  setCreationSideBar(true);
                }}
                className="bg-white rounded-xl hover:border-red border hover:bg-red-100 border-transparent duration-300 p-4 cursor-pointer flex flex-col justify-center items-center gap-4 text-red"
              >
                <div className="bg-white rounded-xl p-2 border border-red">
                  <SquaresPlusIcon className="w-8" />
                </div>
                <p className="font-bold">Add New Center</p>
              </div>
              {/* Cell */}
              {centers.map((cen) => {
                return (
                  <>
                    <CenterModal
                      key={cen.id}
                      center={cen}
                      setCenterInfoModal={setCenterInfoModal}
                      setInfoCenter={setInfoCenter}
                    />
                  </>
                );
              })}

              {/* Cell */}

              {/* Center Cell Modal */}
              {/* Center Info Modal */}
            </div>
          </div>
          {/* Register New Center */}
          <div
            className={
              creationSideBar || centerInfoModal
                ? "w-[100vw] h-[100vh] bg-black bg-opacity-20 fixed top-0 z-10 duration-300 "
                : "hidden duration-300"
            }
          >
            <CenterModelInfo
              centerInfo={centers}
              centerInfoModal={centerInfoModal}
              setCenterInfoModal={setCenterInfoModal}
              bloodOrApp={bloodOrApp}
              setBloodOrApp={setBloodOrApp}
              setInfoCenter={setInfoCenter}
              infoCenter={infoCenter}
              fetchCenters={fetchCenters}
            />
          </div>
          <div
            className={
              creationSideBar
                ? "fixed top-0 right-0 bg-white z-50 p-8 h-[100vh] border-l border-red duration-300 overflow-y-scroll "
                : "fixed top-0 -right-[1000px] bg-white z-50 p-8 h-[100vh] border-l border-red duration-300"
            }
          >
            <h1 className="text-4xl font-bold mb-8">Register New Center</h1>
            <div
              onClick={() => {
                setCreationSideBar(false);
              }}
              className="absolute cursor-pointer right-4 bg-red text-white rounded-md p-1 top-4"
            >
              <XMarkIcon className="w-6" />
            </div>

            {/* Form */}
            <h1 className="mb-2 text-2xl">Manager Informations :</h1>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded-xl flex items-center gap-2 w-full border border-red text-red mb-2">
                <EnvelopeIcon className="w-6" />
                <input
                  className="w-full outline-none"
                  placeholder="E-mail"
                  type="text"
                  name="managerEmail"
                  ref={managerEmailRef}
                />
              </div>
              <div className="bg-white p-4 rounded-xl flex items-center gap-2 w-full border border-red text-red mb-2">
                <LockClosedIcon className="w-6" />
                <input
                  className="w-full outline-none"
                  type={showPassword ? "password" : "text"}
                  placeholder="Password"
                  name="managerPassword"
                  ref={managerPasswordRef}
                />
                {showPassword ? (
                  <EyeIcon
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="w-6 cursor-pointer"
                  />
                ) : (
                  <EyeSlashIcon
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="w-6 cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded-xl flex items-center gap-2 w-full border border-red text-red mb-2">
                <IdentificationIcon className="w-6" />
                <input
                  className="w-full outline-none"
                  placeholder="Manager Name"
                  type="text"
                  name="managerName"
                  ref={managerNameRef}
                />
              </div>
              <div className="bg-white p-4 rounded-xl flex items-center gap-2 w-full border border-red text-red mb-2">
                <PhoneIcon className="w-6" />
                <input
                  className="w-full outline-none"
                  placeholder="Center Phone Number"
                  type="number"
                  name="centerPhoneNumber"
                  ref={centerPhoneNumberRef}
                />
              </div>
            </div>
            <h1 className="mb-2 text-2xl">Center Informations :</h1>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded-xl flex items-center gap-2 w-full border border-red text-red mb-2">
                <BuildingOfficeIcon className="w-6" />
                <input
                  className="w-full outline-none"
                  placeholder="Center Name"
                  type="text"
                  name="centerName"
                  ref={centerNameRef}
                />
              </div>
              <div className="bg-white p-4 rounded-xl flex items-center gap-2 w-full border border-red text-red mb-2">
                <InboxStackIcon className="w-6" />
                <input
                  className="w-full outline-none"
                  placeholder="Capacity"
                  type="number"
                  name="centerCap"
                  ref={centerCapRef}
                />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl flex items-center gap-2 w-full border border-red text-red mb-2">
              <MapIcon className="w-6" />
              <input
                className="w-full outline-none"
                placeholder="Adress"
                type="text"
                name="centerAddress"
                ref={centerAddressRef}
              />
            </div>
            <h1 className="mb-2 text-2xl">Weekly Schedule :</h1>
            {/* Calandar Grid */}
            <div className="grid grid-cols-1 border border-red rounded-xl overflow-hidden">
              {/* Sunday */}
              <div className="grid grid-cols-3  p-4 gap-2 border-b border-red">
                <p className="font-bold text-xl">Sunday</p>
                <div className="flex justify-center gap-2 items-center">
                  <p className="font-bold">Morning</p>
                  <div className="flex items-center  gap-1 justify-center">
                    <p className="text-xs text-slate-400">Closed</p>

                    <input
                      type="range"
                      class="transparent h-1 w-10 rounded-full cursor-pointer appearance-none border-transparent bg-red "
                      min="0"
                      max="1"
                      step="1"
                      value={formData.weekSchedule[0].morning ? 1 : 0}
                      onChange={(e) =>
                        handleWeekScheduleChange(
                          1,
                          "morning",
                          e.target.value === "1"
                        )
                      }
                    />
                    <p className="text-xs text-slate-400">Open</p>
                  </div>
                </div>
                <div className="flex justify-center gap-2 items-center">
                  <p className="font-bold">Evening</p>
                  <div className="flex items-center  gap-1 justify-center">
                    <p className="text-xs text-slate-400">Closed</p>
                    <input
                      type="range"
                      class="transparent h-1 w-10 rounded-full cursor-pointer appearance-none border-transparent bg-red "
                      min="0"
                      max="1"
                      step="1"
                      value={formData.weekSchedule[0].evening ? 1 : 0}
                      onChange={(e) =>
                        handleWeekScheduleChange(
                          1,
                          "evening",
                          e.target.value === "1"
                        )
                      }
                    />
                    <p className="text-xs text-slate-400">Open</p>
                  </div>
                </div>
              </div>
              {/* Monday */}
              <div className="grid grid-cols-3  p-4 gap-2 border-b border-red">
                <p className="font-bold text-xl">Monday</p>
                <div className="flex justify-center gap-2 items-center">
                  <p className="font-bold">Morning</p>
                  <div className="flex items-center  gap-1 justify-center">
                    <p className="text-xs text-slate-400">Closed</p>
                    <input
                      type="range"
                      class="transparent h-1 w-10 rounded-full cursor-pointer appearance-none border-transparent bg-red "
                      min="0"
                      max="1"
                      step="1"
                      value={formData.weekSchedule[1].morning ? 1 : 0}
                      onChange={(e) =>
                        handleWeekScheduleChange(
                          2,
                          "morning",
                          e.target.value === "1"
                        )
                      }
                    />
                    <p className="text-xs text-slate-400">Open</p>
                  </div>
                </div>
                <div className="flex justify-center gap-2 items-center">
                  <p className="font-bold">Evening</p>
                  <div className="flex items-center  gap-1 justify-center">
                    <p className="text-xs text-slate-400">Closed</p>
                    <input
                      type="range"
                      class="transparent h-1 w-10 rounded-full cursor-pointer appearance-none border-transparent bg-red "
                      min="0"
                      max="1"
                      step="1"
                      value={formData.weekSchedule[1].evening ? 1 : 0}
                      onChange={(e) =>
                        handleWeekScheduleChange(
                          2,
                          "evening",
                          e.target.value === "1"
                        )
                      }
                    />
                    <p className="text-xs text-slate-400">Open</p>
                  </div>
                </div>
              </div>
              {/* Tuesday */}
              <div className="grid grid-cols-3  p-4 gap-2 border-b border-red">
                <p className="font-bold text-xl">Tuesday</p>
                <div className="flex justify-center gap-2 items-center">
                  <p className="font-bold">Morning</p>
                  <div className="flex items-center  gap-1 justify-center">
                    <p className="text-xs text-slate-400">Closed</p>
                    <input
                      type="range"
                      class="transparent h-1 w-10 rounded-full cursor-pointer appearance-none border-transparent bg-red "
                      min="0"
                      max="1"
                      step="1"
                      value={formData.weekSchedule[2].morning ? 1 : 0}
                      onChange={(e) =>
                        handleWeekScheduleChange(
                          3,
                          "morning",
                          e.target.value === "1"
                        )
                      }
                    />
                    <p className="text-xs text-slate-400">Open</p>
                  </div>
                </div>
                <div className="flex justify-center gap-2 items-center">
                  <p className="font-bold">Evening</p>
                  <div className="flex items-center  gap-1 justify-center">
                    <p className="text-xs text-slate-400">Closed</p>
                    <input
                      type="range"
                      class="transparent h-1 w-10 rounded-full cursor-pointer appearance-none border-transparent bg-red "
                      min="0"
                      max="1"
                      step="1"
                      value={formData.weekSchedule[2].evening ? 1 : 0}
                      onChange={(e) =>
                        handleWeekScheduleChange(
                          3,
                          "evening",
                          e.target.value === "1"
                        )
                      }
                    />
                    <p className="text-xs text-slate-400">Open</p>
                  </div>
                </div>
              </div>
              {/* Wednesday */}
              <div className="grid grid-cols-3  p-4 gap-2 border-b border-red">
                <p className="font-bold text-xl">Wednesday</p>
                <div className="flex justify-center gap-2 items-center">
                  <p className="font-bold">Morning</p>
                  <div className="flex items-center  gap-1 justify-center">
                    <p className="text-xs text-slate-400">Closed</p>
                    <input
                      type="range"
                      class="transparent h-1 w-10 rounded-full cursor-pointer appearance-none border-transparent bg-red "
                      min="0"
                      max="1"
                      step="1"
                      value={formData.weekSchedule[3].morning ? 1 : 0}
                      onChange={(e) =>
                        handleWeekScheduleChange(
                          4,
                          "morning",
                          e.target.value === "1"
                        )
                      }
                    />
                    <p className="text-xs text-slate-400">Open</p>
                  </div>
                </div>
                <div className="flex justify-center gap-2 items-center">
                  <p className="font-bold">Evening</p>
                  <div className="flex items-center  gap-1 justify-center">
                    <p className="text-xs text-slate-400">Closed</p>
                    <input
                      type="range"
                      class="transparent h-1 w-10 rounded-full cursor-pointer appearance-none border-transparent bg-red "
                      min="0"
                      max="1"
                      step="1"
                      value={formData.weekSchedule[3].evening ? 1 : 0}
                      onChange={(e) =>
                        handleWeekScheduleChange(
                          4,
                          "evening",
                          e.target.value === "1"
                        )
                      }
                    />
                    <p className="text-xs text-slate-400">Open</p>
                  </div>
                </div>
              </div>
              {/* Thursday */}
              <div className="grid grid-cols-3  p-4 gap-2 border-b border-red">
                <p className="font-bold text-xl">Thursday</p>
                <div className="flex justify-center gap-2 items-center">
                  <p className="font-bold">Morning</p>
                  <div className="flex items-center  gap-1 justify-center">
                    <p className="text-xs text-slate-400">Closed</p>
                    <input
                      type="range"
                      class="transparent h-1 w-10 rounded-full cursor-pointer appearance-none border-transparent bg-red "
                      min="0"
                      max="1"
                      step="1"
                      value={formData.weekSchedule[4].morning ? 1 : 0}
                      onChange={(e) =>
                        handleWeekScheduleChange(
                          5,
                          "morning",
                          e.target.value === "1"
                        )
                      }
                    />
                    <p className="text-xs text-slate-400">Open</p>
                  </div>
                </div>
                <div className="flex justify-center gap-2 items-center">
                  <p className="font-bold">Evening</p>
                  <div className="flex items-center  gap-1 justify-center">
                    <p className="text-xs text-slate-400">Closed</p>
                    <input
                      type="range"
                      class="transparent h-1 w-10 rounded-full cursor-pointer appearance-none border-transparent bg-red "
                      min="0"
                      max="1"
                      step="1"
                      value={formData.weekSchedule[4].evening ? 1 : 0}
                      onChange={(e) =>
                        handleWeekScheduleChange(
                          5,
                          "evening",
                          e.target.value === "1"
                        )
                      }
                    />
                    <p className="text-xs text-slate-400">Open</p>
                  </div>
                </div>
              </div>
              {/* Friday */}
              <div className="grid grid-cols-3  p-4 gap-2 border-b border-red">
                <p className="font-bold text-xl">Friday</p>
                <div className="flex justify-center gap-2 items-center">
                  <p className="font-bold">Morning</p>
                  <div className="flex items-center  gap-1 justify-center">
                    <p className="text-xs text-slate-400">Closed</p>
                    <input
                      type="range"
                      class="transparent h-1 w-10 rounded-full cursor-pointer appearance-none border-transparent bg-red "
                      min="0"
                      max="1"
                      step="1"
                      value={formData.weekSchedule[5].morning ? 1 : 0}
                      onChange={(e) =>
                        handleWeekScheduleChange(
                          6,
                          "morning",
                          e.target.value === "1"
                        )
                      }
                    />
                    <p className="text-xs text-slate-400">Open</p>
                  </div>
                </div>
                <div className="flex justify-center gap-2 items-center">
                  <p className="font-bold">Evening</p>
                  <div className="flex items-center  gap-1 justify-center">
                    <p className="text-xs text-slate-400">Closed</p>
                    <input
                      type="range"
                      class="transparent h-1 w-10 rounded-full cursor-pointer appearance-none border-transparent bg-red "
                      min="0"
                      max="1"
                      step="1"
                      value={formData.weekSchedule[5].evening ? 1 : 0}
                      onChange={(e) =>
                        handleWeekScheduleChange(
                          6,
                          "evening",
                          e.target.value === "1"
                        )
                      }
                    />
                    <p className="text-xs text-slate-400">Open</p>
                  </div>
                </div>
              </div>
              {/* Saturday */}
              <div className="grid grid-cols-3  p-4 gap-2 ">
                <p className="font-bold text-xl">Saturday</p>
                <div className="flex justify-center gap-2 items-center">
                  <p className="font-bold">Morning</p>
                  <div className="flex items-center  gap-1 justify-center">
                    <p className="text-xs text-slate-400">Closed</p>
                    <input
                      type="range"
                      class="transparent h-1 w-10 rounded-full cursor-pointer appearance-none border-transparent bg-red "
                      min="0"
                      max="1"
                      step="1"
                      value={formData.weekSchedule[6].morning ? 1 : 0}
                      onChange={(e) =>
                        handleWeekScheduleChange(
                          7,
                          "morning",
                          e.target.value === "1"
                        )
                      }
                    />
                    <p className="text-xs text-slate-400">Open</p>
                  </div>
                </div>
                <div className="flex justify-center gap-2 items-center">
                  <p className="font-bold">Evening</p>
                  <div className="flex items-center  gap-1 justify-center">
                    <p className="text-xs text-slate-400">Closed</p>
                    <input
                      type="range"
                      class="transparent h-1 w-10 rounded-full cursor-pointer appearance-none border-transparent bg-red "
                      min="0"
                      max="1"
                      step="1"
                      value={formData.weekSchedule[6].evening ? 1 : 0}
                      onChange={(e) =>
                        handleWeekScheduleChange(
                          7,
                          "evening",
                          e.target.value === "1"
                        )
                      }
                    />
                    <p className="text-xs text-slate-400">Open</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="mt-4 bg-red p-4 rounded-xl w-full text-white"
              onClick={handleSubmit}
            >
              Confirm
            </button>
          </div>
          {regLoading && (
            <div className="fixed top-0 right-0 w-full bg-black bg-opacity-40 z-50 p-8 h-[100vh] duration-300 flex justify-center items-center">
              <div className="w-[20%] h-[30%] bg-white rounded-xl border-2 border-red flex flex-col justify-center items-center">
                <Loader />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AdminCenters;
