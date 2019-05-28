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
            if (data.pendingNodes === 1) {
                addpending_S = ""
            }
            if (data.hiddenNodes === 1) {
                addhidden_S = ""
            }
            document.getElementById("totalConsoleNodes").innerHTML = data.totalConsoleNodes;
            document.getElementById("totalConsoleNodes_Details").innerHTML = "<i class=\"material-icons\">devices</i> <a class=\"text-warning\">" + data.pendingNodes + "</a> Node" + addpending_S + " Pending | " + data.hiddenNodes + " Node" + addhidden_S + " Hidden";
            //Nodes on Network Card
            document.getElementById("totalNetworkNodes").innerHTML = data.totalNetworkNodes;
            document.getElementById("scanRange").innerHTML = "<i class=\"material-icons\">gps_fixed</i> IP Range: " + data.startRange + " - " + data.endRange;
            //Inbound Requests Graph
            parseUpdated('recentInbound', data.recentInbound);
            let datainboundChart = {
                labels: [
                    moment().subtract(8, 'hour').format("ha").slice(0, -1),
                    moment().subtract(7, 'hour').format("ha").slice(0, -1),
                    moment().subtract(6, 'hour').format("ha").slice(0, -1),
                    moment().subtract(5, 'hour').format("ha").slice(0, -1),
                    moment().subtract(4, 'hour').format("ha").slice(0, -1),
                    moment().subtract(3, 'hour').format("ha").slice(0, -1),
                    moment().subtract(2, 'hour').format("ha").slice(0, -1),
                    moment().subtract(1, 'hour').format("ha").slice(0, -1)
                ],
                series: [
                    [
                        data.inboundArray[4],
                        data.inboundArray[5],
                        data.inboundArray[6],
                        data.inboundArray[7],
                        data.inboundArray[8],
                        data.inboundArray[9],
                        data.inboundArray[10],
                        data.inboundArray[11],
                    ]
                ]
            };
            let optionsinboundChart = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                low: 0,
                high: (Math.max.apply(Math, data.inboundArray) + 2),
                chartPadding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
            };
            let inboundChart = new Chartist.Line('#inboundChart', datainboundChart, optionsinboundChart);
            md.startAnimationForLineChart(inboundChart);
            //Node Connected Graph
            parseUpdated('recentConnectGraph', data.recentConnect);
            let dataconnectedChart = {
                labels: [
                    moment().subtract(6, 'hour').format("ha").slice(0, -1),
                    "",
                    moment().subtract(5, 'hour').format("ha").slice(0, -1),
                    "",
                    moment().subtract(4, 'hour').format("ha").slice(0, -1),
                    "",
                    moment().subtract(3, 'hour').format("ha").slice(0, -1),
                    "",
                    moment().subtract(2, 'hour').format("ha").slice(0, -1),
                    "",
                    moment().subtract(1, 'hour').format("ha").slice(0, -1),
                    "",
                ],
                series: [
                    [
                        data.connectedArray[0],
                        data.connectedArray[1],
                        data.connectedArray[2],
                        data.connectedArray[3],
                        data.connectedArray[4],
                        data.connectedArray[5],
                        data.connectedArray[6],
                        data.connectedArray[7],
                        data.connectedArray[8],
                        data.connectedArray[9],
                        data.connectedArray[10],
                        data.connectedArray[11],
                    ]
                ]
            };
            let optionsconnectedChart = {
                axisX: {
                    showGrid: false
                },
                low: (-1*Math.max.apply(Math, [-1*Math.min.apply(Math, data.connectedArray), Math.max.apply(Math, data.connectedArray)])) - 1,
                high: (Math.max.apply(Math, [-1*Math.min.apply(Math, data.connectedArray), Math.max.apply(Math, data.connectedArray)])) + 1,
                chartPadding: {
                    top: 0,
                    right: 5,
                    bottom: 0,
                    left: 0
                }
            };
            let responsiveOptions = [
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        }
                    }
                }]
            ];
            let connectedChart = Chartist.Bar('#connectedChart', dataconnectedChart, optionsconnectedChart, responsiveOptions);
            md.startAnimationForBarChart(connectedChart);
            //Outbound Requests Graph
            parseUpdated('recentOutbound', data.recentOutbound);
            let dataoutboundChart = {
                labels: [
                    moment().subtract(8, 'hour').format("ha").slice(0, -1),
                    moment().subtract(7, 'hour').format("ha").slice(0, -1),
                    moment().subtract(6, 'hour').format("ha").slice(0, -1),
                    moment().subtract(5, 'hour').format("ha").slice(0, -1),
                    moment().subtract(4, 'hour').format("ha").slice(0, -1),
                    moment().subtract(3, 'hour').format("ha").slice(0, -1),
                    moment().subtract(2, 'hour').format("ha").slice(0, -1),
                    moment().subtract(1, 'hour').format("ha").slice(0, -1)
                ],
                series: [
                    [
                        data.outboundArray[4],
                        data.outboundArray[5],
                        data.outboundArray[6],
                        data.outboundArray[7],
                        data.outboundArray[8],
                        data.outboundArray[9],
                        data.outboundArray[10],
                        data.outboundArray[11],
                    ]
                ]
            };
            let optionsoutboundChart = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                low: 0,
                high: (Math.max.apply(Math, data.outboundArray) + 2),
                chartPadding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            };
            let outboundChart = new Chartist.Line('#outboundChart', dataoutboundChart, optionsoutboundChart);
            md.startAnimationForLineChart(outboundChart);
            //General Node Population Cards
            $('#nodePopulation').empty();
            $.each(data.nodeList, function (i, value) {
                if (value.node_status === "online") {
                    $('#nodePopulation').append(
                        "<div class=\"col-xl-3 col-lg-6 col-md-6 col-sm-6\">\n" +
                        "    <div class=\"card bg-success mt-0\">\n" +
                        "        <a class=\"card-body\" href=\"/node/details/" + value.node_id + "\">\n" +
                        "            <h5 class=\"card-category card-category-social text-right text-white\">\n" +
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
                        "            <h5 class=\"card-category card-category-social text-right text-white\">\n" +
                        "                <i class=\"far fa-times-circle\"></i> OFFLINE\n" +
                        "            </h5>\n" +
                        "            <h3 class=\"card-title mb-0\">\n" +
                        "                " + value.node_name + "\n" +
                        "            </h3>\n" +
                        "            <p class='text-white'>Node IP: " + value.node_ip + "</p>\n" +
                        "        </a\n" +
                        "    </div>\n" +
                        "</div>"
                    );
                } else if (value.node_status === "unknown") {
                    $('#nodePopulation').append(
                        "<div class=\"col-xl-3 col-lg-6 col-md-6 col-sm-6\">\n" +
                        "    <a class=\"card bg-info mt-0\">\n" +
                        "        <a class=\"card-body\" href=\"/node/details/" + value.node_id + "\">\n" +
                        "            <h5 class=\"card-category card-category-social text-right text-white\">\n" +
                        "                <i class=\"far fa-question-circle\"></i> UNKNOWN\n" +
                        "            </h5>\n" +
                        "            <h3 class=\"card-title mb-0\">\n" +
                        "                " + value.node_name + "\n" +
                        "            </h3>\n" +
                        "            <p class='text-white'>Node IP: " + value.node_ip + "</p>\n" +
                        "        </a>\n" +
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
