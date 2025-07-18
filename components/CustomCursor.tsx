
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

export const CustomCursor: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isHoveringText, setIsHoveringText] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            const target = e.target as HTMLElement;
            if (target.closest('a, button, input[type="submit"], .group')) {
                setIsPointer(true);
            } else {
                setIsPointer(false);
            }
            if(target.closest('h1, h2, h3, p')){
                setIsHoveringText(true);
            } else {
                setIsHoveringText(false);
            }
        };

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    const cursorVariants = {
        default: {
            x: position.x - 8,
            y: position.y - 8,
            width: 16,
            height: 16,
            backgroundColor: theme === 'dark' ? '#38bdf8' : '#38bdf8',
            mixBlendMode: 'difference',
        },
        pointer: {
            x: position.x - 16,
            y: position.y - 16,
            width: 32,
            height: 32,
            backgroundColor: theme === 'dark' ? '#f9fafb' : '#111827',
            mixBlendMode: 'difference',
        },
        text: {
            x: position.x - 24,
            y: position.y - 4,
            width: 48,
            height: 8,
            borderRadius: "4px",
            backgroundColor: theme === 'dark' ? '#38bdf8' : '#38bdf8',
            mixBlendMode: 'difference'
        }
    };
    
    let currentVariant = 'default';
    if (isPointer) {
        currentVariant = 'pointer';
    } else if (isHoveringText) {
        currentVariant = 'text';
    }

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full z-[9999] pointer-events-none hidden md:block"
            variants={cursorVariants}
            animate={currentVariant}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
    );
};
