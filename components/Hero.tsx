import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        },
    },
};

export const Hero: React.FC = () => {
    const handleScrollToProjects = () => {
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.div
            className="w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="relative max-w-4xl mx-auto text-center">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-64 bg-accent/10 dark:bg-accent/20 blur-3xl rounded-full -z-10 animate-gradient-x"></div>
                <motion.h1
                    className="font-heading text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-slate-900 dark:text-white"
                    variants={itemVariants}
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-700 via-slate-900 to-black dark:from-slate-300 dark:via-slate-100 dark:to-white animate-text-shine bg-[200%_auto]">
                        Full Stack & Blockchain
                    </span>
                    <br />
                    Developer.
                </motion.h1>
                <motion.p
                    className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300"
                    variants={itemVariants}
                >
                    I design and build modern, responsive, and scalable web applications that bridge creativity and functionality.
                </motion.p>
                <motion.div
                    className="mt-10 flex justify-center"
                    variants={itemVariants}
                >
                    <button
                        onClick={handleScrollToProjects}
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-full overflow-hidden transition-transform duration-300 hover:scale-105"
                    >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-sky-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                        <span className="relative flex items-center">
                            View My Work
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
};