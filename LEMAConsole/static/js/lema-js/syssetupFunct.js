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

//Setup SA
function setupSA() {
    Swal.mixin({
        confirmButtonText: 'Next &rarr;',
        showLoaderOnConfirm: false,
        showCancelButton: false,
        progressSteps: ['1', '2', '3', '4', '5', '6'],
        backdrop: 'rgb(0,0,0,0)',
    }).queue([
        {
            html:
                '<img src="/static/img/logo.png" alt="LEMA Console" width="50%">\n' +
                '<strong><h3>Welcome to LEMA Console</h3></strong>\n' +
                '<p>This setup wizard will help you configure LEMA Console properly upon the first startup. Click next below to begin.</p>\n'
        },
        {
            html:
                '<strong><h3><i class="fas fa-check-double"></i> Conducting System Check</h3></strong>\n' +
                '<p><i class="fas fa-check-circle text-success pr-2"></i>NPM Packages</p>\n' +
                '<p><i class="fas fa-check-circle text-success pr-2"></i>Setup Variable Check</p>\n' +
                '<p><i class="fas fa-check-circle text-success pr-2"></i>System Configuration Settings</p>\n' +
                '<p><i class="fas fa-check-circle text-success pr-2"></i>MongoDB Check</p>\n' +
                '<p><i class="fas fa-check-circle text-success pr-2"></i>Internet Access</p>\n'
        },
        {
            html:
                '<strong><h3>Create Admin User</h3></strong>\n' +
                '<p>This account will be the main administrative account. Please remember these user.</p>\n' +
                '<div class="input-group">\n' +
                '    <div class="input-group-prepend">\n' +
                '        <span class="input-group-text">\n' +
                '            <i class="material-icons">account_circle</i>\n' +
                '        </span>\n' +
                '    </div>\n' +
                '    <input type="text" class="form-control" placeholder="First Name" id="first_name">\n' +
                '    <input type="text" class="form-control" placeholder="Last Name" id="last_name">\n' +
                '</div>' +
                '<div class="input-group">\n' +
                '    <div class="input-group-prepend">\n' +
                '        <span class="input-group-text">\n' +
                '            <i class="material-icons">email</i>\n' +
                '        </span>\n' +
                '    </div>\n' +
                '    <input type="email" class="form-control" placeholder="Email" id="email">\n' +
                '</div>' +
                '<div class="input-group">\n' +
                '    <div class="input-group-prepend">\n' +
                '        <span class="input-group-text">\n' +
                '            <i class="material-icons">lock_outline</i>\n' +
                '        </span>\n' +
                '    </div>\n' +
                '    <input type="password" class="form-control" placeholder="Password" id="password">\n' +
                '</div>',
        },
        {
            html:
                '<strong><h3>Attach MongoDB</h3></strong>\n' +
                '<p>Please enter the Mongo DB url below to allow LEMA Console to save needed data. The url path should be accessible by the machine that is running LEMA Console. If a MongoDB is not yet setup on your network, please read the README to setup the database.</p>\n' +
                '<div class="input-group">\n' +
                '    <div class="input-group-prepend">\n' +
                '        <span class="input-group-text">\n' +
                '            <i class="material-icons">data_usage</i>\n' +
                '        </span>\n' +
                '    </div>\n' +
                '    <input type="text" class="form-control" placeholder="mongodb://[mongodbIP]:27017/[mongodbPATH]" id="mongodb">\n' +
                '</div>'
        },
        {
            html:
                '<strong><h3>LEMA Console Broadcast Port</h3></strong>\n' +
                '<p>Please enter the port at which you would like the LEMA Console to broadcast at. Ensure that LEMA Console has access to the specified port.</p>\n' +
                '<div class="input-group">\n' +
                '    <div class="input-group-prepend">\n' +
                '        <span class="input-group-text">\n' +
                '            <i class="material-icons">settings_ethernet</i>\n' +
                '        </span>\n' +
                '    </div>\n' +
                '    <input type="number" class="form-control" value="3000" id="port">\n' +
                '</div>'
        },
        {
            html:
                '<strong><h3>Verify Setup Values</h3></strong>\n' +
                '<h5>Please verify the details below. Click next to complete setup.</h5>\n' +
                '<p><strong>System Check:</strong> <i class="fas fa-check-circle text-success pl-2 pr-2"></i>Passed</p>' +
                '<p><strong>Admin Account:</strong> <br> Email: test@test.com <br> First Name: John <br> Last Name: Doe <br> Password: *******</p>' +
                '<p><strong>MongoDB URL:</strong> mongodb://test:23414/test</p>' +
                '<p><strong>Broadcast Port:</strong> 3000</p>'
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
                        title: 'Node was not created',
                        html: 'Parameters sent: <pre><code>' +
                            JSON.stringify(result.value) +
                            '</code></pre>',
                        confirmButtonText: 'OK',
                        type: 'error'
                    })
                }
            });
            setTimeout(function () {
                nodepenActivate(result.value[2]);
            }, 500);
        }
    });

}