/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/dao/debugArgDao.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Thursday, November 10th 2022, 11:38:10 pm
 * Author: ccagml
 *
 * Copyright (c) 2023 ccagml . All rights reserved
 */

import { IProblemType } from "../utils/problemUtils";

class DebugArgDao {
  private argType = {
    1: {
      funName: "twoSum",
      paramTypes: ["number[]", "number"],
    },
    2: {
      funName: "addTwoNumbers",
      paramTypes: ["ListNode", "ListNode"],
    },
    3: {
      funName: "lengthOfLongestSubstring",
      paramTypes: ["string"],
    },
    4: {
      funName: "findMedianSortedArrays",
      paramTypes: ["number[]", "number[]"],
    },
    5: {
      funName: "longestPalindrome",
      paramTypes: ["string"],
    },
    6: {
      funName: "convert",
      paramTypes: ["string", "number"],
    },
    7: {
      funName: "reverse",
      paramTypes: ["number"],
    },
    8: {
      funName: "myAtoi",
      paramTypes: ["string"],
    },
    9: {
      funName: "isPalindrome",
      paramTypes: ["number"],
    },
    10: {
      funName: "isMatch",
      paramTypes: ["string", "string"],
    },
    11: {
      funName: "maxArea",
      paramTypes: ["number[]"],
    },
    12: {
      funName: "intToRoman",
      paramTypes: ["number"],
    },
    13: {
      funName: "romanToInt",
      paramTypes: ["string"],
    },
    14: {
      funName: "longestCommonPrefix",
      paramTypes: ["string[]"],
    },
    15: {
      funName: "threeSum",
      paramTypes: ["number[]"],
    },
    16: {
      funName: "threeSumClosest",
      paramTypes: ["number[]", "number"],
    },
    17: {
      funName: "letterCombinations",
      paramTypes: ["string"],
    },
    18: {
      funName: "fourSum",
      paramTypes: ["number[]", "number"],
    },
    19: {
      funName: "removeNthFromEnd",
      paramTypes: ["ListNode", "number"],
    },
    20: {
      funName: "isValid",
      paramTypes: ["string"],
    },
    21: {
      funName: "mergeTwoLists",
      paramTypes: ["ListNode", "ListNode"],
    },
    22: {
      funName: "generateParenthesis",
      paramTypes: ["number"],
    },
    23: {
      funName: "mergeKLists",
      paramTypes: ["ListNode[]"],
    },
    24: {
      funName: "swapPairs",
      paramTypes: ["ListNode"],
    },
    25: {
      funName: "reverseKGroup",
      paramTypes: ["ListNode", "number"],
    },
    26: {
      funName: "removeDuplicates",
      paramTypes: ["number[]"],
    },
    27: {
      funName: "removeElement",
      paramTypes: ["number[]", "number"],
    },
    28: {
      funName: "strStr",
      paramTypes: ["string", "string"],
    },
    29: {
      funName: "divide",
      paramTypes: ["number", "number"],
    },
    30: {
      funName: "findSubstring",
      paramTypes: ["string", "string[]"],
    },
    31: {
      funName: "nextPermutation",
      paramTypes: ["number[]"],
    },
    32: {
      funName: "longestValidParentheses",
      paramTypes: ["string"],
    },
    33: {
      funName: "search",
      paramTypes: ["number[]", "number"],
    },
    34: {
      funName: "searchRange",
      paramTypes: ["number[]", "number"],
    },
    35: {
      funName: "searchInsert",
      paramTypes: ["number[]", "number"],
    },
    36: {
      funName: "isValidSudoku",
      paramTypes: ["character[][]"],
    },
    37: {
      funName: "solveSudoku",
      paramTypes: ["character[][]"],
    },
    38: {
      funName: "countAndSay",
      paramTypes: ["number"],
    },
    39: {
      funName: "combinationSum",
      paramTypes: ["number[]", "number"],
    },
    40: {
      funName: "combinationSum2",
      paramTypes: ["number[]", "number"],
    },
    41: {
      funName: "firstMissingPositive",
      paramTypes: ["number[]"],
    },
    42: {
      funName: "trap",
      paramTypes: ["number[]"],
    },
    43: {
      funName: "multiply",
      paramTypes: ["string", "string"],
    },
    44: {
      funName: "isMatch",
      paramTypes: ["string", "string"],
    },
    45: {
      funName: "jump",
      paramTypes: ["number[]"],
    },
    46: {
      funName: "permute",
      paramTypes: ["number[]"],
    },
    47: {
      funName: "permuteUnique",
      paramTypes: ["number[]"],
    },
    48: {
      funName: "rotate",
      paramTypes: ["number[][]"],
    },
    49: {
      funName: "groupAnagrams",
      paramTypes: ["string[]"],
    },
    50: {
      funName: "myPow",
      paramTypes: ["number", "number"],
    },
    51: {
      funName: "solveNQueens",
      paramTypes: ["number"],
    },
    52: {
      funName: "totalNQueens",
      paramTypes: ["number"],
    },
    53: {
      funName: "maxSubArray",
      paramTypes: ["number[]"],
    },
    54: {
      funName: "spiralOrder",
      paramTypes: ["number[][]"],
    },
    55: {
      funName: "canJump",
      paramTypes: ["number[]"],
    },
    56: {
      funName: "merge",
      paramTypes: ["number[][]"],
    },
    57: {
      funName: "insert",
      paramTypes: ["number[][]", "number[]"],
    },
    58: {
      funName: "lengthOfLastWord",
      paramTypes: ["string"],
    },
    59: {
      funName: "generateMatrix",
      paramTypes: ["number"],
    },
    60: {
      funName: "getPermutation",
      paramTypes: ["number", "number"],
    },
    61: {
      funName: "rotateRight",
      paramTypes: ["ListNode", "number"],
    },
    62: {
      funName: "uniquePaths",
      paramTypes: ["number", "number"],
    },
    63: {
      funName: "uniquePathsWithObstacles",
      paramTypes: ["number[][]"],
    },
    64: {
      funName: "minPathSum",
      paramTypes: ["number[][]"],
    },
    65: {
      funName: "isNumber",
      paramTypes: ["string"],
    },
    66: {
      funName: "plusOne",
      paramTypes: ["number[]"],
    },
    67: {
      funName: "addBinary",
      paramTypes: ["string", "string"],
    },
    68: {
      funName: "fullJustify",
      paramTypes: ["string[]", "number"],
    },
    69: {
      funName: "mySqrt",
      paramTypes: ["number"],
    },
    70: {
      funName: "climbStairs",
      paramTypes: ["number"],
    },
    71: {
      funName: "simplifyPath",
      paramTypes: ["string"],
    },
    72: {
      funName: "minDistance",
      paramTypes: ["string", "string"],
    },
    73: {
      funName: "setZeroes",
      paramTypes: ["number[][]"],
    },
    74: {
      funName: "searchMatrix",
      paramTypes: ["number[][]", "number"],
    },
    75: {
      funName: "sortColors",
      paramTypes: ["number[]"],
    },
    76: {
      funName: "minWindow",
      paramTypes: ["string", "string"],
    },
    77: {
      funName: "combine",
      paramTypes: ["number", "number"],
    },
    78: {
      funName: "subsets",
      paramTypes: ["number[]"],
    },
    79: {
      funName: "exist",
      paramTypes: ["character[][]", "string"],
    },
    80: {
      funName: "removeDuplicates",
      paramTypes: ["number[]"],
    },
    81: {
      funName: "search",
      paramTypes: ["number[]", "number"],
    },
    82: {
      funName: "deleteDuplicates",
      paramTypes: ["ListNode"],
    },
    83: {
      funName: "deleteDuplicates",
      paramTypes: ["ListNode"],
    },
    84: {
      funName: "largestRectangleArea",
      paramTypes: ["number[]"],
    },
    85: {
      funName: "maximalRectangle",
      paramTypes: ["character[][]"],
    },
    86: {
      funName: "partition",
      paramTypes: ["ListNode", "number"],
    },
    87: {
      funName: "isScramble",
      paramTypes: ["string", "string"],
    },
    88: {
      funName: "merge",
      paramTypes: ["number[]", "number", "number[]", "number"],
    },
    89: {
      funName: "grayCode",
      paramTypes: ["number"],
    },
    90: {
      funName: "subsetsWithDup",
      paramTypes: ["number[]"],
    },
    91: {
      funName: "numDecodings",
      paramTypes: ["string"],
    },
    92: {
      funName: "reverseBetween",
      paramTypes: ["ListNode", "number", "number"],
    },
    93: {
      funName: "restoreIpAddresses",
      paramTypes: ["string"],
    },
    94: {
      funName: "inorderTraversal",
      paramTypes: ["TreeNode"],
    },
    95: {
      funName: "generateTrees",
      paramTypes: ["number"],
    },
    96: {
      funName: "numTrees",
      paramTypes: ["number"],
    },
    97: {
      funName: "isInterleave",
      paramTypes: ["string", "string", "string"],
    },
    98: {
      funName: "isValidBST",
      paramTypes: ["TreeNode"],
    },
    99: {
      funName: "recoverTree",
      paramTypes: ["TreeNode"],
    },
    100: {
      funName: "isSameTree",
      paramTypes: ["TreeNode", "TreeNode"],
    },
    101: {
      funName: "isSymmetric",
      paramTypes: ["TreeNode"],
    },
    102: {
      funName: "levelOrder",
      paramTypes: ["TreeNode"],
    },
    103: {
      funName: "zigzagLevelOrder",
      paramTypes: ["TreeNode"],
    },
    104: {
      funName: "maxDepth",
      paramTypes: ["TreeNode"],
    },
    105: {
      funName: "buildTree",
      paramTypes: ["number[]", "number[]"],
    },
    106: {
      funName: "buildTree",
      paramTypes: ["number[]", "number[]"],
    },
    107: {
      funName: "levelOrderBottom",
      paramTypes: ["TreeNode"],
    },
    108: {
      funName: "sortedArrayToBST",
      paramTypes: ["number[]"],
    },
    109: {
      funName: "sortedListToBST",
      paramTypes: ["ListNode"],
    },
    110: {
      funName: "isBalanced",
      paramTypes: ["TreeNode"],
    },
    111: {
      funName: "minDepth",
      paramTypes: ["TreeNode"],
    },
    112: {
      funName: "hasPathSum",
      paramTypes: ["TreeNode", "number"],
    },
    113: {
      funName: "pathSum",
      paramTypes: ["TreeNode", "number"],
    },
    114: {
      funName: "flatten",
      paramTypes: ["TreeNode"],
    },
    115: {
      funName: "numDistinct",
      paramTypes: ["string", "string"],
    },
    116: {
      funName: "connect",
      paramTypes: ["Node"],
    },
    117: {
      funName: "connect",
      paramTypes: ["Node"],
    },
    118: {
      funName: "generate",
      paramTypes: ["number"],
    },
    119: {
      funName: "getRow",
      paramTypes: ["number"],
    },
    120: {
      funName: "minimumTotal",
      paramTypes: ["number[][]"],
    },
    121: {
      funName: "maxProfit",
      paramTypes: ["number[]"],
    },
    122: {
      funName: "maxProfit",
      paramTypes: ["number[]"],
    },
    123: {
      funName: "maxProfit",
      paramTypes: ["number[]"],
    },
    124: {
      funName: "maxPathSum",
      paramTypes: ["TreeNode"],
    },
    125: {
      funName: "isPalindrome",
      paramTypes: ["string"],
    },
    126: {
      funName: "findLadders",
      paramTypes: ["string", "string", "string[]"],
    },
    127: {
      funName: "ladderLength",
      paramTypes: ["string", "string", "string[]"],
    },
    128: {
      funName: "longestConsecutive",
      paramTypes: ["number[]"],
    },
    129: {
      funName: "sumNumbers",
      paramTypes: ["TreeNode"],
    },
    130: {
      funName: "solve",
      paramTypes: ["character[][]"],
    },
    131: {
      funName: "partition",
      paramTypes: ["string"],
    },
    132: {
      funName: "minCut",
      paramTypes: ["string"],
    },
    133: {
      funName: "cloneGraph",
      paramTypes: ["Node"],
    },
    134: {
      funName: "canCompleteCircuit",
      paramTypes: ["number[]", "number[]"],
    },
    135: {
      funName: "candy",
      paramTypes: ["number[]"],
    },
    136: {
      funName: "singleNumber",
      paramTypes: ["number[]"],
    },
    137: {
      funName: "singleNumber",
      paramTypes: ["number[]"],
    },
    138: {
      funName: "copyRandomList",
      paramTypes: ["Node"],
    },
    139: {
      funName: "wordBreak",
      paramTypes: ["string", "string[]"],
    },
    140: {
      funName: "wordBreak",
      paramTypes: ["string", "string[]"],
    },
    141: {
      funName: "hasCycle",
      paramTypes: ["ListNode"],
    },
    142: {
      funName: "detectCycle",
      paramTypes: ["ListNode"],
    },
    143: {
      funName: "reorderList",
      paramTypes: ["ListNode"],
    },
    144: {
      funName: "preorderTraversal",
      paramTypes: ["TreeNode"],
    },
    145: {
      funName: "postorderTraversal",
      paramTypes: ["TreeNode"],
    },
    146: {
      funName: "LRUCache",
      paramTypes: [ "string[]","number[][]"],
    },
    147: {
      funName: "insertionSortList",
      paramTypes: ["ListNode"],
    },
    148: {
      funName: "sortList",
      paramTypes: ["ListNode"],
    },
    149: {
      funName: "maxPoints",
      paramTypes: ["number[][]"],
    },
    150: {
      funName: "evalRPN",
      paramTypes: ["string[]"],
    },
    151: {
      funName: "reverseWords",
      paramTypes: ["string"],
    },
    152: {
      funName: "maxProduct",
      paramTypes: ["number[]"],
    },
    153: {
      funName: "findMin",
      paramTypes: ["number[]"],
    },
    154: {
      funName: "findMin",
      paramTypes: ["number[]"],
    },
    155: {
      funName: "MinStack",
      paramTypes: [],
    },
    160: {
      funName: "getIntersectionNode",
      paramTypes: ["ListNode", "ListNode"],
    },
    162: {
      funName: "findPeakElement",
      paramTypes: ["number[]"],
    },
    164: {
      funName: "maximumGap",
      paramTypes: ["number[]"],
    },
    165: {
      funName: "compareVersion",
      paramTypes: ["string", "string"],
    },
    166: {
      funName: "fractionToDecimal",
      paramTypes: ["number", "number"],
    },
    167: {
      funName: "twoSum",
      paramTypes: ["number[]", "number"],
    },
    168: {
      funName: "convertToTitle",
      paramTypes: ["number"],
    },
    169: {
      funName: "majorityElement",
      paramTypes: ["number[]"],
    },
    171: {
      funName: "titleToNumber",
      paramTypes: ["string"],
    },
    172: {
      funName: "trailingZeroes",
      paramTypes: ["number"],
    },
    173: {
      funName: "BSTIterator",
      paramTypes: ["TreeNode"],
    },
    174: {
      funName: "calculateMinimumHP",
      paramTypes: ["number[][]"],
    },
    179: {
      funName: "largestNumber",
      paramTypes: ["number[]"],
    },
    187: {
      funName: "findRepeatedDnaSequences",
      paramTypes: ["string"],
    },
    188: {
      funName: "maxProfit",
      paramTypes: ["number", "number[]"],
    },
    189: {
      funName: "rotate",
      paramTypes: ["number[]", "number"],
    },
    190: {
      funName: "reverseBits",
      paramTypes: ["number"],
    },
    191: {
      funName: "hammingWeight",
      paramTypes: ["number"],
    },
    198: {
      funName: "rob",
      paramTypes: ["number[]"],
    },
    199: {
      funName: "rightSideView",
      paramTypes: ["TreeNode"],
    },
    200: {
      funName: "numIslands",
      paramTypes: ["character[][]"],
    },
    201: {
      funName: "rangeBitwiseAnd",
      paramTypes: ["number", "number"],
    },
    202: {
      funName: "isHappy",
      paramTypes: ["number"],
    },
    203: {
      funName: "removeElements",
      paramTypes: ["ListNode", "number"],
    },
    204: {
      funName: "countPrimes",
      paramTypes: ["number"],
    },
    205: {
      funName: "isIsomorphic",
      paramTypes: ["string", "string"],
    },
    206: {
      funName: "reverseList",
      paramTypes: ["ListNode"],
    },
    207: {
      funName: "canFinish",
      paramTypes: ["number", "number[][]"],
    },
    208: {
      funName: "Trie",
      paramTypes: [],
    },
    209: {
      funName: "minSubArrayLen",
      paramTypes: ["number", "number[]"],
    },
    210: {
      funName: "findOrder",
      paramTypes: ["number", "number[][]"],
    },
    211: {
      funName: "WordDictionary",
      paramTypes: [],
    },
    212: {
      funName: "findWords",
      paramTypes: ["character[][]", "string[]"],
    },
    213: {
      funName: "rob",
      paramTypes: ["number[]"],
    },
    214: {
      funName: "shortestPalindrome",
      paramTypes: ["string"],
    },
    215: {
      funName: "findKthLargest",
      paramTypes: ["number[]", "number"],
    },
    216: {
      funName: "combinationSum3",
      paramTypes: ["number", "number"],
    },
    217: {
      funName: "containsDuplicate",
      paramTypes: ["number[]"],
    },
    218: {
      funName: "getSkyline",
      paramTypes: ["number[][]"],
    },
    219: {
      funName: "containsNearbyDuplicate",
      paramTypes: ["number[]", "number"],
    },
    220: {
      funName: "containsNearbyAlmostDuplicate",
      paramTypes: ["number[]", "number", "number"],
    },
    221: {
      funName: "maximalSquare",
      paramTypes: ["character[][]"],
    },
    222: {
      funName: "countNodes",
      paramTypes: ["TreeNode"],
    },
    223: {
      funName: "computeArea",
      paramTypes: ["number", "number", "number", "number", "number", "number", "number", "number"],
    },
    224: {
      funName: "calculate",
      paramTypes: ["string"],
    },
    225: {
      funName: "MyStack",
      paramTypes: [],
    },
    226: {
      funName: "invertTree",
      paramTypes: ["TreeNode"],
    },
    227: {
      funName: "calculate",
      paramTypes: ["string"],
    },
    228: {
      funName: "summaryRanges",
      paramTypes: ["number[]"],
    },
    229: {
      funName: "majorityElement",
      paramTypes: ["number[]"],
    },
    230: {
      funName: "kthSmallest",
      paramTypes: ["TreeNode", "number"],
    },
    231: {
      funName: "isPowerOfTwo",
      paramTypes: ["number"],
    },
    232: {
      funName: "MyQueue",
      paramTypes: [],
    },
    233: {
      funName: "countDigitOne",
      paramTypes: ["number"],
    },
    234: {
      funName: "isPalindrome",
      paramTypes: ["ListNode"],
    },
    235: {
      funName: "lowestCommonAncestor",
      paramTypes: ["TreeNode", "TreeNode", "TreeNode"],
    },
    236: {
      funName: "lowestCommonAncestor",
      paramTypes: ["TreeNode", "TreeNode", "TreeNode"],
    },
    237: {
      funName: "deleteNode",
      paramTypes: ["ListNode"],
    },
    238: {
      funName: "productExceptSelf",
      paramTypes: ["number[]"],
    },
    239: {
      funName: "maxSlidingWindow",
      paramTypes: ["number[]", "number"],
    },
    240: {
      funName: "searchMatrix",
      paramTypes: ["number[][]", "number"],
    },
    241: {
      funName: "diffWaysToCompute",
      paramTypes: ["string"],
    },
    242: {
      funName: "isAnagram",
      paramTypes: ["string", "string"],
    },
    257: {
      funName: "binaryTreePaths",
      paramTypes: ["TreeNode"],
    },
    258: {
      funName: "addDigits",
      paramTypes: ["number"],
    },
    260: {
      funName: "singleNumber",
      paramTypes: ["number[]"],
    },
    263: {
      funName: "isUgly",
      paramTypes: ["number"],
    },
    264: {
      funName: "nthUglyNumber",
      paramTypes: ["number"],
    },
    268: {
      funName: "missingNumber",
      paramTypes: ["number[]"],
    },
    273: {
      funName: "numberToWords",
      paramTypes: ["number"],
    },
    274: {
      funName: "hIndex",
      paramTypes: ["number[]"],
    },
    275: {
      funName: "hIndex",
      paramTypes: ["number[]"],
    },
    278: {
      funName: "firstBadVersion",
      specialFunName: {
        javascript: "solution",
      },
      // changede from original
      paramTypes: ["number", "number"],
    },
    279: {
      funName: "numSquares",
      paramTypes: ["number"],
    },
    282: {
      funName: "addOperators",
      paramTypes: ["string", "number"],
    },
    283: {
      funName: "moveZeroes",
      paramTypes: ["number[]"],
    },
    287: {
      funName: "findDuplicate",
      paramTypes: ["number[]"],
    },
    289: {
      funName: "gameOfLife",
      paramTypes: ["number[][]"],
    },
    290: {
      funName: "wordPattern",
      paramTypes: ["string", "string"],
    },
    292: {
      funName: "canWinNim",
      paramTypes: ["number"],
    },
    295: {
      funName: "MedianFinder",
      paramTypes: [],
    },
    297: {
      funName: "serialize",
      paramTypes: ["TreeNode"],
    },
    299: {
      funName: "getHint",
      paramTypes: ["string", "string"],
    },
    300: {
      funName: "lengthOfLIS",
      paramTypes: ["number[]"],
    },
    301: {
      funName: "removeInvalidParentheses",
      paramTypes: ["string"],
    },
    303: {
      funName: "NumArray",
      paramTypes: ["number[]"],
    },
    304: {
      funName: "NumMatrix",
      paramTypes: ["number[][]"],
    },
    306: {
      funName: "isAdditiveNumber",
      paramTypes: ["string"],
    },
    307: {
      funName: "NumArray",
      paramTypes: ["number[]"],
    },
    309: {
      funName: "maxProfit",
      paramTypes: ["number[]"],
    },
    310: {
      funName: "findMinHeightTrees",
      paramTypes: ["number", "number[][]"],
    },
    312: {
      funName: "maxCoins",
      paramTypes: ["number[]"],
    },
    313: {
      funName: "nthSuperUglyNumber",
      paramTypes: ["number", "number[]"],
    },
    315: {
      funName: "countSmaller",
      paramTypes: ["number[]"],
    },
    316: {
      funName: "removeDuplicateLetters",
      paramTypes: ["string"],
    },
    318: {
      funName: "maxProduct",
      paramTypes: ["string[]"],
    },
    319: {
      funName: "bulbSwitch",
      paramTypes: ["number"],
    },
    321: {
      funName: "maxNumber",
      paramTypes: ["number[]", "number[]", "number"],
    },
    322: {
      funName: "coinChange",
      paramTypes: ["number[]", "number"],
    },
    324: {
      funName: "wiggleSort",
      paramTypes: ["number[]"],
    },
    326: {
      funName: "isPowerOfThree",
      paramTypes: ["number"],
    },
    327: {
      funName: "countRangeSum",
      paramTypes: ["number[]", "number", "number"],
    },
    328: {
      funName: "oddEvenList",
      paramTypes: ["ListNode"],
    },
    329: {
      funName: "longestIncreasingPath",
      paramTypes: ["number[][]"],
    },
    330: {
      funName: "minPatches",
      paramTypes: ["number[]", "number"],
    },
    331: {
      funName: "isValidSerialization",
      paramTypes: ["string"],
    },
    332: {
      funName: "findItinerary",
      paramTypes: ["string[][]"],
    },
    334: {
      funName: "increasingTriplet",
      paramTypes: ["number[]"],
    },
    335: {
      funName: "isSelfCrossing",
      paramTypes: ["number[]"],
    },
    336: {
      funName: "palindromePairs",
      paramTypes: ["string[]"],
    },
    337: {
      funName: "rob",
      paramTypes: ["TreeNode"],
    },
    338: {
      funName: "countBits",
      paramTypes: ["number"],
    },
    341: {
      funName: "NestedIterator",
      paramTypes: ["NestedInteger[]"],
    },
    342: {
      funName: "isPowerOfFour",
      paramTypes: ["number"],
    },
    343: {
      funName: "integerBreak",
      paramTypes: ["number"],
    },
    344: {
      funName: "reverseString",
      paramTypes: ["character[]"],
    },
    345: {
      funName: "reverseVowels",
      paramTypes: ["string"],
    },
    347: {
      funName: "topKFrequent",
      paramTypes: ["number[]", "number"],
    },
    349: {
      funName: "intersection",
      paramTypes: ["number[]", "number[]"],
    },
    350: {
      funName: "intersect",
      paramTypes: ["number[]", "number[]"],
    },
    352: {
      funName: "SummaryRanges",
      paramTypes: [],
    },
    354: {
      funName: "maxEnvelopes",
      paramTypes: ["number[][]"],
    },
    355: {
      funName: "Twitter",
      paramTypes: [],
    },
    357: {
      funName: "countNumbersWithUniqueDigits",
      paramTypes: ["number"],
    },
    363: {
      funName: "maxSumSubmatrix",
      paramTypes: ["number[][]", "number"],
    },
    365: {
      funName: "canMeasureWater",
      paramTypes: ["number", "number", "number"],
    },
    367: {
      funName: "isPerfectSquare",
      paramTypes: ["number"],
    },
    368: {
      funName: "largestDivisibleSubset",
      paramTypes: ["number[]"],
    },
    371: {
      funName: "getSum",
      paramTypes: ["number", "number"],
    },
    372: {
      funName: "superPow",
      paramTypes: ["number", "number[]"],
    },
    373: {
      funName: "kSmallestPairs",
      paramTypes: ["number[]", "number[]", "number"],
    },
    375: {
      funName: "getMoneyAmount",
      paramTypes: ["number"],
    },
    376: {
      funName: "wiggleMaxLength",
      paramTypes: ["number[]"],
    },
    377: {
      funName: "combinationSum4",
      paramTypes: ["number[]", "number"],
    },
    378: {
      funName: "kthSmallest",
      paramTypes: ["number[][]", "number"],
    },
    380: {
      funName: "RandomizedSet",
      paramTypes: [],
    },
    381: {
      funName: "RandomizedCollection",
      paramTypes: [],
    },
    382: {
      funName: "Solution",
      paramTypes: ["ListNode"],
    },
    383: {
      funName: "canConstruct",
      paramTypes: ["string", "string"],
    },
    384: {
      funName: "Solution",
      paramTypes: ["number[]"],
    },
    385: {
      funName: "deserialize",
      paramTypes: ["string"],
    },
    386: {
      funName: "lexicalOrder",
      paramTypes: ["number"],
    },
    387: {
      funName: "firstUniqChar",
      paramTypes: ["string"],
    },
    388: {
      funName: "lengthLongestPath",
      paramTypes: ["string"],
    },
    389: {
      funName: "findTheDifference",
      paramTypes: ["string", "string"],
    },
    390: {
      funName: "lastRemaining",
      paramTypes: ["number"],
    },
    391: {
      funName: "isRectangleCover",
      paramTypes: ["number[][]"],
    },
    392: {
      funName: "isSubsequence",
      paramTypes: ["string", "string"],
    },
    393: {
      funName: "validUtf8",
      paramTypes: ["number[]"],
    },
    394: {
      funName: "decodeString",
      paramTypes: ["string"],
    },
    395: {
      funName: "longestSubstring",
      paramTypes: ["string", "number"],
    },
    396: {
      funName: "maxRotateFunction",
      paramTypes: ["number[]"],
    },
    397: {
      funName: "integerReplacement",
      paramTypes: ["number"],
    },
    398: {
      funName: "Solution",
      paramTypes: ["number[]"],
    },
    399: {
      funName: "calcEquation",
      paramTypes: ["string[][]", "number[]", "string[][]"],
    },
    400: {
      funName: "findNthDigit",
      paramTypes: ["number"],
    },
    401: {
      funName: "readBinaryWatch",
      paramTypes: ["number"],
    },
    402: {
      funName: "removeKdigits",
      paramTypes: ["string", "number"],
    },
    403: {
      funName: "canCross",
      paramTypes: ["number[]"],
    },
    404: {
      funName: "sumOfLeftLeaves",
      paramTypes: ["TreeNode"],
    },
    405: {
      funName: "toHex",
      paramTypes: ["number"],
    },
    406: {
      funName: "reconstructQueue",
      paramTypes: ["number[][]"],
    },
    407: {
      funName: "trapRainWater",
      paramTypes: ["number[][]"],
    },
    409: {
      funName: "longestPalindrome",
      paramTypes: ["string"],
    },
    410: {
      funName: "splitArray",
      paramTypes: ["number[]", "number"],
    },
    412: {
      funName: "fizzBuzz",
      paramTypes: ["number"],
    },
    413: {
      funName: "numberOfArithmeticSlices",
      paramTypes: ["number[]"],
    },
    414: {
      funName: "thirdMax",
      paramTypes: ["number[]"],
    },
    415: {
      funName: "addStrings",
      paramTypes: ["string", "string"],
    },
    416: {
      funName: "canPartition",
      paramTypes: ["number[]"],
    },
    417: {
      funName: "pacificAtlantic",
      paramTypes: ["number[][]"],
    },
    419: {
      funName: "countBattleships",
      paramTypes: ["character[][]"],
    },
    420: {
      funName: "strongPasswordChecker",
      paramTypes: ["string"],
    },
    421: {
      funName: "findMaximumXOR",
      paramTypes: ["number[]"],
    },
    423: {
      funName: "originalDigits",
      paramTypes: ["string"],
    },
    424: {
      funName: "characterReplacement",
      paramTypes: ["string", "number"],
    },
    427: {
      funName: "construct",
      paramTypes: ["number[][]"],
    },
    429: {
      funName: "levelOrder",
      paramTypes: ["Node"],
    },
    // TODO: parse parameters
    // 430: {
    //     funName: "flatten",
    //     paramTypes: ["Node"],

    //
    // },
    432: {
      funName: "AllOne",
      paramTypes: [],
    },
    433: {
      funName: "minMutation",
      paramTypes: ["string", "string", "string[]"],
    },
    434: {
      funName: "countSegments",
      paramTypes: ["string"],
    },
    435: {
      funName: "eraseOverlapIntervals",
      paramTypes: ["number[][]"],
    },
    436: {
      funName: "findRightInterval",
      paramTypes: ["number[][]"],
    },
    437: {
      funName: "pathSum",
      paramTypes: ["TreeNode", "number"],
    },
    438: {
      funName: "findAnagrams",
      paramTypes: ["string", "string"],
    },
    440: {
      funName: "findKthNumber",
      paramTypes: ["number", "number"],
    },
    441: {
      funName: "arrangeCoins",
      paramTypes: ["number"],
    },
    442: {
      funName: "findDuplicates",
      paramTypes: ["number[]"],
    },
    443: {
      funName: "compress",
      paramTypes: ["character[]"],
    },
    445: {
      funName: "addTwoNumbers",
      paramTypes: ["ListNode", "ListNode"],
    },
    446: {
      funName: "numberOfArithmeticSlices",
      paramTypes: ["number[]"],
    },
    447: {
      funName: "numberOfBoomerangs",
      paramTypes: ["number[][]"],
    },
    448: {
      funName: "findDisappearedNumbers",
      paramTypes: ["number[]"],
    },
    449: {
      funName: "serialize",
      paramTypes: ["TreeNode"],
    },
    450: {
      funName: "deleteNode",
      paramTypes: ["TreeNode", "number"],
    },
    451: {
      funName: "frequencySort",
      paramTypes: ["string"],
    },
    452: {
      funName: "findMinArrowShots",
      paramTypes: ["number[][]"],
    },
    453: {
      funName: "minMoves",
      paramTypes: ["number[]"],
    },
    454: {
      funName: "fourSumCount",
      paramTypes: ["number[]", "number[]", "number[]", "number[]"],
    },
    455: {
      funName: "findContentChildren",
      paramTypes: ["number[]", "number[]"],
    },
    456: {
      funName: "find132pattern",
      paramTypes: ["number[]"],
    },
    457: {
      funName: "circularArrayLoop",
      paramTypes: ["number[]"],
    },
    458: {
      funName: "poorPigs",
      paramTypes: ["number", "number", "number"],
    },
    459: {
      funName: "repeatedSubstringPattern",
      paramTypes: ["string"],
    },
    460: {
      funName: "LFUCache",
      paramTypes: ["number"],
    },
    461: {
      funName: "hammingDistance",
      paramTypes: ["number", "number"],
    },
    462: {
      funName: "minMoves2",
      paramTypes: ["number[]"],
    },
    463: {
      funName: "islandPerimeter",
      paramTypes: ["number[][]"],
    },
    464: {
      funName: "canIWin",
      paramTypes: ["number", "number"],
    },
    466: {
      funName: "getMaxRepetitions",
      paramTypes: ["string", "number", "string", "number"],
    },
    467: {
      funName: "findSubstringInWraproundString",
      paramTypes: ["string"],
    },
    468: {
      funName: "validIPAddress",
      paramTypes: ["string"],
    },
    470: {
      funName: "rand10",
      paramTypes: [],
    },
    472: {
      funName: "findAllConcatenatedWordsInADict",
      paramTypes: ["string[]"],
    },
    473: {
      funName: "makesquare",
      paramTypes: ["number[]"],
    },
    474: {
      funName: "findMaxForm",
      paramTypes: ["string[]", "number", "number"],
    },
    475: {
      funName: "findRadius",
      paramTypes: ["number[]", "number[]"],
    },
    476: {
      funName: "findComplement",
      paramTypes: ["number"],
    },
    477: {
      funName: "totalHammingDistance",
      paramTypes: ["number[]"],
    },
    478: {
      funName: "Solution",
      paramTypes: ["number", "number", "number"],
    },
    479: {
      funName: "largestPalindrome",
      paramTypes: ["number"],
    },
    480: {
      funName: "medianSlidingWindow",
      paramTypes: ["number[]", "number"],
    },
    481: {
      funName: "magicalString",
      paramTypes: ["number"],
    },
    482: {
      funName: "licenseKeyFormatting",
      paramTypes: ["string", "number"],
    },
    483: {
      funName: "smallestGoodBase",
      paramTypes: ["string"],
    },
    485: {
      funName: "findMaxConsecutiveOnes",
      paramTypes: ["number[]"],
    },
    486: {
      funName: "PredictTheWinner",
      paramTypes: ["number[]"],
    },
    488: {
      funName: "findMinStep",
      paramTypes: ["string", "string"],
    },
    491: {
      funName: "findSubsequences",
      paramTypes: ["number[]"],
    },
    492: {
      funName: "constructRectangle",
      paramTypes: ["number"],
    },
    493: {
      funName: "reversePairs",
      paramTypes: ["number[]"],
    },
    494: {
      funName: "findTargetSumWays",
      paramTypes: ["number[]", "number"],
    },
    495: {
      funName: "findPoisonedDuration",
      paramTypes: ["number[]", "number"],
    },
    496: {
      funName: "nextGreaterElement",
      paramTypes: ["number[]", "number[]"],
    },
    497: {
      funName: "Solution",
      paramTypes: ["number[][]"],
    },
    498: {
      funName: "findDiagonalOrder",
      paramTypes: ["number[][]"],
    },
    500: {
      funName: "findWords",
      paramTypes: ["string[]"],
    },
    501: {
      funName: "findMode",
      paramTypes: ["TreeNode"],
    },
    502: {
      funName: "findMaximizedCapital",
      paramTypes: ["number", "number", "number[]", "number[]"],
    },
    503: {
      funName: "nextGreaterElements",
      paramTypes: ["number[]"],
    },
    504: {
      funName: "convertToBase7",
      paramTypes: ["number"],
    },
    506: {
      funName: "findRelativeRanks",
      paramTypes: ["number[]"],
    },
    507: {
      funName: "checkPerfectNumber",
      paramTypes: ["number"],
    },
    508: {
      funName: "findFrequentTreeSum",
      paramTypes: ["TreeNode"],
    },
    509: {
      funName: "fib",
      paramTypes: ["number"],
    },
    513: {
      funName: "findBottomLeftValue",
      paramTypes: ["TreeNode"],
    },
    514: {
      funName: "findRotateSteps",
      paramTypes: ["string", "string"],
    },
    515: {
      funName: "largestValues",
      paramTypes: ["TreeNode"],
    },
    516: {
      funName: "longestPalindromeSubseq",
      paramTypes: ["string"],
    },
    517: {
      funName: "findMinMoves",
      paramTypes: ["number[]"],
    },
    518: {
      funName: "change",
      paramTypes: ["number", "number[]"],
    },
    519: {
      funName: "Solution",
      paramTypes: ["number", "number"],
    },
    520: {
      funName: "detectCapitalUse",
      paramTypes: ["string"],
    },
    521: {
      funName: "findLUSlength",
      paramTypes: ["string", "string"],
    },
    522: {
      funName: "findLUSlength",
      paramTypes: ["string[]"],
    },
    523: {
      funName: "checkSubarraySum",
      paramTypes: ["number[]", "number"],
    },
    524: {
      funName: "findLongestWord",
      paramTypes: ["string", "string[]"],
    },
    525: {
      funName: "findMaxLength",
      paramTypes: ["number[]"],
    },
    526: {
      funName: "countArrangement",
      paramTypes: ["number"],
    },
    528: {
      funName: "Solution",
      paramTypes: ["number[]"],
    },
    529: {
      funName: "updateBoard",
      paramTypes: ["character[][]", "number[]"],
    },
    530: {
      funName: "getMinimumDifference",
      paramTypes: ["TreeNode"],
    },
    532: {
      funName: "findPairs",
      paramTypes: ["number[]", "number"],
    },
    535: {
      funName: "encode",
      paramTypes: ["string"],
    },
    537: {
      funName: "complexNumberMultiply",
      paramTypes: ["string", "string"],
    },
    538: {
      funName: "convertBST",
      paramTypes: ["TreeNode"],
    },
    539: {
      funName: "findMinDifference",
      paramTypes: ["string[]"],
    },
    540: {
      funName: "singleNonDuplicate",
      paramTypes: ["number[]"],
    },
    541: {
      funName: "reverseStr",
      paramTypes: ["string", "number"],
    },
    542: {
      funName: "updateMatrix",
      paramTypes: ["number[][]"],
    },
    543: {
      funName: "diameterOfBinaryTree",
      paramTypes: ["TreeNode"],
    },
    546: {
      funName: "removeBoxes",
      paramTypes: ["number[]"],
    },
    547: {
      funName: "findCircleNum",
      paramTypes: ["number[][]"],
    },
    551: {
      funName: "checkRecord",
      paramTypes: ["string"],
    },
    552: {
      funName: "checkRecord",
      paramTypes: ["number"],
    },
    553: {
      funName: "optimalDivision",
      paramTypes: ["number[]"],
    },
    554: {
      funName: "leastBricks",
      paramTypes: ["number[][]"],
    },
    556: {
      funName: "nextGreaterElement",
      paramTypes: ["number"],
    },
    557: {
      funName: "reverseWords",
      paramTypes: ["string"],
    },
    // TODO: parse parameters
    // 558: {
    //     funName: "intersect",
    //     paramTypes: ["Node", "Node"],

    //
    //
    // },
    559: {
      funName: "maxDepth",
      paramTypes: ["Node"],
    },
    560: {
      funName: "subarraySum",
      paramTypes: ["number[]", "number"],
    },
    561: {
      funName: "arrayPairSum",
      paramTypes: ["number[]"],
    },
    563: {
      funName: "findTilt",
      paramTypes: ["TreeNode"],
    },
    564: {
      funName: "nearestPalindromic",
      paramTypes: ["string"],
    },
    565: {
      funName: "arrayNesting",
      paramTypes: ["number[]"],
    },
    566: {
      funName: "matrixReshape",
      paramTypes: ["number[][]", "number", "number"],
    },
    567: {
      funName: "checkInclusion",
      paramTypes: ["string", "string"],
    },
    572: {
      funName: "isSubtree",
      paramTypes: ["TreeNode", "TreeNode"],
    },
    575: {
      funName: "distributeCandies",
      paramTypes: ["number[]"],
    },
    576: {
      funName: "findPaths",
      paramTypes: ["number", "number", "number", "number", "number"],
    },
    581: {
      funName: "findUnsortedSubarray",
      paramTypes: ["number[]"],
    },
    583: {
      funName: "minDistance",
      paramTypes: ["string", "string"],
    },
    587: {
      funName: "outerTrees",
      paramTypes: ["number[][]"],
    },
    589: {
      funName: "preorder",
      paramTypes: ["Node"],
    },
    590: {
      funName: "postorder",
      paramTypes: ["Node"],
    },
    591: {
      funName: "isValid",
      paramTypes: ["string"],
    },
    592: {
      funName: "fractionAddition",
      paramTypes: ["string"],
    },
    593: {
      funName: "validSquare",
      paramTypes: ["number[]", "number[]", "number[]", "number[]"],
    },
    594: {
      funName: "findLHS",
      paramTypes: ["number[]"],
    },
    598: {
      funName: "maxCount",
      paramTypes: ["number", "number", "number[][]"],
    },
    599: {
      funName: "findRestaurant",
      paramTypes: ["string[]", "string[]"],
    },
    600: {
      funName: "findIntegers",
      paramTypes: ["number"],
    },
    605: {
      funName: "canPlaceFlowers",
      paramTypes: ["number[]", "number"],
    },
    606: {
      funName: "tree2str",
      paramTypes: ["TreeNode"],
    },
    609: {
      funName: "findDuplicate",
      paramTypes: ["string[]"],
    },
    611: {
      funName: "triangleNumber",
      paramTypes: ["number[]"],
    },
    617: {
      funName: "mergeTrees",
      paramTypes: ["TreeNode", "TreeNode"],
    },
    621: {
      funName: "leastInterval",
      paramTypes: ["character[]", "number"],
    },
    622: {
      funName: "MyCircularQueue",
      paramTypes: ["number"],
    },
    623: {
      funName: "addOneRow",
      paramTypes: ["TreeNode", "number", "number"],
    },
    628: {
      funName: "maximumProduct",
      paramTypes: ["number[]"],
    },
    629: {
      funName: "kInversePairs",
      paramTypes: ["number", "number"],
    },
    630: {
      funName: "scheduleCourse",
      paramTypes: ["number[][]"],
    },
    632: {
      funName: "smallestRange",
      paramTypes: ["number[][]"],
    },
    633: {
      funName: "judgeSquareSum",
      paramTypes: ["number"],
    },
    636: {
      funName: "exclusiveTime",
      paramTypes: ["number", "string[]"],
    },
    637: {
      funName: "averageOfLevels",
      paramTypes: ["TreeNode"],
    },
    638: {
      funName: "shoppingOffers",
      paramTypes: ["number[]", "number[][]", "number[]"],
    },
    639: {
      funName: "numDecodings",
      paramTypes: ["string"],
    },
    640: {
      funName: "solveEquation",
      paramTypes: ["string"],
    },
    641: {
      funName: "MyCircularDeque",
      paramTypes: ["number"],
    },
    643: {
      funName: "findMaxAverage",
      paramTypes: ["number[]", "number"],
    },
    645: {
      funName: "findErrorNums",
      paramTypes: ["number[]"],
    },
    646: {
      funName: "findLongestChain",
      paramTypes: ["number[][]"],
    },
    647: {
      funName: "countSubstrings",
      paramTypes: ["string"],
    },
    648: {
      funName: "replaceWords",
      paramTypes: ["string[]", "string"],
    },
    649: {
      funName: "predictPartyVictory",
      paramTypes: ["string"],
    },
    650: {
      funName: "minSteps",
      paramTypes: ["number"],
    },
    652: {
      funName: "findDuplicateSubtrees",
      paramTypes: ["TreeNode"],
    },
    653: {
      funName: "findTarget",
      paramTypes: ["TreeNode", "number"],
    },
    654: {
      funName: "constructMaximumBinaryTree",
      paramTypes: ["number[]"],
    },
    655: {
      funName: "printTree",
      paramTypes: ["TreeNode"],
    },
    657: {
      funName: "judgeCircle",
      paramTypes: ["string"],
    },
    658: {
      funName: "findClosestElements",
      paramTypes: ["number[]", "number", "number"],
    },
    659: {
      funName: "isPossible",
      paramTypes: ["number[]"],
    },
    661: {
      funName: "imageSmoother",
      paramTypes: ["number[][]"],
    },
    662: {
      funName: "widthOfBinaryTree",
      paramTypes: ["TreeNode"],
    },
    664: {
      funName: "strangePrinter",
      paramTypes: ["string"],
    },
    665: {
      funName: "checkPossibility",
      paramTypes: ["number[]"],
    },
    667: {
      funName: "constructArray",
      paramTypes: ["number", "number"],
    },
    668: {
      funName: "findKthNumber",
      paramTypes: ["number", "number", "number"],
    },
    669: {
      funName: "trimBST",
      paramTypes: ["TreeNode", "number", "number"],
    },
    670: {
      funName: "maximumSwap",
      paramTypes: ["number"],
    },
    671: {
      funName: "findSecondMinimumValue",
      paramTypes: ["TreeNode"],
    },
    672: {
      funName: "flipLights",
      paramTypes: ["number", "number"],
    },
    673: {
      funName: "findNumberOfLIS",
      paramTypes: ["number[]"],
    },
    674: {
      funName: "findLengthOfLCIS",
      paramTypes: ["number[]"],
    },
    675: {
      funName: "cutOffTree",
      paramTypes: ["number[][]"],
    },
    676: {
      funName: "MagicDictionary",
      paramTypes: [],
    },
    677: {
      funName: "MapSum",
      paramTypes: [],
    },
    678: {
      funName: "checkValidString",
      paramTypes: ["string"],
    },
    679: {
      funName: "judgePoint24",
      paramTypes: ["number[]"],
    },
    680: {
      funName: "validPalindrome",
      paramTypes: ["string"],
    },
    682: {
      funName: "calPoints",
      paramTypes: ["string[]"],
    },
    684: {
      funName: "findRedundantConnection",
      paramTypes: ["number[][]"],
    },
    685: {
      funName: "findRedundantDirectedConnection",
      paramTypes: ["number[][]"],
    },
    686: {
      funName: "repeatedStringMatch",
      paramTypes: ["string", "string"],
    },
    687: {
      funName: "longestUnivaluePath",
      paramTypes: ["TreeNode"],
    },
    688: {
      funName: "knightProbability",
      paramTypes: ["number", "number", "number", "number"],
    },
    689: {
      funName: "maxSumOfThreeSubarrays",
      paramTypes: ["number[]", "number"],
    },
    691: {
      funName: "minStickers",
      paramTypes: ["string[]", "string"],
    },
    692: {
      funName: "topKFrequent",
      paramTypes: ["string[]", "number"],
    },
    693: {
      funName: "hasAlternatingBits",
      paramTypes: ["number"],
    },
    695: {
      funName: "maxAreaOfIsland",
      paramTypes: ["number[][]"],
    },
    696: {
      funName: "countBinarySubstrings",
      paramTypes: ["string"],
    },
    697: {
      funName: "findShortestSubArray",
      paramTypes: ["number[]"],
    },
    698: {
      funName: "canPartitionKSubsets",
      paramTypes: ["number[]", "number"],
    },
    699: {
      funName: "fallingSquares",
      paramTypes: ["number[][]"],
    },
    700: {
      funName: "searchBST",
      paramTypes: ["TreeNode", "number"],
    },
    701: {
      funName: "insertIntoBST",
      paramTypes: ["TreeNode", "number"],
    },
    703: {
      funName: "KthLargest",
      paramTypes: ["number", "number[]"],
    },
    704: {
      funName: "search",
      paramTypes: ["number[]", "number"],
    },
    705: {
      funName: "MyHashSet",
      paramTypes: [],
    },
    706: {
      funName: "MyHashMap",
      paramTypes: [],
    },
    707: {
      funName: "MyLinkedList",
      paramTypes: [],
    },
    709: {
      funName: "toLowerCase",
      paramTypes: ["string"],
    },
    710: {
      funName: "Solution",
      paramTypes: ["number", "number[]"],
    },
    712: {
      funName: "minimumDeleteSum",
      paramTypes: ["string", "string"],
    },
    713: {
      funName: "numSubarrayProductLessThanK",
      paramTypes: ["number[]", "number"],
    },
    714: {
      funName: "maxProfit",
      paramTypes: ["number[]", "number"],
    },
    715: {
      funName: "RangeModule",
      paramTypes: [],
    },
    717: {
      funName: "isOneBitCharacter",
      paramTypes: ["number[]"],
    },
    718: {
      funName: "findLength",
      paramTypes: ["number[]", "number[]"],
    },
    719: {
      funName: "smallestDistancePair",
      paramTypes: ["number[]", "number"],
    },
    720: {
      funName: "longestWord",
      paramTypes: ["string[]"],
    },
    721: {
      funName: "accountsMerge",
      paramTypes: ["string[][]"],
    },
    722: {
      funName: "removeComments",
      paramTypes: ["string[]"],
    },
    724: {
      funName: "pivotIndex",
      paramTypes: ["number[]"],
    },
    725: {
      funName: "splitListToParts",
      paramTypes: ["ListNode", "number"],
    },
    726: {
      funName: "countOfAtoms",
      paramTypes: ["string"],
    },
    728: {
      funName: "selfDividingNumbers",
      paramTypes: ["number", "number"],
    },
    729: {
      funName: "MyCalendar",
      paramTypes: [],
    },
    730: {
      funName: "countPalindromicSubsequences",
      paramTypes: ["string"],
    },
    731: {
      funName: "MyCalendarTwo",
      paramTypes: [],
    },
    732: {
      funName: "MyCalendarThree",
      paramTypes: [],
    },
    733: {
      funName: "floodFill",
      paramTypes: ["number[][]", "number", "number", "number"],
    },
    735: {
      funName: "asteroidCollision",
      paramTypes: ["number[]"],
    },
    736: {
      funName: "evaluate",
      paramTypes: ["string"],
    },
    738: {
      funName: "monotoneIncreasingDigits",
      paramTypes: ["number"],
    },
    739: {
      funName: "dailyTemperatures",
      paramTypes: ["number[]"],
    },
    740: {
      funName: "deleteAndEarn",
      paramTypes: ["number[]"],
    },
    741: {
      funName: "cherryPickup",
      paramTypes: ["number[][]"],
    },
    743: {
      funName: "networkDelayTime",
      paramTypes: ["number[][]", "number", "number"],
    },
    744: {
      funName: "nextGreatestLetter",
      paramTypes: ["character[]", "character"],
    },
    745: {
      funName: "WordFilter",
      paramTypes: ["string[]"],
    },
    746: {
      funName: "minCostClimbingStairs",
      paramTypes: ["number[]"],
    },
    747: {
      funName: "dominantIndex",
      paramTypes: ["number[]"],
    },
    748: {
      funName: "shortestCompletingWord",
      paramTypes: ["string", "string[]"],
    },
    749: {
      funName: "containVirus",
      paramTypes: ["number[][]"],
    },
    752: {
      funName: "openLock",
      paramTypes: ["string[]", "string"],
    },
    753: {
      funName: "crackSafe",
      paramTypes: ["number", "number"],
    },
    754: {
      funName: "reachNumber",
      paramTypes: ["number"],
    },
    756: {
      funName: "pyramidTransition",
      paramTypes: ["string", "string[]"],
    },
    757: {
      funName: "intersectionSizeTwo",
      paramTypes: ["number[][]"],
    },
    761: {
      funName: "makeLargestSpecial",
      paramTypes: ["string"],
    },
    762: {
      funName: "countPrimeSetBits",
      paramTypes: ["number", "number"],
    },
    763: {
      funName: "partitionLabels",
      paramTypes: ["string"],
    },
    764: {
      funName: "orderOfLargestPlusSign",
      paramTypes: ["number", "number[][]"],
    },
    765: {
      funName: "minSwapsCouples",
      paramTypes: ["number[]"],
    },
    766: {
      funName: "isToeplitzMatrix",
      paramTypes: ["number[][]"],
    },
    767: {
      funName: "reorganizeString",
      paramTypes: ["string"],
    },
    768: {
      funName: "maxChunksToSorted",
      paramTypes: ["number[]"],
    },
    769: {
      funName: "maxChunksToSorted",
      paramTypes: ["number[]"],
    },
    770: {
      funName: "basicCalculatorIV",
      paramTypes: ["string", "string[]", "number[]"],
    },
    771: {
      funName: "numJewelsInStones",
      paramTypes: ["string", "string"],
    },
    773: {
      funName: "slidingPuzzle",
      paramTypes: ["number[][]"],
    },
    775: {
      funName: "isIdealPermutation",
      paramTypes: ["number[]"],
    },
    777: {
      funName: "canTransform",
      paramTypes: ["string", "string"],
    },
    778: {
      funName: "swimInWater",
      paramTypes: ["number[][]"],
    },
    779: {
      funName: "kthGrammar",
      paramTypes: ["number", "number"],
    },
    780: {
      funName: "reachingPoints",
      paramTypes: ["number", "number", "number", "number"],
    },
    781: {
      funName: "numRabbits",
      paramTypes: ["number[]"],
    },
    782: {
      funName: "movesToChessboard",
      paramTypes: ["number[][]"],
    },
    783: {
      funName: "minDiffInBST",
      paramTypes: ["TreeNode"],
    },
    784: {
      funName: "letterCasePermutation",
      paramTypes: ["string"],
    },
    785: {
      funName: "isBipartite",
      paramTypes: ["number[][]"],
    },
    786: {
      funName: "kthSmallestPrimeFraction",
      paramTypes: ["number[]", "number"],
    },
    787: {
      funName: "findCheapestPrice",
      paramTypes: ["number", "number[][]", "number", "number", "number"],
    },
    788: {
      funName: "rotatedDigits",
      paramTypes: ["number"],
    },
    789: {
      funName: "escapeGhosts",
      paramTypes: ["number[][]", "number[]"],
    },
    790: {
      funName: "numTilings",
      paramTypes: ["number"],
    },
    791: {
      funName: "customSortString",
      paramTypes: ["string", "string"],
    },
    792: {
      funName: "numMatchingSubseq",
      paramTypes: ["string", "string[]"],
    },
    793: {
      funName: "preimageSizeFZF",
      paramTypes: ["number"],
    },
    794: {
      funName: "validTicTacToe",
      paramTypes: ["string[]"],
    },
    795: {
      funName: "numSubarrayBoundedMax",
      paramTypes: ["number[]", "number", "number"],
    },
    796: {
      funName: "rotateString",
      paramTypes: ["string", "string"],
    },
    797: {
      funName: "allPathsSourceTarget",
      paramTypes: ["number[][]"],
    },
    798: {
      funName: "bestRotation",
      paramTypes: ["number[]"],
    },
    799: {
      funName: "champagneTower",
      paramTypes: ["number", "number", "number"],
    },
    801: {
      funName: "minSwap",
      paramTypes: ["number[]", "number[]"],
    },
    802: {
      funName: "eventualSafeNodes",
      paramTypes: ["number[][]"],
    },
    803: {
      funName: "hitBricks",
      paramTypes: ["number[][]", "number[][]"],
    },
    804: {
      funName: "uniqueMorseRepresentations",
      paramTypes: ["string[]"],
    },
    805: {
      funName: "splitArraySameAverage",
      paramTypes: ["number[]"],
    },
    806: {
      funName: "numberOfLines",
      paramTypes: ["number[]", "string"],
    },
    807: {
      funName: "maxIncreaseKeepingSkyline",
      paramTypes: ["number[][]"],
    },
    808: {
      funName: "soupServings",
      paramTypes: ["number"],
    },
    809: {
      funName: "expressiveWords",
      paramTypes: ["string", "string[]"],
    },
    810: {
      funName: "xorGame",
      paramTypes: ["number[]"],
    },
    811: {
      funName: "subdomainVisits",
      paramTypes: ["string[]"],
    },
    812: {
      funName: "largestTriangleArea",
      paramTypes: ["number[][]"],
    },
    813: {
      funName: "largestSumOfAverages",
      paramTypes: ["number[]", "number"],
    },
    814: {
      funName: "pruneTree",
      paramTypes: ["TreeNode"],
    },
    815: {
      funName: "numBusesToDestination",
      paramTypes: ["number[][]", "number", "number"],
    },
    816: {
      funName: "ambiguousCoordinates",
      paramTypes: ["string"],
    },
    817: {
      funName: "numComponents",
      paramTypes: ["ListNode", "number[]"],
    },
    818: {
      funName: "racecar",
      paramTypes: ["number"],
    },
    819: {
      funName: "mostCommonWord",
      paramTypes: ["string", "string[]"],
    },
    820: {
      funName: "minimumLengthEncoding",
      paramTypes: ["string[]"],
    },
    821: {
      funName: "shortestToChar",
      paramTypes: ["string", "character"],
    },
    822: {
      funName: "flipgame",
      paramTypes: ["number[]", "number[]"],
    },
    823: {
      funName: "numFactoredBinaryTrees",
      paramTypes: ["number[]"],
    },
    824: {
      funName: "toGoatLatin",
      paramTypes: ["string"],
    },
    825: {
      funName: "numFriendRequests",
      paramTypes: ["number[]"],
    },
    826: {
      funName: "maxProfitAssignment",
      paramTypes: ["number[]", "number[]", "number[]"],
    },
    827: {
      funName: "largestIsland",
      paramTypes: ["number[][]"],
    },
    828: {
      funName: "uniqueLetterString",
      paramTypes: ["string"],
    },
    829: {
      funName: "consecutiveNumbersSum",
      paramTypes: ["number"],
    },
    830: {
      funName: "largeGroupPositions",
      paramTypes: ["string"],
    },
    831: {
      funName: "maskPII",
      paramTypes: ["string"],
    },
    832: {
      funName: "flipAndInvertImage",
      paramTypes: ["number[][]"],
    },
    833: {
      funName: "findReplaceString",
      paramTypes: ["string", "number[]", "string[]", "string[]"],
    },
    834: {
      funName: "sumOfDistancesInTree",
      paramTypes: ["number", "number[][]"],
    },
    835: {
      funName: "largestOverlap",
      paramTypes: ["number[][]", "number[][]"],
    },
    836: {
      funName: "isRectangleOverlap",
      paramTypes: ["number[]", "number[]"],
    },
    837: {
      funName: "new21Game",
      paramTypes: ["number", "number", "number"],
    },
    838: {
      funName: "pushDominoes",
      paramTypes: ["string"],
    },
    839: {
      funName: "numSimilarGroups",
      paramTypes: ["string[]"],
    },
    840: {
      funName: "numMagicSquaresInside",
      paramTypes: ["number[][]"],
    },
    841: {
      funName: "canVisitAllRooms",
      paramTypes: ["number[][]"],
    },
    842: {
      funName: "splitIntoFibonacci",
      paramTypes: ["string"],
    },
    843: {
      funName: "findSecretWord",
      // changede from original
      paramTypes: ["string", "string[]", "number"],
    },
    844: {
      funName: "backspaceCompare",
      paramTypes: ["string", "string"],
    },
    845: {
      funName: "longestMountain",
      paramTypes: ["number[]"],
    },
    846: {
      funName: "isNStraightHand",
      paramTypes: ["number[]", "number"],
    },
    847: {
      funName: "shortestPathLength",
      paramTypes: ["number[][]"],
    },
    848: {
      funName: "shiftingLetters",
      paramTypes: ["string", "number[]"],
    },
    849: {
      funName: "maxDistToClosest",
      paramTypes: ["number[]"],
    },
    850: {
      funName: "rectangleArea",
      paramTypes: ["number[][]"],
    },
    851: {
      funName: "loudAndRich",
      paramTypes: ["number[][]", "number[]"],
    },
    852: {
      funName: "peakIndexInMountainArray",
      paramTypes: ["number[]"],
    },
    853: {
      funName: "carFleet",
      paramTypes: ["number", "number[]", "number[]"],
    },
    854: {
      funName: "kSimilarity",
      paramTypes: ["string", "string"],
    },
    855: {
      funName: "ExamRoom",
      paramTypes: ["number"],
    },
    856: {
      funName: "scoreOfParentheses",
      paramTypes: ["string"],
    },
    857: {
      funName: "mincostToHireWorkers",
      paramTypes: ["number[]", "number[]", "number"],
    },
    858: {
      funName: "mirrorReflection",
      paramTypes: ["number", "number"],
    },
    859: {
      funName: "buddyStrings",
      paramTypes: ["string", "string"],
    },
    860: {
      funName: "lemonadeChange",
      paramTypes: ["number[]"],
    },
    861: {
      funName: "matrixScore",
      paramTypes: ["number[][]"],
    },
    862: {
      funName: "shortestSubarray",
      paramTypes: ["number[]", "number"],
    },
    863: {
      funName: "distanceK",
      paramTypes: ["TreeNode", "TreeNode", "number"],
    },
    864: {
      funName: "shortestPathAllKeys",
      paramTypes: ["string[]"],
    },
    865: {
      funName: "subtreeWithAllDeepest",
      paramTypes: ["TreeNode"],
    },
    866: {
      funName: "primePalindrome",
      paramTypes: ["number"],
    },
    867: {
      funName: "transpose",
      paramTypes: ["number[][]"],
    },
    868: {
      funName: "binaryGap",
      paramTypes: ["number"],
    },
    869: {
      funName: "reorderedPowerOf2",
      paramTypes: ["number"],
    },
    870: {
      funName: "advantageCount",
      paramTypes: ["number[]", "number[]"],
    },
    871: {
      funName: "minRefuelStops",
      paramTypes: ["number", "number", "number[][]"],
    },
    872: {
      funName: "leafSimilar",
      paramTypes: ["TreeNode", "TreeNode"],
    },
    873: {
      funName: "lenLongestFibSubseq",
      paramTypes: ["number[]"],
    },
    874: {
      funName: "robotSim",
      paramTypes: ["number[]", "number[][]"],
    },
    875: {
      funName: "minEatingSpeed",
      paramTypes: ["number[]", "number"],
    },
    876: {
      funName: "middleNode",
      paramTypes: ["ListNode"],
    },
    877: {
      funName: "stoneGame",
      paramTypes: ["number[]"],
    },
    878: {
      funName: "nthMagicalNumber",
      paramTypes: ["number", "number", "number"],
    },
    879: {
      funName: "profitableSchemes",
      paramTypes: ["number", "number", "number[]", "number[]"],
    },
    880: {
      funName: "decodeAtIndex",
      paramTypes: ["string", "number"],
    },
    881: {
      funName: "numRescueBoats",
      paramTypes: ["number[]", "number"],
    },
    882: {
      funName: "reachableNodes",
      paramTypes: ["number[][]", "number", "number"],
    },
    883: {
      funName: "projectionArea",
      paramTypes: ["number[][]"],
    },
    884: {
      funName: "uncommonFromSentences",
      paramTypes: ["string", "string"],
    },
    885: {
      funName: "spiralMatrixIII",
      paramTypes: ["number", "number", "number", "number"],
    },
    886: {
      funName: "possibleBipartition",
      paramTypes: ["number", "number[][]"],
    },
    887: {
      funName: "superEggDrop",
      paramTypes: ["number", "number"],
    },
    888: {
      funName: "fairCandySwap",
      paramTypes: ["number[]", "number[]"],
    },
    889: {
      funName: "constructFromPrePost",
      paramTypes: ["number[]", "number[]"],
    },
    890: {
      funName: "findAndReplacePattern",
      paramTypes: ["string[]", "string"],
    },
    891: {
      funName: "sumSubseqWidths",
      paramTypes: ["number[]"],
    },
    892: {
      funName: "surfaceArea",
      paramTypes: ["number[][]"],
    },
    893: {
      funName: "numSpecialEquivGroups",
      paramTypes: ["string[]"],
    },
    894: {
      funName: "allPossibleFBT",
      paramTypes: ["number"],
    },
    895: {
      funName: "FreqStack",
      paramTypes: [],
    },
    896: {
      funName: "isMonotonic",
      paramTypes: ["number[]"],
    },
    897: {
      funName: "increasingBST",
      paramTypes: ["TreeNode"],
    },
    898: {
      funName: "subarrayBitwiseORs",
      paramTypes: ["number[]"],
    },
    899: {
      funName: "orderlyQueue",
      paramTypes: ["string", "number"],
    },
    900: {
      funName: "RLEIterator",
      paramTypes: ["number[]"],
    },
    901: {
      funName: "StockSpanner",
      paramTypes: [],
    },
    902: {
      funName: "atMostNGivenDigitSet",
      paramTypes: ["string[]", "number"],
    },
    903: {
      funName: "numPermsDISequence",
      paramTypes: ["string"],
    },
    904: {
      funName: "totalFruit",
      paramTypes: ["number[]"],
    },
    905: {
      funName: "sortArrayByParity",
      paramTypes: ["number[]"],
    },
    906: {
      funName: "superpalindromesInRange",
      paramTypes: ["string", "string"],
    },
    907: {
      funName: "sumSubarrayMins",
      paramTypes: ["number[]"],
    },
    908: {
      funName: "smallestRangeI",
      paramTypes: ["number[]", "number"],
    },
    909: {
      funName: "snakesAndLadders",
      paramTypes: ["number[][]"],
    },
    910: {
      funName: "smallestRangeII",
      paramTypes: ["number[]", "number"],
    },
    911: {
      funName: "TopVotedCandidate",
      paramTypes: ["number[]", "number[]"],
    },
    912: {
      funName: "sortArray",
      paramTypes: ["number[]"],
    },
    913: {
      funName: "catMouseGame",
      paramTypes: ["number[][]"],
    },
    914: {
      funName: "hasGroupsSizeX",
      paramTypes: ["number[]"],
    },
    915: {
      funName: "partitionDisjoint",
      paramTypes: ["number[]"],
    },
    916: {
      funName: "wordSubsets",
      paramTypes: ["string[]", "string[]"],
    },
    917: {
      funName: "reverseOnlyLetters",
      paramTypes: ["string"],
    },
    918: {
      funName: "maxSubarraySumCircular",
      paramTypes: ["number[]"],
    },
    919: {
      funName: "CBTInserter",
      paramTypes: ["TreeNode"],
    },
    920: {
      funName: "numMusicPlaylists",
      paramTypes: ["number", "number", "number"],
    },
    921: {
      funName: "minAddToMakeValid",
      paramTypes: ["string"],
    },
    922: {
      funName: "sortArrayByParityII",
      paramTypes: ["number[]"],
    },
    923: {
      funName: "threeSumMulti",
      paramTypes: ["number[]", "number"],
    },
    924: {
      funName: "minMalwareSpread",
      paramTypes: ["number[][]", "number[]"],
    },
    925: {
      funName: "isLongPressedName",
      paramTypes: ["string", "string"],
    },
    926: {
      funName: "minFlipsMonoIncr",
      paramTypes: ["string"],
    },
    927: {
      funName: "threeEqualParts",
      paramTypes: ["number[]"],
    },
    928: {
      funName: "minMalwareSpread",
      paramTypes: ["number[][]", "number[]"],
    },
    929: {
      funName: "numUniqueEmails",
      paramTypes: ["string[]"],
    },
    930: {
      funName: "numSubarraysWithSum",
      paramTypes: ["number[]", "number"],
    },
    931: {
      funName: "minFallingPathSum",
      paramTypes: ["number[][]"],
    },
    932: {
      funName: "beautifulArray",
      paramTypes: ["number"],
    },
    933: {
      funName: "RecentCounter",
      paramTypes: [],
    },
    934: {
      funName: "shortestBridge",
      paramTypes: ["number[][]"],
    },
    935: {
      funName: "knightDialer",
      paramTypes: ["number"],
    },
    936: {
      funName: "movesToStamp",
      paramTypes: ["string", "string"],
    },
    937: {
      funName: "reorderLogFiles",
      paramTypes: ["string[]"],
    },
    938: {
      funName: "rangeSumBST",
      paramTypes: ["TreeNode", "number", "number"],
    },
    939: {
      funName: "minAreaRect",
      paramTypes: ["number[][]"],
    },
    940: {
      funName: "distinctSubseqII",
      paramTypes: ["string"],
    },
    941: {
      funName: "validMountainArray",
      paramTypes: ["number[]"],
    },
    942: {
      funName: "diStringMatch",
      paramTypes: ["string"],
    },
    943: {
      funName: "shortestSuperstring",
      paramTypes: ["string[]"],
    },
    944: {
      funName: "minDeletionSize",
      paramTypes: ["string[]"],
    },
    945: {
      funName: "minIncrementForUnique",
      paramTypes: ["number[]"],
    },
    946: {
      funName: "validateStackSequences",
      paramTypes: ["number[]", "number[]"],
    },
    947: {
      funName: "removeStones",
      paramTypes: ["number[][]"],
    },
    948: {
      funName: "bagOfTokensScore",
      paramTypes: ["number[]", "number"],
    },
    949: {
      funName: "largestTimeFromDigits",
      paramTypes: ["number[]"],
    },
    950: {
      funName: "deckRevealedIncreasing",
      paramTypes: ["number[]"],
    },
    951: {
      funName: "flipEquiv",
      paramTypes: ["TreeNode", "TreeNode"],
    },
    952: {
      funName: "largestComponentSize",
      paramTypes: ["number[]"],
    },
    953: {
      funName: "isAlienSorted",
      paramTypes: ["string[]", "string"],
    },
    954: {
      funName: "canReorderDoubled",
      paramTypes: ["number[]"],
    },
    955: {
      funName: "minDeletionSize",
      paramTypes: ["string[]"],
    },
    956: {
      funName: "tallestBillboard",
      paramTypes: ["number[]"],
    },
    957: {
      funName: "prisonAfterNDays",
      paramTypes: ["number[]", "number"],
    },
    958: {
      funName: "isCompleteTree",
      paramTypes: ["TreeNode"],
    },
    959: {
      funName: "regionsBySlashes",
      paramTypes: ["string[]"],
    },
    960: {
      funName: "minDeletionSize",
      paramTypes: ["string[]"],
    },
    961: {
      funName: "repeatedNTimes",
      paramTypes: ["number[]"],
    },
    962: {
      funName: "maxWidthRamp",
      paramTypes: ["number[]"],
    },
    963: {
      funName: "minAreaFreeRect",
      paramTypes: ["number[][]"],
    },
    964: {
      funName: "leastOpsExpressTarget",
      paramTypes: ["number", "number"],
    },
    965: {
      funName: "isUnivalTree",
      paramTypes: ["TreeNode"],
    },
    966: {
      funName: "spellchecker",
      paramTypes: ["string[]", "string[]"],
    },
    967: {
      funName: "numsSameConsecDiff",
      paramTypes: ["number", "number"],
    },
    968: {
      funName: "minCameraCover",
      paramTypes: ["TreeNode"],
    },
    969: {
      funName: "pancakeSort",
      paramTypes: ["number[]"],
    },
    970: {
      funName: "powerfulIntegers",
      paramTypes: ["number", "number", "number"],
    },
    971: {
      funName: "flipMatchVoyage",
      paramTypes: ["TreeNode", "number[]"],
    },
    972: {
      funName: "isRationalEqual",
      paramTypes: ["string", "string"],
    },
    973: {
      funName: "kClosest",
      paramTypes: ["number[][]", "number"],
    },
    974: {
      funName: "subarraysDivByK",
      paramTypes: ["number[]", "number"],
    },
    975: {
      funName: "oddEvenJumps",
      paramTypes: ["number[]"],
    },
    976: {
      funName: "largestPerimeter",
      paramTypes: ["number[]"],
    },
    977: {
      funName: "sortedSquares",
      paramTypes: ["number[]"],
    },
    978: {
      funName: "maxTurbulenceSize",
      paramTypes: ["number[]"],
    },
    979: {
      funName: "distributeCoins",
      paramTypes: ["TreeNode"],
    },
    980: {
      funName: "uniquePathsIII",
      paramTypes: ["number[][]"],
    },
    981: {
      funName: "TimeMap",
      paramTypes: [],
    },
    982: {
      funName: "countTriplets",
      paramTypes: ["number[]"],
    },
    983: {
      funName: "mincostTickets",
      paramTypes: ["number[]", "number[]"],
    },
    984: {
      funName: "strWithout3a3b",
      paramTypes: ["number", "number"],
    },
    985: {
      funName: "sumEvenAfterQueries",
      paramTypes: ["number[]", "number[][]"],
    },
    986: {
      funName: "intervalIntersection",
      paramTypes: ["number[][]", "number[][]"],
    },
    987: {
      funName: "verticalTraversal",
      paramTypes: ["TreeNode"],
    },
    988: {
      funName: "smallestFromLeaf",
      paramTypes: ["TreeNode"],
    },
    989: {
      funName: "addToArrayForm",
      paramTypes: ["number[]", "number"],
    },
    990: {
      funName: "equationsPossible",
      paramTypes: ["string[]"],
    },
    991: {
      funName: "brokenCalc",
      paramTypes: ["number", "number"],
    },
    992: {
      funName: "subarraysWithKDistinct",
      paramTypes: ["number[]", "number"],
    },
    993: {
      funName: "isCousins",
      paramTypes: ["TreeNode", "number", "number"],
    },
    994: {
      funName: "orangesRotting",
      paramTypes: ["number[][]"],
    },
    995: {
      funName: "minKBitFlips",
      paramTypes: ["number[]", "number"],
    },
    996: {
      funName: "numSquarefulPerms",
      paramTypes: ["number[]"],
    },
    997: {
      funName: "findJudge",
      paramTypes: ["number", "number[][]"],
    },
    998: {
      funName: "insertIntoMaxTree",
      paramTypes: ["TreeNode", "number"],
    },
    999: {
      funName: "numRookCaptures",
      paramTypes: ["character[][]"],
    },
    1000: {
      funName: "mergeStones",
      paramTypes: ["number[]", "number"],
    },
    1001: {
      funName: "gridIllumination",
      paramTypes: ["number", "number[][]", "number[][]"],
    },
    1002: {
      funName: "commonChars",
      paramTypes: ["string[]"],
    },
    1003: {
      funName: "isValid",
      paramTypes: ["string"],
    },
    1004: {
      funName: "longestOnes",
      paramTypes: ["number[]", "number"],
    },
    1005: {
      funName: "largestSumAfterKNegations",
      paramTypes: ["number[]", "number"],
    },
    1006: {
      funName: "clumsy",
      paramTypes: ["number"],
    },
    1007: {
      funName: "minDominoRotations",
      paramTypes: ["number[]", "number[]"],
    },
    1008: {
      funName: "bstFromPreorder",
      paramTypes: ["number[]"],
    },
    1009: {
      funName: "bitwiseComplement",
      paramTypes: ["number"],
    },
    1010: {
      funName: "numPairsDivisibleBy60",
      paramTypes: ["number[]"],
    },
    1011: {
      funName: "shipWithinDays",
      paramTypes: ["number[]", "number"],
    },
    1012: {
      funName: "numDupDigitsAtMostN",
      paramTypes: ["number"],
    },
    1013: {
      funName: "canThreePartsEqualSum",
      paramTypes: ["number[]"],
    },
    1014: {
      funName: "maxScoreSightseeingPair",
      paramTypes: ["number[]"],
    },
    1015: {
      funName: "smallestRepunitDivByK",
      paramTypes: ["number"],
    },
    1016: {
      funName: "queryString",
      paramTypes: ["string", "number"],
    },
    1017: {
      funName: "baseNeg2",
      paramTypes: ["number"],
    },
    1018: {
      funName: "prefixesDivBy5",
      paramTypes: ["number[]"],
    },
    1019: {
      funName: "nextLargerNodes",
      paramTypes: ["ListNode"],
    },
    1020: {
      funName: "numEnclaves",
      paramTypes: ["number[][]"],
    },
    1021: {
      funName: "removeOuterParentheses",
      paramTypes: ["string"],
    },
    1022: {
      funName: "sumRootToLeaf",
      paramTypes: ["TreeNode"],
    },
    1023: {
      funName: "camelMatch",
      paramTypes: ["string[]", "string"],
    },
    1024: {
      funName: "videoStitching",
      paramTypes: ["number[][]", "number"],
    },
    1025: {
      funName: "divisorGame",
      paramTypes: ["number"],
    },
    1026: {
      funName: "maxAncestorDiff",
      paramTypes: ["TreeNode"],
    },
    1027: {
      funName: "longestArithSeqLength",
      paramTypes: ["number[]"],
    },
    1028: {
      funName: "recoverFromPreorder",
      paramTypes: ["string"],
    },
    1029: {
      funName: "twoCitySchedCost",
      paramTypes: ["number[][]"],
    },
    1030: {
      funName: "allCellsDistOrder",
      paramTypes: ["number", "number", "number", "number"],
    },
    1031: {
      funName: "maxSumTwoNoOverlap",
      paramTypes: ["number[]", "number", "number"],
    },
    1032: {
      funName: "StreamChecker",
      paramTypes: ["string[]"],
    },
    1033: {
      funName: "numMovesStones",
      paramTypes: ["number", "number", "number"],
    },
    1034: {
      funName: "colorBorder",
      paramTypes: ["number[][]", "number", "number", "number"],
    },
    1035: {
      funName: "maxUncrossedLines",
      paramTypes: ["number[]", "number[]"],
    },
    1036: {
      funName: "isEscapePossible",
      paramTypes: ["number[][]", "number[]", "number[]"],
    },
    1037: {
      funName: "isBoomerang",
      paramTypes: ["number[][]"],
    },
    1038: {
      funName: "bstToGst",
      paramTypes: ["TreeNode"],
    },
    1039: {
      funName: "minScoreTriangulation",
      paramTypes: ["number[]"],
    },
    1040: {
      funName: "numMovesStonesII",
      paramTypes: ["number[]"],
    },
    1041: {
      funName: "isRobotBounded",
      paramTypes: ["string"],
    },
    1042: {
      funName: "gardenNoAdj",
      paramTypes: ["number", "number[][]"],
    },
    1043: {
      funName: "maxSumAfterPartitioning",
      paramTypes: ["number[]", "number"],
    },
    1044: {
      funName: "longestDupSubstring",
      paramTypes: ["string"],
    },
    1046: {
      funName: "lastStoneWeight",
      paramTypes: ["number[]"],
    },
    1047: {
      funName: "removeDuplicates",
      paramTypes: ["string"],
    },
    1048: {
      funName: "longestStrChain",
      paramTypes: ["string[]"],
    },
    1049: {
      funName: "lastStoneWeightII",
      paramTypes: ["number[]"],
    },
    1051: {
      funName: "heightChecker",
      paramTypes: ["number[]"],
    },
    1052: {
      funName: "maxSatisfied",
      paramTypes: ["number[]", "number[]", "number"],
    },
    1053: {
      funName: "prevPermOpt1",
      paramTypes: ["number[]"],
    },
    1054: {
      funName: "rearrangeBarcodes",
      paramTypes: ["number[]"],
    },
    1071: {
      funName: "gcdOfStrings",
      paramTypes: ["string", "string"],
    },
    1072: {
      funName: "maxEqualRowsAfterFlips",
      paramTypes: ["number[][]"],
    },
    1073: {
      funName: "addNegabinary",
      paramTypes: ["number[]", "number[]"],
    },
    1074: {
      funName: "numSubmatrixSumTarget",
      paramTypes: ["number[][]", "number"],
    },
    1078: {
      funName: "findOcurrences",
      paramTypes: ["string", "string", "string"],
    },
    1079: {
      funName: "numTilePossibilities",
      paramTypes: ["string"],
    },
    1080: {
      funName: "sufficientSubset",
      paramTypes: ["TreeNode", "number"],
    },
    1081: {
      funName: "smallestSubsequence",
      paramTypes: ["string"],
    },
    1089: {
      funName: "duplicateZeros",
      paramTypes: ["number[]"],
    },
    1090: {
      funName: "largestValsFromLabels",
      paramTypes: ["number[]", "number[]", "number", "number"],
    },
    1091: {
      funName: "shortestPathBinaryMatrix",
      paramTypes: ["number[][]"],
    },
    1092: {
      funName: "shortestCommonSupersequence",
      paramTypes: ["string", "string"],
    },
    1093: {
      funName: "sampleStats",
      paramTypes: ["number[]"],
    },
    1094: {
      funName: "carPooling",
      paramTypes: ["number[][]", "number"],
    },
    1095: {
      funName: "findInMountainArray",
      // change the order of paramTypes
      paramTypes: ["MountainArray", "number"],
    },
    1096: {
      funName: "braceExpansionII",
      paramTypes: ["string"],
    },
    1103: {
      funName: "distributeCandies",
      paramTypes: ["number", "number"],
    },
    1104: {
      funName: "pathInZigZagTree",
      paramTypes: ["number"],
    },
    1105: {
      funName: "minHeightShelves",
      paramTypes: ["number[][]", "number"],
    },
    1106: {
      funName: "parseBoolExpr",
      paramTypes: ["string"],
    },
  };

