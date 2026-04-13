import React from "react";
import {Link} from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbarcustomize px-3">
      <h4 className="mb-0 fw-bold text-white">Product App</h4>
      <div className="ms-auto">
        <Link to="/" className="btn me-2 btncustom">Category</Link>
        <Link to="/product" className="btn btncustom">Product</Link>
      </div>
    </nav>
  );
}

export default Navbar;