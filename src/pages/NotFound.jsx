import React from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
const NotFound = () => {
  return (
    <AppLayout>
      <div className="container h-[80vh] flex flex-col items-center justify-center">
        <h1 className="text-8xl text-red">404.</h1>
        <p>Page Not Found</p>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link className="py-4 px-8 rounded-xl bg-red text-white mt-8" to="/">
          Go back to the homepage
        </Link>
      </div>
    </AppLayout>
  );
};

export default NotFound;
