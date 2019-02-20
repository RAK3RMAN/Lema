//Node Add SA
function nodeAddSA() {
    Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
    }).queue([{
            title: 'Question 1',
            text: 'Chaining swal2 modals is easy'
        },
        'Question 2',
        'Question 3'
    ]).then((result) => {
        if (result.value) {
            Swal.fire({
                title: 'All done!',
                html: 'Your answers: <pre><code>' +
                    JSON.stringify(result.value) +
                    '</code></pre>',
                confirmButtonText: 'Lovely!'
            })
        }
    })
}