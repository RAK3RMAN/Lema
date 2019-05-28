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

//Update basic settings for user
function updateBasic(userID) {
    let email = document.getElementById('email').value;
    let first_name = document.getElementById('first_name').value;
    let last_name = document.getElementById('last_name').value;
    let password1 = document.getElementById('password1').value;
    let password2 = document.getElementById('password2').value;
    if (password1 === password2) {
        $.ajax({
            type: "POST",
            url: "/api/user/update",
            data: {
                _id: userID,
                email: email,
                first_name: first_name,
                last_name: last_name,
                password: password1
            },
            success: function (data) {
                location.reload();
            },
            error: function (data) {
                console.log(data);
                Toast.fire({
                    type: 'error',
                    title: 'Error in updating details...'
                });
            }
        });
    } else {
        Toast.fire({
            type: 'error',
            title: 'Passwords do not match...'
        });
    }
}