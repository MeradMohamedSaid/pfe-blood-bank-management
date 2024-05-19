import React, { useEffect } from "react";
import { AppLayout } from "../components/AppLayout";
import AdminNavbar from "../components/AdminNavbar";
import { useState } from "react";
import {
  DocumentArrowUpIcon,
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  UsersIcon,
  AdjustmentsHorizontalIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  ArrowsUpDownIcon,
  HeartIcon,
  ArrowLongDownIcon,
} from "@heroicons/react/24/outline";

import Loader from "../components/Loader";

import axios from "axios";
import { data } from "autoprefixer";

const AdminUsers = () => {
  const [isVerified, setIsVerified] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState("id"); // Default filter type is "id"
  const [searchQuery, setSearchQuery] = useState("");
  const [tableType, setTableType] = useState("all");
  // table logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    let data = users || [];
    var newData = [];
    switch (tableType) {
      case "donors":
        newData = data.filter((user) => user.role === 2);
        break;
      case "clinics":
        newData = data.filter((user) => user.role === 3);
        break;
      case "unverified":
        newData = data.filter((user) => !user.validated);
        break;
      default:
        newData = data;
        break;
    }
    setTableData((old) => newData);
    setCurrentDis((old) => newData);
  }, [tableType]);

  // Sample data for the table
  // {
  //   id: 1234,
  //   dateTime: "2024-03-31 09:00",
  //   center: "Center A",
  //   capacity: 50,
  // },
  const [tableData, setTableData] = useState([]);
  const [currentDis, setCurrentDis] = useState([]);

  useEffect(() => {
    const started = async () => {
      await handleFetchUsers();
    };
    started();
  }, []);

  const handleFetchUsers = async () => {
    setLoading((old) => true);
    const usersdata = await fetchUsers();
    console.table(usersdata);
    setUsers((old) => usersdata);
    setTableData((old) => usersdata);
    setCurrentDis((old) => usersdata);
    await new Promise(async (resolve) => {
      setTimeout(() => {
        setTableType("all");
        setLoading((old) => false);
        resolve();
      }, 500);
    });
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

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
    if (!searchQuery) return true;
    switch (filterType) {
      case "id":
        return item.id.toString().includes(searchQuery);
      case "name":
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
      case "email":
        return item.email.toLowerCase().includes(searchQuery.toLowerCase());
      default:
        return true;
    }
  });

  const [sort, setSort] = useState(0);

  // 1 - 2 dates // 3 - 4 name  // 5 - 6 role // 7-8 verification
  const setAfterSort = (n) => {
    let data = [...currentDis];
    switch (n) {
      case 1:
        data.sort((b, a) => {
          const dateA = a.registertime;
          const dateB = b.registertime;
          if (dateA < dateB) return 1;
          if (dateA > dateB) return -1;
          return 0;
        });
        break;
      case 2:
        data.sort((b, a) => {
          const dateA = a.registertime;
          const dateB = b.registertime;
          if (dateA < dateB) return -1;
          if (dateA > dateB) return 1;
          return 0;
        });
        break;
      case 3:
        data.sort((a, b) => {
          let nameA = a.name.toLowerCase();
          let nameB = b.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        break;
      case 4:
        data.sort((b, a) => {
          let nameA = a.name.toLowerCase();
          let nameB = b.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        break;
      case 5:
        const customSortOrder1 = {
          1: 0,
          4: 1,
          3: 2,
          2: 3,
        };
        data.sort(
          (a, b) => customSortOrder1[a.role] - customSortOrder1[b.role]
        );
        break;
      case 6:
        const customSortOrder2 = {
          1: 3,
          4: 2,
          3: 1,
          2: 0,
        };
        data.sort(
          (a, b) => customSortOrder2[a.role] - customSortOrder2[b.role]
        );
        break;

      case 7:
        data.sort((a, b) => {
          if (a.validated && !b.validated) {
            return -1;
          }
          if (!a.validated && b.validated) {
            return 1;
          }
          return 0;
        });
        break;
      case 8:
        data.sort((b, a) => {
          if (a.validated && !b.validated) {
            return -1;
          }
          if (!a.validated && b.validated) {
            return 1;
          }
          return 0;
        });
        break;
    }
    setTableData(data);
    console.log("table after reSort:", data);
  };
  const handleSortDate = () => {
    let n = sort;
    if (sort === 1) n = 2;
    else if (sort === 2) n = 0;
    else n = 1;
    setSort((old) => n);
    setAfterSort(n);
  };
  const handleSortName = () => {
    let n = sort;
    if (sort === 3) n = 4;
    else if (sort === 4) n = 0;
    else n = 3;
    setSort((old) => n);
    setAfterSort(n);
  };
  const handleSortRole = () => {
    let n = sort;
    if (sort === 5) n = 6;
    else if (sort === 6) n = 0;
    else n = 5;
    setSort((old) => n);
    setAfterSort(n);
  };
  const handleSortValidated = () => {
    let n = sort;
    if (sort === 7) n = 8;
    else if (sort === 8) n = 0;
    else n = 7;
    setSort((old) => n);
    setAfterSort(n);
  };

  const downloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(users[0])
        .map((key) => key)
        .join(",") +
      "\n" +
      users.map((item) => Object.values(item).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lifeflow_users.csv");
    document.body.appendChild(link);
    link.click();
  };
  return (
    <>
      <AppLayout>
        <AdminNavbar />
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="container fade-in-up">
              {/* Header */}
              <div className="flex mb-4 items-center h-fit justify-between mt-6">
                <div className="flex flex-col">
                  <h1 className="text-4xl font-bold">Life Flow Users</h1>
                </div>
                <div
                  className="flex cursor-pointer items-center justify-center rounded-lg bg-red text-white w-fit py-2 px-6"
                  onClick={downloadCSV}
                >
                  <p>Export as CSV</p>
                  <DocumentArrowUpIcon className="w-6" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {/* Users */}
                <div className="bg-white hover:border-red border rounded-xl p-4 cursor-default">
                  <div className="flex items-center gap-2 mb-4">
                    <UsersIcon className="w-6 text-red" />
                    <h1 className="font-bold text-xl">Users</h1>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-5xl">{users.length}</p>
                    <p className="bg-green-400 text-white rounded-full py-1 px-4 text-sm">
                      +
                      {(
                        (users.filter(
                          (user) =>
                            new Date(user.registertime) >
                            new Date() - 7 * 24 * 60 * 60 * 1000
                        ).length /
                          users.length) *
                        100
                      ).toFixed(2)}
                      %
                    </p>
                  </div>
                </div>
                {/* Donors */}
                <div className="bg-white hover:border-red border rounded-xl p-4 cursor-default">
                  <div className="flex items-center gap-2 mb-4">
                    <HeartIcon className="w-6 text-red" />
                    <h1 className="font-bold text-xl">Donors</h1>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-5xl">
                      {users.filter((user) => user.role === 2).length}
                    </p>
                    <p className="bg-green-400 text-white rounded-full py-1 px-4 text-sm">
                      +
                      {(
                        (users
                          .filter((user) => user.role === 2)
                          .filter(
                            (user) =>
                              new Date(user.registertime) >
                              new Date() - 7 * 24 * 60 * 60 * 1000
                          ).length /
                          users.filter((user) => user.role === 2).length) *
                        100
                      ).toFixed(2)}
                      %
                    </p>
                  </div>
                </div>
                {/* Clinics */}
                <div className="bg-white hover:border-red border rounded-xl p-4 cursor-default">
                  <div className="flex items-center gap-2 mb-4">
                    <BuildingOffice2Icon className="w-6 text-red" />
                    <h1 className="font-bold text-xl">Clinics</h1>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-5xl">
                      {users.filter((user) => user.role === 3).length}
                    </p>
                    <p className="bg-green-400 text-white rounded-full py-1 px-4 text-sm">
                      +
                      {(
                        (users
                          .filter((user) => user.role === 3)
                          .filter(
                            (user) =>
                              new Date(user.registertime) >
                              new Date() - 7 * 24 * 60 * 60 * 1000
                          ).length /
                          users.filter((user) => user.role === 3).length) *
                        100
                      ).toFixed(2)}
                      %
                    </p>
                  </div>
                </div>
              </div>
              {/* Filters */}
              <div className="flex mt-4 items-center gap-2 mb-4">
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
                        setFilterType("name");
                      }}
                      className={
                        filterType === "name"
                          ? "p-2 border border-red rounded-xl flex justify-center items-center gap-1 cursor-pointer bg-red text-white duration-300"
                          : "p-2 border border-gray-400 hover:border-red rounded-xl flex justify-center items-center gap-1 text-gray-400 cursor-pointer hover:bg-red hover:text-white duration-300"
                      }
                    >
                      <p>By Name</p>
                    </div>
                    <div
                      onClick={() => {
                        setFilterType("email");
                      }}
                      className={
                        filterType === "email"
                          ? "p-2 border border-red rounded-xl flex justify-center items-center gap-1 cursor-pointer bg-red text-white duration-300"
                          : "p-2 border border-gray-400 hover:border-red rounded-xl flex justify-center items-center gap-1 text-gray-400 cursor-pointer hover:bg-red hover:text-white duration-300"
                      }
                    >
                      <p>By email</p>
                    </div>
                  </div>
                ) : null}
                <div className="p-2 border ml-auto border-red rounded-xl flex justify-center items-center gap-1 text-red cursor-pointer hover:bg-red hover:text-white duration-300">
                  <ArrowPathIcon className="w-6 h-6" />
                </div>
              </div>
              {/* pick table */}
              <div className="grid grid-cols-4 mb-2 border-b overflow-hidden">
                <div
                  onClick={() => {
                    setTableType("all");
                  }}
                  className={
                    tableType === "all"
                      ? "p-2 flex items-center justify-between cursor-pointer border-b-4 border-red"
                      : "p-2 flex items-center justify-between cursor-pointer border-b-4 border-transparent "
                  }
                >
                  <div>
                    <p className="text-2xl">All Users</p>
                    <p className="text-sm text-gray-400">Browse All Users</p>
                  </div>
                  {tableType === "all" ? (
                    <p className="text-sm bg-red py-1 px-4 rounded-full text-white font-bold">
                      {tableData.length}
                    </p>
                  ) : null}
                </div>
                <div
                  onClick={() => {
                    setTableType("donors");
                  }}
                  className={
                    tableType === "donors"
                      ? "p-2 flex items-center justify-between cursor-pointer border-b-4 border-red"
                      : "p-2 flex items-center justify-between cursor-pointer border-b-4 border-transparent "
                  }
                >
                  <div>
                    <p className="text-2xl">Donors</p>
                    <p className="text-sm text-gray-400">Registred Donors</p>
                  </div>
                  {tableType === "donors" ? (
                    <p className="text-sm bg-red py-1 px-4 rounded-full text-white font-bold">
                      {tableData.length}
                    </p>
                  ) : null}
                </div>
                <div
                  onClick={() => {
                    setTableType("clinics");
                  }}
                  className={
                    tableType === "clinics"
                      ? "p-2 flex items-center justify-between cursor-pointer border-b-4 border-red"
                      : "p-2 flex items-center justify-between cursor-pointer border-b-4 border-transparent "
                  }
                >
                  <div>
                    <p className="text-2xl">Clinics</p>
                    <p className="text-sm text-gray-400">Verified Clinics</p>
                  </div>
                  {tableType === "clinics" ? (
                    <p className="text-sm bg-red py-1 px-4 rounded-full text-white font-bold">
                      {tableData.length}
                    </p>
                  ) : null}
                </div>
                <div
                  onClick={() => {
                    setTableType("unverified");
                  }}
                  className={
                    tableType === "unverified"
                      ? "p-2 flex items-center justify-between cursor-pointer border-b-4 border-red"
                      : "p-2 flex items-center justify-between cursor-pointer border-b-4 border-transparent "
                  }
                >
                  <div>
                    <p className="text-2xl">Unverified Users</p>
                    <p className="text-sm text-gray-400">
                      Browse All Unverified Users
                    </p>
                  </div>
                  {tableType === "unverified" ? (
                    <p className="text-sm bg-red py-1 px-4 rounded-full text-white font-bold">
                      {tableData.length}
                    </p>
                  ) : null}
                </div>
              </div>
              {/* Render table */}
              <div className="rounded-xl overflow-hidden border border-[#d9d9d9] border-2 border-b-0 mb-4">
                <div className="grid grid-cols-4 bg-[#d9d9d9] text-black select-none">
                  <p
                    onClick={() => handleSortName()}
                    className="p-1 px-4  font-bold flex items-center justify-between gap-2 hover:bg-[#cdcdcd] duration-300 cursor-pointer"
                  >
                    <span>Name</span>{" "}
                    {sort === 3 || sort === 4 ? (
                      <ArrowLongDownIcon
                        className={sort === 3 ? "size-4" : "size-4 rotate-180"}
                      />
                    ) : (
                      <ArrowsUpDownIcon className="size-4" />
                    )}
                  </p>
                  <p
                    onClick={() => handleSortRole()}
                    className="p-1 px-4  font-bold flex items-center justify-between gap-2 hover:bg-[#cdcdcd] duration-300 cursor-pointer"
                  >
                    <span>Role</span>{" "}
                    {sort === 5 || sort === 6 ? (
                      <ArrowLongDownIcon
                        className={sort === 5 ? "size-4" : "size-4 rotate-180"}
                      />
                    ) : (
                      <ArrowsUpDownIcon className="size-4" />
                    )}
                  </p>
                  <p
                    onClick={() => handleSortValidated()}
                    className="p-1 px-4  font-bold flex items-center justify-between gap-2 hover:bg-[#cdcdcd] duration-300 cursor-pointer"
                  >
                    <span>Status</span>{" "}
                    {sort === 7 || sort === 8 ? (
                      <ArrowLongDownIcon
                        className={sort === 7 ? "size-4" : "size-4 rotate-180"}
                      />
                    ) : (
                      <ArrowsUpDownIcon className="size-4" />
                    )}
                  </p>
                  <p
                    onClick={() => handleSortDate()}
                    className="p-1 px-4 font-bold flex items-center justify-between gap-2 hover:bg-[#cdcdcd] duration-300 cursor-pointer"
                  >
                    <span>Registration date</span>{" "}
                    {sort === 1 || sort === 2 ? (
                      <ArrowLongDownIcon
                        className={sort === 1 ? "size-4" : "size-4 rotate-180"}
                      />
                    ) : (
                      <ArrowsUpDownIcon className="size-4" />
                    )}
                  </p>
                </div>
                {/* Render table rows */}
                {/* Render table rows */}
                {filteredItems
                  .slice(startIndex, endIndex)
                  .map((item, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-4 hover:bg-[#ffe4ea] cursor-pointer border-b-2 border-[#d9d9d9]`}
                    >
                      {item ? (
                        <>
                          <p className="p-4 flex flex flex-col items-start justify-center">
                            <span
                              className="text-bloder"
                              style={{ fontWeight: 600 }}
                            >
                              {item.name}
                            </span>
                            <span className="text-l text-gray-400">
                              {item.email}
                            </span>
                          </p>
                          <div className="w-full p-4 text-white font-bold  flex flex-col items-start justify-center">
                            <div className="w-[50%] py-2 bg-red text-center rounded-md">
                              {item.role === 1 && "Admin"}
                              {item.role === 2 && "Donor"}
                              {item.role === 3 && "Clinic"}
                              {item.role === 4 && "Blood Center"}
                            </div>
                          </div>
                          <p className="p-4 font-bold flex flex-col items-start justify-center">
                            <span>
                              {item.validated ? "Verified" : "Not Verified"}
                            </span>
                          </p>
                          <p className="p-4 flex font-bold flex-col items-start justify-center">
                            <span>{item.registertime.slice(0, 10)}</span>
                          </p>
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
                {filteredItems.length === 0 && (
                  <div className="grid grid-cols-1 p-4 text-center border-b-2">
                    <h2>Nothing To display</h2>
                  </div>
                )}
              </div>
              {/* Render pager */}
              {totalPages > 0 && (
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
              )}
            </div>
          </>
        )}
      </AppLayout>
    </>
  );
};

export default AdminUsers;
