export function generatePlacementPath({ company = 'Amazon', pkg = '20–40 LPA', language = 'Java', level = 'Intermediate', goal = 'Full-Time SDE' }) {
  // Company-specific knowledge base
  const companyProfiles = {
    Amazon: {
      accent: '#FACC15',
      primaryFocus: 'Binary Trees, Graphs, Dynamic Programming & Leadership Principles',
      coreModules: ['Advanced Tree Traversals & BST', 'Graph BFS/DFS & Dijkstra', 'System Low-Level Design', '16 Amazon Leadership Principles'],
      practiceRhythm: '3 Medium + 1 Hard Problem Daily',
      mockAssessment: 'Amazon SDE-1 OA Simulator (2 Coding Qs + Work Style Assessment)',
      nextBestAction: 'Solve "Course Schedule" and study Customer Obsession & Ownership STAR responses',
      estimatedPrepTime: level === 'Advanced' ? '3–4 Weeks' : level === 'Intermediate' ? '6–8 Weeks' : '12–14 Weeks',
      hiringRounds: ['Codility / HackerRank OA', 'Technical Round 1 (DSA)', 'Technical Round 2 (LLD/DSA)', 'Bar Raiser']
    },
    Google: {
      accent: '#38BDF8',
      primaryFocus: 'Advanced Graph Algorithms, Tree DP, Bit Manipulation & Optimal Complexity',
      coreModules: ['Graph Topological Sort & Min-Spanning', 'DP with Bitmasks', 'Memory Allocation & Concurrency', 'Googliness Culture Alignment'],
      practiceRhythm: '2 Hard + 2 Medium Problems Daily',
      mockAssessment: 'Google Early Career Technical Screen Benchmark',
      nextBestAction: 'Solve "Shortest Path Visiting All Nodes" with O(N * 2^N) state compression',
      estimatedPrepTime: level === 'Advanced' ? '4–6 Weeks' : level === 'Intermediate' ? '8–10 Weeks' : '14–16 Weeks',
      hiringRounds: ['Online Challenge', 'Technical Phone Screen', '3 Onsite DSA Rounds', 'Googliness Evaluation']
    },
    Microsoft: {
      accent: '#34D399',
      primaryFocus: 'Binary Trees, Tries, Matrix BFS, Clean Code & Object-Oriented Principles',
      coreModules: ['Prefix Trees (Trie) & String Hashing', 'Matrix Traversal & In-place Rotations', 'SOLID OOP Design in ' + language, 'Codility OA Strategy'],
      practiceRhythm: '3 Medium Problems Daily focusing on edge cases',
      mockAssessment: 'Microsoft Codility 3-Question Speed OA (90 Mins)',
      nextBestAction: 'Solve "Serialize & Deserialize Binary Tree" focusing on minimal overhead string parsing',
      estimatedPrepTime: level === 'Advanced' ? '3–4 Weeks' : level === 'Intermediate' ? '6–8 Weeks' : '10–12 Weeks',
      hiringRounds: ['Codility OA', 'DSA Round 1', 'DSA Round 2', 'AA (System & Values) Round']
    },
    Zoho: {
      accent: '#EF4444',
      primaryFocus: 'Pure Logic Building, Custom String Parsing & Real-Time Application Development (CLI/GUI)',
      coreModules: ['Nested Loop Matrix Patterns', 'Custom String Tokenizers (No built-in regex)', 'In-Memory State Management', 'Object-Oriented Modeling in Java/C'],
      practiceRhythm: '2 Application Development Prompts / Week',
      mockAssessment: 'Zoho Round 2 & 3 Machine Coding Arena',
      nextBestAction: 'Build a Train Ticket Reservation System CLI with Waiting List & RAC confirmation logic',
      estimatedPrepTime: level === 'Advanced' ? '2–3 Weeks' : level === 'Intermediate' ? '4–5 Weeks' : '8–10 Weeks',
      hiringRounds: ['Basic Aptitude & C/Java Output Tracing', 'Advanced Coding (5 Logic Questions)', 'App Development Round', 'Technical HR']
    },
    TCS: {
      accent: '#A855F7',
      primaryFocus: 'Speed Aptitude (Quants & Logical), Verbal, Fundamental Arrays & Advanced Coding',
      coreModules: ['Quantitative Short Tricks & Formulae', 'Analytical & Syllogism Drills', 'Array Math & Two Pointers in ' + language, 'Basic SQL Queries'],
      practiceRhythm: '30 Aptitude Questions + 2 Coding Problems Daily',
      mockAssessment: 'TCS NQT Full-Length Mock (Cognitive + Programming)',
      nextBestAction: 'Complete 40-minute Speed Quants Test with negative marking constraints',
      estimatedPrepTime: level === 'Advanced' ? '1–2 Weeks' : level === 'Intermediate' ? '3–4 Weeks' : '6–8 Weeks',
      hiringRounds: ['NQT Cognitive Section', 'NQT Advanced Coding', 'Technical Interview', 'Managerial & HR']
    },
    Flipkart: {
      accent: '#F59E0B',
      primaryFocus: 'Machine Coding (2-Hour Live Application Design), Heaps, Concurrency & Clean Code',
      coreModules: ['Design Patterns (Strategy, Factory, Observer)', 'In-Memory Key-Value Stores', 'Graph Shortest Paths', 'Exception Handling & Unit Tests'],
      practiceRhythm: '1 Full Machine Coding Practice Sprint every 3 days',
      mockAssessment: 'Flipkart Machine Coding Round Simulator',
      nextBestAction: 'Implement an In-Memory Task Scheduler with Priority Queue and Worker Pool',
      estimatedPrepTime: level === 'Advanced' ? '3–4 Weeks' : level === 'Intermediate' ? '6–7 Weeks' : '10–12 Weeks',
      hiringRounds: ['HackerEarth OA', 'Machine Coding (120 Mins)', 'Problem Solving & DSA', 'Engineering Manager']
    }
  };

  const profile = companyProfiles[company] || companyProfiles.Amazon;

  // 6 Progressive Steps in the Placement Journey
  const steps = [
    {
      id: 'step-target',
      stage: '01 TARGET',
      title: `${company} (${pkg})`,
      detail: `Role Focus: ${goal} • Language: ${language} (${level})`,
      status: 'Target Configured',
      highlightColor: profile.accent
    },
    {
      id: 'step-prep',
      stage: '02 PREPARE',
      title: 'Curated Core Fundamentals',
      detail: profile.primaryFocus,
      status: 'Curriculum Locked',
      highlightColor: '#FACC15'
    },
    {
      id: 'step-practice',
      stage: '03 PRACTICE',
      title: `${language} Problem Sets`,
      detail: profile.practiceRhythm,
      status: 'Daily Sprints Active',
      highlightColor: '#7E3AF2'
    },
    {
      id: 'step-mock',
      stage: '04 ASSESS',
      title: 'Proctored Mock Simulation',
      detail: profile.mockAssessment,
      status: 'Readiness Benchmark',
      highlightColor: '#38BDF8'
    },
    {
      id: 'step-interview',
      stage: '05 INTERVIEW',
      title: 'Company Rounds Rehearsal',
      detail: profile.hiringRounds.slice(0, 3).join(' ➔ '),
      status: 'Interview Protocol',
      highlightColor: '#10B981'
    },
    {
      id: 'step-ready',
      stage: '06 GET READY',
      title: 'Placement Verification',
      detail: `Estimated target readiness window: ${profile.estimatedPrepTime}`,
      status: 'Target Achieved',
      highlightColor: '#F59E0B'
    }
  ];

  return {
    company,
    pkg,
    language,
    level,
    goal,
    profile,
    steps,
    nextBestAction: profile.nextBestAction,
    estimatedPrepTime: profile.estimatedPrepTime,
    hiringRounds: profile.hiringRounds
  };
}
