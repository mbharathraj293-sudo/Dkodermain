export const practiceQuestions = [
  {
    id: 'q-two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    topic: 'Arrays & Hashing',
    company: 'Amazon',
    packageTier: '20+ LPA',
    acceptance: '51.2%',
    frequency: 'Very High (Asked in 42% of Amazon OAs)',
    whyQuestion: {
      target: 'Amazon',
      package: '20+ LPA',
      skill: 'Arrays & Hash Maps',
      difficulty: 'Easy',
      strengthens: ['Hash Map In-Memory Lookup', 'O(N) Time Complexity', 'Boundary Edge-Case Testing'],
      context: 'Fundamental two-pass to one-pass hash map optimization that recruiters use as a baseline sanity check in screening rounds.'
    }
  },
  {
    id: 'q-subarray-sum',
    title: 'Subarray Sum Equals K',
    difficulty: 'Medium',
    topic: 'Prefix Sums',
    company: 'Google',
    packageTier: '20+ LPA',
    acceptance: '43.8%',
    frequency: 'High (Frequent in Google Onsite)',
    whyQuestion: {
      target: 'Google',
      package: '20+ LPA',
      skill: 'Prefix Sum & Cumulative Frequencies',
      difficulty: 'Medium',
      strengthens: ['Prefix Sum Pattern', 'Handling Negative Integers', 'Continuous Subarray Math'],
      context: 'Standard test of whether candidates jump into O(N²) nested loops or intuitively recognize prefix sum reduction to O(N).'
    }
  },
  {
    id: 'q-course-schedule',
    title: 'Course Schedule II',
    difficulty: 'Medium',
    topic: 'Graph & Topo Sort',
    company: 'Amazon',
    packageTier: '20+ LPA',
    acceptance: '48.9%',
    frequency: 'Extremely High (Amazon Bar Raiser favorite)',
    whyQuestion: {
      target: 'Amazon',
      package: '20+ LPA',
      skill: 'Directed Acyclic Graphs (DAG)',
      difficulty: 'Medium',
      strengthens: ['Kahns Algorithm (BFS Topo)', 'Cycle Detection in Dependency Graphs', 'Queue State Tracking'],
      context: 'Directly mirrors real-world build dependency management and microservice initialization order asked in senior SDE rounds.'
    }
  },
  {
    id: 'q-lru-cache',
    title: 'LRU Cache Implementation',
    difficulty: 'Hard',
    topic: 'Design & Linked List',
    company: 'Microsoft',
    packageTier: '20+ LPA',
    acceptance: '41.5%',
    frequency: 'Signature Question (Microsoft & Flipkart)',
    whyQuestion: {
      target: 'Microsoft',
      package: '20+ LPA',
      skill: 'Doubly Linked List + Hash Map',
      difficulty: 'Hard',
      strengthens: ['O(1) Get and Put Operations', 'Node Eviction Policies', 'Object-Oriented Encapsulation'],
      context: 'The premier low-level design question testing if you can combine two data structures to achieve strict O(1) performance.'
    }
  },
  {
    id: 'q-train-reservation',
    title: 'Railway Reservation Waiting List Engine',
    difficulty: 'Medium',
    topic: 'Application Design',
    company: 'Zoho',
    packageTier: '6–12 LPA',
    acceptance: '38.4%',
    frequency: 'Zoho Round 3 Mandatory Pattern',
    whyQuestion: {
      target: 'Zoho',
      package: '6–12 LPA',
      skill: 'Pure Logic & State Machine',
      difficulty: 'Medium',
      strengthens: ['RAC & Waiting List Confirmation Logic', 'String Parsing without Built-in Regex', 'In-Memory Transaction Queues'],
      context: 'Zoho specifically tests your ability to model real-world business constraints without relying on external libraries or frameworks.'
    }
  },
  {
    id: 'q-prime-pattern',
    title: 'N-th Circular Prime Subsequence',
    difficulty: 'Basic',
    topic: 'Number Theory',
    company: 'TCS',
    packageTier: '3–7 LPA',
    acceptance: '62.1%',
    frequency: 'TCS NQT Advanced Section Standard',
    whyQuestion: {
      target: 'TCS',
      package: '3–7 LPA',
      skill: 'Sieve of Eratosthenes & Modulo',
      difficulty: 'Basic',
      strengthens: ['Time-Constrained Primality Tests', 'Integer Overflow Prevention', 'Digit Rotations'],
      context: 'The benchmark problem separating TCS Digital candidates (7 LPA) from standard Ninja profiles in national qualifying tests.'
    }
  }
];
