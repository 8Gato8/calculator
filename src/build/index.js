"use strict";
const add = function (firstSummand, secondSummand) {
    return firstSummand + secondSummand;
};
const subtract = function (min, sub) {
    return min - sub;
};
const multiply = function (multiplier, multiplicand) {
    return multiplier * multiplicand;
};
const divide = function (divident, divisor) {
    return divident / divisor;
};
const operate = function (firstNumber, secondNumber, operator) {
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
