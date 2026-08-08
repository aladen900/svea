import { useState } from 'react';
import { Sparkles, Code, Copy, Check, Terminal, Layers, Zap } from 'lucide-react';
import { CodeBlock } from '../components/CodeBlock';

export function AiAssistantView() {
  const [prompt, setPrompt] = useState('Build a clean Next.js 15 analytics widget with metric cards, chart stubs, and dark mode support');
  const [category, setCategory] = useState<'page' | 'component' | 'server-action' | 'api-route' | 'middleware'>('page');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const presetPrompts = [
    { label: 'E-commerce Product Page with Server Actions', prompt: 'Create a Next.js 15 e-commerce product detail page with server action addToCart() and optimistic reviews', cat: 'page' as const },
    { label: 'Type-Safe Auth Middleware', prompt: 'Write an edge middleware.ts that checks for session tokens and redirects unauthenticated users from /dashboard', cat: 'middleware' as const },
    { label: 'Stripe Webhook API Route Handler', prompt: 'Create an app/api/webhooks/stripe/route.ts handler with request signature verification', cat: 'api-route' as const },
    { label: 'Dynamic Blog Post with ISR', prompt: 'Build a blog post page app/blog/[slug]/page.tsx with generateStaticParams and revalidate = 3600', cat: 'page' as const }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim(), type: category }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to generate Next.js code');
      }

      setGeneratedCode(json.result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* View Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Server-Side Gemini AI Code Generator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Next.js AI Scaffold Assistant
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Describe any Next.js page, component, server action, or API route and generate production-ready TypeScript code.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form & Presets */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Target Component Category
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'page', label: 'App Router Page' },
                { id: 'component', label: 'UI Component' },
                { id: 'server-action', label: 'Server Action' },
                { id: 'api-route', label: 'API Route Handler' },
                { id: 'middleware', label: 'Middleware' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id as any)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition-colors ${
                    category === c.id
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-950'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Describe your Next.js requirements
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                placeholder="e.g. Build a pricing page with yearly toggle and feature badges..."
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-md"
            >
              <Sparkles className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Generating Next.js Code...' : 'Generate with Gemini AI'}</span>
            </button>
          </div>

          {/* Quick Presets */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Quick Prompt Starters
            </h4>
            <div className="space-y-2">
              {presetPrompts.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(preset.prompt);
                    setCategory(preset.cat);
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40 text-xs text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <div className="font-semibold">{preset.label}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">{preset.prompt}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Code Output Panel */}
        <div className="lg:col-span-7 space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs">
              <strong>Generation Error:</strong> {error}
            </div>
          )}

          {generatedCode ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Generated Next.js {category.toUpperCase()} Code
                </span>
              </div>
              <CodeBlock
                code={generatedCode}
                language="typescript"
                fileName={`generated-${category}.tsx`}
              />
            </div>
          ) : (
            <div className="p-12 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400 text-center">
              <Code className="w-12 h-12 mb-3 opacity-40" />
              <p className="text-sm font-medium">Click "Generate with Gemini AI" to stream AI-generated Next.js 15 component code.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
