import { useState } from "react";
import "./App.css";
import { Catogaries, Tasks, Addtask } from "./components";
const Progress = function ({ total, complete }) {
  console.log(complete);
  return (
    <section className="progress">
      <span style={{ color: "#EDE5D1" }}>
        {complete}/{total} tasks done
      </span>
      <div className="percent">
        <div style={{ width: `${(complete / total) * 100}%` }}></div>
      </div>
      <span>{(complete / total) * 100}%</span>
    </section>
  );
};
const Header = function ({ time, total, complete }) {
  return (
    <header className="top">
      <section>
        <span>
          {(time.getHours() > 16 && "good evening") || "good morning"},
        </span>
        <h4 style={{ color: "#E8D4A6" }}>Aneek</h4>
      </section>
      <div className="time">
        <span>{time.toDateString()}</span>
      </div>
      <Progress total={total} complete={complete}></Progress>
    </header>
  );
};
function App() {
  const [work, setWork] = useState([]);
  const [open, isOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [Name, setName] = useState("");
  const [catogery, setCatogery] = useState("");
  const [total, setTotal] = useState(work.length+1);
  const [complete, setComplete] = useState([]);
  const setTask = (e) => {
    setName(e.target.value);
  };
  const Set = (e) => {
    setCatogery(e.target.value);
  };
  const add = () => {
    isOpen(true);
  };
  const render = (e) => {
    e.preventDefault();
    isOpen(false);
  };
  const insert = (e) => {
    e.preventDefault();
    setWork((t) => [
      ...t,
      { Name, catogery, time: new Date().toDateString(), done: false },
    ]);
    setTotal(work.length);
    console.log(work);
  };

  const checked = (e) => {
    console.log(e.target.checked);

    if (e.target.checked) {
      setComplete((t) => [
        ...t,
        { Name, catogery, time: new Date().toDateString(), done: true },
      ]);
      console.log(complete);
    } else {
      complete.splice(1, complete.length);
    }
  };

  return (
    <div className="app">
      <Header time={time} total={total} complete={complete.length}></Header>
      <Catogaries></Catogaries>
      <Tasks checked={checked} work={work}></Tasks>
      <Addtask
        open={open}
        render={render}
        time={time}
        add={add}
        insert={insert}
        setTask={setTask}
        Set={Set}
      ></Addtask>
    </div>
  );
}

export default App;
