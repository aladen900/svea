import { useState } from 'react';
import { PROJECT_TREE } from '../data/nextjsDocs';
import { NextStructureTree } from '../components/NextStructureTree';
import { FolderTree, BookOpen, Copy, Check, Download } from 'lucide-react';
import { CodeBlock } from '../components/CodeBlock';

export function ProjectStructureView() {
  const [copiedBoilerplate, setCopiedBoilerplate] = useState(false);

  const boilerplateScript = `npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`;

  const handleCopyBoilerplate = () => {
    navigator.clipboard.writeText(boilerplateScript);
    setCopiedBoilerplate(true);
    setTimeout(() => setCopiedBoilerplate(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
          <FolderTree className="w-4 h-4 text-emerald-500" />
          <span>Next.js Directory Architecture</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Next.js App Router File System
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Browse file structures, standard file naming conventions, and layout hierarchies for Next.js 15 projects.
        </p>
      </div>

      {/* Scaffold Command Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
            Create Next.js Project Scaffold Command
          </span>
          <div className="font-mono text-xs text-slate-200 select-all">
            {boilerplateScript}
          </div>
        </div>

        <button
          onClick={handleCopyBoilerplate}
          className="self-start sm:self-center flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors shrink-0"
        >
          {copiedBoilerplate ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">Copied Command</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy CLI Command</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Directory Explorer */}
      <NextStructureTree tree={PROJECT_TREE} />

      {/* App Router File Conventions Reference Table */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-500" />
          <span>App Router Special File Conventions</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Special File</th>
                <th className="py-3 px-4">Execution Context</th>
                <th className="py-3 px-4">Primary Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">layout.tsx</td>
                <td className="py-3 px-4 font-mono">Server Component</td>
                <td className="py-3 px-4">Shared UI shell that preserves state across navigation and wraps child segments.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">page.tsx</td>
                <td className="py-3 px-4 font-mono">Server Component (default)</td>
                <td className="py-3 px-4">Unique page content rendered at a route segment URL.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">loading.tsx</td>
                <td className="py-3 px-4 font-mono">Client/Server Component</td>
                <td className="py-3 px-4">Instant loading fallback UI wrapped in an automatic React Suspense boundary.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-bold text-rose-600 dark:text-rose-400">error.tsx</td>
                <td className="py-3 px-4 font-mono font-mono text-rose-500">'use client'</td>
                <td className="py-3 px-4">Error boundary UI isolating runtime exceptions for a route sub-tree.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-bold text-amber-600 dark:text-amber-400">route.ts</td>
                <td className="py-3 px-4 font-mono">Server Node/Edge</td>
                <td className="py-3 px-4">REST HTTP route handler handling GET, POST, PUT, DELETE requests.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-bold text-purple-600 dark:text-purple-400">middleware.ts</td>
                <td className="py-3 px-4 font-mono">Edge Edge Runtime</td>
                <td className="py-3 px-4">Global edge proxy function intercepting incoming requests before routing.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
