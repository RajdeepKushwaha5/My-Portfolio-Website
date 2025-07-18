import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const NavItem: React.FC<{ href: string, children: React.ReactNode, onClick?: () => void, isMobile?: boolean }> = ({ href, children, onClick, isMobile = false }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({
            behavior: 'smooth'
        });
        if (onClick) {
            onClick();
        }
    };

    const baseClasses = "relative group transition-colors hover:text-accent dark:hover:text-accent";
    // For mobile, use larger, bolder heading font. For desktop, use the default medium sans font.
    const responsiveClasses = isMobile
        ? 'text-3xl font-heading text-slate-800 dark:text-slate-200'
        : 'text-sm font-medium text-slate-600 dark:text-slate-300';

    return (
        <a href={href} onClick={handleClick} className={`${baseClasses} ${responsiveClasses}`}>
            {children}
            {!isMobile && (
                 <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-300"></span>
            )}
        </a>
    );
};


const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </motion.div>
            </AnimatePresence>
        </button>
    );
};

export const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Don't change scroll state if menu is open, to prevent style flicker
            if (!isMenuOpen) {
                setScrolled(window.scrollY > 10);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMenuOpen]);

    // Effect to lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        // Cleanup function to ensure scroll is restored on component unmount
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isMenuOpen]);

    const closeMenu = () => setIsMenuOpen(false);

    const mobileMenuVariants = {
        hidden: { opacity: 0, y: '-100%' },
        visible: { opacity: 1, y: '0%' },
        exit: { opacity: 0, y: '-100%' },
    };

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled || isMenuOpen ? 'py-3 bg-light/80 dark:bg-dark/80 backdrop-blur-sm shadow-md' : 'py-6'
                }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                    <a href="#home" onClick={closeMenu} className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white font-heading z-50">
                        Rajdeep S<span className="text-accent">.</span>
                    </a>
                    <div className="flex items-center space-x-4 md:space-x-8">
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <NavItem href="#about">About</NavItem>
                            <NavItem href="#projects">Projects</NavItem>
                            <NavItem href="#experience">Experience</NavItem>
                            <NavItem href="#skills">Skills</NavItem>
                        </nav>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:inline-block px-4 py-2 text-sm font-medium border rounded-full transition-colors duration-300 border-slate-800 dark:border-slate-200 text-slate-800 dark:text-slate-200 hover:bg-slate-800 hover:text-white dark:hover:bg-slate-200 dark:hover:text-black"
                        >
                            Resume
                        </a>
                        <ThemeToggle />
                        
                        {/* Mobile Menu Button */}
                        <div className="md:hidden z-50">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle menu"
                                className="text-slate-900 dark:text-white"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={isMenuOpen ? 'close' : 'menu'}
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                                    </motion.div>
                                </AnimatePresence>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header>
            
            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed inset-0 top-0 z-40 pt-24 bg-light dark:bg-dark md:hidden"
                    >
                        <nav className="h-full flex flex-col items-center gap-y-8">
                            <NavItem href="#about" onClick={closeMenu} isMobile={true}>About</NavItem>
                            <NavItem href="#projects" onClick={closeMenu} isMobile={true}>Projects</NavItem>
                            <NavItem href="#experience" onClick={closeMenu} isMobile={true}>Experience</NavItem>
                            <NavItem href="#skills" onClick={closeMenu} isMobile={true}>Skills</NavItem>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={closeMenu}
                                className="mt-4 px-6 py-3 text-lg font-medium border rounded-full transition-colors duration-300 border-slate-800 dark:border-slate-200 text-slate-800 dark:text-slate-200 hover:bg-slate-800 hover:text-white dark:hover:bg-slate-200 dark:hover:text-black"
                            >
                                Resume
                            </a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
