import React, { useState, useEffect } from "react";
// STYLE SHEET
import styles from "./TodoList.module.css";
// ICON
import trash from './trash.png'
import done from './basic-tick.png'
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
            <img src={done} alt="" />
          </button>
          <button onClick={deleteHandler} className={styles.delete}>
            <img src={trash} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
