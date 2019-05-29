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
    $.ajax({
        type: "GET",
        url: "/api/sys_check",
        success: function (data) {
            //Parse system check results & create variables
            let email = "";
            let first_name = "";
            let last_name = "";
            let password = "";
            let mongodbURL = "";
            let port;
            let counter = 0;
            let checkResults = "";
            let checkControl = [true, false];
            let overallStatus = "<i class=\"fas fa-times-circle text-danger pl-2 pr-2\"></i>Failed";
            let checkArray = ["Overall Status", "NPM Packages", "Setup Variable Check", "System Configuration Settings", "MongoDB Check", "Internet Access"];
            $.each(data, function (key, value) {
                if (value === "passed") {
                    checkResults += "<p><i class=\"fas fa-check-circle text-success pr-2\"></i>" + checkArray[counter] + "</p>\n"
                    if (counter === 0) {
                        overallStatus = "<i class=\"fas fa-check-circle text-success pl-2 pr-2\"></i>Passed";
                        checkControl = [false, true];
                    }
                } else {
                    checkResults += "<p class=\"mb-0\"><i class=\"fas fa-times-circle text-danger pr-2\"></i>" + checkArray[counter] + "</p>\n"
                    checkResults += "<h6 class=\"pb-2\">" + value + "</h6>\n"
                }
                counter += 1;
            });
            Swal.fire({
                confirmButtonText: 'Next &rarr;',
                showCancelButton: false,
                allowOutsideClick: false,
                progressSteps: ['1', '2', '3', '4', '5', '6'],
                currentProgressStep: 0,
                backdrop: 'rgb(0,0,0,0)',
                html:
                    '<img src="/static/img/logo.png" alt="LEMA Console" width="50%">\n' +
                    '<strong><h3>Welcome to LEMA Console</h3></strong>\n' +
                    '<p>This setup wizard will help you configure LEMA Console properly upon the first startup. Click next below to begin.</p>\n'
            }).then((result) => {
                Swal.fire({
                    confirmButtonText: 'Next &rarr;',
                    cancelButtonText: 'Restart Setup',
                    showCancelButton: checkControl[0],
                    showConfirmButton: checkControl[1],
                    allowOutsideClick: false,
                    progressSteps: ['1', '2', '3', '4', '5', '6'],
                    currentProgressStep: 1,
                    backdrop: 'rgb(0,0,0,0)',
                    html:
                        '<strong><h3><i class="fas fa-check-double"></i> Conducting System Check</h3></strong>\n' + checkResults
                }).then((result) => {
                    if(result.dismiss === 'cancel'){
                        location.reload();
                    } else {
                        Swal.fire({
                            confirmButtonText: 'Next &rarr;',
                            showCancelButton: false,
                            allowOutsideClick: false,
                            progressSteps: ['1', '2', '3', '4', '5', '6'],
                            currentProgressStep: 2,
                            backdrop: 'rgb(0,0,0,0)',
                            html:
                                '<strong><h3>Create Admin User</h3></strong>\n' +
                                '<p>This account will be the main administrative account. Please remember these credentials.</p>\n' +
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
                            preConfirm: function () {
                                email = document.getElementById('email').value;
                                first_name = document.getElementById('first_name').value;
                                last_name = document.getElementById('last_name').value;
                                password = document.getElementById('password').value;
                            },
                        }).then((result) => {
                            Swal.fire({
                                confirmButtonText: 'Next &rarr;',
                                showCancelButton: false,
                                allowOutsideClick: false,
                                progressSteps: ['1', '2', '3', '4', '5', '6'],
                                currentProgressStep: 3,
                                backdrop: 'rgb(0,0,0,0)',
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
                                    '</div>',
                                preConfirm: function () {
                                    mongodbURL = document.getElementById('mongodb').value;
                                },
                            }).then((result) => {
                                Swal.fire({
                                    confirmButtonText: 'Next &rarr;',
                                    showCancelButton: false,
                                    allowOutsideClick: false,
                                    progressSteps: ['1', '2', '3', '4', '5', '6'],
                                    currentProgressStep: 4,
                                    backdrop: 'rgb(0,0,0,0)',
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
                                        '</div>',
                                    preConfirm: function () {
                                        port = document.getElementById('port').value;
                                    },
                                }).then((result) => {
                                    if (email === "" || first_name === "" || last_name === "" || password.length < 8 || mongodbURL === "" || port === undefined) {
                                        Swal.fire({
                                            cancelButtonText: 'Restart Setup',
                                            showCancelButton: true,
                                            showConfirmButton: false,
                                            allowOutsideClick: false,
                                            progressSteps: ['1', '2', '3', '4', '5', '6'],
                                            currentProgressStep: 5,
                                            backdrop: 'rgb(0,0,0,0)',
                                            html:
                                                '<strong><h3><i class=\"fas fa-times-circle text-danger\"></i> Error in Given Setup Values</h3></strong>\n' +
                                                '<h5>Please verify the details below. Please restart the setup process by clicking restart setup below.</h5>\n' +
                                                '<h5><u>Reasons for Data Failure:</u> System Check Failed, Admin User - Valid email not present, Admin User - Valid first name not present, Admin User - Valid last name not present, Admin User - Password is not present or over 8 characters, MongoDB URL is not present, or the broadcast port is not present.</h5>\n' +
                                                '<p><strong>System Check:</strong> ' + overallStatus + '</p>' +
                                                '<p><strong>Admin Account:</strong> <br> Email: ' + email + ' <br> First Name: ' + first_name + ' <br> Last Name: ' + last_name + ' <br> Password: ' + "*".repeat(password.length) + '</p>' +
                                                '<p><strong>MongoDB URL:</strong> ' + mongodbURL + '</p>' +
                                                '<p><strong>Broadcast Port:</strong> ' + port + '</p>'
                                        })
                                    } else {
                                        Swal.fire({
                                            confirmButtonText: 'Complete Setup',
                                            showCancelButton: false,
                                            allowOutsideClick: false,
                                            progressSteps: ['1', '2', '3', '4', '5', '6'],
                                            currentProgressStep: 5,
                                            backdrop: 'rgb(0,0,0,0)',
                                            html:
                                                '<strong><h3>Verify Setup Values</h3></strong>\n' +
                                                '<h5>Please verify the details below. Click the button below to complete setup.</h5>\n' +
                                                '<p><strong>System Check:</strong> ' + overallStatus + '</p>' +
                                                '<p><strong>Admin Account:</strong> <br> Email: ' + email + ' <br> First Name: ' + first_name + ' <br> Last Name: ' + last_name + ' <br> Password: ' + "*".repeat(password.length) + '</p>' +
                                                '<p><strong>MongoDB URL:</strong> ' + mongodbURL + '</p>' +
                                                '<p><strong>Broadcast Port:</strong> ' + port + '</p>'
                                        }).then((result) => {
                                            $.ajax({
                                                type: "POST",
                                                url: "/api/sys_setup",
                                                data: {
                                                    email: email,
                                                    password: password,
                                                    mongodb_url: mongodbURL,
                                                    console_port: port,
                                                    first_name: first_name,
                                                    last_name: last_name
                                                },
                                                success: function (data) {
                                                    $.ajax({
                                                        type: "POST",
                                                        url: "/login",
                                                        data: {
                                                            email: email,
                                                            password: password
                                                        },
                                                        success: function (data) {
                                                            window.open("/");
                                                        },
                                                        error: function (data) {
                                                            console.log(data);
                                                            Toast.fire({
                                                                type: 'error',
                                                                title: 'Error in sending request...'
                                                            });
                                                        }
                                                    });
                                                },
                                                error: function (data) {
                                                    console.log(data);
                                                    Toast.fire({
                                                        type: 'error',
                                                        title: 'Error in sending request...'
                                                    });
                                                }
                                            });
                                        });
                                    }
                                });
                            });
                        });
                    }
                });
            });
        },
        error: function (data) {
            console.log(data);
            Swal.fire({
                title: 'Cannot reach LEMA Console',
                text: 'System Check API Failed: Please check configuration and the command line interface used for setup',
                confirmButtonText: 'OK',
                type: 'error'
            })
        }
    })
    ;
}