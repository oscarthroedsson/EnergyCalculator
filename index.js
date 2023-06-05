//BMR = 66 + (6.23 x weight in pounds) + (12.7 x height in inches) – (6.8 x age in years)

const weightEl = document.getElementById("weightElement");
const heightEl = document.getElementById("heightElement");
const ageEl = document.getElementById("ageElement");
const genderEl = document.getElementById("genders");
const femaleEl = document.getElementById("supplementaryFemaleInfo");
const activityEl = document.getElementById("activityElement");
const goalEl = document.getElementById("goalElement");
const infoFemale = document.getElementById("msgFemale");
const infoHeight = document.getElementById("msgHeight");
const infoAge = document.getElementById("msgAge");

//array for measurment
const metricValue = [" cm", " kg", " years"];
const imperialValue = [" inches", " lbs", "years"];
const imgBackgroundResult = [];
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
    infoFemale.style.display = "flex";
  } else {
    infoFemale.style.display = "none";
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
    infoHeight.style.display = "flex";
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
const weightGoal1 = document.getElementById("goalValue1");
const weightGoal2 = document.getElementById("goalValue2");
const weightValueEl = document.getElementById("specificWeightGoalInfo");

// get goal of user n display weight goal factors
goalEl.addEventListener("change", function () {
  weightChoice.style.display = "flex";
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
      weightGoal1.textContent = "+0.5 kg/week";
      weightGoal1.value = 500;
      weightGoal2.textContent = "+1 kg/week";
      weightGoal2.value = 1000;
    } else if (weightGoal === "weightloss") {
      weightChoice.style.display = "flex";
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
      weightChoice.style.display = "flex";
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
const presentCarbs = document.getElementById("carbs");
const presentProtein = document.getElementById("protein");
const presentFat = document.getElementById("fat");
const presentEnergy = document.getElementById("energyNeed");

function calculateBmi() {
  const bmiElement = document.getElementById("bmiNumber");
  const bmiMsg = document.getElementById("bmiFactorText");
  const imgResult = document.getElementById("background-img");

  bmi = (weight / Math.pow(height / 100, 2)).toFixed(1);
  bmiElement.textContent = bmi;

  if (bmi < 18.5) {
    bmiElement.style.color = "#13adcc";
  }

  if (bmi < 18.5) {
    bmiMsg.textContent = "Underweight";
    bmiElement.style.color = "#13adcc";
    bmiMsg.style.color = "#13adcc";
    imgResult.src = "underweight-background.svg";
  } else if (bmi >= 18.5 && bmi <= 25) {
    bmiMsg.textContent = "Normal";
    bmiElement.style.color = "#15d676";
    bmiMsg.style.color = "#15d676";
    imgResult.src = "normalweight-background.svg";
  } else if (bmi >= 25 && bmi <= 30) {
    bmiMsg.textContent = "Overweight";
    bmiElement.style.color = "#ff8a14";
    bmiMsg.style.color = "#ff8a14";
    imgResult.src = "overweight-background.svg";
  } else {
    bmiElement.style.color = "#ee5858";
    bmiMsg.style.color = "#ee5858";
    imgResult.src = "obesity-background.svg";
    if (bmi >= 30 && bmi <= 35) {
      bmiMsg.textContent += "Severe Obesity";
    } else if (bmi > 35 && bmi <= 40) {
      bmiMsg.textContent += "Morbid obesity";
    } else if (bmi > 50) {
      bmiMsg.textContent += "Extreme obesity";
    }
  }

  const markerPosition = ((bmi - 16) / (40 - 16)) * 100;
  // Get the marker element
  const markerElement = document.querySelector(".marker");
  // Set the left position of the marker
  markerElement.style.left = `${markerPosition}%`;
  console.log("bmi ", bmi), "class: ", bmiMsg.textContent;
}

function calculateEnergy() {
  if (measureChoice === "metric") {
    if (gender === "female") {
      bmr = 655.0955 + (9.5634 + weight) + 1.8496 * height - (4.6756 - age);
      energyIntake = parseInt(bmr * activityLevel + weightGoalValue);
      console.log("kvinna", energyIntake);
    } else {
      bmr = 66.5 + 13.7516 * weight + 5.0033 * height - (6.755 - age);
      console.log(bmr);
      energyIntake = parseInt(bmr * activityLevel + weightGoalValue);
      console.log("weightgoalvalue: ", weightGoalValue);
      console.log("Man: ", energyIntake);
    }
  }
}
//functions run when user press "genereate result"
function btnClicked() {
  calculateBmi();
  calculateEnergy();
}
