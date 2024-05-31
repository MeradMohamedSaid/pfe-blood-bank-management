import React, { useEffect, useState } from "react";
import { AppLayout } from "../components/AppLayout";
import {
  CheckBadgeIcon,
  CheckIcon,
  ChevronDownIcon,
  PresentationChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Loader from "../components/Loader";
import { Line, Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

import axios from "axios";
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
import CenterAppointments from "../components/CenterAppointments";
import AppoTable from "../components/AppointmentTable";
import CenterApplication from "../components/CenterApplication";
import BloodRequests from "../components/BloodRequests";
import PacketsRequest from "../components/PacketsRequest";
import { use } from "i18next";
const BloodCenterDashBoard = () => {
  const [dashboard, setDashboard] = useState(1);
  const [timeFrame, setTimeFrame] = useState("Daily");
  const [tfO, setTfo] = useState(false); // timeframe dropdown option
  const [sideMenu, setSideMenu] = useState(1);
  const [bloodPacketSize, setBloodPacketSize] = useState(null);
  const [numOfPackets, setNumOfPackets] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [donor, setDonor] = useState();
  const [picker, setPicker] = useState("Packets");
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
  const navigate = useNavigate();
  const [triggerReload, setTriggerReload] = useState(false);
  /////////////////////////////////////////////////////////
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null); // Take the id from this
  const [searchTerm, setSearchTerm] = useState("");
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [isLoading, setIsLoading] = useState(false);
  const [userToModal, setUserToModal] = useState();
  const [toDisp, setToDisp] = useState();
  const handleModal = (idc, role) => {
    console.log(idc, role);
    setUserToModal((odl) => idc);
    setDonorDataModal((old) => true);
    setToDisp((oo) => role);
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [showPackets, setShowPackets] = useState(false);
  const [packetId, setPacketId] = useState();
  const handlePacketRequest = (id) => {
    setShowPackets((old) => true);
    setPacketId((old) => id);
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

  const [overViewData, setOverViewData] = useState({
    labels: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    datasets: [
      {
        label: "Packets",
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "#F0073B",
      },
    ],
  });
  // table logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sample data for the table
  const [tableData, setTableData] = useState([]);
  const [bloodGet, setBloodGet] = useState(false);

  const fetchBloodPackets = async () => {
    axios
      .get("http://localhost:3000/storingCentreBloodPacketsCenter")
      .then((response) => {
        console.log("Blood info", response.data);
        const bloodPackets = response.data.bloodPackets;
        const bloodTypeCounts = response.data.bloodTypeCounts;
        const today = new Date();

        // Update the chart data
        const newData = [
          bloodTypeCounts["A+"] || 0,
          bloodTypeCounts["A-"] || 0,
          bloodTypeCounts["B+"] || 0,
          bloodTypeCounts["B-"] || 0,
          bloodTypeCounts["AB+"] || 0,
          bloodTypeCounts["AB-"] || 0,
          bloodTypeCounts["O+"] || 0,
          bloodTypeCounts["O-"] || 0,
        ];

        setOverViewData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: newData,
            },
          ],
        }));

        // Update the table data
        const newTableData = bloodPackets.map((packet) => {
          const expDate = new Date(packet.expDate);
          const status =
            packet.assigned === 1
              ? "not available"
              : expDate < today
              ? "expired"
              : "fresh";
          return {
            donor: {
              firstName: packet.name.split(" ")[0],
              lastName: packet.name.split(" ")[1] || "",
            },
            bloodType: packet.bloodType,
            status: status,
            packetSize: `${packet.packetSize}ml`,
            id: packet.id,
          };
        });

        setTableData(newTableData);
      })
      .catch((error) => {
        console.error("Error fetching blood packets data:", error);
      });
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      setIsLoading((old) => true);
      const data = await getUserRole();
      if (data.Role !== 4) {
        navigate("/");
      }
      setIsLoading((old) => false);
      await fetchBloodPackets();
      setBloodGet((old) => true);
      await new Promise((res) => {
        setTimeout(() => {
          setIsLoading((old) => false);
        }, 400);
      });
    };
    checkLoggedIn();
  }, []);

  const getUserRole = async () => {
    try {
      const response = await axios.get("http://localhost:3000/userRole", {
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

  const handleAddPocket = async () => {
    let size;
    switch (bloodPacketSize) {
      case "s":
        size = 500;
        break;
      case "m":
        size = 1000;
        break;
      case "l":
        size = 1500;
        break;
      default:
        console.log("Invalid pocket size.");
        return;
    }
    try {
      const response = await axios.post("http://localhost:3000/addPocket", {
        pocketSize: size,
        pocketsNumber: numOfPackets,
        donorId: selectedDonor.id,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error adding pockets:", error);
    }
  };

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/getDonorsCenter"
        );
        if (!Array.isArray(response.data)) {
          throw new Error("Expected an array of donors");
        }
        console.log("Donors response", response.data);
        setDonors(response.data);
        setFilteredDonors(response.data);
      } catch (error) {
        console.error("Error fetching donor data:", error.message);
      }
    };

    fetchDonors();
  }, []);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm === "") {
      setFilteredDonors(donors);
    } else {
      const filtered = donors.filter((donor) =>
        donor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDonors(filtered);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".donor-picker") === null) {
        setIsModalVisible(false);
      }
    };

    if (isModalVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalVisible]);

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

  return (
    <AppLayout>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="bg-red-50 h-[120vh] bodybg">
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
                        <Line
                          data={BloodRequestValidationData}
                          options={options}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="my-4">
                    <h1 className="text-3xl">Blood Stock</h1>
                    <p className="text-md">
                      View and manage blood packets stock
                    </p>
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
                          {bloodGet ? (
                            <>
                              <Bar data={overViewData} />
                            </>
                          ) : (
                            <Loader />
                          )}
                        </div>
                      ) : sideMenu === 2 ? (
                        <div className="">
                          {/* Render table */}
                          <div className="rounded-xl overflow-hidden border border-red mb-4">
                            <div className="grid grid-cols-5 bg-red text-white">
                              <p className="p-4 font-bold text-xl">id</p>
                              <p className="p-4 font-bold text-xl">Donor</p>
                              <p className="p-4 font-bold text-xl">
                                Blood Type
                              </p>
                              <p className="p-4 font-bold text-xl">Status</p>
                              <p className="p-4 font-bold text-xl">
                                Packet Size
                              </p>
                            </div>
                            {/* Render table rows */}
                            {/* Render table rows */}
                            {tableData
                              .slice(startIndex, endIndex)
                              .map((item, index) => (
                                <div
                                  key={index}
                                  className={`grid grid-cols-5 hover: ${
                                    index % 2 === 0
                                      ? "bg-red-200"
                                      : "bg-transparent"
                                  }`}
                                >
                                  {item ? (
                                    <>
                                      <p className="p-4">{item.id}</p>
                                      <p className="p-4 text-l">
                                        {item.donor.firstName +
                                          " " +
                                          item.donor.lastName}
                                      </p>
                                      <p className="p-4">{item.bloodType}</p>
                                      <p
                                        className={
                                          item.status === "fresh"
                                            ? "p-4 text-green-500"
                                            : "p-4 text-red"
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
                          <div className="my-4 flex justify-between items-center gap-2 donor-picker">
                            <div
                              onClick={() => setIsModalVisible(!isModalVisible)}
                              className="relative bg-white w-full py-2 px-4 rounded-md flex justify-between items-center text-red text-opacity-50 border hover:border-red duration-300 cursor-pointer"
                            >
                              {selectedDonor == null ? (
                                <input
                                  className="outline-none w-full"
                                  type="text"
                                  placeholder="Select a Donor"
                                  value={searchTerm}
                                  onChange={handleSearchChange}
                                  onFocus={() => setIsModalVisible(true)}
                                />
                              ) : (
                                <div>
                                  <p className="font-bold text-black">
                                    {selectedDonor.name}
                                  </p>
                                </div>
                              )}
                              <MagnifyingGlassIcon className="h-6 w-6" />
                              {isModalVisible &&
                                Array.isArray(filteredDonors) && (
                                  <div className="absolute top-12 max-h-120 w-full left-0 rounded-md text-sm bg-white border hover:border-red flex flex-col overflow-y-auto z-10">
                                    {filteredDonors.map((donor, index) => (
                                      <div
                                        key={index}
                                        onClick={() => {
                                          setSelectedDonor(donor);
                                          setIsModalVisible(false);
                                        }}
                                        className="py-2 px-4 h-20 hover:bg-red-50 duration-300 cursor-pointer"
                                      >
                                        <p className="font-bold text-black">
                                          User: {donor.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          email :{donor.email}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          {" "}
                                          Phone :{donor.phone}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                )}
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
                            <button
                              className="bg-red p-4 rounded-md my-4 text-white w-1/3 "
                              onClick={handleAddPocket}
                            >
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
                  <div className="grid grid-cols-4 w-1/2 mx-auto bg-white text-red rounded-md p-2 border border-red my-4">
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
                          ? "px-4 py-2 text-center  border cursor-pointer duration-300 border-transparent text-white bg-red"
                          : "px-4 py-2 text-center  hover:border-red cursor-pointer border-transparent hover:bg-red hover:bg-opacity-30 hover:text-white duration-300 border"
                      }
                    >
                      Clinics
                    </p>
                    <p
                      onClick={() => {
                        setPicker("Packets");
                      }}
                      className={
                        picker === "Packets"
                          ? "px-4 py-2 text-center  border cursor-pointer duration-300 border-transparent text-white bg-red"
                          : "px-4 py-2 text-center hover:border-red cursor-pointer border-transparent hover:bg-red hover:bg-opacity-30 hover:text-white duration-300 border"
                      }
                    >
                      Packets
                    </p>
                    <p
                      onClick={() => {
                        setPicker("Appointments");
                      }}
                      className={
                        picker === "Appointments"
                          ? "px-4 py-2 text-center rounded-r border cursor-pointer duration-300 border-transparent text-white bg-red"
                          : "px-4 py-2 text-center rounded-r hover:border-red cursor-pointer border-transparent hover:bg-red hover:bg-opacity-30 hover:text-white duration-300 border"
                      }
                    >
                      Donations
                    </p>
                  </div>
                  {picker === "clinics" && (
                    <>
                      <AppoTable
                        clinicOrDonor={1}
                        handleModal={handleModal}
                        itemsPerPage={itemsPerPage}
                        reload={triggerReload}
                      />
                    </>
                  )}
                  {picker === "donors" && (
                    <>
                      <AppoTable
                        clinicOrDonor={2}
                        handleModal={handleModal}
                        itemsPerPage={itemsPerPage}
                        reload={triggerReload}
                      />
                    </>
                  )}

                  {picker === "Packets" && (
                    <>
                      {/* <AppoTable
                        clinicOrDonor={1}
                        setShowFilters={setShowFilters}
                        showFilters={showFilters}
                        // tableData={tableData}
                        donorDataModal={donorDataModal}
                        section={section}
                        requestStatus={requestStatus}
                        itemsPerPage={itemsPerPage}
                      /> */}
                      <BloodRequests
                        handlePacketRequest={handlePacketRequest}
                      />
                    </>
                  )}
                  {picker === "Appointments" && (
                    <>
                      {/* <AppoTable
                        clinicOrDonor={1}
                        setShowFilters={setShowFilters}
                        showFilters={showFilters}
                        // tableData={tableData}
                        donorDataModal={donorDataModal}
                        section={section}
                        requestStatus={requestStatus}
                        itemsPerPage={itemsPerPage}
                      /> */}
                      <CenterAppointments />
                    </>
                  )}
                  <>
                    {donorDataModal ? (
                      <div className="bg-black bg-opacity-20 fixed w-[100vw] h-[100vh] top-0 right-0 z-10 flex justify-end items-center fade-in-right-to-left">
                        <div className="h-[100vh] w-[60%] bg-white ">
                          <div
                            onClick={() => {
                              setDonorDataModal(false);
                            }}
                            className="absolute cursor-pointer right-4 bg-red text-white rounded-md p-1 top-4"
                          >
                            <XMarkIcon className="w-6" />
                          </div>
                          <div className="w-[100%] h-[100%] p-4 flex flex-col justify-center items-center ">
                            <CenterApplication
                              role={toDisp}
                              id={userToModal}
                              setDonorDataModal={setDonorDataModal}
                              reload={setTriggerReload}
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {showPackets && (
        <PacketsRequest
          close={() => {
            setShowPackets(false);
          }}
          id={packetId}
        />
      )}
    </AppLayout>
  );
};

export default BloodCenterDashBoard;
