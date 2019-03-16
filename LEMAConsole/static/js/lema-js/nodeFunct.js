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
let hiddenCount = 0;

//Node List
function nodeList() {
    //Get list for active Nodes
    $.ajax({
        type: "GET",
        url: "/api/node/details/all",
        success: function (data) {
            $('#nodelist').empty();
            $('#nodepenlist').empty();
            $('#nodehidden').empty();
            let activeCount = 0;
            let pendingCount = 0;
            hiddenCount = 0;
            $.each(data, function (i, value) {
                //If node is active, append to active table
                if (value.node_status === "online" || value.node_status === "offline" || value.node_status === "unknown") {
                    let name_element;
                    let nodeArch = "";
                    if (value.node_type === "raspberryPi") {
                        nodeArch = "  <i class=\"fab fa-raspberry-pi\" style=\"color: darkgrey;\"></i>";
                    }
                    if (value.node_status === "online") {
                        name_element = "<i class=\"far fa-check-circle\" style=\"color: mediumseagreen;\"></i> " + value.node_name + "  " + nodeArch
                    } else if (value.node_status === "offline") {
                        name_element = "<i class=\"far fa-times-circle\" style=\"color: Tomato;\"></i> " + value.node_name + "  " + nodeArch
                    } else {
                        name_element = "<i class=\"far fa-question-circle\" style=\"color: dodgerblue;\"></i> " + value.node_name + "  " + nodeArch
                    }
                    $('#nodelist').append(
                        "<tr><td>" + name_element + "</td><td>" + value.node_ip + "</td><td>" + value.node_id + "</td>" +
                        "<td class=\"td-actions text-right\">\n" +
                        "<button type=\"button\" rel=\"tooltip\" class=\"btn btn-info\" data-original-title=\"\" onclick=\"nodeEdit('" + value.node_id + "')\" title=\"\">\n" +
                        "<i class=\"fas fa-edit\"></i> Edit\n" +
                        "<button type=\"button\" rel=\"tooltip\" class=\"btn btn-danger ml-2\" data-original-title=\"\" onclick=\"nodeRelease('" + value.node_id + "')\" title=\"\">\n" +
                        "<i class=\"fas fa-times-circle\"></i> Release\n" +
                        "</td></tr>"
                    );
                    activeCount += 1;
                }
                //If node is pending, append to nodePen table
                else if (value.node_status === "pending") {
                    let name_element = "<i class=\"fas fa-adjust\" style=\"color: orange;\"></i> " + value.node_name + " | " + value.node_ip;
                    $('#nodepenlist').append(
                        "<tr><td>" + name_element + "</td><td>" + value.node_id + "</td><td>" + value.created_date + "(UTC)</td>" +
                        "<td class=\"td-actions text-right\">\n" +
                        "<button type=\"button\" rel=\"tooltip\" class=\"btn btn-info\" data-original-title=\"\" onclick=\"nodepenActivate('" + value.node_id + "')\" title=\"\">\n" +
                        "<i class=\"material-icons\">add</i> Activate\n" +
                        "<button type=\"button\" rel=\"tooltip\" class=\"btn btn-danger ml-2\" data-original-title=\"\" onclick=\"nodepenHide('" + value.node_id + "')\" title=\"\">\n" +
                        "<i class=\"material-icons\">move_to_inbox</i> Hide\n" +
                        "</td></tr>"
                    );
                    pendingCount += 1;
                } else {
                    let name_element = "<i class=\"fas fa-ban\" style=\"color: grey;\"></i> " + value.node_name + " | " + value.node_ip;
                    $('#nodehidden').append(
                        "<tr><td>" + name_element + "</td><td>" + value.node_id + "</td><td>" + value.created_date + "(UTC)</td>" +
                        "<td class=\"td-actions text-right\">\n" +
                        "<button type=\"button\" rel=\"tooltip\" class=\"btn btn-info\" data-original-title=\"\" onclick=\"nodepenActivate('" + value.node_id + "')\" title=\"\">\n" +
                        "<i class=\"material-icons\">add</i> Activate\n" +
                        "</td></tr>"
                    );
                    hiddenCount += 1;
                }
            });
            document.getElementById("activeCount").innerHTML = activeCount;
            //document.getElementById("pendingCount").innerHTML = pendingCount;
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

//NodePen Activate Node
function nodepenActivate(nodeID) {
    //TODO Add LEMAgent callback for activation
    console.log("NODE Discovery: Activating Node: " + nodeID);
    $.ajax({
        type: "POST",
        url: "/api/node/setup",
        data: {
            node_id: nodeID,
        },
        success: function (data) {
            Toast.fire({
                type: 'success',
                title: 'Node Activated!'
            });
            setTimeout(function(){
                nodeList();
            }, 500);
        },
        error: function (data) {
            console.log(data);
            Toast.fire({
                type: 'error',
                title: 'Error in node setup...'
            });
        }
    });
}

//NodePen Hide Node
function nodepenHide(nodeID) {
    console.log("NODE Discovery: Hiding Node: " + nodeID);
    $.ajax({
        type: "POST",
        url: "/api/node/hide",
        data: {
            node_id: nodeID,
        },
        success: function (data) {
            Toast.fire({
                type: 'success',
                title: 'Node is now hidden!'
            });
            setTimeout(function(){
                nodeList();
            }, 500);
        },
        error: function (data) {
            console.log(data);
            Toast.fire({
                type: 'error',
                title: 'Error in hiding node...'
            });
        }
    });
}

//Node Add SA
function nodeAddSA() {
    Swal.mixin({
        confirmButtonText: 'Next &rarr;',
        showLoaderOnConfirm: true,
        showCancelButton: true,
        progressSteps: ['1', '2', '3', '4', '5'],
    }).queue([
        {
            title: 'Manually Add Node',
            text: 'Please ensure that the target node is not already in the pending or hidden node list',
            type: 'info'
        },
        {
            title: 'Device Name',
            text: 'Enter the name of the device',
            input: 'text'
        },
        {
            title: 'Device IP',
            text: 'IP of the device that is reachable by LEMAConsole',
            input: 'text'
        },
        {
            title: 'Device ID',
            text: 'ID of device given after setup in console',
            input: 'text'
        },
        {
            title: 'Device Type',
            text: 'Type of device',
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
                    node_name: result.value[1],
                    node_ip: result.value[2],
                    node_id: result.value[3],
                    node_type: result.value[4]
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
            });
            setTimeout(function(){
                nodepenActivate(result.value[2]);
            }, 500);
        }
    })
}

//Node Edit SA
function nodeEdit(nodeID) {
    $.ajax({
        type: "GET",
        url: "/api/node/details",
        data: {
            node_id: nodeID,
        },
        success: function (data) {
            Swal.fire({
                title: 'Edit Node: ' + data[0]["node_name"],
                text: 'ID: ' + nodeID,
                html:
                    '<div class="row">\n' +
                    '   <label class="col-sm-3 col-form-label text-left pb-0">Node ID</label>\n' +
                    '   <div class="col-sm-9">\n' +
                    '       <div class="form-group has-default bmd-form-group">\n' +
                    '           <input type="text" class="form-control" disabled value="' + nodeID + '">\n' +
                    '       </div>\n' +
                    '   </div>\n' +
                    '</div>' +
                    '<div class="row">\n' +
                    '   <label class="col-sm-3 col-form-label text-left pb-0">Node Name</label>\n' +
                    '   <div class="col-sm-9">\n' +
                    '       <div class="form-group has-default bmd-form-group">\n' +
                    '           <input type="text" class="form-control" value="' + data[0]["node_name"] + '" id="editName">\n' +
                    '       </div>\n' +
                    '   </div>\n' +
                    '</div>' +
                    '<div class="row">\n' +
                    '   <label class="col-sm-3 col-form-label text-left pb-0">Node IP</label>\n' +
                    '   <div class="col-sm-9">\n' +
                    '       <div class="form-group has-default bmd-form-group">\n' +
                    '           <input type="text" class="form-control" value="' + data[0]["node_ip"] + '" id="editIP">\n' +
                    '       </div>\n' +
                    '   </div>\n' +
                    '</div>',
                showCancelButton: true,
                confirmButtonText: 'Update',
            }).then(() => {
                let nodeIP = document.getElementById("editIP").value;
                let nodeName = document.getElementById("editName").value;
                $.ajax({
                    type: "POST",
                    url: "/api/node/edit",
                    data: {
                        node_name: nodeName,
                        node_ip: nodeIP,
                        node_id: nodeID,
                    },
                    success: function (data) {
                        Toast.fire({
                            type: 'success',
                            title: 'Node has been updated'
                        });
                        setTimeout(function(){
                            nodeList();
                        }, 500);
                    },
                    error: function (data) {
                        console.log(data);
                        Toast.fire({
                            type: 'error',
                            title: 'Error in updating node...'
                        });
                    }
                });
            })
        },
        error: function (data) {
            console.log(data);
            Toast.fire({
                type: 'error',
                title: 'Error in requesting data...'
            });
        }
    });
}

//Node Release SA
function nodeRelease(nodeID) {
    console.log("NODE Discovery: Releasing Node: " + nodeID);
    Swal.fire({
        title: 'Are you sure?',
        text: "This node will be released from LEMAConsole",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, release it!'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: "/api/node/hide",
                data: {
                    node_id: nodeID,
                },
                success: function (data) {
                    Toast.fire({
                        type: 'success',
                        title: 'Node is now hidden!'
                    });
                    setTimeout(function(){
                        nodeList();
                    }, 500);
                },
                error: function (data) {
                    console.log(data);
                    Toast.fire({
                        type: 'error',
                        title: 'Error in hiding node...'
                    });
                }
            });
        }
    })
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
            console.log(data);
            Toast.fire({
                type: 'error',
                title: 'Error in sending data...'
            });
        }
    });
    nodeList();
}

