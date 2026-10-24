export const learningModules = [
  {
    step: '01',
    id: 'aptitude-mcq',
    title: 'Aptitude & MCQs',
    subtitle: 'Clear Round 1 cognitive & technical screenings with confidence',
    category: 'Assessment Screening',
    icon: 'CheckSquare',
    accentColor: '#FACC15',
    difficulty: 'Basic — Intermediate',
    estimatedTime: '25–35 Hours',
    coverage: '1,800+ Practice MCQs',
    helpsWith: 'Clearing initial shortlisting rounds in TCS NQT, Infosys, Cognizant, Accenture, and product company cognitive tests.',
    keyTopics: [
      { name: 'Quantitative Aptitude', count: '540 Qs', desc: 'Speed math, percentages, probability, time & work' },
      { name: 'Logical & Analytical Reasoning', count: '480 Qs', desc: 'Blood relations, seating arrangement, syllogisms' },
      { name: 'Technical CS MCQs', count: '520 Qs', desc: 'OS scheduling, DBMS normalization, SQL outputs, pointers in C/C++' },
      { name: 'Verbal Ability & Comprehension', count: '310 Qs', desc: 'Sentence correction, vocabulary, contextual meaning' }
    ],
    nextAction: 'Take 20-Minute Aptitude Diagnostic'
  },
  {
    step: '02',
    id: 'coding-practice',
    title: 'Coding Practice & DSA',
    subtitle: 'Targeted pattern-based problem solving with in-browser editor',
    category: 'Core Problem Solving',
    icon: 'Code2',
    accentColor: '#7E3AF2',
    difficulty: 'Basic — Advanced',
    estimatedTime: '60–90 Hours',
    coverage: '450+ Curated Problems',
    helpsWith: 'Mastering DSA patterns asked in Amazon OA, Microsoft Codility, Flipkart, and Zoho second-round machine coding.',
    keyTopics: [
      { name: 'Arrays, Two Pointers & Sliding Window', count: '65 Problems', desc: 'Subarray problems, prefix sums, binary search' },
      { name: 'Trees, BST & Binary Heaps', count: '80 Problems', desc: 'Traversals, lowest common ancestor, path sums' },
      { name: 'Dynamic Programming & Recursion', count: '75 Problems', desc: 'Knapsack, grid paths, longest common subsequence' },
      { name: 'Graph BFS, DFS & Shortest Path', count: '55 Problems', desc: 'Dijkstra, topological sort, cycle detection' }
    ],
    nextAction: 'Solve Today’s Daily Coding Challenge'
  },
  {
    step: '03',
    id: 'mock-exams',
    title: 'Full Mock Exams',
    subtitle: 'Simulate exact company test patterns under proctored time pressure',
    category: 'Exam Simulation',
    icon: 'Timer',
    accentColor: '#38BDF8',
    difficulty: 'Company-Calibrated',
    estimatedTime: '90–120 Mins / Exam',
    coverage: '42 Company Blueprints',
    helpsWith: 'Overcoming test anxiety, mastering sectional time allocation, and understanding negative marking penalties.',
    keyTopics: [
      { name: 'Amazon SDE-1 OA Simulator', count: '4 Tests', desc: '2 Coding questions (70 min) + Work Simulation Assessment' },
      { name: 'TCS NQT Full-Length Pattern', count: '6 Tests', desc: 'Sectional timer across Quants, Reasoning, Verbal & Advanced Code' },
      { name: 'Zoho Application Round Simulation', count: '5 Tests', desc: 'Pure algorithmic logic building without built-in library helpers' },
      { name: 'General Placement Benchmark Exam', count: '8 Tests', desc: 'Standard campus drive assessment pattern' }
    ],
    nextAction: 'Launch Timed Mock Exam'
  },
  {
    step: '04',
    id: 'courses-theory',
    title: 'Courses & Core CS Sets',
    subtitle: 'Structured video modules and concise revision notes for tech interviews',
    category: 'Theoretical Foundations',
    icon: 'BookOpen',
    accentColor: '#10B981',
    difficulty: 'Intermediate',
    estimatedTime: '30–45 Hours',
    coverage: '12 Comprehensive Courses',
    helpsWith: 'Cracking in-depth technical interview questions on database concurrency, kernel memory, and object-oriented design.',
    keyTopics: [
      { name: 'Database Management Systems (DBMS)', count: '14 Modules', desc: 'ACID properties, B+ Trees, indexing, SQL queries' },
      { name: 'Operating Systems (OS)', count: '12 Modules', desc: 'Deadlocks, virtual memory, threads vs processes, paging' },
      { name: 'Computer Networks (CN)', count: '10 Modules', desc: 'TCP 3-way handshake, OSI model, HTTP/HTTPS, DNS resolution' },
      { name: 'Low-Level & Object Oriented Design', count: '16 Modules', desc: 'SOLID principles, design patterns, schema design' }
    ],
    nextAction: 'Review DBMS Interview Flashcards'
  },
  {
    step: '05',
    id: 'progress-analytics',
    title: 'Progress & Placement Analytics',
    subtitle: 'Personalized readiness index, weak-area heatmaps, and ranking percentiles',
    category: 'Performance Intelligence',
    icon: 'BarChart3',
    accentColor: '#F59E0B',
    difficulty: 'All Levels',
    estimatedTime: 'Real-time Telemetry',
    coverage: 'Granular Insights',
    helpsWith: 'Knowing exactly what topic to focus on next instead of wasting time randomly solving questions you already know.',
    keyTopics: [
      { name: 'Company Readiness Index (%)', count: 'Live Score', desc: 'Predictive algorithm based on your test accuracy & speed' },
      { name: 'Topic Weakness Radar', count: 'Heatmap', desc: 'Flags areas like Graphs or Probability needing immediate review' },
      { name: 'Peer Benchmark & Batch Rank', count: 'Campus Level', desc: 'Compare your preparation status with your college peers' },
      { name: 'Accuracy vs Speed Breakdown', count: 'Time Metrics', desc: 'Average time spent per coding and aptitude problem' }
    ],
    nextAction: 'View Your Personal Readiness Score'
  }
];
