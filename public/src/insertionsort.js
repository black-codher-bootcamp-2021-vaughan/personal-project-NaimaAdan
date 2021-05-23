/*global JSAV, jQuery */
(function($) {
    "use strict";
    if (typeof JSAV === "undefined") { return; }

    var runButton = document.getElementById("run")
    var resetButton = document.getElementById("reset")
    var codeArr = [
        "function insertionSort() {",
        "   for (var sortedIndex = 0; i < sortedIndex.size() - 1; i++) {",
        "       for (var indexToCompare = sortedIndex + 1; indexToCompare > 0 && arr[indexToCompare] < arr[sortedIndex]; j--) {",
        "           if (arr[indexToCompare] < arr[indexToCompare - 1]) {",
        "               arr.swap(indexToCompare, indexToCompare - 1);",
        "        }",
        "       }",
        "   }",
        "}"
    ]


    function setupListeners() {
        if (!runButton || !resetButton) {
            return;
        }
        runButton.addEventListener("click", function() {
            var input = document.getElementById("userInput")
            var str = input.value;
            // if no commas and spaces are present
            if (str.indexOf(",") == -1 && str.indexOf(" ") != -1) {
                alert("User specified input should contain commas instead of spaces: " + str)
                return;
            }
    
            var formattedString = str.split("").filter(function(e) { return e != " "}).join("")        
            var arr = formattedString.split(",");
            var jsav = new JSAV("container");
            var jsavArr = jsav.ds.array(arr, {layout: "bar"});
    
            runInsertionSort(jsav, jsavArr);
            document.getElementById("run").disabled = true;
        })
        resetButton.addEventListener("click", function () {
            location.reload();
        })
    }




    function setProcessing(arr, index) {
        arr.addClass(index, "processing");
    };

    function unsetProcessing(arr, index) {
        arr.removeClass(index, "processing");
    };


    function runInsertionSort(jsav, jsavArr) {
        var code = jsav.code(codeArr)
        code.setCurrentLine(1)
        jsav.umsg("Starting insertion sort");
        jsav.step()
        for (var sortedIndex = 0; sortedIndex < jsavArr.size() - 1; sortedIndex++) {
            jsav.umsg("Everything up to index " + sortedIndex + " is in sorted order");
            code.setCurrentLine(2)
            jsavArr.highlight(sortedIndex)
            jsav.step();
            code.setCurrentLine(3)
            jsav.step();
            var indexToCompare;
            for (indexToCompare = sortedIndex + 1; indexToCompare > 0 && jsavArr.value(indexToCompare) < jsavArr.value(indexToCompare - 1); indexToCompare--) {
                jsav.umsg("Processing index " + indexToCompare + " in blue");
                setProcessing(jsavArr, indexToCompare)
                jsav.step();
                jsav.umsg("Comparing to the value to the left");
                code.setCurrentLine(4)
                jsav.step();
                if (jsavArr.value(indexToCompare) < jsavArr.value(indexToCompare - 1)) {
                    jsav.umsg("Swap");
                    code.setCurrentLine(5)
                    jsavArr.highlight(indexToCompare)
                    jsavArr.unhighlight(indexToCompare - 1)
                    unsetProcessing(jsavArr, indexToCompare)
                    setProcessing(jsavArr, indexToCompare - 1)
                    jsavArr.swap(indexToCompare, indexToCompare - 1)
                    jsav.step();
                }
            }
            jsavArr.highlight(indexToCompare)
            unsetProcessing(jsavArr, indexToCompare)
        }
        jsav.umsg("Finished");
        code.setCurrentLine(8)
        jsav.recorded();
    }

    setupListeners()
    JSAV.ext.insertionsort = runInsertionSort
}(jQuery));