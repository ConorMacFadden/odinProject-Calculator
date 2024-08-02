let num1 = null;
let num2 = null;
let operator = null;
let currentInput = 1;
let debug = true;
let justCalculated = false;
let prevResult = null;

const entryLine = document.querySelector('.entryLine');
const num1Field = document.querySelector('.num1');
const operatorField = document.querySelector('.operator');
const history = document.querySelector('.history');
const message = document.querySelector('.message');

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
        case '+':
            return add(Number(num1), Number(num2));
        case '-':
            return subtract(num1, num2);
        case '×':
            return multiply(num1, num2);
        case '/':
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
    message.textContent = "";
    switch(char) {
        case '+':
            setOperator('+');
            return;
        case '-':
            setOperator('-');
            return;
        case '*':
            setOperator('×');
            return;
        case '/':
            setOperator('/');
            return;
        case 'Clr':
            clear();
            return;
        case '=':
            evaluate();
            return;
    }

    // Not an operator so must be number or '.'
    parseNumber(char)
}

function setOperator(operation) {
    if (justCalculated) {
        justCalculated = false;
        num1 = prevResult;
        prevResult = null;
        num1Field.textContent = num1;
    }

    // Handle minus
    if (operation == '-') {
    // if entryLine is only '-' then clear the -, if empty then set to -.
        if (entryLine.textContent == '') {entryLine.textContent = '-'; return;}
        if (entryLine.textContent == '-') { 
            // If the operator is already - then remove the - from the input.
            if (operator == '-') {
                entryLine.textContent = ''; 
                return;
            } else {
                operator = operation;
                operatorField = operator;
            }
        }
    }

    if(!num1) {return;}

    // If we have 2 numbers and an operator then perform the operation.
    if (num1 && num2 && operator) {
        evaluate();
        num1 = prevResult;
        prevResult = null;
        justCalculated = false;
    }
    // if (prevResult) {num1 = prevResult; prevResult = null;}
    operator = operation;
    num1Field.textContent = num1;
    operatorField.textContent = operator;
    
    entryLine.textContent = "";
}

function evaluate() {
    // Verify that both numbers and the operator are not null
    if (!(num1 && num2 && operator)) { return;}
    if (operator == '/' && num2 == 0) {
        message.textContent = "Can't divide by 0.";
        num2 = null;
        entryLine.textContent = '';
        return;
    }
    let result = operate();
    entryLine.textContent = result;

    // Create a new history entry
    operationHistory = document.createElement('li');
    operationHistory.textContent = `${num1} ${operator} ${num2} = ${result}`;
    history.appendChild(operationHistory);
    if (history.childElementCount > 6) {
        history.removeChild(history.firstElementChild);
    }
    console.log(result);

    // Clear the input line
    num1Field.textContent = '';
    operatorField.textContent = '';
    num1 = null;
    num2 = null;
    operator = null;
    prevResult = result;
    justCalculated = true;
}

function parseNumber(char) {
    // check for decimal. If already decimal then don't allow another one.
    if (justCalculated) {
        num1 = prevResult;
        prevResult = null;
        entryLine.textContent = ''; 
        justCalculated = false;}
    message.textContent = "";
    if (entryLine.textContent.includes('.') && char == '.') {
        message.textContent = "Can't have more than one decimal in a number!";
        console.log("Can't have more than one decimal");
        return;
    }

    let currentString = entryLine.textContent;
    // currentInput == 1 ? currentString = num1 : currentString = num2;
    currentString == null? currentString = char: currentString += char;
    if (num1 == null || operator == null) {
        num1 = currentString
    } else {
        num2 = currentString
    }
    entryLine.textContent = currentString;
}

function clear() {
    // if already cleared then also clear history
    if (num1 == null && num2==null && operator==null){
        history.innerHTML = '';
    }
    num1 = null;
    num2 = null;
    operator = null;
    justCalculated = false;
    prevResult = null;
    entryLine.textContent = "";
    num1Field.textContent = "";
    operatorField.textContent = "";
}

document.addEventListener('keydown', (e) => {
    if (e.key == 'Backspace') {entryLine.textContent = entryLine.textContent.substring(0, entryLine.textContent.length -1);}
    let searchText = e.key;
    if (searchText == 'Enter') { searchText = '=';}
    if (searchText == 'Escape') { searchText = 'Clr';}
    keys = document.querySelectorAll('.key');
    let targetButton;
    keys.forEach(key => {if (key.textContent == searchText) { targetButton = key;}});
    if(targetButton){
        targetButton.click();
        e.preventDefault();
    }
    if (debug) {console.log(e);}
});

