const KEYS = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ9876543210'; // length = 62
const KEY_LENGTH = KEYS.length;
const KEY_MAP = (function () {
  let result = {};
  [].forEach.call(KEYS, (c, i) => {
    result[c] = i;
  });
  return result;
})();
const KEY_POW_ARR = [
  Math.pow(KEY_LENGTH, 4),
  Math.pow(KEY_LENGTH, 3),
  Math.pow(KEY_LENGTH, 2),
  Math.pow(KEY_LENGTH, 1),
  Math.pow(KEY_LENGTH, 0)
];

module.exports = {
  int2str(value) {
    let result = [];
    let remainder = 0;
    while (value > 0) {
      remainder = value % KEY_LENGTH;
      result.push(KEYS[remainder]);
      value = Math.floor(value / KEY_LENGTH);
    }
    let str = result.reverse().join('');
    return str.padStart(5, KEYS[0]);
  },
  str2int(value) {
    let result = 0;
    [].forEach.call(value, (c, i) => {
      result += KEY_MAP[c] * KEY_POW_ARR[i];
    });
    return result;
  }
};
