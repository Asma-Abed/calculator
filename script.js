const calculator = document.querySelector('.calculator-container');
const display = document.querySelector('.display');
const btns = document.querySelector('.btns');

const calculate = (firstNumber, operator, SecondNumber) => {
  const firsNum = parseFloat(firstNumber);
  const SecNum = parseFloat(SecondNumber);
  if (operator === 'add') return firsNum + SecNum;
  if (operator === 'subtract') return firsNum - SecNum;
  if (operator === 'multiply') return firsNum * SecNum;
  if (operator === 'divide') return firsNum / SecNum;
};

const clearState = () => {
  calculator.dataset.firstNum = '';
  calculator.dataset.modSecondNum = '';
  calculator.dataset.operator = '';
  calculator.dataset.previousNumKey = '';
};

btns.addEventListener('click', (e) => {
  const key = e.target;
  const type = key.dataset.type;
  const keyContent = key.textContent;
  const displayedNum = display.textContent;
  const previousNumKey = calculator.dataset.previousNumKey;

  if (!type) {
    if (displayedNum === '0' || previousNumKey === 'operator') {
      display.textContent = keyContent;
    } else if (previousNumKey === 'equal') {
      clearState();
      display.textContent = keyContent;
    } else {
      display.textContent = displayedNum + keyContent;
    }

    calculator.dataset.previousNumKey = 'number';
  }

  if (
    type === 'add' ||
    type === 'subtract' ||
    type === 'multiply' ||
    type === 'divide'
  ) {
    const firstNum = calculator.dataset.firstNum;
    const operator = calculator.dataset.operator;
    const SecondNum = displayedNum;

    if (
      firstNum &&
      operator &&
      previousNumKey !== 'operator' &&
      previousNumKey !== 'equal'
    ) {
      const calculatedValue = calculate(firstNum, operator, SecondNum);
      display.textContent = calculatedValue;
      calculator.dataset.firstNum = calculatedValue;
    } else {
      calculator.dataset.firstNum = displayedNum;
    }

    calculator.dataset.operator = type;
    calculator.dataset.previousNumKey = 'operator';
  }

  if (type === 'clear') {
    if (key.textContent === 'C') {
      clearState();
    }
    display.textContent = 0;
    calculator.dataset.previousNumKey = 'clear';
  }

  if (type === 'decimal') {
    if (
      !displayedNum.includes('.') &&
      previousNumKey !== 'operator' &&
      previousNumKey !== 'equal'
    ) {
      display.textContent = displayedNum + '.';
    } else if (previousNumKey === 'operator') {
      display.textContent = '0.';
    } else if (previousNumKey === 'equal') {
      clearState();
      display.textContent = '0.';
    }

    calculator.dataset.previousNumKey = 'decimal';
  }

  if (type === 'equal') {
    let firstNum = calculator.dataset.firstNum;
    const operator = calculator.dataset.operator;
    let SecondNum = displayedNum;
    if (firstNum) {
      if (previousNumKey === 'equal') {
        firstNum = displayedNum;
        SecondNum = calculator.dataset.modSecondNum;
      }
      display.textContent = calculate(firstNum, operator, SecondNum);
    }

    calculator.dataset.modSecondNum = SecondNum;
    calculator.dataset.previousNumKey = 'equal';
  }
});
