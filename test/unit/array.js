/*global ok,test,module,deepEqual,equal,expect,notEqual,arrayUtils */
(function() {
  "use strict";
  module("datastructures.array", {  });
test("Initializing from HTML", function() {
  var values = [12, 22, "14", "39", false]; // array in HTML
  expect(9);
  var av = new JSAV("arraycontainer");
  ok( av, "JSAV initialized" );
  ok( av.ds.array, "Array exists" );
  var arr = av.ds.array($("#array"));
  ok( arr, "Array initialized" );
  for (var i = 0; i < values.length; i++) {
    deepEqual( arr.value(i), values[i], "Getting value of index " + i );
  }
  equal(arr.id(), "array");
});
})();