/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";

const Barcode = () => {
  const [data, setData] = React.useState("Not Found");
  // const [barcodeDetector, setBarcodeDetector] = useState(null);
  // const [mediaStream, setMediaStrem] = useState(null);
  const videoRef = useRef(null);

  async function detect() {
    const barcodeDetector = new window.BarcodeDetector();

    videoRef.current.srcObject = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
    });
    videoRef.current.autoplay = true;

    function render() {
      barcodeDetector
        .detect(videoRef.current)
        .then((barcodes) => {
          barcodes.forEach((barcode) => {
            setData(barcode.rawValue);
          });
        })
        .catch(console.error);
    }

    (function renderLoop() {
      requestAnimationFrame(renderLoop);
      render();
    })();
  }

  useEffect(() => {
    detect();
  }, []);

  return (
    // <>
    //   <BarcodeScannerComponent
    //     width={500}
    //     height={500}
    //     onUpdate={(err, result) => {
    //       if (result) setData(result.text);
    //       else setData("Not Found");
    //     }}
    //     facingMode="user"
    //   />
    //   <p>{data}</p>
    // </>
    <>
      {/* <BarcodeScanner
        onCapture={(data) => {
          console.log(data);
          setData(data);
        }}
      /> */}
      <video ref={videoRef}></video>
      <p>{data}</p>
    </>
  );
};

export default Barcode;
