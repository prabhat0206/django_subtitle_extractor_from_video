import React from "react";
import "./App.css";
import { Provider } from "./context";
import Home from "./pages/index";

function App() {
  return (
    <Provider>
      <div className="flex h-screen justify-center">
        <Home />
      </div>
    </Provider>
  );
}

export default App;
