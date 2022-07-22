"use strict";
// Main Data Inputs
let areaInput = document.querySelector("#area-input");
let widthInput = document.querySelector("#width-input");
let heightInput = document.querySelector("#height-input");
let posInput = document.querySelector("#pos-input");
let profileInputs = document.querySelectorAll(".profile-inputs");

// Radio Btns
const radioIn = document.querySelector("#radio-in");
const radioOut = document.querySelector("#radio-out");
const inLabel = document.querySelector("#in-label");
const outLabel = document.querySelector("#out-label");

// Buttons
const formulaBtn = document.querySelector("#title-button");
const okBtn = document.querySelector("#ok-btn");
const resetSizes = document.querySelector("#reset-sizes");
const printBtn = document.querySelector("#print-button");
const masterReset = document.querySelector("#master-reset");

// Invisible elements like tables and divs
const mainTable = document.querySelector("#main-table");
const formulaDiv = document.querySelector("#formula-popup");
const outputTable = document.querySelector("#output-table");
const body = document.querySelector("body");
const outputDiv = document.querySelector(".output-div");
const buttonOptions = document.querySelector(".button-options");

// POS
const posBtn = document.querySelector("#pos-btn");
const posDropdown = document.querySelector("#pos-dropdown");
const rightBtn = document.querySelector("#right-btn");
const leftBtn = document.querySelector("#left-btn");

// INOUT
const inoutBtn = document.querySelector("#inout-btn");
const inoutDropdown = document.querySelector("#inout-dropdown");
const isBtn = document.querySelector("#is-btn");
const osBtn = document.querySelector("#os-btn");
////////////////////////////////////////
// OTHER VARIABLES
let serialNum = 0;
let formulaOption = "";
let formulaStr = "";
let formulaFunc;
let formulaTag = "";
let inOut = "";
let posVar = "";

let areaArr = [];
let widthArr = [];
let heightArr = [];
let posArr = [];

const hideAll = function () {
  formulaBtn.classList.add("hidden");
  mainTable.classList.add("hidden");
  buttonOptions.classList.add("hidden");

  document.querySelector("html").classList.add("print-mode");
  document.querySelector("body").classList.add("print-mode");

  document
    .querySelectorAll("table")
    .forEach((el) => el.classList.add("print-mode"));
  document
    .querySelectorAll("td")
    .forEach((el) => el.classList.add("print-mode"));

  document.querySelector("#output-header").style.color = "#000";

  document
    .querySelectorAll(".shown-ui")
    .forEach((el) => el.classList.add("hidden"));

  document
    .querySelectorAll("textarea")
    .forEach((el) => el.classList.add("print-mode"));
};

const showAll = function () {
  formulaBtn.classList.remove("hidden");
  mainTable.classList.remove("hidden");
  buttonOptions.classList.remove("hidden");

  document.querySelector("html").classList.remove("print-mode");
  document.querySelector("body").classList.remove("print-mode");

  document
    .querySelectorAll("table")
    .forEach((el) => el.classList.remove("print-mode"));
  document
    .querySelectorAll("td")
    .forEach((el) => el.classList.remove("print-mode"));

  document.querySelector("#output-header").style.color = "#cda274";

  document
    .querySelectorAll(".shown-ui")
    .forEach((el) => el.classList.remove("hidden"));

  document
    .querySelectorAll("textarea")
    .forEach((el) => el.classList.remove("print-mode"));
};
////////////////////////////////////////
// CODE STARTS HERE
rightBtn.addEventListener("click", function () {
  if (posVar !== "RIGHT") {
    posVar = "RIGHT";
    posBtn.textContent = posVar;

    leftBtn.classList.remove("selected");
    rightBtn.classList.add("selected");
  }
});

leftBtn.addEventListener("click", function () {
  if (posVar !== "LEFT") {
    posVar = "LEFT";
    posBtn.textContent = posVar;

    rightBtn.classList.remove("selected");
    leftBtn.classList.add("selected");
  }
});

isBtn.addEventListener("click", function () {
  if (inOut !== "IN") {
    inOut = "IN";
    inoutBtn.textContent = "INSIDE";

    osBtn.classList.remove("selected");
    this.classList.add("selected");
  }
});

osBtn.addEventListener("click", function () {
  if (inOut !== "OUT") {
    inOut = "OUT";
    inoutBtn.textContent = "OUTSIDE";

    isBtn.classList.remove("selected");
    this.classList.add("selected");
  }
});

resetSizes.addEventListener("click", function () {
  profileInputs.forEach((input) => {
    input.style.width = "150px";
    input.style.height = "30px";
  });
});

printBtn.addEventListener("click", function () {
  if (outputTable.rows.length <= 1) {
    alert("Make sure you input data before trying to enter print mode!");
  } else {
    hideAll();
  }
});

// Formula Selection

// Confirm Button
okBtn.addEventListener("click", function () {
  // Refreshes the inputs
  areaInput = document.querySelector("#area-input").value;
  widthInput = document.querySelector("#width-input").value.trim();
  heightInput = document.querySelector("#height-input").value.trim();

  //////////////////////////////
  // ERRORS

  // If inputs are empty
  if (
    areaInput.trim() === "" ||
    widthInput === "" ||
    heightInput === "" ||
    posVar === "" ||
    inOut === ""
  ) {
    alert("Please Make Sure ALL inputs are filled out");
  } else if (
    heightInput.split(" ").length > 2 ||
    widthInput.split(" ").length > 2
  ) {
    alert(
      'Make sure to input fractions in this format:\n"10 1/2" please be aware of spaces.\nThere is only one space between the number and the fraction.\nThe actual fraction should be written like "1/2" NOT "1 / 2"'
    );
  } else if (formulaOption === "") {
    alert("Please choose a valid formula option");
  } else if (
    (heightInput.split(" ").length === 1 && heightInput.includes("/")) ||
    (widthInput.split(" ").length === 1 && widthInput.includes("/"))
  ) {
    alert(
      'Make sure to input fractions in this format:\n"10 1/2" please be aware of spaces.\nThere is only one space between the number and the fraction.\nThe actual fraction should be written like "1/2" NOT "1 / 2"'
    );
  } else {
    let errors = false;

    if (heightInput.split(" ").length === 2) {
      if (
        heightInput.split(" ")[1] != "1/8" &&
        heightInput.split(" ")[1] != "2/8" &&
        heightInput.split(" ")[1] != "3/8" &&
        heightInput.split(" ")[1] != "4/8" &&
        heightInput.split(" ")[1] != "5/8" &&
        heightInput.split(" ")[1] != "6/8" &&
        heightInput.split(" ")[1] != "7/8" &&
        heightInput.split(" ")[1] != "1/4" &&
        heightInput.split(" ")[1] != "1/2" &&
        heightInput.split(" ")[1] != "3/4"
      ) {
        alert(
          "Please make sure HEIGHT fractions only consist of: \n1/8\n2/8 or 1/4\n3/8\n4/8 or 1/2\n5/8\n6/8 or 3/4\n7/8"
        );

        errors = true;
      }
    }

    if (widthInput.split(" ").length === 2) {
      if (
        widthInput.split(" ")[1] != "1/8" &&
        widthInput.split(" ")[1] != "2/8" &&
        widthInput.split(" ")[1] != "3/8" &&
        widthInput.split(" ")[1] != "4/8" &&
        widthInput.split(" ")[1] != "5/8" &&
        widthInput.split(" ")[1] != "6/8" &&
        widthInput.split(" ")[1] != "7/8" &&
        widthInput.split(" ")[1] != "1/4" &&
        widthInput.split(" ")[1] != "1/2" &&
        widthInput.split(" ")[1] != "3/4"
      ) {
        alert(
          "Please make sure WIDTH fractions only consist of: \n1/8\n2/8 or 1/4\n3/8\n4/8 or 1/2\n5/8\n6/8 or 3/4\n7/8"
        );

        errors = true;
      }
    }

    if (!errors) {
      const decimalAnswer = formulaFunc(
        inputFormmatter(widthInput),
        inputFormmatter(heightInput)
      );

      const answerArr = decimalAnswer.map((curValue) =>
        decimalToFraction(curValue)
      );

      serialNum++;

      outputTable.insertAdjacentHTML(
        "beforeend",
        tableCreator(answerArr, areaInput, widthInput, heightInput, posVar)
      );

      recalcFunc();

      // Resets Textboxes
      document.querySelector("#area-input").value = "";
      document.querySelector("#width-input").value = "";
      document.querySelector("#height-input").value = "";

      posVar = "";
      posBtn.textContent = "UNSELECTED";
      rightBtn.classList.remove("selected");
      leftBtn.classList.remove("selected");

      inOut = "";
      inoutBtn.textContent = "UNSELECTED";
      isBtn.classList.remove("selected");
      osBtn.classList.remove("selected");
    }
  }
  // Focuses on first textbox
  document.querySelector("#area-input").focus();
});

