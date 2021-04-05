/*global ok,test,module,deepEqual,equal,expect,notEqual,arrayUtils */
(function() {
    "use strict";
    module("queue", {  });
    test("enqueue", function() {
      expect(5);
      ok( JSAV, "JSAV" );
      ok( JSAV.ext, "JSAV extensions");
      ok( JSAV.init, "JSAV init");
      var av = new JSAV("emptycontainer");
      ok( av, "JSAV initialized" );
      var arr = [5, 4, 3, 2, 1]
      var jsavArr = av.ds.array(arr, {layout: "bar"});
      deepEqual(JSAV.ext.enqueue(av, jsavArr, 6)._values, [5, 4, 3, 2, 1, 6], "")
    });

    test("dequeue", function() {
        expect(5);
        ok( JSAV, "JSAV" );
        ok( JSAV.ext, "JSAV extensions");
        ok( JSAV.init, "JSAV init");
        var av = new JSAV("emptycontainer");
        ok( av, "JSAV initialized" );
        var arr = [5, 4, 3, 2, 1]
        var jsavArr = av.ds.array(arr, {layout: "bar"});
        deepEqual(JSAV.ext.dequeue(av, jsavArr)._values, [4, 3, 2, 1], "")
      });
  })();