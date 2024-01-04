// Variables
const numbersHTML = document.querySelectorAll('.number');
const operatorsHTML = document.querySelectorAll('.operator');
const clearAllBtn = document.querySelector('#clearAll');
const deleteBtn = document.querySelector('#delete');
const ecuationText = document.querySelector('#ecuation-text');

const numbers = Array.from(numbersHTML);
const operators = Array.from(operatorsHTML);

let num1 = '';
let num2 = '';
let operator = '';

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
    let number;
    if (e.target.parentNode.classList.contains('number')) {
        number = e.target.parentNode.dataset.id;
    } else {
        number = e.target.dataset.id;
    }
    if (operator === '' || operator === '') {
        num1 === '' ? num1 = number : num1 += number
        renderHTML()
    } else {
        num2 === '' ? num2 = number : num2 += number
        renderHTML()
    }
}

function addOperator(e) {
    if (num1 === '') return;
    if (e.target.parentNode.classList.contains('equals') || e.target.classList.contains('equals')) {
        resolve()
        operator = ''
        renderHTML()
    }
    else {
        resolve()
        operator = e.target.parentNode.classList.contains('operator') ? e.target.parentNode.dataset.id : e.target.dataset.id;
        renderHTML()
    }
}
function renderHTML() {
    if (num1 !== '') {
        ecuationText.textContent = `${num1}`;
        if (operator !== '') ecuationText.textContent += ` ${operator}`;
        if (num2 !== '') ecuationText.textContent += ` ${num2}`;
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
    if (num1 === '' || num2 === '' || operator === '') return
    if (operator === '/' && num2 === '0') return
    num1 = operate(parseFloat(num1), operator, parseFloat(num2));
    num2 = '';
}
function clearAll() {
    num1 = '';
    num2 = '';
    operator = '';
    renderHTML()
}
function deleteDigit() {
    if (num1 === '') return;
    if (num1 !== '' && num2 === '' && operator === '') {
        num1 = parseFloat(num1.toString().slice(0, -1))
        renderHTML()
        if (isNaN(num1)) {
            num1 = '';
            renderHTML()
        }

    } else if (operator !== '' && num2 === '') {
        operator = '';
        renderHTML()

    } else {
        num2 = num2.slice(0, -1);
        renderHTML()

    }
}