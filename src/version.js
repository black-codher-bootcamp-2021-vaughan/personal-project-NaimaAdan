/**
* Version support
* Depends on core.js
*/
(function() {
  if (typeof JSAV === "undefined") { return; }
  var theVERSION = "v1.0.1-33-g556853c";

  JSAV.version = function() {
    return theVERSION;
  };
})();
