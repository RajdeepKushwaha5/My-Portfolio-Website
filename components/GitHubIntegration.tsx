import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, GitCommit, Calendar, Star, GitBranch, Activity } from 'lucide-react';

interface GitHubStats {
    publicRepos: number;
    followers: number;
    following: number;
    totalStars: number;
    lastCommit?: string;
    isLoading: boolean;
}

interface Repository {
    name: string;
    description: string;
    language: string;
    stars: number;
    url: string;
    updated_at: string;
}

interface CommitActivity {
    date: string;
    count: number;
}

export const GitHubIntegration: React.FC = () => {
    const [stats, setStats] = useState<GitHubStats>({
        publicRepos: 0,
        followers: 0,
        following: 0,
        totalStars: 0,
        isLoading: true
    });
    const [recentRepos, setRecentRepos] = useState<Repository[]>([]);
    const [commitActivity, setCommitActivity] = useState<CommitActivity[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Mock data for demonstration (replace with real API calls when you have GitHub token)
    const mockStats: GitHubStats = {
        publicRepos: 25,
        followers: 120,
        following: 85,
        totalStars: 340,
        lastCommit: '2 hours ago',
        isLoading: false
    };

    const mockRepos: Repository[] = [
        {
            name: 'UPCODE',
            description: 'A comprehensive coding and interview platform',
            language: 'TypeScript',
            stars: 45,
            url: 'https://github.com/RajdeepKushwaha5/UPCODE',
            updated_at: '2025-01-13T10:30:00Z'
        },
        {
            name: 'RAG-Visualizer',
            description: 'Interactive visualization for RAG systems',
            language: 'React',
            stars: 32,
            url: 'https://github.com/RajdeepKushwaha5/rag-visualizer',
            updated_at: '2025-01-12T15:45:00Z'
        },
        {
            name: 'Code-Reviewer',
            description: 'AI-powered code review tool',
            language: 'JavaScript',
            stars: 28,
            url: 'https://github.com/RajdeepKushwaha5/Code-Reviewer',
            updated_at: '2025-01-11T09:20:00Z'
        }
    ];

    // Generate mock commit activity for the last 30 days
    const generateMockCommitActivity = (): CommitActivity[] => {
        const activity: CommitActivity[] = [];
        const today = new Date();
        
        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const count = Math.floor(Math.random() * 8); // Random commits 0-7
            activity.push({
                date: date.toISOString().split('T')[0],
                count
            });
        }
        return activity;
    };

    useEffect(() => {
        // Simulate API loading
        const timer = setTimeout(() => {
            setStats(mockStats);
            setRecentRepos(mockRepos);
            setCommitActivity(generateMockCommitActivity());
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const getLanguageColor = (language: string): string => {
        const colors: { [key: string]: string } = {
            'TypeScript': '#3178c6',
            'JavaScript': '#f1e05a',
            'React': '#61dafb',
            'Python': '#3776ab',
            'Java': '#b07219',
            'C++': '#f34b7d',
            'Rust': '#dea584'
        };
        return colors[language] || '#6b7280';
    };

    const formatTimeAgo = (dateString: string): string => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
        
        if (diffInHours < 24) {
            return `${diffInHours}h ago`;
        } else {
            const diffInDays = Math.floor(diffInHours / 24);
            return `${diffInDays}d ago`;
        }
    };

    const getCommitIntensity = (count: number): string => {
        if (count === 0) return 'bg-slate-700';
        if (count <= 2) return 'bg-green-900';
        if (count <= 4) return 'bg-green-700';
        if (count <= 6) return 'bg-green-500';
        return 'bg-green-400';
    };

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-600 dark:text-red-400">Failed to load GitHub data: {error}</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <Github className="text-slate-600 dark:text-slate-300" size={24} />
                    <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                        GitHub Activity
                    </h3>
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-2 h-2 bg-green-500 rounded-full"
                    />
                </div>
                <a
                    href="https://github.com/RajdeepKushwaha5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-hover transition-colors"
                >
                    View Profile →
                </a>
            </div>

            {stats.isLoading ? (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 animate-pulse">
                                <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded mb-2"></div>
                                <div className="h-6 bg-slate-300 dark:bg-slate-600 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 text-center"
                        >
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                {stats.publicRepos}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Repositories</div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 text-center"
                        >
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                {stats.followers}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Followers</div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 text-center"
                        >
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                {stats.totalStars}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Stars</div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 text-center"
                        >
                            <div className="flex items-center justify-center mb-1">
                                <Activity size={16} className="text-green-500 mr-1" />
                                <span className="text-green-500 font-semibold">Active</span>
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">{stats.lastCommit}</div>
                        </motion.div>
                    </div>

                    {/* Commit Activity Heatmap */}
                    <div>
                        <h4 className="font-medium text-slate-900 dark:text-white mb-3 flex items-center">
                            <GitCommit size={16} className="mr-2" />
                            Commit Activity (Last 30 days)
                        </h4>
                        <div className="grid grid-cols-10 gap-1">
                            {commitActivity.map((day, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: index * 0.01 }}
                                    className={`w-3 h-3 rounded-sm ${getCommitIntensity(day.count)} relative group cursor-pointer`}
                                    title={`${day.date}: ${day.count} commits`}
                                >
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                        {day.date}: {day.count} commits
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                            <span>Less</span>
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-slate-700 rounded-sm"></div>
                                <div className="w-2 h-2 bg-green-900 rounded-sm"></div>
                                <div className="w-2 h-2 bg-green-700 rounded-sm"></div>
                                <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                                <div className="w-2 h-2 bg-green-400 rounded-sm"></div>
                            </div>
                            <span>More</span>
                        </div>
                    </div>

                    {/* Recent Repositories */}
                    <div>
                        <h4 className="font-medium text-slate-900 dark:text-white mb-3 flex items-center">
                            <GitBranch size={16} className="mr-2" />
                            Recent Repositories
                        </h4>
                        <div className="space-y-3">
                            {recentRepos.map((repo, index) => (
                                <motion.a
                                    key={repo.name}
                                    href={repo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="block p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="font-medium text-slate-900 dark:text-white">
                                                {repo.name}
                                            </div>
                                            <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                {repo.description}
                                            </div>
                                            <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                                                <span className="flex items-center">
                                                    <span
                                                        className="w-2 h-2 rounded-full mr-1"
                                                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                                                    ></span>
                                                    {repo.language}
                                                </span>
                                                <span className="flex items-center">
                                                    <Star size={12} className="mr-1" />
                                                    {repo.stars}
                                                </span>
                                                <span className="flex items-center">
                                                    <Calendar size={12} className="mr-1" />
                                                    {formatTimeAgo(repo.updated_at)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};
