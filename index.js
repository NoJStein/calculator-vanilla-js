
function init() {

    const screen = document.getElementById('screen');
    console.log(screen);

    const numberButtons = document.querySelectorAll('.button--num');
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (screen.innerHTML === "0") {
                if (button.dataset.value === "0") { return; }
                screen.innerHTML = button.dataset.value;
            } else {
                screen.innerHTML += button.dataset.value;
            }
        })
    })

    
    const operationButtons = document.querySelectorAll('.button--op:not(.button--equals)');
    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            screen.dataset.hold = screen.innerHTML;
            screen.dataset.state = "second";
            screen.dataset.operation = button.dataset.operation;
            screen.innerHTML = "0";
            //console.log(button.dataset.operation);
            console.log(screen.dataset);
        })
    })
    
    const equalsButton = document.querySelector('.button--equals');
    equalsButton.addEventListener('click', () => {
        if (screen.dataset.state === "first") { return; }
        
        console.log("Ans");

        let answer = 0;

        //console.log(screen.dataset.operation);

        switch (screen.dataset.operation) {
            case "plus":
                answer = `${parseInt(screen.dataset.hold) + parseInt(screen.innerHTML)}`;
                break;
        }
        
        // Update the screen with the new answer
        screen.innerHTML = answer;
        // Update the hold with the new answer
        screen.dataset.hold = answer;

    });


    const clearButton = document.querySelector('.button--clear');
    clearButton.addEventListener('click', () => {
        screen.dataset.hold = '0';
        screen.dataset.state = 'first';
        screen.innerHTML = '0';
        screen.dataset.operation = '';

        console.log(screen.dataset);
    })

}

document.addEventListener("DOMContentLoaded", init);
