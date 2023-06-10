//BMR = 66 + (6.23 x weight in pounds) + (12.7 x height in inches) – (6.8 x age in years)

const weightEl = document.getElementById("weightElement");
const heightEl = document.getElementById("heightElement");
const ageEl = document.getElementById("ageElement");
const genderEl = document.getElementById("genders");
const femaleEl = document.getElementById("supplementaryFemaleInfo");
const activityEl = document.getElementById("activityElement");
const goalEl = document.getElementById("goalElement");
const infoFemale = document.getElementById("msgFemale");
const infoFemaleSelect = document.getElementById("msgFemaleSelect");
const infoHeight = document.getElementById("msgHeight");
const infoAge = document.getElementById("msgAge");

//array for measurment
const metricValue = [" :cm", " :kg", " :years"];
const imperialValue = [" :in.", " :lbs", " :years"];
let measureChoice = "";
let gender = "";
let pregnentInfo = "";
let weight = "";
let age;
let height = "";
let weightGoal = "";
let weightAmount;
let activityLevel = "";
let bmr;
let energyIntake;
let weightGoalValue;

//READ which measuers user want metric/imperial
const measureChoiceSelect = document.getElementById("measureChoice");
measureChoiceSelect.addEventListener("change", function () {
  measureChoice = measureChoiceSelect.value;
  const factorValues = document.querySelectorAll(".factor");
  //sets right values at, height, weight and age
  if (measureChoice === "metric") {
    console.log(factorValues);
    for (let i = 0; i < metricValue.length; i++) {
      factorValues[i].textContent = metricValue[i];
    }
  } else if (measureChoice === "imperial") {
    for (let i = 0; i < imperialValue.length; i++) {
      factorValues[i].textContent = imperialValue[i];
    }
  }
  setWeightGoalValues();
});

//read choosen gender
genderEl.addEventListener("change", function () {
  gender = genderEl.value;
  if (gender === "female") {
    infoFemale.style.display = "block";
    infoFemaleSelect.style.display = "block";
  } else {
    infoFemale.style.display = "none";
    infoFemaleSelect.style.display = "none";
  }
  console.log(gender);
});

//read extra info if female preggo or have newborn
femaleEl.addEventListener("change", function () {
  pregnentInfo = parseFloat(femaleEl.value);
});

//read height
heightEl.addEventListener("change", function () {
  height = parseFloat(heightEl.value);
  console.log("height ", height);
  if (height >= 273) {
    console.log("hje");
    infoHeight.style.display = "block";
  } else {
    infoHeight.style.display = "none";
  }
});

//Read weight
weightEl.addEventListener("change", function () {
  weight = parseFloat(weightEl.value);
  console.log("weight ", weight);
});

//Read age
ageEl.addEventListener("change", function () {
  age = parseFloat(ageEl.value);
  console.log("age ", age);
  if (age <= 16) {
    infoAge.style.display = "flex";
  } else {
    infoAge.style.display = "none";
  }
});

//read physical lvl
activityEl.addEventListener("change", function () {
  activityLevel = parseFloat(activityEl.value);
  console.log("activity level: ", activityLevel);
});

const weightChoice = document.getElementById("msgWeightGoal");
const weightChoiceSelect = document.getElementById("msgWeightGoalSelect");
const weightGoal1 = document.getElementById("goalValue1");
const weightGoal2 = document.getElementById("goalValue2");
const weightValueEl = document.getElementById("specificWeightGoalInfo");

// get goal of user n display weight goal factors
goalEl.addEventListener("change", function () {
  weightChoice.style.display = "block";
  weightChoice.style.display = "block";
  weightGoal = goalEl.value;
  console.log("goal: ", weightGoal);
  setWeightGoalValues();

  weightValueEl.addEventListener("change", () => {
    weightGoalValue = parseInt(weightValueEl.value);
    console.log("weightGoalValue 1: ", weightGoalValue);
  });
});

