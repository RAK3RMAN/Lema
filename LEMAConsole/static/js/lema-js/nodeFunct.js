/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
LEMAConsole Front-End JS - Authored by: RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

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
            $.each(data, function (i, value) {
                let name_element;
                if (value.node_status === "online") {
                    name_element = "<i class=\"far fa-check-circle\" style=\"color: mediumseagreen;\"></i> " + value.node_name
                } else {
                    name_element = "<i class=\"far fa-times-circle\" style=\"color: Tomato;\"></i> " + value.node_name
                }
                $('#nodelist').append(
                    "<tr><td>" + name_element + "</td><td>" + value.node_ip + "</td><td>" + value.node_type + "</td></tr>",
                );
            });
        },
        error: function (data) {
            console.log(data);
            Swal.fire({
                title: 'Error with Retrieving Data',
                confirmButtonText: 'OK',
                type: 'error'
            })
        }
    });
    //Get list for NodePens
    $.ajax({
        type: "GET",
        url: "/api/nodepen/list",
        success: function (data) {
            $('#nodepenlist').empty();
            $.each(data, function (i, value) {
                let name_element;
                if (value.node_status === "pending") {
                    name_element = "<i class=\"fab fa-raspberry-pi\" style=\"color: orange;\"></i> " + value.node_hostname + "@" + value.node_ip
                } else {
                    name_element = "<i class=\"far fa-times-circle\" style=\"color: Tomato;\"></i> " + value.node_hostname + "@" + value.node_ip
                }
                $('#nodepenlist').append(
                    "<tr><td>" + name_element + "</td><td>" + value.node_id + "</td><td>" + value.created_date + "</td></tr>",
                );
            });
        },
        error: function (data) {
            console.log(data);
            Swal.fire({
                title: 'Error with Retrieving Data',
                confirmButtonText: 'OK',
                type: 'error'
            })
        }
    });
}