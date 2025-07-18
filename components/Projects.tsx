
import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { ExternalLink, Github, Code } from 'lucide-react';
import type { Project } from '../types';

const projectsData: Project[] = [
    {
        id: 1,
        title: 'AlgoRude - The Snarky DSA Tutor',
        description: 'An interactive DSA tutor powered by the Gemini API that provides snarky yet helpful feedback to help you learn.',
        tags: ['React', 'Gemini API', 'AI', 'Vite'],
        liveUrl: 'https://coruscating-baklava-240419.netlify.app/',
        codeUrl: 'https://github.com/RajdeepKushwaha5/AlgoRude---The-Snarky-DSA-Tutor',
    },
    {
        id: 2,
        title: 'AgentVerse',
        description: 'A playground for autonomous AI agents. Experiment with different agent configurations and watch them interact.',
        tags: ['React', 'AI Agents', 'Vercel'],
        liveUrl: 'https://agent-verse-4bdpqrfci-moron3753-gmailcoms-projects.vercel.app/',
        codeUrl: 'https://github.com/RajdeepKushwaha5/AgentVerse',
    },
    {
        id: 3,
        title: 'Weather App',
        description: 'A clean and simple weather application that provides real-time weather data for any location using a third-party API.',
        tags: ['JavaScript', 'HTML', 'CSS', 'API'],
        liveUrl: 'https://remarkable-cendol-df62af.netlify.app/',
        codeUrl: 'https://github.com/RajdeepKushwaha5/Weather_App',
    },
    {
        id: 4,
        title: 'Blog Website',
        description: 'A classic, responsive blog website template built with fundamental web technologies. Perfect for personal or project blogs.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        liveUrl: 'https://rajdeepkushwaha5.github.io/Hackathon_Project_Blog_Website/',
        codeUrl: 'https://github.com/RajdeepKushwaha5/Hackathon_Project_Blog_Website',
    },
    {
        id: 5,
        title: 'WTF Were We Thinking',
        description: 'A fun, quirky browser-based game developed with pure JavaScript, HTML, and CSS. A testament to creative coding.',
        tags: ['JavaScript', 'HTML', 'CSS', 'Game'],
        liveUrl: 'https://rajdeepkushwaha5.github.io/WTF-Were-We-Thinking/',
        codeUrl: 'https://github.com/RajdeepKushwaha5/WTF-Were-We-Thinking',
    },
    {
        id: 6,
        title: 'Python Projects',
        description: 'A collection of three diverse projects built with Python, showcasing versatility in scripting and application development.',
        tags: ['Python'],
        codeUrl: 'https://github.com/RajdeepKushwaha5/3_Python_Projects',
    },
    {
        id: 7,
        title: 'DriftNotes',
        description: 'A mobile note-taking application concept, designed to be simple, fast, and intuitive for users on the go.',
        tags: ['React Native', 'Mobile'],
        codeUrl: 'https://github.com/RajdeepKushwaha5/DriftNotes',
    },
    {
        id: 8,
        title: 'HTML & CSS Project',
        description: 'A showcase of foundational web development skills, featuring a static website built with semantic HTML and modern CSS.',
        tags: ['HTML', 'CSS', 'Frontend'],
        liveUrl: 'https://rajdeepkushwaha5.github.io/HTML_and_CSS_PROJECT/',
        codeUrl: 'https://github.com/RajdeepKushwaha5/HTML_and_CSS_PROJECT',
    },
];

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white mb-16 text-center">
        {children}
    </h2>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    // Only set the iframe src on hover to save bandwidth and resources
    const iframeSrc = useRef<string | undefined>(undefined);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered && project.liveUrl && !iframeSrc.current) {
            iframeSrc.current = project.liveUrl;
        }
    }, [isHovered, project.liveUrl]);

    return (
        <motion.div
            variants={cardVariants}
            className="group relative rounded-xl overflow-hidden bg-white dark:bg-slate-800/50 shadow-lg hover:shadow-2xl dark:hover:shadow-accent/20 transition-all duration-500 border border-slate-200 dark:border-slate-700/50 h-96 flex flex-col justify-end"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Layer (Iframe or Placeholder) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                {project.liveUrl ? (
                    <>
                        {/* Static colored background before hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30 transition-opacity duration-300 group-hover:opacity-0" />
                        {/* Iframe for live preview, src is set on first hover */}
                        <iframe
                            src={iframeSrc.current}
                            className="w-full h-full transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                            title={project.title}
                            loading="lazy"
                            sandbox="allow-scripts allow-same-origin"
                        />
                        {/* Dark overlay for text readability on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                ) : (
                    /* Fallback for projects without a live URL */
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                        <Code size={48} className="text-slate-400 dark:text-slate-600" />
                    </div>
                )}
            </div>

            {/* Content Layer */}
            <div className="relative p-6 z-10 w-full flex flex-col justify-end flex-grow">
                <div>
                    <h3 className={`font-heading text-xl font-bold text-slate-900 dark:text-white transition-colors duration-300 ${project.liveUrl ? 'group-hover:text-white' : ''}`}>{project.title}</h3>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags.map(tag => (
                            <span key={tag} className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
                                project.liveUrl ? 'bg-white/10 text-slate-300 group-hover:bg-white/20 group-hover:text-white' : 'bg-accent/10 text-accent'
                            }`}>{tag}</span>
                        ))}
                    </div>
                </div>

                <div className="mt-4 transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-48 group-hover:opacity-100">
                    <p className={`text-sm leading-relaxed text-slate-600 dark:text-slate-300 ${project.liveUrl ? 'text-slate-200' : ''}`}>
                        {project.description}
                    </p>
                    {/* Links - appear on hover */}
                    <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-slate-200/20">
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-white hover:underline pointer-events-auto">
                                <ExternalLink size={16} className="mr-2" />
                                Live Demo
                            </a>
                        )}
                        {project.codeUrl && (
                            <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center text-sm font-medium hover:underline pointer-events-auto ${project.liveUrl ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                                <Github size={16} className="mr-2" />
                                Source Code
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}


export const Projects: React.FC = () => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
            <motion.div variants={cardVariants}>
                 <SectionHeader>Featured Projects</SectionHeader>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
        </motion.div>
    );
};