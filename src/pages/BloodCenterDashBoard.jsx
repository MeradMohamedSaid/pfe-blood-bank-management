import React, { useState } from "react";
import { AppLayout } from "../components/AppLayout";
import {
  CheckBadgeIcon,
  CheckIcon,
  ChevronDownIcon,
  PresentationChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import { Line, Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
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
} from "@heroicons/react/24/outline";

const BloodCenterDashBoard = () => {
  const [dashboard, setDashboard] = useState(1);
  const [timeFrame, setTimeFrame] = useState("Daily");
  const [tfO, setTfo] = useState(false); // timeframe dropdown option
  const [sideMenu, setSideMenu] = useState(1);
  const [bloodPacketSize, setBloodPacketSize] = useState(null);
  const [numOfPackets, setNumOfPackets] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [donor, setDonor] = useState();
  const [picker, setPicker] = useState("donors");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState("id"); // Default filter type is "id"
  const [donorDataModal, setDonorDataModal] = useState(false);
  const [section, setSection] = useState(1);
  const [requestStatus, setRequestStatus] = useState("none");
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
  // Charts Setup
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Tooltip
  );
  const options = {
    scales: {
      y: {
        suggestedMin: 0, // Set your minimum y-axis value
        suggestedMax: 50, // Set your maximum y-axis value
      },
    },
  };
  // blood data
  const DonationData = {
    labels: ["Week 13", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Requests",
        data: [12, 43, 27, 32],
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };
  const BloodRequestValidationData = {
    labels: ["Week 13", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Requests",
        data: [18, 21, 7, 32],
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };
  const BloodRequestData = {
    labels: ["Week 13", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Requests",
        data: [11, 11, 25, 37],
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };
  // donor and clinic data
  const DonorData = {
    labels: ["Week 13", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Requests",
        data: [18, 35, 27, 32],
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };
  const ClinicData = {
    labels: ["Week 13", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Requests",
        data: [18, 21, 7, 32],
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };
  const DnCRequestData = {
    labels: ["Week 13", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Requests",
        data: [41, 11, 25, 37],
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };
  const OverViewData = {
    labels: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    datasets: [
      {
        label: "Packets",
        data: [12, 17, 25, 28, 37, 18, 7, 2],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "#F0073B",
      },
    ],
  };
  // table logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sample data for the table
  const tableData = [
    {
      donor: { firstName: "John", lastName: "Doe" },
      bloodType: "O+",
      status: "fresh",
      packetSize: "250ml",
    },
    {
      donor: { firstName: "Jane", lastName: "Smith" },
      bloodType: "A-",
      status: "expired",
      packetSize: "500ml",
    },
    {
      donor: { firstName: "Alice", lastName: "Johnson" },
      bloodType: "AB+",
      status: "fresh",
      packetSize: "350ml",
    },
    // Add more donors as needed
  ];

  // Calculate the range of items to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, tableData.length);
  const currentItems = tableData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  // Filter items based on the selected filter type and search query
  const filteredItems = tableData.filter((item) => {
    if (!searchQuery) return true; // If search query is empty, don't apply search filter

    // Apply search filter based on the selected filter type
    switch (filterType) {
      case "id":
        return item.id.toString().includes(searchQuery);
      case "center":
        return item.center.toLowerCase().includes(searchQuery.toLowerCase());
      case "dateTime":
        return item.dateTime.includes(searchQuery);
      case "capacity":
        return item.capacity.toString().includes(searchQuery);
      default:
        return true; // Return true to include all items if filter type is unknown
    }
  });

  return (
    <div className="pb-10">
      <AppLayout>
        <div className="container">
          {/* Picker */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <p
              onClick={() => {
                setDashboard(1);
              }}
              className={
                dashboard === 1
                  ? "duration-300 bg-red text-white rounded-b-xl  p-2 text-center text-2xl font-bold cursor-pointer border border-red"
                  : "duration-300 bg-slate-200 text-slate-400 rounded-b-xl p-2 text-center text-2xl font-bold cursor-pointer border border-slate-300 hover:border-red hover:text-red"
              }
            >
              Blood Managment
            </p>
            <p
              onClick={() => {
                setDashboard(2);
              }}
              className={
                dashboard === 2
                  ? "duration-300 bg-red text-white rounded-b-xl p-2 text-center text-2xl font-bold cursor-pointer border border-red"
                  : "duration-300 bg-slate-200 text-slate-400 rounded-b-xl p-2 text-center text-2xl font-bold cursor-pointer border border-slate-300 hover:border-red hover:text-red"
              }
            >
              Request Managment
            </p>
          </div>
          {/* Blood Managment */}
          {dashboard === 1 ? (
            <div>
              {/* Overview */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl">Blood Managment Overview</h1>
                  <p className="text-md">
                    Overview reports of current blood stock
                  </p>
                </div>
                <div
                  onClick={() => {
                    setTfo(!tfO);
                  }}
                  className="p-2 w-40 relative border border-red text-red rounded-md flex justify-between gap-4 items-center cursor-pointer"
                >
                  <p className="font-bold">{timeFrame}</p>
                  <ChevronDownIcon className="w-4" />
                  {tfO ? (
                    <div className="duration-300 absolute top-12 left-0 rounded-md bg-white border border-red p-2 flex flex-col items-start justify-center gap-1 w-40">
                      <p
                        className="p-2 w-full hover:bg-red hover:text-white duration-300 text-sm border border-red rounded-md"
                        onClick={() => {
                          setTimeFrame("Daily");
                        }}
                      >
                        Daily
                      </p>
                      <p
                        className="p-2 w-full hover:bg-red hover:text-white duration-300 text-sm border border-red rounded-md"
                        onClick={() => {
                          setTimeFrame("Weekly");
                        }}
                      >
                        Weekly
                      </p>
                      <p
                        className="p-2 w-full hover:bg-red hover:text-white duration-300 text-sm border border-red rounded-md"
                        onClick={() => {
                          setTimeFrame("Bi-Weekly");
                        }}
                      >
                        Bi-Weekly
                      </p>
                      <p
                        className="p-2 w-full hover:bg-red hover:text-white duration-300 text-sm border border-red rounded-md"
                        onClick={() => {
                          setTimeFrame("Monthly");
                        }}
                      >
                        Monthly
                      </p>
                      <p
                        className="p-2 w-full hover:bg-red hover:text-white duration-300 text-sm border border-red rounded-md"
                        onClick={() => {
                          setTimeFrame("Yearly");
                        }}
                      >
                        Yearly
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {/* Dontations */}
                <div className="bg-white p-4 border border-red  rounded-md">
                  <div className=" flex justify-between items-center  ">
                    <h1>Donations</h1>
                    <div className="bg-red text-white  p-2 rounded-md">
                      <UserGroupIcon className="w-4" />
                    </div>
                  </div>
                  <div>
                    <Line data={DonationData} options={options} />
                  </div>
                </div>
                {/* Blood Requests */}
                <div className="bg-white p-4 border border-red  rounded-md">
                  <div className=" flex justify-between items-center  ">
                    <h1>Blood Request</h1>
                    <div className="bg-red text-white  p-2 rounded-md">
                      <PresentationChartBarIcon className="w-4" />
                    </div>
                  </div>
                  <div>
                    <Line data={BloodRequestData} options={options} />
                  </div>
                </div>
                {/* Requeest Validations */}
                <div className="bg-white p-4 border border-red  rounded-md">
                  <div className=" flex justify-between items-center  ">
                    <h1>Blood Request Validation</h1>
                    <div className="bg-red text-white  p-2 rounded-md">
                      <CheckIcon className="w-4" />
                    </div>
                  </div>
                  <div>
                    <Line data={BloodRequestValidationData} options={options} />
                  </div>
                </div>
              </div>
              <div className="my-4">
                <h1 className="text-3xl">Blood Stock</h1>
                <p className="text-md">View and manage blood packets stock</p>
              </div>
              {/* Stock Overview */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {/* side menu */}
                <div className="flex flex-col gap-2">
                  <div
                    onClick={() => {
                      setSideMenu(1);
                    }}
                    className={
                      sideMenu === 1
                        ? "bg-red p-2 rounded-md border border-red text-white flex gap-2 items-center duration-300 cursor-pointer hover:px-4"
                        : "bg-white p-2 rounded-md border border-red text-red flex gap-2 items-center duration-300 cursor-pointer hover:px-4"
                    }
                  >
                    <EyeIcon className="w-6" />
                    <p>OverView</p>
                  </div>
                  <div
                    onClick={() => {
                      setSideMenu(2);
                    }}
                    className={
                      sideMenu === 2
                        ? "bg-red p-2 rounded-md border border-red text-white flex gap-2 items-center duration-300 cursor-pointer hover:px-4"
                        : "bg-white p-2 rounded-md border border-red text-red flex gap-2 items-center duration-300 cursor-pointer hover:px-4"
                    }
                  >
                    <InformationCircleIcon className="w-6" />
                    <p>Detailed View</p>
                  </div>
                  <div
                    onClick={() => {
                      setSideMenu(3);
                    }}
                    className={
                      sideMenu === 3
                        ? "bg-red p-2 rounded-md border border-red text-white flex gap-2 items-center duration-300 cursor-pointer hover:px-4"
                        : "bg-white p-2 rounded-md border border-red text-red flex gap-2 items-center duration-300 cursor-pointer hover:px-4"
                    }
                  >
                    <FolderPlusIcon className="w-6" />
                    <p>Register New Pakcet</p>
                  </div>
                </div>
                {/* Side Menu Content */}
                <div className="col-span-2">
                  {sideMenu === 1 ? (
                    <div className="p-4 border border-red rounded-md bg-white">
                      <Bar data={OverViewData} />
                    </div>
                  ) : sideMenu === 2 ? (
                    <div className="">
                      {/* Render table */}
                      <div className="rounded-xl overflow-hidden border border-red mb-4">
                        <div className="grid grid-cols-4 bg-red text-white">
                          <p className="p-4 font-bold text-xl">Donor</p>
                          <p className="p-4 font-bold text-xl">Blood Type</p>
                          <p className="p-4 font-bold text-xl">Status</p>
                          <p className="p-4 font-bold text-xl">Packet Size</p>
                        </div>
                        {/* Render table rows */}
                        {/* Render table rows */}
                        {tableData
                          .slice(startIndex, endIndex)
                          .map((item, index) => (
                            <div
                              key={index}
                              className={`grid grid-cols-4 hover: ${
                                index % 2 === 0
                                  ? "bg-red-200"
                                  : "bg-transparent"
                              }`}
                            >
                              {item ? (
                                <>
                                  <p className="p-4">
                                    {item.donor.firstName +
                                      " " +
                                      item.donor.lastName}
                                  </p>
                                  <p className="p-4">{item.bloodType}</p>
                                  <p
                                    className={
                                      item.status === "expired"
                                        ? "p-4 text-red"
                                        : "p-4 text-green-500"
                                    }
                                  >
                                    {item.status}
                                  </p>
                                  <p className="p-4">{item.packetSize}</p>
                                </>
                              ) : (
                                <>
                                  {/* do not touch :p */}
                                  <p className="p-4">&nbsp;</p>
                                  <p className="p-4">&nbsp;</p>
                                  <p className="p-4">&nbsp;</p>
                                  <p className="p-4">&nbsp;</p>
                                </>
                              )}
                            </div>
                          ))}
                      </div>
                      {/* Render pager */}
                      <div className="flex justify-center items-center gap-4">
                        <button
                          className="p-2 border border-red rounded-xl flex justify-center items-center gap-1 text-red cursor-pointer hover:bg-red hover:text-white duration-300"
                          onClick={() => goToPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeftIcon className="w-6 h-6" />
                        </button>
                        <h1 className="text-red text-xl">
                          Page {currentPage} of {totalPages}
                        </h1>
                        <button
                          className="p-2 border border-red rounded-xl flex justify-center items-center gap-1 text-red cursor-pointer hover:bg-red hover:text-white duration-300"
                          onClick={() => goToPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          <ChevronRightIcon className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-red rounded-md p-4 bg-white  ">
                      <h1 className=" text-2xl  text-center  text-red">
                        Blood Packet Registration
                      </h1>
                      <p className="text-sm text-center mb-8">
                        Please , fill the informations related to the blood
                        packet.
                      </p>
                      {/* Donor Picker */}
                      <div className="my-4 flex justify-between items-center gap-2">
                        <div
                          onClick={() => {
                            setShowModal(!showModal);
                          }}
                          className="relative bg-white w-full py-2 px-4 rounded-full flex justify-between items-center text-red  text-opacity-50 border hover:border-red duration-300 cursor-pointer"
                        >
                          {donor == null ? <p>Pick a Donor</p> : <p>{donor}</p>}
                          <ChevronDownIcon class="h-6 w-6 " />
                          {showModal ? (
                            <div className="absolute top-12 overflow-y-auto h-40 w-full left-0 rounded-2xl text-sm bg-white border hover:border-red flex flex-col">
                              <p
                                onClick={() => {
                                  setDonor("Donor 1");
                                }}
                                className="py-2 px-4 hover:bg-red-50 duration-300"
                              >
                                Donor 1
                              </p>
                              <p
                                onClick={() => {
                                  setDonor("Donor 2");
                                }}
                                className="py-2 px-4 hover:bg-red-50 duration-300"
                              >
                                Donor 2
                              </p>
                              <p
                                onClick={() => {
                                  setDonor("Donor 3");
                                }}
                                className="py-2 px-4 hover:bg-red-50 duration-300"
                              >
                                Donor 3
                              </p>
                              <p
                                onClick={() => {
                                  setDonor("Donor 4");
                                }}
                                className="py-2 px-4 hover:bg-red-50 duration-300"
                              >
                                Donor 4
                              </p>
                              <p
                                onClick={() => {
                                  setDonor("Donor 5");
                                }}
                                className="py-2 px-4 hover:bg-red-50 duration-300"
                              >
                                Donor 5
                              </p>
                              <p
                                onClick={() => {
                                  setDonor("Donor 6");
                                }}
                                className="py-2 px-4 hover:bg-red-50 duration-300"
                              >
                                Donor 6
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="bg-slate-100 rounded-full my-8 w-1/2 mx-auto h-1"></div>
                      {/* Packet Size */}
                      <div className="my-4">
                        <h1 className="text-sm mb-4">Packet Size</h1>
                        <div className="grid grid-cols-3 gap-4">
                          <p
                            onClick={() => {
                              setBloodPacketSize("s");
                            }}
                            className={
                              bloodPacketSize === "s"
                                ? "flex justify-between items-center text-white bg-red p-4 border border-red rounded-md hover:px-8 duration-300 cursor-pointer hover:bg-red hover:text-white"
                                : "flex justify-between items-center text-red p-4 border border-red rounded-md hover:px-8 duration-300 cursor-pointer hover:bg-red hover:text-white"
                            }
                          >
                            Small 500CL
                            {bloodPacketSize === "s" ? (
                              <CheckIcon className="w-6" />
                            ) : null}
                          </p>
                          <p
                            onClick={() => {
                              setBloodPacketSize("m");
                            }}
                            className={
                              bloodPacketSize === "m"
                                ? "flex justify-between items-center text-white bg-red p-4 border border-red rounded-md hover:px-8 duration-300 cursor-pointer hover:bg-red hover:text-white"
                                : "flex justify-between items-center text-red p-4 border border-red rounded-md hover:px-8 duration-300 cursor-pointer hover:bg-red hover:text-white"
                            }
                          >
                            Medium 1L
                            {bloodPacketSize === "m" ? (
                              <CheckIcon className="w-6" />
                            ) : null}
                          </p>
                          <p
                            onClick={() => {
                              setBloodPacketSize("l");
                            }}
                            className={
                              bloodPacketSize === "l"
                                ? "flex justify-between items-center text-white bg-red p-4 border border-red rounded-md hover:px-8 duration-300 cursor-pointer hover:bg-red hover:text-white"
                                : "flex justify-between items-center text-red p-4 border border-red rounded-md hover:px-8 duration-300 cursor-pointer hover:bg-red hover:text-white"
                            }
                          >
                            Large 1.5L
                            {bloodPacketSize === "l" ? (
                              <CheckIcon className="w-6" />
                            ) : null}
                          </p>
                        </div>
                      </div>
                      <div className="bg-slate-100 rounded-full my-8 w-1/2 mx-auto h-1"></div>
                      {/* Number Of Packets */}
                      <div className="my-4">
                        <h1 className="text-sm mb-4">
                          Number of blood packets
                        </h1>
                        <div className="grid grid-cols-3 gap-4">
                          <p
                            onClick={() => {
                              setNumOfPackets("1");
                            }}
                            className={
                              numOfPackets === "1"
                                ? "flex justify-between items-center text-white bg-red p-4 border border-red rounded-md hover:px-8 duration-300 cursor-pointer hover:bg-red hover:text-white"
                                : "flex justify-between items-center text-red p-4 border border-red rounded-md hover:px-8 duration-300 cursor-pointer hover:bg-red hover:text-white"
                            }
                          >
                            1 Packet
                            {numOfPackets === "1" ? (
                              <CheckIcon className="w-6" />
                            ) : null}
                          </p>
                          <p
                            onClick={() => {
                              setNumOfPackets("2");
                            }}
                            className={
                              numOfPackets === "2"
                                ? "flex justify-between items-center text-white bg-red p-4 border border-red rounded-md hover:px-8 duration-300 cursor-pointer hover:bg-red hover:text-white"
                                : "flex justify-between items-center text-red p-4 border border-red rounded-md hover:px-8 duration-300 cursor-pointer hover:bg-red hover:text-white"
                            }
                          >
                            2 Packets
                            {numOfPackets === "2" ? (
                              <CheckIcon className="w-6" />
                            ) : null}
                          </p>
                          <p
                            onClick={() => {
                              setNumOfPackets("3");
                            }}
                            className={
                              numOfPackets === "3"
                                ? "flex justify-between items-center text-white bg-red p-4 border border-red rounded-md hover:px-8 duration-300 cursor-pointer hover:bg-red hover:text-white"
                                : "flex justify-between items-center text-red p-4 border border-red rounded-md hover:px-8 duration-300 cursor-pointer hover:bg-red hover:text-white"
                            }
                          >
                            3 Packets
                            {numOfPackets === "3" ? (
                              <CheckIcon className="w-6" />
                            ) : null}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <button className="bg-red p-4 rounded-md my-4 text-white w-1/3 ">
                          Save
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Overview */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl">
                    Donors and Clinics Requests Managment Overview
                  </h1>
                  <p className="text-md">
                    Overview reports of current Donors and Clinics Requests
                  </p>
                </div>
                <div
                  onClick={() => {
                    setTfo(!tfO);
                  }}
                  className="p-2 w-40 relative border border-red text-red rounded-md flex justify-between gap-4 items-center cursor-pointer"
                >
                  <p className="font-bold">{timeFrame}</p>
                  <ChevronDownIcon className="w-4" />
                  {tfO ? (
                    <div className="duration-300 absolute top-12 left-0 rounded-md bg-white border border-red p-2 flex flex-col items-start justify-center gap-1 w-40">
                      <p
                        className="p-2 w-full hover:bg-red hover:text-white duration-300 text-sm border border-red rounded-md"
                        onClick={() => {
                          setTimeFrame("Daily");
                        }}
                      >
                        Daily
                      </p>
                      <p
                        className="p-2 w-full hover:bg-red hover:text-white duration-300 text-sm border border-red rounded-md"
                        onClick={() => {
                          setTimeFrame("Weekly");
                        }}
                      >
                        Weekly
                      </p>
                      <p
                        className="p-2 w-full hover:bg-red hover:text-white duration-300 text-sm border border-red rounded-md"
                        onClick={() => {
                          setTimeFrame("Bi-Weekly");
                        }}
                      >
                        Bi-Weekly
                      </p>
                      <p
                        className="p-2 w-full hover:bg-red hover:text-white duration-300 text-sm border border-red rounded-md"
                        onClick={() => {
                          setTimeFrame("Monthly");
                        }}
                      >
                        Monthly
                      </p>
                      <p
                        className="p-2 w-full hover:bg-red hover:text-white duration-300 text-sm border border-red rounded-md"
                        onClick={() => {
                          setTimeFrame("Yearly");
                        }}
                      >
                        Yearly
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {/* Donor Requests */}
                <div className="bg-white p-4 border border-red  rounded-md">
                  <div className=" flex justify-between items-center  ">
                    <h1>Donors Requests</h1>
                    <div className="bg-red text-white  p-2 rounded-md">
                      <UserGroupIcon className="w-4" />
                    </div>
                  </div>
                  <div>
                    <Line data={DonorData} options={options} />
                  </div>
                </div>
                {/* Clinic Requests */}
                <div className="bg-white p-4 border border-red  rounded-md">
                  <div className=" flex justify-between items-center  ">
                    <h1>Clinics Request</h1>
                    <div className="bg-red text-white  p-2 rounded-md">
                      <PresentationChartBarIcon className="w-4" />
                    </div>
                  </div>
                  <div>
                    <Line data={ClinicData} options={options} />
                  </div>
                </div>
                {/* Validations */}
                <div className="bg-white p-4 border border-red  rounded-md">
                  <div className=" flex justify-between items-center  ">
                    <h1>Request Validation</h1>
                    <div className="bg-red text-white  p-2 rounded-md">
                      <CheckIcon className="w-4" />
                    </div>
                  </div>
                  <div>
                    <Line data={DnCRequestData} options={options} />
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <h1 className="text-3xl">Requests</h1>
                <p className="text-md">
                  View, Manage & Validate request submitted by Donors and
                  Clinics
                </p>
              </div>
              {/* Donor Clinic Picker */}
              <div className="grid grid-cols-2 w-1/3 mx-auto bg-white text-red rounded-md p-2 border border-red my-4">
                <p
                  onClick={() => {
                    setPicker("donors");
                  }}
                  className={
                    picker === "donors"
                      ? "px-4 py-2 text-center rounded-l border cursor-pointer duration-300 border-transparent text-white bg-red"
                      : "px-4 py-2 text-center rounded-l hover:border-red cursor-pointer border-transparent hover:bg-red hover:bg-opacity-30 hover:text-white duration-300 border"
                  }
                >
                  Donors
                </p>
                <p
                  onClick={() => {
                    setPicker("clinics");
                  }}
                  className={
                    picker === "clinics"
                      ? "px-4 py-2 text-center rounded-r border cursor-pointer duration-300 border-transparent text-white bg-red"
                      : "px-4 py-2 text-center rounded-r hover:border-red cursor-pointer border-transparent hover:bg-red hover:bg-opacity-30 hover:text-white duration-300 border"
                  }
                >
                  Clinics
                </p>
              </div>
              {picker === "donors" ? (
                <div className="">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="border border-red w-fit flex items-center justify-center gap-2 p-2 rounded-xl">
                      <MagnifyingGlassIcon className="w-6 h-6 text-red" />
                      <input
                        className="outline-none bg-transparent"
                        type="text"
                        placeholder="Search..."
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      onClick={() => {
                        setShowFilters(!showFilters);
                      }}
                      className="p-2 border border-red rounded-xl flex justify-center items-center gap-1 text-red cursor-pointer hover:bg-red hover:text-white duration-300"
                    >
                      <AdjustmentsHorizontalIcon className="w-6 h-6" />
                    </div>
                    {/* Type of filters */}
                    {showFilters ? (
                      <div className="flex justify-center items-center gap-1 fade-in">
                        <div
                          onClick={() => {
                            setFilterType("id");
                          }}
                          className={
                            filterType === "id"
                              ? "p-2 border border-red rounded-xl flex justify-center items-center gap-1 cursor-pointer bg-red text-white duration-300"
                              : "p-2 border border-gray-400 hover:border-red rounded-xl flex justify-center items-center gap-1 text-gray-400 cursor-pointer hover:bg-red hover:text-white duration-300"
                          }
                        >
                          <p className="">By Id</p>
                        </div>
                        <div
                          onClick={() => {
                            setFilterType("center");
                          }}
                          className={
                            filterType === "center"
                              ? "p-2 border border-red rounded-xl flex justify-center items-center gap-1 cursor-pointer bg-red text-white duration-300"
                              : "p-2 border border-gray-400 hover:border-red rounded-xl flex justify-center items-center gap-1 text-gray-400 cursor-pointer hover:bg-red hover:text-white duration-300"
                          }
                        >
                          <p>By Center</p>
                        </div>
                        <div
                          onClick={() => {
                            setFilterType("dateTime");
                          }}
                          className={
                            filterType === "dateTime"
                              ? "p-2 border border-red rounded-xl flex justify-center items-center gap-1 cursor-pointer bg-red text-white duration-300"
                              : "p-2 border border-gray-400 hover:border-red rounded-xl flex justify-center items-center gap-1 text-gray-400 cursor-pointer hover:bg-red hover:text-white duration-300"
                          }
                        >
                          <p>By Date</p>
                        </div>
                        <div
                          onClick={() => {
                            setFilterType("capacity");
                          }}
                          className={
                            filterType === "capacity"
                              ? "p-2 border border-red rounded-xl flex justify-center items-center gap-1 cursor-pointer bg-red text-white duration-300"
                              : "p-2 border border-gray-400 hover:border-red rounded-xl flex justify-center items-center gap-1 text-gray-400 cursor-pointer hover:bg-red hover:text-white duration-300"
                          }
                        >
                          <p>By Capacity</p>
                        </div>
                      </div>
                    ) : null}
                    <div className="p-2 border ml-auto border-red rounded-xl flex justify-center items-center gap-1 text-red cursor-pointer hover:bg-red hover:text-white duration-300">
                      <ArrowPathIcon className="w-6 h-6" />
                    </div>
                  </div>
                  {/* Render table */}
                  <div className="rounded-xl overflow-hidden border border-red mb-4">
                    <div className="grid grid-cols-5 bg-red text-white">
                      <p className="p-4 font-bold text-xl">Id</p>
                      <p className="p-4 font-bold text-xl">Name</p>
                      <p className="p-4 font-bold text-xl">Date & Time</p>
                      <p className="p-4 font-bold text-xl">Status</p>
                      <p className="p-4 font-bold text-xl">Application</p>
                    </div>
                    {/* Render table rows */}
                    {/* Render table rows */}
                    {tableData
                      .slice(startIndex, endIndex)
                      .map((item, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-5 hover: ${
                            index % 2 === 0 ? "bg-red-200" : "bg-transparent"
                          }`}
                        >
                          {item ? (
                            <>
                              <p className="p-4">
                                {item.donor.firstName +
                                  " " +
                                  item.donor.lastName}
                              </p>
                              <p className="p-4">{item.bloodType}</p>
                              <p
                                className={
                                  item.status === "expired"
                                    ? "p-4 text-red"
                                    : "p-4 text-green-500"
                                }
                              >
                                {item.status}
                              </p>
                              <p className="p-4">{item.packetSize}</p>
                              <div
                                onClick={() => {
                                  setDonorDataModal(true);
                                }}
                                className="flex justify-center items-center cursor-pointer"
                              >
                                <p className="bg-red tex-white rounded-md p-2 text-sm text-white flex justify-center items-center gap-2 hover:-translate-y-1 duration-300">
                                  View
                                  <ArrowUpOnSquareIcon className="w-4" />
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              {/* do not touch :p */}
                              <p className="p-4">&nbsp;</p>
                              <p className="p-4">&nbsp;</p>
                              <p className="p-4">&nbsp;</p>
                              <p className="p-4">&nbsp;</p>
                            </>
                          )}
                        </div>
                      ))}
                    {/* Donor Data Modal */}

                    <>
                      {donorDataModal ? (
                        <div className="bg-black bg-opacity-20 fixed w-[100vw] h-[100vh] top-0 right-0 z-10"></div>
                      ) : null}

                      <div
                        className={
                          donorDataModal
                            ? "bg-white p-8 rounded-l-md h-[100vh] border-l border-red w-fit left-auto right-0 fixed z-20 top-0 duration-300"
                            : "bg-white p-8 rounded-l-md h-[100vh] border-l border-red w-fit left-auto -right-[100vw] fixed z-20 top-0 duration-300"
                        }
                      >
                        <div
                          onClick={() => {
                            setDonorDataModal(false);
                          }}
                          className="absolute cursor-pointer right-4 bg-red text-white rounded-md p-1 top-4"
                        >
                          <XMarkIcon className="w-6" />
                        </div>
                        <div className="flex pt-40 items-center h-[80vh] flex-col gap-4">
                          <h1 className="text-4xl font-bold ">
                            Application Review
                          </h1>
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
                          <div className="absolute bottom-0 w-full">
                            <div className="px-8 py-4">
                              <p className="mt-auto mr-auto mb-2">
                                Application Status
                              </p>
                              <div className="grid grid-cols-2 gap-2 w-full">
                                <button
                                  onClick={() => {
                                    setRequestStatus("denied");
                                  }}
                                  className={
                                    requestStatus === "denied"
                                      ? "flex justify-between items-center border border-red text-white bg-red duration-300 p-4 rounded-md px-6"
                                      : "flex justify-between items-center border border-red text-red hover:text-white hover:bg-red duration-300 p-4 rounded-md px-6"
                                  }
                                >
                                  Request Denied <XMarkIcon className="w-6" />
                                </button>
                                <button
                                  onClick={() => {
                                    setRequestStatus("accepted");
                                  }}
                                  className={
                                    requestStatus === "accepted"
                                      ? "flex justify-between items-center border border-green-500 text-white hover:text-white bg-green-500 duration-300 p-4 rounded-md px-6"
                                      : "flex justify-between items-center border border-green-500 text-green-500 hover:text-white hover:bg-green-500 duration-300 p-4 rounded-md px-6"
                                  }
                                >
                                  Request Accepted
                                  <CheckIcon className="w-6" />
                                </button>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setDonorDataModal(false);
                              }}
                              className="flex justify-between items-center hover:bg-opacity-80 border-t flex items-center justify-center bg-red text-white border-red text-red w-full  duration-300 p-4 rounded-t rounded-bl-md px-6"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                  {/* Render pager */}
                  <div className="flex justify-center items-center gap-4">
                    <button
                      className="p-2 border border-red rounded-xl flex justify-center items-center gap-1 text-red cursor-pointer hover:bg-red hover:text-white duration-300"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-red text-xl">
                      Page {currentPage} of {totalPages}
                    </h1>
                    <button
                      className="p-2 border border-red rounded-xl flex justify-center items-center gap-1 text-red cursor-pointer hover:bg-red hover:text-white duration-300"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRightIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="border border-red w-fit flex items-center justify-center gap-2 p-2 rounded-xl">
                      <MagnifyingGlassIcon className="w-6 h-6 text-red" />
                      <input
                        className="outline-none bg-transparent"
                        type="text"
                        placeholder="Search..."
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      onClick={() => {
                        setShowFilters(!showFilters);
                      }}
                      className="p-2 border border-red rounded-xl flex justify-center items-center gap-1 text-red cursor-pointer hover:bg-red hover:text-white duration-300"
                    >
                      <AdjustmentsHorizontalIcon className="w-6 h-6" />
                    </div>
                    {/* Type of filters */}
                    {showFilters ? (
                      <div className="flex justify-center items-center gap-1 fade-in">
                        <div
                          onClick={() => {
                            setFilterType("id");
                          }}
                          className={
                            filterType === "id"
                              ? "p-2 border border-red rounded-xl flex justify-center items-center gap-1 cursor-pointer bg-red text-white duration-300"
                              : "p-2 border border-gray-400 hover:border-red rounded-xl flex justify-center items-center gap-1 text-gray-400 cursor-pointer hover:bg-red hover:text-white duration-300"
                          }
                        >
                          <p className="">By Id</p>
                        </div>
                        <div
                          onClick={() => {
                            setFilterType("center");
                          }}
                          className={
                            filterType === "center"
                              ? "p-2 border border-red rounded-xl flex justify-center items-center gap-1 cursor-pointer bg-red text-white duration-300"
                              : "p-2 border border-gray-400 hover:border-red rounded-xl flex justify-center items-center gap-1 text-gray-400 cursor-pointer hover:bg-red hover:text-white duration-300"
                          }
                        >
                          <p>By Center</p>
                        </div>
                        <div
                          onClick={() => {
                            setFilterType("dateTime");
                          }}
                          className={
                            filterType === "dateTime"
                              ? "p-2 border border-red rounded-xl flex justify-center items-center gap-1 cursor-pointer bg-red text-white duration-300"
                              : "p-2 border border-gray-400 hover:border-red rounded-xl flex justify-center items-center gap-1 text-gray-400 cursor-pointer hover:bg-red hover:text-white duration-300"
                          }
                        >
                          <p>By Date</p>
                        </div>
                        <div
                          onClick={() => {
                            setFilterType("capacity");
                          }}
                          className={
                            filterType === "capacity"
                              ? "p-2 border border-red rounded-xl flex justify-center items-center gap-1 cursor-pointer bg-red text-white duration-300"
                              : "p-2 border border-gray-400 hover:border-red rounded-xl flex justify-center items-center gap-1 text-gray-400 cursor-pointer hover:bg-red hover:text-white duration-300"
                          }
                        >
                          <p>By Capacity</p>
                        </div>
                      </div>
                    ) : null}
                    <div className="p-2 border ml-auto border-red rounded-xl flex justify-center items-center gap-1 text-red cursor-pointer hover:bg-red hover:text-white duration-300">
                      <ArrowPathIcon className="w-6 h-6" />
                    </div>
                  </div>
                  {/* Render table */}
                  <div className="rounded-xl overflow-hidden border border-red mb-4">
                    <div className="grid grid-cols-5 bg-red text-white">
                      <p className="p-4 font-bold text-xl">Id</p>
                      <p className="p-4 font-bold text-xl">Clinic Name</p>
                      <p className="p-4 font-bold text-xl">Date & Time</p>
                      <p className="p-4 font-bold text-xl">Status</p>
                      <p className="p-4 font-bold text-xl">Application</p>
                    </div>
                    {/* Render table rows */}
                    {/* Render table rows */}
                    {tableData
                      .slice(startIndex, endIndex)
                      .map((item, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-5 hover: ${
                            index % 2 === 0 ? "bg-red-200" : "bg-transparent"
                          }`}
                        >
                          {item ? (
                            <>
                              <p className="p-4">
                                {item.donor.firstName +
                                  " " +
                                  item.donor.lastName}
                              </p>
                              <p className="p-4">{item.bloodType}</p>
                              <p
                                className={
                                  item.status === "expired"
                                    ? "p-4 text-red"
                                    : "p-4 text-green-500"
                                }
                              >
                                {item.status}
                              </p>
                              <p className="p-4">{item.packetSize}</p>
                              <div
                                onClick={() => {
                                  setDonorDataModal(true);
                                }}
                                className="flex justify-center items-center cursor-pointer"
                              >
                                <p className="bg-red tex-white rounded-md p-2 text-sm text-white flex justify-center items-center gap-2 hover:-translate-y-1 duration-300">
                                  View
                                  <ArrowUpOnSquareIcon className="w-4" />
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              {/* do not touch :p */}
                              <p className="p-4">&nbsp;</p>
                              <p className="p-4">&nbsp;</p>
                              <p className="p-4">&nbsp;</p>
                              <p className="p-4">&nbsp;</p>
                            </>
                          )}
                        </div>
                      ))}
                    {/* Donor Data Modal */}

                    <>
                      {donorDataModal ? (
                        <div className="bg-black bg-opacity-20 fixed w-[100vw] h-[100vh] top-0 right-0 z-10"></div>
                      ) : null}

                      <div
                        className={
                          donorDataModal
                            ? "bg-white p-8 rounded-l-md h-[100vh] border-l border-red w-fit left-auto right-0 fixed z-20 top-0 duration-300"
                            : "bg-white p-8 rounded-l-md h-[100vh] border-l border-red w-fit left-auto -right-[100vw] fixed z-20 top-0 duration-300"
                        }
                      >
                        <div
                          onClick={() => {
                            setDonorDataModal(false);
                          }}
                          className="absolute cursor-pointer right-4 bg-red text-white rounded-md p-1 top-4"
                        >
                          <XMarkIcon className="w-6" />
                        </div>
                        <div className="flex pt-40 items-center h-[80vh] flex-col gap-4">
                          <h1 className="text-4xl font-bold ">
                            Application Review
                          </h1>
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
                              Donor Informations
                            </p>
                          </div>
                          {section === 1 ? (
                            <div className="w-[26rem] fade-in-up">
                              <h1 className="text-3xl mb-4 text-center">
                                Provided Informations :
                              </h1>
                              <div className="bg-white p-4 rounded-xl flex items-center gap-2 w-full border border-red text-red mb-2">
                                <BuildingOffice2Icon className="w-6" />
                                <p>louayekazar@gmail.com</p>
                              </div>
                              <div className="bg-white p-4 rounded-xl flex items-center gap-2 w-full border border-red text-red mb-2">
                                <MapPinIcon className="w-6" />
                                <p>0553686343</p>
                              </div>
                            </div>
                          ) : (
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
                          )}
                          <div className="absolute bottom-0 w-full">
                            <div className="px-8 py-4">
                              <p className="mt-auto mr-auto mb-2">
                                Application Status
                              </p>
                              <div className="grid grid-cols-2 gap-2 w-full">
                                <button
                                  onClick={() => {
                                    setRequestStatus("denied");
                                  }}
                                  className={
                                    requestStatus === "denied"
                                      ? "flex justify-between items-center border border-red text-white bg-red duration-300 p-4 rounded-md px-6"
                                      : "flex justify-between items-center border border-red text-red hover:text-white hover:bg-red duration-300 p-4 rounded-md px-6"
                                  }
                                >
                                  Request Denied <XMarkIcon className="w-6" />
                                </button>
                                <button
                                  onClick={() => {
                                    setRequestStatus("accepted");
                                  }}
                                  className={
                                    requestStatus === "accepted"
                                      ? "flex justify-between items-center border border-green-500 text-white hover:text-white bg-green-500 duration-300 p-4 rounded-md px-6"
                                      : "flex justify-between items-center border border-green-500 text-green-500 hover:text-white hover:bg-green-500 duration-300 p-4 rounded-md px-6"
                                  }
                                >
                                  Request Accepted
                                  <CheckIcon className="w-6" />
                                </button>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setDonorDataModal(false);
                              }}
                              className="flex justify-between items-center hover:bg-opacity-80 border-t flex items-center justify-center bg-red text-white border-red text-red w-full  duration-300 p-4 rounded-t rounded-bl-md px-6"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                  {/* Render pager */}
                  <div className="flex justify-center items-center gap-4">
                    <button
                      className="p-2 border border-red rounded-xl flex justify-center items-center gap-1 text-red cursor-pointer hover:bg-red hover:text-white duration-300"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-red text-xl">
                      Page {currentPage} of {totalPages}
                    </h1>
                    <button
                      className="p-2 border border-red rounded-xl flex justify-center items-center gap-1 text-red cursor-pointer hover:bg-red hover:text-white duration-300"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRightIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </AppLayout>
    </div>
  );
};

export default BloodCenterDashBoard;