body.addEventListener("click", function (e) {
  if (e.target === formulaBtn) {
    formulaDiv.classList.toggle("hidden");
  } else {
    if (!formulaDiv.classList.contains("hidden"))
      formulaDiv.classList.add("hidden");
  }
});

body.addEventListener("click", function (e) {
  if (e.target === posBtn) {
    posDropdown.classList.toggle("hidden");
  } else {
    if (!posDropdown.classList.contains("hidden"))
      posDropdown.classList.add("hidden");
  }
});

body.addEventListener("click", function (e) {
  if (e.target === inoutBtn) {
    inoutDropdown.classList.toggle("hidden");
  } else {
    if (!inoutDropdown.classList.contains("hidden"))
      inoutDropdown.classList.add("hidden");
  }
});

body.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    showAll();
  }
});

////////////////////////////////////////
// FUNCTIONS

// Table string creator
function tableCreator(answerArr, area, rawWidth, rawHeight, pos) {
  const widthArr = rawWidth.split(" ");
  let width;
  if (widthArr.length === 2) {
    width = `${widthArr[0]} ${simplify(widthArr[1])}`;
  } else {
    width = rawWidth;
  }

  const heightArr = rawHeight.split(" ");
  let height;
  if (heightArr.length === 2) {
    height = `${heightArr[0]} ${simplify(heightArr[1])}`;
  } else {
    height = rawHeight;
  }

  switch (formulaTag) {
    case "TRI SHADEO":
      return `
    <tr contenteditable="" class="divrow-${serialNum}">
     <td><p class="output-data serial-cell-${serialNum}">${serialNum}</p></td>
     <td><p class="output-data">1</p></td>
     <td><p class="output-data area-cell-${serialNum}">${area}</p></td>
     <td><p class="output-data width-cell-${serialNum}">${width}</p></td>
     <td><p class="output-data height-cell-${serialNum}">${height}</p></td>
     <td><p class="output-data">${answerArr[0]}</p></td>
     <td><p class="output-data pos-cell-${serialNum}">${pos}</p></td>
     <td><p class="output-data">${answerArr[1]}</p></td>
     <td><p class="output-data">${answerArr[2]}</p></td>
     <td><p class="output-data">${answerArr[3]}</p></td>
     <td><p class="output-data">${answerArr[4]}</p></td>
     <td><p class="output-data">${answerArr[5]}</p></td>
     <td><p class="output-data">${answerArr[6]}</p></td>
     <td class="shown-ui"><button class="recalc-${serialNum}" contenteditable="false">Recalculate!</button></td>
     </tr>
  `;

    case "TRI SHADEO MOTOR":
      return `
      <tr contenteditable="" class="divrow-${serialNum}">
       <td><p class="output-data serial-cell-${serialNum}">${serialNum}</p></td>
       <td><p class="output-data">1</p></td>
       <td><p class="output-data area-cell-${serialNum}">${area}</p></td>
       <td><p class="output-data width-cell-${serialNum}">${width}</p></td>
       <td><p class="output-data height-cell-${serialNum}">${height}</p></td>
       <td><p class="output-data">${serialNum}</p></td>
       <td><p class="output-data pos-cell-${serialNum}">${pos}</p></td>
       <td><p class="output-data">${answerArr[0]}</p></td>
       <td><p class="output-data">${answerArr[1]}</p></td>
       <td><p class="output-data">${answerArr[2]}</p></td>
       <td><p class="output-data">${answerArr[3]}</p></td>
       <td><p class="output-data">${answerArr[4]}</p></td>
       <td><p class="output-data">${answerArr[5]}</p></td>
       <td class="shown-ui"><button class="recalc-${serialNum}" contenteditable="false">Recalculate!</button></td>
       </tr>
    `;

    case "TRI SHADES SMALL":
      return `
      <tr contenteditable="" class="divrow-${serialNum}">
       <td><p class="output-data serial-cell-${serialNum}">${serialNum}</p></td>
       <td><p class="output-data">1</p></td>
       <td><p class="output-data area-cell-${serialNum}">${area}</p></td>
       <td><p class="output-data width-cell-${serialNum}">${width}</p></td>
       <td><p class="output-data height-cell-${serialNum}">${height}</p></td>
       <td><p class="output-data">${answerArr[0]}</p></td>
       <td><p class="output-data pos-cell-${serialNum}">${pos}</p></td>
       <td><p class="output-data">${answerArr[1]}</p></td>
       <td><p class="output-data">${answerArr[2]}</p></td>
       <td><p class="output-data">${answerArr[3]}</p></td>
       <td><p class="output-data">${answerArr[4]}</p></td>
       <td><p class="output-data">${answerArr[5]}</p></td>
       <td><p class="output-data">${answerArr[6]}</p></td>
       <td class="shown-ui"><button class="recalc-${serialNum}" contenteditable="false">Recalculate!</button></td>
       </tr>
    `;

    case "TRI VERTILUX SQ MOTOR":
      return `
      <tr contenteditable="" class="divrow-${serialNum}">
       <td><p class="output-data serial-cell-${serialNum}">${serialNum}</p></td>
       <td><p class="output-data">1</p></td>
       <td><p class="output-data area-cell-${serialNum}">${area}</p></td>
       <td><p class="output-data width-cell-${serialNum}">${width}</p></td>
       <td><p class="output-data height-cell-${serialNum}">${height}</p></td>
       <td><p class="output-data">${serialNum}</p></td>
       <td><p class="output-data pos-cell-${serialNum}">${pos}</p></td>
       <td><p class="output-data">${answerArr[0]}</p></td>
       <td><p class="output-data">${answerArr[1]}</p></td>
       <td><p class="output-data">${answerArr[2]}</p></td>
       <td><p class="output-data">${answerArr[3]}</p></td>
       <td><p class="output-data">${answerArr[4]}</p></td>
       <td><p class="output-data">${answerArr[5]}</p></td>
       <td class="shown-ui"><button class="recalc-${serialNum}" contenteditable="false">Recalculate!</button></td>
       </tr>
    `;

    case "DUO VERTILUX SQ":
      return `
      <tr contenteditable="" class="divrow-${serialNum}">
       <td><p class="output-data serial-cell-${serialNum}">${serialNum}</p></td>
       <td><p class="output-data">1</p></td>
       <td><p class="output-data area-cell-${serialNum}">${area}</p></td>
       <td><p class="output-data width-cell-${serialNum}">${width}</p></td>
       <td><p class="output-data height-cell-${serialNum}">${height}</p></td>
       <td><p class="output-data">${answerArr[0]}</p></td>
       <td><p class="output-data pos-cell-${serialNum}">${pos}</p></td>
       <td><p class="output-data">${answerArr[1]}</p></td>
       <td><p class="output-data">${answerArr[2]}</p></td>
       <td><p class="output-data">${answerArr[3]}</p></td>
       <td><p class="output-data">${answerArr[4]}</p></td>
       <td><p class="output-data">${answerArr[5]}</p></td>
       <td><p class="output-data">${answerArr[6]}</p></td>
       <td><p class="output-data">${answerArr[7]}</p></td>
       <td class="shown-ui"><button class="recalc-${serialNum}" contenteditable="false">Recalculate!</button></td>
       </tr>
    `;

    case "DUO VERTILUX SQ MOTOR":
      return `
      <tr contenteditable="" class="divrow-${serialNum}">
       <td><p class="output-data serial-cell-${serialNum}">${serialNum}</p></td>
       <td><p class="output-data">1</p></td>
       <td><p class="output-data area-cell-${serialNum}">${area}</p></td>
       <td><p class="output-data width-cell-${serialNum}">${width}</p></td>
       <td><p class="output-data height-cell-${serialNum}">${height}</p></td>
       <td><p class="output-data">${serialNum}</p></td>
       <td><p class="output-data pos-cell-${serialNum}">${pos}</p></td>
       <td><p class="output-data">${answerArr[0]}</p></td>
       <td><p class="output-data">${answerArr[1]}</p></td>
       <td><p class="output-data">${answerArr[2]}</p></td>
       <td><p class="output-data">${answerArr[3]}</p></td>
       <td><p class="output-data">${answerArr[4]}</p></td>
       <td><p class="output-data">${answerArr[5]}</p></td>
       <td><p class="output-data">${answerArr[6]}</p></td>
       <td class="shown-ui"><button class="recalc-${serialNum}" contenteditable="false">Recalculate!</button></td>
       </tr>
    `;

    case "DUO SHADES MANUAL":
      return `
      <tr contenteditable="" class="divrow-${serialNum}">
       <td><p class="output-data serial-cell-${serialNum}">${serialNum}</p></td>
       <td><p class="output-data">1</p></td>
       <td><p class="output-data area-cell-${serialNum}">${area}</p></td>
       <td><p class="output-data width-cell-${serialNum}">${width}</p></td>
       <td><p class="output-data height-cell-${serialNum}">${height}</p></td>
       <td><p class="output-data">${answerArr[0]}</p></td>
       <td><p class="output-data pos-cell-${serialNum}">${pos}</p></td>
       <td><p class="output-data">${answerArr[1]}</p></td>
       <td><p class="output-data">${answerArr[2]}</p></td>
       <td><p class="output-data">${answerArr[3]}</p></td>
       <td><p class="output-data">${answerArr[4]}</p></td>
       <td><p class="output-data">${answerArr[5]}</p></td>
       <td><p class="output-data">${answerArr[6]}</p></td>
       <td><p class="output-data">${answerArr[7]}</p></td>
       <td class="shown-ui"><button class="recalc-${serialNum}" contenteditable="false">Recalculate!</button></td>
       </tr>
    `;

    case "DUO SHADES MOTORIZED":
      return `
      <tr contenteditable="" class="divrow-${serialNum}">
       <td><p class="output-data serial-cell-${serialNum}">${serialNum}</p></td>
       <td><p class="output-data">1</p></td>
       <td><p class="output-data area-cell-${serialNum}">${area}</p></td>
       <td><p class="output-data width-cell-${serialNum}">${width}</p></td>
       <td><p class="output-data height-cell-${serialNum}">${height}</p></td>
       <td><p class="output-data">${serialNum}</p></td>
       <td><p class="output-data pos-cell-${serialNum}">${pos}</p></td>
       <td><p class="output-data">${answerArr[0]}</p></td>
       <td><p class="output-data">${answerArr[1]}</p></td>
       <td><p class="output-data">${answerArr[2]}</p></td>
       <td><p class="output-data">${answerArr[3]}</p></td>
       <td><p class="output-data">${answerArr[4]}</p></td>
       <td><p class="output-data">${answerArr[5]}</p></td>
       <td><p class="output-data">${answerArr[6]}</p></td>
       <td class="shown-ui"><button class="recalc-${serialNum}" contenteditable="false">Recalculate!</button></td>
       </tr>
    `;

    case "ROLLER SHADEO":
      return `
      <tr contenteditable="" class="divrow-${serialNum}">
       <td><p class="output-data serial-cell-${serialNum}">${serialNum}</p></td>
       <td><p class="output-data">1</p></td>
       <td><p class="output-data area-cell-${serialNum}">${area}</p></td>
       <td><p class="output-data width-cell-${serialNum}">${width}</p></td>
       <td><p class="output-data height-cell-${serialNum}">${height}</p></td>
       <td><p class="output-data">${answerArr[0]}</p></td>
       <td><p class="output-data pos-cell-${serialNum}">${pos}</p></td>
       <td><p class="output-data">${answerArr[1]}</p></td>
       <td><p class="output-data">${answerArr[2]}</p></td>
       <td><p class="output-data">${answerArr[3]}</p></td>
       <td><p class="output-data">${answerArr[4]}</p></td>
       <td><p class="output-data">${answerArr[5]}</p></td>
       <td><p class="output-data">${answerArr[6]}</p></td>
       <td class="shown-ui"><button class="recalc-${serialNum}" contenteditable="false">Recalculate!</button></td>
       </tr>
    `;

    case "ROLLER VER SQ MANUAL":
      return `
      <tr contenteditable="" class="divrow-${serialNum}">
       <td><p class="output-data serial-cell-${serialNum}">${serialNum}</p></td>
       <td><p class="output-data">1</p></td>
       <td><p class="output-data area-cell-${serialNum}">${area}</p></td>
       <td><p class="output-data width-cell-${serialNum}">${width}</p></td>
       <td><p class="output-data height-cell-${serialNum}">${height}</p></td>
       <td><p class="output-data">${answerArr[0]}</p></td>
       <td><p class="output-data pos-cell-${serialNum}">${pos}</p></td>
       <td><p class="output-data">${answerArr[1]}</p></td>
       <td><p class="output-data">${answerArr[2]}</p></td>
       <td><p class="output-data">${answerArr[3]}</p></td>
       <td><p class="output-data">${answerArr[4]}</p></td>
       <td><p class="output-data">${answerArr[5]}</p></td>
       <td><p class="output-data">${answerArr[6]}</p></td>
       <td class="shown-ui"><button class="recalc-${serialNum}" contenteditable="false">Recalculate!</button></td>
       </tr>
    `;

    case "ROLLER VER SQ MOTOR":
      return `
      <tr contenteditable="" class="divrow-${serialNum}">
       <td><p class="output-data serial-cell-${serialNum}">${serialNum}</p></td>
       <td><p class="output-data">1</p></td>
       <td><p class="output-data area-cell-${serialNum}">${area}</p></td>
       <td><p class="output-data width-cell-${serialNum}">${width}</p></td>
       <td><p class="output-data height-cell-${serialNum}">${height}</p></td>
       <td><p class="output-data">${serialNum}</p></td>
       <td><p class="output-data pos-cell-${serialNum}">${pos}</p></td>
       <td><p class="output-data">${answerArr[0]}</p></td>
       <td><p class="output-data">${answerArr[1]}</p></td>
       <td><p class="output-data">${answerArr[2]}</p></td>
       <td><p class="output-data">${answerArr[3]}</p></td>
       <td><p class="output-data">${answerArr[4]}</p></td>
       <td><p class="output-data">${answerArr[5]}</p></td>
       <td class="shown-ui"><button class="recalc-${serialNum}" contenteditable="false">Recalculate!</button></td>
       </tr>
    `;

    case "VERTILUX OPEN ROLLER":
      return `
      <tr contenteditable="" class="divrow-${serialNum}">
       <td><p class="output-data serial-cell-${serialNum}">${serialNum}</p></td>
       <td><p class="output-data">1</p></td>
       <td><p class="output-data area-cell-${serialNum}">${area}</p></td>
       <td><p class="output-data width-cell-${serialNum}">${width}</p></td>
       <td><p class="output-data height-cell-${serialNum}">${height}</p></td>
       <td><p class="output-data">${answerArr[0]}</p></td>
       <td><p class="output-data pos-cell-${serialNum}">${pos}</p></td>
       <td><p class="output-data">${answerArr[1]}</p></td>
       <td><p class="output-data">${answerArr[2]}</p></td>
       <td><p class="output-data">${answerArr[3]}</p></td>
       <td><p class="output-data">${answerArr[4]}</p></td>
       <td><p class="output-data">${answerArr[5]}</p></td>
       <td class="shown-ui"><button class="recalc-${serialNum}" contenteditable="false">Recalculate!</button></td>
       </tr>
    `;

    default:
      alert("ERROR 404 TAG NOT FOUND, LINE 544, REPORT TO ADMIN");
      break;
  }
}

