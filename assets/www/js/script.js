
window.addEventListener("load", onLoad, false);

var fieldWidth = 700;
var fieldColor = "red";

function onLoad() {
    // alert("Start!");
    // start: formatowanie diva
    var div1 = document.getElementById("game");
    var divM = document.getElementById("app");
    setFieldSize();
    // alert(fieldWidth);
    div1.style.width = fieldWidth + "px";
    div1.style.height = fieldWidth + "px";
    div1.style.backgroundColor = "black";
    div1.style.position = "absolute";
    div1.style.top = 0.1 * screen.height;
    divM.style.left = (screen.width - fieldWidth) / 2 + "px";
    divM.style.width = fieldWidth + "px";
    clearField();

    var select = document.getElementById("sizeSelect");
    select.addEventListener("change", onSizeSelectChange, false);

    var cSelect = document.getElementById("colorSelect");
    cSelect.addEventListener("change", onColorSelectChange, false);

    var rBtn = document.getElementById("clearField");
    rBtn.addEventListener("click", clearField, false);

}

//Zdarzenie widoczne tylko na telefonie!
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // alert("Start w kom�rce!");
}

function addChildDivs(gridSize) {

    var main = document.getElementById("game");

    for (i = 0; i < gridSize; i++) {
        for (j = 0; j < gridSize; j++) {
            var small = document.createElement("div");
            small.style.width = (fieldWidth / gridSize) + "px";
            small.style.height = (fieldWidth / gridSize) + "px";
            small.style.position = "absolute";
            small.style.left = j * (fieldWidth / gridSize) + "px";
            small.style.top = i * (fieldWidth / gridSize) + "px";
            small.style.backgroundColor = fieldColor;
            small.style.border = "2px solid black";
            small.style.fontSize = (0.75 * (fieldWidth / gridSize)) + "px";
            small.style.marginTop = "20px";
            small.style.textAlign = "center";
            small.style.marginBottom = "auto";
            main.appendChild(small);
            small.className = "n";
            small.addEventListener("click", onSmallFieldClick, false);

        }
    }

}

var isCross = false;
var moves = 0;
function onSmallFieldClick(e) {
    var field = e.target;

    if (win) {
        clearField();
        return;
    }

    if (field.innerHTML != "" || field.className != "n") {
        return;
    }

    if (!isCross) {
        var img = document.createElement("img");
        img.src = "img\\o.png";
        img.style.width = "100%";
        img.style.height = "auto";
        field.appendChild(img);
        field.className = "o";
    } else {
        var img = document.createElement("img");
        img.src = "img\\x.png";
        img.style.width = "100%";
        img.style.height = "auto";
        field.appendChild(img);
        field.className = "x";
    }
    isCross = !isCross;
    navigator.notification.vibrate(50);
    moves++;
    checkWin();
}

function onSizeSelectChange(object) {
    clearField();
}

function onColorSelectChange(object) {
    var select = object.target;
    fieldColor = select.value;
    redrawFields();
}

function setFieldSize() {
    if (screen.width > screen.height) {
        fieldWidth = 0.85 * screen.height;
    } else {
        fieldWidth = 0.85 * screen.width;
    }
}

function clearField() {
    var gameField = document.getElementById("game");
    var select = document.getElementById("sizeSelect");
    if (select.value == 0) {
        return;
    }
    gameField.innerHTML = "";
    addChildDivs(select.value);
    redrawFields();
    win = false;
    moves = 0;
}

function redrawFields() {
    var main = document.getElementById("game");
    for (i = 0; i < main.childNodes.length; i++) {
        main.childNodes[i].style.backgroundColor = fieldColor;
    }
}

var win = false;
function checkWin() {
    var fieldSize = document.getElementById("sizeSelect").value;
    var main = document.getElementById("game");
    var desiredO = "";
    var desiredX = "";


    for (var i = 0; i < fieldSize; i++) {
        desiredO += "o";
        desiredX += "x";
    }

    //sprawdzam rzędy:
    for (var row = 0; row < fieldSize; row++) {
        var actual = "";
        for (var field = 0; field < fieldSize; field++) {
            actual += main.childNodes[(row * fieldSize) + field].className;
        }
        if (actual == desiredO) {
            navigator.notification.alert("Wygrywa kółko!", clearField, "Wygrana!", "OK");
            return;
        } else if (actual == desiredX) {
            navigator.notification.alert("Wygrywa krzyżyk!", clearField, "Wygrana!", "OK");
            return;
        }
    }

    //sprawdzam kolumny:
    for (var col = 0; col < fieldSize; col++) {
        var actual = "";
        for (var field = 0; field < fieldSize; field++) {
            actual += main.childNodes[col + (field * fieldSize)].className;
        }
        if (actual == desiredO) {
            navigator.notification.alert("Wygrywa kółko!", clearField, "Wygrana!", "OK");
            return;
        } else if (actual == desiredX) {
            navigator.notification.alert("Wygrywa krzyżyk!", clearField, "Wygrana!", "OK");
            return;
        }
    }

    //sprawdzam przekątną "\":
    for (var field = 0; field < fieldSize; field++) {
        var actual = "";
        for (var cross = 0; cross < fieldSize; cross++) {
           // console.log(cross * (fieldSize + cross));
            actual += main.childNodes[cross * fieldSize + cross].className;
        }
        //console.log("cross lewy: " + actual)
        if (actual == desiredO) {
            navigator.notification.alert("Wygrywa kółko!", clearField, "Wygrana!", "OK");
            return;
        } else if (actual == desiredX) {
            navigator.notification.alert("Wygrywa krzyżyk!", clearField, "Wygrana!", "OK");
            return;
        }
    }

    //sprawdzam przekątną "/":
    for (var field = 0; field < fieldSize; field++) {
        var actual = "";
        for (var cross = fieldSize; cross > 0; cross--) {
            //console.log(cross * fieldSize - cross);
            actual += main.childNodes[cross * fieldSize - cross].className;
        }
        //console.log("cross prawy: " + actual)
        if (actual == desiredO) {
            navigator.notification.alert("Wygrywa kółko!", clearField, "Wygrana!", "OK");
            return;
        } else if (actual == desiredX) {
            navigator.notification.alert("Wygrywa krzyżyk!", clearField, "Wygrana!", "OK");
            return;
        }
    }

    if (moves == fieldSize * fieldSize) {
        navigator.notification.alert("Nie ma więcej ruchów", clearField, "Uwaga", "OK");
    }
}