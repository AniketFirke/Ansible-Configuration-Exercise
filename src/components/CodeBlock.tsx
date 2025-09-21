import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "bash" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm">{language}</span>
          <button
            onClick={copyToClipboard}
            className="p-2 hover:bg-slate-800 rounded-md transition-colors duration-200 opacity-0 group-hover:opacity-100"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
        <pre className="text-green-400 text-sm font-mono overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}