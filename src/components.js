import { useState } from "react";

/* ── Category counts for badge display ── */
function getCounts(tasks) {
  return {
    All: tasks.length,
    Active: tasks.filter((t) => !t.done).length,
    Done: tasks.filter((t) => t.done).length,
    Important: tasks.filter((t) => t.important).length,
  };
}

/* ── Category Nav ── */
export const Catogaries = function ({ active, setActive, tasks }) {
  const cats = ["All", "Active", "Done", "Important"];
  const counts = getCounts(tasks);
  return (
    <nav className="btns">
      {cats.map((c) => (
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
          {task.important ? "★" : "☆"}
        </button>
        <button
          className="delete-btn"
          onClick={() => deleteTask(task.id)}
          title="Delete task"
          aria-label="Delete task"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

/* ── Tasks List ── */
export const Tasks = function ({ work, toggleDone, toggleImportant, deleteTask, activeFilter }) {
  if (work.length === 0) {
    const emptyMessages = {
      All: { icon: "🗒️", msg: "No tasks yet", sub: "Hit + to add your first task" },
      Active: { icon: "✅", msg: "No active tasks", sub: "All caught up!" },
      Done: { icon: "🎉", msg: "Nothing completed yet", sub: "Check off tasks to see them here" },
      Important: { icon: "⭐", msg: "No important tasks", sub: "Star a task to mark it as important" },
    };
    const { icon, msg, sub } = emptyMessages[activeFilter] || emptyMessages.All;
    return (
      <section className="tasks">
        <div className="empty-state">
          <span className="empty-icon">{icon}</span>
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
export const Addtask = function ({ open, render, add, insert, setTask, Set, Name, catogery }) {
  return (
    <div className="add">
      <button onClick={add} className="do" aria-label="Add task">
        +
      </button>
      {open && (
        <>
          <div className="modal-backdrop" onClick={render} />
          <form onSubmit={insert}>
            <button type="button" onClick={render} className="cancel">✕</button>
            <input
              type="text"
              placeholder="Task name…"
              onChange={setTask}
              value={Name}
              autoFocus
              required
            />
            <input
              type="text"
              placeholder="Category (e.g. Work, Personal…)"
              onChange={Set}
              value={catogery}
              required
            />
            <button className="insert" type="submit">
              Add Task
            </button>
          </form>
        </>
      )}
    </div>
  );
};