//Show/Hide Hidden Nodes Table
let tablestat = 0;
function toggleHidden() {
    let basecode = "<div class=\"card\">\n" +
        "   <div class=\"card-header card-header-tabs card-header-primary\">\n" +
        "       <div class=\"nav-tabs-navigation\">\n" +
        "           <div class=\"nav-tabs-wrapper\">\n" +
        "               <span class=\"nav-tabs-title p-0\">\n" +
        "                   <h4 class=\"card-title\"><strong>Hidden Nodes</strong></h4>\n" +
        "                   <p class=\"card-category\">Number of Hidden Nodes: <strong><span id=\"hiddenCount\"></span></strong></p>\n" +
        "               </span>\n" +
        "           </div>\n" +
        "       </div>\n" +
        "    </div>\n" +
        "    <div class=\"card-body table-responsive\">\n" +
        "       <table class=\"table table-hover\">\n" +
        "           <thead class=\"text-muted\">\n" +
        "               <th>Hostname/IP</th>\n" +
        "               <th>Node ID</th>\n" +
        "               <th>Acquisition Date</th>\n" +
        "               <th>Tools</th>\n" +
        "           </thead>\n" +
        "           <tbody id=\"nodehidden\"></tbody>\n" +
        "       </table>\n" +
        "    </div>\n" +
        "</div>";
    if (tablestat === 0) {
        $('#hiddenTable').append(
            basecode
        );
        $('#hiddenButton').empty();
        $('#hiddenButton').append(
            "<button class=\"btn btn-muted btn-round\" onclick=\"toggleHidden()\"><i class=\"fas fa-eye-slash\"></i> Hide Hidden Nodes\n" +
            "   <div class=\"ripple-container\"></div>\n" +
            "</button>"
        );
        nodeList();
        tablestat = 1;
    } else {
        $('#hiddenTable').empty();
        $('#hiddenButton').empty();
        $('#hiddenButton').append(
            "<button class=\"btn btn-muted btn-round\" onclick=\"toggleHidden()\"><i class=\"far fa-eye\"></i> Show Hidden Nodes\n" +
            "   <div class=\"ripple-container\"></div>\n" +
            "</button>"
        );
        tablestat = 0;
        nodeList();
    }
    document.getElementById("hiddenCount").innerHTML = hiddenCount;
}
