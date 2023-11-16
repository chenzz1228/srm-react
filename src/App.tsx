import React from 'react';
import {BrowserRouter} from "react-router-dom";
import './App.css';
import MyLayout from "./layout/MyLayout";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <MyLayout/>
        </BrowserRouter>
    </div>
  );
}

export default App;
