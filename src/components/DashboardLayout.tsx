import React, { useState } from 'react';
import { Menu, LayoutDashboard, ChevronLeft, Download } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  projectTitle: string;
  onExport: () => void;
}

export default function DashboardLayout({ children, sidebar, projectTitle, onExport }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className={`min-h-screen bg-zinc-950 text-zinc-50 flex flex-col ${language === 'am' ? 'font-amharic' : ''}`}>
      {/* Top Nav */}
      <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-4 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-zinc-900 rounded-md transition-colors"
          >
            <Menu size={18} />
          </button>
          <div className="flex items-center gap-2">
            <LayoutDashboard size={18} className="text-indigo-500" />
            <h1 className="text-sm font-bold tracking-tighter font-mono uppercase text-zinc-100">{t('projectTitle')} {projectTitle.split(' ').pop()}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-zinc-900 rounded-md border border-zinc-800 p-0.5">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-[10px] font-bold rounded ${language === 'en' ? 'bg-zinc-800 text-indigo-400' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('am')}
              className={`px-2 py-1 text-[10px] font-bold rounded ${language === 'am' ? 'bg-zinc-800 text-indigo-400' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              አማ
            </button>
          </div>

          <div className="h-8 w-[1px] bg-zinc-800 mx-1" />
          
          <button 
            onClick={onExport}
            className="flex items-center gap-2 h-9 px-4 bg-zinc-50 text-zinc-950 text-xs font-medium rounded-md hover:bg-zinc-200 transition-colors"
          >
            <Download size={14} />
            {t('exportCsv')}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside 
          className={`
            border-r border-zinc-800 bg-zinc-950 transition-all duration-300 ease-in-out
            ${isSidebarOpen ? 'w-64' : 'w-0 opacity-0 pointer-events-none'}
          `}
        >
          <div className="p-4 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{t('controls')}</span>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 hover:bg-zinc-900 rounded-md text-zinc-500"
              >
                <ChevronLeft size={16} />
              </button>
            </div>
            
            <nav className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {sidebar}
            </nav>

            <div className="pt-4 border-t border-zinc-800">
              <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
                <div className="text-[10px] text-zinc-500 uppercase font-bold mb-2">{t('instanceStatus')}</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono">{t('nodeActive')}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-zinc-950 relative">
          <div className="p-6 max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