// input formmatter is nice
function inputFormmatter(rawInput) {
  if (rawInput.includes(" ")) {
    // Splits the input into an array containing the whole num and fraction
    const rawArr = rawInput.split(" ");

    // Will make the fraction and the number into a number value
    const numArr = rawArr.map((value) => eval(value));

    // Pushes the number + the decimal
    return numArr[0] + numArr[1];

    // If measurement is a single Number
  } else {
    return Number(rawInput);
  }
}

// Proccesses input with formulas
function decimalToFraction(rawData) {
  // If the output of the math has a decimal value
  if (String(rawData).includes(".")) {
    // Splits the calculated product into a array
    const calcOutput = String(rawData).split(".");

    // If the output is a repeating decimal
    if (String(calcOutput[1]).length >= 10) {
      if (Number(String(calcOutput[1][0])) >= 5) {
        return String(Number(calcOutput[0]) + 1);
      } else {
        return calcOutput[0];
      }
    } else {
      // Gets the place value and makes it the denominator
      const placeValue = "1" + "0".repeat(calcOutput[1].length);

      const rawFraction = `${calcOutput[1]}/${placeValue}`;

      const answer = `${calcOutput[0]} ${simplify(rawFraction)}`;

      return answer;
    }

    // If the output of the math is a single number
  } else {
    // Converted to string to match other condition
    return String(rawData);
  }
}

