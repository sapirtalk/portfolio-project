import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function JobSearchContact() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["-30% center", "30% center"], // Adjusts fade-in/out timing
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 });

  return (
    <motion.section
      ref={ref}
      id="job-search"
      className="h-screen flex flex-col items-center justify-center px-6 text-center z-10 dark:text-white text-textlight "
      style={{ opacity: smoothOpacity, y: smoothY }}
    >
      {/* Job Search Section */}
      <div className="mb-12 dark:text-white text-textlight">
        <h2 className="text-4xl md:text-5xl font-bold text-title mb-4">What am I Looking For?</h2>
        <p className="text-lg md:text-xl opacity-80">
          I'm currently looking for roles in <span className="font-semibold dark:text-primary text-primarylight">Data Analysis</span> , <span className="font-semibold dark:text-primary text-primarylight">Full-Stack Development</span>, and <span className="font-semibold dark:text-primary text-primarylight">DevOps</span>.
        </p>
        <a
          href="/portfolio-project/Sapir_Talker_CV.pdf"
          target="_blank" // Opens in a new tab
          rel="noopener noreferrer"
          // download="Sapir_Talker_Resume.pdf" // Forces download instead of opening in a URL
          className="mt-4 inline-block px-6 py-3 dark:bg-primary bg-primarylight text-white font-semibold text-lg rounded-lg shadow-md transition hover:scale-105 hover:shadow-lg"
        >
          View My Resume
        </a>
      </div>

      {/* Contact Section */}
      <motion.div
        className="bg-white/5 dark:bg-gray-800/30 backdrop-blur-lg p-6 rounded-lg shadow-lg flex flex-col gap-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        <h3 className="text-2xl font-semibold dark:text-primary text-primarylight">Get In Touch</h3>
        <a
          href="mailto:sapirtalk@gmail.com"
          className="text-lg font-medium text-title hover:underline"
        >
          📧 Email Me
        </a>
        <a
          href="https://linkedin.com/in/sapir-talker"
          className="text-lg font-medium text-title hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          🔗 Connect on LinkedIn
        </a>
      </motion.div>
    </motion.section>
  );
}
