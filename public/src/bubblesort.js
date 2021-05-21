// // Initialise JSAV container and control buttons
let runButton = document.getElementById("run")
let resetButton = document.getElementById("reset")
let jsav = new JSAV("container");

// Code shown as part of the example, during bubble sort visualisation
let codeArr = [
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

// When a user clicks run, we validate and format inputs and run bubble sort visualisation
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
    runButton.disabled = true;

})

resetButton.addEventListener("click", function () {
    location.reload();
})

function runBubbleSort(arr) {
    var jsavArr = jsav.ds.array(arr, {layout: "bar"});
    var code = jsav.code(codeArr)
    code.setCurrentLine(1)
    jsav.umsg("Starting bubble sort");
    jsav.step()
    for (let numTimes = 0; numTimes < jsavArr.size() - 1; numTimes++) {
        code.setCurrentLine(2)
        jsav.umsg("Starting pass " + parseInt(numTimes + 1));
        jsav.step();
        code.setCurrentLine(3)
        jsav.umsg("For every element do some stuff");
        jsav.step();
        for (let swapIndex = 0; swapIndex < jsavArr.size() - 1; swapIndex++) {
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