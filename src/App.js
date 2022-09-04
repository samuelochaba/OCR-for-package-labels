/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
import "./App.css";
import PackagesData from "./pages/PackagesData";
import Barcode from "./pages/Barcode";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Barcode />} />
        <Route path="/barcode" element={<Barcode />} />

        <Route path="/packages-data" element={<PackagesData />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
