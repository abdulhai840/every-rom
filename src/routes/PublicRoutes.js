import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../container/Home/Home";
import RomDetail from "../container/RomDetail/RomDetail";

export default function PublicRoutes(params) {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roms/:id" element={<RomDetail />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
