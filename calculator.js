let operand1;
let operator;
let displayNumber = '0';
const displayContent = document.querySelector('#calc-display');
const equalButton = document.querySelector('.equals');
const numbuttons = document.querySelectorAll('.number');
const oprbuttons = document.querySelectorAll('.sign');
const acButton = document.querySelector('.allclear');

let operationObject = {
    '+' : function( first , second){ return Number(first) + Number(second)},
    '-' : function( first , second){ return Number(first) - Number(second)},
    '*' : function( first , second){ return Number(first) * Number(second)},
    '/' : function( first , second){ 
            if(Number(second) == 0) return 'MATH ERROR!';
            return Number(first) / Number(second)
            },
}

function setDisplay( value ){
    value = String(value);
    displayContent.textContent = value;
}

function inputNumber( btnPressed ){
    let numBtnValue = String(btnPressed);
    if( !displayNumber || displayNumber === '0'){
        displayNumber = numBtnValue;
    }else{
        if(displayNumber.length < 10 || (displayNumber.length < 11 && displayNumber[0] === '-')){ 
            displayNumber = displayNumber.concat(numBtnValue);
        }
    }
    setDisplay(displayNumber);
}

function handleOperation( opr ){
    if( opr === '+/-'){
        if(displayNumber && displayNumber !== '0'){
            if(displayNumber[0] == '-'){
                displayNumber = displayNumber.slice(1,);
            }else{
                displayNumber = '-' + displayNumber;
            }
            setDisplay(displayNumber);
        }
        return;
    }else if( opr === '.'){
        if(!displayNumber || displayNumber.indexOf('.') === -1){
            if(!displayNumber) displayNumber = '0';
            displayNumber = displayNumber + '.';
        }
        setDisplay(displayNumber);
        return;
    }else if( opr === '%' ){
        displayNumber = String(Number(displayNumber)/100);
        setDisplay(displayNumber);
        return;
    }

    calculate();
    if(!operand1)
        operand1 = displayNumber;
    operator = opr;
    displayNumber = null;
}

function calculate(){
    if( operand1 && operator && displayNumber){
        let result = operationObject[operator](operand1, displayNumber);
        if( result !== 'MATH ERROR!'){
            displayNumber = String(Math.round(result*100)/100);
            operand1 = displayNumber;
            if(displayNumber.length > 10){
                let expDisplay;
                if(displayNumber[0] === '-'){
                    expDisplay = `-${displayNumber[1]}.${displayNumber[2]}${displayNumber[3]}e${displayNumber.length - 1}`;
                }else{
                    expDisplay = `${displayNumber[0]}.${displayNumber[1]}${displayNumber[2]}e${displayNumber.length - 1}`;
                }
                setDisplay(expDisplay);
            }else{
                setDisplay(displayNumber);
            }
            displayNumber = null;
        }else{
            operand1 = null;
            operator = null;
            displayNumber = '0';
            setDisplay(result);
        }
    }
}

equalButton.addEventListener('click', (e) => calculate());
acButton.addEventListener('click', (e) => {
    operand1 = null;
    operator = null;
    displayNumber = '0';
    setDisplay(displayNumber);
});

numbuttons.forEach( num => {
    num.addEventListener('click', (e) => inputNumber(num.textContent));
})
oprbuttons.forEach( sign => {
    sign.addEventListener('click', (e) => handleOperation(sign.textContent));
})