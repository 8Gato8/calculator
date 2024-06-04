import { add } from './ add';
import { subtract } from './subtract';
import { multiply } from './multiply';
import { divide } from './divide';

type TOperate = (first: number, second: number, operator: string) => number | string;

export const operate: TOperate = function (firstNumber, secondNumber, operator) {
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
