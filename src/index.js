import { operate } from './functions/operate.js';

let firstValue = null;
let secondValue = null;
let operator = null;

const validOperators = ['+', '-', '*', '/'];
const validNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const displayInput = document.querySelector('.display-input');
const displayResult = document.querySelector('.display-result');

const numbersContainer = document.querySelector('.numbers');
const operatorsContainer = document.querySelector('.operators');
const operatorsButtons = document.querySelectorAll('.operators .button');
const equals = document.querySelector('#equals');
const erase = document.querySelector('#erase');
const reset = document.querySelector('#reset');

function eraseLastChar(string) {
  return string.substring(0, string.length - 1);
}

numbersContainer.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) return;
  const numberButton = e.target;
  const numberButtonValue = +numberButton.dataset.value;
  displayInput.value += numberButtonValue;

  displayInput.dispatchEvent(new Event('input', { bubbles: true }));
});

function isValidString(string) {
  const array = Array.from(string);

  return array.every((char) => validNumbers.includes(char));
}

function parseInputValue(inputValue) {
  const array = Array.from(inputValue);

  const operatorValue = array.find((char) => validOperators.includes(char));
  const operatorIndex = array.indexOf(operatorValue);

  operator = operatorValue ?? null;

  if (operatorValue && inputValue) {
    /* isValidString в этом месте может вызвать проблемы в будущем */
    firstValue = isValidString(inputValue.slice(0, operatorIndex))
      ? inputValue.slice(0, operatorIndex)
      : null;
  } else if (inputValue) {
    firstValue = inputValue;
  } else {
    firstValue = null;
  }

  if (firstValue && operator && isValidString(inputValue.slice(operatorIndex + 1))) {
    secondValue = inputValue.slice(operatorIndex + 1);
  } else {
    secondValue = null;
  }
}

displayInput.addEventListener('input', () => {
  parseInputValue(displayInput.value);

  console.log(firstValue, secondValue, operator);

  if (firstValue && secondValue && operator) equals.removeAttribute('disabled');
  else equals.setAttribute('disabled', '');

  if (firstValue) {
    erase.removeAttribute('disabled');
    operatorsButtons.forEach((operator) => operator.removeAttribute('disabled'));
  } else {
    erase.setAttribute('disabled', '');
    operatorsButtons.forEach((operator) => operator.setAttribute('disabled', ''));
  }
});

operatorsContainer.addEventListener('click', (e) => {
  const operatorButton = e.target;
  const operatorButtonValue = operatorButton.dataset.operator;

  if (operator) {
    const result = operate(+firstValue, +secondValue, operator);
    displayInput.value = result.toString();
    displayResult.textContent = result.toString();
    firstValue = result;
    secondValue = null;
  }

  displayInput.value += operatorButtonValue;
  displayInput.dispatchEvent(new Event('input', { bubbles: true }));
});

equals.addEventListener('click', () => {
  const result = operate(+firstValue, +secondValue, operator);
  displayInput.value = '';
  displayResult.textContent = result.toString();
  firstValue = null;
  secondValue = null;
  operator = null;
  displayInput.dispatchEvent(new Event('input', { bubbles: true }));
});

reset.addEventListener('click', () => {
  displayInput.value = '';
  displayResult.textContent = '';
  firstValue = null;
  secondValue = null;
  operator = null;

  displayInput.dispatchEvent(new Event('input', { bubbles: true }));
});

erase.addEventListener('click', () => {
  displayInput.value = eraseLastChar(displayInput.value);

  displayInput.dispatchEvent(new Event('input', { bubbles: true }));
});
