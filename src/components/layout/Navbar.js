import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark mb-5">
      <Link to="/ReportListing" className="navbar-brand mb-0 h1 mx-auto">
        ReportList
      </Link>
    </nav>
  );
};

export default Navbar;
