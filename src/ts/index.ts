type TBasicOperation = (first: number, second: number) => number;

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
