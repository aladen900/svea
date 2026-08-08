export type RouteId = 
  | 'home' 
  | 'dashboard' 
  | 'blog' 
  | 'server-actions' 
  | 'api-explorer' 
  | 'ai-assistant' 
  | 'structure';

export interface NextFeature {
  id: string;
  title: string;
  description: string;
  tag: 'App Router' | 'Server Component' | 'Server Action' | 'API Route' | 'Middleware' | 'Optimization';
  badgeColor: string;
  codeSnippet: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  renderingType: 'SSG' | 'ISR' | 'SSR' | 'Client';
  revalidateSeconds?: number;
}

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface ApiResponse {
  status: number;
  data: any;
  headers: Record<string, string>;
  latencyMs: number;
}

export interface FileTreeNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileTreeNode[];
  content?: string;
  language?: string;
  description?: string;
}

export interface AiGenerationRequest {
  prompt: string;
  type: 'page' | 'component' | 'server-action' | 'api-route' | 'middleware';
  useTailwind: boolean;
  typescript: boolean;
}
