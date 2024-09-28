document.getElementById('calculatorType').addEventListener('change', function () {
    const calculatorType = this.value;
    const bondCalculatorFields = document.getElementById('bondCalculatorFields');
    const loanCalculatorFields = document.getElementById('loanCalculatorFields');

    if (calculatorType === 'bond') {
        bondCalculatorFields.style.display = 'block';
        loanCalculatorFields.style.display = 'none';
    } else if (calculatorType === 'loan') {
        bondCalculatorFields.style.display = 'none';
        loanCalculatorFields.style.display = 'block';
    }
});

// Format input fields with commas as the user types
function formatNumberWithCommas(input) {
    input.value = input.value.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

document.getElementById('bondAmount').addEventListener('input', function () {
    formatNumberWithCommas(this);
    validateInput(this);
});

document.getElementById('loanAmount').addEventListener('input', function () {
    formatNumberWithCommas(this);
    validateInput(this);
});

// Form submission event
document.getElementById('calculatorForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const calculatorType = document.getElementById('calculatorType').value;

    if (calculatorType === 'bond') {
        calculateBond();
    } else if (calculatorType === 'loan') {
        calculateLoan();
    }
});

// Bond calculation logic
function calculateBond() {
    const bondAmountInput = document.getElementById('bondAmount');
    const bondInterestRateInput = document.getElementById('bondInterestRate');
    const bondYearsInput = document.getElementById('bondYears');
    const bondFrequencyInput = document.getElementById('bondFrequency');

    const bondAmount = parseFloat(bondAmountInput.value.replace(/,/g, ''));
    const interestRate = parseFloat(bondInterestRateInput.value);
    const years = parseInt(bondYearsInput.value);
    const interestFrequency = bondFrequencyInput.value;

    let valid = true;
    clearValidationErrors();

    if (isNaN(bondAmount) || bondAmount <= 0) {
        showValidationError(bondAmountInput);
        valid = false;
    } else {
        showValidInput(bondAmountInput);
    }

    if (isNaN(interestRate) || interestRate <= 0) {
        showValidationError(bondInterestRateInput);
        valid = false;
    } else {
        showValidInput(bondInterestRateInput);
    }

    if (isNaN(years) || years <= 0) {
        showValidationError(bondYearsInput);
        valid = false;
    } else {
        showValidInput(bondYearsInput);
    }

    if (valid) {
        const compoundingPeriods = getCompoundingPeriods(interestFrequency);
        const totalAmount = bondAmount * Math.pow(1 + (interestRate / 100) / compoundingPeriods, compoundingPeriods * years);
        const interestPerPeriod = bondAmount * (interestRate / 100) / compoundingPeriods;

        const resultHTML = `
            <h4>Bond Calculation Result</h4>
            <p><strong>Bond Amount:</strong> TZS ${formatNumberWithCommas(bondAmount.toFixed(2))}</p>
            <p><strong>Interest Rate:</strong> ${interestRate.toFixed(2)}%</p>
            <p><strong>Duration:</strong> ${years} years</p>
            <p><strong>Interest Frequency:</strong> ${interestFrequency.charAt(0).toUpperCase() + interestFrequency.slice(1)}</p>
            <hr>
            <p><strong>Interest per ${interestFrequency.charAt(0).toUpperCase() + interestFrequency.slice(1)}:</strong> TZS ${formatNumberWithCommas(interestPerPeriod.toFixed(2))}</p>
            <p><strong>Total Amount After ${years} Years:</strong> TZS ${formatNumberWithCommas(totalAmount.toFixed(2))}</p>
        `;
        showModal(resultHTML);
    }
}

// Loan calculation logic
function calculateLoan() {
    const loanAmountInput = document.getElementById('loanAmount');
    const loanInterestRateInput = document.getElementById('loanInterestRate');
    const loanYearsInput = document.getElementById('loanYears');

    const loanAmount = parseFloat(loanAmountInput.value.replace(/,/g, ''));
    const interestRate = parseFloat(loanInterestRateInput.value);
    const years = parseInt(loanYearsInput.value);

    let valid = true;
    clearValidationErrors();

    if (isNaN(loanAmount) || loanAmount <= 0) {
        showValidationError(loanAmountInput);
        valid = false;
    } else {
        showValidInput(loanAmountInput);
    }

    if (isNaN(interestRate) || interestRate <= 0) {
        showValidationError(loanInterestRateInput);
        valid = false;
    } else {
        showValidInput(loanInterestRateInput);
    }

    if (isNaN(years) || years <= 0) {
        showValidationError(loanYearsInput);
        valid = false;
    } else {
        showValidInput(loanYearsInput);
    }

    if (valid) {
        const monthlyRate = (interestRate / 100) / 12;
        const numberOfMonths = years * 12;
        const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
        const totalPayment = monthlyPayment * numberOfMonths;

        const resultHTML = `
            <h4>Loan Calculation Result</h4>
            <p><strong>Loan Amount:</strong> TZS ${formatNumberWithCommas(loanAmount.toFixed(2))}</p>
            <p><strong>Interest Rate:</strong> ${interestRate.toFixed(2)}%</p>
            <p><strong>Duration:</strong> ${years} years</p>
            <hr>
            <p><strong>Monthly Payment:</strong> TZS ${formatNumberWithCommas(monthlyPayment.toFixed(2))}</p>
            <p><strong>Total Payment After ${years} Years:</strong> TZS ${formatNumberWithCommas(totalPayment.toFixed(2))}</p>
        `;
        showModal(resultHTML);
    }
}

// Clear button logic
document.getElementById('clearFormBtn').addEventListener('click', function () {
    document.getElementById('calculatorForm').reset();
    clearValidationErrors();
});

// Function to show red border for invalid input
function showValidationError(input) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
}

// Function to show green border for valid input
function showValidInput(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
}

// Function to clear all validation errors
function clearValidationErrors() {
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
    });
}

function getCompoundingPeriods(frequency) {
    switch (frequency) {
        case 'monthly':
            return 12;
        case 'quarterly':
            return 4;
        case 'semi-annually':
            return 2;
        case 'yearly':
            return 1;
        default:
            return 1;
    }
}

function showModal(content) {
    document.getElementById('modalResult').innerHTML = content;
    const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    resultModal.show();
}