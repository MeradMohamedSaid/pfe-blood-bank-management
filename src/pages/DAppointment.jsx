import React, { useState } from "react";
import { AppLayout } from "../components/AppLayout";
import UserNavbar from "../components/UserNavbar";
import AppNotice from "../components/AppNotice";
import heartIllu from "../assets/heartIllu.png";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
const DonnorApp = () => {
  const [isVerified, setIsVerified] = useState(true);
  const [isAppoinmentSet, setIsAppoinmentSet] = useState(true);
  const [center, setCenter] = useState();
  const [showModal, setShowModal] = useState(false);
  return (
    <AppLayout>
      <UserNavbar />
      <div className="container">
        {!isVerified ? (
          <AppNotice />
        ) : isAppoinmentSet ? (
          <div className="h-[80vh] flex justify-center flex-col">
            <h1 className="text-5xl text-red font-bold mb-4">
              We're waiting for your visit, User.
            </h1>
            <p>
              Your appointment is scheduled for{" "}
              <span className="text-red font-bold">Date of Visit</span>
              . Make sure to mark your calendar and join us on that day.
            </p>
            <p>see you in :</p>
            <h1 className="font-bold text-4xl text-red">
              X Days, X Hours, X min, X seconds.
            </h1>
            <p className="mt-4">
              Your donation can make a huge difference in saving lives.
            </p>
          </div>
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
                To ensure a smooth and efficient donation process, donors are
                kindly requested to schedule an appointment before visiting our
                blood bank. Appointments help us manage donor flow, reduce wait
                times, and maintain safety protocols.
              </p>
              <div className=" flex justify-between items-center mt-10 gap-2">
                <div
                  onClick={() => {
                    setShowModal(!showModal);
                  }}
                  className="relative bg-white w-full py-4 px-6 rounded-full flex justify-between items-center text-red  text-opacity-50 border hover:border-red duration-300 cursor-pointer"
                >
                  {center == null ? <p>Find a Center</p> : <p>{center}</p>}
                  <ChevronDownIcon class="h-6 w-6 " />
                  {showModal ? (
                    <div className="absolute top-16 overflow-y-auto h-40 w-full left-0 rounded-2xl text-sm bg-white border hover:border-red flex flex-col">
                      <p
                        onClick={() => {
                          setCenter("Medical Center 1");
                        }}
                        className="py-2 px-4 hover:bg-red-50 duration-300"
                      >
                        Medical Center 1
                      </p>
                      <p
                        onClick={() => {
                          setCenter("Medical Center 2");
                        }}
                        className="py-2 px-4 hover:bg-red-50 duration-300"
                      >
                        Medical Center 2
                      </p>
                      <p
                        onClick={() => {
                          setCenter("Medical Center 3");
                        }}
                        className="py-2 px-4 hover:bg-red-50 duration-300"
                      >
                        Medical Center 3
                      </p>
                      <p
                        onClick={() => {
                          setCenter("Medical Center 4");
                        }}
                        className="py-2 px-4 hover:bg-red-50 duration-300"
                      >
                        Medical Center 4
                      </p>
                      <p
                        onClick={() => {
                          setCenter("Medical Center 5");
                        }}
                        className="py-2 px-4 hover:bg-red-50 duration-300"
                      >
                        Medical Center 5
                      </p>
                      <p
                        onClick={() => {
                          setCenter("Medical Center 6");
                        }}
                        className="py-2 px-4 hover:bg-red-50 duration-300"
                      >
                        Medical Center 6
                      </p>
                    </div>
                  ) : null}
                </div>
                <button className="bg-red text-white py-4 px-6 rounded-full min-w-fit hover:bg-opacity-80 duration-300">
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default DonnorApp;
