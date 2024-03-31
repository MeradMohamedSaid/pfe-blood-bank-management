import React from "react";
import { AppLayout } from "../components/AppLayout";
import UserNavbar from "../components/UserNavbar";
import { useState } from "react";
import AppNotice from "../components/AppNotice";
const DonorHistory = () => {
  const [isVerified, setIsVerified] = useState(false);
  return (
    <AppLayout>
      <UserNavbar />
      <div className="container">
        {!isVerified ? (
          <AppNotice />
        ) : (
          <div>
            <p>User History</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default DonorHistory;
