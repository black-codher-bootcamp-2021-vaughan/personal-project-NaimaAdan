/*global JSAV, jQuery */
(function($) {
    "use strict";
    if (typeof JSAV === "undefined") { return; }

    function setupListeners() {
        // Initialise JSAV container and control buttons
        var enqueueElement = document.getElementById("enqueue");
        var dequeueElement = document.getElementById("dequeue");
        // Initialise JSAV pointers
        var headPointer;
        var tailPointer;

        if (!enqueueElement || !dequeueElement) {
            return;
        }

        var jsav = new JSAV("container");
        var jsavArr = jsav.ds.array([]);

        // // When a user clicks "enqueue" add new value to the array and update pointers
        enqueueElement.addEventListener("click", function() {
            var input = document.getElementById("userInput")
            var valueToAdd = input.value
            jsavArr = enqueueArray(jsav, jsavArr, valueToAdd) 
            if (headPointer) {
                headPointer.hide()
            }
            if (tailPointer) {
                tailPointer.hide()
            }
            tailPointer = jsav.pointer("Tail", jsavArr.index(jsavArr.size() - 1), {arrowAnchor: "left top"})
            headPointer = jsav.pointer("Head", jsavArr.index(0), {arrowAnchor: "left top"})
        })

        // When a user clicks "dequeue" remove value at tail of the array and update pointers
        dequeueElement.addEventListener("click", function() {
            jsavArr = dequeueArray(jsav, jsavArr) 
            if (headPointer) {
                headPointer.hide()
            }
            if (tailPointer) {
                tailPointer.hide()
            }
            tailPointer = jsav.pointer("Tail", jsavArr.index(jsavArr.size() - 1), {arrowAnchor: "left top"})
            headPointer = jsav.pointer("Head", jsavArr.index(0), {arrowAnchor: "left top"})
        })
    }

    // Workaround since JSAV does not support adding to array datastructure
    function enqueueArray(jsav, jsavArray, value) {
        var newArr = jsavArray._values
        newArr.push(value)
    
        jsavArray.hide()
        return jsav.ds.array(newArr)
    }

    // Workaround since JSAV does not support adding to array datastructure
    function dequeueArray(jsav, jsavArray) {
        var newArr = jsavArray._values
        newArr.shift()
    
        jsavArray.hide()
        return jsav.ds.array(newArr)
    }

    setupListeners()

    JSAV.ext.enqueue = enqueueArray
    JSAV.ext.dequeue = dequeueArray
}(jQuery));