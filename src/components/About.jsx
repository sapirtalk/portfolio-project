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
      <div className="max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold text-title mb-4">About Me</h2>
        <p className="text-lg md:text-xl opacity-80 leading-relaxed">
          Hi! I'm <span className="text-primary font-semibold">Sapir Talker</span>, an aspiring **Product Manager** and **Full-Stack Developer**.
          I specialize in creating **efficient, scalable web applications** and have a passion for **problem-solving, UX, and innovation**.
        </p>
      </div>
    </motion.section>
  );
}
