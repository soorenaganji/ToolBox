import React, { useState } from "react";
// STYLE SHEET
import styles from "./PasswordGenerator.module.css";
// NOTIFICATION MAKER LIBRARY NAMED "TOASTIFY"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// ICON
import { BiCopy } from 'react-icons/bi'
// CHARACTER LIST
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "./charactersStore";
function PasswordGenerator() {
  // NOTIFICATION TEXT
  const COPY_SUCCESS = "Password successfully copied to clipboard";
  // STATE STUFF
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(20);
  const [ifIncludesUpperCase, setIfIncludesUpperCase] = useState(false);
  const [ifIncludesLowerCase, setIfIncludesLowerCase] = useState(false);
  const [ifIncludesNumbers, setIfIncludesNumbers] = useState(false);
  const [ifIncludesSymbols, setIfIncludesSymbols] = useState(false);
  // ALL THE LOGIC OF THE PASSWORD GENERATOR IS MEANT BY THIS FUNCTION
  const passwordGeneratorFunc = () => {
    // THIS ONE PUSHES THE ERROR NOTIFICATION IF THE USER DOESN'T SELECT ANY OF THE CHOICES
    if (
        !ifIncludesUpperCase &&
        !ifIncludesLowerCase &&
        !ifIncludesNumbers &&
        !ifIncludesSymbols
      ) {
        notify('You must Select at least one option!', true)
      }
    // THE INITIAL VALUE OF THE CHARACTERS THAT THE PASSWORD SHOULD HAVE
    let characterList = "";
   // IT ADDS THE CHARACTERS BY ANY SELECTION
    if (ifIncludesUpperCase) characterList += upperCaseLetters;
    if (ifIncludesNumbers) characterList += numbers;
    if (ifIncludesLowerCase) characterList += lowerCaseLetters;
    if (ifIncludesSymbols) characterList += specialCharacters;
    // THIS FUNCTION RETURNS THE FINAL PASSWORD WITH THE CHARACTERS
    const createPassword = (characterList) => {
      // INITIAL VALUE
      let password = "";
      const characterListLength = characterList.length;
      // THIS PICS A RANDOM CHARACTER FROM THE CHARACTER LIST ONCE FOR ONE WORD LENGTH
      for (let i = 0; i < passwordLength; i++) {
        const characterIndex = Math.round(Math.random() * characterListLength);
        password = password + characterList.charAt(characterIndex);
      }
      return password;
    };
    // THIS PUSHES THE FINAL PASSWORD TO THE STATE TO DISPLAY IN THE UI
    setPassword(createPassword(characterList));
  };
  // I ACTUALLY COPIED THAT OUT :) 
  const copyPasswordFunc = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();
  };
  // A UNIQUE FUNCTION WHICH YOU CAN CALL WHENEVER YOU WANT TO PUSH A NOTIFICATION 
  const notify = (message) => {
    toast( message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const handleCopyPassword = (event) => {
    copyPasswordFunc();
    notify(COPY_SUCCESS)
  };
  // JSX
  return (
    <>
      <h2>Password Generator</h2>
      <div className={styles.container}>
        <div className={styles.result}>
          <p>{password}</p>
          <button onClick={handleCopyPassword}>
            <BiCopy />
          </button>
        </div>
        <form className={styles.length}>
          <label>Password strength</label>
          <input
            type={"number"}
            min="0"
            max="20"
            defaultValue={passwordLength}
            onChange={(event) => {
              setPasswordLength(event.target.value);
            }}
          />
        </form>
        <form className={styles.capital}>
          <label>Capital letters</label>
          <input
            type={"checkbox"}
            checked={ifIncludesUpperCase}
            onChange={(event) => setIfIncludesUpperCase(event.target.checked)}
          />
        </form>
        <form className={styles.small}>
          <label>Small letters</label>
          <input
            type={"checkbox"}
            checked={ifIncludesLowerCase}
            onChange={(event) => setIfIncludesLowerCase(event.target.checked)}
          />
        </form>
        <form className={styles.numbers}>
          <label>Numbers</label>
          <input
            type={"checkbox"}
            checked={ifIncludesNumbers}
            onChange={(event) => setIfIncludesNumbers(event.target.checked)}
          />
        </form>
        <form className={styles.symbols}>
          <label>Symbols</label>
          <input
            type={"checkbox"}
            checked={ifIncludesSymbols}
            onChange={(event) => setIfIncludesSymbols(event.target.checked)}
          />
        </form>
        <button className={styles.passMaker} onClick={passwordGeneratorFunc}>
          Make the password!
        </button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <p className={styles.footer}>Powered by ❤️ with Sourena Ganji</p>
    </>
  );
}

export default PasswordGenerator;
