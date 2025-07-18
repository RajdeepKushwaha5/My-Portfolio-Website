
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CatSvg: React.FC = () => {
    // A cohesive and cute color palette for our calico cat.
    const colors = {
        body: '#f8fafc',       // slate-50 (White)
        patchOrange: '#fb923c',// orange-400
        patchGray: '#64748b',  // slate-500
        eyes: '#1e293b',       // slate-800
        nose: '#f472b6',       // pink-400
        earsInner: '#fbcfe8',  // pink-200
        stroke: '#475569',     // slate-600, for subtle outlines
    };

    return (
        // The viewBox defines the coordinate system for the SVG.
        // strokeLinecap and strokeLinejoin make lines look smoother.
        <svg viewBox="0 0 80 64" className="cat-svg" style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}>
            <g className="cat-body-group">
                {/* --- Parts are drawn from back to front for correct layering --- */}

                {/* 1. Tail (drawn first to be behind everything) */}
                <path
                    className="cat-tail"
                    d="M25 45 Q 15 55, 10 40" // A nice swoosh path for the tail
                    stroke={colors.patchOrange}
                    strokeWidth="4"
                    fill="none"
                />

                {/* 2. Back legs (partially obscured by the body) */}
                <g className="cat-leg cat-leg-back-2" style={{ transformOrigin: '35px 45px' }}>
                    <path d="M35 45 V 58 L 30 58" stroke={colors.body} strokeWidth="8" />
                </g>
                <g className="cat-leg cat-leg-front-2" style={{ transformOrigin: '55px 45px' }}>
                    <path d="M55 45 V 58 L 50 58" stroke={colors.body} strokeWidth="8" />
                </g>

                {/* 3. Main Body */}
                <ellipse cx="45" cy="45" rx="20" ry="13" fill={colors.body} stroke={colors.stroke} strokeWidth="0.5" />
                {/* Patches on the body for calico look */}
                <path d="M35,40 C 40,35, 50,35, 55,42" fill="none" stroke={colors.patchGray} strokeWidth="6" />
                <circle cx="30" cy="48" r="5" fill={colors.patchOrange} />

                {/* 4. Head group */}
                <g className="cat-head" style={{ transformOrigin: '65px 30px' }}>
                    <circle cx="65" cy="30" r="12" fill={colors.body} stroke={colors.stroke} strokeWidth="0.5" />
                    <path d="M75,22 a 5,5 0 0,1 -10,5" fill={colors.patchOrange} />
                    {/* Ears with inner color */}
                    <path d="M58,20 L53,12 L63,18 Z" fill={colors.body} stroke={colors.stroke} strokeWidth="0.5"/>
                    <path d="M57,18 L53,12 L59,17 Z" fill={colors.earsInner} />
                    <path d="M72,20 L77,12 L67,18 Z" fill={colors.body} stroke={colors.stroke} strokeWidth="0.5"/>
                    <path d="M73,18 L77,12 L71,17 Z" fill={colors.earsInner} />
                    {/* Eyes and nose */}
                    <circle cx="62" cy="28" r="1.5" fill={colors.eyes} />
                    <circle cx="72" cy="28" r="1.5" fill={colors.eyes} />
                    <path d="M67,33 l-1.5,1.5 l3,0 Z" fill={colors.nose} />
                </g>

                {/* 5. Front legs (drawn last to be on top) */}
                <g className="cat-leg cat-leg-back-1" style={{ transformOrigin: '40px 45px' }}>
                    <path d="M40 45 V 60 L 35 60" stroke={colors.body} strokeWidth="8" />
                </g>
                {/* This front paw has the hoverable class */}
                <g className="cat-leg cat-leg-front-1 cat-front-paw-hoverable" style={{ transformOrigin: '60px 45px' }}>
                    <path d="M60 45 V 60 L 55 60" stroke={colors.body} strokeWidth="8" />
                </g>
            </g>
        </svg>
    );
};


export const AnimatedPet: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Appear after 1.5 seconds
        const startTimeout = setTimeout(() => {
            setIsVisible(true);
        }, 1500);

        // Disappear after animation completes twice
        // Animation duration is 15s per run * 2 runs + 1.5s initial delay
        const endTimeout = setTimeout(() => {
            setIsVisible(false);
        }, 31500); 

        return () => {
            clearTimeout(startTimeout);
            clearTimeout(endTimeout);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="pet-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <CatSvg />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
