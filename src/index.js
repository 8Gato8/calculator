import { operate } from './functions/operate.js';

let firstValue = '';
let secondValue = '';
let operator = null;

let activeOperator = null;

const displayPanel = document.querySelector('.display-panel');
const numbersContainer = document.querySelector('.numbers');
const operatorsContainer = document.querySelector('.operators');
const operators = document.querySelectorAll('.operators .button');
const dotSign = document.querySelector('#dot');
const switchSign = document.querySelector('#switch-sign');
const equals = document.querySelector('#equals');
const erase = document.querySelector('#erase');
const reset = document.querySelector('#reset');

const hasDotRegex = /\./;
const validIntegerValueRegex = /\d/g;
const validNumbersRegex = /^(\d|\.)$/;
const validOperatorsRegex = /[-+*/]/;

function eraseLastChar(string) {
  return string.slice(0, string.length - 1);
}

function isExpressionComplete() {
  if (firstValue && secondValue && operator) return true;
  return false;
}

function canInsertDot(string) {
  return string !== '' && string[string.length - 1] !== '.' && !hasDotRegex.test(string);
}

numbersContainer.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) return;

  const numberString = e.target.dataset.value;

  if (firstValue && operator) {
    secondValue += numberString;
    displayPanel.textContent = secondValue;
  } else {
    firstValue += numberString;
    displayPanel.textContent = firstValue;
  }

  if (displayPanel.textContent !== '') {
    erase.removeAttribute('disabled');
  } else {
    erase.setAttribute('disabled', '');
  }

  if (canInsertDot(displayPanel.textContent)) {
    dotSign.removeAttribute('disabled');
  } else {
    dotSign.setAttribute('disabled', '');
  }

  if (isExpressionComplete()) {
    equals.removeAttribute('disabled');
  } else {
    equals.setAttribute('disabled', '');
  }
});

operatorsContainer.addEventListener('click', (e) => {
  const currentOperator = e.target;

  if (currentOperator === e.currentTarget) return;

  if (firstValue) {
    activeOperator = currentOperator;

    operators.forEach((operator) => {
      if (operator === activeOperator) operator.classList.add('button_black_active');
      else operator.classList.remove('button_black_active');
    });
  }

  if (isExpressionComplete()) {
    const result = parseFloat(operate(+firstValue, +secondValue, operator).toFixed(4));

    displayPanel.textContent = result.toString();
    firstValue = result.toString();
    secondValue = '';

    dotSign.setAttribute('disabled', '');
    equals.setAttribute('disabled', '');
    erase.setAttribute('disabled', '');
  }

  const newOperator = currentOperator.dataset.operator;
  operator = newOperator;
});

equals.addEventListener('click', () => {
  if (validIntegerValueRegex.test(firstValue) && secondValue === '0' && operator === '/') {
    displayPanel.textContent = "You can't divide by zero, silly)";
    firstValue = '';
    secondValue = '';
    operator = null;
    activeOperator = null;
    operators.forEach((operator) => operator.classList.remove('button_black_active'));
    dotSign.setAttribute('disabled', '');
    equals.setAttribute('disabled', '');
    erase.setAttribute('disabled', '');
    return;
  }

  const result = parseFloat(operate(+firstValue, +secondValue, operator).toFixed(4));

  displayPanel.textContent = result.toString();
  firstValue = result.toString();
  secondValue = '';
  operator = null;
  activeOperator = null;
  operators.forEach((operator) => operator.classList.remove('button_black_active'));

  if (canInsertDot(displayPanel.textContent)) {
    dotSign.removeAttribute('disabled');
  } else {
    dotSign.setAttribute('disabled', '');
  }

  equals.setAttribute('disabled', '');
  erase.setAttribute('disabled', '');
});

reset.addEventListener('click', () => {
  firstValue = '';
  secondValue = '';
  operator = null;
  activeOperator = null;
  operators.forEach((operator) => operator.classList.remove('button_black_active'));
  displayPanel.textContent = '0';
  dotSign.setAttribute('disabled', '');
  equals.setAttribute('disabled', '');
  erase.setAttribute('disabled', '');
});

