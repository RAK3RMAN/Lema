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
    if (password2 < 8 || password1 === password2 || email === "" || first_name === "" || last_name === "") {
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
        if (password1 === password2) {
            Toast.fire({
                type: 'error',
                title: 'Passwords do not match...'
            });
        }
        if (password2 < 8) {
            Toast.fire({
                type: 'error',
                title: 'Password is not long enough...'
            });
        }
        if (email === "" || first_name === "" || last_name === "") {
            Toast.fire({
                type: 'error',
                title: 'Values are missing...'
            });
        }
    }
}