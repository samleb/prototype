new Test.Unit.Runner({
  
  testNumberMathMethods: function() {
    this.assertEqual(1, (0.9).round());
    this.assertEqual(-2, (-1.9).floor());
    this.assertEqual(-1, (-1.9).ceil());

    $w('abs floor round ceil').each(function(method) {
      this.assertEqual(Math[method](Math.PI), Math.PI[method]());
    }, this);
  },

  testNumberEquals: function() {
    this.assert((Math.PI).equals(Math.PI));
    this.assert((Math.PI).equals(new Number(Math.PI)));
    this.assert(new Number(Math.PI).equals(Math.PI));
    this.assert(new Number(Math.PI).equals(new Number(Math.PI)));
    this.assert(!(1).equals(0));
    this.assert(!(1).equals("1"));
    this.assert(Infinity.equals(Infinity));
    this.assert(!Infinity.equals(-Infinity));
    this.assert(!(-Infinity).equals(Infinity));
    this.assert(NaN.equals(NaN));
  },

  testCompareTo: function() {
    // These 2 commented assertions are equivalent to the whole list below
    // but they suppose that `Object.compare` and `Array#equals` work as expected.
    // They also don't show explicitely that we're testing `Number#compareTo`.
    
    // this.assert([-Infinity, -1, 0, Math.PI, Infinity, NaN].equals([0, Infinity, Math.PI, -1,  NaN, -Infinity].sort(Object.compare)));
    // this.assertEqual(0, NaN.compareTo(NaN));
    
    this.assert((0).compareTo(1) < 0);
    this.assertEqual(0, (Math.PI).compareTo(Math.PI));
    this.assert((1).compareTo(0) > 0);
    
    this.assert((-Infinity).compareTo(0) < 0);
    this.assert((-Infinity).compareTo(Infinity) < 0);
    this.assertEqual(0, Infinity.compareTo(Infinity));
    this.assert(Infinity.compareTo(0) > 0);
    this.assert(Infinity.compareTo(-Infinity) > 0);
    
    // `NaN` is equal to itself but considered greater than any other value
    // so the order is total.
    this.assertEqual(0, NaN.compareTo(NaN));
    this.assert(NaN.compareTo(-Infinity) > 0);
    this.assert((-Infinity).compareTo(NaN) < 0);
    this.assert(NaN.compareTo(Infinity) > 0);
    this.assert(Infinity.compareTo(NaN) < 0);
  },

  testNumberToColorPart: function() {
    this.assertEqual('00', (0).toColorPart());
    this.assertEqual('0a', (10).toColorPart());
    this.assertEqual('ff', (255).toColorPart());
  },

  testNumberToPaddedString: function() {
    this.assertEqual('00', (0).toPaddedString(2, 16));
    this.assertEqual('0a', (10).toPaddedString(2, 16));
    this.assertEqual('ff', (255).toPaddedString(2, 16));
    this.assertEqual('000', (0).toPaddedString(3));
    this.assertEqual('010', (10).toPaddedString(3));
    this.assertEqual('100', (100).toPaddedString(3));
    this.assertEqual('1000', (1000).toPaddedString(3));
  },

  testNumberToJSON: function() {
    this.assertEqual('null', Number.NaN.toJSON());
    this.assertEqual('0', (0).toJSON());
    this.assertEqual('-293', (-293).toJSON());
  },
  
  testNumberTimes: function() {
    var results = [];
    (5).times(function(i) { results.push(i) });
    this.assertEnumEqual($R(0, 4), results);
    
    results = [];
    (5).times(function(i) { results.push(i * this.i) }, { i: 2 });
    this.assertEnumEqual([0, 2, 4, 6, 8], results);
  }
});