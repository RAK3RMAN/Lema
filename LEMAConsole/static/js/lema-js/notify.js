/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
LEMAConsole Front-End JS - Authored by: RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

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