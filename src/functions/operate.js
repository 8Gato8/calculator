import { add } from './ add.js';
import { subtract } from './subtract.js';
import { multiply } from './multiply.js';
import { divide } from './divide.js';
export const operate = function (firstNumber, secondNumber, operator) {
  switch (operator) {
    case '+':
      return add(firstNumber, secondNumber);
    case '-':
      return subtract(firstNumber, secondNumber);
    case '*':
      return multiply(firstNumber, secondNumber);
    case '/':
      return divide(firstNumber, secondNumber);
    default:
      return 'This type of operation is not supported';
  }
};
