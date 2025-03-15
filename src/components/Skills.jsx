import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

// Skill categories and items
const skills = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "HTML", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "MongoDB", "SQL" , "REST API" , "Next.js API Routes"],
  },
  // {
  //   category: "DevOps & Tools",
  //   items: ["Git", "Docker", "Kubernates" , "Postman" , "Jira" , "Jenkins"],
  // },
  {
    category: "AI & Data",
    items: ["Python" , "Tableau" , "Excel" , "Data Structurs", "Algorithms" , "Classical Statistical Methods" , "Modern & Applied Statistics" ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["-30% center", "30% center"], // Adjust fade-in and fade-out timing
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 });

  return (
    <motion.section
      ref={ref}
      id="skills"
      className="h-screen flex flex-col items-center justify-center px-6 text-center z-10"
      style={{ opacity: smoothOpacity, y: smoothY }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-title mb-8 dark:text-white text-textlight">My Skills</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-4xl">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="bg-white/5 dark:bg-gray-800/30 backdrop-blur-lg p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: false }} // Ensures animation happens every time
          >
            <h3 className="text-2xl font-semibold dark:text-primary text-primarylight mb-3">{skill.category}</h3>
            <ul className="flex flex-wrap justify-center gap-2">
              {skill.items.map((item, i) => (
                <li
                  key={i}
                  className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium hover:scale-105 dark:hover:bg-accent hover:bg-accentlight  transition duration-300 ease-in-out cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
