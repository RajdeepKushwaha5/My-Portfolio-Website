import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minimize2, Square } from 'lucide-react';

interface TerminalCommand {
    command: string;
    output: string[] | string;
    type?: 'success' | 'error' | 'info';
}

interface TerminalLine {
    type: 'command' | 'output' | 'error';
    content: string;
    timestamp?: string;
}

const commands: { [key: string]: TerminalCommand } = {
    'help': {
        command: 'help',
        output: [
            'Available commands:',
            '  about      - Learn about Rajdeep',
            '  skills     - View technical skills',
            '  projects   - List all projects',
            '  experience - Show work experience',
            '  contact    - Get contact information',
            '  github     - Open GitHub profile',
            '  linkedin   - Open LinkedIn profile',
            '  clear      - Clear terminal',
            '  exit       - Close terminal',
            '',
            'Type any command to get started!'
        ],
        type: 'info'
    },
    'about': {
        command: 'about',
        output: [
            'Rajdeep Singh Kushwaha',
            '========================',
            'Full Stack Web Developer & Blockchain Enthusiast',
            '',
            'Passionate about building modern, scalable web applications',
            'and exploring cutting-edge blockchain technologies.',
            '',
            'Currently working on AI-powered development tools',
            'and decentralized applications.'
        ],
        type: 'success'
    },
    'skills': {
        command: 'skills',
        output: [
            'Technical Skills:',
            '================',
            '',
            'Frontend:     React, TypeScript, Next.js, Tailwind CSS',
            'Backend:      Node.js, Express.js, MongoDB, RESTful APIs',
            'Blockchain:   Solidity, Rust, Ethereum, Solana',
            'Languages:    JavaScript, Python, C, C++',
            'Tools:        Git, GitHub, Docker, Vercel, Render',
            'AI/ML:        Gemini API, Machine Learning, Data Science',
            '',
            'Always learning new technologies! 🚀'
        ],
        type: 'info'
    },
    'projects': {
        command: 'projects',
        output: [
            'Featured Projects:',
            '==================',
            '',
            '1. UPCODE - Coding & Interview Platform',
            '2. RAG-Visualizer - AI Visualization Tool',
            '3. EV-Adoption-Forecasting - ML Predictions',
            '4. Code-Reviewer - AI Code Analysis',
            '5. AlgoRude - Snarky DSA Tutor',
            '6. AgentVerse - AI Agents Playground',
            '',
            'Visit the projects section to see them all!'
        ],
        type: 'success'
    },
    'experience': {
        command: 'experience',
        output: [
            'Professional Experience:',
            '========================',
            '',
            'Full Stack Developer & Blockchain Enthusiast',
            '• Designing and building modern web applications',
            '• Developing smart contracts and DApps',
            '• Creating AI-powered development tools',
            '• Contributing to open-source projects',
            '',
            'Always eager to take on new challenges!'
        ],
        type: 'info'
    },
    'contact': {
        command: 'contact',
        output: [
            'Contact Information:',
            '===================',
            '',
            'GitHub:    github.com/RajdeepKushwaha5',
            'LinkedIn:  Connect via portfolio',
            'Medium:    Follow for tech articles',
            'X (Twitter): @RajdeepKushwaha5',
            '',
            'Feel free to reach out for collaborations!'
        ],
        type: 'success'
    },
    'clear': {
        command: 'clear',
        output: [''],
        type: 'info'
    }
};

export const Terminal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [currentInput, setCurrentInput] = useState('');
    const [history, setHistory] = useState<TerminalLine[]>([
        {
            type: 'output',
            content: 'Welcome to Rajdeep\'s Interactive Terminal! 🚀',
            timestamp: new Date().toLocaleTimeString()
        },
        {
            type: 'output',
            content: 'Type "help" to see available commands.',
        }
    ]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && !isMinimized && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen, isMinimized]);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const executeCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        const timestamp = new Date().toLocaleTimeString();

        // Add command to history
        setHistory(prev => [...prev, {
            type: 'command',
            content: `$ ${cmd}`,
            timestamp
        }]);

        if (trimmedCmd === 'exit') {
            setIsOpen(false);
            return;
        }

        if (trimmedCmd === 'clear') {
            setHistory([]);
            return;
        }

        if (trimmedCmd === 'github') {
            window.open('https://github.com/RajdeepKushwaha5', '_blank');
            setHistory(prev => [...prev, {
                type: 'output',
                content: 'Opening GitHub profile...'
            }]);
            return;
        }

        if (trimmedCmd === 'linkedin') {
            // Scroll to footer or contact section
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            setHistory(prev => [...prev, {
                type: 'output',
                content: 'Scrolling to contact section...'
            }]);
            return;
        }

        const command = commands[trimmedCmd];
        if (command) {
            const outputs = Array.isArray(command.output) ? command.output : [command.output];
            outputs.forEach(output => {
                setHistory(prev => [...prev, {
                    type: command.type === 'error' ? 'error' : 'output',
                    content: output
                }]);
            });
        } else {
            setHistory(prev => [...prev, {
                type: 'error',
                content: `Command not found: ${cmd}. Type "help" for available commands.`
            }]);
        }

        // Add to command history
        if (trimmedCmd) {
            setCommandHistory(prev => [...prev, trimmedCmd]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentInput.trim()) {
            executeCommand(currentInput);
            setCurrentInput('');
            setHistoryIndex(-1);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setCurrentInput('');
            }
        }
    };

    return (
        <>
            {/* Terminal Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 bg-slate-900 dark:bg-slate-800 text-green-400 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
            >
                <TerminalIcon size={24} />
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Open Terminal
                </span>
            </motion.button>

            {/* Terminal Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 100 }}
                        animate={{ 
                            opacity: 1, 
                            scale: isMinimized ? 0.3 : 1, 
                            y: isMinimized ? 300 : 0 
                        }}
                        exit={{ opacity: 0, scale: 0.8, y: 100 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-6 right-6 z-50 w-96 h-80 bg-slate-900 rounded-lg shadow-2xl border border-slate-700 overflow-hidden"
                    >
                        {/* Terminal Header */}
                        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-slate-300 text-sm font-mono">terminal</span>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="text-slate-400 hover:text-white transition-colors"
                                >
                                    <Minimize2 size={14} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-slate-400 hover:text-white transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Terminal Content */}
                        {!isMinimized && (
                            <div className="h-full flex flex-col">
                                <div
                                    ref={terminalRef}
                                    className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-slate-800"
                                >
                                    {history.map((line, index) => (
                                        <div key={index} className="mb-1">
                                            <span
                                                className={`font-mono text-sm ${
                                                    line.type === 'command'
                                                        ? 'text-green-400'
                                                        : line.type === 'error'
                                                        ? 'text-red-400'
                                                        : 'text-slate-300'
                                                }`}
                                            >
                                                {line.content}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Input Area */}
                                <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-green-400 font-mono text-sm">$</span>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={currentInput}
                                            onChange={(e) => setCurrentInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="flex-1 bg-transparent text-slate-300 font-mono text-sm outline-none"
                                            placeholder="Type a command..."
                                            autoComplete="off"
                                        />
                                    </div>
                                </form>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
