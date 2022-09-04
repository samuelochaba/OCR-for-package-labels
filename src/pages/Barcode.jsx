import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const Barcode = () => {
  const [data, setData] = React.useState("Not Found");
  return (
    <>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setData(result.text);
          else setData("Not Found");
        }}
        facingMode="user"
      />
      <p>{data}</p>
    </>
  );
};

export default Barcode;