//Setting weight goals factors
function setWeightGoalValues() {
  if (measureChoice === "metric") {
    if (weightGoal === "weightgain") {
      weightChoice.style.display = "block";
      weightChoiceSelect.style.display = "block";
      weightGoal1.textContent = "+0.5 kg/week";
      weightGoal1.value = 500;
      weightGoal2.textContent = "+1 kg/week";
      weightGoal2.value = 1000;
    } else if (weightGoal === "weightloss") {
      weightChoice.style.display = "block";
      weightChoiceSelect.style.display = "block";
      weightGoal1.textContent = "-0.5 kg/week";
      weightGoal1.value = -500;
      weightGoal2.textContent = "-1 kg/week";
      weightGoal2.value = -1000;
    }
  } else if (measureChoice === "imperial") {
    if (weightGoal === "weightgain") {
      weightGoal1.textContent = "+1 lbs/week";
      weightGoal1.value = 500;
      weightGoal2.textContent = "+2 lbs/week";
      weightGoal2.value = 1000;
    } else if (weightGoal === "weightloss") {
      weightChoice.style.display = "block";
      weightChoiceSelect.style.display = "block";
      weightGoal1.textContent = "-1 lbs/week";
      weightGoal1.value = -500;
      weightGoal2.textContent = "-2 lbs/week";
      weightGoal2.value = -1000;
    }
  }
}
//get physical activity level
const physicalLevel = document.querySelectorAll('input[name="activityLevel"]');
physicalLevel.forEach((e) => {
  e.addEventListener("click", () => {
    activityLevel = parseFloat(
      document.querySelector('input[name="activityLevel"]:checked').value
    );
  });
});

//Getting elements for presenting cal and macros
const resultContainerEl = document.getElementById("resultContainer");
const tableEl = document.getElementById("table-El");
const presentCarbs = document.getElementById("carbs");
const presentProtein = document.getElementById("protein");
const presentFat = document.getElementById("fat");
const presentEnergy = document.getElementById("energyNeed");
const imgResult = document.getElementById("background-img");

const calacBtn = document.getElementById("calcBtn");
const resetBtn = document.getElementById("resetBtn");

function showResult() {
  resultContainerEl.style.display = "block";
  tableEl.style.display = "none";
  calacBtn.style.display = "none";
  resetBtn.style.display = "block";
}

function calculateBmi() {
  const bmiElement = document.getElementById("bmiValue");
  const bmiMsg = document.getElementById("bmiMsg");

  bmi = (weight / Math.pow(height / 100, 2)).toFixed(1);
  bmiElement.textContent = bmi;

  if (bmi < 18.5) {
    bmiElement.style.color = "#13adcc";
  }
  if (bmi < 18.5) {
    bmiMsg.textContent = "Underweight";
    bmiMsg.style.background =
      "linear-gradient(255deg, rgba(19,173,204,1) 0%, rgba(19,173,204,1) 100%)";
    bmiElement.style.color = "#13adcc";
    imgResult.src = "underweight-background.svg";
  } else if (bmi >= 18.5 && bmi <= 25) {
    bmiMsg.textContent = "Normal";
    bmiElement.style.color = "#15d676";
    bmiMsg.style.background =
      "linear-gradient(255deg, rgba(21,214,118,1) 0%, rgba(21,214,118,1) 100%)";
    imgResult.src = "normalweight-background.svg";
  } else if (bmi >= 25 && bmi <= 30) {
    bmiMsg.textContent = "Overweight";
    bmiElement.style.color = "#ff8a14";
    bmiMsg.style.background =
      "linear-gradient(255deg, rgba(255,138,20,1) 0%, rgba(255,138,20,0) 100%)";
    imgResult.src = "overweight-background.svg";
  } else {
    bmiMsg.style.background =
      "linear-gradient(255deg, rgba(238,88,88,1) 0%, rgba(238,88,88,0) 100%)";
    bmiElement.style.color = "#ee5858";
    imgResult.src = "obesity-background.svg";
    if (bmi >= 30 && bmi <= 35) {
      bmiMsg.textContent = "Severe Obesity";
    } else if (bmi > 35 && bmi <= 40) {
      bmiMsg.textContent = "Morbid obesity";
    } else if (bmi > 40) {
      bmiMsg.textContent = "Extreme obesity";
    }
  }
}

function calculateEnergy() {
  if (measureChoice === "metric") {
    if (gender === "female") {
      bmr = 655.0955 + (9.5634 + weight) + 1.8496 * height - (4.6756 - age);
      energyIntake = parseInt(bmr * activityLevel + weightGoalValue);
      presentEnergy.textContent = energyIntake;
      console.log("kvinna", energyIntake);
    } else {
      bmr = 66.5 + 13.7516 * weight + 5.0033 * height - (6.755 - age);
      console.log(bmr);
      energyIntake = parseInt(bmr * activityLevel + weightGoalValue);
      presentEnergy.textContent = energyIntake;
      console.log("weightgoalvalue: ", weightGoalValue);
      console.log("Man: ", energyIntake);
    }
  }
}

resetBtn.addEventListener("click", () => {
  calacBtn.style.display = "block";
  resetBtn.style.display = "none";
});

//functions run when user press "genereate result"
function calcBtn() {
  calculateBmi();
  calculateEnergy();
  showResult();
  populateMacroDropdowns();
  validatePercentChoice();
  presentCaloriesMacros();
  presentMacros();
}

