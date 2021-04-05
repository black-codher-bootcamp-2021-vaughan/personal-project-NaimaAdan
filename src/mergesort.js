let jsav;
let canvasWidth = document.getElementById('container').offsetWidth;
let rowHeight = 80;
let blockWidth = 47;


function run() {
    let runButton = document.getElementById("run")
    runButton.addEventListener("click", () => {
        let input = document.getElementById("userInput")
        let str = input.value;
        if (str.indexOf(",") == -1 && str.indexOf(" ") != -1) {
            alert("User specified input should contain commas instead of spaces: " + str)
            return;
        }

        let formattedString = str.split("").filter(e => e != " ").join("")        
        let arr = formattedString.split(",").map(e => parseInt(e));

        jsav = new JSAV("container");

        jsav.umsg("Selecting the whole array");
        mergeSort(createArray(arr, {indexed: true}), 1, 1);

        jsav.umsg("Finished sorting!");
        jsav.recorded();

        document.getElementById("run").disabled = true;
    })
}

function reset() {
    let resetButton = document.getElementById("reset")
    resetButton.addEventListener("click", function () {
      location.reload();
   })
}

function mergeSort(unsortedArray, level, column) {
    setArrayCanvasPosition(unsortedArray, level, column)
    unsortedArray.highlight()
    if (unsortedArray.size() == 1) {
        jsav.umsg("Hit base case of single value array. Getting ready to merge.");
        jsav.step();
        return unsortedArray
    }
    jsav.step()
    jsav.umsg("Splitting the array into 2 parts. If uneven, larger section is split to the left");
    unsortedArray.unhighlight();

    let midPoint = Math.ceil(unsortedArray.size() / 2);
    var leftArray = createArray(
        unsortedArray._values.slice(0, midPoint), {indexed: true, center: false});
    var rightArray = createArray(
        unsortedArray._values.slice(midPoint, unsortedArray.size()), {indexed: true, center: false});
    
    jsav.step();

    jsav.umsg("Selecting left subarray");
    let sortedLeftArray = mergeSort(leftArray, level + 1, column * 2 - 1);

    jsav.umsg("Selecting right subarray");
    let sortedRightArray = mergeSort(rightArray, level + 1, column * 2);
    return merge(unsortedArray, sortedLeftArray, sortedRightArray);
}

function merge(sortedArray, arr1, arr2) {
    jsav.umsg("Merge selected arrays back together, in sorted order");
    for (let i = 0; i < sortedArray.size(); i++) {
        sortedArray.value(i, "");
    }

    arr1.highlight();
    arr2.highlight();
    jsav.step();

    if (arr1.size() > 1) {
      arr1.unhighlight();
      arr2.unhighlight();
    }

    var arr1Index = 0;
    var arr2Index = 0;
    var index = 0;

    while (arr1Index < arr1.size() || arr2Index < arr2.size()) {
      if (arr1Index === arr1.size() || arr2Index === arr2.size()) {
        jsav.umsg("One of the sub arrays has become empty. Adding the remaining contents of non empty subarray");
      } else {
        // Default to always having multiple on left side
        if (arr1.size() > 1) {
          if (arr1Index < arr1.size()) {
            arr1.highlight(arr1Index);
          }
          if (arr2Index < arr2.size()) {
            arr2.highlight(arr2Index);
          }
          jsav.umsg("Picking smallest value from front of both sub arrays");
          jsav.step();
        }
        jsav.umsg("Selecting the smallest of the 2 values");
        if (arr1.value(arr1Index) < arr2.value(arr2Index)) {
            arr1.highlight(arr1Index)
        } else {
            arr2.highlight(arr2Index)
        }
      }

      if (arr1Index < arr1.size() && (arr1.value(arr1Index) <= arr2.value(arr2Index) || arr2Index === arr2.size())) {
        jsav.step();

        arr2.unhighlight(arr2Index)
        arr1.highlight(arr1Index)

        sortedArray.value(index, arr1.value(arr1Index));
        arr1.value(arr1Index, "");
        arr1.unhighlight(arr1Index);
        arr1Index++;
      } else {
        arr1.unhighlight(arr1Index)
        arr2.highlight(arr2Index)
        jsav.step();

        sortedArray.value(index, arr2.value(arr2Index));
        arr2.value(arr2Index, "");
        arr2.unhighlight(arr2Index);
        arr2Index++;
      }

      jsav.umsg("Adding the value to the sorted array");
      jsav.step();
      
      markSorted(sortedArray, [index])
      index++;
    }

    jsav.umsg("Merging completed");
    arr1.hide();
    arr2.hide();
    jsav.step();

    return sortedArray;
}

function setArrayCanvasPosition(arr, level, column) {
    var maxNumArraysInRow = Math.pow(2, level - 1);

    var left = (canvasWidth / (2 * maxNumArraysInRow)) * (2 * column - 1) -
               (blockWidth * arr.size() / 2);
    var top = rowHeight * (level - 1);

    arr.element.css({"left": left, "top": top, "position": "absolute"});
}

function createArray(values, options) {
    return jsav.ds.array(values, options)
}

function markSorted(arr, indeces) {
    arr.css(indeces, {"background-color": "#ffffcc" })
}

run()
reset()