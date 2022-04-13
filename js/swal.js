function enterName() {
    Swal.fire({
        title: "Please enter your name:",
        text: "(Max. 8 letters)",
        input: 'text',
        showCancelButton: true
    }).then((result) => {
        if(result.value.length == 0){
            empty();
        }
        else if (result.value.length < 9) {
            alert(result.value);
            drawIt();
        }
        else {
            tooLong();
        }
    });
}
function tooLong() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The name was too long!',

    })
}
function empty() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You have to enter something!',

    })
}