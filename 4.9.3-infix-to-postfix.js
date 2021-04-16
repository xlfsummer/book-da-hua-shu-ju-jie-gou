/**
 * 中缀表达式转后缀表达式
 * @param {string} expression 中缀表达式
 * @returns {string}
 * 
 * @example
 * "1 + 2" ==> "1 2 +"
 */
function infix2postfix(expression) {
    const tokens = expression.split(" ");
    const outputArray = [];
    const operatorStack = [];

    while(tokens.length) {

        if(/\d/.test(tokens[0])){
            outputArray.push(tokens.shift());
            continue;
        }

        if(/\D/.test(tokens[0])){
            const opertaor = tokens.shift();

            if(opertaor === ")"){
                let prev;
                while ((prev = operatorStack.pop()) !== "(")
                    outputArray.push(prev);
                continue;
            }

            let prev = operatorStack[operatorStack.length - 1];
            // undefined >= undefined // false
            // 1 >= undefined // false
            // undefained >= 1 // false
            if(getPriority(prev) >= getPriority(opertaor)){
                outputArray.push(operatorStack.pop());
                operatorStack.push(opertaor);
                continue;
            }

            operatorStack.push(opertaor);
            continue;
        }
    }

    // 将运算符全部出栈
    while (operatorStack.length)
        outputArray.push(operatorStack.pop());

    return outputArray.join(" ");

    function getPriority(opertaor) {
        return { "+": 1, "-": 1, "*": 2, "/": 2 }[opertaor];
    }
}

/**
 * @param {string} expr
 * @param {number} result
*/
function assert(expr, result, message) {
    try {
        const actual = infix2postfix(expr);
        console.assert(actual === result, `${expr} ==> ${result} \n actual: ${actual}`);
    } catch(err) {
        const actual = err.message;
        console.assert(actual === message, `${expr} throwed ${message} \n actual: ${actual}`);
    }
}

assert("1 + 2", "1 2 +");
assert("1 + 2 + 3", "1 2 + 3 +");
assert("1 + 2 * 3", "1 2 3 * +");
assert("1 * 2 + 3", "1 2 * 3 +");
assert("1 + ( 2 + 3 )", "1 2 3 + +");
assert("( 1 + 2 ) + 3", "1 2 + 3 +");
assert("( ( 1 + 2 ) + 3 )", "1 2 + 3 +");
assert("( 1 + 2 ) * 3", "1 2 + 3 *");
assert("( 1 + 2 ) * ( 1 - 2 )", "1 2 + 1 2 - *");
assert("( 1 * 2 ) - ( 3 * 4 )", "1 2 * 3 4 * -");
assert("( ( 1 * 2 ) - 3 ) * 4", "1 2 * 3 - 4 *");
assert("1 * 2 - 3 * 4", "1 2 * 3 4 * -");