const calculator = document.querySelector('.calculator');
const display = document.querySelector('.calculator__display');
const keys = calculator.querySelector('.calculator__keys');
const calculate = (n1, operator, n2) => {
  let result = null;
  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2);
  }
  if (result % 2 !== 0 || result > 10000000) {
    return result.toPrecision(3);
  } else {
    return result.toFixed(0);
  }
};
keys.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    if (!action) {
      calculator.dataset.previousKeyType = 'number';
      if (displayedNum === '0' || previousKeyType === 'operator') {
        display.textContent = keyContent;
      } else if (previousKeyType === 'number') {
        display.textContent = displayedNum + keyContent;
      } else if (previousKeyType === 'calculate') {
        display.textContent = keyContent;
      }
      Array.from(key.parentNode.children).forEach((k) =>
        k.classList.remove('is-depressed')
      );
    }
    if (action === 'decimal') {
      if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.';
      } else if (previousKeyType === 'operator') {
        display.textContent = 0;
      }
    }
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      key.classList.add('is-depressed');
      calculator.dataset.previousKeyType = 'operator';
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
    }
    if (action === 'clear') {
      if (key.textContent === 'AC') {
        calculator.dataset.firstValue = '';
        calculator.dataset.modValue = '';
        calculator.dataset.operator = '';
        calculator.dataset.previousKeyType = '';
      } else {
        key.textContent = 'AC';
      }

      display.textContent = 0;
      calculator.dataset.previousKeyType = 'clear';
    }
    if (action !== 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]');
      clearButton.textContent = 'CE';
    }
    if (action === 'calculate') {
      calculator.dataset.previousKeyType = 'calculate';
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;
      display.textContent = calculate(firstValue, operator, secondValue);
    }
    if (firstValue && operator && previousKeyType !== 'operator') {
      display.textContent = calculate(firstValue, operator, secondValue);
    }
  }
});
