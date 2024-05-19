import { useEffect, useState } from "react";
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
  ClockIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
  Bars2Icon,
  CheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import Loader from "./Loader";
import axios from "axios";
const CenterModelInfo = ({
  centerInfo,
  centerInfoModal,
  setCenterInfoModal,
  bloodOrApp,
  setBloodOrApp,
  setInfoCenter,
  infoCenter,
  fetchCenters,
}) => {
  const [loading, setLoading] = useState(true);
  const [bloodPackets, setBloodPackets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [managerInfo, setManagerInfo] = useState();
  useEffect(() => {
    const centInfoFun = async () => {
      if (infoCenter) {
        console.log("info center : ", infoCenter);
        const user = await fetchUser(infoCenter.mod);
        console.log("fetched user : ", user.Result);
        setManagerInfo((oldf) => user.Result);
        if (infoCenter.current > 0) {
          const resul = await fetchBloodPackets(infoCenter.id);
          console.log("packets:", resul.Result);
          setBloodPackets((old) => resul.Result);
        }
        const appo = await fetchCenterAppointments(infoCenter.id);
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
      }
    };
    centInfoFun();
    SetShowMenu(false);
  }, [infoCenter]);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const fetchBloodPackets = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/getBloodPacket/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching blood packets:", error);
      throw error;
    }
  };
  const fetchCenterAppointments = async (idc) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/getCenterAppointments/${idc}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Center Appointments info:", error);
      throw error;
    }
  };
  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  };

  const handleDeleteAppo = async (id) => {
    console.log("Delete Appointment : ", id);
    const message = await handleDelete(id);

    if (message === "Appointment deleted successfully") {
      const appo = await fetchCenterAppointments(infoCenter.id);
      if (appo.valid) {
        console.log("Center Appointments: ", appo.Appointments);
        setAppointments((oss) => appo.Appointments);
      } else {
        setAppointments((oss) => []);
      }
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

  const [showDelete, SetShowDelete] = useState(false);
  const [showMenu, SetShowMenu] = useState(false);
  const [showEdit, SetShowEdit] = useState(false);

  const [formValues, setFormValues] = useState({
    address: "",
    name: "",
    capacity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleModify = async () => {
    console.log("edit form Values :", formValues);
    let jsonData = {};
    if (formValues.capacity) jsonData.maxCapacite = formValues.capacity;
    if (formValues.address !== "") jsonData.address = formValues.address;
    if (formValues.name !== "") jsonData.name = formValues.name;
    var res = { center: {} };
    if (Object.keys(jsonData).length) {
      res.center = await updateStoringCentre(jsonData);
      console.log("response: ", res.center);
    }
    if (res.center.done) {
      SetShowEdit((old) => false);
      fetchCenters();
      setCenterInfoModal(false);
    }
  };

  const handleDeleteCenter = async () => {
    const data = await deleteStoringCentre();
    console.log(data);
    if (data.done) {
      SetShowDelete((old) => false);
      await fetchCenters();
      setCenterInfoModal(false);
    }
  };
  const updateStoringCentre = async (reqdata) => {
    const url = `http://localhost:3000/updateStoringCentre/${infoCenter.id}`;
    try {
      console.log(reqdata);
      const response = await axios.patch(url, reqdata);
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating storing centre:", error);
    }
  };

  const deleteStoringCentre = async () => {
    const url = `http://localhost:3000/deleteStoringCentre/${infoCenter.id}`;
    try {
      const response = await axios.delete(url);
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating storing centre:", error);
    }
  };

  return (
    <>
      {centerInfoModal ? (
        <>
          <div className="absolute w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-20 ">
            <div
              onClick={() => {
                setCenterInfoModal(false);
                setInfoCenter((old) => null);
                setBloodPackets((old) => []);
                setLoading(true);
              }}
              className="absolute right-4 top-4 bg-red p-2 cursor-pointer rounded-lg z-20 text-white fade-in-up"
            >
              <XMarkIcon className="w-6" />
            </div>
            {loading ? (
              <div className="bg-white p-8 rounded-xl border border-red w-2/4">
                <Loader />
              </div>
            ) : (
              <>
                <div className="bg-white p-8 rounded-xl border border-red w-2/4 fade-in-up">
                  {/* Modal Header */}
                  <div className="flex justify-start items-center gap-2 w-full ">
                    <BuildingOfficeIcon className="w-16 text-red" />
                    <div className="w-full">
                      <h1 className="text-3xl font-bold flex justify-center align-center">
                        <span>
                          {infoCenter.name
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}{" "}
                          Storing Center
                        </span>
                        {showMenu ? (
                          <XMarkIcon
                            className="w-9 ml-auto text-red cursor-pointer rounded-3xl hover:scale-110 duration-300 active:bg-gray-100"
                            onClick={() => {
                              SetShowMenu((old) => !old);
                            }}
                          />
                        ) : (
                          <Bars2Icon
                            className="w-9 ml-auto text-red cursor-pointer rounded-3xl hover:scale-110 duration-300 active:bg-gray-100"
                            onClick={() => {
                              SetShowMenu((old) => !old);
                            }}
                          />
                        )}
                      </h1>

                      <p className="text-sm text-slate-400">
                        {infoCenter.address
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </p>
                      <p className="text-sm text-slate-400">
                        0{infoCenter.phone}
                      </p>
                    </div>
                  </div>
                  {/* red line */}
                  <div className="w-full h-1 rounded-full bg-red my-4"></div>
                  {/* Informations */}
                  <h1>Informations :</h1>
                  <div className="flex items-center gap-2">
                    <IdentificationIcon className="w-6" />
                    <p className="text-slate-400">
                      Identifier :{" "}
                      <span className="font-bold text-black">
                        {infoCenter.id}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDaysIcon className="w-6" />
                    <p className="text-slate-400">
                      Created On :{" "}
                      <span className="font-bold text-black">
                        {infoCenter.Created_On}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-6" />
                    <p className="text-slate-400">
                      Managed By :{" "}
                      {
                        <span className="font-bold text-black">
                          {managerInfo
                            ? `${managerInfo.name} ( ${infoCenter.mod} )`
                            : `Manger( ${infoCenter.mod} )`}
                        </span>
                      }
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-6" />
                    <p className="text-slate-400">
                      Today Schedule :{" "}
                      {infoCenter.today.morning || infoCenter.today.evening ? (
                        <span className="font-bold text-black">
                          {infoCenter.today.morning && "8:00 - 12:00"}
                          {infoCenter.today.morning &&
                            infoCenter.today.evening &&
                            " / "}
                          {infoCenter.today.evening && "14:00 - 18:00"}
                        </span>
                      ) : (
                        <span className="font-bold text-black">
                          Closed Today
                        </span>
                      )}
                    </p>
                  </div>
                  {/* Packets and Appointments */}
                  <div className="grid grid-cols-2 mt-4">
                    <div
                      onClick={() => {
                        setBloodOrApp(false);
                      }}
                      className={
                        !bloodOrApp
                          ? "p-4 bg-slate-100 duration-300 cursor-pointer rounded-l-xl border-b border-red"
                          : "p-4 hover:bg-slate-100 duration-300 cursor-pointer rounded-l-xl border-b border-red"
                      }
                    >
                      <h1 className="w-full flex items-center justify-between text-xl font-bold">
                        Blood Packets{" "}
                        <span className="bg-red py-1 px-6 rounded-full text-sm text-white">
                          {infoCenter.current}
                        </span>
                      </h1>
                      <p className="text-xs text-slate-400">
                        All registered blood packets on this center
                      </p>
                    </div>
                    <div
                      onClick={() => {
                        setBloodOrApp(true);
                      }}
                      className={
                        bloodOrApp
                          ? "p-4 bg-slate-100 duration-300 cursor-pointer rounded-r-xl border-b border-red"
                          : "p-4 hover:bg-slate-100 duration-300 cursor-pointer rounded-r-xl border-b border-red"
                      }
                    >
                      <h1 className="w-full flex items-center justify-between text-xl font-bold">
                        Appointment{" "}
                        <span className="bg-red py-1 px-6 rounded-full text-sm text-white">
                          {appointments.length}
                        </span>
                      </h1>
                      <p className="text-xs text-slate-400">
                        All registered Appointment
                      </p>
                    </div>
                  </div>
                  {!bloodOrApp ? (
                    <div>
                      {/* Blood Packets Table */}
                      <div className="mt-4 rounded-xl border border-gray-300 overflow-hidden">
                        {/* Head */}
                        <div className="grid grid-cols-4 bg-gray-300">
                          <p className="p-2 flex items-center justify-center">
                            Pocket Id
                          </p>
                          <p className="p-2 flex items-center justify-center">
                            Donor Id
                          </p>
                          <p className="p-2 flex items-center justify-center gap-2">
                            Expiry Date
                          </p>
                          <p className="p-2 flex items-center justify-center gap-2">
                            Packet Size
                          </p>
                        </div>
                        <div className="max-h-80 overflow-y-scroll ">
                          {bloodPackets.length > 0 ? (
                            <>
                              {bloodPackets.map((pak) => {
                                return (
                                  <>
                                    <div className="grid grid-cols-4">
                                      <p className=" p-4 flex items-center justify-center">
                                        {pak.id}
                                      </p>
                                      <p className=" p-4 flex items-center justify-center">
                                        {pak.donorId}
                                      </p>
                                      <p className="text-green-400 p-4 flex items-center justify-center">
                                        {pak.expDate.slice(0, 10)}
                                      </p>
                                      <p className=" p-4 flex items-center justify-center">
                                        {pak.packetSize === 500
                                          ? "Small (0.5L)"
                                          : pak.packetSize === 1000
                                          ? "Medium (1.0L)"
                                          : "Large (1.5L)"}
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
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* Appointment Table */}
                      <div className="mt-4 rounded-xl border border-gray-300 overflow-hidden">
                        {/* Head */}
                        <div className="grid grid-cols-5 bg-gray-300">
                          <p className="p-2 flex items-center justify-center">
                            User Id
                          </p>
                          <p className="p-2 flex items-center justify-center">
                            Day
                          </p>
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
                          <div className="max-h-80 overflow-y-scroll ">
                            {appointments.length > 0 ? (
                              <>
                                {appointments.map((appo) => {
                                  return (
                                    <>
                                      <div className="grid grid-cols-5">
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
                                              handleDeleteAppo(
                                                appo.appointmentID
                                              )
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
                  )}
                  {showEdit && (
                    <div className="fixed top-[20%] left-[25%] px-8 bg-white bg-opacity-90 rounded-xl border-[1.5px] border-red w-[50%] py-8 flex flex-col justify-center items-center backdrop-blur gap-2 fade-in">
                      <PencilSquareIcon className="w-14 text-red" />

                      <div className="py-[5px] pl-2 bg-white border-[1.5px] rounded-md border-red w-full flex justify-start items-center">
                        <div className="w-full">
                          <input
                            type="text"
                            placeholder="center name"
                            className="w-full outline-none"
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="px-5 flex justify-start items-center gap-[1px]">
                          <span
                            onClick={() =>
                              setFormValues((old) => ({
                                ...old,
                                name: infoCenter.name,
                              }))
                            }
                            className="cursor-pointer px-3 py-1 rounded-md hover:bg-gray-200 duration-300"
                          >
                            <ArrowPathIcon className="w-5 " />
                          </span>
                          <span
                            onClick={() =>
                              setFormValues((old) => ({
                                ...old,
                                name: "",
                              }))
                            }
                            className="text-red cursor-pointer px-3 py-1  rounded-md hover:bg-gray-200 duration-300"
                          >
                            <XMarkIcon className="w-6 " />
                          </span>
                        </div>
                      </div>
                      <div className="py-[5px] pl-2 bg-white border-[1.5px] rounded-md border-red w-full flex justify-start items-center">
                        <div className="w-full">
                          <input
                            type="text"
                            placeholder="center address"
                            className="w-full outline-none"
                            name="address"
                            value={formValues.address}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="px-5 flex justify-start items-center gap-[1px]">
                          <span
                            onClick={() =>
                              setFormValues((old) => ({
                                ...old,
                                address: infoCenter.address,
                              }))
                            }
                            className="cursor-pointer px-3 py-1 rounded-md hover:bg-gray-200 duration-300"
                          >
                            <ArrowPathIcon className="w-5 " />
                          </span>
                          <span
                            onClick={() =>
                              setFormValues((old) => ({
                                ...old,
                                address: "",
                              }))
                            }
                            className="text-red cursor-pointer px-3 py-1  rounded-md hover:bg-gray-200 duration-300"
                          >
                            <XMarkIcon className="w-6 " />
                          </span>
                        </div>
                      </div>
                      <div className="py-[5px] pl-2 bg-white border-[1.5px] rounded-md border-red w-full flex justify-start items-center">
                        <div className="w-full">
                          <input
                            type="number"
                            placeholder="center maximum capacity"
                            className="w-full outline-none"
                            name="capacity"
                            value={formValues.capacity}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="px-5 flex justify-start items-center gap-[1px]">
                          <span
                            onClick={() =>
                              setFormValues((old) => ({
                                ...old,
                                capacity: infoCenter.stock,
                              }))
                            }
                            className="cursor-pointer px-3 py-1 rounded-md hover:bg-gray-200 duration-300"
                          >
                            <ArrowPathIcon className="w-5 " />
                          </span>
                          <span
                            onClick={() =>
                              setFormValues((old) => ({
                                ...old,
                                capacity: "",
                              }))
                            }
                            className="text-red cursor-pointer px-3 py-1  rounded-md hover:bg-gray-200 duration-300"
                          >
                            <XMarkIcon className="w-6 " />
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button
                          className="px-4 py-2 font-bold"
                          onClick={() => {
                            SetShowEdit(false);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 bg-red rounded-md text-white font-bold"
                          onClick={() => handleModify()}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                  {showDelete && (
                    <div className="fixed top-[35%] left-[25%] bg-white bg-opacity-90 rounded-xl border-[1.5px] border-red w-[50%] py-8 flex flex-col justify-center items-center backdrop-blur gap-2 fade-in">
                      <TrashIcon className="w-14 text-red" />
                      <h2 className="text-center">
                        Are you sure you want to delete
                        <span className="font-bold text-red">
                          {" "}
                          "{infoCenter.name}"{" "}
                        </span>
                        ?<br />
                        <span>
                          This action is critical and cannot be undone.
                        </span>
                      </h2>
                      <div className="flex gap-4">
                        <button
                          className="px-4 py-2 font-bold"
                          onClick={() => {
                            SetShowDelete(false);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 bg-red rounded-md text-white font-bold"
                          onClick={async () => {
                            await handleDeleteCenter();
                          }}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                  {showMenu && (
                    <div className="fixed top-[12%] right-[5%] bg-white rounded-md border-[1.5px] border-red w-[15%] flex flex-col justify-center items-center text-red backdrop-blur fade-in">
                      <div
                        className="w-full flex justify-between items-start px-5 py-2 text-l font-bold hover:bg-gray-100 cursor-pointer rounded-t-md"
                        onClick={() => {
                          SetShowEdit(true);
                          SetShowMenu(false);
                          setFormValues({
                            address: "",
                            name: "",
                            capacity: null,
                          });
                        }}
                      >
                        <span>Edit</span>
                        <PencilSquareIcon className="w-6 " />
                      </div>
                      <div
                        className="w-full flex justify-between items-start px-5 py-2 text-l font-bold hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          SetShowDelete(true);
                          SetShowMenu(false);
                        }}
                      >
                        <span>Delete</span>
                        <TrashIcon className="w-6 " />
                      </div>
                      <div
                        className="w-full flex justify-between items-start px-5 py-2 text-l font-bold hover:bg-gray-100 cursor-pointer rounded-b-md"
                        onClick={() => {
                          SetShowMenu(false);
                        }}
                      >
                        <span>Close</span>
                        <XMarkIcon className="w-6 " />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      ) : null}
    </>
  );
};

export default CenterModelInfo;
