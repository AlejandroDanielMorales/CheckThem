
import CheckForm from "../../components/CheckForm/CheckForm";
import "./Home.css";
import Banner from "../../components/Banner/Banner";
import { useChecks } from "../../context/ChecksContext";
import ChecksTabs from "../../components/ChecksTabs/ChecksTabs";
import { useState } from "react";

export default function Home() {
  const {
    addCheck,
    nextMonths,
    lastMonths,
    actualMonths,
    getNextChecksOfTheMonth,
    getLastChecksOfTheMonth,
    getChecksOfActualMonths
  } = useChecks();

  const [activeTab, setActiveTab] = useState("next"); // "next" | "actual" | "last"
  const [activeCheckForm, setActiveCheckForm] = useState(false);

  return (
    <>
      <Banner />
      <div className="app-container">
        
        <button className="addCheckBtn" onClick={()=> setActiveCheckForm(true)}>Agregar cheque</button>
        <div className="tabs-selector">
          <button onClick={() => setActiveTab("last")} className={activeTab === "last" ? "active" : ""}>✅ Cheques cobrados</button>
          <button onClick={() => setActiveTab("actual")} className={activeTab === "actual" ? "active" : ""}>🕒 Cheques en fecha</button>
          <button onClick={() => setActiveTab("next")} className={activeTab === "next" ? "active" : ""}>📋 Cheques emitidos</button>
        </div>
         {activeCheckForm === true && (
           <CheckForm addCheck={addCheck} onClose={setActiveCheckForm}/>
          )}
        

        <div className="lists-container">
          {activeTab === "next" && (
            <ChecksTabs
              months={nextMonths}
              listTitle={"📋 Cheques emitidos"}
              getChecks={getNextChecksOfTheMonth}
            />
          )}
          {activeTab === "actual" && (
            <ChecksTabs
              months={actualMonths}
              listTitle={"🕒 Cheques en fecha"}
              getChecks={getChecksOfActualMonths}
            />
          )}
          {activeTab === "last" && (
            <ChecksTabs
              months={lastMonths}
              listTitle={"✅ Cheques cobrados"}
              getChecks={getLastChecksOfTheMonth}
            />
          )}
        </div>
      </div>
    </>
  );
}
