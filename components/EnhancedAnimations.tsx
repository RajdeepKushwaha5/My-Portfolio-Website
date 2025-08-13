import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Floating particles background component
export const FloatingParticles: React.FC = () => {
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

    useEffect(() => {
        const generateParticles = () => {
            const newParticles = [];
            for (let i = 0; i < 50; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 4 + 1,
                    delay: Math.random() * 5
                });
            }
            setParticles(newParticles);
        };

        generateParticles();
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute bg-accent/20 rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 8 + Math.random() * 4,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

// Magnetic hover effect hook
export const useMagneticEffect = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setPosition({ x: x * 0.1, y: y * 0.1 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return { position, handleMouseMove, handleMouseLeave };
};

// Enhanced button component with magnetic effect
export const MagneticButton: React.FC<{
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
}> = ({ children, className = '', onClick, href }) => {
    const { position, handleMouseMove, handleMouseLeave } = useMagneticEffect();

    const buttonContent = (
        <motion.div
            className={`relative overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                x: position.x,
                y: position.y,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hover opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
                {buttonContent}
            </a>
        );
    }

    return buttonContent;
};

// Scroll-triggered animation component
export const ScrollReveal: React.FC<{
    children: React.ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
}> = ({ children, direction = 'up', delay = 0 }) => {
    const directionOffset = {
        up: { y: 50, x: 0 },
        down: { y: -50, x: 0 },
        left: { y: 0, x: 50 },
        right: { y: 0, x: -50 }
    };

    return (
        <motion.div
            initial={{ 
                opacity: 0, 
                ...directionOffset[direction]
            }}
            whileInView={{ 
                opacity: 1, 
                x: 0, 
                y: 0 
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
                duration: 0.6, 
                delay,
                ease: "easeOut" 
            }}
        >
            {children}
        </motion.div>
    );
};

// Typewriter effect component
export const TypewriterText: React.FC<{
    text: string;
    speed?: number;
    className?: string;
}> = ({ text, speed = 50, className = '' }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed]);

    return (
        <span className={className}>
            {displayText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block w-0.5 h-5 bg-current ml-1"
            />
        </span>
    );
};

// Glitch effect component
export const GlitchText: React.FC<{
    children: React.ReactNode;
    className?: string;
}> = ({ children, className = '' }) => {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 200);
        }, 3000 + Math.random() * 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className={`relative ${className}`}
            animate={isGlitching ? {
                x: [0, -2, 2, -1, 1, 0],
                textShadow: [
                    "0 0 0 transparent",
                    "2px 0 0 #ff0000, -2px 0 0 #00ffff",
                    "0 0 0 transparent"
                ]
            } : {}}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.div>
    );
};

// Code rain effect (Matrix-style)
export const CodeRain: React.FC = () => {
    const [drops, setDrops] = useState<Array<{ id: number; x: number; chars: string; speed: number }>>([]);

    useEffect(() => {
        const characters = '01abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]();<>.,';
        const generateDrops = () => {
            const newDrops = [];
            for (let i = 0; i < 20; i++) {
                const chars = Array.from({ length: 10 }, () => 
                    characters[Math.floor(Math.random() * characters.length)]
                ).join('');
                
                newDrops.push({
                    id: i,
                    x: Math.random() * 100,
                    chars,
                    speed: 2 + Math.random() * 3
                });
            }
            setDrops(newDrops);
        };

        generateDrops();
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 opacity-5">
            {drops.map((drop) => (
                <motion.div
                    key={drop.id}
                    className="absolute font-mono text-accent text-xs"
                    style={{ left: `${drop.x}%` }}
                    initial={{ y: '-100vh' }}
                    animate={{ y: '100vh' }}
                    transition={{
                        duration: 10 / drop.speed,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5
                    }}
                >
                    {drop.chars.split('').map((char, index) => (
                        <div key={index} style={{ opacity: 1 - (index * 0.1) }}>
                            {char}
                        </div>
                    ))}
                </motion.div>
            ))}
        </div>
    );
};
