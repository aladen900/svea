import { useState } from 'react';
import { FileTreeNode } from '../types';
import { Folder, FolderOpen, FileText, ChevronRight, ChevronDown } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface NextStructureTreeProps {
  tree: FileTreeNode;
}

export function NextStructureTree({ tree }: NextStructureTreeProps) {
  const [selectedFile, setSelectedFile] = useState<FileTreeNode | null>(
    tree.children?.[0]?.children?.[2] || null // Default selected app/layout.tsx
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      {/* File Tree Column */}
      <div className="lg:col-span-5 border-r border-slate-100 dark:border-slate-800/80 pr-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center justify-between">
          <span>Project Directory Tree</span>
          <span className="text-[11px] font-normal text-slate-500">Click files to preview</span>
        </h3>
        <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs max-h-[500px] overflow-y-auto">
          <TreeNode
            node={tree}
            selectedPath={selectedFile?.path}
            onSelectFile={(file) => setSelectedFile(file)}
          />
        </div>
      </div>

      {/* Preview Column */}
      <div className="lg:col-span-7 flex flex-col justify-between">
        {selectedFile && selectedFile.type === 'file' ? (
          <div>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {selectedFile.language || 'Code'}
                </span>
                <span className="text-xs text-slate-400 font-mono">{selectedFile.path}</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {selectedFile.name}
              </h4>
              {selectedFile.description && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {selectedFile.description}
                </p>
              )}
            </div>
            {selectedFile.content && (
              <CodeBlock
                code={selectedFile.content}
                language={selectedFile.language}
                fileName={selectedFile.path}
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-12 text-slate-400 text-center">
            <FileText className="w-12 h-12 mb-3 opacity-40" />
            <p className="text-sm font-medium">Select a file from the project tree to inspect its Next.js implementation.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TreeNode({
  node,
  selectedPath,
  onSelectFile,
  level = 0
}: {
  key?: string;
  node: FileTreeNode;
  selectedPath?: string;
  onSelectFile: (file: FileTreeNode) => void;
  level?: number;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = node.type === 'folder';
  const isSelected = selectedPath === node.path;

  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      onSelectFile(node);
    }
  };

  return (
    <div className="select-none">
      <div
        onClick={handleClick}
        style={{ paddingLeft: `${level * 16}px` }}
        className={`flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer transition-colors ${
          isSelected
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
            : 'hover:bg-slate-200/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
        }`}
      >
        {isFolder ? (
          <>
            <span className="text-slate-400">
              {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </span>
            {isOpen ? (
              <FolderOpen className="w-4 h-4 text-amber-500" />
            ) : (
              <Folder className="w-4 h-4 text-amber-500" />
            )}
            <span className="font-medium text-slate-800 dark:text-slate-200">{node.name}</span>
          </>
        ) : (
          <>
            <FileText className="w-4 h-4 text-blue-500 ml-4" />
            <span className="text-slate-700 dark:text-slate-300">{node.name}</span>
          </>
        )}
      </div>

      {isFolder && isOpen && node.children && (
        <div>
          {node.children.map((childNode) => (
            <TreeNode
              key={childNode.path}
              node={childNode}
              selectedPath={selectedPath}
              onSelectFile={onSelectFile}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
