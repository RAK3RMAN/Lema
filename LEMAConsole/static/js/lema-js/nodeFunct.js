/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
LEMAConsole Front-End JS - Authored by: RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

//Node Add SA
function nodeAddSA() {
    Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
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
                url: "/node/create",
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
                    })
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
                        })
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