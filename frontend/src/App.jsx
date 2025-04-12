import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Footer from "../components/Footer";
import SearchPage from "../Pages/SearchPage";
import Header from "../components/Header";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
