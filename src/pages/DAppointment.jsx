import React, { useState } from "react";
import { AppLayout } from "../components/AppLayout";
import UserNavbar from "../components/UserNavbar";
import AppNotice from "../components/AppNotice";

const DonnorApp = () => {
  const [isVerified, setIsVerified] = useState(false);
  return (
    <AppLayout>
      <UserNavbar />
      <div className="container">
        {!isVerified ? (
          <AppNotice />
        ) : (
          <div>
            <p>Appointment</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default DonnorApp;
