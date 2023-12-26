// Variables
const numbers = document.querySelector('#numbers');
const operators = document.querySelector('#operators');

let total = 0;
let num1 = null;
let num2 = null;
let operator = null;

eventListeners()
function eventListeners() {
    numbers.addEventListener('click', addDigit)
    operators.addEventListener('click', addOperator)
}

function addDigit(e) {
    if (!e.target.classList.contains('number')) return
    if (operator === null) {
        num1 === null ? num1 = e.target.textContent : num1 += e.target.textContent
        console.log(num1)
    } else{
        num2 === null ? num2 = e.target.textContent : num2 += e.target.textContent
        console.log(num2);    
    }
}

function addOperator(e) {
    if (!e.target.classList.contains('operator')) return
    if (e.target.classList.contains('equals')) {
        resolve()
    } else {
        operator = e.target.dataset.id
        if (num2 !== null) {
            resolve()
        }
    }
}

function add(a, b) {
    return a + b
}

function substract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(a, operator, b) {
    if (operator === '+') return add(a, b)
    if (operator === '-') return substract(a, b)
    if (operator === '*') return multiply(a, b)
    if (operator === '/') return divide(a, b)
}

function resolve() {
    total = operate(parseInt(num1), operator, parseInt(num2));
    num1 = total;
    num2 = null;
    operator = '+';
    console.log(total)
}
