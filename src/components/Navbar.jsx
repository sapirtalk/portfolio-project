import { useState, useEffect } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Smooth scroll function
  const handleSmoothScroll = (event, section) => {
    event.preventDefault();
    const target = document.getElementById(section);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 50, // Adjust for navbar height
        behavior: "smooth",
      });
      setMenuOpen(false); // Close mobile menu
    }
  };

  // Fix section highlighting with a more precise observer
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        let visibleSection = entries.find((entry) => entry.isIntersecting);
        console.log("Currently visible section:", visibleSection?.target?.id);

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -50% 0px", // Highlights earlier
        threshold: 0.3, // Detects the section as active when at least 30% is visible
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full p-4 bg-opacity-50 backdrop-blur-md flex items-center justify-between z-50 bg-white dark:bg-black/50">
      {/* Logo */}
      <h1 className="text-xl font-bold">My Portfolio</h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-4">
        {["hero", "about", "projects", "skills", "job-search", "contact"].map((section) => (
          <li key={section}>
            <a
              href={`#${section}`}
              onClick={(e) => handleSmoothScroll(e, section)}
              className={`transition-all ${
                activeSection === section
                  ? "text-primary scale-110 font-bold"
                  : "hover:text-primary"
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
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 bg-gray-200 dark:bg-gray-800 rounded"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* Hamburger Menu Button (Mobile Only) */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖️" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-white dark:bg-black/80 flex flex-col items-center p-4 space-y-3 md:hidden">
          {["hero", "about", "projects", "skills", "job-search", "contact"].map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                onClick={(e) => handleSmoothScroll(e, section)}
                className={`transition-all ${
                  activeSection === section
                    ? "text-primary scale-110 font-bold"
                    : "hover:text-primary"
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
