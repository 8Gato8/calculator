import { operate } from './functions/operate.js';

let firstValue = '';
let secondValue = '';
let operator = null;

let activeOperator = null;

const displayPanel = document.querySelector('.display-panel');
const numbersContainer = document.querySelector('.numbers');
const operatorsContainer = document.querySelector('.operators');
const operators = document.querySelectorAll('.operators .button');
const switchSign = document.querySelector('#switch-sign');
const equals = document.querySelector('#equals');
const reset = document.querySelector('#reset');

function isExpressionComplete() {
  if (firstValue && secondValue && operator) return true;
  return false;
}

numbersContainer.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) return;

  activeOperator = null;

  operators.forEach((operator) => operator.classList.remove('button_black_active'));

  const numberString = e.target.dataset.value;

  if (firstValue && operator) {
    secondValue += numberString;
    displayPanel.textContent = secondValue;
  } else {
    firstValue += numberString;
    displayPanel.textContent = firstValue;
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

    equals.setAttribute('disabled', '');
  }

  const newOperator = currentOperator.dataset.operator;
  operator = newOperator;
});

equals.addEventListener('click', () => {
  if (/\d/g.test(firstValue) && secondValue === '0' && operator === '/') {
    displayPanel.textContent = "You can't divide by zero, silly)";
    firstValue = '';
    secondValue = '';
    operator = null;
    activeOperator = null;
    equals.setAttribute('disabled', '');
    return;
  }

  const result = parseFloat(operate(+firstValue, +secondValue, operator).toFixed(4));

  displayPanel.textContent = result.toString();
  firstValue = result.toString();
  secondValue = '';
  operator = null;
  activeOperator = null;
  equals.setAttribute('disabled', '');
});

reset.addEventListener('click', () => {
  firstValue = '';
  secondValue = '';
  operator = null;
  activeOperator = null;
  displayPanel.textContent = '0';
  equals.setAttribute('disabled', '');
});

switchSign.addEventListener('click', () => {
  if (firstValue && secondValue && operator) {
    if (secondValue.startsWith('-')) {
      econdValue = '';
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
