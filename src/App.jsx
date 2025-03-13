import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import JobSearchContact from "./components/JobSearchContact";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen dark:bg-background bg-backgroundlight  text-text">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-col items-center">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <JobSearchContact />
        <Footer />

      </main>
    </div>
  );
}
