import { useState } from "react";
import { 
  Star, 
  Trash2, 
  Plus, 
  X, 
  ClipboardList, 
  PartyPopper,
  Sparkles,
  Zap,
} from "lucide-react";

/* ── Category counts for badge display ── */
function getCounts(tasks, customCategories) {
  const base = {
    All: tasks.length,
    Active: tasks.filter((t) => !t.done).length,
    Done: tasks.filter((t) => t.done).length,
    Important: tasks.filter((t) => t.important).length,
  };
  customCategories.forEach((cat) => {
    base[cat] = tasks.filter((t) => t.catogery === cat).length;
  });
  return base;
}

/* ── Category Nav ── */
export const Catogaries = function ({ active, setActive, tasks, customCategories = [] }) {
  const defaultCats = ["All", "Active", "Done", "Important"];
  const counts = getCounts(tasks, customCategories);
  const allCats = [...defaultCats, ...customCategories];
  return (
    <nav className="btns">
      {allCats.map((c) => (
        <button
          key={c}
          className={active === c ? "active" : ""}
          onClick={() => setActive(c)}
        >
          {c}
          {counts[c] > 0 && (
            <span className={`badge${active === c ? " badge-active" : ""}`}>
              {counts[c]}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
};

/* ── Single Task Card ── */
const Display = function ({ task, index, toggleDone, toggleImportant, deleteTask }) {
  return (
    <div
      className={`display${task.done ? " done" : ""}${task.important ? " important" : ""}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        onChange={() => toggleDone(task.id)}
        checked={task.done}
      />

      {/* Task name */}
      <nav>
        <span>{task.Name}</span>
      </nav>

      {/* Category tag */}
      <div className="cat-tag">
        <span>{task.catogery}</span>
      </div>

      {/* Date */}
      <span className="task-date">{task.time}</span>

      {/* Action buttons */}
      <div className="task-actions">
        <button
          className={`star-btn${task.important ? " starred" : ""}`}
          onClick={() => toggleImportant(task.id)}
          title={task.important ? "Unmark important" : "Mark as important"}
          aria-label="Toggle important"
        >
          <Star size={18} fill={task.important ? "currentColor" : "none"} />
        </button>
        <button
          className="delete-btn"
          onClick={() => deleteTask(task.id)}
          title="Delete task"
          aria-label="Delete task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

/* ── Tasks List ── */
export const Tasks = function ({ work, toggleDone, toggleImportant, deleteTask, activeFilter }) {
  if (work.length === 0) {
    const emptyMessages = {
      All: { icon: <ClipboardList size={48} />, msg: "No tasks yet", sub: "Hit + to add your first task" },
      Active: { icon: <Zap size={48} />, msg: "No active tasks", sub: "All caught up!" },
      Done: { icon: <PartyPopper size={48} />, msg: "Nothing completed yet", sub: "Check off tasks to see them here" },
      Important: { icon: <Star size={48} fill="currentColor" />, msg: "No important tasks", sub: "Star a task to mark it as important" },
    };
    const { icon, msg, sub } = emptyMessages[activeFilter] || emptyMessages.All;
    return (
      <section className="tasks">
        <div className="empty-state">
          <div className="empty-icon">{icon}</div>
          <p>{msg}</p>
          <span>{sub}</span>
        </div>
      </section>
    );
  }

  return (
    <section className="tasks">
      {work.map((task, i) => (
        <Display
          task={task}
          key={task.id}
          index={i}
          toggleDone={toggleDone}
          toggleImportant={toggleImportant}
          deleteTask={deleteTask}
        />
      ))}
    </section>
  );
};

/* ── Add Task Modal ── */
export const Addtask = function ({
  open, render, add, insert, setTask, Set, Name, catogery,
  customCategories = [], setCustomCategories,
}) {
  const [newCat, setNewCat] = useState("");
  const [showNewCat, setShowNewCat] = useState(false);

  const defaultCats = ["Work", "Personal", "Shopping", "Health", "Study"];
  const allSelectCats = [
    ...defaultCats,
    ...customCategories.filter((c) => !defaultCats.includes(c)),
  ];

  const handleAddCategory = () => {
    const trimmed = newCat.trim();
    if (trimmed && !allSelectCats.includes(trimmed)) {
      setCustomCategories((prev) => [...prev, trimmed]);
    }
    // auto-select the newly added category
    if (trimmed) {
      Set({ target: { value: trimmed } });
    }
    setNewCat("");
    setShowNewCat(false);
  };

  return (
    <div className="add">
      <button onClick={add} className="do" aria-label="Add task">
        <Plus size={32} strokeWidth={2.5} />
      </button>
      {open && (
        <>
          <div className="modal-backdrop" onClick={render} />
          <form onSubmit={insert}>
            <div className="modal-header">
              <h3><Sparkles size={18} className="sparkle-icon" /> New Task</h3>
              <button type="button" onClick={render} className="cancel">
                <X size={20} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Task name…"
              onChange={setTask}
              value={Name}
              autoFocus
              required
            />

            {/* Category selector */}
            <select
              value={catogery}
              onChange={Set}
              required
              className="cat-select"
            >
              <option value="" disabled>Select a category</option>
              {allSelectCats.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* New category inline input */}
            {showNewCat ? (
              <div className="new-cat-row">
                <input
                  type="text"
                  placeholder="New category name"
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") { e.preventDefault(); handleAddCategory(); }
                    if (e.key === "Escape") { setShowNewCat(false); setNewCat(""); }
                  }}
                  autoFocus
                />
                <button type="button" className="confirm-cat" onClick={handleAddCategory}>Add</button>
                <button type="button" className="cancel-cat" onClick={() => { setShowNewCat(false); setNewCat(""); }}>Cancel</button>
              </div>
            ) : (
              <button
                type="button"
                className="add-cat-btn"
                onClick={() => setShowNewCat(true)}
              >
                + New category
              </button>
            )}

            <button className="insert" type="submit">
              Add Task
            </button>
          </form>
        </>
      )}
    </div>
  );
};
