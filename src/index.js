import { operate } from './functions/operate.js';

let firstValue = null;
let secondValue = null;
let operator = null;

const displayInput = document.querySelector('.display-input');
const numbers = document.querySelector('.numbers');
const operators = document.querySelector('.operators');
const equals = document.querySelector('#equals');

numbers.addEventListener('click', (e) => {
  const numberButton = e.target;
  const numberButtonValue = numberButton.dataset.value;
  displayInput.value += numberButtonValue;
  firstValue += numberButtonValue;
});

operators.addEventListener('click', (e) => {
  const operatorButton = e.target;
  const operatorButtonValue = operatorButton.dataset.operator;
  console.log(operatorButton, operatorButtonValue);
  displayInput.value += operatorButtonValue;
  operator = operatorButtonValue;
});

equals.addEventListener('click', () => {
  const result = operate(+firstValue, +secondValue, operator);
  displayInput.value = result.toString();
});
