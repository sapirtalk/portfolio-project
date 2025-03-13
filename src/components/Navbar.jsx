import { useState, useEffect } from "react";

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
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        let visibleSection = entries.find((entry) => entry.isIntersecting);
        console.log(visibleSection);
        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -50% 0px", // Adjusted for earlier detection
        threshold: 0.3, // Highlights when 30% of the section is visible
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full dark:text-text text-textlight p-4 bg-opacity-50 backdrop-blur-md flex items-center justify-between z-50 bg-white/50 dark:bg-black/50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/logo.jpg" alt="Logo" className="w-10 h-10 rounded-full" />
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
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖️" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-white/50 dark:bg-black/80 flex flex-col items-center p-4 space-y-3 md:hidden">
          {["hero", "about", "projects", "skills", "job-search", "contact"].map((section) => (
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
      )}
    </nav>
  );
}
