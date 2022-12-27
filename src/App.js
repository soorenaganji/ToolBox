import "./App.css";
import TodoList from "./components/TodoList/TodoList";
import Home from "./components/Home/Home";
import MusicPlayer from './components/MusicPlayer/MusicPlayer'
import PasswordGenerator from './components/PasswordGenrator/PasswordGenerator'
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todoList" element={<TodoList />} />
        <Route path="/musicPlayer" element={<MusicPlayer />} />
        <Route path="/passwordGenerator" element={<PasswordGenerator />} />
      </Routes>
    </div>
  );
}

export default App;
