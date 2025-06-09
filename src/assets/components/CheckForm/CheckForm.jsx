import React from "react";
import "./CheckForm.css";
import { useForm } from 'react-hook-form';

export default function CheckForm({ addCheck }) {
  const { register, handleSubmit, reset} = useForm();


  function handleAddCheck(data) {
    console.log(data);
    addCheck(data.textTask); 
    reset(); 
  }

  return (
    <form onSubmit={handleSubmit(handleAddCheck)} className="check-form">
      <input
        type="text"
        {...register("textTask")}
        placeholder="Agregar una tarea"
        maxLength={20}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}
