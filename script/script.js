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

  if (firstNumber == ".") {
    return "0";
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
  allowDot = true;
  allowUndo = true;
  inputDisplay.textContent = 0;
}

function evalExp() {
  eraseContent = true;
  allowUndo = false;
  if (allowCalculate) {
    printNumber(calculate());
    allowCalculate = false;
    eraseContent = true;
  }
  pressedEqual = true;
}

function undo() {
  let displayText = inputDisplay.textContent;
  let displayTextArr = displayText.split("");

  if (displayTextArr.length >= 1 && displayText != "0" && allowUndo) {
    let inputValueArr = inputValue.split("");

    displayTextArr.pop();
    inputValueArr.pop();

    inputValue = inputValueArr.join("");
    eraseContent = true;
    printNumber(displayTextArr.join(""));
  }
  if (displayTextArr.length <= 0 && displayText != "0" && allowUndo) {
    printNumber("0");
    eraseContent = true;
  }
}

// Global Variables
let eraseContent = true;
let allowCalculate = false;
let pressedEqual = false;
let allowDot = true;
let allowUndo = true;
let inputValue = "";

const inputDisplay = document.querySelector(".calculator__result");
const numbers = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operator]");

const resetBtn = document.querySelector(".reset");
const equalBtn = document.querySelector(".equal");
const backBtn = document.querySelector(".back");

// Math operations
const operate = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
};

// Numbers

numbers.forEach((number) => {
  number.addEventListener("click", ({ target }) => {
    const number = target.getAttribute("data-number");
    allowUndo = true;
    if (!(number == "." && allowDot == false)) {
      if (number == ".") {
        allowDot = false;
      }
      if (!(inputDisplay.textContent == "0" && number == "0")) {
        inputValue += number;
        printNumber(number);
      }
    }
  });
});

// Operators

operators.forEach((operator) => {
  operator.addEventListener("click", ({ target }) => {
    const operator = target.getAttribute("data-operator");

    allowDot = true;
    eraseContent = true;
    pressedEqual = false;

    if (allowCalculate) {
      printNumber(calculate());
      eraseContent = true;
      allowUndo = false;
    }

    allowCalculate = true;
    inputValue += operator;
  });
});

// Reset button

resetBtn.addEventListener("click", resetData);

// Equal button

equalBtn.addEventListener("click", evalExp);

// Back button

backBtn.addEventListener("click", undo);
