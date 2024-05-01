import React, { useState, useEffect } from "react";
import { AppLayout } from "../components/AppLayout";
import ClinicNavbar from "../components/ClinicNavbar";
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
  BuildingOffice2Icon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import Loader from "../components/Loader";

const ClinicApplication = () => {
  const [section, setSection] = useState(1);
  // Data Grabbers

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
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      const data = await userData();
      console.log(data);
      setClinicName(data.clinicInfo.name);
      setClinicAddress(data.clinicInfo.address);
      new Promise((resolve) => {
        setTimeout(() => {
          setIsLoading(false);
          resolve();
        }, 500);
      });
    };
    getUserData();
  }, []);

  const userData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/clinicinfo");
      if (response.status !== 200) {
        throw new Error("Failed to fetch user data");
      }

      const userData = response.data;
      console.log("Clinic data:", userData);
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      return null;
    }
  };

  return (
    <AppLayout>
      <ClinicNavbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <div className="flex pt-40 items-center h-[80vh] flex-col gap-4">
              <h1 className="text-4xl font-bold ">Application Review</h1>
              {/* Menu */}
              <div className="grid grid-cols-2 border-b border-gray-400 text-center mb-4">
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
                  Clinic Informations
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
                  Required Documents
                </p>
              </div>
              {section === 1 ? (
                <div className="w-[26rem] fade-in-up">
                  <h1 className="text-3xl mb-4 text-center">
                    Clinic Informations :
                  </h1>
                  <div className="bg-white p-4 rounded-xl flex items-center gap-2 w-full border border-red text-red mb-2">
                    <BuildingOffice2Icon className="w-6" />
                    <p>Clinic : {clinicName}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl flex items-center gap-2 w-full border border-red text-red mb-2">
                    <MapPinIcon className="w-6" />
                    <p>{clinicAddress}</p>
                  </div>
                </div>
              ) : (
                <div className="w-[26rem] fade-in-up">
                  <h1 className="text-3xl mb-4 text-center">
                    Required Documents:
                  </h1>
                  <div className="hover:px-6 hover:bg-red hover:text-white cursor-pointer duration-300 bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-2">
                    Clinic Registration Document
                    <DocumentTextIcon className="w-6" />
                  </div>
                  <div className="hover:px-6 hover:bg-red hover:text-white cursor-pointer duration-300 bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-2">
                    Valid Medical Practitioner License
                    <DocumentTextIcon className="w-6" />
                  </div>
                  <div className="hover:px-6 hover:bg-red hover:text-white cursor-pointer duration-300 bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-2">
                    Clinic Address Proof
                    <DocumentTextIcon className="w-6" />
                  </div>
                  <div className="hover:px-6 hover:bg-red hover:text-white cursor-pointer duration-300 bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-2">
                    Authorization Letter
                    <DocumentTextIcon className="w-6" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </AppLayout>
  );
};

export default ClinicApplication;
