
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageSquare, Send, X, Loader2 } from 'lucide-react';
import type { ChatMessage } from '../types';
import { createChat } from '../services/geminiService';
import type { Chat } from '@google/genai';

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isModel = message.role === 'model';
    return (
        <div className={`flex items-end gap-2 ${isModel ? 'justify-start' : 'justify-end'}`}>
            {isModel && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white"><Bot size={20} /></div>}
            <div
                className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${isModel
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'
                        : 'bg-accent text-white rounded-br-none'
                    }`}
            >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            </div>
        </div>
    );
};


export const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', content: "Hi! I'm Vision, Rajdeep's AI assistant. Ask me anything about his skills or projects!" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chatRef.current) {
            chatRef.current = createChat();
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: ChatMessage = { role: 'user', content: input.trim() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Add a placeholder for the model's response
        setMessages(prev => [...prev, { role: 'model', content: '' }]);

        try {
            const stream = await chatRef.current.sendMessageStream({ message: userMessage.content });
            for await (const chunk of stream) {
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content += chunk.text;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Gemini API error:", error);
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].content = "Sorry, I'm having a little trouble connecting. Please try again later.";
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-accent hover:bg-accent-hover text-white flex items-center justify-center shadow-xl z-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle Chat"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isOpen ? 'close' : 'open'}
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
                    </motion.div>
                </AnimatePresence>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed bottom-24 right-6 w-[calc(100%-3rem)] sm:w-96 h-[60vh] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-slate-200 dark:border-slate-700"
                    >
                        <header className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white flex-shrink-0">
                                <Bot size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">Vision Assistant</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Powered by Gemini</p>
                            </div>
                        </header>

                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            {messages.map((msg, i) => <ChatBubble key={i} message={msg} />)}
                             {isLoading && messages[messages.length-1].role === 'user' && (
                                <div className="flex justify-start">
                                    <Loader2 className="w-5 h-5 text-slate-500 animate-spin" />
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about projects..."
                                className="flex-1 w-full px-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-full focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                                disabled={isLoading}
                            />
                            <button type="submit" disabled={isLoading || !input.trim()} className="w-10 h-10 flex-shrink-0 rounded-full bg-accent text-white flex items-center justify-center disabled:bg-slate-400 dark:disabled:bg-slate-600 transition-colors">
                                <Send size={20} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};