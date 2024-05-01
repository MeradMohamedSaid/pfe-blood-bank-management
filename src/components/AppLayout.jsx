import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";

export const AppLayout = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [role, setUserRole] = useState(-1);
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkLoggedIn = async () => {
      const data = await getUserRole();
      console.log(data.Role);
      setUserRole((old) => data.Role);
      if (data.Role === -1) {
        setLoggedIn((loggedin) => false);
        setIsLoading(false);
      } else {
        setLoggedIn((loggedin) => true);
        setIsLoading(false);
      }
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
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar loggedIn={loggedIn} role={role} />
          <div>{children}</div>
        </>
      )}
    </div>
  );
};
