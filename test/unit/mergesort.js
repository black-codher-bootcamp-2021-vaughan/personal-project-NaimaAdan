/*global ok,test,module,deepEqual,equal,expect,notEqual,arrayUtils */
(function() {
    "use strict";
    module("mergesort", {  });
    test("JSAV", function() {
      expect(5);
      ok( JSAV, "JSAV" );
      ok( JSAV.ext, "JSAV extensions");
      ok( JSAV.init, "JSAV init");
      var av = new JSAV("emptycontainer");
      ok( av, "JSAV initialized" );
      var arr = [5, 4, 3, 2, 1]
      var jsavArr = av.ds.array(arr, {layout: "bar"});
      JSAV.ext.mergesort(av, jsavArr)
      av.end()

      deepEqual(jsavArr._values, [1, 2, 3, 4, 5], "Arrays are equal")
    });
  })();