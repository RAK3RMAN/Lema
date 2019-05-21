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
                if (key.slice(3,5) % 2 === 0) {
                    pinoutTable.row.add([storedKey, storedValue, value, key]);
                } else {
                    storedKey = key;
                    storedValue = value;
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