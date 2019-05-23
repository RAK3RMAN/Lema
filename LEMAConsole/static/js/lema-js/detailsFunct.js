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

//Set Table Settings
let tableSettings = {
    columnDefs: [
        {
            targets: [1, 3],
            className: 'text-right'
        }
    ],
    "responsive": true,
    "searching": false,
    "lengthChange": false,
    "bPaginate": false,
    "bInfo": false,
    "bSort": false,
};
let pinoutTable = $('#pinoutTable').DataTable(tableSettings);

//Pinout List
function pinoutList(nodeID) {
    pinoutTable.clear();
    $.ajax({
        type: "GET",
        url: "/api/node/details",
        data: {
            node_id: nodeID,
        },
        success: function (data) {
            //Populate Pinout Table
            let storedKey;
            let storedValue;
            $.each(data[0].pin_config, function (key, value) {
                let formatKey = 'Pin #' + key.slice(3,5);
                let formatValueL = value;
                let formatValueR = value;
                if (value.slice(0,3) ===  "NA/") {
                    let NAStatus = value.substring(3);
                    if (NAStatus === "3.3V") {
                        if (key === "pin01") {
                            formatValueL = NAStatus + "<i class=\"fas fa-stop-circle pl-1\" style=\"color: darkorange\"></i>";
                            formatValueR = "<i class=\"fas fa-stop-circle pr-1\" style=\"color: darkorange\"></i>" + NAStatus;
                        } else {
                            formatValueL = NAStatus + "<i class=\"fas fa-dot-circle pl-1\" style=\"color: darkorange\"></i>";
                            formatValueR = "<i class=\"fas fa-dot-circle pr-1\" style=\"color: darkorange\"></i>" + NAStatus;
                        }
                    } else if (NAStatus === "5V") {
                        formatValueL = NAStatus + "<i class=\"fas fa-dot-circle pl-1\" style=\"color: orangered\"></i>";
                        formatValueR = "<i class=\"fas fa-dot-circle pr-1\" style=\"color: orangered\"></i>" + NAStatus;
                    } else if (NAStatus === "GND") {
                        formatValueL = NAStatus + "<i class=\"fas fa-dot-circle pl-1\" style=\"color: black\"></i>";
                        formatValueR = "<i class=\"fas fa-dot-circle pr-1\" style=\"color: black\"></i>" + NAStatus;
                    } else {
                        formatValueL = NAStatus + "<i class=\"fas fa-dot-circle pl-1\" style=\"color: grey\"></i>";
                        formatValueR = "<i class=\"fas fa-dot-circle pr-1\" style=\"color: grey\"></i>" + NAStatus;
                    }
                } else {
                    //Append Pin Mode
                    let pinMode;
                    if (value.slice(0,6) === "D-IN--") {
                        pinMode = "D IN";
                    } else if (value.slice(0,6) === "D-OUT-") {
                        pinMode = "D OUT";
                    } else {
                        pinMode = "UNDEFINED"
                    }
                    //Append Status
                    if (value.slice(6,7) === "1") {
                        formatValueL = value.slice(6,7) + " | " + pinMode + "<i class=\"fas fa-dot-circle pl-1\" style=\"color: #4caf50\"></i>";
                        formatValueR = "<i class=\"fas fa-dot-circle pr-1\" style=\"color: #4caf50\"></i>" + pinMode + " | " + value.slice(6,7);
                    } else if (value.slice(6,7) === "0") {
                        formatValueL = value.slice(6,7) + " | " + pinMode + "<i class=\"fas fa-dot-circle pl-1\" style=\"color: #f44336\"></i>";
                        formatValueR = "<i class=\"fas fa-dot-circle pr-1\" style=\"color: #f44336\"></i>" + pinMode + " | " + value.slice(6,7);
                    } else {
                        formatValueL = value.slice(6,7) + " | " + pinMode + "<i class=\"fas fa-dot-circle pl-1\" style=\"color: #00bcd4\"></i>";
                        formatValueR = "<i class=\"fas fa-dot-circle pr-1\" style=\"color: #00bcd4\"></i>" + pinMode + " | " + value.slice(6,7);
                    }
                }
                if (key.slice(3,5) % 2 === 0) {
                    pinoutTable.row.add([storedKey, storedValue, formatValueR, formatKey]);
                } else {
                    storedKey = formatKey;
                    storedValue = formatValueL;
                }
            });
            pinoutTable.draw();
            //Populate Node Details
            let name_element;
            if (data[0].node_type === "raspberryPi") {
                if (data[0].node_status === "online") {
                    name_element = "<a class='btn btn-white p-1 m-0'><i class=\"fab fa-raspberry-pi\" style=\"color: mediumseagreen;\"></i></a> " + data[0].node_name
                } else if (data[0].node_status === "offline") {
                    name_element = "<a class='btn btn-white p-1 m-0'><i class=\"fab fa-raspberry-pi\" style=\"color: Tomato;\"></i></a> " + data[0].node_name
                } else {
                    name_element = "<a class='btn btn-white p-1 m-0'><i class=\"fab fa-raspberry-pi\" style=\"color: dodgerblue;\"></i></a> " + data[0].node_name
                }
            }
            document.getElementById("node_name").innerHTML = name_element;
            document.getElementById("node_details").innerHTML = "IP Address: " + data[0].node_ip + " | NodeID: " + data[0].node_id;
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