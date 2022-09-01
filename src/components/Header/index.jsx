import React from "react";
import logo from "../../images/doormat-logo.png";

const Header = ({ text }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <img className="label-scanner-logo" src={logo} alt="dorrmat logo" />
      <h2 className="label-scanner-header">{text}</h2>
    </div>
  );
};

export default Header;