// Decimals To Fractions
function simplify(str) {
  // Stores the answer
  let result = "";
  // Splits fraction into array
  let data = str.split("/");
  // Selects the data
  let numOne = Number(data[0]);
  let numTwo = Number(data[1]);
  // loops over the highest value to look for the GCD
  for (let i = Math.max(numOne, numTwo); i > 1; i--) {
    if (numOne % i == 0 && numTwo % i == 0) {
      numOne /= i;
      numTwo /= i;
    }
  }
  // If the result is something like 6/1 which is basically just 6
  if (numTwo === 1) {
    result = numOne.toString();
    // If the result is just a rational fraction
  } else {
    result = numOne.toString() + "/" + numTwo.toString();
  }
  return result;
}

// Recalculate Button
// -UNFINISHED-
function recalcFunc() {
  const recalcBtn = document.querySelector(`.recalc-${serialNum}`);
  let recalcArea = document.querySelector(`.area-cell-${serialNum}`);
  let recalcWidth = document.querySelector(`.width-cell-${serialNum}`);
  let recalcHeight = document.querySelector(`.height-cell-${serialNum}`);
  let recalcPos = document.querySelector(`.pos-cell-${serialNum}`);

  recalcBtn.addEventListener("click", function () {
    // Refreshes the inputs
    recalcArea = document.querySelector(`.area-cell-${serialNum}`).value;
    recalcWidth = document
      .querySelector(`.width-cell-${serialNum}`)
      .value.trim();
    recalcHeight = document
      .querySelector(`.height-cell-${serialNum}`)
      .value.trim();

    // If inputs are empty
    if (
      areaInput.trim() === "" ||
      widthInput === "" ||
      heightInput === "" ||
      posVar === "" ||
      inOut === ""
    ) {
      alert("Please Make Sure ALL inputs are filled out");
    } else if (
      heightInput.split(" ").length > 2 ||
      widthInput.split(" ").length > 2
    ) {
      alert(
        'Make sure to input fractions in this format:\n"10 1/2" please be aware of spaces.\nThere is only one space between the number and the fraction.\nThe actual fraction should be written like "1/2" NOT "1 / 2"'
      );
    } else if (formulaOption === "") {
      alert("Please choose a valid formula option");
    } else if (
      (heightInput.split(" ").length === 1 && heightInput.includes("/")) ||
      (widthInput.split(" ").length === 1 && widthInput.includes("/"))
    ) {
      alert(
        'Make sure to input fractions in this format:\n"10 1/2" please be aware of spaces.\nThere is only one space between the number and the fraction.\nThe actual fraction should be written like "1/2" NOT "1 / 2"'
      );
    } else {
      let errors = false;

      if (heightInput.split(" ").length === 2) {
        if (
          heightInput.split(" ")[1] != "1/8" &&
          heightInput.split(" ")[1] != "2/8" &&
          heightInput.split(" ")[1] != "3/8" &&
          heightInput.split(" ")[1] != "4/8" &&
          heightInput.split(" ")[1] != "5/8" &&
          heightInput.split(" ")[1] != "6/8" &&
          heightInput.split(" ")[1] != "7/8" &&
          heightInput.split(" ")[1] != "1/4" &&
          heightInput.split(" ")[1] != "1/2" &&
          heightInput.split(" ")[1] != "3/4"
        ) {
          alert(
            "Please make sure HEIGHT fractions only consist of: \n1/8\n2/8 or 1/4\n3/8\n4/8 or 1/2\n5/8\n6/8 or 3/4\n7/8"
          );

          errors = true;
        }
      }

      if (widthInput.split(" ").length === 2) {
        if (
          widthInput.split(" ")[1] != "1/8" &&
          widthInput.split(" ")[1] != "2/8" &&
          widthInput.split(" ")[1] != "3/8" &&
          widthInput.split(" ")[1] != "4/8" &&
          widthInput.split(" ")[1] != "5/8" &&
          widthInput.split(" ")[1] != "6/8" &&
          widthInput.split(" ")[1] != "7/8" &&
          widthInput.split(" ")[1] != "1/4" &&
          widthInput.split(" ")[1] != "1/2" &&
          widthInput.split(" ")[1] != "3/4"
        ) {
          alert(
            "Please make sure WIDTH fractions only consist of: \n1/8\n2/8 or 1/4\n3/8\n4/8 or 1/2\n5/8\n6/8 or 3/4\n7/8"
          );

          errors = true;
        }
      }

      if (!errors) {
        const decimalAnswer = formulaFunc(
          inputFormmatter(widthInput),
          inputFormmatter(heightInput)
        );

        const answerArr = decimalAnswer.map((curValue) =>
          decimalToFraction(curValue)
        );

        serialNum++;

        outputTable.insertAdjacentHTML(
          "beforeend",
          tableCreator(answerArr, areaInput, widthInput, heightInput, posVar)
        );
      }
    }
  });
}

