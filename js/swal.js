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
        else if(result.value.toLowerCase()=="yourname"){
            original();
        }
        else if (result.value.length < 9) {
            yourName=result.value;
            if(regex(yourName))
                drawIt();
            else
                letetrsOnly();
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
function letetrsOnly() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You may enter letetrs only (in English alphabet)!',

    })
}
function empty() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You have to enter something!',

    })
}
function original() {
    Swal.fire({
        icon: 'error',
        title: 'Wow...',
        text: 'How original...',

    })
}
function about() {
    Swal.fire({
        title: 'ABOUT',
        icon: 'info',
        html:
          'Website created by Kristjan B., 2022<br/><br/> ' +
          'Music owned by Nintendo ',
        showCloseButton: true,
      })
}
function done(){
    document.getElementById("canvas").style.opacity = 0;
    document.getElementById("status").style.opacity = 0;
    Swal.fire({
        title: 'Game over!',
        confirmButtonText: 'Restart',
      }).then((result) => {
          
        window.location.reload(true);
      })
}
function won(){
    document.getElementById("canvas").style.opacity = 0;
    document.getElementById("status").style.opacity = 0;
    Swal.fire({
        title: 'Game won! Congrats!',
        confirmButtonText: 'Restart',
      }).then((result) => {
          
        window.location.reload(true);
      })
}

function regex(inputtxt){
    var letters = /^[A-Za-z]+$/;
    if(inputtxt.match(letters))
        return true;
    return false;
}