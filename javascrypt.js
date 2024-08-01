let num1 = null;
let num2 = null;
let operator = null;
let currentInput = 1;

const entryLine = document.querySelector('.entryLine');

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y ) {
    return x * y;
}

function divide(x, y) {
    return x/y;
}

function operate() {
    switch(operator) {
        case 'add':
            return add(num1, num2);
        case 'subtract':
            return subtract(num1, num2);
        case 'multiply':
            return multiply(num1, num2);
        case 'divide':
            return divide(num1, num2);
    }
}

const buttons = [
   'Clr','/', '*', '-',
    '7', '8', '9', '+',
    '4', '5', '6', 'e',
    '1', '2', '3', '=',
    '0', 'e', '.', 'e'
]

const buttonFrame = document.querySelector('.buttonFrame');

buttons.forEach(element => createKey(element));

function createKey(keyText) {
    newButtonContainer = document.createElement('div')
    newButtonContainer.classList.add('keyContainer');

    if (keyText != 'e') { 
        newButton = document.createElement('button');
        newButton.classList.add('key');
        newButton.textContent = keyText;
        newButton.addEventListener("click",e => parseInput(e.target.textContent));
        if (keyText == '+' || keyText == '=') {
            newButton.style.height = '196%'
            newButton.style.marginBottom = '-98%';
            newButton.style.zIndex = '10;'
        }
        if (keyText == '0') {
            newButton.style.width = '196%';
            newButton.style.marginRight = '-98%';
            newButton.style.zIndex = '10;'
        }
        newButtonContainer.appendChild(newButton)
        
    }
    buttonFrame.appendChild(newButtonContainer);
}

function buttonClicked(butt) {
    console.log(butt);
}

function parseInput(char) {
    switch(char) {
        case '+':
            operator = 'add';
            return;
        case '-':
            operator = 'subtract';
            return;
        case '*':
            operator = 'multiply';
            return;
        case '/':
            operator = 'divide';
            return;
        case 'Clr':
            clear();
            return;
        case '=':
            evaluate();
    }

    // Not an operator so must be number or '.'
    parseNumber(char)
}

function evaluate() {
    // Verify that both numbers and the operator are not null

}

function parseNumber(char) {
    let currentString = entryLine.textContent;
    // currentInput == 1 ? currentString = num1 : currentString = num2;
    currentString == null? currentString = char: currentString += char;
    // check for decimal. If already decimal then don't allow another one.

    operator == null ? num1 = currentString : num2 = currentString
    entryLine.textContent = currentString;
}

function clear() {
    num1 = null;
    num2 = null;
    operator = null;
    entryLine.textContent = "";
}