// Table Recalculator
// -UNFINISHED-
function recalcTableFunc() {
  areaArr = [];
  widthArr = [];
  heightArr = [];
  posArr = [];

  for (let i = 1; i < outputTable.rows.length; i++) {
    areaArr.push(document.querySelector(`.area-cell-${i}`).textContent);
    widthArr.push(
      document.querySelector(`.width-cell-${i}`).textContent.trim()
    );
    heightArr.push(
      document.querySelector(`.height-cell-${i}`).textContent.trim()
    );
    posArr.push(document.querySelector(`.pos-cell-${i}`).textContent.trim());
  }

  outputTable.innerHTML = "";

  for (let i = 0; i < widthArr.length; i++) {
    const decimalAnswer = formulaFunc(
      inputFormmatter(widthArr[i]),
      inputFormmatter(heightArr[i])
    );

    const answerArr = decimalAnswer.map((curValue) =>
      decimalToFraction(curValue)
    );

    serialNum = i + 1;

    outputTable.insertAdjacentHTML(
      "beforeend",
      tableCreator(answerArr, areaArr[i], widthArr[i], heightArr[i], posArr[i])
    );
  }
}
///////////////////////////////////////////////////////////////////////////
// FORMULAS

// All formula btns
const allFormulaBtns = document.querySelectorAll(".formula-btn");

// Formula Btns

const triShadeoBtn = document.querySelector("#tri-shadeo");
const triShadeoMotorBtn = document.querySelector("#tri-shadeo-motor");
const triShadeoSmallBtn = document.querySelector("#tri-shadeo-small");
const triVertiSqMotorBtn = document.querySelector("#tri-verti-sq-motor");

const duoVertiluxSqBtn = document.querySelector("#duo-shadeo-sq");
const duoVertiSqMotorBtn = document.querySelector("#duo-verti-sq-motor");
const duoShadesManualBtn = document.querySelector("#duo-shades-manual");
const duoShadesMotorBtn = document.querySelector("#duo-shades-motor");

const rollerShadeoBtn = document.querySelector("#roller-shadeo");
const rollerVerSqManualBtn = document.querySelector("#roller-ver-sq-manual");
const rollerVerSqMotorBtn = document.querySelector("#roller-ver-sq-motor");
const vertiOpenRollerBtn = document.querySelector("#verti-open-roller");

// Output Header
const outputHeader = document.querySelector("#output-header");

//////////////////////////

triShadeoBtn.addEventListener("click", function () {
  // Removes selected value from other buttons
  allFormulaBtns.forEach((curBtn) => curBtn.classList.remove("selected"));

  // Makes itself selected
  this.classList.add("selected");

  // Adjusts selected formulas
  formulaOption = "TRI SHADES ( SHADEO Fascia & Clutch ) MANUAL";
  formulaFunc = triShadeoFunc;
  formulaTag = "TRI SHADEO";

  // Changes button and header text
  formulaBtn.textContent = formulaTag;
  outputHeader.textContent = formulaOption;

  if (outputTable.rows.length > 1) recalcTableFunc();
  else outputTable.innerHTML = "";

  outputTable.insertAdjacentHTML(
    "afterbegin",
    `
    <tr>
      <td class="output-titles">Serial</td>
      <td class="output-titles">QTY</td>
      <td class="output-titles">Area</td>
      <td class="output-titles">Width</td>
      <td class="output-titles">Height</td>
      <td class="output-titles">Cord</td>
      <td class="output-titles">POS</td>
      <td class="output-titles">Shades</td>
      <td class="output-titles">Fascia</td>
      <td class="output-titles">Tube</td>
      <td class="output-titles">Bottom Rail</td>
      <td class="output-titles">Fabric W</td>
      <td class="output-titles">Fabric H</td>
      <td class="shown-ui">Misc Buttons</td>
    </tr>
    `
  );
});

//////////////////////////

triShadeoMotorBtn.addEventListener("click", function () {
  allFormulaBtns.forEach((curBtn) => curBtn.classList.remove("selected"));

  // Makes itself selected
  this.classList.add("selected");

  // Adjusts selected formulas
  formulaOption = "TRI SHADES ( SHADEO Fascia & Clutch ) MOTORZIED";
  formulaFunc = triShadeoMotorFunc;
  formulaTag = "TRI SHADEO MOTOR";

  // Changes button and header text
  formulaBtn.textContent = formulaTag;
  outputHeader.textContent = formulaOption;

  if (outputTable.rows.length > 1) recalcTableFunc();
  else outputTable.innerHTML = "";

  outputTable.insertAdjacentHTML(
    "afterbegin",
    `
    <tr>
      <td class="output-titles">Serial</td>
      <td class="output-titles">QTY</td>
      <td class="output-titles">Area</td>
      <td class="output-titles">Width</td>
      <td class="output-titles">Height</td>
      <td class="output-titles">Channel</td>
      <td class="output-titles">POS</td>
      <td class="output-titles">Shades</td>
      <td class="output-titles">Fascia</td>
      <td class="output-titles">Tube</td>
      <td class="output-titles">Bottom Rail</td>
      <td class="output-titles">Fabric W</td>
      <td class="output-titles">Fabric H</td>
      <td class="shown-ui">Misc Buttons</td>
    </tr>
    `
  );
});

//////////////////////////

triShadeoSmallBtn.addEventListener("click", function () {
  // Removes selected value from other buttons
  allFormulaBtns.forEach((curBtn) => curBtn.classList.remove("selected"));

  // Makes itself selected
  this.classList.add("selected");

  // Adjusts selected formulas
  formulaOption = "TRI SHADES SMALL ( SHADEO Fascia & Clutch ) MANUAL";
  formulaFunc = triShadeoSmallFunc;
  formulaTag = "TRI SHADES SMALL";

  // Changes button and header text
  formulaBtn.textContent = formulaTag;
  outputHeader.textContent = formulaOption;

  if (outputTable.rows.length > 1) recalcTableFunc();
  else outputTable.innerHTML = "";

  outputTable.insertAdjacentHTML(
    "afterbegin",
    `
    <tr>
      <td class="output-titles">Serial</td>
      <td class="output-titles">QTY</td>
      <td class="output-titles">Area</td>
      <td class="output-titles">Width</td>
      <td class="output-titles">Height</td>
      <td class="output-titles">Cord</td>
      <td class="output-titles">POS</td>
      <td class="output-titles">Shades</td>
      <td class="output-titles">Fascia</td>
      <td class="output-titles">Tube</td>
      <td class="output-titles">Bottom Rail</td>
      <td class="output-titles">Fabric W</td>
      <td class="output-titles">Fabric H</td>
      <td class="shown-ui">Misc Buttons</td>
    </tr>
    `
  );
});

