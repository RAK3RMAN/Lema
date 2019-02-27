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
    $.ajax({
        type: "GET",
        url: "/api/node/list",
        success: function (data) {
            $('#nodelist').empty();
            $.each(data, function (i, value) {
                $('#nodelist').append(
                    "<tr><td>" + value.node_name + "</td><td>" + value.node_ip + "</td><td>" + value.node_type + "</td></tr>",
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