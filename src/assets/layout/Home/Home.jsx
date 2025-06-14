
import CheckForm from "../../components/CheckForm/CheckForm";
import CheckListDone from "../../components/CheckListDone/CheckListDone";
import "./Home.css";
import Banner from "../../components/Banner/Banner";
import { useChecks } from "../../context/ChecksContext";
import ChecksTabs from "../../components/ChecksTabs/ChecksTabs";


export default function Home() {
  const { addCheck , nextMonths , lastMonths,actualMonths , getNextChecksOfTheMonth , getLastChecksOfTheMonth,getChecksOfActualMonths } = useChecks();

  return (
    <>
      <Banner/>
      
      <div className="app-container">    
        <CheckForm addCheck={addCheck} />
        <div className="lists-container">
          <ChecksTabs months={nextMonths} listTitle={"📋 Cheques emitidos"} getChecks={getNextChecksOfTheMonth} />
          <ChecksTabs months={actualMonths} listTitle={"🕒Cheques en fecha"} getChecks={getChecksOfActualMonths} />
          <ChecksTabs months={lastMonths} listTitle={"✅ Cheques Cobrados"} getChecks={getLastChecksOfTheMonth} />
        </div>
      </div>
    </>
  );
}