//////////////////////////

triVertiSqMotorBtn.addEventListener("click", function () {
  // Removes selected value from other buttons
  allFormulaBtns.forEach((curBtn) => curBtn.classList.remove("selected"));

  // Makes itself selected
  this.classList.add("selected");

  // Adjusts selected formulas
  formulaOption = "TRI SHADES ( SQUARE VERTILUX Fascia & Clutch ) MOTORIZED";
  formulaFunc = triVertiluxSQMotorFunc;
  formulaTag = "TRI VERTILUX SQ MOTOR";

  // Changes button and header text
  formulaBtn.textContent = formulaTag;
  outputHeader.textContent = formulaOption;

  if (outputTable.rows.length > 1) recalcTableFunc();
  else outputTable.innerHTML = "";

  outputTable.insertAdjacentHTML(
    "afterbegin",
    `
    <tr>
      <td class="output-titles">Serial</td>
      <td class="output-titles">QTY</td>
      <td class="output-titles">Area</td>
      <td class="output-titles">Width</td>
      <td class="output-titles">Height</td>
      <td class="output-titles">Channel</td>
      <td class="output-titles">POS</td>
      <td class="output-titles">Shades</td>
      <td class="output-titles">Fascia</td>
      <td class="output-titles">Tube</td>
      <td class="output-titles">Bottom Rail</td>
      <td class="output-titles">Fabric W</td>
      <td class="output-titles">Fabric H</td>
      <td class="shown-ui">Misc Buttons</td>
    </tr>
    `
  );
});

//////////////////////////

duoVertiluxSqBtn.addEventListener("click", function () {
  // Removes selected value from other buttons
  allFormulaBtns.forEach((curBtn) => curBtn.classList.remove("selected"));

  // Makes itself selected
  this.classList.add("selected");

  // Adjusts selected formulas
  formulaOption = "DUO SHADES ( SQUARE VERTILUX Fascia & Clutch ) MANUAL";
  formulaFunc = duoVertiluxSQFunc;
  formulaTag = "DUO VERTILUX SQ";

  // Changes button and header text
  formulaBtn.textContent = formulaTag;
  outputHeader.textContent = formulaOption;

  if (outputTable.rows.length > 1) recalcTableFunc();
  else outputTable.innerHTML = "";

  outputTable.insertAdjacentHTML(
    "afterbegin",
    `
    <tr>
      <td class="output-titles">Serial</td>
      <td class="output-titles">QTY</td>
      <td class="output-titles">Area</td>
      <td class="output-titles">Width</td>
      <td class="output-titles">Height</td>
      <td class="output-titles">Cord</td>
      <td class="output-titles">POS</td>
      <td class="output-titles">Shades</td>
      <td class="output-titles">Fascia</td>
      <td class="output-titles">Tube</td>
      <td class="output-titles">Bottom Rail</td>
      <td class="output-titles">Bottom Tube</td>
      <td class="output-titles">Fabric W</td>
      <td class="output-titles">Fabric H</td>
      <td class="shown-ui">Misc Buttons</td>
    </tr>
    `
  );
});

//////////////////////////

duoVertiSqMotorBtn.addEventListener("click", function () {
  // Removes selected value from other buttons
  allFormulaBtns.forEach((curBtn) => curBtn.classList.remove("selected"));

  // Makes itself selected
  this.classList.add("selected");

  // Adjusts selected formulas
  formulaOption = "DUO SHADES ( SQUARE VERTILUX Fascia & Clutch ) MOTORIZED";
  formulaFunc = duoVertiluxSQMotorFunc;
  formulaTag = "DUO VERTILUX SQ MOTOR";

  // Changes button and header text
  formulaBtn.textContent = formulaTag;
  outputHeader.textContent = formulaOption;

  if (outputTable.rows.length > 1) recalcTableFunc();
  else outputTable.innerHTML = "";

  outputTable.insertAdjacentHTML(
    "afterbegin",
    `
    <tr>
      <td class="output-titles">Serial</td>
      <td class="output-titles">QTY</td>
      <td class="output-titles">Area</td>
      <td class="output-titles">Width</td>
      <td class="output-titles">Height</td>
      <td class="output-titles">Channel</td>
      <td class="output-titles">POS</td>
      <td class="output-titles">Shades</td>
      <td class="output-titles">Fascia</td>
      <td class="output-titles">Tube</td>
      <td class="output-titles">Bottom Rail</td>
      <td class="output-titles">Bottom Tube</td>
      <td class="output-titles">Fabric W</td>
      <td class="output-titles">Fabric H</td>
      <td class="shown-ui">Misc Buttons</td>
    </tr>
    `
  );
});

//////////////////////////

duoShadesManualBtn.addEventListener("click", function () {
  // Removes selected value from other buttons
  allFormulaBtns.forEach((curBtn) => curBtn.classList.remove("selected"));

  // Makes itself selected
  this.classList.add("selected");

  // Adjusts selected formulas
  formulaOption = "DUO SHADES ( SHADEO Fascia & Clutch ) MANUAL";
  formulaFunc = duoShadesManualFunc;
  formulaTag = "DUO SHADES MANUAL";

  // Changes button and header text
  formulaBtn.textContent = formulaTag;
  outputHeader.textContent = formulaOption;

  if (outputTable.rows.length > 1) recalcTableFunc();
  else outputTable.innerHTML = "";

  outputTable.insertAdjacentHTML(
    "afterbegin",
    `
    <tr>
      <td class="output-titles">Serial</td>
      <td class="output-titles">QTY</td>
      <td class="output-titles">Area</td>
      <td class="output-titles">Width</td>
      <td class="output-titles">Height</td>
      <td class="output-titles">Cord</td>
      <td class="output-titles">POS</td>
      <td class="output-titles">Shades</td>
      <td class="output-titles">Fascia</td>
      <td class="output-titles">Tube</td>
      <td class="output-titles">Bottom Rail</td>
      <td class="output-titles">Bottom Tube</td>
      <td class="output-titles">Fabric W</td>
      <td class="output-titles">Fabric H</td>
      <td class="shown-ui">Misc Buttons</td>
    </tr>
    `
  );
});

//////////////////////////

