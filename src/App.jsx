import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import JobSearchContact from "./components/JobSearchContact";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-text">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-col items-center">
        <Hero />
        <About />

        <section id="projects" className="h-screen flex items-center justify-center">
          <h2 className="text-3xl font-semibold">Projects</h2>
        </section>

        <Skills />
        <JobSearchContact />

      </main>
    </div>
  );
}
