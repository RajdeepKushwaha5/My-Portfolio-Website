
export interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
    tags: string[];
    liveUrl?: string;
    codeUrl: string;
}

export interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}