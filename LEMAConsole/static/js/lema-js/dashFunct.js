/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
LEMAConsole Front-End JS - Authored by: RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
//Set SA Toast Settings
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000
});

//Populate Dashboard with Details
function dashDetails() {
    $.ajax({
        type: "GET",
        url: "/api/dash_details",
        success: function (data) {
            console.log(data);
            //Node Requests Card
            //Connected Nodes Card
            document.getElementById("connectedNodes").innerHTML = data.connectedNodes;
            //Nodes on Console Card
            document.getElementById("totalConsoleNodes").innerHTML = data.totalConsoleNodes;
            //Nodes on Network Card
            document.getElementById("totalNetworkNodes").innerHTML = data.totalNetworkNodes;
            //Inbound Requests Graph
            //Node Connected Graph
            //Outbound Requests Graph
            //General Node Population Cards
        },
        error: function (data) {
            console.log(data);
            Toast.fire({
                type: 'error',
                title: 'Error with retrieving data...'
            });
        }
    });
}
