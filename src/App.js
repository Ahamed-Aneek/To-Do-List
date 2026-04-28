import { useState, useEffect } from "react";
import "./App.css";
import { Catogaries, Tasks, Addtask } from "./components";
import { Calendar } from "lucide-react";

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
        <Calendar size={14} />
        <span>{time.toDateString()}</span>
      </div>
      <Progress total={total} complete={complete} />
    </header>
  );
};

/* ── App ── */
function App() {
  const [work, setWork] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [customCategories, setCustomCategories] = useState(() => {
    const saved = localStorage.getItem("categories");
    return saved ? JSON.parse(saved) : [];
  });

  const [open, isOpen] = useState(false);
  const [time] = useState(new Date());
  const [Name, setName] = useState("");
  const [catogery, setCatogery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  /* Save to localStorage whenever data changes */
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(work));
  }, [work]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(customCategories));
  }, [customCategories]);

  /* derived counts */
  const completedCount = work.filter((t) => t.done).length;

  const setTask = (e) => setName(e.target.value);
  const Set = (e) => setCatogery(e.target.value);
  const add = () => isOpen(true);

  const render = (e) => {
    e.preventDefault();
    isOpen(false);
  };

  const navDefaults = ["All", "Active", "Done", "Important"];

  /* ── Create task ── */
  const insert = (e) => {
    e.preventDefault();
    if (!Name || !catogery) return;
    
    const newTask = {
      id: Date.now(),
      Name: Name,
      catogery: catogery,
      done: false,
      important: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setWork((prev) => [newTask, ...prev]);
    
    // Also add to customCategories if it's not a default nav category and not already there
    if (!navDefaults.includes(catogery) && !customCategories.includes(catogery)) {
      setCustomCategories((prev) => [...prev, catogery]);
    }

    setName("");
    setCatogery("");
    isOpen(false);
  };

  /* ── Toggle done ── */
  const toggleDone = (id) => {
    setWork((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  /* ── Toggle important ── */
  const toggleImportant = (id) => {
    setWork((prev) =>
      prev.map((t) => (t.id === id ? { ...t, important: !t.important } : t))
    );
  };

  /* ── Delete task ── */
  const deleteTask = (id) => {
    setWork((p) => p.filter((t) => t.id !== id));
  };

  /* ── Add custom category ── */
  const handleAddCategory = (name) => {
    if (customCategories.includes(name)) return;
    setCustomCategories((prev) => [...prev, name]);
  };

  /* ── Delete custom category ── */
  const deleteCategory = (name) => {
    // Remove the category from customCategories
    setCustomCategories((prev) => prev.filter((c) => c !== name));
    
    // Remove all tasks that belong to this category
    setWork((prev) => prev.filter((t) => t.catogery !== name));

    // If the active filter was the deleted category, reset to All
    if (activeFilter === name) {
      setActiveFilter("All");
    }
  };

  /* ── Filter tasks ── */
  const filteredWork = work.filter((t) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Active") return !t.done;
    if (activeFilter === "Done") return t.done;
    if (activeFilter === "Important") return t.important;
    return t.catogery === activeFilter;
  });

  const handleCategoryClick = (cat) => {
    setActiveFilter(cat);
    if (!navDefaults.includes(cat)) {
      setCatogery(cat);
    }
  };

  return (
    <div className="app">
      <Header
        time={time}
        total={work.length}
        complete={completedCount}
      />
      <Catogaries
        active={activeFilter}
        setActive={handleCategoryClick}
        tasks={work}
        customCategories={customCategories}
        deleteCategory={deleteCategory}
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
        customCategories={customCategories}
        setCustomCategories={setCustomCategories}
        onAddCategory={handleAddCategory}
      />
    </div>
  );
}

export default App;

