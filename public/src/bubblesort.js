/*global JSAV, jQuery */
(function($) {
    "use strict";
    if (typeof JSAV === "undefined") { return; }

    // Code shown as part of the example, during bubble sort visualisation
    var codeArr = [
        "function bubbleSort() {",
        "   for (var i = 0; i < arr.size() - 1; i++) {",
        "       for (var j = 0; j < arr.size() - i; j++) {",
        "           if (arr.value(j) > arr.value(j + 1)) {",
        "               arr.swap(j, j + 1);",
        "        }",
        "       }",
        "   }",
        "}"
    ]

    function setupListeners() {
        var runButton = document.getElementById("run")
        var resetButton = document.getElementById("reset")
        if (!runButton || !resetButton) {
            return;
        }

        runButton.addEventListener("click", function() {
            var input = document.getElementById("userInput")
            var str = input.value;
            if (str.indexOf(",") == -1 && str.indexOf(" ") != -1) {
                alert("User specified input should contain commas instead of spaces: " + str)
                return;
            }
            var formattedString = str.split("").filter(function(e) { return e != " "}).join("")
            var arr = formattedString.split(",").map(function(e) { return parseInt(e)});
            var jsav = new JSAV("container");
            var jsavArr = jsav.ds.array(arr, {layout: "bar"});
    
            runBubbleSort(jsav, jsavArr);
            runButton.disabled = true;
        })


        resetButton.addEventListener("click", function () {
            location.reload();
        })
    }

    function runBubbleSort(jsav, jsavArr) {
        var code = jsav.code(codeArr)
        code.setCurrentLine(1)
        jsav.umsg("Starting bubble sort");
        jsav.step()
        for (var numTimes = 0; numTimes < jsavArr.size() - 1; numTimes++) {
            code.setCurrentLine(2)
            jsav.umsg("Starting pass " + parseInt(numTimes + 1));
            jsav.step();
            code.setCurrentLine(3)
            jsav.umsg("For every element compare and swap");
            jsav.step();
            for (var swapIndex = 0; swapIndex < jsavArr.size() - 1; swapIndex++) {
                jsav.umsg("Compare elements");
                jsavArr.highlight(swapIndex);
                jsavArr.highlight(swapIndex + 1)
                code.setCurrentLine(4)
                jsav.step();
                if (jsavArr.value(swapIndex) > jsavArr.value(swapIndex + 1)) {
                    jsav.umsg("Swap elements");
                    jsavArr.swap(swapIndex, swapIndex + 1)
                    code.setCurrentLine(5)
                    jsav.step();
                }
                jsavArr.unhighlight(swapIndex)
            }
            jsavArr.unhighlight(jsavArr.size() - 1)
        }
        code.setCurrentLine(8)
        jsav.umsg("Finished");
        jsav.recorded();
    }

    setupListeners()

    JSAV.ext.bubblesort = runBubbleSort
  }(jQuery));