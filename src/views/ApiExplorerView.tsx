import { useState } from 'react';
import { Terminal, Send, CheckCircle2, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { CodeBlock } from '../components/CodeBlock';

export function ApiExplorerView() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('/api/health');
  const [method, setMethod] = useState<'GET' | 'POST'>('GET');
  const [postBody, setPostBody] = useState<string>('{\n  "title": "New item via API Route"\n}');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);

  const endpoints = [
    { url: '/api/health', name: 'GET /api/health', desc: 'System runtime & Next.js version' },
    { url: '/api/metrics', name: 'GET /api/metrics', desc: 'Server memory & cache performance' },
    { url: '/api/todos', name: 'GET /api/todos', desc: 'In-memory database items' },
    { url: '/api/todos', name: 'POST /api/todos', desc: 'Create new todo item', isPost: true }
  ];

  const handleExecuteRequest = async () => {
    try {
      setLoading(true);
      const start = performance.now();
      const options: RequestInit = {
        method,
        headers: { 'Content-Type': 'application/json' },
      };
      if (method === 'POST') {
        options.body = postBody;
      }

      const res = await fetch(selectedEndpoint, options);
      const duration = Math.round(performance.now() - start);
      setLatency(duration);

      const json = await res.json();
      setResponse({
        status: res.status,
        statusText: res.statusText,
        data: json,
        headers: {
          'content-type': res.headers.get('content-type') || 'application/json',
          'cache-control': res.headers.get('cache-control') || 'no-store',
        }
      });
    } catch (err: any) {
      setResponse({ status: 500, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">
          <Terminal className="w-4 h-4" />
          <span>Next.js Route Handlers (/app/api/.../route.ts)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          API Route Explorer & Tester
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Test Next.js HTTP API endpoints built with Web Request & Response standards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Endpoints Selector & Request Builder */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Select API Endpoint
            </h3>

            <div className="space-y-2">
              {endpoints.map((ep) => (
                <button
                  key={`${ep.url}-${ep.isPost ? 'POST' : 'GET'}`}
                  onClick={() => {
                    setSelectedEndpoint(ep.url);
                    setMethod(ep.isPost ? 'POST' : 'GET');
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-center justify-between ${
                    selectedEndpoint === ep.url && (ep.isPost ? method === 'POST' : method === 'GET')
                      ? 'border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-300 font-bold'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-mono">{ep.name}</span>
                    <p className="text-[11px] font-normal text-slate-500">{ep.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              ))}
            </div>

            {method === 'POST' && (
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  JSON Request Body
                </label>
                <textarea
                  value={postBody}
                  onChange={(e) => setPostBody(e.target.value)}
                  rows={4}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-950 text-amber-300 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            )}

            <button
              onClick={handleExecuteRequest}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Sending Request...' : 'Send HTTP Request'}</span>
            </button>
          </div>
        </div>

        {/* Response Inspector */}
        <div className="lg:col-span-7 space-y-6">
          {response ? (
            <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    HTTP {response.status}
                  </span>
                  <span className="font-mono text-slate-300">{method} {selectedEndpoint}</span>
                </div>
                {latency !== null && (
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {latency} ms
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  JSON Response Body
                </span>
                <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-emerald-300 overflow-x-auto border border-slate-800">
                  <pre>{JSON.stringify(response.data, null, 2)}</pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400 text-center">
              <Terminal className="w-10 h-10 mb-3 opacity-40" />
              <p className="text-xs">Click "Send HTTP Request" to execute the endpoint and view headers & response payload.</p>
            </div>
          )}

          <CodeBlock
            fileName="app/api/route.ts"
            language="typescript"
            code={`// app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    framework: 'Next.js 15 App Router'
  });
}`}
          />
        </div>
      </div>
    </div>
  );
}
