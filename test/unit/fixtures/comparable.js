var Name = Class.create(Comparable, (function() {
  function initialize(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  
  function toString() {
    return this.firstName + " " + this.lastName;
  }
  
  function compareTo(name) {
    return [this.lastName, this.firstName].compareTo([name.lastName, name.firstName]);
  }
  
  return {
    initialize: initialize,
    toString:   toString,
    compareTo:  compareTo
  };
})());
