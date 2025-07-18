
import React from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Chatbot } from './components/Chatbot';
import { CustomCursor } from './components/CustomCursor';
import { useTheme } from './hooks/useTheme';
import { Footer } from './components/Footer';
import { AnimatedPet } from './components/AnimatedPet';

const App: React.FC = () => {
    const { theme } = useTheme();

    return (
        <>
            <CustomCursor />
            <div className={`min-h-screen w-full transition-colors duration-500 bg-light dark:bg-dark ${theme}`}>
                <Header />
                <main className="container mx-auto px-6 md:px-12">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.3 } },
                        }}
                    >
                        <section id="home" className="min-h-screen flex items-center">
                            <Hero />
                        </section>
                        <section id="about" className="py-24">
                            <About />
                        </section>
                        <section id="projects" className="py-24">
                            <Projects />
                        </section>
                        <section id="experience" className="py-24">
                            <Experience />
                        </section>
                        <section id="skills" className="py-24">
                            <Skills />
                        </section>
                    </motion.div>
                </main>
                <Footer />
            </div>
            <AnimatedPet />
            <Chatbot />
        </>
    );
};

export default App;