import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Project Data
const projects = [
  {
    title: "Nature Explorer",
    github: "https://github.com/your-repo/nature-explorer",
    video: "/demos/ntrexplorer.mp4",
    description:
      "A web platform designed to enhance trail and tour management by providing an interactive map, user-generated content, and an Admin Panel for streamlined content moderation and user management.",
    tech: ["Next.js", "MongoDB", "Leaflet.js", "Tailwind CSS", "REST API"],
  },
  {
    title: "Maze Solver AI",
    github: "https://github.com/your-repo/maze-solver",
    video: "/demos/mazesolver.mp4",
    description:
      "An AI-powered maze generator and solver implementing heuristic search strategies and memory-efficient algorithms. It provides visualized pathfinding solutions and supports custom maze configurations.",
    tech: ["Python", "Tkinter", "Heuristic Search", "Data Structures & Algorithms"],
  },
  {
    title: "Snowfall Simulation",
    github: "https://github.com/your-repo/snowfall-simulation",
    video: "/portfolio-project/demos/snowfall.mp4",
    description:
      "An interactive snowfall simulation using Python and Pygame. Features dynamic snow accumulation, and an efficient data structure implementation to manage snowfall behavior.",
    tech: ["Python", "Pygame", "Data Structures & Algorithms"],
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const ref = useRef(null);

  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["-50% center", "50% center"], // Adjusted to work in both directions
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]); // Adds vertical movement

  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 });

  return (
    <motion.section
      ref={ref}
      id="projects"
      className="h-screen w-full flex flex-col dark:text-text text-textlight items-center justify-center px-6 z-10"
      style={{ opacity: smoothOpacity, y: smoothY }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-title mb-8">My Projects</h2>

      <div className="flex w-full max-w-7xl h-[32rem]">
        {/* Left: Project List */}
        <div className="w-1/3 flex flex-col space-y-4 pr-4">
          {projects.map((project, index) => (
            <motion.button
              key={index}
              onMouseEnter={() => setActiveProject(project)}
              className={`p-2 text-left text-lg font-semibold transition-all ${
                activeProject.title === project.title
                  ? "dark:text-primary text-primarylight scale-105"
                  : "dark:hover:text-primary hover:text-primarylight"
              }`}
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                {project.title}
              </a>
            </motion.button>
          ))}
        </div>

        {/* Right: Video Showcase & Details */}
        <div className="w-2/3 flex flex-col items-center">
          <motion.video
            key={activeProject.video}
            src={activeProject.video}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 text-center max-w-lg">
            {activeProject.description}
          </p>
          {/* Tech Badges */}
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {activeProject.tech.map((tech, index) => (
              <span
                key={index}
                className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
