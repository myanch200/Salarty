let form = document.getElementById("calculator-form");
let submitButton = document.getElementById("calculate-btn");
let amountInput = document.getElementById("amount");

let yearlyBox = document.getElementById("yearly-box");
let monthlyBox = document.getElementById("monthly-box");
let weeklyBox = document.getElementById("weekly-box");
let hourlyBox = document.getElementById("hourly-box");
let hoursPerWeek = document.getElementById("amountHours");
submitButton.addEventListener("click", calculate);

let monthlyAmount = 0;
let weeklyAmount = 0;
let yearlyAmount = 0;
let hourlyAmount = 0;
function calculate(event) {
    event.preventDefault();
    let salaryType = document.querySelector('input[name="period"]:checked').value;
    switch (salaryType) {
        case "yearly":
            yearlyAmount = amountInput.value;
            monthlyAmount = yearlyAmount / 12;
            weeklyAmount = monthlyAmount / 4;
            hourlyAmount = weeklyAmount / hoursPerWeek.value;

            break;
        case "weekly":
            weeklyAmount = amountInput.value;
            monthlyAmount = weeklyAmount * 4;
            yearlyAmount = monthlyAmount * 12;
            hourlyAmount = weeklyAmount / hoursPerWeek.value;

            break;
        case "monthly":
            monthlyAmount = amountInput.value;
            yearlyAmount = monthlyAmount * 12;
            weeklyAmount = monthlyAmount / 4;
            hourlyAmount = weeklyAmount / hoursPerWeek.value;

            break;
        case "hourly":
            hourlyAmount = amountInput.value;
            weeklyAmount = hourlyAmount * hoursPerWeek.value;
            monthlyAmount = weeklyAmount * 4;
            yearlyAmount = monthlyAmount * 12;
            console.log(`${hourlyAmount} - ${weeklyAmount} - ${monthlyAmount} - ${yearlyAmount}`);
            break;
        default:
            monthlyAmount = 0;
            yearlyAmount = 0;
            weeklyAmount = 0;
            break;


    }
    yearlyBox.innerText = yearlyAmount;
    monthlyBox.innerText = monthlyAmount;
    weeklyBox.innerText = weeklyAmount;
    hourlyBox.innerText = hourlyAmount;
}

function calculateTheSalary(salaryType) {

}