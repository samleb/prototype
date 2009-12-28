var NativeComparable = (function() {
  var _toString = Object.prototype.toString;
  
  function areSameType(self, other) {
    return _toString.call(self) === _toString.call(other);
  }
  
  function equals(other) {
    return other != null && this.valueOf() === other.valueOf();
  }
  
  function compareTo(other) {
    if (!areSameType(this, other)) return null;
    if (this < other) return -1;
    if (this > other) return 1;
    return 0;
  }
  
  return Object.extend(Object.clone(Comparable), {
    equals: equals,
    compareTo: compareTo
  });
})();
