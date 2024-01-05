// Variables
const numbersHTML = document.querySelectorAll('.number');
const operatorsHTML = document.querySelectorAll('.operator');
const clearAllBtn = document.querySelector('#clearAll');
const deleteBtn = document.querySelector('#delete');
const ecuationText = document.querySelector('#ecuation-text');
const dotBtn = document.querySelector('#dot-btn');
const body = document.body;

const numbers = Array.from(numbersHTML);
const operators = Array.from(operatorsHTML);
const divideSymbol = String.fromCharCode(247);

let num1 = '0';
let num2 = '';
let operator = '';
const operatorSymbols = ['x', '+', '-', '/', '=', 'Enter']
const numberSymbol = ['1','2','3','4','5','6','7','8','9','0','.'];

eventListeners()
function eventListeners() {
    numbers.forEach(number => {
        number.addEventListener('click', addDigit);
        body.addEventListener('keydown', addDigit);
    });
    operators.forEach(operator => {
        operator.addEventListener('click', addOperator);
        body.addEventListener('keydown', addOperator);
    })
    clearAllBtn.addEventListener('click', clearAll);
    deleteBtn.addEventListener('click', deleteDigit);
    body.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
            deleteDigit()
        }
    });

}

function addDigit(e) {
    let numberSelected;
    if (e.type === 'keydown' && numberSymbol.includes(e.key)) {
        numberSelected = e.key;
    } else if (e.type === 'click') {
        numberSelected = e.target.parentNode.classList.contains('number') ? e.target.parentNode.dataset.id : e.target.dataset.id;
    } else return;

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
    if (num1 === '0' || e.type === 'keydown' && !operatorSymbols.includes(e.key)) return;
    if (e.target.parentNode.classList.contains('equals') || e.target.classList.contains('equals') || (e.type === 'keydown' && (e.key === '=' || e.key === 'Enter') )) {
        resolve()
        operator = ''
        renderHTML()
    }
    else {
        resolve()
        if (e.type === 'click') {
            operator = e.target.parentNode.classList.contains('operator') ? e.target.parentNode.dataset.id : e.target.dataset.id;
        } else {
            operator = e.key;
        }
        renderHTML()
    }
}
function renderHTML() {
    if (num1 === 'Infinity') num1 = 'Indeterminate'
    if (num1 !== '0') {
        ecuationText.textContent = `${num1}`;
        if (operator !== '') {
            ecuationText.textContent += operator === '/' ? ` ${divideSymbol}` : ` ${operator}`;
        }
        if (num2 !== '') ecuationText.textContent += ` ${num2}`;
    } else {
        ecuationText.textContent = num1;
    }
}
// Math functions
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
    if (num1 === '0' || num2 === '' || operator === '') return;
    let result = operate(parseFloat(num1), operator, parseFloat(num2))
    num1 = String(result).includes('.') ? String(result.toFixed(2)) : String(result);
    num2 = '';
}

// Erase Functions
function clearAll() {
    num1 = '0';
    num2 = '';
    operator = '';
    renderHTML()
}
function deleteDigit() {
    if (num1.length === 1) num1 = '0';
    if (num1 !== '0' && num2 === '' && operator === '') {
        num1 = num1.toString().slice(0, -1)
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
