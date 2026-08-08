import { useState, useEffect } from 'react';
import { RefreshCw, Activity, Server, Cpu, Database, ShieldCheck, Zap } from 'lucide-react';

export function DashboardView() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [revalidating, setRevalidating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchMetrics = async () => {
    try {
      setRevalidating(true);
      const res = await fetch('/api/metrics');
      const data = await res.json();
      setMetrics(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Failed to fetch server metrics', err);
    } finally {
      setLoading(false);
      setRevalidating(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            <Server className="w-4 h-4" />
            <span>Server Component Execution Segment (/app/dashboard)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Next.js Executive Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Demonstrating server-side data fetching with revalidation (<code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">revalidatePath('/dashboard')</code>).
          </p>
        </div>

        <button
          onClick={fetchMetrics}
          disabled={revalidating}
          className="self-start sm:self-center flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-sm disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${revalidating ? 'animate-spin text-emerald-400' : ''}`} />
          <span>{revalidating ? 'Revalidating Cache...' : 'Trigger revalidatePath()'}</span>
        </button>
      </div>

      {/* Metrics Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
              <span>Server Render Time</span>
              <Cpu className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              {metrics?.serverRenderTimeMs} <span className="text-sm font-normal text-slate-500">ms</span>
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
              ⚡ Zero Client JS Hydration Overhead
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
              <span>Cache Hit Ratio</span>
              <Database className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              {metrics?.cacheHitRate}
            </div>
            <div className="text-[11px] text-slate-500 mt-2">
              Incremental Static Revalidation
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
              <span>Heap Memory Usage</span>
              <Activity className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              {metrics?.memoryUsageMB} <span className="text-sm font-normal text-slate-500">MB</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-2">
              Node.js Memory Footprint
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
              <span>Server Component Ratio</span>
              <ShieldCheck className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              70% <span className="text-sm font-normal text-slate-500">RSC</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-2">
              {metrics?.serverComponentsCount} Server / {metrics?.clientComponentsCount} Client Components
            </div>
          </div>
        </div>
      )}

      {/* Streaming & Suspense Demo */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Streaming SSR with React Suspense Boundary
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              In Next.js 15, dynamic components stream HTML chunks to the browser progressively as promises resolve.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">Last revalidated: {lastUpdated || 'Just now'}</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
          <pre>{`// app/dashboard/page.tsx
import { Suspense } from 'react';
import { MetricsWidget } from './MetricsWidget';

export default async function Dashboard() {
  return (
    <section>
      <h1>Executive Overview</h1>
      <Suspense fallback={<MetricsSkeleton />}>
        <MetricsWidget /> {/* Async Server Component fetches directly from DB */}
      </Suspense>
    </section>
  );
}`}</pre>
        </div>
      </div>
    </div>
  );
}
