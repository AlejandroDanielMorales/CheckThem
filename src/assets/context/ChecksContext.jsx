import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const TaskContext = createContext();
export const useChecks = () => useContext(TaskContext);

function CheckProvider({ children }) {
  const [checks, setChecks] = useState([]);

  // 🔄 Cargar cheques desde MongoDB al iniciar
  useEffect(() => {
    const fetchChecks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/checks"); 
        const data = res.data;

        const mapped = data.map((item) => ({
          _id: item._id,
          amount: item.amount,
          text: `Cheque de ${item.providerName} - Monto $${item.amount}`,
          dateOfEmission: new Date(item.dateOfEmission).toLocaleDateString(),
          releaseDate: new Date(item.dateOfEmission).toLocaleDateString(),
          dateOfExpiration: new Date(item.dateOfExpiration).toLocaleDateString(),
          providerName: item.providerName,
          resolveDate: item.payed
            ? new Date(item.updatedAt).toLocaleDateString()
            : "N/A",
          state: item.payed ? "Realizada" : "Pendiente",
        }));

        setChecks(mapped);
      } catch (error) {
        console.error("Error al cargar cheques desde la API:", error);
      }
    };

    fetchChecks();
  }, []);

  // 🟢 Simula agregar cheque local (esto se puede extender para hacer un POST a la API)
  const addCheck = (text) => {
    const finded = checks.find((check) => check.text === text);
    if (finded === undefined) {
      const newCheck = {
        id: uuidv4(),
        text,
        releaseDate: new Date().toLocaleString(),
        resolveDate: "N/A",
        state: "Pendiente",
      };
      setChecks([...checks, newCheck]);
    } else {
      alert("La tarea ya existe");
    }
  };

  // ✅ Simula marcar como pagado (debería hacer un PUT/PATCH a la API si querés persistir)
  const performCheck = (id) => {
    const accept = confirm("Desea marcar como realizada esta tarea?");
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
 
  const parseDate = (str) => {
  if (!str) return new Date(NaN); // retorna fecha inválida
  const [day, month, year] = str.split("/");
  return new Date(`${year}-${month}-${day}`); // formato compatible con Date()
}; 
  return (
    <TaskContext.Provider
      value={{
        checks,
        setChecks,
        addCheck,
        performCheck,
        deleteCheck,
        parseDate,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default CheckProvider;