erase.addEventListener('click', () => {
  if (firstValue && operator && secondValue) {
    secondValue = eraseLastChar(secondValue);
    displayPanel.textContent = secondValue;
  } else if (firstValue) {
    firstValue = eraseLastChar(firstValue);
    displayPanel.textContent = firstValue;
  }
});

switchSign.addEventListener('click', () => {
  if (firstValue && secondValue && operator) {
    if (secondValue.startsWith('-')) {
      secondValue = '';
    } else {
      secondValue = `-${secondValue}`;
    }

    displayPanel.textContent = secondValue;
  } else if (firstValue) {
    if (firstValue.startsWith('-')) {
      firstValue = firstValue.slice(1);
    } else {
      firstValue = `-${firstValue}`;
    }

    displayPanel.textContent = firstValue;
  }
});

window.addEventListener('keydown', (e) => {
  const key = e.key;
  if (!validNumbersRegex.test(key)) return;

  if (firstValue && operator) {
    secondValue += key;
    displayPanel.textContent = secondValue;
  } else {
    firstValue += key;
    displayPanel.textContent = firstValue;
  }

  if (displayPanel.textContent !== '') {
    erase.removeAttribute('disabled');
  } else {
    erase.setAttribute('disabled', '');
  }

  if (canInsertDot(displayPanel.textContent)) {
    dotSign.removeAttribute('disabled');
  } else {
    dotSign.setAttribute('disabled', '');
  }

  if (isExpressionComplete()) {
    equals.removeAttribute('disabled');
  } else {
    equals.setAttribute('disabled', '');
  }
});

window.addEventListener('keydown', (e) => {
  const key = e.key;

  if (!validOperatorsRegex.test(key)) return;

  if (firstValue) {
    activeOperator = key;

    operators.forEach((operator) => {
      if (operator.dataset.operator === activeOperator)
        operator.classList.add('button_black_active');
      else operator.classList.remove('button_black_active');
    });
  }

  if (isExpressionComplete()) {
    const result = parseFloat(operate(+firstValue, +secondValue, operator).toFixed(4));

    displayPanel.textContent = result.toString();
    firstValue = result.toString();
    secondValue = '';

    dotSign.setAttribute('disabled', '');
    equals.setAttribute('disabled', '');
  }

  const newOperator = key;
  operator = newOperator;
});

window.addEventListener('keydown', (e) => {
  const key = e.key;

  if (key !== 'Enter') return;

  if (validIntegerValueRegex.test(firstValue) && secondValue === '0' && operator === '/') {
    displayPanel.textContent = "You can't divide by zero, silly)";
    firstValue = '';
    secondValue = '';
    operator = null;
    activeOperator = null;
    operators.forEach((operator) => operator.classList.remove('button_black_active'));
    dotSign.setAttribute('disabled', '');
    equals.setAttribute('disabled', '');
    erase.setAttribute('disabled', '');
    return;
  }

  const result = parseFloat(operate(+firstValue, +secondValue, operator).toFixed(4));

  displayPanel.textContent = result.toString();
  firstValue = result.toString();
  secondValue = '';
  operator = null;
  activeOperator = null;
  operators.forEach((operator) => operator.classList.remove('button_black_active'));

  if (canInsertDot(displayPanel.textContent)) {
    dotSign.removeAttribute('disabled');
  } else {
    dotSign.setAttribute('disabled', '');
  }

  equals.setAttribute('disabled', '');
  erase.setAttribute('disabled', '');
});

window.addEventListener('keydown', (e) => {
  const key = e.key;

  if (key !== 'Backspace') return;

  if (firstValue && operator && secondValue) {
    secondValue = eraseLastChar(secondValue);
    displayPanel.textContent = secondValue;
  } else if (firstValue) {
    firstValue = eraseLastChar(firstValue);
    displayPanel.textContent = firstValue;
  }
});

window.addEventListener('keydown', (e) => {
  const key = e.key;

  if (key !== 'r') return;

  firstValue = '';
  secondValue = '';
  operator = null;
  activeOperator = null;
  operators.forEach((operator) => operator.classList.remove('button_black_active'));
  displayPanel.textContent = '0';
  dotSign.setAttribute('disabled', '');
  equals.setAttribute('disabled', '');
  erase.setAttribute('disabled', '');
});
