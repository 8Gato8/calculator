type TBasicOperation = (first: number, second: number) => number;
type TOperate = (first: number, second: number, operator: string) => number | string;

const add: TBasicOperation = function (firstSummand, secondSummand) {
  return firstSummand + secondSummand;
};

const subtract: TBasicOperation = function (min: number, sub: number) {
  return min - sub;
};

const multiply: TBasicOperation = function (multiplier: number, multiplicand: number) {
  return multiplier * multiplicand;
};

const divide: TBasicOperation = function (divident: number, divisor: number) {
  return divident / divisor;
};

const operate: TOperate = function (firstNumber, secondNumber, operator) {
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
