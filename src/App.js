import { useState } from "react";
import "./App.css";
import { Catogaries, Tasks, Addtask, TasksArr, completed } from "./components";
const Progress = function ({ total, complete }) {
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
  const [open, isOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [Name, setName] = useState("");
  const [catogery, setCatogery] = useState("");
  const [total, setTotal] = useState(TasksArr.length);
  const [complete, setComplete] = useState(completed.length);
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
    TasksArr.push({
      task: Name,
      catogery: catogery,
      time: new Date().toDateString(),
    });
    setTotal(TasksArr.length);
  };

  const checked = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      completed.push({
        task: Name,
        catogery: catogery,
        time: new Date().toDateString(),
      });
      setComplete(completed.length);
    } else {
      completed.length = 0;
    }
  };
  console.log(complete);
  return (
    <div className="app">
      <Header time={time} total={total} complete={complete}></Header>
      <Catogaries></Catogaries>
      <Tasks checked={checked}></Tasks>
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
