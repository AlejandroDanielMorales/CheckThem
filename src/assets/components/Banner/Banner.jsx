import React from "react";
import { FaEvernote } from "react-icons/fa";
import "./Banner.css";

export default function Banner() {
  return (
    <div className="banner">
      <div className="logo">
        <FaEvernote className="icon" />
        <h1>CheckThem</h1>
      </div>
      <p className="subtitle">¡Organizá tus cheques como un campeón! 📋🔥</p>
    </div>
  );
}
