operations = {
    "+" : (a, b) => a + b,
    "-" : (a, b) => a - b,
    "*" : (a, b) => a * b,
    "/" : (a, b) => a / b
}

function checkErrors(expr){
    if (expr.split("(").length !== expr.split(")").length) 
        throw new Error("ExpressionError: Brackets must be paired"); 
    else if (expr.split(' ').join('').indexOf('/0')>-1) 
        throw new Error("TypeError: Division by zero.");
}

function compute(expr) {
    let item = expr.split(" ");
    
    for (let i = 1; i < item.length - 1;) {
        if (item[i] == '*' || item[i] == '/') {
            item[i] = operations[ item[i] ]( item[i-1], item[i+1] );
            item.splice(i-1, 3, item[i]);
        }
        else i++;
    }
    for (let i = 1; i < item.length - 1; ) {
        if (item[i] == '+' || item[i] == '-') {
            item[i] = operations[ item[i] ]( +item[i-1], +item[i+1] );
            item.splice(i-1, 3, item[i]);
        }
        else i++;
    }
    return item[0];
}

function expressionCalculator(expr) {
    checkErrors(expr);
    expr = expr.replace(/\s/g, "").replace(/(\*|\/|\+|\-)/g, " $& ");

   if (expr.match(/\(/g) != null ) {
        for (let i = expr.match(/\(/g).length; i > 0; i--) {
            let newExpr = expr.match(/(\([0-9\+\/\*\-. ]+\))/g)[0];
            expr = expr.replace(newExpr, compute(newExpr.slice( 1, newExpr.length-1 )));
        }  
    }
    return compute(expr);
}

module.exports = {
    expressionCalculator
}