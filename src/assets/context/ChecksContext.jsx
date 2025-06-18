import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
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
    const fetchChecks = async () => {
      try {
        const res = await axios.get(`${API_URL}/checks`); 
        const data = res.data;

        const mapped = data.map((item) => ({
  _id: item._id,
  amount: item.amount,
  checkNumber: item.checkNumber,
  state: item.state,
  text: `Cheque de ${item.providerName} - Monto $${item.amount}`,
  dateOfEmission: new Date(item.dateOfEmission), // ✅ conservar como Date
  dateOfExpiration: new Date(item.dateOfExpiration), // ✅
  providerName: item.providerName,
}));


        setChecks(mapped);
      } catch (error) {
        console.error("Error al cargar cheques desde la API:", error);
      }
    };

    fetchChecks();
  }, []);

  // 🟢 Simula agregar cheque local (esto se puede extender para hacer un POST a la API)
const addCheck = (check) => {
  const newCheck = {
    ...check,
    state: "pending", // Estado inicial
    dateOfEmission: new Date(check.dateOfEmission),  // ⬅️ Objeto Date válido
    dateOfExpiration: new Date(check.dateOfExpiration),
    amount: parseFloat(check.amount),
    providerName: check.providerName,
  };

  axios.post(`${API_URL}/checks`, newCheck);
  setChecks((prevChecks) => [...prevChecks, newCheck]);
};


  // ✅ Simula marcar como pagado (debería hacer un PUT/PATCH a la API si querés persistir)
  const performCheck = (id) => {
    const accept = confirm("Desea marcar como cobrado este cheque?");
    if (accept) {
      const formattedDate = new Date().toLocaleString();
      const updatedChecks = checks.map((check) =>
        check.id === id
          ? { ...check, state: "Realizada", resolveDate: formattedDate }
          : check
      );
      setChecks(updatedChecks);

      // Opcional: actualizar en backend
      // axios.put(`http://localhost:3000/api/checks/${id}`, { payed: true });
    }
  };

  const deleteCheck = (id) => {
    const accept = confirm("Desea eliminar esta tarea?");
    if (accept) {
      const updatedChecks = checks.filter((check) => check.id !== id);
      setChecks(updatedChecks);

      // Opcional: eliminar en backend
      // axios.delete(`http://localhost:3000/api/checks/${id}`);
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default CheckProvider;