duoShadesMotorBtn.addEventListener("click", function () {
  // Removes selected value from other buttons
  allFormulaBtns.forEach((curBtn) => curBtn.classList.remove("selected"));

  // Makes itself selected
  this.classList.add("selected");

  // Adjusts selected formulas
  formulaOption = "DUO SHADES ( SHADEO Fascia & Clutch ) MOTORIZIED";
  formulaFunc = duoShadesMotorFunc;
  formulaTag = "DUO SHADES MOTORIZED";

  // Changes button and header text
  formulaBtn.textContent = formulaTag;
  outputHeader.textContent = formulaOption;

  if (outputTable.rows.length > 1) recalcTableFunc();
  else outputTable.innerHTML = "";

  outputTable.insertAdjacentHTML(
    "afterbegin",
    `
    <tr>
      <td class="output-titles">Serial</td>
      <td class="output-titles">QTY</td>
      <td class="output-titles">Area</td>
      <td class="output-titles">Width</td>
      <td class="output-titles">Height</td>
      <td class="output-titles">Channel</td>
      <td class="output-titles">POS</td>
      <td class="output-titles">Shades</td>
      <td class="output-titles">Fascia</td>
      <td class="output-titles">Tube</td>
      <td class="output-titles">Bottom Rail</td>
      <td class="output-titles">Bottom Tube</td>
      <td class="output-titles">Fabric W</td>
      <td class="output-titles">Fabric H</td>
      <td class="shown-ui">Misc Buttons</td>
    </tr>
    `
  );
});

//////////////////////////

rollerShadeoBtn.addEventListener("click", function () {
  // Removes selected value from other buttons
  allFormulaBtns.forEach((curBtn) => curBtn.classList.remove("selected"));

  // Makes itself selected
  this.classList.add("selected");

  // Adjusts selected formulas
  formulaOption = "ROLLER SHADES ( SHADEO Fascia & Clutch ) MANUAL";
  formulaFunc = rollerShadeoFunc;
  formulaTag = "ROLLER SHADEO";

  // Changes button and header text
  formulaBtn.textContent = formulaTag;
  outputHeader.textContent = formulaOption;

  if (outputTable.rows.length > 1) recalcTableFunc();
  else outputTable.innerHTML = "";

  outputTable.insertAdjacentHTML(
    "afterbegin",
    `
    <tr>
      <td class="output-titles">Serial</td>
      <td class="output-titles">QTY</td>
      <td class="output-titles">Area</td>
      <td class="output-titles">Width</td>
      <td class="output-titles">Height</td>
      <td class="output-titles">Channel</td>
      <td class="output-titles">POS</td>
      <td class="output-titles">Shades</td>
      <td class="output-titles">Fascia</td>
      <td class="output-titles">Tube</td>
      <td class="output-titles">Bottom Rail</td>
      <td class="output-titles">Fabric W</td>
      <td class="output-titles">Fabric H</td>
      <td class="shown-ui">Misc Buttons</td>
    </tr>
    `
  );
});

//////////////////////////

rollerVerSqManualBtn.addEventListener("click", function () {
  // Removes selected value from other buttons
  allFormulaBtns.forEach((curBtn) => curBtn.classList.remove("selected"));

  // Makes itself selected
  this.classList.add("selected");

  // Adjusts selected formulas
  formulaOption = "ROLLER SHADES ( VERTILUX SQUARE Fascia & Clutch )";
  formulaFunc = rollerVerSQManualFunc;
  formulaTag = "ROLLER VER SQ MANUAL";

  // Changes button and header text
  formulaBtn.textContent = formulaTag;
  outputHeader.textContent = formulaOption;

  if (outputTable.rows.length > 1) recalcTableFunc();
  else outputTable.innerHTML = "";

  outputTable.insertAdjacentHTML(
    "afterbegin",
    `
    <tr>
      <td class="output-titles">Serial</td>
      <td class="output-titles">QTY</td>
      <td class="output-titles">Area</td>
      <td class="output-titles">Width</td>
      <td class="output-titles">Height</td>
      <td class="output-titles">Cord</td>
      <td class="output-titles">POS</td>
      <td class="output-titles">Shades</td>
      <td class="output-titles">Fascia</td>
      <td class="output-titles">Tube</td>
      <td class="output-titles">Bottom Rail</td>
      <td class="output-titles">Fabric W</td>
      <td class="output-titles">Fabric H</td>
      <td class="shown-ui">Misc Buttons</td>
    </tr>
    `
  );
});

//////////////////////////

rollerVerSqMotorBtn.addEventListener("click", function () {
  // Removes selected value from other buttons
  allFormulaBtns.forEach((curBtn) => curBtn.classList.remove("selected"));

  // Makes itself selected
  this.classList.add("selected");

  // Adjusts selected formulas
  formulaOption = "ROLLER SHADES ( VERTILUX SQUARE Fascia & Clutch ) MOTORIZED";
  formulaFunc = rollerVerSQMotorFunc;
  formulaTag = "ROLLER VER SQ MOTOR";

  // Changes button and header text
  formulaBtn.textContent = formulaTag;
  outputHeader.textContent = formulaOption;

  if (outputTable.rows.length > 1) recalcTableFunc();
  else outputTable.innerHTML = "";

  outputTable.insertAdjacentHTML(
    "afterbegin",
    `
    <tr>
      <td class="output-titles">Serial</td>
      <td class="output-titles">QTY</td>
      <td class="output-titles">Area</td>
      <td class="output-titles">Width</td>
      <td class="output-titles">Height</td>
      <td class="output-titles">Channel</td>
      <td class="output-titles">POS</td>
      <td class="output-titles">Shades</td>
      <td class="output-titles">Fascia</td>
      <td class="output-titles">Tube</td>
      <td class="output-titles">Bottom Rail</td>
      <td class="output-titles">Fabric W</td>
      <td class="output-titles">Fabric H</td>
      <td class="shown-ui">Misc Buttons</td>
    </tr>
    `
  );
});

//////////////////////////

vertiOpenRollerBtn.addEventListener("click", function () {
  // Removes selected value from other buttons
  allFormulaBtns.forEach((curBtn) => curBtn.classList.remove("selected"));

  // Makes itself selected
  this.classList.add("selected");

  // Adjusts selected formulas
  formulaOption = "VERTILUX OPEN ROLLER, MANUAL";
  formulaFunc = vertiOpenRollerFunc;
  formulaTag = "VERTILUX OPEN ROLLER";

  // Changes button and header text
  formulaBtn.textContent = formulaTag;
  outputHeader.textContent = formulaOption;

  if (outputTable.rows.length > 1) recalcTableFunc();
  else outputTable.innerHTML = "";

  outputTable.insertAdjacentHTML(
    "afterbegin",
    `
    <tr>
      <td class="output-titles">Serial</td>
      <td class="output-titles">QTY</td>
      <td class="output-titles">Area</td>
      <td class="output-titles">Width</td>
      <td class="output-titles">Height</td>
      <td class="output-titles">Chain</td>
      <td class="output-titles">POS</td>
      <td class="output-titles">Shades</td>
      <td class="output-titles">Tube</td>
      <td class="output-titles">Bottom Rail</td>
      <td class="output-titles">Fabric W</td>
      <td class="output-titles">Fabric H</td>
      <td class="shown-ui">Misc Buttons</td>
    </tr>
    `
  );
});

////////////////////////////////////////////////////
// Formula functions
// if out + 1/4

function triShadeoFunc(width, height) {
  const cord = (height * 2) / 3;
  const shades = inOut === "IN" ? width - 1 / 4 : width;
  const fascia = width - 7 / 16 - 1 / 8 + (inOut === "IN" ? 0 : 1 / 4);
  const bottomRail =
    fascia - 12 / 16 + 1 / 4 - 1 / 8 + (inOut === "IN" ? 0 : 1 / 4);
  const tube = bottomRail + 1 / 8 - 1 / 4 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricW = shades - 1.25 + 1 / 4 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricH = height + 7 / 8 + 1 / 16 + (inOut === "IN" ? 0 : 1 / 4);

  return [cord, shades, fascia, tube, bottomRail, fabricW, fabricH];
}

