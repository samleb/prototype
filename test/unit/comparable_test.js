new Test.Unit.Runner({
  setup: function() {
    // Douglas Crockford < Dean Edwards < Brendan Eich
    this.brendan = new Name("Brendan", "Eich");
    this.brendanHomonymous = new Name("Brendan", "Eich");
    this.douglas = new Name("Douglas", "Crockford");
    this.douglasHomonymous = new Name("Douglas", "Crockford");
    this.dean = new Name("Dean", "Edwards");
  },
  
  testEquals: function() {
    this.assert(this.brendan.equals(this.brendan));
    this.assert(this.brendan.equals(this.brendanHomonymous));
  },
  
  testIsLowerThan: function() {
    this.assert(this.douglas.isLowerThan(this.brendan));
    this.assert(!this.brendan.isLowerThan(this.douglas));
    this.assert(!this.brendan.isLowerThan(this.brendanHomonymous));
  },
  
  testIsGreaterThan: function() {
    this.assert(this.brendan.isGreaterThan(this.douglas));
    this.assert(!this.douglas.isGreaterThan(this.douglasHomonymous));
    this.assert(!this.douglas.isGreaterThan(this.brendan));
  },
  
  testIsLowerThanOrEqualTo: function() {
    this.assert(this.douglas.isLowerThanOrEqualTo(this.brendan));
    this.assert(this.douglas.isLowerThanOrEqualTo(this.douglasHomonymous));
    this.assert(!this.brendan.isLowerThanOrEqualTo(this.douglas));
  },
  
  testIsGreaterThanOrEqualTo: function() {
    this.assert(this.brendan.isGreaterThanOrEqualTo(this.douglas));
    this.assert(this.douglas.isGreaterThanOrEqualTo(this.douglasHomonymous));
    this.assert(!this.douglas.isGreaterThanOrEqualTo(this.brendan));
  },
  
  testIsBetween: function() {
    this.assert(this.brendan.isBetween(this.brendan, this.brendan));
    this.assert(this.dean.isBetween(this.douglas, this.brendan));
    this.assert(this.brendan.isBetween(this.douglas, this.brendan));
    this.assert(this.douglas.isBetween(this.douglas, this.brendan));
    this.assert(!this.douglas.isBetween(this.dean, this.brendan));
    this.assert(!this.brendan.isBetween(this.douglas, this.dean));
    this.assert(!this.dean.isBetween(this.brendan, this.douglas));
  }
});
