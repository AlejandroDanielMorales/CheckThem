import React from "react";
import "./CheckForm.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


export default function CheckForm({ addCheck , onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  async function handleAddCheck(data) {
  const checkData = {
    providerName: data.providerName,
    checkNumber: data.checkNumber,
    amount: parseFloat(data.amount),
    dateOfEmission: new Date(data.dateOfEmission),
    dateOfExpiration: new Date(data.dateOfExpiration),
  };

  const result = await Swal.fire({
    title: '¿Agregar cheque?',
    text: '¿Estás seguro que querés registrar este cheque?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, agregar',
    cancelButtonText: 'Cancelar',
  });

  if (result.isConfirmed) {
    try {
      await addCheck(checkData);
      reset();

      Swal.fire({
        title: 'Cheque agregado',
        text: 'El cheque se registró correctamente.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
      onClose(false); 
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: `Hubo un problema al agregar el cheque.${error.message}`,
        icon: 'error',
      });
    }
  }
}


  return (

    <div className="modal-overlay">
    <form onSubmit={handleSubmit(handleAddCheck)} className="check-form">
      <h3>Agregar Cheque</h3>

      <div className="input-group">
      <label>Nombre de proveedor</label>
      <input
        type="text"
        {...register("providerName", {
          required: "*El proveedor es obligatorio",
          maxLength: { value: 100, message: "Máximo 100 caracteres" },
        })}
        placeholder="Nombre del proveedor"
      />
      {errors.providerName && <p className="form-error">{errors.providerName.message}</p>}
         </div>
       <div className="input-group">
        
    
       <label>Nro de cheque</label>
       <input
        type="text"
        {...register("checkNumber", {
          required: "*El número de cheque es obligatorio",
          maxLength: { value: 100, message: "Máximo 100 caracteres" },
        })}
        placeholder="Número de cheque"
      />
      {errors.checkNumber && <p className="form-error">{errors.checkNumber.message}</p>}
        </div>
      <div className="input-group">
        
     
      <label>Monto</label>
      <input
        type="number"
        step="0.01"
        {...register("amount", {
          required: "*El monto es obligatorio",
          min: { value: 0, message: "El monto debe ser positivo" },
        })}
        placeholder="Monto"
      />
      {errors.amount && <p className="form-error">{errors.amount.message}</p>}
       </div>
<div className="input-group">
        

      <label>Fecha de emisión</label>
      <input
        type="date"
        {...register("dateOfEmission", {
          required: "*La fecha de emisión es obligatoria",
        })}
      />
      {errors.dateOfEmission && <p className="form-error">{errors.dateOfEmission.message}</p>}
      </div>
<div className="input-group">
        
      
      <label>Fecha de vencimiento</label>
      <input
        type="date"
        {...register("dateOfExpiration", {
          required: "*La fecha de vencimiento es obligatoria",
        })}
      />
      {errors.dateOfExpiration && <p className="form-error">{errors.dateOfExpiration.message}</p>}
</div>
     <div className="actions-group">

      <button type="submit">Agregar cheque</button>
      <button type="button" onClick={() => onClose(false)}>Cancelar</button>
</div>
    </form>
    </div>
  );
}
