/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { createWorker } from "tesseract.js";
import Loading from "../components/Loading";
import { useEffect } from "react";
import Header from "../components/Header";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: { exact: "environment" },
};

function Home() {
  let navigate = useNavigate();
  const [appState, setAppState] = useState({
    ocr: "",
    progress: 0,
    capturedLabels: [],
    finishedScanning: false,
    promiseToDeliver: false,
  });

  const { progress, finishedScanning, promiseToDeliver } = appState;
  const worker = createWorker({
    logger: (m) => {
      setAppState({
        ...appState,
        progress: parseInt(m.progress * 100),
      });
    },
  });
  const convertImageToText = async (img) => {
    if (!img) return;
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(img);
    console.log(text);
    return text;
  };

  console.log(appState);

  useEffect(() => {
    if (finishedScanning && promiseToDeliver) {
      navigate("/packages-data", {
        state: {
          data: appState.capturedLabels,
        },
      });
    }
  }, [finishedScanning, promiseToDeliver]);

  return (
    <div className="label-scanner-container">
      <Header text="Please scan each and every package that is being delivered at this building." />
      {progress > 0 && progress < 100 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loading />
          <span>extracting data...</span>
        </div>
      ) : (
        ""
      )}
      <div className="label-scanner-webcam-wrapper">
        <Webcam
          audio={false}
          screenshotFormat="image/jpeg"
          className="webcam"
          videoConstraints={videoConstraints}
        >
          {({ getScreenshot }) => (
            <button
              className="label-scanner-scan-button"
              onClick={async () => {
                let img = getScreenshot();
                setAppState({
                  ...appState,
                  imgSrc: img,
                  capturedLabels: [
                    ...appState.capturedLabels,
                    {
                      labelImg: img,
                      rawTextFromImg: await convertImageToText(img),
                    },
                  ],
                });
              }}
            >
              Scan
            </button>
          )}
        </Webcam>
      </div>
      <div className="checkbox-container">
        <div>
          <input
            onChange={() =>
              setAppState({
                ...appState,
                finishedScanning: !appState.finishedScanning,
              })
            }
            value={finishedScanning}
            type="checkbox"
            id="finish-scan"
          />
          <label htmlFor="finish-scan">
            I have finished scanning all packages
          </label>
        </div>
        <div>
          <input
            value={promiseToDeliver}
            onChange={() =>
              setAppState({
                ...appState,
                promiseToDeliver: !appState.promiseToDeliver,
              })
            }
            type="checkbox"
            id="promise"
          />
          <label htmlFor="promise">
            I promise to deliver all packages into the secure package room
          </label>
        </div>
      </div>
    </div>
  );
}

export default Home;
