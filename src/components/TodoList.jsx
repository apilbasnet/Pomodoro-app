import React, { useState, useRef } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoList = () => {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const inputRef = useRef();

  function hanldeOnChange(e) {
    setNewTask(e.target.value);
  }

  function handleAdd() {
    inputRef.current.focus();
    if (newTask === "") {
      null;
    } else {
      setTask([...task, newTask]);
      setNewTask("");
    }
  }

  function handleDelete(index) {
    setTask(task.filter((task, i) => i !== index));
  }

  function handleUp(index) {
    if (index > 0) {
      const updatedData = [...task];
      [updatedData[index], updatedData[index - 1]] = [
        updatedData[index - 1],
        updatedData[index],
      ];
      setTask(updatedData);
    }
  }

  function handleDown(index) {
    if (index < task.length - 1) {
      const updatedData = [...task];
      [updatedData[index], updatedData[index + 1]] = [
        updatedData[index + 1],
        updatedData[index],
      ];
      setTask(updatedData);
    }
  }

  return (
    <div className=" bg-neutral-800 p-6 pt-[10px] shadow-md min-h-80">
      <h1 className="text-xl font-semibold text-center mb-1">To do List</h1>

      <div className="flex h-8 mb-2   ">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter a task."
          value={newTask}
          onChange={hanldeOnChange}
          className="flex-1 mr-1 pl-2"
        />

        <button onClick={handleAdd} className="py-1 rounded-none">
          Add
        </button>
      </div>
      <ol className="">
        {task.map((task, index) => {
          return (
            <li
              className="px-[5px] py-[2.5px] flex items-center gap-x-1 "
              key={index}
            >
              <span className="flex-1">{task}</span>
              <DeleteIcon
                className="w-20 hover:cursor-pointer"
                onClick={() => handleDelete(index)}
              />
              <ArrowUpwardIcon
                className="  hover:cursor-pointer"
                onClick={() => handleUp(index)}
              >
                UP
              </ArrowUpwardIcon>
              <ArrowDownwardIcon
                className="  hover:cursor-pointer"
                onClick={() => handleDown(index)}
              >
                Down
              </ArrowDownwardIcon>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default TodoList;
