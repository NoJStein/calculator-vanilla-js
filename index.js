
const LIMIT = 20;

const state = { 
    current: 0,
    hold: 0,
    isFloat: false,
    convertFloatFlag: false,
    state: "first",
    operation: ''
};

function init() {

    const screen = document.getElementById('screen');
    console.log(screen);

    function limitCheck() {
        if (state.current.toString().length > LIMIT) {
            console.log("overflow!")
            state.current = parseInt(state.current.toString().substring(0, LIMIT));
            screen.innerHTML = state.current;
        }
    }
    
    const numberButtons = document.querySelectorAll('.button--num');
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            let newCurrent;

            // If we have a int and the user presses the decimal point,
            // prepare the state to become a float the next time they
            // click a number
            if (!state.isFloat && button.dataset.value === '.') {
                state.isFloat = true;
                state.convertFloatFlag = true;
                screen.innerHTML = `${state.current}.`;
                console.log(state);
                return;
            }

            if (state.convertFloatFlag) {
                // Do not allow the user to press the decimal point multiple times
                if (button.dataset.value === '.') {
                    return;
                 }
                
                // Update the current state to be a decimal and unset the flag
                newCurrent = parseFloat(`${state.current}.${button.dataset.value}`);
                state.convertFloatFlag = false;
                state.current = newCurrent;
                screen.innerHTML = state.current;
                console.log(state);
                limitCheck();
                return;
            }

            if (state.current === 0) {
                if (button.dataset.value === "0") { return; }
                state.current = parseInt(button.dataset.value);
            } else {
                //let parse = // whatever we need
                let parse = state.isFloat ? parseFloat : parseInt;
                state.current = parse(`${state.current}${button.dataset.value}`);
            }
            screen.innerHTML = state.current;
            limitCheck();
        })
    })

    
    const operationButtons = document.querySelectorAll('.button--op:not(.button--equals)');
    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            state.hold = state.current;
            state.state = "second";
            state.operation = button.dataset.operation;
            state.current = 0;
            screen.innerHTML = state.current;       //DOM refresh
        })
    })
    
    const equalsButton = document.querySelector('.button--equals');
    equalsButton.addEventListener('click', () => {
        if (state.state === "first") { return; }
        
        console.log(state);     //Test

        let answer = 0;

        switch (state.operation) {
            case "plus":
                answer = state.hold + state.current;
                break;

            case "minus":
                answer = state.hold - state.current;
                break;

            case "multiply":
                answer = state.hold * state.current;
                break;

            case "divide":
                if (state.current === 0) {
                    console.log("Attempted division by zero!");
                    break;
                } else {
                    answer = state.hold / state.current;
                    break;
                }
            
        }      

        // Update the screen with the new answer
        //rounding(answer);
        state.current = answer;
        screen.innerHTML = state.current;
        limitCheck();
        // Update the hold with the new answer
        state.hold = state.current;
        

    });


    const clearButton = document.querySelector('.button--clear');
    clearButton.addEventListener('click', () => {
        state.hold = 0;
        state.state = 'first';
        state.current = 0;
        state.operation = '';
        state.isFloat = false;
        state.convertFloatFlag = false;
        screen.innerHTML = state.current;
    })

}



document.addEventListener("DOMContentLoaded", init);
