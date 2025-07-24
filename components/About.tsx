
import React from 'react';
import { motion, Variants } from 'framer-motion';

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white mb-12 text-center">
        {children}
    </h2>
);

const aboutVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    }
};

export const About: React.FC = () => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
            <motion.div variants={aboutVariants}>
                <SectionHeader>About Me</SectionHeader>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                <motion.div
                    className="md:col-span-1 flex justify-center"
                    variants={aboutVariants}
                >
                    <div className="relative w-64 h-64">
                         <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-purple-600 rounded-full blur-xl opacity-50"></div>
<img
  src="filnal_image.png"
  alt="GitHub Logo"
  className="relative w-full h-full object-cover rounded-full shadow-2xl border-4 border-white dark:border-slate-800"
/>


                    </div>
                </motion.div>
                <motion.div className="md:col-span-2 text-lg text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed" variants={aboutVariants}>
                    <p>
                        Hi, I'm Rajdeep Singh Kushwaha — a Full Stack Web Developer and Blockchain Enthusiast passionate about bridging creativity and functionality. I design and build modern, responsive, and scalable web applications from the ground up.
                    </p>
                    <p>
                        With a solid foundation in both front-end and back-end development, I specialize in delivering clean code, seamless user experiences, and production-ready solutions. My expertise spans across the MERN stack to the depths of blockchain technologies like Ethereum and Solana.
                    </p>
                    <p>
                        I’m driven by the thrill of building real-world applications, constantly learning emerging technologies, and contributing to impactful digital experiences. Whether it's a real-time chat app, an e-commerce platform, or a decentralized application (dApp), I love turning ideas into reliable products.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};
