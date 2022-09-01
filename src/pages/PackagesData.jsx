import React from "react";
import { useLocation } from "react-router";
import Header from "../components/Header";

const PackagesData = () => {
  const location = useLocation();
  const { state } = location;
  return (
    <div className="packages-data-container">
      <Header text="Data from all scanned packages" />
      <div>
        {state.data.map((packageLabel) => {
          return (
            <div className="package-card">
              <img src={packageLabel.labelImg} alt="package label" />
              <span>{packageLabel.rawTextFromImg}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
// labelImg: img,
//   rawTextFromImg: await convertImageToText(img),

export default PackagesData;
