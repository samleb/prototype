new Test.Unit.Runner({
  testDateEquals: function() {
    this.assert(new Date(0).equals(new Date(0)));
    this.assert(!new Date(1).equals(new Date(0)));
    this.assert(!new Date().equals(null));
    this.assert(!new Date().equals());
  },
  testDateCompareTo: function() {
    this.assert(new Date(0).compareTo(new Date(1)) < 0);
    this.assertEqual(0, new Date(0).compareTo(new Date(0)));
    this.assert(new Date(1).compareTo(new Date(0)) > 0);
  },
  testDateToJSON: function() {
    this.assertEqual('\"1970-01-01T00:00:00Z\"', new Date(Date.UTC(1970, 0, 1)).toJSON());
  }
});