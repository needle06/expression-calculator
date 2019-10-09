function eval() {
    // Do not use eval!!!
    return;
}

function sortingStation(input) {
    let stack = [];
    let output = [];

    for (let i = 0; i< input.length; i++) {
        if(!isNaN(+input[i])) {
            output.push(input[i]);
            continue;
        }
        if (input[i] == "(") {
            stack.push(input[i]);
            continue;
        }

        if (input[i] == ")") {
            while (stack.length > 0 && stack[stack.length-1] != "(") {
                output.push(stack.pop());
            }
            if (!stack.length) throw new Error("ExpressionError: Brackets must be paired");
            stack.pop();
            continue;
        }
        if (input[i] == "+" || input[i] == "-" ) {
            while(stack.length && stack[stack.length-1] != "(") {
                output.push(stack.pop())
            }
            stack.push(input[i]);
            continue;
        }
        if (input[i] == "*" || input[i] == "/" ) {
            while(stack.length && (stack[stack.length-1] == "*" || stack[stack.length-1] == "/")) {
                output.push(stack.pop())
            }
            stack.push(input[i]);
            continue;
        } 
    }

    while(stack.length) {
        let tempPop = stack.pop();
        if(tempPop == "(") throw new Error("ExpressionError: Brackets must be paired");
        output.push(tempPop)
    }

    return output
}

function stackMachine (input) {
    let stack = [];
    for (let i = 0; i< input.length; i++) {
        if(!isNaN(+input[i])) {
            stack.push(input[i]);
            continue;
        }
        let secondOperand = +stack.pop();
        let firstOperand = +stack.pop();
        switch(input[i]){
            case "+":
                let summ  = firstOperand + secondOperand;
                stack.push(summ);
                break;
            case "-":
                let sub  = firstOperand - secondOperand;
                stack.push(sub);
                break;
            case "*":
                let mul  = firstOperand * secondOperand;
                stack.push(mul);
                break;    
            case "/":
                if(secondOperand == 0) throw(new TypeError('TypeError: Division by zero.'));
                let div  = firstOperand / secondOperand;
                stack.push(div);
                break;  
        }
    }
    return stack.pop();
}

function parsingString(string){
    let buffer = "";
    let output = [];
    for(let i = 0; i < string.length; i++) {
        if(string[i] == " ") continue;
        if (string[i] == "+" || string[i] == "-" 
        || string[i] == "*" || string[i] == "/" 
        || string[i] == "(" || string[i]== ")" ) {
            if(buffer.length){
                output.push(buffer);
                buffer = "";
            }
            output.push(string[i]);
        }
        if (!isNaN(+string[i])) {
            buffer += string[i];
        }
    }
    if (buffer.length) {
        output.push(buffer);
    } 
    return output;
}

function expressionCalculator(expr) {
    // let parsedExpr = expr.trim().split(' ');
    let parsedExpr = parsingString(expr);
   return stackMachine(sortingStation(parsedExpr));
}

module.exports = {
    expressionCalculator
}