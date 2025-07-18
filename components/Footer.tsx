import React from 'react';
import { Github } from 'lucide-react';
import { XIcon } from './icons/XIcon';
import { LinkedinIcon } from './icons/LinkedinIcon';
import { MediumIcon } from './icons/MediumIcon';

const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/RajdeepKushwaha5' },
    { name: 'LinkedIn', icon: LinkedinIcon, url: 'https://www.linkedin.com/in/rajdeep-singh-b658a833a/' },
    { name: 'X', icon: XIcon, url: 'https://x.com/rajdeeptwts' },
    { name: 'Medium', icon: MediumIcon, url: 'https://medium.com/@rajdeep01' },
];

const SocialIcon: React.FC<{ icon: React.ElementType, url: string, name: string }> = ({ icon: Icon, url, name }) => (
    <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={name}
        className="text-slate-500 dark:text-slate-400 hover:text-accent dark:hover:text-accent transition-colors duration-300"
    >
        <Icon className="w-6 h-6" />
    </a>
);

export const Footer: React.FC = () => {
    return (
        <footer className="bg-light dark:bg-dark border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-6 md:px-12 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">Let's Connect</h3>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">
                            Have a project in mind? Let's build something amazing together.
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        {socialLinks.map(link => (
                            <SocialIcon key={link.name} icon={link.icon} url={link.url} name={link.name} />
                        ))}
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>Designed & Built by Rajdeep Singh Kushwaha &copy; {new Date().getFullYear()}</p>
                </div>
            </div>
        </footer>
    );
};