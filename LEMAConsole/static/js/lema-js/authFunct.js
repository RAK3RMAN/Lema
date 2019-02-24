/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
LEMAConsole Front-End JS - Authored by: RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

//Load Preliminary JS
function loadJS() {
    onEnter();
}

//Send Request on Enter
function onEnter() {
    document.getElementById("enter").onkeypress = function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            document.getElementById("enterClick").click();
        }
    };
}