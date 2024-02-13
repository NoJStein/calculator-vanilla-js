const LIMIT = 20;

function init() {

    const screen = document.getElementById('screen');
    console.log(screen);

    function limitCheck() {
        if (screen.innerHTML.toString().length > LIMIT) {
            console.log("overflow!")
            screen.innerHTML = screen.innerHTML.substring(0, LIMIT);
        }
    }

    function isDecimal(num) {
        return num.indexOf(".") !== -1;
    }

    const numberButtons = document.querySelectorAll('.button--num');
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (screen.innerHTML === "0") {
                if (button.dataset.value === "0") { return; }
                screen.innerHTML = button.dataset.value;
            } else {
                screen.innerHTML += button.dataset.value;
            }

            limitCheck();
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
            //console.log(screen.dataset);    //Test
        })
    })
    
    const equalsButton = document.querySelector('.button--equals');
    equalsButton.addEventListener('click', () => {
        if (screen.dataset.state === "first") { return; }
        
        console.log("Ans");     //Test

        let answer = 0;

        let parse = isDecimal(screen.dataset.hold) || isDecimal(screen.innerHTML) ? parseFloat : parseInt;

        switch (screen.dataset.operation) {
            case "plus":
                answer = `${parse(screen.dataset.hold) + parse(screen.innerHTML)}`;
                break;

            case "minus":
                answer = `${parse(screen.dataset.hold) - parse(screen.innerHTML)}`
                break;

            case "multiply":
                answer = `${parse(screen.dataset.hold) * parse(screen.innerHTML)}`
                break;

            case "divide":
                if (screen.innerHTML === '0') {
                    console.log("Attempted division by zero!");
                    break;
                } else {
                    answer = `${parseFloat(screen.dataset.hold) / parseFloat(screen.innerHTML)}`
                    break;
                }
            
        }

        // Update the screen with the new answer
        //rounding(answer);
        screen.innerHTML = rounding(answer);
        limitCheck();
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

/*
    const decimalButton = document.querySelector('.button--decimal');
    decimalButton.addEventListener('click', () => {
        console.log("STOP CLICKING ME!");   //Test
        for (i of screen.innerHTML) {
            console.log(i);
            if (i === '.') {return}
        }
        screen.innerHTML += decimalButton.dataset.value;
        
    })
*/


}



document.addEventListener("DOMContentLoaded", init);
