import React from "react";
import "./CheckList.css";
import { FaCheck, FaTrash, FaMoneyCheckAlt } from "react-icons/fa";
import { useChecks } from "../../context/ChecksContext";

export default function CheckList({ checks }) {
  const { performCheck, deleteCheck, parseDate } = useChecks();

  return (
    <div className="check-container">
      <h2>📋 Cheques Pendientes</h2>

      {checks.length === 0 && (
        <div className="empty-state">No hay cheques pendientes</div>
      )}

      <div className="check-cards-grid">
        {checks.map((check) =>
          !check.payed ? (
            <div key={check._id} className="check-card">
              <div className="check-header">
                <FaMoneyCheckAlt className="icon" />
                <span className="check-title">{check.providerName}</span>
                <span className="status-tag pending">Pendiente</span>
              </div>

              <div className="check-info">
                <p><strong>Monto:</strong> <span className="amount">${check.amount.toLocaleString()}</span></p>
                <p><strong>Emitido:</strong> {parseDate(check.dateOfEmission).toLocaleDateString()}</p>
                <p><strong>Expira:</strong> {parseDate(check.dateOfExpiration).toLocaleDateString()}</p>
              

              <div className="check-actions">
                <button className="perform-btn" onClick={() => performCheck(check._id)} title="Marcar como cobrado">
                  <FaCheck />
                </button>
                <button className="delete-btn" onClick={() => deleteCheck(check._id)} title="Eliminar cheque">
                  <FaTrash />
                </button>
              </div>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
