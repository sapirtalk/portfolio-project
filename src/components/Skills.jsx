import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { FaReact, FaNodeJs,  FaPython, FaHtml5, FaCss3Alt,  FaChartBar } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiFramer, SiExpress, SiMongodb,  SiTableau, SiJupyter } from "react-icons/si";
import { MdPeople, MdLightbulb, MdSyncAlt, MdPublic, MdManageAccounts } from "react-icons/md";
import { PiGraphLight } from "react-icons/pi";
import { GiArtificialIntelligence } from "react-icons/gi";
import { TbApi , TbSql  } from "react-icons/tb";
import { LuChartSpline } from "react-icons/lu";
import { LiaBrainSolid } from "react-icons/lia";

// Skill categories and items with corresponding icons
const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React.js", icon: <FaReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "Framer Motion", icon: <SiFramer /> },
      { name: "HTML", icon: <FaHtml5 /> },
      { name: "CSS", icon: <FaCss3Alt /> },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "SQL", icon: <TbSql /> },
      { name: "REST API", icon: <TbApi /> },
      { name: "Next.js API Routes", icon: <SiNextdotjs /> },
    ],
  },
  {
    category: "AI & Data",
    items: [
      { name: "Python", icon: <FaPython /> },
      { name: "Tableau", icon: <SiTableau /> },
      { name: "Excel", icon: <FaChartBar /> },
      { name: "Data Structures", icon: <PiGraphLight /> },
      { name: "Algorithms", icon: <GiArtificialIntelligence /> },
      { name: "Classical Statistical Methods", icon: <LuChartSpline /> },
      { name: "Modern & Applied Statistics", icon: <SiJupyter /> },
    ],
  },
  {
    category: "Soft Skills",
    items: [
      { name: "Teamwork", icon: <MdPeople /> },
      { name: "Problem Solving", icon: <MdLightbulb /> },
      { name: "Adaptability", icon: <MdSyncAlt /> },
      { name: "Communication", icon: <MdPublic /> },
      { name: "Leadership", icon: <MdManageAccounts /> },
      { name: "Creativity", icon: <LiaBrainSolid /> },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["-30% center", "30% center"],
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
            viewport={{ once: false }}
          >
            <h3 className="text-2xl font-semibold dark:text-primary text-primarylight mb-3">{skill.category}</h3>
            <ul className="flex flex-wrap justify-center gap-3">
              {skill.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center space-x-2 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium hover:scale-105 dark:hover:bg-accent hover:bg-accentlight transition duration-300 ease-in-out cursor-pointer"
                >
                  {item.icon} <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}