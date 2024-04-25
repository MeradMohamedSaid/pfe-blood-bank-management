import React, { useState } from "react";
import { AppLayout } from "../components/AppLayout";
import ClinicNavbar from "../components/ClinicNavbar";
import AppNotice from "../components/AppNotice";

import {
  CheckIcon,
  ChevronDownIcon,
  CircleStackIcon,
  DocumentDuplicateIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
const ClinicAppointment = () => {
  const [isVerified, setIsVerified] = useState(true);
  const [isAppoinmentSet, setIsAppoinmentSet] = useState(false);
  const [center, setCenter] = useState();
  const [showModal, setShowModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
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
                <UserIcon className="w-6" />
                <input
                  placeholder="Patient Name"
                  type="text"
                  class="outline-none w-full"
                />
              </div>
              <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
                <DocumentDuplicateIcon className="w-6" />
                <p className="mr-auto cursor-pointer">Medical Situation</p>
                <ChevronDownIcon className="w-6" />
              </div>
              <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
                <CircleStackIcon className="w-6" />
                <input
                  placeholder="Quantity"
                  type="number"
                  class="outline-none w-full"
                />
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
            <button className="bg-red text-white py-4 px-6 rounded-full min-w-fit hover:bg-opacity-80 duration-300">
              Continue
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default ClinicAppointment;
