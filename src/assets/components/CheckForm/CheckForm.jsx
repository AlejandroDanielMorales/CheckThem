import React from "react";
import "./CheckForm.css";
import { useForm } from "react-hook-form";

export default function CheckForm({ addCheck , onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  function handleAddCheck(data) {
    // Convertir fechas y monto antes de enviar
    const checkData = {
      providerName: data.providerName,
      amount: parseFloat(data.amount),
      dateOfEmission: new Date(data.dateOfEmission),
      dateOfExpiration: new Date(data.dateOfExpiration),
    };

    addCheck(checkData);
    reset();
  }

  return (

    <div className="modal-overlay">
    <form onSubmit={handleSubmit(handleAddCheck)} className="check-form">
      <input
        type="text"
        {...register("providerName", {
          required: "El proveedor es obligatorio",
          maxLength: { value: 100, message: "Máximo 100 caracteres" },
        })}
        placeholder="Nombre del proveedor"
      />
      {errors.providerName && <p className="form-error">{errors.providerName.message}</p>}

      <input
        type="number"
        step="0.01"
        {...register("amount", {
          required: "El monto es obligatorio",
          min: { value: 0, message: "El monto debe ser positivo" },
        })}
        placeholder="Monto"
      />
      {errors.amount && <p className="form-error">{errors.amount.message}</p>}

      <label>Fecha de emisión</label>
      <input
        type="date"
        {...register("dateOfEmission", {
          required: "La fecha de emisión es obligatoria",
        })}
      />
      {errors.dateOfEmission && <p className="form-error">{errors.dateOfEmission.message}</p>}

      <label>Fecha de vencimiento</label>
      <input
        type="date"
        {...register("dateOfExpiration", {
          required: "La fecha de vencimiento es obligatoria",
        })}
      />
      {errors.dateOfExpiration && <p className="form-error">{errors.dateOfExpiration.message}</p>}

      <button type="submit">Agregar cheque</button>
      <button type="button" onClick={() => onClose(false)}>Cancelar</button>

    </form>
    </div>
  );
}
