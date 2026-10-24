export const codingProblems = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    companies: ['Amazon', 'Google', 'Microsoft', 'TCS Digital'],
    acceptanceRate: '49.8%',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      }
    ],
    starterCodes: {
      JavaScript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      Python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        hash_map = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in hash_map:
                return [hash_map[complement], i]
            hash_map[num] = i
        return []`,
      Java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
      'C++': `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> numMap;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (numMap.find(complement) != numMap.end()) {
                return { numMap[complement], i };
            }
            numMap[nums[i]] = i;
        }
        return {};
    }
};`,
      SQL: `-- Finding paired transaction accounts totaling target
SELECT a.id AS id1, b.id AS id2
FROM accounts a
JOIN accounts b ON a.balance + b.balance = 9
WHERE a.id < b.id
LIMIT 1;`
    },
    testCases: [
      { id: 1, input: 'nums = [2,7,11,15], target = 9', expected: '[0, 1]', status: 'Passed' },
      { id: 2, input: 'nums = [3,2,4], target = 6', expected: '[1, 2]', status: 'Passed' },
      { id: 3, input: 'nums = [3,3], target = 6', expected: '[0, 1]', status: 'Passed' }
    ],
    executionMetrics: {
      runtime: '38 ms',
      runtimePercentile: 'Beats 94.2% of submissions',
      memory: '42.1 MB',
      memoryPercentile: 'Beats 88.6% of submissions'
    }
  }
];
