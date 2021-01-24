function add(fVal, sVal) {
  return +fVal + +sVal;
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
  resetInput();
  clearContentOnce();

  if (inputDisplay.textContent <= 1 && number == ".") {
    inputDisplay.textContent = "0" + number;
  } else {
    inputDisplay.textContent += number;
  }
}

function resetInput() {
  if (pressedEqual) {
    inputValue = "";
    pressedEqual = false;
  }
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

  if (operator == "/" && secondNumber == "0") {
    return "Nie dziel przez zero gagatku!";
  }

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
  pressedEqual = false;
  inputValue = "";
  inputDisplay.textContent = 0;
}
// Global Variables
let eraseContent = true;
let allowCalculate = false;
let pressedEqual = false;
let inputValue = "";
let globalSecond = "";
const inputDisplay = document.querySelector(".calculator__result");
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
      if (!(inputDisplay.textContent.includes(".") && number == ".")) {
        inputValue += number;
        console.log(inputValue);
        printNumber(number);
      }
    }
  });
});

// Operators

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    const operator = e.target.getAttribute("data-operator");

    if (operator) {
      eraseContent = true;
      pressedEqual = false;
      if (allowCalculate) {
        inputDisplay.textContent = calculate();
      }

      allowCalculate = true;
      inputValue += operator;
    }
  });
});

// Reset button

reset.addEventListener("click", () => {
  resetData();
});

// Equal button

equal.addEventListener("click", () => {
  eraseContent = true;
  if (allowCalculate) {
    printNumber(calculate());
    allowCalculate = false;
  }
  eraseContent = true;
  pressedEqual = true;
});
