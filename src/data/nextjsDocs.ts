import { FileTreeNode, NextFeature, BlogPost } from '../types';

export const NEXT_FEATURES: NextFeature[] = [
  {
    id: 'rsc',
    title: 'React Server Components (RSC)',
    description: 'Render components on the server for zero client bundle size, direct database access, and enhanced performance.',
    tag: 'Server Component',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    codeSnippet: `// app/users/page.tsx (Server Component by default)
import { db } from '@/lib/db';

export default async function UsersPage() {
  // Direct server-side database access - no API route needed!
  const users = await db.user.findMany();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Users Directory</h1>
      <ul>
        {users.map(user => (
          <li key={user.id} className="py-2 border-b">{user.name}</li>
        ))}
      </ul>
    </main>
  );
}`
  },
  {
    id: 'server-actions',
    title: 'Server Actions & Mutations',
    description: 'Asynchronous functions executed on the server, invokable directly from Client or Server Components.',
    tag: 'Server Action',
    badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    codeSnippet: `// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  await db.post.create({ data: { title, content } });
  
  // Instantly update cached server-rendered pages
  revalidatePath('/blog');
}`
  },
  {
    id: 'app-router',
    title: 'App Router File-Based Routing',
    description: 'Intuitive file-system routing supporting nested layouts, error boundaries, loading UIs, and route groups.',
    tag: 'App Router',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    codeSnippet: `// Directory layout:
// app/
// ├── layout.tsx       (Root Layout)
// ├── page.tsx         (Home Page "/")
// ├── loading.tsx      (Streaming Suspense Boundary)
// ├── error.tsx        (Client Error Boundary)
// └── dashboard/
//     ├── page.tsx     ("/dashboard")
//     └── settings/
//         └── page.tsx ("/dashboard/settings")`
  },
  {
    id: 'api-routes',
    title: 'Route Handlers (API Routes)',
    description: 'Build custom HTTP endpoint handlers using standard Web Request and Response objects.',
    tag: 'API Route',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    codeSnippet: `// app/api/data/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  return NextResponse.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    query: query || null,
  });
}`
  },
  {
    id: 'middleware',
    title: 'Edge Middleware',
    description: 'Execute code before a request is completed to modify responses, redirect, or validate authentication cookies.',
    tag: 'Middleware',
    badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    codeSnippet: `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};`
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    slug: 'mastering-nextjs-15-app-router',
    title: 'Mastering Next.js 15: App Router & React 19',
    excerpt: 'Explore async request APIs, partial prerendering, improved caching defaults, and Server Actions in Next.js 15.',
    content: `Next.js 15 brings significant refinements to full-stack web development. With native support for React 19, async Request APIs (cookies, headers, params), and un-cached fetch by default, building predictable and resilient web applications is easier than ever.

Key highlights include:
1. **Un-cached Fetch Requests**: GET requests and fetch calls are uncached by default, reducing confusing stale data bugs.
2. **React 19 Integration**: Native useActionState, useOptimistic, and improved hydration errors.
3. **Partial Prerendering (PPR)**: Combining static shell layouts with dynamic streaming holes in a single HTTP request.
4. **Enhanced Turbopack**: Blazing fast cold start and HMR compile times.`,
    date: 'July 24, 2026',
    readTime: '4 min read',
    renderingType: 'SSG',
    revalidateSeconds: 3600
  },
  {
    slug: 'optimizing-server-components-performance',
    title: 'Patterns for High-Performance React Server Components',
    excerpt: 'How to structure your component trees to minimize server render times and isolate client side interactivity.',
    content: `React Server Components (RSC) shift the mental model of React from client-side rendering to server-driven architectures.

When building Next.js apps:
- Push \`'use client'\` boundaries down as far as possible in the component tree.
- Fetch data where it is consumed instead of passing props through 5 layers.
- Wrap dynamic async components in \`<Suspense>\` for progressive streaming hydration.
- Utilize \`React.memo\` or granular state management inside client components.`,
    date: 'July 20, 2026',
    readTime: '6 min read',
    renderingType: 'ISR',
    revalidateSeconds: 60
  },
  {
    slug: 'building-type-safe-server-actions',
    title: 'Type-Safe Mutations with Server Actions & Zod',
    excerpt: 'Learn how to validate form inputs, handle errors gracefully, and maintain strong end-to-end TypeScript types.',
    content: `Server Actions streamline full-stack data mutations without boilerplate API endpoints.

Combining Server Actions with validation libraries ensures:
- Automatic form data extraction & runtime schema validation.
- Consistent error shapes for field-level user feedback.
- Instant cache revalidation using \`revalidatePath\` or \`revalidateTag\`.
- Progressive enhancement: forms continue working even before JavaScript hydrates!`,
    date: 'July 15, 2026',
    readTime: '5 min read',
    renderingType: 'SSR'
  }
];

