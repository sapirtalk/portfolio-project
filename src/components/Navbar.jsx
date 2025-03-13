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

  return (
    <nav className="fixed top-0 left-0 w-full dark:text-text text-textlight p-4 bg-opacity-50 backdrop-blur-md flex items-center justify-between z-50 bg-white/50 dark:bg-black/50">
      {/* Logo */}
      <h1 className="text-xl font-bold">My Portfolio</h1>

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
          className="p-2 bg-gray-200 dark:bg-gray-800 rounded transition"
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
