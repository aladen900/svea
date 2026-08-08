import { useState, useEffect, type FormEvent } from 'react';
import { TodoItem } from '../types';
import { Zap, Check, Trash2, Plus, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { CodeBlock } from '../components/CodeBlock';

export function ServerActionsView() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [lastActionLog, setLastActionLog] = useState<string>('No actions executed yet');

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/todos');
      const json = await res.json();
      setTodos(json.data || []);
    } catch (err) {
      console.error('Failed to fetch todos', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || submitting) return;

    try {
      setSubmitting(true);
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle.trim() }),
      });
      const data = await res.json();

      setNewTitle('');
      setLastActionLog(`['use server'] createTodo() executed -> revalidatePath('/server-actions')\n${JSON.stringify(data, null, 2)}`);
      await fetchTodos();
    } catch (err: any) {
      setLastActionLog(`Error executing Server Action: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleTodo = async (id: string) => {
    // Optimistic UI update
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

    try {
      const res = await fetch(`/api/todos/${id}`, { method: 'PATCH' });
      const data = await res.json();
      setLastActionLog(`['use server'] toggleTodo("${id}") executed\n${JSON.stringify(data, null, 2)}`);
    } catch (err: any) {
      await fetchTodos(); // Revert on failure
      setLastActionLog(`Error in toggle Server Action: ${err.message}`);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    // Optimistic removal
    setTodos((prev) => prev.filter((t) => t.id !== id));

    try {
      const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
      const data = await res.json();
      setLastActionLog(`['use server'] deleteTodo("${id}") executed\n${JSON.stringify(data, null, 2)}`);
    } catch (err: any) {
      await fetchTodos();
      setLastActionLog(`Error deleting todo: ${err.message}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* View Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
          <Zap className="w-4 h-4" />
          <span>Server Actions Studio ('use server')</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Type-Safe Server Actions & Mutations
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Mutate backend database records directly from client forms without writing boilerplate REST clients.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Interactive Form & Todo List */}
        <div className="lg:col-span-7 space-y-6">
          <form
            onSubmit={handleAddTodo}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
          >
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-purple-500" />
              <span>Invoke Server Action: <code className="font-mono text-purple-500">createTodo()</code></span>
            </h3>

            <div className="flex gap-3">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter task item to save directly on server..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                disabled={submitting || !newTitle.trim()}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                {submitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
                <span>{submitting ? 'Mutating...' : 'Submit Action'}</span>
              </button>
            </div>
          </form>

          {/* List of Todos */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Live Server State ({todos.length} items)
              </h3>
              <button
                onClick={fetchTodos}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload</span>
              </button>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-slate-400">Loading server records...</div>
            ) : todos.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">No items found. Create one above!</div>
            ) : (
              <ul className="space-y-2">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 text-xs"
                  >
                    <div
                      onClick={() => handleToggleTodo(todo.id)}
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          todo.completed
                            ? 'bg-purple-600 border-purple-600 text-white'
                            : 'border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {todo.completed && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span
                        className={`font-medium ${
                          todo.completed
                            ? 'line-through text-slate-400'
                            : 'text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {todo.title}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Server Action Payload Inspection & Reference Code */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Server Action Response Log</span>
            </h4>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs overflow-x-auto border border-slate-800 text-emerald-400 max-h-48">
              <pre>{lastActionLog}</pre>
            </div>
          </div>

          <CodeBlock
            fileName="app/actions.ts"
            language="typescript"
            code={`'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';

export async function createTodo(formData: FormData) {
  const title = formData.get('title') as string;

  if (!title) throw new Error('Title required');

  await db.todo.create({
    data: { title, completed: false }
  });

  // Revalidates cache across all active server components
  revalidatePath('/server-actions');
}`}
          />
        </div>
      </div>
    </div>
  );
}
