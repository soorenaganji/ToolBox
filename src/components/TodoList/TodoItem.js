import React, { useState, useEffect } from "react";
// STYLE SHEET
import styles from "./TodoList.module.css";
// ICON
import { FaTrashAlt } from 'react-icons/fa'
import { MdDone } from 'react-icons/md'
function TodoItem({ setClientInputsArray, data, clientInputsArray }) {
  // THIS OMITS THE TODO ITEM YOU WANT TO DELETE 
    const deleteHandler = () => {
    let index = clientInputsArray.indexOf(data);
    let array = clientInputsArray;
    array.splice(index, 1);
    setClientInputsArray([...array]);
  };
  // I THINK THERE IS NO NEED TO DESCRIBE WHAT THIS FUNCTION DOES :)
  const doneHandler = () => {
    let index = clientInputsArray.indexOf(data);
    let array = clientInputsArray;
    let isDone = data.completed
    array[index].completed = !isDone
    setClientInputsArray([...array]);
  };
  return (
    <div>
      <div className={data.completed ? styles.doneTask : styles.Todo}>
        <p>{data.text}</p>
        <div>
          <button className={styles.done} onClick={doneHandler}>
            <MdDone />
          </button>
          <button onClick={deleteHandler} className={styles.delete}>
            <FaTrashAlt/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
