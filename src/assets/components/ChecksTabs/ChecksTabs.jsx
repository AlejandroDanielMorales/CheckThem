import React, { useState } from "react";
import CheckList from "../CheckList/CheckList";
import "./ChecksTabs.css";
import { useChecks } from "../../context/ChecksContext";

export default function ChecksTabs({ months, listTitle , getChecks }) {
  const { monthNames } = useChecks();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs-container">
     

      <div className="check-container">
         <h2>{listTitle}</h2>
         <div className="tabs-header">
        {months.map((m, i) => (
          <button
            key={i}
            className={`tab-button ${activeTab === i ? "active" : ""}`}
            onClick={() => setActiveTab(i)}
          >
            {monthNames[m.month]}
            {m.year}
          </button>
        ))}
      </div>
       

        {getChecks(months[activeTab]).length === 0 && (
          <div className="empty-state">No hay cheques pendientes</div>
        )}

        <div className="tabs-content">
          <CheckList checks={getChecks(months[activeTab])} />
        </div>
      </div>
    </div>
  );
}
