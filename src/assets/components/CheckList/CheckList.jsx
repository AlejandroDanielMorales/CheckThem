import React from "react";
import "./CheckList.css";
import { FaCheck, FaTrash, FaMoneyCheckAlt } from "react-icons/fa";
import { useChecks } from "../../context/ChecksContext";

export default function CheckList({ checks }) {
  const { performCheck, deleteCheck, parseDate } = useChecks();

  return (
    <div className="check-cards-grid">
      {checks.map((check) => {
        const expirationDate = parseDate(check.dateOfExpiration);

        return (
          <div key={check._id} className="check-card">
            <div className="check-header">
              <FaMoneyCheckAlt className="icon" />
              <span className="check-title">{check.providerName}</span>

             <span
               className={`status-tag ${
                 check.state === "pending"
                   ? "pending"
                   : check.state === "onPayDate"
                   ? "onPayDate"
                   : check.state === "payed"
                   ? "payed"
                   : ""
               }`}
              >
               {
                 check.state === "pending"
                   ? "Pendiente"
                   : check.state === "onPayDate"
                   ? "En fecha"
                   : check.state === "payed"
                   ? "Pagado"
                   : ""
               }
              </span>

            </div>

            <div className="check-info">
              <p>
                <strong>Monto:</strong>{" "}
                <span className="amount">${check.amount.toLocaleString()}</span>
              </p>
              <p>
                <strong>Emitido:</strong>{" "}
                {parseDate(check.dateOfEmission).toLocaleDateString()}
              </p>
              <p>
                <strong>Expira:</strong>{" "}
                {expirationDate.toLocaleDateString()}
              </p>
              {(check.state === "pending" || check.state === "onPayDate") && (
                <div className="check-actions">
                  <button
                    className="perform-btn"
                    onClick={() => performCheck(check._id)}
                    title="Marcar como cobrado"
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteCheck(check._id)}
                    title="Eliminar cheque"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}

            </div>
          </div>
        );
      })}
    </div>
  );
}
