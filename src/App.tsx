import React from "react";
import "./App.css";
import CharacterManager from "./components/CharacterManager";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise - JASURBEK</h1>
      </header>
      <section className="App-section">
        <CharacterManager />
      </section>
    </div>
  );
};

export default App;
