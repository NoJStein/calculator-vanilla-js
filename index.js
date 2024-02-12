
function init() {

    const screen = document.getElementById('screen');
    console.log(screen);

    function limitCheck() {
        //console.log(screen.innerHTML.toString().length);    //Test

        let limit = 20;

        if (screen.innerHTML.toString().length > limit) {
            console.log("overflow!")
            screen.innerHTML = screen.innerHTML.substring(0, limit);
        }
    }

    function isDecimal(num) {
        for (i of num) {
            if (i === '.') {return true}
        }
        return false;
    }

    function rounding(num) {
        let zeroCount = 0;
        let wasNine = false;

        console.log("29 The number to round is ", num);        //Test

        if (isDecimal(num)) {
            console.log("32 Decimal Here")     //Test

            for (let i = num.length - 1; i > -1; i--) {
                console.log("35 current num = ", num[i]);      //Test
                //console.log("36 zeroCount = ", zeroCount);     //Test

                /*
                                if (num[i] !== '0' && zeroCount > 1) {
                    console.log("39 trimming")
                    zeroCount = 0;
                    num = num.substring(0, (i + 1));
                    console.log(num);       //Test
                } else if (num[i] === '0') {
                    console.log("44 num[i] = ", num[i]);        //Test
                    console.log("45 zeroCount = ", zeroCount);     //Test
                    zeroCount++;
                }
                */

                 /* else if (wasNine) {
                    console.log("55 wasNine = ", wasNine);      //Test
                    console.log("56 num[i] = ", num[i]);        //Test
                    //let temp = parseInt(num[i]);
                    //temp++;
                    let charCode = num.charCodeAt(i);
                    charCode += 1;
                    let incrementedChar = String.fromCharCode(charCode);
                    console.log(incrementedChar);       //Test


                    console.log("58 num[i] = ", num[i]);        //Test
                    wasNine = false;
                }
                */

            }
        }

        console.log("final number is ", num);       //Test

        return num;
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

        if (isDecimal(screen.dataset.hold) || isDecimal(screen.innerHTML)) {
            switch (screen.dataset.operation) {
                case "plus":
                    answer = `${parseFloat(screen.dataset.hold) + parseFloat(screen.innerHTML)}`;
                    break;
    
                case "minus":
                    answer = `${parseFloat(screen.dataset.hold) - parseFloat(screen.innerHTML)}`;
                    break;
                
                case "multiply":
                    answer = `${parseFloat(screen.dataset.hold) * parseFloat(screen.innerHTML)}`;
                    break;
            }
        } else {
            switch (screen.dataset.operation) {
                case "plus":
                    answer = `${parseInt(screen.dataset.hold) + parseInt(screen.innerHTML)}`;
                    break;
    
                case "minus":
                    answer = `${parseInt(screen.dataset.hold) - parseInt(screen.innerHTML)}`;
                    break;
                
                case "multiply":
                    answer = `${parseInt(screen.dataset.hold) * parseInt(screen.innerHTML)}`;
                    break;
            }
        }

        switch (screen.dataset.operation) {
            case "divide":
                if (screen.innerHTML === '0') {
                    //answer = 'ERROR';
                    console.log("Attempted division by zero!");
                    break;
                } else {
                    answer = `${parseFloat(screen.dataset.hold) / parseFloat(screen.innerHTML)}`;
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
