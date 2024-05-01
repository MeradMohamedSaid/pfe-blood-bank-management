import React, { useEffect, useState } from "react";
import { AppLayout } from "../components/AppLayout";
import ClinicNavbar from "../components/ClinicNavbar";
import AppNotice from "../components/AppNotice";
import { useLocation } from "react-router-dom";
import axios from "axios";

import {
  CheckIcon,
  ChevronDownIcon,
  CircleStackIcon,
  DocumentDuplicateIcon,
  PhoneIcon,
  UserIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const ClinicAppointmentPhase = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [isVerified, setIsVerified] = useState(false);
  const [isAppoinmentSet, setIsAppoinmentSet] = useState(false);
  const [center, setCenter] = useState();
  const [showModal, setShowModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();
  ///////////////////////////////////////////////////////////////////////////
  const [showMedicalSituationDropdown, setShowMedicalSituationDropdown] =
    useState(false);
  const [medicalSituation, setMedicalSituation] = useState("");
  ///////////////////////////////////////////////////////////////////////////

  const [id, setId] = useState("");
  useEffect(() => {
    const centerId = queryParams.get("id");
    if (centerId !== null) {
      setId(centerId);
    } else {
      navigate("/clinic/appointment");
    }
    const userStatus = async () => {
      const data = await getUserStatus();
      console.log("Data user Status : ", data);
      if (data.Stat === 0) {
        setIsVerified((old) => false);
      } else {
        setIsVerified((old) => true);
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

  return (
    <AppLayout>
      <ClinicNavbar />
      <div className="container">
        {!isVerified ? (
          <AppNotice />
        ) : isAppoinmentSet ? (
          <div className="h-[80vh] flex justify-center flex-col">
            Your Appointment is set, check history.
          </div>
        ) : (
          <div className="h-[80vh] flex justify-center flex-col w-[26rem] mx-auto fade-in-up">
            {/* when appoinment is still not set */}
            <div>
              <h1 className="text-3xl mb-4">Please fill this form :</h1>
              <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
                <BuildingOffice2Icon className="w-6" />
                <p className="mr-auto ">{id}</p>
              </div>
              <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
                <UserIcon className="w-6" />
                <input
                  placeholder="Patient Name"
                  type="text"
                  class="outline-none w-full"
                />
              </div>
              <div
                className="relative bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4 cursor-pointer"
                onClick={() =>
                  setShowMedicalSituationDropdown(!showMedicalSituationDropdown)
                }
              >
                <DocumentDuplicateIcon className="w-6" />
                <div className="mr-auto ">
                  <p className="select-none">
                    {medicalSituation
                      ? `Medical Situation: ${medicalSituation}`
                      : "Medical Situation"}
                  </p>
                </div>
                <ChevronDownIcon className="w-6" />
                {showMedicalSituationDropdown && (
                  <div className="absolute z-10 top-full left-0 bg-white shadow rounded-md border border-red-500 mt-1 w-full">
                    <ul className="list-none p-0 m-0">
                      <li
                        className="cursor-pointer rounded-md px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setMedicalSituation("Very Urgent");
                          setShowMedicalSituationDropdown(false);
                        }}
                      >
                        Very Urgent
                      </li>
                      <li
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setMedicalSituation("Surgery");
                          setShowMedicalSituationDropdown(false);
                        }}
                      >
                        Surgery
                      </li>
                      <li
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setMedicalSituation("Accident");
                          setShowMedicalSituationDropdown(false);
                        }}
                      >
                        Accident
                      </li>
                      <li
                        className="cursor-pointer rounded-md px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setMedicalSituation("Casual");
                          setShowMedicalSituationDropdown(false);
                        }}
                      >
                        Casual
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2 justify-center mb-4">
              <div
                onClick={() => {
                  setConfirm(!confirm);
                }}
                className={
                  confirm
                    ? "border rounded-md w-fit border-red p-1 h-fit cursor-pointer bg-red text-white duration-300"
                    : "border rounded-md w-fit border-red p-1 h-fit cursor-pointer duration-300 text-red"
                }
              >
                <CheckIcon className="w-3" />
              </div>
              <p className="text-sm text-zinc-600">
                I confirm that the informations provided are valid and the
                quantity requested is accurate.{" "}
                <span className="text-red hover:underline cursor-pointer">
                  read more.
                </span>
              </p>
            </div>
            <button className="bg-red text-white py-4 px-6 rounded-xl min-w-fit hover:bg-opacity-80 duration-300">
              Request Blood
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default ClinicAppointmentPhase;
