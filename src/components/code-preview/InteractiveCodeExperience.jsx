import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle2, RotateCcw, Terminal, Code2, Check, Sparkles, Building2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { codingProblems } from '../../data/codingProblems';

export default function InteractiveCodeExperience() {
  const problem = codingProblems[0];
  const [selectedLanguage, setSelectedLanguage] = useState('Python');
  const [code, setCode] = useState(problem.starterCodes.Python);
  const [activeTab, setActiveTab] = useState('testcases'); // 'testcases' or 'console'
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState(0);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setCode(problem.starterCodes[lang] || '');
    setHasRun(false);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
      setActiveTab('console');
    }, 450);
  };

  const handleResetCode = () => {
    setCode(problem.starterCodes[selectedLanguage] || '');
    setHasRun(false);
  };

  const codeLines = code.split('\n');

  return (
    <section id="practice-code" className="relative py-24 sm:py-28 bg-[#0A0C10] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="IN-BROWSER PRACTICE SANDBOX"
          title="INTERACTIVE CODING"
          highlight="EXPERIENCE"
          subtitle="Test-drive the DKoder interactive problem-solving arena with multi-language execution, test suite verification, and runtime profiling."
        />

        {/* IDE Outer Shell */}
        <div className="tech-card rounded-2xl border border-white/10 shadow-editorial overflow-hidden">
          
          {/* Top IDE Header Bar */}
          <div className="bg-[#12151D] px-4 py-3 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
            {/* Problem Title & Company Badges */}
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <h3 className="text-sm font-display font-bold text-white">
                {problem.title}
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {problem.difficulty}
              </span>
              <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-400 pl-2">
                <span>Frequently asked by:</span>
                <span className="text-dkoder-yellow">{problem.companies.slice(0, 3).join(', ')}</span>
              </div>
            </div>

            {/* Language Switcher & Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-[#181C26] p-1 rounded-lg border border-white/[0.06]">
                {Object.keys(problem.starterCodes).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                      selectedLanguage === lang
                        ? 'bg-dkoder-yellow text-black font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleResetCode}
                title="Reset Starter Code"
                className="p-1.5 rounded-lg bg-[#181C26] hover:bg-[#202533] text-slate-400 hover:text-white border border-white/[0.06] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleRunCode}
                disabled={isRunning}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-black shadow-sm transition-all cursor-pointer"
              >
                {isRunning ? (
                  <span className="inline-block animate-spin">⏳</span>
                ) : (
                  <Play className="w-3.5 h-3.5 fill-black" />
                )}
                <span>{isRunning ? 'Running...' : 'Run Code'}</span>
              </button>
            </div>
          </div>

          {/* Main IDE Workspace (Split between Problem Description & Code Editor) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            
            {/* Left Column: Problem Briefing & Examples (4 Cols) */}
            <div className="lg:col-span-4 bg-[#0F1117] p-5 border-b lg:border-b-0 lg:border-r border-white/[0.08] overflow-y-auto space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                  Category: {problem.category} • Acceptance: {problem.acceptanceRate}
                </span>
                <p className="text-slate-300 leading-relaxed font-sans">
                  {problem.description}
                </p>
              </div>

              {/* Examples */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-dkoder-yellow font-bold block">
                  Example Cases
                </span>

                {problem.examples.map((ex, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#161922] border border-white/[0.06] font-mono space-y-1">
                    <p className="text-slate-400 text-[11px]">
                      <strong className="text-white">Input:</strong> {ex.input}
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      <strong className="text-emerald-400">Output:</strong> {ex.output}
                    </p>
                    {ex.explanation && (
                      <p className="text-slate-500 text-[10px] pt-1">
                        Explanation: {ex.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Code Editor + Test Cases Panel (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col bg-[#0A0C10]">
              
              {/* Code Editor Surface with Line Numbers */}
              <div className="flex-1 flex p-3 font-mono text-xs overflow-x-auto min-h-[300px]">
                {/* Line Numbers */}
                <div className="pr-3 text-right select-none text-slate-600 border-r border-white/[0.06] space-y-1">
                  {codeLines.map((_, i) => (
                    <div key={i} className="leading-5 text-[11px]">
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* Editable Code Area */}
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 pl-3 bg-transparent text-slate-100 font-mono text-xs leading-5 focus:outline-none resize-none"
                  spellCheck="false"
                  rows={Math.max(codeLines.length, 14)}
                />
              </div>

              {/* Bottom Testcase / Console Panel */}
              <div className="border-t border-white/[0.08] bg-[#12151D] p-4">
                {/* Tab switcher */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('testcases')}
                      className={`text-xs font-mono transition-colors cursor-pointer ${
                        activeTab === 'testcases' ? 'text-dkoder-yellow font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Test Cases
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('console')}
                      className={`text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                        activeTab === 'console' ? 'text-dkoder-yellow font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>Execution Console</span>
                      {hasRun && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                    </button>
                  </div>

                  {hasRun && (
                    <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>All 3 Test Cases Passed</span>
                    </span>
                  )}
                </div>

                {/* Tab Content 1: Test Cases */}
                {activeTab === 'testcases' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {problem.testCases.map((tc, idx) => (
                        <button
                          key={tc.id}
                          type="button"
                          onClick={() => setSelectedTestCase(idx)}
                          className={`px-3 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                            selectedTestCase === idx
                              ? 'bg-[#1E222D] text-white border border-dkoder-yellow/40'
                              : 'bg-white/[0.04] text-slate-400 hover:text-white'
                          }`}
                        >
                          Case {idx + 1}
                        </button>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-[#161922] font-mono text-xs space-y-1">
                      <p className="text-slate-400">
                        <strong className="text-white">Input:</strong> {problem.testCases[selectedTestCase].input}
                      </p>
                      <p className="text-slate-400">
                        <strong className="text-emerald-400">Expected:</strong> {problem.testCases[selectedTestCase].expected}
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab Content 2: Console Execution Results */}
                {activeTab === 'console' && (
                  <div className="space-y-3">
                    {hasRun ? (
                      <div className="space-y-2 font-mono text-xs">
                        <div className="p-3 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-300 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <strong className="text-white">Accepted</strong>
                            <span>— Runtime: {problem.executionMetrics.runtime}</span>
                          </div>
                          <span className="text-[11px] text-emerald-400">{problem.executionMetrics.runtimePercentile}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-400 pt-1">
                          <div className="p-2.5 rounded-lg bg-[#161922] border border-white/[0.04]">
                            <span>Memory Usage: </span>
                            <strong className="text-white">{problem.executionMetrics.memory}</strong>
                          </div>
                          <div className="p-2.5 rounded-lg bg-[#161922] border border-white/[0.04]">
                            <span>Status: </span>
                            <strong className="text-emerald-400">Optimal O(N) Hash Map Lookup</strong>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-4 text-center text-xs font-mono text-slate-500">
                        Click &ldquo;Run Code&rdquo; above to compile and execute against the sample test suite.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
