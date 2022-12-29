import React, { useState, useEffect } from "react";
// STYLE SHEET
import styles from "./TodoList.module.css";
// ICON
import plus from './plus.png'
//COMPONENTS
import TodoItem from "./TodoItem";
const TodoList = () => {
  // STATE STUFF
  const [clientInput, setClientInput] = useState("");
  const [clientInputsArray, setClientInputsArray] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  // MOUNTING FUNCS
  useEffect(() => {
    const getLocalTodo = () => {
        const prevTodo = localStorage.getItem("todo");
        setClientInputsArray(JSON.parse(prevTodo));
    };
    if (JSON.parse(localStorage.getItem("todo")) === null || JSON.parse(localStorage.getItem("todo")) === undefined) {
      localStorage.setItem("todo", JSON.stringify([]));
    } else {
      getLocalTodo();
    }
  }, []);
  useEffect(() => {
    filterHandler();
    const saveToLocal = () => {
      if (JSON.parse(localStorage.getItem("todo")) == null) {
        localStorage.setItem("todo", JSON.stringify([]));
      } else {
        localStorage.setItem("todo", JSON.stringify(clientInputsArray));
      }
    };
    saveToLocal();
  }, [clientInputsArray, status]);
  // WHENEVER YOU TYPE SOME TEXT INSIDE THE INPUT , THIS FUNC PUSHES THAT INSIDE A STATE
  const changeHandler = (event) => {
    setClientInput(event.target.value);
  };
  // WHEN YOU SUBMIT THAT TEXT , THIS FUNC PUSHES YOUR TEXT INTO AN OBJECT AND THEN PUSHES THAT OBJECT INTO AN ARRAY
  const submitHandler = (event) => {
    event.preventDefault();
    setClientInputsArray([
      ...clientInputsArray,
      { text: clientInput, completed: false, id: Math.random() * 10 },
    ]);
    setClientInput("");
  };
  // HANDLES THE FILTER STUFF
  const statusHandler = (event) => {
    setStatus(event.target.value);
  };
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(
          clientInputsArray.filter((todo) => todo.completed === true)
        );
        break;
      case "incomplete":
        setFilteredTodos(
          clientInputsArray.filter((todo) => todo.completed === false)
        );
        break;
      default:
        setFilteredTodos(clientInputsArray);
        break;
    }
  };
  // JSX
  return (
    <>
      <h1>To Do List</h1>
      <div className={styles.container}>
        <form className={styles.form}>
          <input type={"text"} onChange={changeHandler} value={clientInput} />
          <button type="submit" onClick={submitHandler}>
            <img src={plus} alt="plus icon" />
          </button>
        </form>
        <select onChange={statusHandler}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      {filteredTodos.map((item) => (
        <TodoItem
          data={item}
          setClientInputsArray={setClientInputsArray}
          clientInputsArray={clientInputsArray}
          key={item.id}
        />
      ))}
      <p className={styles.footer}>Powered by ❤️ with Sourena Ganji</p>
    </>
  );
};

export default TodoList;
