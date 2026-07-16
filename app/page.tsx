'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, MouseEvent } from 'react';
import { Bungee_Shade } from 'next/font/google';

// Bungee Shade font configuration
const bungeeShade = Bungee_Shade({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => { setIsFocused(true); setOpacity(1); };
  const handleBlur = () => { setIsFocused(false); setOpacity(0); };
  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] p-6 transition-colors hover:border-white/20 flex flex-col ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.08), transparent 40%)`,
        }}
      />
      <div className="relative z-10 flex-1 flex flex-col">{children}</div>
    </div>
  );
};

export default function Portfolio() {
  const [openCert, setOpenCert] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(heroScroll, [0, 0.5], [1, 0]);

  const springUp: any = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.5, duration: 1.2 } }
  };

  const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  const letterVariants: any = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 200 } }
  };

  return (
    <div className="bg-[#0a0a0a] text-gray-300 font-sans selection:bg-white selection:text-black scroll-smooth">

      <motion.div style={{ scaleX: scrollYProgress }} className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-[60]" />

      <motion.nav
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", bounce: 0.2, duration: 1, delay: 0.2 }}
        className="fixed top-0 w-full bg-[#0a0a0a]/80 backdrop-blur-md z-50 border-b border-white/5"
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-xl font-bold text-white tracking-wide">Senthamil</div>
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white hover:scale-110 transition-all">
                {item}
              </a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} id="home" className="relative min-h-screen pt-32 pb-20 lg:py-0 lg:h-screen flex items-center max-w-6xl mx-auto px-6 overflow-hidden">
  <motion.div
    style={{ y: textY, opacity: opacityText }}
    variants={staggerContainer} initial="hidden" animate="visible"
    className="grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full z-10"
  >
          <div className="flex flex-col items-start">
            <motion.h1 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold tracking-tighter mb-4 flex flex-col">
              <motion.span variants={springUp} className="text-2xl md:text-3xl text-white/70 mb-2 font-medium tracking-normal">
                Hi, I&apos;m
              </motion.span>

              {/* Bungee Shade Font Applied Here - Text Size Reduced */}
              <div className={`flex flex-wrap gap-x-4.5 gap-y-2.5 overflow-visible text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5.3rem] leading-[1] ${bungeeShade.className}`}>
                {["Senthamil", "Valavan", "S"].map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-flex">
                    {word.split("").map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        variants={letterVariants}
                        className={`${wordIndex === 0 ? 'text-white' : 'text-gray-300'} inline-block hover:scale-110 transition-transform cursor-default`}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </div>
            </motion.h1>

            <motion.h2 variants={springUp} className="text-xl md:text-2xl text-white/80 mb-6 font-light">
              Data Analyst & Data Scientist
            </motion.h2>

            <motion.p variants={springUp} className="text-gray-500 mb-10 leading-relaxed max-w-md text-lg">
              Results-driven Data Analyst & Scientist turning raw datasets into actionable insights through Explainable AI (XAI), scalable ML pipelines, and advanced data visualization.
            </motion.p>

            <motion.div variants={springUp} className="flex flex-wrap gap-4">
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#contact" className="px-8 py-3 bg-white text-black rounded-full font-medium shadow-[0_0_20px_rgba(255,255,255,0.1)] text-center">
                Hire Me
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/Senthamil_Valavan_S_Data_Analyst.pdf" download="Senthamil_Valavan_Data_Analyst_Resume.pdf" className="px-6 py-3 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                DA Resume
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/Senthamil_Valavan_S_DATA_SCIENCE.pdf" download="Senthamil_Data_Science_Resume.pdf" className="px-6 py-3 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                DS Resume
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#projects" className="px-6 py-3 border border-white/5 text-gray-400 rounded-full font-medium hover:text-white transition-colors">
                View Work
              </motion.a>
            </motion.div>
          </div>

          <motion.div variants={springUp} className="flex justify-center md:justify-end relative">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
            >
              <Image src="/profile.jpg" alt="Senthamil" fill className="object-cover" priority />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto border-t border-white/5 relative z-20 bg-[#0a0a0a]">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <motion.h3 variants={springUp} className="text-4xl md:text-5xl font-bold text-white mb-10 uppercase tracking-tighter">About Me</motion.h3>
          <div className="max-w-4xl space-y-6 text-gray-400 leading-relaxed text-lg font-light">
            <motion.p variants={springUp}>
              I am a recent B.Tech IT graduate (Batch of 2026) and a data-driven problem solver with deep expertise in Computer Vision, predictive modeling, and business intelligence.
            </motion.p>
            <motion.p variants={springUp}>
              As the Lead Data Analyst at Codeniet—an early-stage tech startup—I architect robust data models and transform complex datasets into actionable business insights. Alongside my startup, I operate as an independent BI Analyst, optimizing workflows and building interactive dashboards for international clients.
            </motion.p>
            <motion.p variants={springUp}>
              A major focus of my work involves deep-dive data analytics—utilizing advanced SQL (CTEs, Window Functions) and Power BI to uncover customer behavior patterns and drive strategic, business-wide decisions.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Skills & Certifications Section */}
      <section id="skills" className="py-24 px-6 max-w-6xl mx-auto border-t border-white/5 relative z-20 bg-[#0a0a0a]">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <motion.h3 variants={springUp} className="text-4xl md:text-5xl font-bold text-white mb-16 uppercase tracking-tighter">Technical Skills</motion.h3>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <motion.div variants={springUp} whileHover={{ y: -5 }} className="transition-transform h-full">
              <SpotlightCard className="h-full">
                <h4 className="text-xl font-medium text-white mb-6">Machine Learning & AI</h4>
                <div className="flex flex-wrap gap-2">
                  {['Deep Learning', 'Computer Vision', 'NLP', 'Explainable AI (XAI)', 'Grad-CAM', 'Predictive Modeling'].map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">{skill}</span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div variants={springUp} whileHover={{ y: -5 }} className="transition-transform h-full">
              <SpotlightCard className="h-full">
                <h4 className="text-xl font-medium text-white mb-6">Data Analytics & DB</h4>
                <div className="flex flex-wrap gap-2">
                  {['Advanced SQL', 'PostgreSQL', 'Power BI', 'Excel', 'Data Warehousing', 'ETL Pipelines', 'Data Modeling', 'KPI Dashboards'].map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">{skill}</span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div variants={springUp} whileHover={{ y: -5 }} className="transition-transform h-full">
              <SpotlightCard className="h-full">
                <h4 className="text-xl font-medium text-white mb-6">Frameworks & Libraries</h4>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'TensorFlow', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'].map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">{skill}</span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div variants={springUp} whileHover={{ y: -5 }} className="transition-transform h-full">
              <SpotlightCard className="h-full">
                <h4 className="text-xl font-medium text-white mb-6">Modern Dev Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {['Cursor AI', 'GitHub Copilot', 'PyCharm', 'Jupyter', 'Git & GitHub'].map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">{skill}</span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          </div>

          {/* Certifications Block */}
          <motion.div variants={springUp} className="transition-transform">
            <SpotlightCard>
              <h4 className="text-xl font-medium text-white mb-6 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                Certifications & Achievements
              </h4>
              <div className="flex flex-col">
                {[
                  { title: "Python for Data Science", issuer: "NPTEL", year: "2024", img: "/certificates/nptel.jpg" },
                  { title: "AWS - Data Science", issuer: "AWS Activate", year: "2024", img: "/certificates/aws.jpg" },
                  { title: "Basic Python Full-Stack Bootcamp", issuer: "Guru Tech", year: "2024", img: "/certificates/guru.jpg" },
                  { title: "AR & VR Workshop", issuer: "SIMATS Engineering", year: "2025", img: "/certificates/simats.jpg" },
                  { title: "Foundation Level in GERMAN", issuer: "Dr. M.G.R. University", year: "2023", img: "/certificates/german.jpg" },
                  { title: "Problem Solving in Python", issuer: "UT Dallas & CIT", year: "2021", img: "/certificates/python.jpg" }
                ].map((cert, index) => (
                  <div key={index} className="border-b border-white/5 last:border-0">
                    <div
                      onClick={() => setOpenCert(openCert === cert.title ? null : cert.title)}
                      className="flex justify-between items-center py-4 cursor-pointer hover:bg-white/5 px-3 rounded-lg transition-colors group"
                    >
                      <div>
                        <h5 className="text-gray-200 font-medium group-hover:text-white transition-colors">{cert.title}</h5>
                        <p className="text-sm text-gray-500">{cert.issuer}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 bg-white/5 px-3 py-1 rounded-full">{cert.year}</span>
                        <motion.svg
                          animate={{ rotate: openCert === cert.title ? 180 : 0 }}
                          xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"
                        >
                          <path d="m6 9 6 6 6-6"/>
                        </motion.svg>
                      </div>
                    </div>

                    <AnimatePresence>
                      {openCert === cert.title && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 mt-2 mb-4 bg-black/40 rounded-xl border border-white/5 flex justify-center">
                            <Image
                              src={cert.img}
                              alt={cert.title}
                              width={800}
                              height={600}
                              className="w-full max-w-2xl h-auto rounded-lg object-contain shadow-2xl"
                              unoptimized // Helps if local images have different formats
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </section>

      {/* Experience Section */}
<section id="experience" className="py-32 px-6 max-w-6xl mx-auto border-t border-white/5 relative z-20 bg-[#0a0a0a]">
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
    <motion.h3 variants={springUp} className="text-4xl md:text-5xl font-bold text-white mb-20 uppercase tracking-tighter text-left">Experience</motion.h3>

    <div className="space-y-16 max-w-4xl">
      <motion.div variants={springUp} whileHover={{ x: 10 }} className="group border-l border-white/20 pl-8 relative transition-all duration-300">
        <div className="absolute w-3 h-3 bg-white/40 group-hover:bg-white rounded-full -left-[6.5px] top-2 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
        <h4 className="text-2xl font-medium text-white">Data Analyst</h4>
        <div className="text-gray-500 mb-4 mt-1">
          <a href="https://codeniet.me" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white underline decoration-white/30 underline-offset-4 transition-colors">Codeniet</a> • Jan 2026 - Present
        </div>
        <p className="text-gray-400 font-light leading-relaxed">Spearheaded the data analytics strategy, architecting robust data models and scalable data warehousing frameworks to drive business-wide actionable insights.</p>
      </motion.div>

      <motion.div variants={springUp} whileHover={{ x: 10 }} className="group border-l border-white/20 pl-8 relative transition-all duration-300">
        <div className="absolute w-3 h-3 bg-white/40 group-hover:bg-white rounded-full -left-[6.5px] top-2 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
        <h4 className="text-2xl font-medium text-white">Freelance BI Analyst</h4>
        <div className="text-gray-500 mb-4 mt-1">Independent Consultant • Jan 2025 - Present</div>
        <p className="text-gray-400 font-light leading-relaxed">Delivered interactive dashboards and end-to-end data pipelines for international clients. Optimized database operations utilizing advanced SQL queries (CTEs, Window Functions) to enhance reporting efficiency.</p>
      </motion.div>
    </div>
  </motion.div>
</section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 max-w-6xl mx-auto border-t border-white/5 relative z-20 bg-[#0a0a0a]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <motion.h3 variants={springUp} className="text-4xl md:text-5xl font-bold text-white mb-16 text-center uppercase tracking-tighter">Projects</motion.h3>
          <div className="grid md:grid-cols-2 gap-8">

            {/* FIRST: Customer Behavior Dashboard */}
            <motion.div variants={springUp} whileHover={{ y: -10 }} className="transition-transform h-full">
              <SpotlightCard className="p-10 h-full flex flex-col">
                <div className="flex-1">
                  <span className="text-xs tracking-widest uppercase text-gray-500 mb-4 block">Data Analytics</span>
                  <h4 className="text-2xl font-medium text-white mb-4">Customer Behavior Dashboard</h4>
                  <p className="text-gray-400 font-light leading-relaxed mb-8 text-lg">
                    Engineered an end-to-end pipeline using Jupyter (Pandas) and PostgreSQL to analyze 3,900+ records. Built an interactive Power BI dashboard to visualize actionable insights like revenue drivers and subscription impacts.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {['Power BI', 'PostgreSQL', 'Jupyter', 'SQL'].map((tech) => (
                      <span key={tech} className="text-xs px-4 py-2 rounded-full border border-white/10 text-gray-300">{tech}</span>
                    ))}
                  </div>
                </div>
               <div className="pt-6 border-t border-white/5 flex gap-6">
                  <a href="https://github.com/senthamilvalavan/Customer_Behavior_Dashboard" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.39-3.5 4.8 4.8 0 0 0-.12-3.46s-1.14-.36-3.7 1.39a12.1 12.1 0 0 0-7 0C6.27 2.24 5.13 2.6 5.13 2.6a4.8 4.8 0 0 0-.12 3.46A5.2 5.2 0 0 0 3.61 9.5c0 5.22 3 6.42 6 6.76-.7.6-1.09 1.4-1.1 2.44V22"/><path d="M9 20c-4.5 1.5-5-2-7-2"/></svg>
                    Source Code
                  </a>

                  {/* Option: Download PBIX File */}
                  <a href="https://github.com/senthamilvalavan/Customer_Behavior_Dashboard/blob/main/customer_behavior_bi.pbix" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    Download PBIX
                  </a>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* SECOND: Explainable Deepfake Detection */}
            <motion.div variants={springUp} whileHover={{ y: -10 }} className="transition-transform h-full">
              <SpotlightCard className="p-10 h-full">
                <div className="flex-1">
                  <span className="text-xs tracking-widest uppercase text-gray-500 mb-4 block">Core AI Architecture</span>
                  <h4 className="text-2xl font-medium text-white mb-4">Explainable Deepfake Detection</h4>
                  <p className="text-gray-400 font-light leading-relaxed mb-8 text-lg">A custom 6-module architecture achieving 93% classification accuracy by leveraging TensorFlow. Integrated Grad-CAM visualization for XAI capabilities.</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {['Python', 'TensorFlow', 'XAI', 'Computer Vision'].map((tech) => (
                      <span key={tech} className="text-xs px-4 py-2 rounded-full border border-white/10 text-gray-300">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="pt-6 border-t border-white/5 flex gap-6">
                  <a href="https://github.com/senthamilvalavan/Explainable_Deepfake_Detection" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.39-3.5 4.8 4.8 0 0 0-.12-3.46s-1.14-.36-3.7 1.39a12.1 12.1 0 0 0-7 0C6.27 2.24 5.13 2.6 5.13 2.6a4.8 4.8 0 0 0-.12 3.46A5.2 5.2 0 0 0 3.61 9.5c0 5.22 3 6.42 6 6.76-.7.6-1.09 1.4-1.1 2.44V22"/><path d="M9 20c-4.5 1.5-5-2-7-2"/></svg>
                    Source Code
                  </a>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* THIRD: ITI College Web Portal */}
      <motion.div variants={springUp} whileHover={{ y: -10 }} className="transition-transform h-full">
        <SpotlightCard className="p-10 h-full">
          <div className="flex-1">
            <span className="text-xs tracking-widest uppercase text-gray-500 mb-4 block">Client Web Project</span>
            <h4 className="text-2xl font-medium text-white mb-4">ITI College Web Portal</h4>
            <p className="text-gray-400 font-light leading-relaxed mb-8 text-lg">Developed a complete client web portal for an ITI college, focusing on robust database architecture to efficiently structure, store, and manage institutional data.</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Database Design', 'Data Management', 'SQL', 'Web Development'].map((tech) => (
                <span key={tech} className="text-xs px-4 py-2 rounded-full border border-white/10 text-gray-300">{tech}</span>
              ))}
            </div>
          </div>
          <div className="pt-6 border-t border-white/5 flex gap-6">
            <a href="https://www.rkiticollege.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
              Live Demo
            </a>
          </div>
        </SpotlightCard>
      </motion.div>

          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 px-6 max-w-4xl mx-auto text-center border-t border-white/5 relative z-20 bg-[#0a0a0a]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp}>
          <h3 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter uppercase">Let&apos;s Work Together</h3>
          <p className="text-gray-400 mb-12 text-lg font-light max-w-xl mx-auto">Actively seeking full-time Data Analyst or Data Scientist roles.</p>

          <form action="https://formspree.io/f/xredqwne" method="POST" className="mt-8 flex flex-col gap-6 max-w-lg mx-auto text-left w-full mb-16">
            <div className="grid grid-cols-2 gap-6">
              <input type="text" name="name" placeholder="Name" required className="bg-[#111] border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-white/30 transition-colors w-full" />
              <input type="email" name="email" placeholder="Email" required className="bg-[#111] border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-white/30 transition-colors w-full" />
            </div>
            <textarea rows={4} name="message" placeholder="Your Message" required className="bg-[#111] border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-white/30 transition-colors resize-none w-full" />
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors">
              Send Message
            </motion.button>
          </form>

          <div className="flex justify-center gap-10">
            <motion.a whileHover={{ y: -5 }} href="mailto:senthamilvalavan456@gmail.com" className="text-gray-500 hover:text-white transition-colors flex flex-col items-center gap-2 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              Email
            </motion.a>
            <motion.a whileHover={{ y: -5 }} href="https://github.com/senthamilvalavan" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors flex flex-col items-center gap-2 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.39-3.5 4.8 4.8 0 0 0-.12-3.46s-1.14-.36-3.7 1.39a12.1 12.1 0 0 0-7 0C6.27 2.24 5.13 2.6 5.13 2.6a4.8 4.8 0 0 0-.12 3.46A5.2 5.2 0 0 0 3.61 9.5c0 5.22 3 6.42 6 6.76-.7.6-1.09 1.4-1.1 2.44V22"/><path d="M9 20c-4.5 1.5-5-2-7-2"/></svg>
              GitHub
            </motion.a>
            <motion.a whileHover={{ y: -5 }} href="https://www.linkedin.com/in/senthamil-valavan-s/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors flex flex-col items-center gap-2 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </motion.a>
          </div>
        </motion.div>
      </section>

      <footer className="text-center py-8 border-t border-white/5 text-gray-600 text-sm font-light relative z-20 bg-[#0a0a0a]">
        <p>© 2026 Senthamil Valavan S. Built with Next.js & Framer Motion.</p>
      </footer>
    </div>
  );
}
