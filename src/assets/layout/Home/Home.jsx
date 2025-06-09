
import CheckForm from "../../components/CheckForm/CheckForm";
import CheckList from "../../components/CheckList/CheckList";
import CheckListDone from "../../components/CheckListDone/CheckListDone";
import "./Home.css";
import Banner from "../../components/Banner/Banner";
import { useChecks } from "../../context/ChecksContext";


export default function Home() {
  const { checks, addCheck, deleteCheck } = useChecks();

  return (
    <>
      <Banner/>
      <div className="app-container">    
        <CheckForm addCheck={addCheck} />
        <div className="lists-container">
          <CheckList/>
          <CheckListDone checks={checks} deleteCheck={deleteCheck}/>
        </div>
      </div>
    </>
  );
}