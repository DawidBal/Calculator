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
  inputArea.textContent += number;
}

function clearContentOnce() {
  if (eraseContent) {
    eraseContent = false;
    inputArea.textContent = "";
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
  calculateNumb = false;
  inputValue = "";
  inputArea.textContent = 0;
}

let eraseContent = true;
let calculateNumb = false;
const inputArea = document.querySelector(".calculator__result");
let inputValue = "";
const numbers = document.querySelectorAll(".btn");
const operate = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
};

numbers.forEach((number) =>
  number.addEventListener("click", (e) => {
    const numbers = e.target.getAttribute("data-number");
    const operator = e.target.getAttribute("data-operator");
    const reset = e.target.getAttribute("data-reset");
    const equal = e.target.getAttribute("data-equal");

    if (numbers) {
      printNumber(numbers);
      inputValue += numbers;
    }

    if (operator) {
      eraseContent = true;

      if (calculateNumb) {
        inputArea.textContent = calculate();
      }
      calculateNumb = true;
      inputValue += operator;
    }
  })
);
