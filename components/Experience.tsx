
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { MapPin, Calendar, CheckCircle2, Award, BrainCircuit } from 'lucide-react';

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

const experienceData = [
    {
        title: 'Shell-Edunet x AICTE Internship (AI for Green Skills)',
        icon: <Award className="w-8 h-8 text-amber-500" />,
        location: 'Remote',
        date: 'July 2025 – Aug 2025',
        description: 'Selected among nationwide candidates for this AICTE-certified AI internship, mentored by Shell and Edunet Foundation to solve sustainability challenges using AI technologies.',
        responsibilities: [
            'Researched and developed an AI-based prototype addressing real-world environmental challenges.',
            'Attended expert-led mentorship sessions on data modeling, optimization, and project presentation.',
            'Delivered a final project presentation to industry experts, incorporating iterative feedback.',
            'Earned certifications from AICTE, Shell, and Edunet Foundation.',
        ],
        skills: ['AI Model Development', 'Data Preprocessing', 'Visualization', 'Project Prototyping', 'Sustainability Tech', 'Collaborative Learning']
    }
];

export const Experience: React.FC = () => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
            <motion.div variants={cardVariants}>
                <SectionHeader>Experience</SectionHeader>
            </motion.div>
            
            <div className="max-w-4xl mx-auto">
                {experienceData.map((exp, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        className="p-8 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 shadow-lg transition-all duration-300"
                    >
                        <div className="flex flex-col sm:flex-row items-start gap-6">
                             <div className="p-3 bg-accent/10 rounded-full">
                                {exp.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
                                    🏆 {exp.title}
                                </h3>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-slate-500 dark:text-slate-400">
                                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {exp.location}</span>
                                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {exp.date}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pl-0 sm:pl-16">
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                {exp.description}
                            </p>

                            <ul className="mt-6 space-y-3">
                                {exp.responsibilities.map((resp, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="text-green-500 mt-1 flex-shrink-0" />
                                        <span className="text-slate-600 dark:text-slate-300">{resp}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8">
                                <h4 className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200 mb-3">
                                    <BrainCircuit size={18} />
                                    Skills Gained
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {exp.skills.map(skill => (
                                        <span key={skill} className={`px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent`}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};