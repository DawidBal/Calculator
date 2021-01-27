`use strict`;

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

function roundNumber(number) {
  return Math.round(number * 1000) / 1000;
}

function printNumber(number) {
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
    return "You can't divide by zero";
  }

  if (firstNumber == ".") {
    return "0";
  }

  if (secondNumber == "") {
    inputValue = roundNumber(operate[operator](+firstNumber, +firstNumber));
  } else {
    inputValue = roundNumber(operate[operator](+firstNumber, +secondNumber));
  }
  console.log(inputValue);
  return inputValue;
}

function resetCalc() {
  eraseContent = true;
  allowCalculate = false;
  pressedEqual = false;
  inputValue = "";
  allowDot = true;
  allowUndo = true;
  inputDisplay.textContent = 0;
}

function equal() {
  eraseContent = true;
  allowUndo = false;
  if (allowCalculate) {
    printNumber(calculate());
    allowCalculate = false;
    eraseContent = true;
    allowDot = true;
  }
  pressedEqual = true;
}

function undo() {
  let displayText = inputDisplay.textContent;
  let displayTextArr = displayText.split("");

  if (displayTextArr.length >= 1 && displayText != "0" && allowUndo) {
    let inputValueArr = inputValue.split("");

    removeLastItem(displayTextArr);
    removeLastItem(inputValueArr);

    inputValue = inputValueArr.join("");
    eraseContent = true;
    printNumber(displayTextArr.join(""));
  }
  if (displayTextArr.length <= 0 && displayText != "0" && allowUndo) {
    inputValue += "0";
    printNumber("0");
    eraseContent = true;
  }
}

function removeLastItem(array) {
  const deletedItem = array.pop();
  if (deletedItem === ".") allowDot = true;
}

function keyInput({ key }) {
  const btnPressed = document.querySelector(`[data-key="${key}"]`);
  if (key >= 0 && key <= 9) addNumber(btnPressed);
  if (key === "Backspace") undo(btnPressed);
  if (key === "+" || key === "-" || key === "*" || key === "/")
    addOperator(btnPressed);
  if (key === "Escape") resetCalc();
  if (key === "Enter") equal();
}

function addNumber(target) {
  const number = target.getAttribute("data-number");
  allowUndo = true;
  if (!(number == "." && allowDot == false)) {
    if (number == ".") {
      allowDot = false;
    }
    if (!(inputDisplay.textContent == "0" && number == "0")) {
      if (pressedEqual) resetInput();
      inputValue += number;
      printNumber(number);
    }
  }
}

function addOperator(target) {
  const operator = target.getAttribute("data-operator");
  allowUndo = false;
  allowDot = true;
  eraseContent = true;
  pressedEqual = false;

  if (allowCalculate) {
    printNumber(calculate());
    eraseContent = true;
  }

  allowCalculate = true;
  inputValue += operator;
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
    addNumber(target);
  });
});

// Operators

operators.forEach((operator) => {
  operator.addEventListener("click", ({ target }) => {
    addOperator(target);
  });
});

// Reset button

resetBtn.addEventListener("click", resetCalc);

// Equal button

equalBtn.addEventListener("click", equal);

// Back button

backBtn.addEventListener("click", undo);

// Keyboard support
document.addEventListener("keydown", keyInput);
