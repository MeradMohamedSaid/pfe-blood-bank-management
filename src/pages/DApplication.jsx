import React, { useState, useEffect } from "react";
import { AppLayout } from "../components/AppLayout";
import UserNavbar from "../components/UserNavbar";
import axios from "axios";
import {
  PhoneIcon,
  UserCircleIcon,
  GlobeAltIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

import Loader from "../components/Loader";

const DonnorApplication = () => {
  const [section, setSection] = useState(1);
  // Data Grabbers
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userType, setUserType] = useState(null);
  const [bloodType, setBloodType] = useState("");
  const [sexualRelationType, setSexualRelationType] = useState(false);
  const [gotDiseases, setGotDiseases] = useState(false);
  const [id, setId] = useState(true); // Personal ID
  const [hpa, setHpa] = useState(null); // Hematological Phenotyping analysis
  const [stip, setStip] = useState(null); // Sexually Transmitted Infection Profile
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      const data = await userData();
      console.log(data);
      setUserName(data.userInfo.name);
      setUserPhoneNumber("(+213) 0 " + data.userInfo.phone);
      setUserGender(data.userInfo.sex === 0 ? "Male" : "Female");
      setBloodType(data.donorInfo.bloodType);
      setSexualRelationType(data.donorInfo.Relations === 1);
      setGotDiseases(data.donorInfo.diseases === 1);
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
      const response = await axios.get("http://localhost:3000/userinfo");
      if (response.status !== 200) {
        throw new Error("Failed to fetch user data");
      }

      const userData = response.data;
      console.log("User data:", userData);
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error.message);
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
                  Blood Related Informations
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
                  Personal Documents
                </p>
              </div>
              {section === 1 ? (
                <div className="w-[26rem] fade-in-up">
                  <h1 className="text-3xl mb-4 text-center">
                    Provided Informations :
                  </h1>
                  <div className="bg-white p-4 rounded-xl flex items-center gap-2 w-full border border-red text-red mb-2">
                    <UserCircleIcon className="w-6" />
                    <p>{userName}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl flex items-center gap-2 w-full border border-red text-red mb-2">
                    <PhoneIcon className="w-6" />
                    <p>{userPhoneNumber}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl flex items-center gap-2 w-full border border-red text-red mb-2">
                    <GlobeAltIcon className="w-6" />
                    <p>{userGender}</p>
                  </div>
                </div>
              ) : section === 2 ? (
                <div className="w-[27rem] fade-in-up">
                  <h1 className="text-3xl mb-4 text-center">
                    Blood Related Informations :
                  </h1>
                  <div className="bg-white p-4 rounded-xl flex items-center gap-2 w-full border border-red text-red mb-2">
                    <p>Blood Type : {bloodType}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl flex items-center gap-2 w-full border border-red text-red mb-2">
                    Sexual Relationships :{" "}
                    {sexualRelationType ? "Normal" : "Innormal"}
                  </div>
                  <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-2">
                    Have blood related diseases :
                    {/* <XMarkIcon className="w-6" /> */}
                    {gotDiseases ? " Yes" : " No"}
                  </div>
                </div>
              ) : (
                <div className="w-[26rem] fade-in-up">
                  <h1 className="text-3xl mb-4 text-center">
                    Required Documents:
                  </h1>
                  <div className="hover:px-6 hover:bg-red hover:text-white cursor-pointer duration-300 bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-2">
                    Personal ID
                    <DocumentTextIcon className="w-6" />
                  </div>
                  <div className="hover:px-6 hover:bg-red hover:text-white cursor-pointer duration-300 bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-2">
                    Hematological Phenotyping analysis
                    <DocumentTextIcon className="w-6" />
                  </div>
                  <div className="hover:px-6 hover:bg-red hover:text-white cursor-pointer duration-300 bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-2">
                    Sexually Transmitted Infection Profile
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

export default DonnorApplication;
