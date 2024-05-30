import Calculation from "./Calculation";
import styles from "./App.module.css";
import Memory from "./Memory";
import { useState } from "react";

function App() {
  const [expList, setExpList] = useState([]);

  return (
    <div className={styles.container}>
      <Calculation setExpList={setExpList}></Calculation>
      <Memory list={expList}></Memory>
    </div>
  );
}

export default App;
