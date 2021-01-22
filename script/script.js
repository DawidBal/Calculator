function add(fVal, sVal) {
  return fVal + sVal;
}

function subtract(fVal, sVal) {
  return fVal - sVal;
}

function multiply(fVal, sVal) {
  return fVal * sVal;
}
function divide(fVal, sVal) {
  return fVal / sVal;
}

function printNumber(number) {
  clearContentOnce();
  inputDisplay.textContent += number;
}

function clearContentOnce() {
  if (eraseContent) {
    eraseContent = false;
    inputDisplay.textContent = "";
  }
}

function calculate() {
  const splitInput = inputValue.split(" ");
  const firstNumber = splitInput[0];
  const operator = splitInput[1];
  const secondNumber = splitInput[2];

  if (secondNumber == "") {
    inputValue = operate[operator](+firstNumber, +firstNumber);
  } else {
    inputValue = operate[operator](+firstNumber, +secondNumber);
  }
  return inputValue;
}

function resetData() {
  eraseContent = true;
  allowCalculate = false;
  inputValue = "";
  inputDisplay.textContent = 0;
}
// Global Variables
let eraseContent = true;
let allowCalculate = false;
const inputDisplay = document.querySelector(".calculator__result");
let inputValue = "";
const numbers = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operator]");
const reset = document.querySelector(".reset");
const equal = document.querySelector(".equal");

// Math operations
const operate = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
};

// Numbers

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    const number = e.target.getAttribute("data-number");

    if (number) {
      printNumber(number);
      inputValue += number;
    }
  });
});

// Operators

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    const operator = e.target.getAttribute("data-operator");

    if (operator) {
      eraseContent = true;

      if (allowCalculate) {
        console.log(inputValue);
        inputDisplay.textContent = calculate();
        console.log(inputValue);
      }

      allowCalculate = true;
      inputValue += operator;
    }
  });
});

// Reset

reset.addEventListener("click", () => {
  resetData();
});
