/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
LEMAConsole Front-End JS - Authored by: RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

//Switch theme color function
function switchTheme(currentColor, userID) {
    let setColor = "white";
    let friendlyColor = "LIGHT";
    if (currentColor === "white") {
        setColor = "dark-edition";
        friendlyColor = "DARK";
    }
    console.log(setColor);
    $.ajax({
        type: "POST",
        url: "/api/user/theme",
        data: {
            theme: setColor,
            userID: userID
        },
        success: function (data) {
            location.reload();
        },
        error: function (data) {
            console.log(data);
            Toast.fire({
                type: 'error',
                title: 'Error in changing theme...'
            });
        }
    });
}

//Theme coloring handlers
function themeHandler(console_theme) {
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
    let friendlyColor = "LIGHT";
    if (console_theme === "white") {
        friendlyColor = "DARK";
    }
    document.getElementById('themeSet').innerHTML = "<i class=\"fas fa-paint-roller pr-1\"></i>" + friendlyColor + " Theme";
}
