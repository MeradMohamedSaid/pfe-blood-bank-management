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
  UserCircleIcon,
  GlobeAltIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import {
  CheckIcon,
  ChevronDownIcon,
  PresentationChartBarIcon,
  UserGroupIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import Loader from "./Loader";
import axios from "axios";

const CenterApplication = ({ role, id, setDonorDataModal, reload }) => {
  const [Loading, setIsLoading] = useState(false);
  const [dispData, setDispData] = useState({});
  ////////////////////////
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userGender, setUserGender] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [sexualRelationType, setSexualRelationType] = useState(false);
  const [gotDiseases, setGotDiseases] = useState(false);
  const [DSection, setDSection] = useState(1);
  const [docs, setDocs] = useState(2);

  const [section, setSection] = useState(1);
  const [clinicName, setClinicName] = useState("");
  const [clinicAddress, setClinicAddress] = useState();

  //////////////////////
  const [elig, setElig] = useState("");

  /////////////////////
  async function validateAndDeleteDonor(userId) {
    try {
      const response = await axios.put(
        `http://localhost:3000/validateAndDeleteDonor/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data);
        return { error: error.response.data, suc: false };
      } else if (error.request) {
        console.error("Error: No response received from server");
        return { error: "No response received from server", suc: false };
      } else {
        console.error("Error:", error.message);
        return { error: error.message, suc: false };
      }
    }
  }

  async function rejectAndDeleteDonor(userId) {
    try {
      const response = await axios.put(
        `http://localhost:3000/rejectAndDeleteDonor/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data);
        return { error: error.response.data, suc: false };
      } else if (error.request) {
        console.error("Error: No response received from server");
        return { error: "No response received from server", suc: false };
      } else {
        console.error("Error:", error.message);
        return { error: error.message, suc: false };
      }
    }
  }

  async function validateAndDeleteClinic(userId) {
    try {
      const response = await axios.put(
        `http://localhost:3000/validateAndDeleteClinic/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data);
        return { error: error.response.data, suc: false };
      } else if (error.request) {
        console.error("Error: No response received from server");
        return { error: "No response received from server", suc: false };
      } else {
        console.error("Error:", error.message);
        return { error: error.message, suc: false };
      }
    }
  }

  async function rejectAndDeleteClinic(userId) {
    try {
      const response = await axios.put(
        `http://localhost:3000/rejectAndDeleteClinic/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data);
        return { error: error.response.data, suc: false };
      } else if (error.request) {
        console.error("Error: No response received from server");
        return { error: "No response received from server", suc: false };
      } else {
        console.error("Error:", error.message);
        return { error: error.message, suc: false };
      }
    }
  }
  /////////////////////
  const handleValidateDonor = async () => {
    setIsLoading((odl) => true);
    const response = await validateAndDeleteDonor(id);
    if (response.suc) {
      setDonorDataModal(false);
      reload((od) => !od);
    }
  };

  const handleRejectDonor = async () => {
    setIsLoading((odl) => true);
    const response = await rejectAndDeleteDonor(id);
    if (response.suc) {
      setDonorDataModal(false);
      reload((od) => !od);
    }
  };

  const handleValidateClinic = async () => {
    setIsLoading((odl) => true);
    const response = await validateAndDeleteClinic(id);
    if (response.suc) {
      setDonorDataModal(false);
      reload((od) => !od);
    }
  };

  const handleRejectClinic = async () => {
    setIsLoading((odl) => true);
    const response = await rejectAndDeleteClinic(id);
    if (response.suc) {
      setDonorDataModal(false);
      reload((od) => !od);
    }
  };

  /////////////////
  async function ValidateDonorDocs(userId) {
    try {
      const response = await axios.put(
        `http://localhost:3000/validateDonorDocs/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data);
        return { error: error.response.data, suc: false };
      } else if (error.request) {
        console.error("Error: No response received from server");
        return { error: "No response received from server", suc: false };
      } else {
        console.error("Error:", error.message);
        return { error: error.message, suc: false };
      }
    }
  }

  async function ValidateClinicDocs(userId) {
    try {
      const response = await axios.put(
        `http://localhost:3000/validateClinicDocs/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data);
        return { error: error.response.data, suc: false };
      } else if (error.request) {
        console.error("Error: No response received from server");
        return { error: "No response received from server", suc: false };
      } else {
        console.error("Error:", error.message);
        return { error: error.message, suc: false };
      }
    }
  }
  /////////////////

  const handleValidateUserDocs = async () => {
    var response;
    if (role === 2) {
      response = await ValidateDonorDocs(id);
    } else {
      response = await ValidateClinicDocs(id);
    }
    if (response.suc) {
      firstFetch();
      reload((od) => !od);
    }
  };
  /////////////////////

  async function getDonorApplication(userId) {
    try {
      const response = await axios.get(
        `http://localhost:3000/donorApplication/${userId}`,
        {
          withCredentials: true,
        }
      );
      console.log("Donor Data:", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data);
        return { error: error.response.data };
      } else if (error.request) {
        console.error("Error: No response received from server");
        return { error: "No response received from server" };
      } else {
        console.error("Error:", error.message);
        return { error: error.message };
      }
    }
  }

  async function getClinicApplication(userId) {
    try {
      const response = await axios.get(
        `http://localhost:3000/clinicApplication/${userId}`,
        {
          withCredentials: true,
        }
      );
      console.log("Donor Data:", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data);
        return { error: error.response.data };
      } else if (error.request) {
        console.error("Error: No response received from server");
        return { error: "No response received from server" };
      } else {
        console.error("Error:", error.message);
        return { error: error.message };
      }
    }
  }

  ///////////////////////
  const firstFetch = async () => {
    setIsLoading((od) => true);
    var response = {};
    if (role === 2) {
      response = await getDonorApplication(id);
      setUserName(response.name);
      setUserPhoneNumber("(+213) 0 " + response.phone);
      setUserGender(response.sex === 0 ? "Male" : "Female");
      setBloodType(response.bloodType);
      setSexualRelationType(response.Relations === 1);
      setGotDiseases(response.diseases === 1);
      setDocs(response.docs);
    } else {
      response = await getClinicApplication(id);
      setClinicName(response.clinicname);
      setClinicAddress(response.clinicAddress);
      setDocs(response.docs);
    }
    setDispData((old) => response);
    new Promise((res) => {
      setTimeout(() => {
        setIsLoading((od) => false);
        res();
      }, 500);
    });
  };
  useEffect(() => {
    firstFetch();
  }, []);
  return (
    <>
      {Loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {role === 2 ? (
            <>
              <>
                <div className="container fade-in-up">
                  <div className="flex pt-40 items-center items-center h-[80vh] flex-col gap-4">
                    <h1 className="text-4xl font-bold ">
                      Donor Application Validation
                    </h1>
                    {/* Menu */}
                    <div
                      className={
                        docs === 2
                          ? "grid grid-cols-3 border-b border-gray-400 text-center mb-4"
                          : "grid grid-cols-4 border-b border-gray-400 text-center mb-4"
                      }
                    >
                      <p
                        onClick={() => {
                          setDSection(1);
                        }}
                        className={
                          DSection === 1
                            ? "py-2 px-6 hover:cursor-pointer text-red font-bold duration-300 border-b-2 border-red"
                            : "py-2 px-6 text-gray-300 hover:cursor-pointer hover:text-red duration-300 border-b-2 border-transparent hover:border-red"
                        }
                      >
                        Personal Informations
                      </p>
                      <p
                        onClick={() => {
                          setDSection(2);
                        }}
                        className={
                          DSection === 2
                            ? "py-2 px-6 hover:cursor-pointer text-red font-bold duration-300 border-b-2 border-red"
                            : "py-2 px-6 text-gray-300 hover:cursor-pointer hover:text-red duration-300 border-b-2 border-transparent hover:border-red"
                        }
                      >
                        Blood Related Informations
                      </p>
                      <p
                        onClick={() => {
                          setDSection(3);
                        }}
                        className={
                          DSection === 3
                            ? "py-2 px-6 hover:cursor-pointer text-red font-bold duration-300 border-b-2 border-red"
                            : "py-2 px-6 text-gray-300 hover:cursor-pointer hover:text-red duration-300 border-b-2 border-transparent hover:border-red"
                        }
                      >
                        Required Documents
                      </p>
                      {docs === 1 && (
                        <p
                          onClick={() => {
                            setDSection(4);
                          }}
                          className={
                            DSection === 4
                              ? "py-2 px-6 hover:cursor-pointer text-red font-bold duration-300 border-b-2 border-red"
                              : "py-2 px-6 text-gray-300 hover:cursor-pointer hover:text-red duration-300 border-b-2 border-transparent hover:border-red"
                          }
                        >
                          Validate
                        </p>
                      )}
                    </div>
                    {DSection === 1 ? (
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
                    ) : DSection === 2 ? (
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
                    ) : DSection === 3 ? (
                      <div className="w-[26rem] fade-in-up">
                        <h1 className="text-3xl mb-4 text-center">
                          Required Documents:
                        </h1>
                        <div className="hover:px-6 hover:bg-red hover:text-white cursor-pointer duration-300 bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-2">
                          <span>Personal ID</span>
                          {docs === 2 ? (
                            "Missing"
                          ) : (
                            <CheckBadgeIcon className="w-6" />
                          )}
                        </div>
                        <div className="hover:px-6 hover:bg-red hover:text-white cursor-pointer duration-300 bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-2">
                          <span>Hematological Phenotyping analysis</span>
                          {docs === 2 ? (
                            "Missing"
                          ) : (
                            <CheckBadgeIcon className="w-6" />
                          )}
                        </div>
                        <div className="hover:px-6 hover:bg-red hover:text-white cursor-pointer duration-300 bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-2">
                          <span>Sexually Transmitted Infection Profile</span>
                          {docs === 2 ? (
                            "Missing"
                          ) : (
                            <CheckBadgeIcon className="w-6" />
                          )}
                        </div>
                        {docs === 2 && (
                          <div
                            className="hover:bg-opacity-50 cursor-pointer duration-300 bg-red text-white p-4 rounded-xl flex justify-center items-center gap-2 mb-2 mt-8"
                            onClick={() => handleValidateUserDocs()}
                          >
                            <span>Click Here To Validate User Documents</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        {docs !== 2 && (
                          <div className="h-full flex flex-col items-center rounded-xl fade-in-up">
                            <h1 className="text-3xl mb-4 text-center border-b-2 pb-4 w-[60%] border-red">
                              Final Decision:
                            </h1>
                            <div className="w-full flex flex-col justify-center items-center px-10 text-black gap-4">
                              <h2 className="w-[70%] text-center">
                                Based on the provided informations, and after
                                verifying the validity of the documents
                                submitted by the user{" "}
                                <span className="font-bold text-red">
                                  "{userName}"
                                </span>{" "}
                                , this user is:
                              </h2>
                              <div className="flex gap-2 w-[40%]">
                                <button
                                  className={
                                    elig !== "no"
                                      ? "py-2 px-7 rounded-md text-red border border-red w-full hover:bg-red hover:text-white duration-300"
                                      : "py-2 px-7 rounded-md border border-red w-full bg-red text-white"
                                  }
                                  onClick={() => setElig("no")}
                                >
                                  Not eligible
                                </button>
                                <button
                                  className={
                                    elig !== "yes"
                                      ? "py-2 px-7 rounded-md text-[green] border border-[green] w-full hover:bg-[green] hover:text-white duration-300"
                                      : "py-2 px-7 rounded-md border border-[green] w-full bg-[green] text-white"
                                  }
                                  onClick={() => setElig("yes")}
                                >
                                  Eligible
                                </button>
                              </div>
                              <h2>to donate blood in our system.</h2>
                              <button
                                className={
                                  elig !== ""
                                    ? "w-[40%] bg-red py-4 rounded-md text-white"
                                    : "w-[40%] bg-red py-4 rounded-md text-white bg-opacity-60 cursor-not-allowed"
                                }
                                disabled={elig === ""}
                                onClick={
                                  elig === "yes"
                                    ? async () => {
                                        await handleValidateDonor();
                                      }
                                    : elig === "no"
                                    ? async () => {
                                        await handleRejectDonor();
                                      }
                                    : null
                                }
                              >
                                Cofirm
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            </>
          ) : (
            <>
              <>
                <div className="container">
                  <div className="flex pt-40 items-center h-[80vh] flex-col gap-4">
                    <h1 className="text-4xl font-bold ">
                      Clinic Application Validation
                    </h1>
                    {/* Menu */}
                    <div
                      className={
                        docs === 1
                          ? "grid grid-cols-3 border-b border-gray-400 text-center mb-4"
                          : "grid grid-cols-2 border-b border-gray-400 text-center mb-4"
                      }
                    >
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
                      {docs === 1 && (
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
                          Sign Contract
                        </p>
                      )}
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
                    ) : section === 2 ? (
                      <div className="w-[26rem] fade-in-up">
                        <h1 className="text-3xl mb-4 text-center">
                          Required Documents:
                        </h1>
                        <div className="hover:px-6 hover:bg-red hover:text-white cursor-pointer duration-300 bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-2">
                          <span>Clinic Registration Document</span>
                          {docs === 2 ? (
                            "Missing"
                          ) : (
                            <CheckBadgeIcon className="w-6" />
                          )}
                        </div>
                        <div className="hover:px-6 hover:bg-red hover:text-white cursor-pointer duration-300 bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-2">
                          <span>Valid Medical Practitioner License</span>
                          {docs === 2 ? (
                            "Missing"
                          ) : (
                            <CheckBadgeIcon className="w-6" />
                          )}
                        </div>
                        <div className="hover:px-6 hover:bg-red hover:text-white cursor-pointer duration-300 bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-2">
                          <span>Clinic Address Proof</span>
                          {docs === 2 ? (
                            "Missing"
                          ) : (
                            <CheckBadgeIcon className="w-6" />
                          )}
                        </div>
                        <div className="hover:px-6 hover:bg-red hover:text-white cursor-pointer duration-300 bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-2">
                          <span>Authorization Letter</span>
                          {docs === 2 ? (
                            "Missing"
                          ) : (
                            <CheckBadgeIcon className="w-6" />
                          )}
                        </div>
                        {docs === 2 && (
                          <div
                            className="hover:bg-opacity-50 cursor-pointer duration-300 bg-red text-white p-4 rounded-xl flex justify-center items-center gap-2 mb-2 mt-8"
                            onClick={() => handleValidateUserDocs()}
                          >
                            <span>Click Here To Validate User Documents</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        {docs !== 2 && (
                          <div className="h-full flex flex-col items-center rounded-xl fade-in-up">
                            <h1 className="text-3xl mb-4 text-center border-b-2 pb-4 w-[60%] border-red">
                              Final Decision:
                            </h1>
                            <div className="w-full flex flex-col justify-center items-center px-10 text-black gap-4">
                              <h2 className="w-[70%] text-center">
                                After thoroughly reviewing the provided
                                information and verifying the validity of the
                                documents submitted by the clinic representative
                                of{" "}
                                <span className="font-bold text-red">
                                  "{clinicName} Clinic"
                                </span>{" "}
                                , we have come to the decision that this clinic
                                is:
                              </h2>
                              <div className="flex gap-2 w-[40%]">
                                <button
                                  className={
                                    elig !== "no"
                                      ? "py-2 px-7 rounded-md text-red border border-red w-full hover:bg-red hover:text-white duration-300"
                                      : "py-2 px-7 rounded-md border border-red w-full bg-red text-white"
                                  }
                                  onClick={() => setElig("no")}
                                >
                                  Not eligible
                                </button>
                                <button
                                  className={
                                    elig !== "yes"
                                      ? "py-2 px-7 rounded-md text-[green] border border-[green] w-full hover:bg-[green] hover:text-white duration-300"
                                      : "py-2 px-7 rounded-md border border-[green] w-full bg-[green] text-white"
                                  }
                                  onClick={() => setElig("yes")}
                                >
                                  Eligible
                                </button>
                              </div>
                              <h2>
                                to become a partner clinic that can request and
                                receive blood packets from our storing centers.
                              </h2>
                              <button
                                className={
                                  elig !== ""
                                    ? "w-[40%] bg-red py-4 rounded-md text-white"
                                    : "w-[40%] bg-red py-4 rounded-md text-white bg-opacity-60 cursor-not-allowed"
                                }
                                disabled={elig === ""}
                                onClick={
                                  elig === "yes"
                                    ? async () => {
                                        await handleValidateClinic();
                                      }
                                    : elig === "no"
                                    ? async () => {
                                        await handleRejectClinic();
                                      }
                                    : null
                                }
                              >
                                Cofirm
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            </>
          )}
        </>
      )}
    </>
  );
};

export default CenterApplication;
