// Variables
const numbersHTML = document.querySelectorAll('.number');
const operatorsHTML = document.querySelectorAll('.operator');
const clearAllBtn = document.querySelector('#clearAll');
const deleteBtn = document.querySelector('#delete');
const ecuationText = document.querySelector('#ecuation-text');
const dotBtn = document.querySelector('#dot-btn');

const numbers = Array.from(numbersHTML);
const operators = Array.from(operatorsHTML);
const divideSymbol = String.fromCharCode(247);

let num1 = '0';
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
    let numberSelected;
    numberSelected = e.target.parentNode.classList.contains('number') ? e.target.parentNode.dataset.id : e.target.dataset.id;
    if (num1.includes('.') && numberSelected === '.' && num2 === '') return
    if (num2.includes('.') && numberSelected === '.') return

    if (operator === '') {
        num1 === '0' && numberSelected !== '.' ? num1 = numberSelected : num1 += numberSelected
        renderHTML()
    } else {
        num2 === '' ? num2 = numberSelected : num2 += numberSelected
        renderHTML()
    }
}

function addOperator(e) {
    if (num1 === '0') return;
    if (e.target.parentNode.classList.contains('equals') || e.target.classList.contains('equals')) {
        resolve()
        operator = ''
        renderHTML()
    }
    else {
        resolve()
        operator = e.target.parentNode.classList.contains('operator') ? e.target.parentNode.dataset.id : e.target.dataset.id;
        console.log(operator)
        renderHTML()
    }
}
function renderHTML() {
    if (num1 !== 0) {
        ecuationText.textContent = `${num1}`;
        if (operator !== '') {
            ecuationText.textContent += operator === '/' ? ` ${divideSymbol}` : ` ${operator}`;
        }
        if (num2 !== '') ecuationText.textContent += ` ${num2}`;
    } else {
        ecuationText.textContent = num1;
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
    if (operator === 'x') return multiply(a, b)
    if (operator === '/') return divide(a, b)
}

function resolve() {
    if (num1 === '0' || num2 === '' || operator === '') return
    if (operator === '/' && num2 === '0') return
    num1 = String(operate(parseFloat(num1), operator, parseFloat(num2)));
    num2 = '';
}
function clearAll() {
    num1 = '0';
    num2 = '';
    operator = '';
    renderHTML()
}
function deleteDigit() {
    if (num1 === '0') return;
    if (num1 !== '0' && num2 === '' && operator === '') {
        num1 = parseFloat(num1.toString().slice(0, -1))
        renderHTML()
        if (isNaN(num1)) {
            num1 = '0';
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
