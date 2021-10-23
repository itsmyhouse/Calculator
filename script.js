function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiplay(a, b) {
    return a * b;
}

function divide(a, b) {
    
    if ( b === 0) throw "division by 0";

    return a / b;
}

function operate(operator, a, b) {
    switch(operator) {
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "*":
            return multiplay(a, b);
        case "/":
            return divide(a, b);
        default:
            throw "invalid operator";
    }
}

/***
 *      EVENT LISTENER
 */

const keys = document.querySelectorAll(".box");
const input = document.querySelector("input");
input.value = "";
let answered = false;

for( let key of keys) {
    
     key.addEventListener("click", (event) => {

        let keyPressed = key.dataset.key;
        
        if(keyPressed === "=") {
            
            if(input.value.length === 0) {
                input.value = "ERROR";
            }
            // the equal sign is not preceded by an operation sign.
            else if(!input.value.slice(-1).match(/\d/)) {
                input.value = "ERROR";
            }
            // there must be at least two numbers and a sign operator between them
            else if(!input.value.match(/[^\d]/)) {
                input.value = "ERROR"; 
            }
            else if (input.value.search(/[\+-\/\*]/) === -1) {
                input.value = "ERROR"; 
            }
            else{
                input.value = calculate(input.value);
                answered = true;
            } 
        }
        else if (keyPressed === "C") {
            
            input.value = "";
        }
        else {
            if(input.value === "ERROR") input.value = "";
            // the first charachter must be a number
            if(input.value.length === 0) {
                if(!keyPressed.match(/\d/)) {
                    input.value = "ERROR";
                }
                else {
                    input.value = keyPressed;
                }
            }
            else {  
              // an operation sign is not preceded by another operation sign  
                if(!keyPressed.match(/\d/) && !input.value.slice(-1).match(/\d/)) {
                    input.value = "ERROR";
                }
                else {
                    if(answered){
                        answered = false;
                        input.value = "";
                    }
                    input.value += keyPressed;   
                }   
            }
        }
    } );
}

function calculate(value) {

    let endIndex = value.search(/[\+-\/\*]/);
    let answer = +value.slice(0, endIndex);
    value = value.slice(endIndex);
    let operator = "";

    
    while(true) { 

        operator = value.slice(0, 1); 
        endIndex = value.slice(1).search(/[\+-\/\*]/) + 1; 
        if(endIndex === 0) {
                num2 = +value.slice(1);                
        }
        else{
            num2 = +value.slice(1, endIndex);
        }
            
        try {
           answer = operate(operator, answer, num2); 
        }
        catch (ex) {
            return ex;
        }
        if(endIndex === 0) break;
        value = value.slice(endIndex);
        
    }

    return answer;
}