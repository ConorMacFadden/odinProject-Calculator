let num1;
let num2;
let operator;

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

function operate(num1, num2, operator) {
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
    newButton = document.createElement('div');
    newButton.classList.add('key');
    buttonFrame.appendChild(newButton);
}