import React from "react";
import { AppLayout } from "../components/AppLayout";
import reactjsLogo from "../assets/reactjs.png";
import viteLogo from "../assets/vite.png";
import mysqlLogo from "../assets/mysql.png";
import nodeLogo from "../assets/nodejs.png";
import expressLogo from "../assets/express.png";
import tailwindLogo from "../assets/tailwind.png";
const AboutUs = () => {
  return (
    <AppLayout>
      <div className="container h-[88vh] overflow-hidden w-full">
        <div className="h-[100%] overflow-y-scroll">
          <h1 className="text-4xl text-red mb-4 font-bold">About Us</h1>
          <p>
            Welcome to our Blood Bank Management System! This innovative web
            application is the culmination of a graduation project developed by
            a dedicated team of four computer science students from Mohamed
            Khider University - Biskra. We aim to streamline and enhance the
            efficiency of blood bank operations, ensuring timely and organized
            management of blood donations and requests.
          </p>
          <h1 className="text-2xl font-bold text-red mt-4 mb-2">Our Team:</h1>
          <p>
            <span className="font-bold text-red">Louaye Kazar:</span>{" "}
            Specializes in front-end development, ensuring a user-friendly and
            visually appealing interface for all users.
          </p>
          <p>
            <span className="font-bold text-red">Merad Said:</span> Focuses on
            UI design and connecting the front end with APIs, ensuring smooth
            and efficient data flow between the interface and backend services.
          </p>
          <p>
            <span className="font-bold text-red">Merad Malek:</span> Specializes
            in backend development and database design, responsible for creating
            a robust and secure server-side structure and managing data storage.
          </p>
          <p>
            <span className="font-bold text-red">Mezerdi Chaima:</span> Handles
            database design and brand design, ensuring data integrity and
            creating a cohesive and recognizable brand identity for our system.
          </p>
          <p className="mt-4">
            Together, we have combined our skills and expertise to develop a
            comprehensive solution that addresses the needs of blood banks,
            donors, and clinics, making blood donation processes more efficient
            and accessible.
          </p>
          <p>
            The project ensures a user-friendly experience with advanced
            security measures for data protection. Our web application is
            accessible through web browsers, making it easy for users to
            interact with the system from anywhere. The system's design and
            implementation focus on efficiency, security, and ease of use,
            providing a reliable platform for managing blood donations and
            requests.
          </p>
          <h1 className="text-2xl font-bold text-red mt-4 mb-2">
            Summary of the Project:
          </h1>
          <p>
            The Blood Bank Management System is designed to streamline the
            management and distribution of blood donations. It includes several
            key modules: admin, donor, clinics, and blood bank. This system aims
            to handle daily transactions, manage donor and clinic registrations,
            track blood packets, and process requests efficiently.
          </p>
          <h1 className="text-2xl font-bold text-red mt-4 mb-2">
            System Features:
          </h1>
          <p>
            <span className="font-bold text-red">Admin Module:</span> Manages
            the overall system, including user verification, blood packet
            inventory, and request validation.
          </p>
          <p>
            <span className="font-bold text-red">Donor Module:</span> Allows
            donors to register, schedule appointments, and track their donation
            history.
          </p>
          <p>
            <span className="font-bold text-red">Clinic Module:</span> Enables
            clinics to request blood packets, manage their profiles, and track
            blood stock.
          </p>
          <p>
            <span className="font-bold text-red">Blood Bank Module:</span>{" "}
            Manages blood packet inventory, validates donor and clinic requests,
            and oversees blood packet transactions.
          </p>
          <h1 className="text-2xl font-bold text-red mt-4 mb-2">
            Technologies Used:
          </h1>
          <div className="grid grid-cols-6 gap-4 mb-10">
            <a
              href="https://react.dev/"
              target="_blank"
              className="hover:p-4 p-8 duration-300 hover:bg-white border border-transparent hover:border-red rounded-lg"
            >
              <img src={reactjsLogo} alt="" />
            </a>
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              className="hover:p-4 p-8 duration-300 hover:bg-white border border-transparent hover:border-red rounded-lg"
            >
              <img src={tailwindLogo} alt="" />
            </a>
            <a
              href="https://www.mysql.com/fr/"
              target="_blank"
              className="hover:p-4 p-8 duration-300 hover:bg-white border border-transparent hover:border-red rounded-lg"
            >
              <img src={mysqlLogo} alt="" />
            </a>
            <a
              href="https://nodejs.org/en"
              target="_blank"
              className="hover:p-4 p-8 duration-300 hover:bg-white border border-transparent hover:border-red rounded-lg"
            >
              <img src={nodeLogo} alt="" />
            </a>
            <a
              href="https://expressjs.com/"
              target="_blank"
              className="hover:p-4 p-8 duration-300 hover:bg-white border border-transparent hover:border-red rounded-lg"
            >
              <img src={expressLogo} alt="" />
            </a>
            <a
              href="https://vitejs.dev/"
              target="_blank"
              className="hover:p-4 p-8 duration-300 hover:bg-white border border-transparent hover:border-red rounded-lg"
            >
              <img src={viteLogo} alt="" />
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AboutUs;
