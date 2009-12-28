var Comparable = (function() {
  
  var ComparisonError = Class.create({
    name: "ComparisonError",
    messageTemplate: "Comparison of #{0} with #{1} failed",
    initialize: function() {
      var args = $A(arguments).collect(Object.inspect);
      this.message = this.messageTemplate.interpolate(args);
    },
    toString: function() {
      return this.name + ": " + this.message;
    }
  });
  
  function compare(self, other) {
    var comparison = self.compareTo(other);
    if (!Object.isNumber(comparison)) {
      throw new ComparisonError(self, other);
    }
    return comparison;
  }
  
  function equals(other) {
    return this === other || this.compareTo(other) === 0;
  }
  
  function isLowerThan(other) {
    return compare(this, other) < 0;
  }
  
  function isGreaterThan(other) {
    return compare(this, other) > 0;
  }
  
  function isLowerThanOrEqualTo(other) {
    return compare(this, other) <= 0;
  }
  
  function isGreaterThanOrEqualTo(other) {
    return compare(this, other) >= 0;
  }
  
  function isBetween(min, max) {
    return compare(this, min) >= 0 && compare(this, max) <= 0;
  }
  
  return {
    ComparisonError:        ComparisonError,
    equals:                 equals,
    isLowerThan:            isLowerThan,
    isGreaterThan:          isGreaterThan,
    isLowerThanOrEqualTo:   isLowerThanOrEqualTo,
    isGreaterThanOrEqualTo: isGreaterThanOrEqualTo,
    isBetween:              isBetween
  };
})();
