import { useState } from "react";
import "./App.css";
import Card from "./components/Card/Card";

function App() {
  return (
    <div class="container py-4 px-3 mx-auto">
      <h1>Hello, Bootstrap and Vite!</h1>
      <div class="d-flex justify-content-center mb-4">
        <Card />
      </div>
      <button class="btn btn-primary">Primary button</button>
    </div>
  );
}

export default App;
