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
            document.getElementById("totalRequests").innerHTML = data.totalRequests;
            //Connected Nodes Card
            document.getElementById("connectedNodes").innerHTML = data.connectedNodes;
            parseUpdated('recentConnectWidget', data.recentConnect);
            //Nodes on Console Card
            let addpending_S = "s";
            let addhidden_S = "s";
            if (data.pendingNodes === 1) { addpending_S = "" }
            if (data.hiddenNodes === 1) { addhidden_S = "" }
            document.getElementById("totalConsoleNodes").innerHTML = data.totalConsoleNodes;
            document.getElementById("totalConsoleNodes_Details").innerHTML = "<i class=\"material-icons\">devices</i> <a class=\"text-warning\">" + data.pendingNodes + "</a> Node" + addpending_S + " Pending | " + data.hiddenNodes + " Node" + addhidden_S + " Hidden";
            //Nodes on Network Card
            document.getElementById("totalNetworkNodes").innerHTML = data.totalNetworkNodes;
            document.getElementById("scanRange").innerHTML = "<i class=\"material-icons\">gps_fixed</i> Scanning IP Range: " + data.startRange + " - " + data.endRange;
            //Inbound Requests Graph
            parseUpdated('recentInbound', data.recentInbound);
            //Node Connected Graph
            parseUpdated('recentConnectGraph', data.recentConnect);
            //Outbound Requests Graph
            parseUpdated('recentOutbound', data.recentOutbound);
            //General Node Population Cards
            $('#nodePopulation').empty();
            $.each(data.nodeList, function (i, value) {
                if (value.node_status === "online") {
                    $('#nodePopulation').append(
                        "<div class=\"col-xl-3 col-lg-6 col-md-6 col-sm-6\">\n" +
                        "    <div class=\"card bg-success mt-0\">\n" +
                        "        <a class=\"card-body\" href=\"/node/details/" + value.node_id + "\">\n" +
                        "            <h5 class=\"card-category card-category-social text-right\">\n" +
                        "                <i class=\"far fa-check-circle\"></i> ONLINE\n" +
                        "            </h5>\n" +
                        "            <h3 class=\"card-title mb-0\">\n" +
                        "                " + value.node_name + "\n" +
                        "            </h3>\n" +
                        "            <p class='text-white'>Node IP: " + value.node_ip + "</p>\n" +
                        "        </a>\n" +
                        "    </div>\n" +
                        "</div>"
                    );
                } else if (value.node_status === "offline") {
                    $('#nodePopulation').append(
                        "<div class=\"col-xl-3 col-lg-6 col-md-6 col-sm-6\">\n" +
                        "    <div class=\"card bg-warning mt-0\">\n" +
                        "        <a class=\"card-body\" href=\"/node/details/" + value.node_id + "\">\n" +
                        "            <h5 class=\"card-category card-category-social text-right\">\n" +
                        "                <i class=\"far fa-times-circle\"></i> OFFLINE\n" +
                        "            </h5>\n" +
                        "            <h3 class=\"card-title mb-0\">\n" +
                        "                " + value.node_name + "\n" +
                        "            </h3>\n" +
                        "            <p class='text-white'>Node IP: " + value.node_ip + "</p>\n" +
                        "        </div>\n" +
                        "    </div>\n" +
                        "</div>"
                    );
                } else if (value.node_status === "unknown") {
                    $('#nodePopulation').append(
                        "<div class=\"col-xl-3 col-lg-6 col-md-6 col-sm-6\">\n" +
                        "    <div class=\"card bg-info mt-0\">\n" +
                        "        <a class=\"card-body\" href=\"/node/details/" + value.node_id + "\">\n" +
                        "            <h5 class=\"card-category card-category-social text-right\">\n" +
                        "                <i class=\"far fa-question-circle\"></i> UNKNOWN\n" +
                        "            </h5>\n" +
                        "            <h3 class=\"card-title mb-0\">\n" +
                        "                " + value.node_name + "\n" +
                        "            </h3>\n" +
                        "            <p class='text-white'>Node IP: " + value.node_ip + "</p>\n" +
                        "        </div>\n" +
                        "    </div>\n" +
                        "</div>"
                    );
                }
            });
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

//Append Updated Details
function parseUpdated(element, dateSent) {
    if (dateSent === null) {
        document.getElementById(element).innerHTML = "<i class=\"material-icons\">update</i> Data not logged yet...";
    } else {
        document.getElementById(element).innerHTML = "<i class=\"material-icons\">update</i>Updated " + moment(dateSent).fromNow();
    }
}
