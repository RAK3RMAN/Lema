/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
LEMAConsole Front-End JS - Authored by: RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

//Switch theme color function
function switchTheme(currentColor) {

}

//Theme coloring handlers
if ($('body').hasClass("white")) {
    $('#logo-selection').append(
        "<img src=\"/static/img/logo.png\" width=\"80%\">"
    );
} else {
    $('#logo-selection').append(
        "<img src=\"/static/img/logo-alt.png\" width=\"80%\">"
    );
    document.getElementById("nav-selection1").className = "nav-link text-white";
    document.getElementById("nav-selection2").className = "nav-link text-white";
}
