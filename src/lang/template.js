/** section: Language
 * class Template
 *
 *  A class for sophisticated string interpolation.
 *
 *  Any time you have a group of similar objects and you need to produce
 *  formatted output for these objects, maybe inside a loop, you typically
 *  resort to concatenating string literals with the object's fields:
 *
 *      "The TV show " + title + " was created by " + author + ".";
 *
 *  There's nothing wrong with this approach, except that it is hard to
 *  visualize the output immediately just by glancing at the concatenation
 *  expression. The `Template` class provides a much nicer and clearer way of
 *  achieving this formatting.
 *
 *  <h4>Straightforward templates</h4>
 *
 *  The `Template` class uses a basic formatting syntax, similar to what is
 *  used in Ruby. The templates are created from strings that have embedded
 *  symbols in the form (e.g., `#{fieldName}`) that will be replaced by
 *  actual values when the template is applied (evaluated) to an object.
 *
 *      // the template (our formatting expression)
 *      var myTemplate = new Template(
 *       'The TV show #{title} was created by #{author}.');
 *
 *      // our data to be formatted by the template
 *      var show = {
 *        title: 'The Simpsons',
 *        author: 'Matt Groening',
 *        network: 'FOX'
 *      };
 *
 *      // let's format our data
 *      myTemplate.evaluate(show);
 *      // -> "The TV show The Simpsons was created by Matt Groening."
 *
 *  <h4>Templates are meant to be reused</h4>
 *
 *  As the example illustrates, `Template` objects are not tied to specific
 *  data. The data is bound to the template only during the evaluation of the
 *  template, without affecting the template itself. The next example shows the
 *  same template being used with a handful of distinct objects.
 *
 *      // creating a few similar objects
 *      var conversion1 = { from: 'meters', to: 'feet', factor: 3.28 };
 *      var conversion2 = { from: 'kilojoules', to: 'BTUs', factor: 0.9478 };
 *      var conversion3 = { from: 'megabytes', to: 'gigabytes', factor: 1024 };
 *
 *      // the template
 *      var templ = new Template(
 *       'Multiply by #{factor} to convert from #{from} to #{to}.');
 *
 *      // let's format each object
 *      [conversion1, conversion2, conversion3].each( function(conv){
 *          templ.evaluate(conv);
 *      });
 *      // -> Multiply by 3.28 to convert from meters to feet.
 *      // -> Multiply by 0.9478 to convert from kilojoules to BTUs.
 *      // -> Multiply by 1024 to convert from megabytes to gigabytes.
 *
 *  <h4>Escape sequence</h4>
 *
 *  There's always the chance that one day you'll need to have a literal in your
 *  template that looks like a symbol, but is not supposed to be replaced. For
 *  these situations there's an escape character: the backslash (<code>\\</code>).
 *
 *      // NOTE: you're seeing two backslashes here because the backslash
 *      // is also an escape character in JavaScript strings, so a literal
 *      // backslash is represented by two backslashes.
 *      var t = new Template(
 *       'in #{lang} we also use the \\#{variable} syntax for templates.');
 *      var data = { lang:'Ruby', variable: '(not used)' };
 *      t.evaluate(data);
 *      // -> in Ruby we also use the #{variable} syntax for templates.
 *
 *  <h4>Custom syntaxes</h4>
 *
 *  The default syntax of the template strings will probably be enough for most
 *  scenarios. In the rare occasion where the default Ruby-like syntax is
 *  inadequate, there's a provision for customization. `Template`'s
 *  constructor accepts an optional second argument that is a regular expression
 *  object to match the replaceable symbols in the template string. Let's put
 *  together a template that uses a syntax similar to the ubiquitous `<&#38;= %>`
 *  constructs:
 *
 *      // matches symbols like '<&#38;= field %>'
 *      var syntax = /\\?\<%=\s*(\w+)\s*%\>/g;
 *
 *      var t = new Template(
 *       '<div>Name: <b><&#38;= name %></b>, Age: <b><&#38;=age%></b></div>',
 *       syntax);
 *      t.evaluate( {name: 'John Smith', age: 26} );
 *      // -> <div>Name: <b>John Smith</b>, Age: <b>26</b></div>
 *
 *  There are important constraints to any custom syntax. Any syntax must be a
 *  global regular expression starting with an eventual backslash escape character
 *  (no, you cannot use a different character) and containing a group capturing the
 *  name of the field inside the symbol.
 *
 *  <h5>Backward compatilibility</h5>
 *
 *  Old style syntaxes are still supported but deprecated and will be removed in
 *  future releases:
 *
 *      var oldSyntax = /(^|.|\r|\n)(\<%=\s*(\w+)\s*%\>)/;
 *
**/
var Template = Class.create((function() {
  /**
   *  new Template(template[, pattern = Template.Pattern])
   *
   *  Creates a Template object.
   *
   *  The optional `pattern` argument expects a `RegExp` that defines a custom
   *  syntax for the replaceable symbols in `template`.
  **/
  function initialize(template, pattern) {
    this.template = template.toString();
    this.pattern = formatPattern(pattern || Template.Pattern);
  }

  /**
   *  Template#evaluate(object) -> String
   *
   *  Applies the template to `object`'s data, producing a formatted string
   *  with symbols replaced by `object`'s corresponding properties.
  **/
  function evaluate(object) {
    if (object && Object.isFunction(object.toTemplateReplacements))
      object = object.toTemplateReplacements();

    return this.template.replace(this.pattern, function(interpolation, expr) {
      if (interpolation.charAt(0) === '\\') return interpolation.slice(1);
      if (object == null) return '';
      
      var result = expr.split(/\.|\[|\]/).inject(object, function(ctx, property) {
        return property.length ? ctx[property] : ctx;
      });
      
      return result === object ? '' : String.interpret(result);
    });
  }

  // Backward-compatibility with 1.6 syntax
  function formatPattern(pattern) {
    if (pattern.global) return pattern;
    var source = pattern.source.replace('(^|.|\\r|\\n)', '\\\\?').replace(/\((.*)\)/, '$1');
    return new RegExp(source, 'g');
  }

  return {
    initialize: initialize,
    evaluate:   evaluate
  };
})());

Template.Pattern = /\\?#\{(.*?)\}/g;
