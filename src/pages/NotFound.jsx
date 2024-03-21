import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div>
      <p>404 error page not found</p>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
