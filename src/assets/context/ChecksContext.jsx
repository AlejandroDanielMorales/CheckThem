import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;


const TaskContext = createContext();
export const useChecks = () => useContext(TaskContext);

function CheckProvider({ children }) {
  const [checks, setChecks] = useState([]);
  const today = new Date();
  const monthNames = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
];

  // 🔄 Cargar cheques desde MongoDB al iniciar
  useEffect(() => {
    fetchChecks();
  }, []);

  useEffect(() => {
    fetchChecks();
  }, [checks]);

const fetchChecks = async () => {
    try {
      const res = await axios.get(`${API_URL}/checks`);
      const data = res.data;

      const checks = data.map((item) => ({
        _id: item._id,
        amount: item.amount,
        checkNumber: item.checkNumber,
        state: item.state,
        dateOfEmission: new Date(item.dateOfEmission),
        dateOfExpiration: new Date(item.dateOfExpiration),
        providerName: item.providerName,
      }));

      setChecks(checks); // Asegurate de tener esta función de estado
    } catch (err) {
      console.error("Error al cargar cheques:", err);
    }
  };


  // 🟢 Simula agregar cheque local (esto se puede extender para hacer un POST a la API)
const addCheck = async (check) => {
  const newCheck = {
    ...check,
    state: "pending", // Estado inicial
    dateOfEmission: new Date(check.dateOfEmission),  // ⬅️ Objeto Date válido
    dateOfExpiration: new Date(check.dateOfExpiration),
    amount: parseFloat(check.amount),
    providerName: check.providerName,
  };

  await axios.post(`${API_URL}/checks`, newCheck);
  setChecks((prevChecks) => [...prevChecks, newCheck]);
};


  // ✅ Simula marcar como pagado (debería hacer un PUT/PATCH a la API si querés persistir)
  const performCheck = async (id) => {
    const result = await Swal.fire({
    title: '¿Cobrar cheque?',
    text: '¿Estás seguro que querés marcar como cobrado este cheque?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Cobrar',
    cancelButtonText: 'Cancelar',
  });
    if (result.isConfirmed) {
      const updatedChecks = checks.map((check) =>
        check.id === id
          ? { ...check, state: "payed"}
          : check
      );
      setChecks(updatedChecks);

      await axios.put(`${API_URL}/checks/${id}`, { state: "payed" });
    }
  };
  
  const deleteCheck = async (id) => {
    const result = await Swal.fire({
    title: '¿Eliminar cheque?',
    text: '¿Estás seguro que querés eliminar este cheque?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
  });
    if (result.isConfirmed) {
      const updatedChecks = checks.filter((check) => check.id !== id);
      setChecks(updatedChecks);
      await axios.delete(`${API_URL}/checks/${id}`);
    }
  };

const editCheck = async (id , updatedData ) => {
  const result = await Swal.fire({
    title: '¿Editar cheque?',
    text: '¿Estás seguro que querés editar este cheque?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Editar',
    cancelButtonText: 'Cancelar',
  });

  if (result.isConfirmed) {
    try {
      await axios.put(`${API_URL}/checks/${id}`,updatedData);
      Swal.fire('Editado', 'El cheque fue editado correctamente.', 'success');
    } catch (error) {
      Swal.fire('Error', `Hubo un problema al editar el cheque.${error.message}`, 'error');
    }
  }
};

const parseDate = (value) => new Date(value);

const nextMonths = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
    return {
      month: date.getMonth(),
      year: date.getFullYear()
    };
  }); 

const lastMonths = Array.from({ length: 12 }, (_, i) => {
  const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
  return {
    month: date.getMonth(),
    year: date.getFullYear()
  };
});

const actualMonths = (() => {
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  let lastMonth = currentMonth - 1;
  let lastYear = currentYear;

  // Si estamos en enero, el mes anterior es diciembre del año anterior
  if (lastMonth < 0) {
    lastMonth = 11;
    lastYear -= 1;
  }

  return [
    { month: lastMonth, year: lastYear },
    { month: currentMonth, year: currentYear }
  ];
})();


// Cheques vencidos hasta el mes actual
const getLastChecksOfTheMonth = ({ month, year }) => {
  return checks.filter((check) => {
    const expiration = parseDate(check.dateOfExpiration);
    return (
      expiration.getMonth() === month &&
      expiration.getFullYear() === year && check.state === "payed" // ✅

    );
  });
};

// Cheques futuros (no vencidos) a partir del mes actual
const getNextChecksOfTheMonth = ({ month, year }) => {
  return checks.filter((check) => {
    const expiration = parseDate(check.dateOfExpiration);
    return (
      expiration.getMonth() === month &&
      expiration.getFullYear() === year && check.state === "pending" // ✅

    );
  });
};
const getChecksOfActualMonths = ({ month, year }) => {
  return checks.filter((check) => {
    const expiration = parseDate(check.dateOfExpiration);
    return (
      expiration.getMonth() === month &&
      expiration.getFullYear() === year && check.state === "onPayDate" // ✅
    );
  });
};

// Obtener cheques que vencieron hasta hoy pero dentro del rango de mes actual y el siguiente



  return (
    <TaskContext.Provider
      value={{
        checks,
        setChecks,
        addCheck,
        performCheck,
        deleteCheck,
        parseDate,
        nextMonths,
        lastMonths,
        getLastChecksOfTheMonth,
        getNextChecksOfTheMonth,
        monthNames,
        actualMonths,
        getChecksOfActualMonths,
        editCheck,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default CheckProvider;
