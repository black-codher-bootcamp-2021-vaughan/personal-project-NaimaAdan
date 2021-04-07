var jsav = new JSAV("av");
var bt = jsav.ds.binarytree();

let insertButton = document.getElementById("insert")
insertButton.addEventListener("click", () => {
    let value = parseInt(document.getElementById("userInput").value)
    if (value == NaN) {
        alert("use a number")
    }
    if (bt.root().value()) {
        addNode(value, bt.root(), bt)
    } else {
        bt.root(value)
    }
    bt.show()
    document.getElementById("userInput").value = ""
    bt.layout()
})

let deleteButton = document.getElementById("remove")
deleteButton.addEventListener("click", () => {
    let userInput = document.getElementById("userInput")
    let value = parseInt(userInput.value)
    if (value == NaN) {
        alert("use a number")
    }
    let newRoot = deleteNode(bt.root(), value, bt)
    if (!newRoot) {
        bt.root().remove()
    } else {
        bt.root(newRoot)
    }
    bt.show()
    userInput.value = ""
    bt.layout()
})


function deleteNode(node, value) {
    if (!node) {
        return null
    }

    if (node.value() < value) {
        node.right(deleteNode(node.right(), value))
    } else if (node.value() > value) {
        node.left(deleteNode(node.left(), value))
    } else {
        if (!node.left()) {
            return node.right() ? node.right() : null
        } else if (!node.right()) {
            return node.left() ? node.left() : null
        } else {
            let leftMostChild = findLeftMostChild(node.right())
            node.value(leftMostChild.value())
            node.right(deleteNode(node.right(), node.value()))
        }
    }
    return node
}


function findLeftMostChild(node) {
    if (!node.left()) {
        return node
    }
    return node.left()
}

function addNode(value, node, tree) {
    if (!node) {
        return tree.newNode(value)
    }

    if (value > node.value()) {
        node.right(addNode(value, node.right(), tree))
    } else if (value < node.value()) {
        node.left(addNode(value, node.left(), tree))
    }

    return node
}