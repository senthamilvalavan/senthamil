'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, MouseEvent } from 'react';

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
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] p-6 transition-colors hover:border-white/20 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.08), transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(heroScroll, [0, 0.5], [1, 0]);

  // TS Fix: Added ': any' to bypass strict Vercel type checking
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

  // Fixed Name with Proper Spaces
  const titleName = "Senthamil Valavan S".split("");

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
            {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white hover:scale-110 transition-all">
                {item}
              </a>
            ))}
          </div>
        </div>
      </motion.nav>

      <section ref={heroRef} id="home" className="relative h-screen flex items-center max-w-6xl mx-auto px-6 overflow-hidden">
        <motion.div
          style={{ y: textY, opacity: opacityText }}
          variants={staggerContainer} initial="hidden" animate="visible"
          className="grid md:grid-cols-2 gap-12 items-center w-full z-10"
        >
          <div className="flex flex-col items-start">
            {/* Redesigned Hero Title - Single Line Fixed */}
            <motion.h1 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold tracking-tighter mb-4 flex flex-col">
              {/* ESLint Fix: Changed I'm to I&apos;m */}
              <motion.span variants={springUp} className="text-2xl md:text-3xl text-white/70 mb-2 font-medium tracking-normal">
                Hi, I&apos;m
              </motion.span>
              {/* Force single line using flex-nowrap and whitespace-nowrap */}
              <div className="flex flex-nowrap gap-x-3 md:gap-x-4 overflow-visible whitespace-nowrap">
                {["Senthamil", "Valavan", "S"].map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-flex">
                    {word.split("").map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        variants={letterVariants}
                        className={`${wordIndex === 0 ? 'text-white' : 'text-gray-400'} inline-block`}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </div>
            </motion.h1>

            <motion.h2 variants={springUp} className="text-xl md:text-2xl text-white/80 mb-6 font-light">
              Data Analyst & ML Specialist
            </motion.h2>

            <motion.p variants={springUp} className="text-gray-500 mb-10 leading-relaxed max-w-md text-lg">
              Data Science Lead turning raw data into actionable insights through Explainable AI (XAI) and scalable solutions.
            </motion.p>

            <motion.div variants={springUp} className="flex gap-4">
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#contact" className="px-8 py-3 bg-white text-black rounded-full font-medium shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Hire Me
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#projects" className="px-8 py-3 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-colors">
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
      <section id="about" className="py-32 px-6 max-w-6xl mx-auto border-t border-white/5 relative z-20 bg-[#0a0a0a]">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <motion.h3 variants={springUp} className="text-4xl md:text-5xl font-bold text-white mb-16 uppercase tracking-tighter">About Me</motion.h3>

          <div className="grid md:grid-cols-12 gap-12">
            <motion.div variants={springUp} className="md:col-span-7 space-y-6 text-gray-400 leading-relaxed text-lg font-light">
              <p>I am a final-year B.Tech IT student (Batch of 2026) and a data-driven problem solver with practical experience in building AI solutions.</p>
              <p>As the Data Science Lead at Codeniet, I spearhead our AI and data initiatives. Alongside my startup, I operate as a freelance technical developer under the handle <span className="text-white font-medium">@senthamil_py</span>.</p>
              <p>A major focus of my current work is <span className="text-white font-medium">Explainable AI (XAI)</span>—ensuring that ML models remain transparent and trustworthy.</p>
            </motion.div>

            <motion.div variants={staggerContainer} className="md:col-span-5 flex flex-col gap-4">
              <motion.div variants={springUp} whileHover={{ y: -5, scale: 1.01 }} className="transition-all">
                <SpotlightCard>
                  <h4 className="text-white font-medium mb-1">Data Analysis</h4>
                  <p className="text-sm text-gray-500">Python, SQL, Excel</p>
                </SpotlightCard>
              </motion.div>
              <motion.div variants={springUp} whileHover={{ y: -5, scale: 1.01 }} className="transition-all">
                <SpotlightCard>
                  <h4 className="text-white font-medium mb-1">Machine Learning</h4>
                  <p className="text-sm text-gray-500">Scikit-learn, TensorFlow, XAI</p>
                </SpotlightCard>
              </motion.div>
              <motion.div variants={springUp} whileHover={{ y: -5, scale: 1.01 }} className="transition-all">
                <SpotlightCard>
                  <h4 className="text-white font-medium mb-1">Tools</h4>
                  <p className="text-sm text-gray-500">Power BI, Matplotlib, Cursor AI</p>
                </SpotlightCard>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 max-w-6xl mx-auto border-t border-white/5 relative z-20 bg-[#0a0a0a]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <motion.h3 variants={springUp} className="text-4xl md:text-5xl font-bold text-white mb-20 uppercase tracking-tighter text-left">Experience</motion.h3>

          <div className="space-y-16 max-w-4xl">
            <motion.div variants={springUp} whileHover={{ x: 10 }} className="group border-l border-white/20 pl-8 relative transition-all duration-300">
              <div className="absolute w-3 h-3 bg-white/40 group-hover:bg-white rounded-full -left-[6.5px] top-2 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
              <h4 className="text-2xl font-medium text-white">Data Science Lead</h4>
              <div className="text-gray-500 mb-4 mt-1">Codeniet Startup</div>
              <p className="text-gray-400 font-light leading-relaxed">Spearheading AI and data initiatives. Recently managed and successfully delivered a complete web portal project for an ITI College.</p>
            </motion.div>

            <motion.div variants={springUp} whileHover={{ x: 10 }} className="group border-l border-white/20 pl-8 relative transition-all duration-300">
              <div className="absolute w-3 h-3 bg-white/40 group-hover:bg-white rounded-full -left-[6.5px] top-2 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
              <h4 className="text-2xl font-medium text-white">Freelance Technical Developer</h4>
              <div className="text-gray-500 mb-4 mt-1">@senthamil_py</div>
              <p className="text-gray-400 font-light leading-relaxed">Executing freelance technical projects across multiple platforms. Building adaptability and problem-solving skills.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 max-w-6xl mx-auto border-t border-white/5 relative z-20 bg-[#0a0a0a]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <motion.h3 variants={springUp} className="text-4xl md:text-5xl font-bold text-white mb-16 text-center uppercase tracking-tighter">Selected Works</motion.h3>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={springUp} whileHover={{ y: -10 }} className="transition-transform">
              <SpotlightCard className="p-10 h-full">
                <span className="text-xs tracking-widest uppercase text-gray-500 mb-4 block">Core Project</span>
                <h4 className="text-2xl font-medium text-white mb-4">Deepfake Detection (XAI)</h4>
                <p className="text-gray-400 font-light leading-relaxed mb-8 text-lg">A 6-module architecture using Deep Learning and Grad-CAM. Focused heavily on Explainable AI (XAI).</p>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'TensorFlow', 'XAI'].map((tech) => (
                    <span key={tech} className="text-xs px-4 py-2 rounded-full border border-white/10 text-gray-300">{tech}</span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
            <motion.div variants={springUp} whileHover={{ y: -10 }} className="transition-transform">
              <SpotlightCard className="p-10 h-full">
                <span className="text-xs tracking-widest uppercase text-gray-500 mb-4 block">Client Project</span>
                <h4 className="text-2xl font-medium text-white mb-4">ITI College Web Portal</h4>
                <p className="text-gray-400 font-light leading-relaxed mb-8 text-lg">Delivered a complete web portal for an ITI college, optimizing data flow and client requirements.</p>
                <div className="flex flex-wrap gap-2">
                  {['Project Management', 'Data Flow'].map((tech) => (
                    <span key={tech} className="text-xs px-4 py-2 rounded-full border border-white/10 text-gray-300">{tech}</span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 px-6 max-w-4xl mx-auto text-center border-t border-white/5 relative z-20 bg-[#0a0a0a]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp}>
          {/* ESLint Fix: Changed Let's to Let&apos;s */}
          <h3 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter uppercase">Let&apos;s Talk</h3>
          <p className="text-gray-400 mb-12 text-lg font-light max-w-xl mx-auto">Actively seeking entry-level Data Analyst or Data Scientist roles.</p>
          <div className="flex flex-col items-center gap-10">
            <motion.a whileHover={{ scale: 1.05 }} href="mailto:senthamilvalavan456@gmail.com" className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)]">Get In Touch</motion.a>
            <div className="flex gap-10">
              <motion.a whileHover={{ y: -5 }} href="https://github.com/senthamilvalavan" target="_blank" className="text-gray-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.39-3.5 4.8 4.8 0 0 0-.12-3.46s-1.14-.36-3.7 1.39a12.1 12.1 0 0 0-7 0C6.27 2.24 5.13 2.6 5.13 2.6a4.8 4.8 0 0 0-.12 3.46A5.2 5.2 0 0 0 3.61 9.5c0 5.22 3 6.42 6 6.76-.7.6-1.09 1.4-1.1 2.44V22"/><path d="M9 20c-4.5 1.5-5-2-7-2"/></svg>
              </motion.a>
              <motion.a whileHover={{ y: -5 }} href="https://www.linkedin.com/in/senthamil-valavan-s/" target="_blank" className="text-gray-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="text-center py-8 border-t border-white/5 text-gray-600 text-sm font-light relative z-20 bg-[#0a0a0a]">
        <p>© 2026 Senthamil Valavan S. Built with Next.js & Framer Motion.</p>
      </footer>
    </div>
  );
}
