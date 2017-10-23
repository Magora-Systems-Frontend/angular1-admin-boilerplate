// Array.prototype.unique = function () {
//   let a = this.concat();
//   for (let i = 0; i < a.length; ++i) {
//     for (let j = i + 1; j < a.length; ++j) {
//       if (a[i] === a[j])
//         a.splice(j, 1);
//     }
//   }
//   return a;
// };

/**
 * @see http://stackoverflow.com/q/7616461/940217
 * @return {number}
 */
String.prototype.getHash = function () {
  if (Array.prototype.reduce) {
    return this.split("").reduce(function (a, b) {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a
    }, 0);
  }
  let hash = 0;
  if (this.length === 0) return hash;
  for (let i = 0; i < this.length; i++) {
    let character = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + character;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

export default {};
