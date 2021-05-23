function enqueueArray(jsav, jsavArray, value) {
    var newArr = jsavArray._values
    newArr.push(value)
   
    jsavArray.hide()
    return jsav.ds.array(newArr)
}
function dequeueArray(jsav, jsavArray, value) {
    var newArr = jsavArray._values
    newArr.shift(value)
   
    jsavArray.hide()
    return jsav.ds.array(newArr)

}


function run() {
    var jsav = new JSAV("container");
     let headPointer;
     let tailPointer;
          var myArr = []
          jsavArr = jsav.ds.array(myArr, {layout: "bar"});
          var pushElement = document.getElementById("enqueue");
          pushElement.addEventListener("click", function() {
        var input = document.getElementById("userInput")
        var valueToAdd = input.value
        jsavArr = enqueueArray(jsav, jsavArr, valueToAdd) 
        if (headPointer) {
            headPointer.hide()
        }
        if (tailPointer) {
            tailPointer.hide()
          }
          tailPointer = jsav.pointer("tail", jsavArr.index(jsavArr.size() - 1), {arrowAnchor: "left top"})
          headPointer = jsav.pointer("Head", jsavArr.index(0), {arrowAnchor: "left top"})
      })

      var newArr = []
          jsavArr = jsav.ds.array(newArr);
          var shiftElement = document.getElementById("dequeue");
          shiftElement.addEventListener("click", function() {
              var input = document.getElementById("userInput")
              var valueToRemove = input.value
              jsavArr = dequeueArray(jsav, jsavArr, valueToRemove) 
              if (headPointer) {
                headPointer.hide()
            }
            if (tailPointer) {
                tailPointer.hide()
              }
              tailPointer = jsav.pointer("tail", jsavArr.index(jsavArr.size() - 1), {arrowAnchor: "left top"})
              headPointer = jsav.pointer("Head", jsavArr.index(0), {arrowAnchor: "left top"})
      })


}

run()