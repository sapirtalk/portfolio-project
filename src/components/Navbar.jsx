import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdLightMode , MdDarkMode } from "react-icons/md";


export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Ensure theme is correctly applied on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);

    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Improved Section Highlighting with IntersectionObserver
  useEffect(() => {
    setTimeout(() => {
      const sections = document.querySelectorAll("section");
      if (!sections.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          let visibleEntry = entries.find((entry) => entry.isIntersecting);
          console.log("Visible Section:", visibleEntry?.target?.id || "None");

          if (visibleEntry?.target?.id) {
            setActiveSection(visibleEntry.target.id);
          }
        },
        {
          root: null,
          rootMargin: "-10% 0px -60% 0px", // Ensures earlier detection
          threshold: 0.25, // Trigger when 25% of section is in viewport
        }
      );

      sections.forEach((section) => observer.observe(section));

      return () => observer.disconnect();
    }, 500); // Small delay to ensure elements are loaded
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full dark:text-text text-textlight p-4 bg-opacity-50 backdrop-blur-md flex items-center justify-between z-50 bg-white/50 dark:bg-black/50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/portfolio-project/logo.jpg" alt="Logo" className="w-10 h-10 rounded-full" />
        <h1 className="text-xl font-bold">Sapir Talker</h1>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-4">
        {["hero", "about", "projects", "skills", "job-search"].map((section) => (
          <li key={section}>
            <a
              href={`#${section}`}
              className={`transition-all ${
                activeSection === section
                  ? "dark:text-primary text-primarylight scale-110 font-bold"
                  : "dark:hover:text-primary hover:text-primarylight"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          </li>
        ))}
      </ul>

      {/* Theme Switcher & Mobile Menu Button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 bg-gray-500 dark:bg-gray-500 rounded-full transition dark:hover:bg-gray-700 hover:bg-gray-700 cursor-pointer"
        >
          {theme === "light" ? <MdDarkMode /> : <MdLightMode/>}
        </button>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖️" : "☰"}
        </button>
      </div>

      {/* Mobile Menu with Framer Motion Animation */}
      <motion.ul
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`absolute top-16 left-0 w-full bg-white/50 dark:bg-black/80 flex flex-col items-center p-4 space-y-3 md:hidden ${menuOpen ? "block" : "hidden"}`}
      >
        {["hero", "about", "projects", "skills", "job-search"].map((section) => (
          <li key={section}>
            <a
              href={`#${section}`}
              className={`transition-all ${
                activeSection === section
                  ? "dark:text-primary text-primarylight scale-110 font-bold"
                  : "dark:hover:text-primary hover:text-primarylight"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          </li>
        ))}
      </motion.ul>
    </nav>
  );
}
