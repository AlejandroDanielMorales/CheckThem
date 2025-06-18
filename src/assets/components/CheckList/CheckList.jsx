import React from "react";
import "./CheckList.css";
import { FaCheck, FaTrash, FaMoneyCheckAlt ,faPen } from "react-icons/fa";
import { useChecks } from "../../context/ChecksContext";

export default function CheckList({ checks }) {
  const { performCheck, deleteCheck , editCheck} = useChecks();

  const getStateLabel = (state) => {
    switch (state) {
      case "pending":
        return "Pendiente";
      case "onPayDate":
        return "En fecha";
      case "payed":
        return "Pagado";
      default:
        return "Desconocido";
    }
  };

  const getStateClass = (state) => `status-tag ${state}`;

  const monthStatus = checks.length > 0 ? getStateLabel(checks[0].state) : "—";

  return (
    <div className="check-cards-grid">
      <h3>
        Tienes {checks.length} cheque{checks.length !== 1 && "s"} {monthStatus.toLowerCase()} en este mes
      </h3>

      {checks.map((check) => {
        const expirationDate = new Date(check.dateOfExpiration).toLocaleDateString();
        const emissionDate = new Date(check.dateOfEmission).toLocaleDateString();

        return (
          <div key={check._id} className="check-card">
            <div className="check-header">
              <FaMoneyCheckAlt className="icon" />
              <span className="check-title">{check.providerName}</span>

              <span className={getStateClass(check.state)}>
                {getStateLabel(check.state)}
              </span>
            </div>

            <div className="check-info">
              <div className="check-dates">
                <p>
                  <strong>Emitido:</strong> {emissionDate}
                </p>
                <p>
                  <strong>Expira:</strong> {expirationDate}
                </p>
              </div>
              <p>
                <strong>Monto:</strong>{" "}
                <span className="amount">${check.amount.toLocaleString()}</span>
              </p>

              {(check.state === "pending" ) && (
                <div className="check-actions">
                  <button
                    className="perform-btn"
                    onClick={() => editCheck(check._id)}
                    title="Editar"
                  >
                    <faPen/>
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
               {(check.state === check.state === "onPayDate") && (
                <div className="check-actions">
                  <button
                    className="perform-btn"
                    onClick={() => performCheck(check._id)}
                    title="Marcar como cobrado"
                  >
                    <FaCheck />
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
