"";
export const completed = [];
export const TasksArr = [
  {
    task: "Study",
    catogery: "work",
    time: new Date().toDateString(),
  },
  { task: "play", catogery: "entertain", time: new Date().toDateString() },
];
export const Catogaries = function () {
  return (
    <nav className="btns">
      <button>All</button>
      <button>Active</button>
      <button>Done</button>
      <button>Important</button>
    </nav>
  );
};
const Display = function ({ task, checked }) {
  return (
    <div className="display">
      <input
        type="checkbox"
        style={{ width: "22px", height: "22px" }}
        onChange={checked}
      ></input>
      <nav>
        <span>{task.task}</span>
      </nav>
      <div>
        <span>{task.catogery}</span>
      </div>
      <span>{task.time}</span>
    </div>
  );
};
export const Tasks = function ({ checked }) {
  return (
    <section className="tasks">
      {TasksArr.map((task) => (
        <Display
          task={task}
          checked={checked}
          key={Math.random() * 10000}
        ></Display>
      ))}
    </section>
  );
};
export const Addtask = function ({
  open,
  render,
  time,
  add,
  insert,
  setTask,
  Set,
}) {
  return (
    <div className="add">
      <button onClick={add} className="do">
        +
      </button>
      {open && (
        <form>
          <input type="text" placeholder="task" onChange={setTask}></input>
          <p></p>
          <input type="text" placeholder="catogery" onChange={Set}></input>
          <button onClick={render} className="cancel">
            ❌
          </button>
          <button className="insert" onClick={insert}>
            AddTask
          </button>
        </form>
      )}
    </div>
  );
};
