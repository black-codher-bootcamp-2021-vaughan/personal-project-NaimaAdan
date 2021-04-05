var codeArr = [
    "function bubbleSort() {",
    "   for (let i = 0; i < arr.size() - 1; i++) {",
    "       for (let j = 0; j < arr.size() - i; j++) {",
    "           if (arr.value(j) > arr.value(j + 1)) {",
    "               arr.swap(j, j + 1);",
    "        }",
    "       }",
    "   }",
    "}"
]




function run(){
    let runButton = document.getElementById("run")

    runButton.addEventListener("click", function() {
        let input = document.getElementById("userInput")
        let str = input.value;
        // if no commas and spaces are present
        if (str.indexOf(",") == -1 && str.indexOf(" ") != -1) {
            alert("User specified input should contain commas instead of spaces: " + str)
            return;
        }

        let formattedString = str.split("").filter(e => e != " ").join("")        
        let arr = formattedString.split(",");

        runBubbleSort(arr);
        document.getElementById("run").disabled = true;

    })
}

// funtion for the reset button 
function reset() {
    let resetButton = document.getElementById("reset")
    resetButton.addEventListener("click", function () {
      location.reload();
   })
}




function runBubbleSort(theArray) {
    var jsav = new JSAV("container");
    var arr = jsav.ds.array(theArray, {layout: "bar"});
    var code = jsav.code(codeArr)
    code.setCurrentLine(1)
    jsav.umsg("Starting bubble sort");
    jsav.step()
    for (let numTimes = 0; numTimes < arr.size() - 1; numTimes++) {
        code.setCurrentLine(2)
        jsav.umsg("Starting pass " + parseInt(numTimes + 1));
        jsav.step();
        code.setCurrentLine(3)
        jsav.umsg("For every element do some stuff");
        jsav.step();
        for (let swapIndex = 0; swapIndex < arr.size() - 1; swapIndex++) {
            jsav.umsg("Compare elements");
            arr.highlight(swapIndex);
            arr.highlight(swapIndex + 1)
            code.setCurrentLine(4)
            jsav.step();
            if (arr.value(swapIndex) > arr.value(swapIndex + 1)) {
                jsav.umsg("Swap elements");
                arr.swap(swapIndex, swapIndex + 1)
                code.setCurrentLine(5)
                jsav.step();
            }
            arr.unhighlight(swapIndex)
        }
        arr.unhighlight(arr.size() - 1)
    }
    code.setCurrentLine(8)
    jsav.umsg("Finished");
    jsav.recorded();
}
    
// this executed the "run" button
run()
reset()