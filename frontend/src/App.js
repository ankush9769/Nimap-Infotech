import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Category from "./components/Category";
import Product from "./components/Product";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
    <Routes>
      <Route path="/" element={<Category></Category>}/>
      <Route path="/product" element={<Product></Product>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;