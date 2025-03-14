import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function Hero() {
  const [init, setInit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Adjusts for mobile screens
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);




  useEffect(() => {
    // console.log("Initializing tsParticles..."); // Debugging log
  
    initParticlesEngine(async (engine) => {
      // console.log("tsParticles Engine Loaded", engine); // Debugging log
      await loadSlim(engine);
    }).then(() => {
      // console.log("tsParticles Successfully Initialized!");
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    // console.log(container);
  };
  

  // Particle options with higher visibility
  const options = useMemo(
    () => ({
      background: { color: "transparent" },
      particles: {
        number: { value: isMobile ? 100 : 300 }, // Fewer particles on mobile
        color: { value: "#58A6FF" }, // Neon blue color
        shape: { type: "circle" },
        opacity: { value: 0.8, random: false }, // More visible
        size: { value: 2, random: true }, // Larger size
        move: {
          enable: true,
          speed: 1, // Faster movement
          direction: "none",
          random: true,
          straight: false,
        },
        links: {
          enable: true, // Enable linking particles
          distance: 150,
          color: "#58A6FF",
          opacity: 0.4,
          width: 1,
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
          onClick: { enable: true, mode: "push" },
        },
        modes: {
          repulse: { distance: 100 , duration: 1 },
          push: { quantity: 1 },
        },
      },
      detectRetina: true,
    }),
    [isMobile]
  );

  return (
    <section id="hero" className="relative h-screen flex flex-col items-center justify-center text-center">
      {/* Render particles only after initialization */}
      <div className="absolute top-0 left-0 w-full h-full z-[0]">
      {init && <Particles id="particles" options={options} particlesLoaded={particlesLoaded} />}
      </div>

      {/* Hero Content */}
      <div className="z-10 relative h-screen dark:text-text text-textlight flex flex-col items-center justify-center ">
      <h1 className="text-5xl md:text-6xl font-bold">Sapir Talker</h1>
      <p className="mt-4 text-lg md:text-xl opacity-80">"Do what you love, and you’ll never work a day in your life." — Confucius</p>

      <a
        href="#projects"
        className="mt-6 px-6 py-3 dark:bg-primary bg-primarylight text-white  font-semibold text-lg rounded-lg shadow-md transition hover:scale-105 hover:shadow-lg"
      >
        Explore My Work
      </a>
      </div>
    </section>
  );
}
