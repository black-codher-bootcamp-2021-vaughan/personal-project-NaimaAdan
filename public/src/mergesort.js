/*global JSAV, jQuery */
(function($) {
  "use strict";
  if (typeof JSAV === "undefined") { return; }

  var runButton = document.getElementById("run")
  var resetButton = document.getElementById("reset")
  var jsav;
  var canvasWidth;
  var rowHeight = 80;
  var blockWidth = 47;

  function setupListeners() {
    if (!runButton || !resetButton) {
        canvasWidth = 0
        return;
    }
    canvasWidth = document.getElementById('container').offsetWidth
    runButton.addEventListener("click", function() {
      var input = document.getElementById("userInput")
      var str = input.value;
      if (str.indexOf(",") == -1 && str.indexOf(" ") != -1) {
          alert("User specified input should contain commas instead of spaces: " + str)
          return;
      }

      var formattedString = str.split("").filter(function(e) { return e != " "}).join("")        
      var arr = formattedString.split(",").map(function(e) { return parseInt(e)});

      jsav = new JSAV("container");

      jsav.umsg("Selecting the whole array");
      // creat an array based off input value and in potion 1 1 
      runMergeSort(jsav, createArray(jsav, arr, {indexed: true}));

      jsav.umsg("Finished sorting!");
      jsav.recorded();

      document.getElementById("run").disabled = true;
    })

    resetButton.addEventListener("click", function () {
        location.reload();
    })
  }

  function runMergeSort(jsav, jsavArr) {
    mergeSort(jsav, jsavArr, 1, 1)
  }

  function mergeSort(jsav, unsortedArray, level, column) {
      setArrayCanvasPosition(unsortedArray, level, column)
      unsortedArray.highlight()
      // base case
      if (unsortedArray.size() == 1) {
          jsav.umsg("Hit base case of single value array. Getting ready to merge.");
          jsav.step();
          return unsortedArray
      }
      jsav.step()
      jsav.umsg("Splitting the array into 2 parts. If uneven, larger section is split to the left");
      unsortedArray.unhighlight();

      // Split unsorted array into 2 sections, left and right. (Actually creates 2 new jsav arrays)
      var midPoint = Math.ceil(unsortedArray.size() / 2);
      var leftArray = createArray(
          jsav, unsortedArray._values.slice(0, midPoint), {indexed: true, center: false});
      var rightArray = createArray(
          jsav, unsortedArray._values.slice(midPoint, unsortedArray.size()), {indexed: true, center: false});
      
      jsav.step();

      // Mergesorts the left subarray, so that its returned in sorted order
      jsav.umsg("Selecting left subarray");
      var sortedLeftArray = mergeSort(jsav, leftArray, level + 1, column * 2 - 1);

      // Mergesorts the right subarray, so that its returned in sorted order
      jsav.umsg("Selecting right subarray");
      var sortedRightArray = mergeSort(jsav, rightArray, level + 1, column * 2);
      // Merges the 2 subarrays efficiently, by using pointers and returns the fully sorted array
      return merge(jsav, unsortedArray, sortedLeftArray, sortedRightArray);
  }

  function merge(jsav, sortedArray, arr1, arr2) {
      jsav.umsg("Merge selected arrays back together, in sorted order");
      // Empties out values of initial unsortedArray so that we can add the sorted values to it in order
      for (var i = 0; i < sortedArray.size(); i++) {
          sortedArray.value(i, "");
      }

      arr1.highlight();
      arr2.highlight();
      jsav.step();

      if (arr1.size() > 1) {
        arr1.unhighlight();
        arr2.unhighlight();
      }

      // initialises pointers for left and right subarrays. Also initiates pointer for fully sorted array
      var arr1Index = 0;
      var arr2Index = 0;
      var index = 0;

      // Continue adding values to sorted array until both subarray pointers are at the end of their respective subarrays
      while (arr1Index < arr1.size() || arr2Index < arr2.size()) {
        if (arr1Index === arr1.size() || arr2Index === arr2.size()) {
          jsav.umsg("One of the sub arrays has become empty. Adding the remaining contents of non empty subarray");
        } else {
          // Default to always having multiple on left side
          if (arr1.size() > 1) {
            // Highlight begining of both subarrays
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
          // If we should add the value from the front of the left subarray
          jsav.step();

          arr2.unhighlight(arr2Index)
          arr1.highlight(arr1Index)

          sortedArray.value(index, arr1.value(arr1Index));
          arr1.value(arr1Index, "");
          arr1.unhighlight(arr1Index);
          // Increment counter for left subarray
          arr1Index++;
        } else {
          // If we should add the value from the front of the right subarray
          arr1.unhighlight(arr1Index)
          arr2.highlight(arr2Index)
          jsav.step();

          sortedArray.value(index, arr2.value(arr2Index));
          arr2.value(arr2Index, "");
          arr2.unhighlight(arr2Index);
          // Increment counter for right subarray
          arr2Index++;
        }

        jsav.umsg("Adding the value to the sorted array");
        jsav.step();
        
        markSorted(sortedArray, [index])
        // increment counter for index of total sorted array
        index++;
      }

      jsav.umsg("Merging compvared");
      arr1.hide();
      arr2.hide();
      jsav.step();

      return sortedArray;
  }

  // Sets the CSS position of the newly created child subarrays
  function setArrayCanvasPosition(arr, level, column) {
      var maxNumArraysInRow = Math.pow(2, level - 1);

      var left = (canvasWidth / (2 * maxNumArraysInRow)) * (2 * column - 1) -
                (blockWidth * arr.size() / 2);
      var top = rowHeight * (level - 1);

      arr.element.css({"left": left, "top": top, "position": "absolute"});
  }

  function createArray(jsav, values, options) {
      return jsav.ds.array(values, options)
  }

  function markSorted(arr, indeces) {
      arr.css(indeces, {"background-color": "#ffffcc" })
  }

  setupListeners()
  JSAV.ext.mergesort = runMergeSort
}(jQuery));