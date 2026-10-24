import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Code2,
  Play,
  CheckCircle2,
  RotateCcw,
  Terminal,
  FileCode,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Check,
  ArrowLeft,
  Loader2,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { codingProblems } from '../data/codingProblems';

export default function CodingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);
  const activeProblem = codingProblems[selectedProblemIndex] || codingProblems[0];

  const languages = ['JavaScript', 'Python', 'Java', 'C++', 'SQL'];
  const [selectedLanguage, setSelectedLanguage] = useState('JavaScript');

  const getStarterCode = (prob, lang) => {
    if (prob?.starterCodes?.[lang]) return prob.starterCodes[lang];
    if (prob?.starterCodes?.['JavaScript']) return prob.starterCodes['JavaScript'];
    return '// Solution template\nfunction solution() {\n  // Code here\n}\n';
  };

  const [userCode, setUserCode] = useState(() => getStarterCode(activeProblem, 'JavaScript'));
  const [activeTab, setActiveTab] = useState('tests'); // 'tests' | 'console' | 'results'
  const [selectedTestCase, setSelectedTestCase] = useState(0);

  const [isExecuting, setIsExecuting] = useState(false);
  const [runResults, setRunResults] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [consoleHeight, setConsoleHeight] = useState('normal'); // 'collapsed' | 'normal' | 'expanded'

  // When language changes
  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setUserCode(getStarterCode(activeProblem, lang));
    setRunResults(null);
  };

  // When problem changes
  const handleProblemSelect = (index) => {
    setSelectedProblemIndex(index);
    const newProb = codingProblems[index] || codingProblems[0];
    setUserCode(getStarterCode(newProb, selectedLanguage));
    setRunResults(null);
    setIsSubmitted(false);
    setSelectedTestCase(0);
  };

  // Run Code Simulation
  const handleRunCode = () => {
    setIsExecuting(true);
    setRunResults(null);

    setTimeout(() => {
      setIsExecuting(false);
      setRunResults({
        status: 'Accepted',
        passedCount: 3,
        totalCount: 3,
        runtime: '38 ms',
        runtimePercentile: '89.4%',
        memory: '42.1 MB',
        memoryPercentile: '81.2%',
        stdout: `> Compiling ${selectedLanguage} solution...\n> Executing test cases against sample inputs...\n> Case 1: [0, 1] == Expected [0, 1] ✓\n> Case 2: [1, 2] == Expected [1, 2] ✓\n> Case 3: [0, 1] == Expected [0, 1] ✓\n> Time Complexity: O(N) verified.\n> Auxiliary Memory: O(N) verified.`,
      });
      setActiveTab('results');
    }, 600);
  };

  // Submit Code Simulation
  const handleSubmitCode = () => {
    setIsExecuting(true);

    setTimeout(() => {
      setIsExecuting(false);
      setIsSubmitted(true);
      setRunResults({
        status: 'Accepted & Verified',
        passedCount: 3,
        totalCount: 3,
        runtime: '32 ms',
        runtimePercentile: '94.2%',
        memory: '41.8 MB',
        memoryPercentile: '88.5%',
        stdout: `> Automated evaluation complete.\n> All hidden boundary test cases passed.\n> Memory O(N) verified.\n> +40 XP awarded to your practice profile.`,
      });
      setActiveTab('results');

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#5B21B6', '#FACC15', '#16A34A', '#8B5CF6'],
        });
      } catch {
        // safe fallback
      }
    }, 800);
  };

  const handleReset = () => {
    setUserCode(getStarterCode(activeProblem, selectedLanguage));
    setRunResults(null);
    setIsSubmitted(false);
  };

  const companyTag = activeProblem?.companies?.[0] || 'Target Practice';
  const acceptance = activeProblem?.acceptanceRate || '49.8%';
  const constraints = activeProblem?.constraints || [
    '2 <= nums.length <= 10^4',
    '-10^9 <= nums[i] <= 10^9',
    '-10^9 <= target <= 10^9',
    'Only one valid answer exists.',
  ];

  const testCases = activeProblem?.testCases || [
    { input: 'nums = [2,7,11,15], target = 9', expected: '[0, 1]' },
    { input: 'nums = [3,2,4], target = 6', expected: '[1, 2]' },
    { input: 'nums = [3,3], target = 6', expected: '[0, 1]' },
  ];

  return (
    <div className="h-full min-h-0 flex-1 flex flex-col bg-[#FAF9FF] overflow-hidden text-left font-sans">
      {/* Workspace Sub-Header with Back Navigation & Execution Controls */}
      <div className="h-14 bg-white border-b border-[#E8E4F0] px-4 flex items-center justify-between shrink-0 select-none shadow-xs">
        <div className="flex items-center gap-3">
          {/* Back button */}
          <button
            type="button"
            onClick={() => navigate('/practice')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-sans font-medium text-[#625F72] hover:text-[#5B21B6] hover:bg-[#FAF9FF] transition-colors border border-transparent hover:border-[#E8E4F0]"
            title="Back to Practice Questions"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Practice</span>
          </button>

          <div className="h-4 w-px bg-[#E8E4F0]" />

          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg text-[#625F72] hover:text-[#5B21B6] hover:bg-[#FAF9FF] transition-colors cursor-pointer border border-[#E8E4F0]"
            title={isSidebarOpen ? 'Collapse Problem List' : 'Expand Problem List'}
          >
            {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#EDE5FF] text-[#5B21B6] border border-[#D8C7FF]">
              {companyTag}
            </span>
            <h2 className="text-sm font-bold text-[#17152B] truncate max-w-xs sm:max-w-md">
              {activeProblem.title}
            </h2>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {activeProblem.difficulty}
            </span>
          </div>
        </div>

        {/* Right: Language Tabs & Execution Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="flex items-center bg-[#FAF9FF] p-0.5 rounded-xl border border-[#E8E4F0]">
            {languages.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => handleLanguageChange(lang)}
                className={`px-2.5 py-1 rounded-lg text-xs font-sans transition-colors cursor-pointer ${
                  selectedLanguage === lang
                    ? 'bg-[#5B21B6] text-white font-semibold shadow-xs'
                    : 'text-[#625F72] hover:text-[#17152B]'
                }`}
              >
                {lang === 'JavaScript' ? 'JS' : lang}
              </button>
            ))}
          </div>

          {/* Reset Button */}
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-xl text-[#625F72] hover:text-[#5B21B6] hover:bg-[#FAF9FF] border border-[#E8E4F0] transition-colors cursor-pointer hidden sm:flex items-center"
            title="Reset code to starter template"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Run Button */}
          <button
            type="button"
            disabled={isExecuting}
            onClick={handleRunCode}
            className="px-4 py-1.5 rounded-xl text-xs font-sans font-semibold bg-white hover:bg-[#FAF9FF] text-[#18152B] hover:text-[#5B21B6] border border-[#E8E4F0] hover:border-[#7C3AED] transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-xs hover:-translate-y-0.5 active:scale-95 group"
          >
            {isExecuting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#5B21B6]" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-[#18152B] text-[#18152B] group-hover:fill-[#5B21B6] group-hover:text-[#5B21B6] transition-colors" />
            )}
            <span>{isExecuting ? 'Running...' : 'Run'}</span>
          </button>

          {/* Submit Button */}
          <button
            type="button"
            disabled={isExecuting}
            onClick={handleSubmitCode}
            className="px-4 py-1.5 rounded-xl text-xs font-sans font-semibold bg-[#5B21B6] hover:bg-[#4C1D95] text-white transition-all flex items-center gap-1.5 shadow-[0_4px_14px_-2px_rgba(91,33,182,0.25)] hover:shadow-[0_6px_18px_-2px_rgba(91,33,182,0.35)] cursor-pointer disabled:opacity-50 hover:-translate-y-0.5 active:scale-95"
          >
            {isExecuting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            )}
            <span>{isExecuting ? 'Submitting...' : 'Submit'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Split: Problem list | Problem statement | Editor + Console */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">
        {/* 1. Left Problem List Sidebar */}
        {isSidebarOpen && (
          <div className="w-full lg:w-56 bg-white border-r border-[#E8E4F0] flex flex-col shrink-0 min-h-0 overflow-hidden">
            <div className="p-3 border-b border-[#E8E4F0] bg-[#FAF9FF] flex items-center justify-between shrink-0">
              <span className="text-[11px] font-sans uppercase font-bold text-[#625F72]">
                Problem Archive
              </span>
              <span className="text-[11px] font-sans font-bold text-[#5B21B6]">
                {codingProblems.length} Tasks
              </span>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {codingProblems.map((p, idx) => {
                const isSelected = idx === selectedProblemIndex;
                return (
                  <button
                    key={p.id || idx}
                    type="button"
                    onClick={() => handleProblemSelect(idx)}
                    className={`w-full p-2.5 rounded-xl text-left transition-colors cursor-pointer flex flex-col gap-1 border ${
                      isSelected
                        ? 'bg-[#EDE5FF] text-[#5B21B6] border-[#D8C7FF] font-semibold'
                        : 'border-transparent hover:bg-[#FAF9FF] text-[#17152B]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className={isSelected ? 'text-[#5B21B6]' : 'text-[#625F72]'}>
                        {p.companies?.[0] || 'Target'}
                      </span>
                      <span className={isSelected ? 'text-[#5B21B6] font-bold' : 'text-emerald-600 font-semibold'}>
                        {p.difficulty}
                      </span>
                    </div>
                    <span className="text-xs font-semibold truncate">
                      {p.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. Center Column: Problem Statement */}
        <div className="w-full lg:w-5/12 border-r border-[#E8E4F0] flex flex-col bg-white shrink-0 min-h-0 overflow-hidden">
          <div className="p-3 border-b border-[#E8E4F0] flex items-center justify-between bg-[#FAF9FF] shrink-0">
            <span className="text-xs font-sans font-bold text-[#17152B] flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-[#5B21B6]" />
              <span>Problem Statement</span>
            </span>
            <span className="text-xs text-[#625F72]">
              Acceptance: <span className="font-semibold text-[#17152B]">{acceptance}</span>
            </span>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-5 text-xs text-[#17152B] leading-relaxed custom-scrollbar">
            <div>
              <h3 className="text-lg font-display font-bold text-[#17152B] mb-2">
                {activeProblem.title}
              </h3>
              <p className="font-sans text-[#625F72] whitespace-pre-line text-xs sm:text-sm leading-relaxed">
                {activeProblem.description}
              </p>
            </div>

            {/* Test Case Examples */}
            {activeProblem.examples && activeProblem.examples.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs uppercase font-bold text-[#17152B] block">
                  Examples:
                </span>
                {activeProblem.examples.map((ex, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] font-mono space-y-1">
                    <div><strong className="text-[#625F72]">Input:</strong> <span className="text-[#17152B]">{ex.input}</span></div>
                    <div><strong className="text-[#625F72]">Output:</strong> <span className="text-[#16A34A] font-bold">{ex.output}</span></div>
                    {ex.explanation && (
                      <div className="text-[11px] text-[#625F72] pt-1 font-sans">{ex.explanation}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Constraints */}
            <div className="space-y-1.5">
              <span className="text-xs uppercase font-bold text-[#17152B] block">
                Constraints:
              </span>
              <ul className="space-y-1 list-disc list-inside font-mono text-[11px] text-[#625F72]">
                {constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Right Column: Editor (Dark Code Editor with Light App Frame) */}
        <div className="flex-1 min-w-0 min-h-0 flex flex-col bg-[#1E1E2E] overflow-hidden">
          {/* Editor Header & Code Textarea */}
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden bg-[#181825]">
            <div className="p-2 border-b border-white/[0.08] bg-[#1E1E2E] flex items-center justify-between text-xs font-sans text-slate-400 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 font-mono font-medium text-white text-[11px]">
                  solution.{selectedLanguage === 'Python' ? 'py' : selectedLanguage === 'Java' ? 'java' : selectedLanguage === 'C++' ? 'cpp' : selectedLanguage === 'SQL' ? 'sql' : 'js'}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">JetBrains Mono Sandbox</span>
            </div>

            {/* Simulated Editor with Line Numbers */}
            <div className="flex-1 min-h-0 flex overflow-hidden">
              <div className="w-10 py-3 bg-[#11111B] border-r border-white/[0.04] text-right pr-2 text-slate-500 font-mono text-xs select-none space-y-1 leading-5 shrink-0 overflow-hidden">
                {Array.from({ length: 22 }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                spellCheck="false"
                className="flex-1 p-3 bg-transparent text-[#CDD6F4] font-mono text-xs leading-5 focus:outline-none resize-none overflow-y-auto custom-scrollbar selection:bg-[#5B21B6] selection:text-white"
              />
            </div>
          </div>

          {/* Bottom Drawer: Test Cases & Execution Results (Section 19) */}
          <div
            className={`bg-white border-t border-[#E8E4F0] flex flex-col shrink-0 min-h-0 transition-all duration-300 ease-in-out ${
              consoleHeight === 'collapsed'
                ? 'h-9'
                : consoleHeight === 'expanded'
                ? 'h-80 sm:h-96'
                : 'h-56'
            }`}
          >
            {/* Drawer Tabs & Console Controls */}
            <div className="h-9 px-4 border-b border-[#E8E4F0] flex items-center justify-between bg-[#FAF9FF] shrink-0">
              <div className="flex items-center gap-4 text-xs font-sans">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('tests');
                    if (consoleHeight === 'collapsed') setConsoleHeight('normal');
                  }}
                  className={`h-9 flex items-center gap-1.5 border-b-2 font-semibold cursor-pointer ${
                    activeTab === 'tests'
                      ? 'border-[#5B21B6] text-[#5B21B6]'
                      : 'border-transparent text-[#6B687A] hover:text-[#18152B]'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>Test Cases</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('console');
                    if (consoleHeight === 'collapsed') setConsoleHeight('normal');
                  }}
                  className={`h-9 flex items-center gap-1.5 border-b-2 font-semibold cursor-pointer ${
                    activeTab === 'console'
                      ? 'border-[#5B21B6] text-[#5B21B6]'
                      : 'border-transparent text-[#6B687A] hover:text-[#18152B]'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-[#6B687A]" />
                  <span>Stdout Console</span>
                </button>

                {runResults && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('results');
                      if (consoleHeight === 'collapsed') setConsoleHeight('normal');
                    }}
                    className={`h-9 flex items-center gap-1.5 border-b-2 font-semibold cursor-pointer ${
                      activeTab === 'results'
                        ? 'border-[#5B21B6] text-[#5B21B6]'
                        : 'border-transparent text-[#6B687A] hover:text-[#18152B]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
                    <span>Run Results</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                {runResults && (
                  <div className="flex items-center gap-3 text-[11px] font-mono">
                    <span className="text-[#16A34A] font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>{runResults.status}</span>
                    </span>
                    <span className="text-[#6B687A] hidden sm:inline">⏱️ {runResults.runtime}</span>
                  </div>
                )}

                {/* Console Expand / Collapse controls */}
                <div className="flex items-center gap-0.5 border-l border-[#E8E4F0] pl-2">
                  <button
                    type="button"
                    onClick={() => setConsoleHeight((prev) => (prev === 'expanded' ? 'normal' : 'expanded'))}
                    className="p-1 rounded text-[#6B687A] hover:text-[#18152B] hover:bg-[#E8E4F0] transition-colors cursor-pointer"
                    title={consoleHeight === 'expanded' ? 'Standard height' : 'Expand console'}
                    aria-label="Expand or restore console height"
                  >
                    {consoleHeight === 'expanded' ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConsoleHeight((prev) => (prev === 'collapsed' ? 'normal' : 'collapsed'))}
                    className="p-1 rounded text-[#6B687A] hover:text-[#18152B] hover:bg-[#E8E4F0] transition-colors cursor-pointer"
                    title={consoleHeight === 'collapsed' ? 'Open drawer' : 'Collapse drawer'}
                    aria-label="Toggle console drawer"
                  >
                    {consoleHeight === 'collapsed' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 min-h-0 overflow-y-auto p-3 text-xs text-[#17152B] custom-scrollbar">
              {activeTab === 'tests' && (
                <div className="space-y-3 font-mono">
                  <div className="flex items-center gap-2">
                    {testCases.map((tc, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedTestCase(idx)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer border ${
                          selectedTestCase === idx
                            ? 'bg-[#EDE5FF] text-[#5B21B6] font-bold border-[#D8C7FF]'
                            : 'bg-[#FAF9FF] text-[#625F72] hover:text-[#17152B] border-[#E8E4F0]'
                        }`}
                      >
                        Case {idx + 1}
                      </button>
                    ))}
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#FAF9FF] border border-[#E8E4F0] space-y-1">
                    <div><span className="text-[#625F72]">Input:</span> <span className="text-[#17152B] font-semibold">{testCases[selectedTestCase]?.input}</span></div>
                    <div><span className="text-[#625F72]">Expected:</span> <span className="text-[#16A34A] font-bold">{testCases[selectedTestCase]?.expected}</span></div>
                  </div>
                </div>
              )}

              {activeTab === 'console' && (
                <pre className="text-slate-200 bg-[#181825] p-3 rounded-xl font-mono text-[11px] leading-relaxed">
                  {runResults?.stdout || '> Console output is idle. Click Run to evaluate solution.'}
                </pre>
              )}

              {activeTab === 'results' && runResults && (
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div>
                      <span className="text-emerald-700 font-bold text-sm block">{runResults.status}</span>
                      <span className="text-[11px] text-[#625F72]">{runResults.passedCount} / {runResults.totalCount} Test Cases Passed</span>
                    </div>
                    <div className="text-right text-[11px] font-mono">
                      <div>Runtime: <strong className="text-[#17152B]">{runResults.runtime}</strong> (Beats {runResults.runtimePercentile})</div>
                      <div>Memory: <strong className="text-[#17152B]">{runResults.memory}</strong> (Beats {runResults.memoryPercentile})</div>
                    </div>
                  </div>
                  <pre className="font-mono text-[11px] text-slate-200 bg-[#181825] p-3 rounded-xl leading-snug">{runResults.stdout}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