const caloriesCarbEl = document.getElementById("carbCalories");
const percentCarbsEl = document.getElementById("percentCarbs");
const macroCarbEl = document.getElementById("carbMacro");

//Getting proteinElements
const caloriesProteinEl = document.getElementById("proteinCalories");
const percentProteinEl = document.getElementById("percentProtein");
const macroProteinEl = document.getElementById("proteinMacro");

//getting fatElements
const caloriesFatEl = document.getElementById("fatCalories");
const percentFatEl = document.getElementById("percentfat");
const macroFatEl = document.getElementById("fatMacro");

//collect all % options
let percentOption = document.querySelectorAll('select[name="percentChoice"]');
//run functions when percent value changed
percentOption.forEach((e) => {
  e.addEventListener("change", () => {
    validatePercentChoice();
    presentCaloriesMacros();
    presentMacros();
  });
});

let calFat;
let calProt;
let calCarb;

//Creates a dropdown-list for every macro with 5point jump
// Create defualt values 40c/40p/20f
function populateMacroDropdowns() {
  //carbs
  for (let i = 0; i <= 100; i += 5) {
    let option = document.createElement("option");
    option.text = i + "%";
    option.value = i;
    percentCarbsEl.appendChild(option);
    if (i === 40) {
      option.selected = true; // Set default value to 40%
    }
  }
  //Protein
  for (let i = 0; i <= 100; i += 5) {
    let option = document.createElement("option");
    option.text = i + "%";
    option.value = i;
    percentProteinEl.appendChild(option);

    if (i === 40) {
      option.selected = true; // Set default value to 40%
    }
  }
  //Fat
  for (let i = 0; i <= 100; i += 5) {
    let option = document.createElement("option");
    option.text = i + "%";
    option.value = i;
    percentFatEl.appendChild(option);

    if (i === 20) {
      option.selected = true; // Set default value to 20%
    }
  }
}

function presentCaloriesMacros() {
  calCarb = energyIntake * parseFloat(percentCarbsEl.value / 100);
  caloriesCarbEl.textContent = calCarb.toFixed(1) + " kcal";

  calProt = energyIntake * parseFloat(percentProteinEl.value / 100);
  caloriesProteinEl.textContent = calProt.toFixed(1) + " kcal";

  calFat = energyIntake * parseFloat(percentFatEl.value / 100);
  caloriesFatEl.textContent = calFat.toFixed(1) + " kcal";
}

//fixing the macros
function presentMacros() {
  macroCarbEl.textContent = Math.round(calCarb / 4) + " g";
  macroProteinEl.textContent = Math.round(calProt / 4) + " g";
  macroFatEl.textContent = Math.round(calFat / 9) + " g";
}

//validate that all % values is 100% or red text
function validatePercentChoice() {
  let sumOfPercent = 0;
  let validateEl = document.querySelectorAll('select[name="percentChoice"]');
  validateEl.forEach((e) => {
    sumOfPercent += parseInt(e.value);
  });

  if (sumOfPercent < 100 || sumOfPercent > 100) {
    validateEl.forEach((e) => {
      e.style.color = "red";
    });
  } else {
    validateEl.forEach((e) => {
      e.style.color = "black";
    });
  }
}

//reset everything if user wana calculate again
function resetButton() {
  calacBtn.style.display = "block";
  resetBtn.style.display = "none";

  resultContainerEl.style.display = "none";
  tableEl.style.display = "table";

  measureChoiceSelect.selectedIndex = 0;
  measureChoice = "";

  genderEl.selectedIndex = 0;
  gender = "";

  activityEl.selectedIndex = 0;
  activityLevel = 0;

  goalEl.selectedIndex = 0;
  weightGoal = "";

  femaleEl.selectedIndex = 0;
  pregnentInfo = "";

  weightValueEl.selectedIndex = 0;
  weightGoalValue;

  weightChoice.selectedIndex = 0;

  weightEl.value = "";
  weight = "";

  age = "";
  ageEl.value = "";

  height = "";
  heightEl.value = "";

  energyIntake = "";
  presentEnergy.textContent = "";

  weightAmount;
  bmr = "";
  bmi = "";

  imgResult.src = "neutral-background.svg";
}
const mobileNavBtn = document.getElementById("mobileNavBtn");
const mobileNav = document.getElementById("mobileNav");
mobileNavBtn.addEventListener("click", () => {
  mobileNav.style.display = "block";
  mobileNavBtn.style.display = "none";
});
const closeMobileNav = document.getElementById("closeMobileNav");
closeMobileNav.addEventListener("click", () => {
  mobileNav.style.display = "none";
  mobileNavBtn.style.display = "block";
});
