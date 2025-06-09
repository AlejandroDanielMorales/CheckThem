import React from "react";
import "./CheckList.css";
import { FaCheck, FaTrash } from "react-icons/fa";

import { useChecks } from "../../context/ChecksContext"; // Ajustá la ruta según tu estructura


export default function CheckList() {
  const { checks, performCheck, deleteCheck } = useChecks();
  return (
    <>
    <div className="check-container">
    <h2>Cheques Pendientes ⏳</h2>
    <ul className="check-list">
    {checks.length === 0 && <li className="check-item">No hay cheques pendientes aun</li>}
      {checks.map((check) => (
        check.state === "Pendiente" &&
        <li key={check.id} className="check-item">
          ◘
          {check.text}
          <br />
          Estado : {check.state}
          <br />
          Creada : {check.releaseDate}
           <br />
          Proveedor: {check.providerName}

          
          <br />
          Expiracion : {check.dateOfExpiration}
          <button className="perform-btn" onClick={() => performCheck(check.id)}>
            <FaCheck />
          </button>
          <button className="delete-btn" onClick={() => deleteCheck(check.id)}>
            <FaTrash />
          </button>
        </li>
      ))}
    </ul>
    </div>
    </>
  );
}
