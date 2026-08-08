import { useState, useEffect } from 'react';
import { INITIAL_BLOG_POSTS } from '../data/nextjsDocs';
import { BlogPost } from '../types';
import { BookOpen, Clock, Tag, RefreshCw, ArrowLeft, Layers, Calendar } from 'lucide-react';
import { CodeBlock } from '../components/CodeBlock';

export function BlogView() {
  const [posts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isrCountdown, setIsrCountdown] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsrCountdown((prev) => (prev > 1 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Dynamic Route Segment (/app/blog/[slug]/page.tsx)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Next.js Dynamic Blog & ISR Studio
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Explore SSG (Static Site Generation), ISR (Incremental Static Regeneration), and dynamic route parameter matching.
          </p>
        </div>

        {/* ISR Timer Badge */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-medium self-start sm:self-center">
          <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
          <span>ISR Background Revalidate: <strong>{isrCountdown}s</strong></span>
        </div>
      </div>

      {/* Main Content Area */}
      {selectedPost ? (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedPost(null)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
          </button>

          <article className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedPost.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedPost.readTime}
                </span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded font-mono font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  {selectedPost.renderingType} rendering
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {selectedPost.title}
              </h2>
            </div>

            <div className="prose dark:prose-invert text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line border-t border-b border-slate-100 dark:border-slate-800 py-6">
              {selectedPost.content}
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Next.js Route Implementation Code
              </h4>
              <CodeBlock
                fileName={`app/blog/[slug]/page.tsx`}
                language="typescript"
                code={`// app/blog/[slug]/page.tsx
export const revalidate = ${selectedPost.revalidateSeconds || 60}; // Revalidate every ${selectedPost.revalidateSeconds || 60} seconds

export async function generateStaticParams() {
  // Pre-render all blog slugs at build time
  return [
    { slug: 'mastering-nextjs-15-app-router' },
    { slug: 'optimizing-server-components-performance' },
    { slug: 'building-type-safe-server-actions' }
  ];
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <article className="max-w-3xl mx-auto py-12">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}`}
              />
            </div>
          </article>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.slug}
              onClick={() => setSelectedPost(post)}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 cursor-pointer shadow-sm transition-all hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    /blog/{post.slug.slice(0, 14)}...
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    {post.renderingType}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>{post.readTime}</span>
                <span className="text-blue-500 font-semibold group-hover:underline">Read Post &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
