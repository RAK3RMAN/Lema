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

//Node Add SA
function nodeAddSA() {
    Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3'],
    }).queue([{
        title: 'Name of Device',
        text: 'Description'
    },
        {
            title: 'Device IP',
            text: 'Description'
        },
        {
            title: 'Device Type',
            text: 'Description',
            input: 'select',
            inputOptions: {
                'raspberryPi': 'Raspberry Pi',
            }
        }
    ]).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: "/api/node/create",
                data: {
                    node_name: result.value[0],
                    node_ip: result.value[1],
                    node_type: result.value[2]
                },
                success: function (data) {
                    Swal.fire({
                        title: 'Node Created',
                        html: 'Parameters sent: <pre><code>' +
                            JSON.stringify(result.value) +
                            '</code></pre>',
                        confirmButtonText: 'OK',
                        type: 'success'
                    });
                    nodeList();
                },
                error: function (data) {
                    if (data.status == 200) {
                        Swal.fire({
                            title: 'Node Created',
                            html: 'Parameters sent: <pre><code>' +
                                JSON.stringify(result.value) +
                                '</code></pre>',
                            confirmButtonText: 'OK',
                            type: 'success'
                        });
                        nodeList();
                    } else {
                        console.log(data);
                        Swal.fire({
                            title: 'Node was not created...',
                            html: 'Parameters sent: <pre><code>' +
                                JSON.stringify(result.value) +
                                '</code></pre>',
                            confirmButtonText: 'OK',
                            type: 'error'
                        })
                    }
                }
            });
        }
    })
}

//Node List
function nodeList() {
    //Get list for active Nodes
    $.ajax({
        type: "GET",
        url: "/api/node/list",
        success: function (data) {
            $('#nodelist').empty();
            $('#nodepenlist').empty();
            $.each(data, function (i, value) {
                //If node is active, append to active table
                if (value.node_status === "online" || value.node_status === "offline") {
                    let name_element;
                    if (value.node_status === "online") {
                        name_element = "<i class=\"far fa-check-circle\" style=\"color: mediumseagreen;\"></i> " + value.node_name + " | " + value.node_ip
                    } else {
                        name_element = "<i class=\"far fa-times-circle\" style=\"color: Tomato;\"></i> " + value.node_name + " | " + value.node_ip
                    }
                    $('#nodelist').append(
                        "<tr><td>" + name_element + "</td><td>" + value.node_id + "</td><td>" + value.node_type + "</td></tr>",
                    );
                }
                //If node is pending, append to nodePen table
                else if (value.node_status === "pending") {
                    let name_element = "<i class=\"fas fa-adjust\" style=\"color: orange;\"></i> " + value.node_name + " | " + value.node_ip;
                    $('#nodepenlist').append(
                        "<tr><td>" + name_element + "</td><td>" + value.node_id + "</td><td>" + value.created_date + "</td>" +
                        "<td class=\"td-actions text-right\">\n" +
                        "<button type=\"button\" rel=\"tooltip\" class=\"btn btn-info\" data-original-title=\"\" onclick=\"nodepenActivate('" + value.node_id + "')\" title=\"\">\n" +
                        "<i class=\"material-icons\">add</i> Activate\n" +
                        "<button type=\"button\" rel=\"tooltip\" class=\"btn btn-danger ml-2\" data-original-title=\"\" onclick=\"nodepenHide('" + value.node_id + "')\" title=\"\">\n" +
                        "<i class=\"material-icons\">close</i> Remove\n" +
                        "</td></tr>"
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
    //Get scan range
    $.ajax({
        type: "GET",
        url: "/api/node/scan_range",
        success: function (data) {
            document.getElementById("startRangeSent").innerHTML = data["rangeStart"];
            document.getElementById("endRangeSent").innerHTML = data["rangeEnd"];
            document.getElementById("startRange").placeholder = data["rangeStart"];
            document.getElementById("endRange").placeholder = data["rangeEnd"];
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

//Node Set Scan Range
function nodeSetRange() {
    let startRange = document.getElementById("startRange").value;
    let endRange = document.getElementById("endRange").value;
    console.log(startRange + endRange);
    $.ajax({
        type: "POST",
        url: "/api/node/scan_range",
        data: {
            start_range: startRange,
            end_range: endRange,
        },
        success: function (data) {
            Toast.fire({
                type: 'success',
                title: 'Scan settings updated!'
            });
        },
        error: function (data) {
            if (data.status == 200) {
                Toast.fire({
                    type: 'success',
                    title: 'Scan settings updated!'
                });
            } else {
                console.log(data);
                Toast.fire({
                    type: 'error',
                    title: 'Error in sending data...'
                });
            }
        }
    });
    nodeList();
}

//NodePen Activate Node
function nodepenActivate(nodeID) {
    console.log("Create: " + nodeID);
}

//NodePen Hide Node
function nodepenHide(nodeID) {
    console.log("Hide: " + nodeID);
}