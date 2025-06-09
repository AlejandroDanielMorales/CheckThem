import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./assets/components/Header/Header";
import Footer from "./assets/components/Footer/Footer";
import Home from "./assets/layout/Home/Home";
import Register from "./assets/layout/Register/Register";
import Login from "./assets/layout/Login/Login";

import "./App.css";
import { useUser } from "./assets/context/UserContext";

function App() {
  const { userName, handleLoginSuccess } = useUser();




  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={userName === "" ? <Register /> : <Navigate to="/" />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
