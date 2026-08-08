import { RouteId } from '../types';
import { 
  Sparkles, 
  Layers, 
  Terminal, 
  Zap, 
  FolderTree, 
  BookOpen, 
  Activity,
  Server,
  Globe
} from 'lucide-react';

interface HeaderProps {
  activeRoute: RouteId;
  setActiveRoute: (route: RouteId) => void;
  serverStatus: boolean;
}

export function Header({ activeRoute, setActiveRoute, serverStatus }: HeaderProps) {
  const navItems: { id: RouteId; label: string; icon: any; badge?: string }[] = [
    { id: 'home', label: 'Overview', icon: Globe },
    { id: 'dashboard', label: 'Dashboard', icon: Activity, badge: 'RSC' },
    { id: 'blog', label: 'Dynamic Blog', icon: BookOpen, badge: 'ISR' },
    { id: 'server-actions', label: 'Server Actions', icon: Zap, badge: 'Actions' },
    { id: 'api-explorer', label: 'API Routes', icon: Terminal, badge: 'API' },
    { id: 'ai-assistant', label: 'AI Builder', icon: Sparkles, badge: 'AI' },
    { id: 'structure', label: 'Project Tree', icon: FolderTree },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Next.js Badge */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => setActiveRoute('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                N
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-lg">
                    Next.js <span className="text-slate-500 font-normal">15.2</span>
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    App Router
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
                  Full-Stack Framework Workspace
                </span>
              </div>
            </div>
          </div>

          {/* Right Status Badge */}
          <div className="flex items-center gap-3 text-xs">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
              <Server className="w-3.5 h-3.5 text-blue-500" />
              <span>Runtime: Express + Vite Node 22</span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-medium">
              <span className={`w-2 h-2 rounded-full ${serverStatus ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
              <span>{serverStatus ? 'Server Connected' : 'Connecting...'}</span>
            </div>
          </div>
        </div>

        {/* Route Navigation Bar */}
        <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-100 dark:border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveRoute(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400 dark:text-emerald-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`px-1.5 py-0.2 text-[9px] font-bold rounded ${
                    isActive 
                      ? 'bg-slate-800 text-emerald-300 dark:bg-slate-100 dark:text-emerald-700' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
