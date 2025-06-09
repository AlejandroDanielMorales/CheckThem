import React, { useState } from "react";
import CheckList from "../CheckList/CheckList";
import "./ChecksTabs.css";
import { useChecks } from "../../context/ChecksContext";

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export default function ChecksTabs() {
  const { checks ,parseDate } = useChecks();
  const today = new Date();
  const [activeTab, setActiveTab] = useState(0);

  // Array de los próximos 12 meses con año incluido
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
    return {
      month: date.getMonth(),
      year: date.getFullYear()
    };
  }); 


const getChecksForMonth = ({ month, year }) => {
  console.log("Todos los checks:", checks);

  return checks.filter((check, index) => {
    console.log(`Cheque #${index}:`, check);
    console.log(check._id)

    if (!check || !check.dateOfExpiration) {
      console.warn(`Cheque inválido en índice ${index}:`, check);
      return false;
    }

    const expiration = parseDate(check.dateOfExpiration);
    const expMonth = expiration.getMonth();
    const expYear = expiration.getFullYear();

    console.log(`Cheque ${check._id}: Expira en ${expMonth + 1}/${expYear} — Buscando ${month + 1}/${year}`);

    return expMonth === month && expYear === year;
  });
};


  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {months.map((m, i) => (
          <button
            key={i}
            className={`tab-button ${activeTab === i ? "active" : ""}`}
            onClick={() => setActiveTab(i)}
          >
            {monthNames[m.month]} {m.year}
          </button>
        ))}
      </div>

      <div className="tabs-content">
        <CheckList checks={getChecksForMonth(months[activeTab])} />
      </div>
    </div>
  );
}
