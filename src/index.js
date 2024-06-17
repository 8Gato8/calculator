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

const dotRegex = /\./;
const validIntegerValueRegex = /\d/g;
const validNumbersRegex = /^(\d|\.)$/;
const validOperatorsRegex = /[-+*/]/;

function eraseLastChar(string) {
  return string.slice(0, string.length - 1);
}

function hasDot(string) {
  return dotRegex.test(string);
}

function isExpressionComplete() {
  if (firstValue && secondValue && operator) return true;
  return false;
}

function isLastCharDot(string) {
  return string[string.length - 1] === '.';
}

function isStringEmpty(string) {
  return string.length < 1;
}
function isTryingToDivideByZero(firstValue, secondValue, operator) {
  return validIntegerValueRegex.test(firstValue) && secondValue === '0' && operator === '/';
}

function canInsertDot(string) {
  return !hasDot(string) && !isLastCharDot(string) && !isStringEmpty(string);
}

function switchDotSignDisabledState() {
  if (canInsertDot(displayPanel.textContent)) {
    dotSign.removeAttribute('disabled');
  } else {
    dotSign.setAttribute('disabled', '');
  }
}

/* handler functions */

function handleNumberInput(input) {
  if (firstValue && operator) {
    secondValue = secondValue === '0' && input !== '.' ? input : secondValue + input;
    displayPanel.textContent = secondValue;
  } else {
    firstValue = firstValue === '0' && input !== '.' ? input : firstValue + input;
    displayPanel.textContent = firstValue;
  }

  console.log(firstValue, secondValue);

  switchDotSignDisabledState();

  if (isExpressionComplete()) {
    equals.removeAttribute('disabled');
  } else {
    equals.setAttribute('disabled', '');
  }
}

function handleOperatorInput(newOperator) {
  if (firstValue) {
    activeOperator = newOperator;

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

  operator = newOperator;
}

function handleEqualsOperate() {
  if (isTryingToDivideByZero(firstValue, secondValue, operator)) {
    displayPanel.textContent = "You can't divide by zero, silly)";
    firstValue = '';
    dotSign.setAttribute('disabled', '');
  } else {
    const result = parseFloat(operate(+firstValue, +secondValue, operator).toFixed(4));

    displayPanel.textContent = result.toString();
    firstValue = result.toString();
    if (canInsertDot(displayPanel.textContent)) {
      dotSign.removeAttribute('disabled');
    } else {
      dotSign.setAttribute('disabled', '');
    }
  }

  secondValue = '';
  operator = null;
  activeOperator = null;
  operators.forEach((operator) => operator.classList.remove('button_black_active'));

  equals.setAttribute('disabled', '');
}

function handleResetOperate() {
  firstValue = '';
  secondValue = '';
  operator = null;
  activeOperator = null;
  operators.forEach((operator) => operator.classList.remove('button_black_active'));
  displayPanel.textContent = '';
  equals.setAttribute('disabled', '');
  dotSign.setAttribute('disabled', '');
}

function handleEraseOperate() {
  if (firstValue && operator && secondValue) {
    secondValue = eraseLastChar(secondValue);
    displayPanel.textContent = secondValue;
  } else if (firstValue) {
    firstValue = eraseLastChar(firstValue);
    displayPanel.textContent = firstValue;
  }

  switchDotSignDisabledState();
}

function handleSwitchSignClick() {
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
}

/* numbers event listeners */

numbersContainer.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) return;

  const numberString = e.target.dataset.value;

  handleNumberInput(numberString);
});

window.addEventListener('keydown', (e) => {
  const key = e.key;
  if (!validNumbersRegex.test(key) || (key === '.' && dotSign.hasAttribute('disabled'))) return;

  handleNumberInput(key);
});

/* operatators event listeners */

operatorsContainer.addEventListener('click', (e) => {
  const target = e.target;

  if (target === e.currentTarget) return;

  const newOperator = target.dataset.operator;

  handleOperatorInput(newOperator);
});

window.addEventListener('keydown', (e) => {
  const newOperator = e.key;

  if (!validOperatorsRegex.test(newOperator)) return;

  handleOperatorInput(newOperator);
});

/* equals event listeners */

equals.addEventListener('click', handleEqualsOperate);

window.addEventListener('keydown', (e) => {
  const key = e.key;

  if (key !== 'Enter' || equals.hasAttribute('disabled')) return;

  handleEqualsOperate();
});

/* reset event listeners */

reset.addEventListener('click', handleResetOperate);

window.addEventListener('keydown', (e) => {
  const key = e.key;

  if (key !== 'r') return;

  handleResetOperate();
});

/* erase event listeners */

erase.addEventListener('click', handleEraseOperate);

window.addEventListener('keydown', (e) => {
  const key = e.key;

  if (key !== 'Backspace') return;

  handleEraseOperate();
});

/* switchSign event listener */

switchSign.addEventListener('click', handleSwitchSignClick);
