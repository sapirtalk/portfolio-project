import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref, // Track the About section
    offset: ["-30% center", "30% center"], // Better offset mapping
  });

  // Smooth opacity transition: Fully visible when centered
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  // Apply a smooth spring effect to avoid abrupt transitions
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 });

  return (
    <motion.section
      ref={ref}
      id="about"
      className="h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ opacity: smoothOpacity, y: smoothY }}
    >
      <div className="max-w-2xl dark:text-white text-textlight z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-title mb-4">About Me</h2>
        <p className="text-lg md:text-xl opacity-80 leading-relaxed text-justify">
            Hi! I'm <span className="dark:text-primary text-primarylight font-semibold">Sapir Talker</span>, As an Information Systems Engineering graduate, I love building things—whether it’s scalable web applications, automating workflows, or uncovering insights from data.
            
            With a mix of Problem-Solving, Full-Stack Development, and Data Analysis, I love turning ideas into reality.
            <br /><br />
            I tinker with Python, JavaScript (React, Next.js, Node.js), SQL, and MongoDB, always finding new ways to make things smoother, faster, and smarter. There's nothing more exciting than solving a problem with the right mix of code, creativity, and curiosity!
        </p>
      </div>
    </motion.section>
  );
}
