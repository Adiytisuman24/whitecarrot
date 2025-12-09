
export interface Question {
    id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    topic: string;
    companies: string[];
    desc: string;
    template: string;
}

export const DSA_QUESTIONS: Question[] = [
    // --- FAANG Classics ---
    {
        id: 'arr-1',
        title: 'Two Sum',
        difficulty: 'Easy',
        topic: 'Arrays',
        companies: ['Google', 'Amazon', 'Meta'],
        desc: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
        template: 'function twoSum(nums, target) {\n  // your code here \n}'
    },
    {
        id: 'dp-1',
        title: 'Climbing Stairs',
        difficulty: 'Easy',
        topic: 'DP',
        companies: ['Amazon', 'Apple'],
        desc: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
        template: 'function climbStairs(n) {\n  // your code here \n}'
    },
    {
        id: 'arr-2',
        title: 'Best Time to Buy and Sell Stock',
        difficulty: 'Easy',
        topic: 'Arrays',
        companies: ['Amazon', 'Microsoft', 'Netflix'],
        desc: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
        template: 'function maxProfit(prices) {\n  // your code here \n}'
    },
    {
        id: 'll-1',
        title: 'Reverse Linked List',
        difficulty: 'Easy',
        topic: 'Linked Lists',
        companies: ['Google', 'Meta', 'Microsoft'],
        desc: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
        template: 'function reverseList(head) {\n  // your code here \n}'
    },
    {
        id: 'tree-1',
        title: 'Invert Binary Tree',
        difficulty: 'Easy',
        topic: 'Trees',
        companies: ['Google', 'Homebrew'],
        desc: 'Given the root of a binary tree, invert the tree, and return its root.',
        template: 'function invertTree(root) {\n  // your code here \n}'
    },
    
    // --- Medium / Core ---
    {
        id: 'str-1',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        topic: 'Strings',
        companies: ['Amazon', 'Meta', 'Netflix'],
        desc: 'Given a string s, find the length of the longest substring without repeating characters.',
        template: 'function lengthOfLongestSubstring(s) {\n  // your code here \n}'
    },
    {
        id: 'arr-3',
        title: '3Sum',
        difficulty: 'Medium',
        topic: 'Arrays',
        companies: ['Facebook', 'Amazon', 'Apple'],
        desc: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
        template: 'function threeSum(nums) {\n  // your code here \n}'
    },
    {
        id: 'graph-1',
        title: 'Number of Islands',
        difficulty: 'Medium',
        topic: 'Graphs',
        companies: ['Amazon', 'Google', 'Microsoft'],
        desc: 'Given an m x n 2D binary grid grid which represents a map of "1"s (land) and "0"s (water), return the number of islands.',
        template: 'function numIslands(grid) {\n  // your code here \n}'
    },
    {
        id: 'heap-1',
        title: 'Kth Largest Element in an Array',
        difficulty: 'Medium',
        topic: 'Heaps',
        companies: ['Facebook', 'Amazon'],
        desc: 'Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.',
        template: 'function findKthLargest(nums, k) {\n  // your code here \n}'
    },
    {
        id: 'dp-2',
        title: 'Coin Change',
        difficulty: 'Medium',
        topic: 'DP',
        companies: ['Amazon', 'Uber'],
        desc: 'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount.',
        template: 'function coinChange(coins, amount) {\n  // your code here \n}'
    },

    // --- Hard / ICPC Style ---
    {
        id: 'dp-3',
        title: 'Trapping Rain Water',
        difficulty: 'Hard',
        topic: 'DP',
        companies: ['Google', 'Amazon', 'Goldman Sachs'],
        desc: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
        template: 'function trap(height) {\n  // your code here \n}'
    },
    {
        id: 'graph-2',
        title: 'Word Ladder II',
        difficulty: 'Hard',
        topic: 'Graphs',
        companies: ['Amazon', 'Yelp'],
        desc: 'A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that every adjacent pair differs by a single letter. Return all the shortest transformation sequences from beginWord to endWord.',
        template: 'function findLadders(beginWord, endWord, wordList) {\n  // your code here \n}'
    },
    {
        id: 'design-1',
        title: 'LRU Cache',
        difficulty: 'Medium',
        topic: 'Design',
        companies: ['Netflix', 'Amazon', 'Facebook'],
        desc: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.',
        template: 'class LRUCache {\n  constructor(capacity) { ... }\n  get(key) { ... }\n  put(key, value) { ... }\n}'
    },
    {
        id: 'icpc-1',
        title: 'Optimal Trade Routes (ICPC Regionals)',
        difficulty: 'Hard',
        topic: 'Graph Theory',
        companies: ['ICPC', 'High Frequency Trading'],
        desc: 'Given a galaxy with N planets and M wormholes, calculate the maximum profit achievable by traversing a loop of wormholes considering time dilation effects modeled by relative weights.',
        template: 'function solve(N, M, edges) {\n  // your code here \n}'
    },
    {
        id: 'arr-4',
        title: 'Median of Two Sorted Arrays',
        difficulty: 'Hard',
        topic: 'Arrays',
        companies: ['Google', 'Microsoft', 'Apple'],
        desc: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).',
        template: 'function findMedianSortedArrays(nums1, nums2) {\n  // your code here \n}'
    },
    {
        id: 'tree-2',
        title: 'Serialize and Deserialize Binary Tree',
        difficulty: 'Hard',
        topic: 'Trees',
        companies: ['Uber', 'Google'],
        desc: 'Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored. Design an algorithm to serialize and deserialize a binary tree.',
        template: 'function serialize(root) { ... }\nfunction deserialize(data) { ... }'
    },
    {
        id: 'backtrack-1',
        title: 'N-Queens',
        difficulty: 'Hard',
        topic: 'Backtracking',
        companies: ['Facebook', 'Microsoft'],
        desc: 'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Return all distinct solutions to the n-queens puzzle.',
        template: 'function solveNQueens(n) {\n  // your code here \n}'
    }
];
// Note: This mocked list represents a subset of the full database of 250+ questions available in the production environment.
