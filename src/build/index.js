"use strict";
function add(...args) {
    return args.reduce((prev, current) => prev + current);
}
console.log(add(2, 4, 7, 6));
