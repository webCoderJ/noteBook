/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  var map = null,
    result = null,
    len = nums.length;
  for (var i = 0; i < len; i++) {
    var dif = target - nums[i];
    if (!map) {
      map = {};
      for (var j = 0; j < len; j++) {
        map[nums[j] + ""] = j;
      }
    }
    var second = map[dif + ""];
    if (second != undefined && second !== i) {
      result = [i, map[dif + ""]];
      break;
    } else {
      continue;
    }
  }
  return result;
};

var twoSum = function(nums, target) {
  var result = null,
    len = nums.length;
  for (var i = 0; i < len; i++) {
    for (var j = i + 1; j < len; j++) {
      if (nums[i] + nums[j] === target) {
        result = [i, j];
        break;
      }
    }
  }
  return result;
};

var result = twoSum([1, 3, 4, 2], 6);
console.log("TCL: result", result);
