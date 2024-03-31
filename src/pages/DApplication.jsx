import React, { useState } from "react";
import { AppLayout } from "../components/AppLayout";
import UserNavbar from "../components/UserNavbar";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowLeftIcon,
  IdentificationIcon,
  PhoneIcon,
  ChevronRightIcon,
  CheckIcon,
  CheckCircleIcon,
  MapPinIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  StarIcon,
  XMarkIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
const DonnorApplication = () => {
  const [section, setSection] = useState(1);
  // Data Grabbers
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [clinicAddress, setClinicAddress] = useState();
  const [userGender, setUserGender] = useState("");
  const [userType, setUserType] = useState(null);
  const [bloodType, setBloodType] = useState("");
  const [sexualRelationType, setSexualRelationType] = useState("");
  const [gotDiseases, setGotDiseases] = useState(false);
  const [id, setId] = useState(true); // Personal ID
  const [hpa, setHpa] = useState(null); // Hematological Phenotyping analysis
  const [stip, setStip] = useState(null); // Sexually Transmitted Infection Profile
  return (
    <AppLayout>
      <UserNavbar />
      <div className="container">
        <div className="flex pt-40 items-center h-[80vh] flex-col gap-4">
          <h1 className="text-4xl font-bold ">Application Review</h1>
          {/* Menu */}
          <div className="grid grid-cols-3 border-b border-gray-400 text-center mb-4">
            <p
              onClick={() => {
                setSection(1);
              }}
              className={
                section === 1
                  ? "py-2 px-6 hover:cursor-pointer text-red font-bold duration-300 border-b-2 border-red"
                  : "py-2 px-6 text-gray-300 hover:cursor-pointer hover:text-red duration-300 border-b-2 border-transparent hover:border-red"
              }
            >
              Personal Informations
            </p>
            <p
              onClick={() => {
                setSection(2);
              }}
              className={
                section === 2
                  ? "py-2 px-6 hover:cursor-pointer text-red font-bold duration-300 border-b-2 border-red"
                  : "py-2 px-6 text-gray-300 hover:cursor-pointer hover:text-red duration-300 border-b-2 border-transparent hover:border-red"
              }
            >
              Personal Informations
            </p>
            <p
              onClick={() => {
                setSection(3);
              }}
              className={
                section === 3
                  ? "py-2 px-6 hover:cursor-pointer text-red font-bold duration-300 border-b-2 border-red"
                  : "py-2 px-6 text-gray-300 hover:cursor-pointer hover:text-red duration-300 border-b-2 border-transparent hover:border-red"
              }
            >
              Personal Informations
            </p>
          </div>
          {section === 1 ? (
            <div className="w-[26rem] fade-in-up">
              <h1 className="text-3xl mb-4 text-center">
                Provided Informations :
              </h1>
              <div className="bg-white p-4 rounded-xl flex items-center gap-2 w-full border border-red text-red mb-2">
                <EnvelopeIcon className="w-6" />
                <p>louayekazar@gmail.com</p>
              </div>
              <div className="bg-white p-4 rounded-xl flex items-center gap-2 w-full border border-red text-red mb-2">
                <PhoneIcon className="w-6" />
                <p>0553686343</p>
              </div>
              <div className="bg-white p-4 rounded-xl flex items-center gap-2 w-full border border-red text-red mb-2">
                <StarIcon className="w-6" />
                <p>Male</p>
              </div>
            </div>
          ) : section === 2 ? (
            <div className="w-[26rem] fade-in-up">
              <h1 className="text-3xl mb-4 text-center">
                Provided Informations :
              </h1>
              <div className="bg-white p-4 rounded-xl flex items-center gap-2 w-full border border-red text-red mb-2">
                <p>Blood Type : O-</p>
              </div>
              <div className="bg-white p-4 rounded-xl flex items-center gap-2 w-full border border-red text-red mb-2">
                Sexual Relationships : None
              </div>
              <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-2">
                Have blood related diseases ?
                <XMarkIcon className="w-6" />
              </div>
              <div className="hover:px-6 hover:bg-red hover:text-white cursor-pointer duration-300 bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-2">
                Donation History
                <ChevronRightIcon className="w-6" />
              </div>
            </div>
          ) : (
            <div className="w-[26rem] fade-in-up">
              <h1 className="text-3xl mb-4 text-center">
                Provided Informations :
              </h1>
              <div className="hover:px-6 hover:bg-red hover:text-white cursor-pointer duration-300 bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-2">
                Personal ID
                {id === null ? (
                  <ArrowUpTrayIcon className="w-6" />
                ) : (
                  <CheckIcon className="w-6" />
                )}
              </div>
              <div className="hover:px-6 hover:bg-red hover:text-white cursor-pointer duration-300 bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-2">
                Hematological Phenotyping analysis
                {hpa === null ? (
                  <ArrowUpTrayIcon className="w-6" />
                ) : (
                  <CheckIcon className="w-6" />
                )}
              </div>
              <div className="hover:px-6 hover:bg-red hover:text-white cursor-pointer duration-300 bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-2">
                Sexually Transmitted Infection Profile
                {stip === null ? (
                  <ArrowUpTrayIcon className="w-6" />
                ) : (
                  <CheckIcon className="w-6" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default DonnorApplication;
