import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Resume from "./pages/ResumeNew";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./pages/Layout";
import Contact from "./pages/Contact";

import CreationsProvider from "./context/CreationsContext";
import ProjectDetail from "./pages/ProjectDetail";
import FavouritesProvider from "./context/FavouritesContext";
import Favourites from "./pages/Favourites";

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (

    <FavouritesProvider>
    <CreationsProvider>    
      <Router>
      <Preloader load={load} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projectDetail/:id" element={<ProjectDetail />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/*" element={<Home />} />
          
        </Route>
      </Routes>


    </Router>

    </CreationsProvider>
    </FavouritesProvider>

  );
}

export default App;
