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
  IdentificationIcon,
  MinusCircleIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";
import {
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  PresentationChartBarIcon,
  UserGroupIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import Loader from "./Loader";
import axios from "axios";

const PacketsRequest = ({ close, id }) => {
  const [appo, setAppo] = useState({});
  const fetchBloodRequest = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/getBloodRequest/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Center Requests info:", error);
      throw error;
    }
  };

  const fetch = async (id) => {
    setLoading((old) => true);
    const response = await fetchBloodRequest(id);
    if (response.valid) {
      console.log(response.Request);
      setAppo(response.Request);
      if (response.Request.status > 0) {
        const packet = await getTransaction(id);
        console.log("Packet Fetched = ", packet);
        setBloodPacketIDAssigned((old) => packet.Transaction.bloodPacketID);
      }
    }
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        setLoading((old) => false);
        resolve();
      }, 500);
    });
  };

  useEffect(() => {
    console.log("Packet id : ", id);
    fetch(id);
  }, []);

  const [erroMSG, setErMSG] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setErMSG((old) => "");
    }, 10000);
  }, [erroMSG]);

  const changeStatus = async (newStatus) => {
    const ne = newStatus;
    try {
      const response = await axios.put(
        `http://localhost:3000/updateRequestStatus/${id}`,
        { ne }
      );
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  };

  const handleChangeStat = async (newStat) => {
    const response = await changeStatus(newStat);
    console.log(response);
    if (response.valid) {
      await fetch(id);
    }
  };

  const addTransaction = async (bloodPacketID, userId, requestID) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/addTransaction",
        {
          bloodPacketID,
          userId,
          requestID,
        }
      );
      if (response.data.valid) {
        console.log(
          "Transaction added and request status updated successfully:",
          response.data.message
        );
        return true;
      } else {
        console.log(response.data.message);
        setErMSG(response.data.message);
        return false;
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "Error response from server:",
          error.response.data.message
        );
        setErMSG(error.response.data.message);
      } else {
        console.error("Error:", error.message);
        setErMSG("An error occurred while processing your request.");
      }
      return false;
    }
  };

  const [bloodPacketIDAssigned, setBloodPacketIDAssigned] = useState(null);

  const getTransaction = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/transactions/${id}`
      );
      console.log("Transacion Details", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching Center Requests info:", error);
      throw error;
    }
  };

  const [bloodPacketID, setBloodPacketID] = useState(null);
  const handleBloodPacketIDChange = (e) => {
    setBloodPacketID(e.target.value);
  };
  const handleAddTransaction = async () => {
    const response = await addTransaction(bloodPacketID, appo.clinicID, id);
    console.log(response);
    if (response) {
      await new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          await fetch(id);
          resolve();
        }, 500);
      });
    }
  };

  const [Loading, setLoading] = useState(false);
  return (
    <>
      <div className="fixed top-0 left-0 h-[100vh] w-[100vw] bg-black bg-opacity-70 flex justify-center items-center">
        {" "}
        <div className="bg-white w-[50%] h-[70%] rounded-xl flex flex-col justify-start items-center gap-1  fade-in-up">
          {Loading ? (
            <>
              <Loader />
            </>
          ) : (
            <>
              <div className="w-full h-full flex flex-col justify-start items-center gap-1 fade-in-up">
                <div className="w-full h-[15%] border-b-2 border-red flex justify-between items-center px-10 ">
                  <div>
                    <h2 className="flex gap-2">
                      <span className="text-red">
                        <InformationCircleIcon className="w-6" />
                      </span>
                      <span className="font-bold">Id : </span>
                      <span>{id}</span>
                    </h2>
                    <h2 className="flex gap-2">
                      <span className="text-red">
                        <BuildingOffice2Icon className="w-6" />
                      </span>
                      <span className="font-bold">Clinic : </span>
                      <span>{appo.name}</span>
                    </h2>
                    <h2 className="flex gap-2">
                      <span className="text-red">
                        <IdentificationIcon className="w-6" />
                      </span>
                      <span className="font-bold">Patient : </span>
                      <span>{appo.patientName}</span>
                    </h2>
                  </div>
                  <div
                    className="bg-red w-10 h-10 rounded-md flex justify-center items-center text-white cursor-pointer"
                    onClick={() => {
                      close();
                    }}
                  >
                    <XMarkIcon className="w-6 " />
                  </div>
                </div>
                <h1 className="mt-2 mb-5 font-bold text-2xl">
                  Request Info :{" "}
                </h1>

                <div className="w-full flex justify-between items-start px-[20%]">
                  <h2>
                    <strong>Blood Type : </strong>
                    {appo.bloodtype}
                  </h2>
                  <h2>
                    <strong>Blood Packet Id : </strong>
                    {bloodPacketIDAssigned === null
                      ? "Not Assigned Yet"
                      : bloodPacketIDAssigned}
                  </h2>
                </div>
                <div className="w-full flex justify-between items-center px-[20%]">
                  <h2>
                    <strong>Situation : </strong>
                    {appo.urgent === 1 ? " Urgent" : " Casual"}
                  </h2>
                  <h2>
                    <strong>Status : </strong>
                    {appo.status === 0
                      ? "Request Received"
                      : appo.status === 1
                      ? "Processed"
                      : appo.status === 2
                      ? "Out For Delivery"
                      : "Reached Destination"}
                  </h2>
                </div>
                <div className="flex w-[50%] gap-2 justify-start items-center text-center mt-7">
                  {appo.status === 0 ? (
                    <EllipsisHorizontalCircleIcon className="w-6 text-red" />
                  ) : appo.status > 0 ? (
                    <CheckCircleIcon className="w-6 text-red" />
                  ) : (
                    <MinusCircleIcon className="w-6 text-red" />
                  )}
                  <span className="w-[10%] h-1 bg-red"></span>
                  <span className="font-bold text-center">
                    Packet Assignment
                  </span>
                </div>
                {appo.status === 0 && (
                  <div className="w-[50%] flex flex-col justify-center items-center px-10 gap-5 py-9">
                    <div className="w-full bg-white p-4 rounded-md border border-red">
                      <input
                        type="number"
                        name="packet"
                        placeholder="Blood Packet Id"
                        className="outline-none"
                        value={bloodPacketID}
                        onChange={handleBloodPacketIDChange}
                      />
                    </div>
                    <button
                      className={
                        bloodPacketID === null
                          ? "w-full rounded-md px-4 py-2 bg-red text-white cursor-not-allowed bg-opacity-70"
                          : "w-full rounded-md px-4 py-2 bg-red text-white"
                      }
                      onClick={async () => handleAddTransaction()}
                      disabled={bloodPacketID === null}
                    >
                      Submit
                    </button>
                    <h2 className="text-red">{erroMSG}</h2>
                    <h2 className="text-xs">
                      By clicking Submit, the request status will be updated and
                      assigned to the corresponding packet.
                    </h2>
                  </div>
                )}
                <div className="flex w-[50%] gap-2 justify-start items-center text-center">
                  {appo.status === 1 ? (
                    <EllipsisHorizontalCircleIcon className="w-6 text-red" />
                  ) : appo.status > 1 ? (
                    <CheckCircleIcon className="w-6 text-red" />
                  ) : (
                    <MinusCircleIcon className="w-6 text-red" />
                  )}
                  <span className="w-[10%] h-1 bg-red"></span>
                  <span className="font-bold text-center">
                    Dispatch Preparation
                  </span>
                </div>
                {appo.status === 1 && (
                  <div className="w-[50%] flex flex-col justify-center items-center px-10 gap-2 py-9">
                    <button
                      className={
                        "w-full rounded-md px-4 py-3 bg-red text-white"
                      }
                      onClick={async () => handleChangeStat(2)}
                    >
                      Confirm Dispatch
                    </button>
                    <h2 className="text-red">{erroMSG}</h2>
                    <h2 className="text-xs">
                      Clicking this button updates the request status and signal
                      to the clinic that the blood packet is out for delivery.
                    </h2>
                  </div>
                )}
                <div className="flex w-[50%] gap-2 justify-start items-center text-center">
                  {appo.status === 2 ? (
                    <EllipsisHorizontalCircleIcon className="w-6 text-red" />
                  ) : appo.status > 2 ? (
                    <CheckCircleIcon className="w-6 text-red" />
                  ) : (
                    <MinusCircleIcon className="w-6 text-red" />
                  )}
                  <span className="w-[10%] h-1 bg-red"></span>
                  <span className="font-bold text-center">
                    Arrival Confirmation
                  </span>
                </div>
                {appo.status === 2 && (
                  <div className="w-[50%] flex flex-col justify-center items-center px-10 gap-2 py-9">
                    <button
                      className={
                        "w-full rounded-md px-4 py-3 bg-red text-white"
                      }
                      onClick={async () => handleChangeStat(3)}
                    >
                      Confirm Delivered
                    </button>
                    <h2 className="text-red">{erroMSG}</h2>
                    <h2 className="text-xs">
                      Clicking this button updates the request status and signal
                      to the clinic that the blood packet is Delivered.
                    </h2>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PacketsRequest;