export const PROJECT_TREE: FileTreeNode = {
  name: 'my-nextjs-app',
  type: 'folder',
  path: '/',
  children: [
    {
      name: 'app',
      type: 'folder',
      path: '/app',
      description: 'App Router directory containing pages, layouts, and route handlers',
      children: [
        {
          name: 'api',
          type: 'folder',
          path: '/app/api',
          description: 'Server API Endpoints',
          children: [
            {
              name: 'health',
              type: 'folder',
              path: '/app/api/health',
              children: [
                {
                  name: 'route.ts',
                  type: 'file',
                  path: '/app/api/health/route.ts',
                  language: 'typescript',
                  content: `import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '15.2.0',
    framework: 'Next.js App Router'
  });
}`
                }
              ]
            }
          ]
        },
        {
          name: 'dashboard',
          type: 'folder',
          path: '/app/dashboard',
          description: 'Dashboard page route (/dashboard)',
          children: [
            {
              name: 'page.tsx',
              type: 'file',
              path: '/app/dashboard/page.tsx',
              language: 'typescript',
              content: `import { Suspense } from 'react';
import AnalyticsCard from '@/components/AnalyticsCard';

export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
      <Suspense fallback={<div className="h-32 bg-slate-100 animate-pulse rounded-xl" />}>
        <AnalyticsCard />
      </Suspense>
    </div>
  );
}`
            }
          ]
        },
        {
          name: 'layout.tsx',
          type: 'file',
          path: '/app/layout.tsx',
          language: 'typescript',
          description: 'Root layout wrapping all pages',
          content: `import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js App Router Application',
  description: 'Built with Next.js 15, Tailwind CSS, and TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b p-4">Navigation Bar</nav>
        {children}
      </body>
    </html>
  );
}`
        },
        {
          name: 'page.tsx',
          type: 'file',
          path: '/app/page.tsx',
          language: 'typescript',
          description: 'Root home page (/)',
          content: `import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-extrabold tracking-tight">Welcome to Next.js</h1>
      <p className="mt-4 text-slate-600 max-w-md text-center">
        Get started by editing <code className="bg-slate-100 p-1 rounded">app/page.tsx</code>
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/dashboard" className="px-5 py-2.5 bg-black text-white rounded-lg">
          Go to Dashboard &rarr;
        </Link>
      </div>
    </main>
  );
}`
        },
        {
          name: 'global-error.tsx',
          type: 'file',
          path: '/app/global-error.tsx',
          language: 'typescript',
          content: `'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}`
        }
      ]
    },
    {
      name: 'components',
      type: 'folder',
      path: '/components',
      description: 'Reusable UI components',
      children: [
        {
          name: 'Navbar.tsx',
          type: 'file',
          path: '/components/Navbar.tsx',
          language: 'typescript',
          content: `import Link from 'next/link';

export function Navbar() {
  return (
    <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <span className="font-bold text-lg">NextApp</span>
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </div>
    </header>
  );
}`
        }
      ]
    },
    {
      name: 'lib',
      type: 'folder',
      path: '/lib',
      children: [
        {
          name: 'utils.ts',
          type: 'file',
          path: '/lib/utils.ts',
          language: 'typescript',
          content: `export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}`
        }
      ]
    },
    {
      name: 'middleware.ts',
      type: 'file',
      path: '/middleware.ts',
      language: 'typescript',
      description: 'Global edge middleware request proxying & auth',
      content: `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.next();
}`
    },
    {
      name: 'next.config.mjs',
      type: 'file',
      path: '/next.config.mjs',
      language: 'javascript',
      description: 'Next.js runtime & compiler configuration',
      content: `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;`
    },
    {
      name: 'package.json',
      type: 'file',
      path: '/package.json',
      language: 'json',
      content: `{
  "name": "my-nextjs-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.2.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "lucide-react": "^0.470.0"
  }
}`
    }
  ]
};
