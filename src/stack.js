function addToArray(jsav, jsavArray, value) {
    var newArr = jsavArray._values
    newArr.push(value)

    jsavArray.hide()
    return jsav.ds.array(newArr) 

}
function poppedArray(jsav, jsavArray, value) {
    var newArr = jsavArray._values
    newArr.pop(value)
   
    jsavArray.hide()
    return jsav.ds.array(newArr,)

}


function run() {

    var jsav = new JSAV("container");
    var myArr = []
    // let headPointer;
    let topPointer;
    jsavArr = jsav.ds.array(myArr);
    var pushElement = document.getElementById("push");
    pushElement.addEventListener("click", function() {
        var input = document.getElementById("userInput")
        var valueToAdd = input.value
        jsavArr = addToArray(jsav, jsavArr, valueToAdd)
        // if (headPointer) {
        //   headPointer.hide()
        // }
        if (topPointer) {
          topPointer.hide()
        }
        topPointer = jsav.pointer("Top", jsavArr.index(jsavArr.size() - 1), {arrowAnchor: "left top"})
        // headPointer = jsav.pointer("Head", jsavArr.index(0), {arrowAnchor: "left top"})
      })

      var newArr = []
      jsavArr = jsav.ds.array(newArr);
      var popElement = document.getElementById("pop");
      popElement.addEventListener("click", function() {
          var input = document.getElementById("userInput")
          var valueToRemove = input.value
          jsavArr = poppedArray(jsav, jsavArr, valueToRemove) 
          // if (headPointer) {
          //   headPointer.hide()
          // }
          if (topPointer) {
            topPointer.hide()
          }
          topPointer = jsav.pointer("Top", jsavArr.index(jsavArr.size() - 1), {arrowAnchor: "left top"})
          // headPointer = jsav.pointer("Head", jsavArr.index(0), {arrowAnchor: "left top"})
      })
}
run()



