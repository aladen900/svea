import { RouteId } from '../types';
import { NEXT_FEATURES } from '../data/nextjsDocs';
import { CodeBlock } from '../components/CodeBlock';
import { 
  Zap, 
  Layers, 
  Terminal, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Globe, 
  Sparkles,
  Server
} from 'lucide-react';

interface HomeViewProps {
  setActiveRoute: (route: RouteId) => void;
}

export function HomeView({ setActiveRoute }: HomeViewProps) {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 border border-slate-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next.js 15 App Router Environment</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Full-Stack React Framework with Next.js 15
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Experience Next.js App Router, React Server Components (RSC), Server Actions, Edge Middleware, and Route Handlers with real server execution and Gemini AI acceleration.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setActiveRoute('dashboard')}
              className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-lg"
            >
              <span>Explore Dashboard (RSC)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveRoute('server-actions')}
              className="px-6 py-3 rounded-xl bg-slate-800 text-slate-200 hover:text-white font-bold text-sm hover:bg-slate-700 transition-colors flex items-center gap-2 border border-slate-700"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Test Server Actions</span>
            </button>

            <button
              onClick={() => setActiveRoute('ai-assistant')}
              className="px-6 py-3 rounded-xl bg-emerald-500/10 text-emerald-300 font-bold text-sm hover:bg-emerald-500/20 transition-colors flex items-center gap-2 border border-emerald-500/30"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI Component Generator</span>
            </button>
          </div>
        </div>

        {/* Floating Quick Stats */}
        <div className="mt-10 pt-8 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-400">
          <div>
            <span className="block text-slate-500">Routing</span>
            <span className="font-bold text-white text-sm">App Router (app/)</span>
          </div>
          <div>
            <span className="block text-slate-500">Server Paradigm</span>
            <span className="font-bold text-white text-sm">React 19 RSC</span>
          </div>
          <div>
            <span className="block text-slate-500">Mutations</span>
            <span className="font-bold text-white text-sm">Server Actions</span>
          </div>
          <div>
            <span className="block text-slate-500">Full-Stack Server</span>
            <span className="font-bold text-emerald-400 text-sm">Express + Vite Node 22</span>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Next.js 15 Core Pillars
            </h2>
            <p className="text-slate-500 text-sm">
              Discover how Next.js unifies client and server programming models.
            </p>
          </div>
          <button 
            onClick={() => setActiveRoute('structure')}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            Inspect Project Directory Structure &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEXT_FEATURES.map((feature) => (
            <div 
              key={feature.id} 
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${feature.badgeColor}`}>
                    {feature.tag}
                  </span>
                  <Server className="w-4 h-4 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {feature.description}
                </p>
              </div>

              <CodeBlock 
                code={feature.codeSnippet} 
                language="typescript"
                showLineNumbers={false}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Server vs Client Component Diagram */}
      <section className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Server Components vs Client Components
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Understanding when to leverage server execution vs client hydration in Next.js.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Server Component Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/30 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Server Components (RSC)</h4>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Default in App Router</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Zero client-side JavaScript bundle weight</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Direct access to backend resources, databases, and filesystem</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Secret keys and tokens remain strictly on the server</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Automatic code splitting by route segment</span>
              </li>
            </ul>
          </div>

          {/* Client Component Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-blue-500/30 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Client Components</h4>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium font-mono">'use client'</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Add interactive event listeners (onClick, onChange)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Use React state and lifecycle hooks (useState, useEffect)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Access browser APIs (localStorage, geolocation, canvas)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Use custom client React hooks or context providers</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
