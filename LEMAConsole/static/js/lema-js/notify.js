/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
LEMAConsole Front-End JS - Authored by: RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

//Send notification to client given params
function sendNotification(senticon, sentmessage, senttype) {
    $.notify({
        icon: senticon,
        message: sentmessage
    }, {
        type: senttype,
        timer: 3e3,
        placement: {
            from: 'top',
            align: 'right'
        }
    })
}

//Redirect to Node List page with search param
function nodeSearch() {
    let searchValue = document.getElementById("searchValue").value
    location.assign("/node/list?search=" + searchValue);
}