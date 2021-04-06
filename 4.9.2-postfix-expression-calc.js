/**
 * @typedef {"+" | "-" | "*" | "/"} Opertaor
 */

/**
 * 后缀表达式计算器
 * @param {string} expression 要计算的表达式
 * @returns {number} 计算结果
 * 
 * @throws {SyntaxError} 语法错误
 * 
 * @example
 * "1 2 +"      ==> 3
 * "1 5 + 4 *"  ==> 24
 * "10 3 - 2 -" ==> 5
 */
function postfixExpressionCalc(expression){
    const tokens = expression.split(" ");
    /** @type {(number | Opertaor)[]} */
    const stack = [];

    while(tokens.length){
        if(/\d/.test(tokens[0])){
            stack.push(Number(tokens.shift()));
            continue;
        }
    
        if(/\D/.test(tokens[0])){
            const operand2 = stack.pop();
            const operand1 = stack.pop();

            /** @type {Opertaor} */
            const operator = tokens.shift();

            if (typeof operand1 !== "number")
                throw new SyntaxError(`Unexpected ${operand1} when applying ${operator}`);

            if (typeof operand2 !== "number")
                throw new SyntaxError(`Unexpected ${operand2} when applying ${operator}`);

            switch(operator) {
                case "+": stack.push(operand1 + operand2); continue;
                case "-": stack.push(operand1 - operand2); continue;
                case "*": stack.push(operand1 * operand2); continue;
                case "/": stack.push(operand1 / operand2); continue;
                default: throw new SyntaxError(`Unknown operator ${operator}`);
            }
        }
    }

    if(stack.length !== 1) {
        throw new SyntaxError("Unexpected end of expression");
    }
    
    return stack.pop();
}

/**
 * @param {string} expr
 * @param {number} result
*/
function assert(expr, result, message) {
    try {
        const actual = postfixExpressionCalc(expr);
        console.assert(actual === result, `${expr} ==> ${result} \n actual: ${actual}`);
    } catch(err) {
        const actual = err.message;
        console.assert(actual === message, `${expr} throwed ${message} \n actual: ${actual}`);
    }
}

assert("1 2 +", 3)
assert("1 2 *", 2)
assert("1 5 + 4 *", 24)
assert("10 5 / 3 +", 5)
assert("9 3 1 - 3 * + 10 2 / +", 20)

assert("*",         null, "Unexpected undefined when applying *")
assert("1 5 + *",   null, "Unexpected undefined when applying *")
assert("1 2",       null, "Unexpected end of expression")
assert("1 2 &",     null, "Unknown operator &");
