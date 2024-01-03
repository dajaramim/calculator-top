// Variables
const numbersHTML = document.querySelectorAll('.number');
const operatorsHTML = document.querySelectorAll('.operator');
const clearAllBtn = document.querySelector('#clearAll');
const deleteBtn = document.querySelector('#delete');
const ecuationText = document.querySelector('#ecuation-text'); 
const totalText = document.querySelector('#total-text'); 


const numbers = Array.from(numbersHTML);
const operators = Array.from(operatorsHTML);

let total = null;
let num1 = null;
let num2 = null;
let operator = null;

eventListeners()
function eventListeners() {
    numbers.forEach(number => {
        number.addEventListener('click', addDigit);
    });
    operators.forEach(operator => {
        operator.addEventListener('click', addOperator);
    })
    clearAllBtn.addEventListener('click', clearAll);
    deleteBtn.addEventListener('click', deleteDigit);
}

function addDigit(e) {
    if (!e.target.classList.contains('number')) return
    if (operator === null) {
        num1 === null ? num1 = e.target.dataset.id : num1 += e.target.dataset.id
        renderHTML()
    } else {
        num2 === null ? num2 = e.target.dataset.id : num2 += e.target.dataset.id
        renderHTML()
    }
}

function addOperator(e) {
    if (!e.target.classList.contains('operator') || num1 === null) return
    if (e.target.classList.contains('equals')) {
        resolve()
        renderHTML()
    }
    else {
        operator = e.target.dataset.id
        resolve()
        operator = e.target.dataset.id
        renderHTML()
    }
}
function renderHTML() {

    if (total !== null) {
        totalText.textContent = total;
        ecuationText.textContent = `${operator}`
        if (num2 !== null) {
            ecuationText.textContent += ` ${num2}`
        }
    } else if (num1 !== null) {
        ecuationText.textContent = `${num1}`;
        if (operator !== null) ecuationText.textContent += ` ${operator}`;
        if (num2 !== null) ecuationText.textContent += ` ${num2}`;
    } else {
        ecuationText.textContent = "0";
        totalText.textContent = "";
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
    if (num1 === null || num2 === null || operator === null) return
    total = operate(parseFloat(num1), operator, parseFloat(num2));
    num1 = total;
    num2 = null;
    operator = "+"
}
function clearAll() {
    total = null;
    num1 = null;
    num2 = null;
    operator = null;
    renderHTML()
}
function deleteDigit() {
    if (num1 === null) return;
    if (num1 !== null && num2 === null && operator === null) {
        num1 = parseFloat(num1.toString().slice(0, -1))
        renderHTML()
        if (isNaN(num1)) {
            num1 = null;
            renderHTML()
        }

    } else if (operator !== null && num2 === null) {
        operator = null;
        renderHTML()

    } else {
        num2 = num2.slice(0, -1);
        renderHTML()

    }
}