import React, { useEffect, useState } from "react";

import { AppLayout } from "../components/AppLayout";
import AdminNavbar from "../components/AdminNavbar";
import {
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import mediCareIllu from "../assets/medicare.png";
import cenIlly from "../assets/centersily.png";
import donorIlly from "../assets/donorsily.png";
import clinIlly from "../assets/clinicsily.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { resolve } from "chart.js/helpers";
import Loader from "../components/Loader";
const AdminDashboard = () => {
  const [stats, setStats] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const start = async () => {
      setLoading((old) => true);
      const stat = await fetchStats();
      console.log(stat);
      setStats(stat);
      await new Promise((resolve) => {
        setTimeout(() => {
          setLoading((old) => false);
        }, 500);
      });
    };
    start();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getDashInfo");
      return response.data;
    } catch (error) {
      console.error("Error fetching stats:", error);
      throw error;
    }
  };
  return (
    <>
      <div>
        <AppLayout />
        <AdminNavbar />
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="container fade-in-up">
              <h1 className="text-4xl mb-8">
                Welcome to <span className="text-red">LifeFlow</span> admin’s
                dashboard ,Here’s your overview.
              </h1>
              <div className="grid grid-cols-3 gap-4">
                {/* Blood Centers */}
                <div className="bg-white hover:border-red border rounded-xl p-4 cursor-default">
                  <div className="flex items-center gap-2 mb-4">
                    <BuildingOfficeIcon className="w-6 text-red" />
                    <div className="flex items-center w-full justify-between">
                      <h1 className="font-bold text-xl">Blood Centers</h1>
                      <p className="text-5xl">{stats.cencount}</p>
                    </div>
                  </div>

                  <div className="h-200 overflow-hiden">
                    <p className="text-black font-bold my-2 w-full text-center flex flex-col">
                      <span className="text-red text-4xl">Life Savers</span>
                    </p>
                    <div className="grid grid-cols-2">
                      <div>
                        <p className="text-xs">Validation Appointments</p>
                        <p className="text-xl text-red font-bold">
                          {stats.Valappo}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs ">Fresh Blood Packets</p>
                        <p className="text-xl text-red font-bold">
                          {stats.packetsCount}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <img src={cenIlly} alt="" />
                      </div>
                    </div>
                  </div>
                  <Link
                    className="bg-red mt-4 items-center justify-center flex text-center cursor-pointer rounded-lg text-white p-2"
                    to="/admin/centers-dashboard"
                  >
                    More Details
                  </Link>
                </div>

                {/* Users */}
                <div className="bg-white hover:border-red border rounded-xl p-4 cursor-default">
                  <div className="flex items-center gap-2 mb-4">
                    <UsersIcon className="w-6 text-red" />
                    <div className="flex items-center w-full justify-between">
                      <h1 className="font-bold text-xl">Users</h1>
                      <p className="text-5xl">{stats.allcount}</p>
                    </div>
                  </div>

                  <div className="h-200 overflow-hiden">
                    <p className="text-black font-bold my-2 w-full text-center flex flex-col">
                      <span className="text-red text-4xl min-h-15 w-full">
                        Message Servants
                      </span>
                    </p>
                    <div className="grid grid-cols-2">
                      <div>
                        <p className="text-xs">Verified Donors</p>
                        <p className="text-xl text-red font-bold">
                          {stats.validDonor}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs ">Donnations Appointments</p>
                        <p className="text-xl text-red font-bold">
                          {stats.Donappo}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <img src={donorIlly} alt="" />
                      </div>
                    </div>
                  </div>
                  <Link
                    className="bg-red mt-4 items-center justify-center flex text-center cursor-pointer rounded-lg text-white p-2"
                    to="/admin/users-dashboard"
                  >
                    More Details
                  </Link>
                </div>
                {/* Clinics */}
                <div className="bg-white hover:border-red border rounded-xl p-4 cursor-default">
                  <div className="flex items-center gap-2 mb-4">
                    <BuildingOffice2Icon className="w-6 text-red" />
                    <div className="flex items-center w-full justify-between">
                      <h1 className="font-bold text-xl">Clinics</h1>
                      <p className="text-5xl">{stats.clincount}</p>
                    </div>
                  </div>
                  <div className="h-200 overflow-hiden">
                    <p className="text-black font-bold my-2 w-full text-center flex flex-col">
                      <span className="text-red text-3xl w-full">
                        Contracts Signed
                      </span>
                    </p>
                    <div className="grid grid-cols-1">
                      <div className="flex items-center justify-center flex-col">
                        <p className="text-xl text-red font-bold">
                          <span className="text-black font-normal">with </span>
                          {stats.verifClinic}
                        </p>
                        <p className="text-xs">Partner Clinics</p>
                      </div>

                      <div className="col-span-2">
                        <img src={clinIlly} alt="" />
                      </div>
                    </div>
                  </div>
                  <Link
                    className="bg-red mt-4 items-center justify-center flex text-center cursor-pointer rounded-lg text-white p-2"
                    to="/admin/users-dashboard"
                  >
                    More Details
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
