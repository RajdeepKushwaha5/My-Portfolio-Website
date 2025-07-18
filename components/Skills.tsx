import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
    GitBranch, Database, Cloud, Code, MessageSquare, Briefcase, Link as LinkIcon
} from 'lucide-react';
import { ReactIcon } from './icons/ReactIcon';
import { NextjsIcon } from './icons/NextjsIcon';
import { TypescriptIcon } from './icons/TypescriptIcon';
import { NodejsIcon } from './icons/NodejsIcon';

// Custom-defined icons for a consistent and professional look
const SolidityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
    </svg>
);

const RustIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21.999 10.5h-2.914a.93.93 0 00-.916.836 1.001 1.001 0 00.985 1.164h1.47a3.5 3.5 0 010 7H2.001v-2h15.626a1.5 1.5 0 000-3H5.001L12 3l7 15.5H5.001v2h16.998a5.5 5.5 0 00.001-11z" />
  </svg>
);

const EthereumIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
        <path d="M12 2l-7 10.5 7 2.5 7-2.5L12 2zM5 12.5l7 10 7-10-7-2.5-7 2.5z"></path>
    </svg>
);

const SolanaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
        <path d="M4 14.667h16M4 9.333h16M4 4h16v16H4z"/>
    </svg>
);

const MongoDbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
        <path d="M14.437 2.148c-2.223-.74-4.654-.74-6.877 0C4.332 3.1 2 6.331 2 9.985c0 3.34 1.55 6.258 4.219 8.31a13.353 13.353 0 007.562 2.555c3.34 0 6.438-1.18 8.688-3.375a13.916 13.916 0 003.53-8.625c0-4.04-2.812-7.5-6.562-8.697zM12 18.108c-2.298 0-4.437-.8-6.07-2.187a.84.84 0 01.125-1.332c.36-.211.758-.337 1.172-.337h9.547c.414 0 .813.125 1.172.337a.84.84 0 01.125 1.332C16.438 17.308 14.298 18.108 12 18.108z"></path>
    </svg>
);


const skills = [
    { name: 'React', icon: <ReactIcon className="w-8 h-8 text-sky-400" /> },
    { name: 'Node.js & Express', icon: <NodejsIcon className="w-8 h-8" /> },
    { name: 'TypeScript', icon: <TypescriptIcon className="w-8 h-8" /> },
    { name: 'MongoDB', icon: <MongoDbIcon className="w-8 h-8 text-green-500" /> },
    { name: 'Solidity', icon: <SolidityIcon className="w-8 h-8 text-slate-500" /> },
    { name: 'Rust', icon: <RustIcon className="w-8 h-8 text-orange-600" /> },
    { name: 'Ethereum', icon: <EthereumIcon className="w-8 h-8 text-slate-400" /> },
    { name: 'Solana', icon: <SolanaIcon className="w-8 h-8 text-purple-500" /> },
    { name: 'WebSockets & WebRTC', icon: <MessageSquare className="w-8 h-8 text-rose-500" /> },
    { name: 'RESTful APIs', icon: <Code className="w-8 h-8 text-blue-500" /> },
    { name: 'Git & GitHub', icon: <GitBranch className="w-8 h-8 text-slate-500" /> },
    { name: 'Cloud Deployment', icon: <Cloud className="w-8 h-8 text-cyan-400" /> },
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

export const Skills: React.FC = () => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
             <motion.div variants={cardVariants}>
                 <SectionHeader>Technologies & Skills</SectionHeader>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {skills.map((skill) => (
                    <motion.div
                        key={skill.name}
                        variants={cardVariants}
                        className="group p-6 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/10 dark:hover:bg-slate-800"
                    >
                        <div className="mb-4 transition-transform duration-300 group-hover:-translate-y-1">
                            {skill.icon}
                        </div>
                        <h3 className="text-sm md:text-base font-semibold text-slate-800 dark:text-slate-200">{skill.name}</h3>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};