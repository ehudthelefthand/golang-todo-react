import React, { useState, useEffect } from "react";
import { listTask, createTask, deleteTask, updateTask } from "./api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    listTask()
      .then((resp) => setTasks(resp.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") {
      return;
    }

    // const newTask = {
    //   id: Date.now(),
    //   task,
    //   done: false,
    // };
    createTask({ task })
      .then((resp) => {
        setTasks([...tasks, resp.data]);
      })
      .catch((err) => console.error(err));

    setTask("");
  };

  const handleDelete = (task) => {
    deleteTask(task)
      .then(() => {
        const filtered = tasks.filter((t) => t.id !== task.id);
        setTasks(filtered);
      })
      .catch((err) => console.error(err));
  };

  const handleToggle = (index) => {
    const copied = [...tasks];
    copied[index].done = !copied[index].done;
    updateTask(copied[index])
      .then(() => {
        setTasks(copied);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="task">Task:</label>
        <input
          type="text"
          placeholder="what you want to do?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          autoFocus
        />
        <button type="submit">add</button>
      </form>
      <ul>
        {tasks.map((t, index) => (
          <li
            className={`${t.done ? "done" : ""}`}
            key={t.id}
            onClick={() => handleToggle(index)}
          >
            <input type="checkbox" checked={t.done} readOnly />
            <span>{t.task}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(t);
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
