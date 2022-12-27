import React from "react";
// STYLE SHEET
import styles from "./Home.module.css";
// IMAGE STUFF
import icon from "./TodoListIcon";
import icon2 from "./musicIcon.jpeg";
import icon4 from "./icon4.png";
// REACT ROUTER DOM
import { Link } from "react-router-dom";
function Home() {
  const data = {
    song : 'https://koonelaghebabat.mp3' ,
    artist : "pedaret" , 
    name : 'padaret hamin dirooz morde' ,
    coverPhoto : "https://koonelaghebabat.png"
  }
  return (
    <>
      <h1>Tool Box</h1>
      <div className={styles.container}>
        <div className={styles.card}>
          <Link to={"/todoList"}>
            <h3>TodoList</h3>
            <img src={icon} />
            <p>
              An online and simple todoList made with some javascript and pure
              css :){" "}
            </p>
          </Link>
        </div>
        <div className={styles.card}>
          <Link to={"/musicPlayer"}>
            <h3>Music Player</h3>
            <img src={icon2} />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Perspicia
            </p>
          </Link>
        </div>
        <div className={styles.card}>
          <Link to={"/passwordGenerator"}>
            <h3>Password Generator</h3>
            <img src={icon4} />
            <p>
              {" "}
              An online password generator with some features which makes your
              password customized{" "}
            </p>
          </Link>
        </div>
      </div>
      <p className={styles.footer}>Powered by ❤️ with Sourena Ganji</p>
    </>
  );
}

export default Home;