function triShadeoMotorFunc(width, height) {
  const shades = inOut === "IN" ? width - 1 / 4 : width;
  const fascia = width - 7 / 16 + (inOut === "IN" ? 0 : 1 / 4);
  const tube = width - 15 / 16 + (inOut === "IN" ? 0 : 1 / 4);
  const bottomRail = fascia - 12 / 16 + 1 / 4 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricW = width - 15 / 16 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricH = height + 7 / 8 + 1 / 16 + (inOut === "IN" ? 0 : 1 / 4);

  return [shades, fascia, tube, bottomRail, fabricW, fabricH];
}

function triShadeoSmallFunc(width, height) {
  const cord = (height * 2) / 3;
  const shades = inOut === "IN" ? width - 1 / 8 : width;
  const fascia = width - 7 / 16 + (inOut === "IN" ? 0 : 1 / 4);
  const bottomRail = fascia - 12 / 16 + 1 / 4 + (inOut === "IN" ? 0 : 1 / 4);
  const tube = bottomRail + 1 / 8 - 1 / 4 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricW = shades - 1.25 + 1 / 4 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricH =
    height + 7 / 8 + 1 / 8 + 1 / 16 + (inOut === "IN" ? 0 : 1 / 4);

  return [cord, shades, fascia, tube, bottomRail, fabricW, fabricH];
}

function triVertiluxSQMotorFunc(width, height) {
  const shades = inOut === "IN" ? width - 1 / 4 : width;
  const fascia = width - 9 / 16 + (inOut === "IN" ? 0 : 1 / 4);
  const tube = width - 1.375 + (inOut === "IN" ? 0 : 1 / 4);
  const bottomRail = width - 1.375 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricW = width - 1.375 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricH = height + 15 / 16 + (inOut === "IN" ? 0 : 1 / 4);

  return [shades, fascia, tube, bottomRail, fabricW, fabricH];
}

function duoVertiluxSQFunc(width, height) {
  const cord = (height * 2) / 3;
  const shades = inOut === "IN" ? width - 1 / 4 : width;
  const fascia = width - 9 / 16 + (inOut === "IN" ? 0 : 1 / 4);
  const tube = width - 1.375 + (inOut === "IN" ? 0 : 1 / 4);
  const bottomRail = tube + 1 / 16 + (inOut === "IN" ? 0 : 1 / 4);
  const bottomTube = tube - 1 / 16 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricW = width - 1.375 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricH = height + 1.5 + (inOut === "IN" ? 0 : 1 / 4);

  return [cord, shades, fascia, tube, bottomRail, bottomTube, fabricW, fabricH];
}

function duoVertiluxSQMotorFunc(width, height) {
  const shades = inOut === "IN" ? width - 1 / 4 : width;
  const fascia = width - 9 / 16 + (inOut === "IN" ? 0 : 1 / 4);
  const tube = width - 1.375 + (inOut === "IN" ? 0 : 1 / 4);
  const bottomRail = tube + 1 / 16 + (inOut === "IN" ? 0 : 1 / 4);
  const bottomTube = tube - 1 / 16 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricW = width - 1.375 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricH = height + 1.5 + (inOut === "IN" ? 0 : 1 / 4);

  return [shades, fascia, tube, bottomRail, bottomTube, fabricW, fabricH];
}

function duoShadesManualFunc(width, height) {
  const cord = (height * 2) / 3;
  const shades = inOut === "IN" ? width - 1 / 4 : width;
  const fascia = width - 1 / 2 + (inOut === "IN" ? 0 : 1 / 4);
  const tube = width - 1.1875 + (inOut === "IN" ? 0 : 1 / 4);
  const bottomRail =
    width - 1.125 + 1 / 16 - 1 / 8 + (inOut === "IN" ? 0 : 1 / 4);
  const bottomTube = tube - 1 / 8 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricW = tube + (inOut === "IN" ? 0 : 1 / 4);
  const fabricH = height + 1.125 + 3 / 8 + (inOut === "IN" ? 0 : 1 / 4);

  return [cord, shades, fascia, tube, bottomRail, bottomTube, fabricW, fabricH];
}

function duoShadesMotorFunc(width, height) {
  const shades = inOut === "IN" ? width - 1 / 4 : width;
  const fascia = width - 1 / 2 + (inOut === "IN" ? 0 : 1 / 4);
  const tube = width - 1.1875 + 1 / 8 + (inOut === "IN" ? 0 : 1 / 4);
  const bottomRail =
    width - 1.125 + 1 / 16 - 1 / 8 + 1 / 8 + (inOut === "IN" ? 0 : 1 / 4);
  const bottomTube = tube - 1 / 8 - 1 / 16 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricW = tube + (inOut === "IN" ? 0 : 1 / 4);
  const fabricH = height + 1.125 + 3 / 8 + (inOut === "IN" ? 0 : 1 / 4);

  return [shades, fascia, tube, bottomRail, bottomTube, fabricW, fabricH];
}

function rollerShadeoFunc(width, height) {
  const cord = (height * 2) / 3;
  const shades = inOut === "IN" ? width - 1 / 4 : width;
  const fascia = width - 1 / 2 + (inOut === "IN" ? 0 : 1 / 4);
  const tube = width - 1.1875 + (inOut === "IN" ? 0 : 1 / 4);
  const bottomRail = width - 1.1875 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricW = width - 1.1875 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricH = height + 7 + (inOut === "IN" ? 0 : 1 / 4);

  return [cord, shades, fascia, tube, bottomRail, fabricW, fabricH];
}

function rollerVerSQManualFunc(width, height) {
  const cord = (height * 2) / 3;
  const shades = inOut === "IN" ? width - 1 / 4 : width;
  const fascia = width - 9 / 16 + (inOut === "IN" ? 0 : 1 / 4);
  const tube = width - 1.375 + (inOut === "IN" ? 0 : 1 / 4);
  const bottomRail = width - 1.375 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricW = width - 1.375 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricH = height + 7 + (inOut === "IN" ? 0 : 1 / 4);

  return [cord, shades, fascia, tube, bottomRail, fabricW, fabricH];
}

function rollerVerSQMotorFunc(width, height) {
  const shades = inOut === "IN" ? width - 1 / 4 : width;
  const fascia = width - 9 / 16 + (inOut === "IN" ? 0 : 1 / 4);
  const tube = width - 1.375 + (inOut === "IN" ? 0 : 1 / 4);
  const bottomRail = width - 1.375 + 1 / 16 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricW = width - 1.375 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricH = height + 7 + (inOut === "IN" ? 0 : 1 / 4);

  return [shades, fascia, tube, bottomRail, fabricW, fabricH];
}

function vertiOpenRollerFunc(width, height) {
  const chain = height - (15 / 100) * height;
  const shades = inOut === "IN" ? width - 1 / 8 : width;
  const tube = shades - 1.125 + (inOut === "IN" ? 0 : 1 / 4);
  const bottomRail = shades - 1.125 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricW = shades - 1.125 - 1 / 8 + (inOut === "IN" ? 0 : 1 / 4);
  const fabricH = height + 7 + (inOut === "IN" ? 0 : 1 / 4);

  return [chain, shades, tube, bottomRail, fabricW, fabricH];
}
