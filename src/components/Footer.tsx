import { RouteId } from '../types';
import { ArrowUpRight, Github, BookOpen, Layers, Terminal } from 'lucide-react';

interface FooterProps {
  setActiveRoute: (route: RouteId) => void;
}

export function Footer({ setActiveRoute }: FooterProps) {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-sm">
                N
              </div>
              <span className="font-bold text-slate-900 dark:text-white">Next.js Framework Workspace</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Full-stack React framework workspace supporting App Router, React Server Components, Server Actions, Edge Middleware, and API routes.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              App Router Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveRoute('dashboard')} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
                  React Server Components <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('server-actions')} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
                  Server Actions & Mutations <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('blog')} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
                  Dynamic Routes & ISR <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Developer Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveRoute('api-explorer')} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
                  API Route Inspector <Terminal className="w-3 h-3 text-slate-400" />
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('ai-assistant')} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
                  Gemini AI Code Generator <Layers className="w-3 h-3 text-slate-400" />
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('structure')} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
                  Project Directory Tree <BookOpen className="w-3 h-3 text-slate-400" />
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Official Resources
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a href="https://nextjs.org/docs" target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
                  Next.js Documentation <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://react.dev" target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
                  React 19 Docs <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© 2026 Next.js Framework Application. Built with React 19, Express, & Tailwind CSS.</p>
          <div className="flex items-center gap-4">
            <span>Server: Active</span>
            <span>·</span>
            <span>Port: 3000</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
