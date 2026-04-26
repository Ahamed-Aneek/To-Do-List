import { useState, useEffect } from "react";
import "./App.css";
import { Catogaries, Tasks, Addtask } from "./components";

/* ── helpers ── */
function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

/* ── Progress ── */
const Progress = function ({ total, complete }) {
  const pct = total > 0 ? Math.round((complete / total) * 100) : 0;
  return (
    <section className="progress">
      <span style={{ color: "#EDE5D1" }}>
        {complete}/{total} tasks done
      </span>
      <div className="percent">
        <div style={{ width: `${pct}%` }}></div>
      </div>
      <span>{pct}%</span>
    </section>
  );
};

/* ── Header ── */
const Header = function ({ time, total, complete }) {
  return (
    <header className="top">
      <section>
        <span>
          {time.getHours() >= 18
            ? "good evening"
            : time.getHours() >= 12
            ? "good afternoon"
            : "good morning"}
          ,
        </span>
        <h4 style={{ color: "#E8D4A6" }}>Aneek</h4>
      </section>
      <div className="time">
        <span>{time.toDateString()}</span>
      </div>
      <Progress total={total} complete={complete} />
    </header>
  );
};

/* ── App ── */
function App() {
  const [work, setWork] = useState(() => load("tasks", []));
  const [open, isOpen] = useState(false);
  const [time] = useState(new Date());
  const [Name, setName] = useState("");
  const [catogery, setCatogery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  /* persist tasks to localStorage whenever they change */
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(work));
  }, [work]);

  /* derived counts */
  const completedCount = work.filter((t) => t.done).length;

  const setTask = (e) => setName(e.target.value);
  const Set = (e) => setCatogery(e.target.value);

  const add = () => isOpen(true);

  const render = (e) => {
    e.preventDefault();
    isOpen(false);
  };

  const insert = (e) => {
    e.preventDefault();
    if (!Name || !catogery) return;
    const item = {
      id: Date.now(),
      Name,
      catogery,
      time: new Date().toDateString(),
      done: false,
      important: false,
    };
    setWork((t) => [...t, item]);
    setName("");
    setCatogery("");
    isOpen(false);
  };

  /* toggle done */
  const toggleDone = (id) => {
    setWork((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  /* toggle important */
  const toggleImportant = (id) => {
    setWork((prev) =>
      prev.map((t) => (t.id === id ? { ...t, important: !t.important } : t))
    );
  };

  /* delete task */
  const deleteTask = (id) => {
    setWork((prev) => prev.filter((t) => t.id !== id));
  };

  /* filter tasks based on active filter */
  const filteredWork = work.filter((t) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Active") return !t.done;
    if (activeFilter === "Done") return t.done;
    if (activeFilter === "Important") return t.important;
    return true;
  });

  return (
    <div className="app">
      <Header
        time={time}
        total={work.length}
        complete={completedCount}
      />
      <Catogaries
        active={activeFilter}
        setActive={setActiveFilter}
        tasks={work}
      />
      <Tasks
        work={filteredWork}
        toggleDone={toggleDone}
        toggleImportant={toggleImportant}
        deleteTask={deleteTask}
        activeFilter={activeFilter}
      />
      <Addtask
        open={open}
        render={render}
        add={add}
        insert={insert}
        setTask={setTask}
        Set={Set}
        Name={Name}
        catogery={catogery}
      />
    </div>
  );
}

export default App;