  public fix_lineContent(lineContent) {
    let cut_pos = 0;
    for (let left = 0; left < lineContent.length; left++) {
      if (lineContent[left] == "#") {
        continue;
      }
      if (lineContent[left] == "/" && lineContent[left + 1] == "/") {
        left++;
        continue;
      }
      if (lineContent[left] == "-" && lineContent[left + 1] == "-") {
        left++;
        continue;
      }
      if (lineContent[left] == " ") {
        continue;
      }
      cut_pos = left;
      break;
    }
    return lineContent.substring(cut_pos);
  }

  public getDebugArgData(fid: string, document?): IProblemType | undefined {
    let number_fid = Number(fid);
    if (this.argType[number_fid]) {
      return this.argType[number_fid];
    } else {
      // 分析uri代码块
      if (document != null) {
        let file_arg = {};
        const fileContent: string = document.getText();
        const debug_div_arg: RegExp = /@lcpr-div-debug-arg-start/;
        if (!debug_div_arg.test(fileContent.toString())) {
          return undefined;
        }
        let start_collect_arg = false;
        for (let i: number = 0; i < document.lineCount; i++) {
          const lineContent: string = document.lineAt(i).text;

          if (lineContent.indexOf("@lcpr-div-debug-arg-end") >= 0) {
            break;
          }

          if (start_collect_arg) {
            let new_line_content = this.fix_lineContent(lineContent).replace(/\s+/g, "").replace(/\\n/g, "\n");
            // 分析格式
            // key = v
            let cur_equal = new_line_content.split("=");
            if (cur_equal.length == 2) {
              file_arg[cur_equal[0]] = cur_equal[1];
            }
          }

          if (lineContent.indexOf("@lcpr-div-debug-arg-start") >= 0) {
            start_collect_arg = true;
          }
        }
        // funName: string;
        // paramTypes: string[];

        // testCase?: string;
        if (start_collect_arg && file_arg["funName"] && file_arg["paramTypes"]) {
          file_arg["paramTypes"] = JSON.parse(file_arg["paramTypes"]);
          return file_arg as IProblemType;
        } else {
          return;
        }
      }
      return;
    }
  }
}

export const debugArgDao: DebugArgDao = new DebugArgDao();
