import React from 'react'
import "./CheckListDone.css";
import { FaTrash } from 'react-icons/fa';

export default function CheckListDone({checks , deleteCheck}) {
  return (
    <>
    <div className="check-container">
        <h2>Cheques Cobrados ✅</h2>
      <ul className="check-list">
      {checks.length === 0 && <li className="check-item">No hay cheques aun</li>}
      {checks.map((check) => (
        check.state === "Realizada" &&
        <li key={check.id} className="check-item">
          ◘
          {check.text}
          <br />
          Estado : {check.state}
          <br />
          Creada : {check.releaseDate}
          <br />
          Realizada : {check.resolveDate}
          <button className="delete-btn" onClick={() => deleteCheck(check.id)}>
            <FaTrash />
          </button>
        </li>       
      ))}
    </ul>
    </div>
    </>
  )
}
