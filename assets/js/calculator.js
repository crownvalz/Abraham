document.getElementById('calculatorForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Bond Calculator Fields
    const bondAmountInput = document.getElementById('bondAmount');
    const bondInterestRateInput = document.getElementById('bondInterestRate');
    const bondYearsInput = document.getElementById('bondYears');
    const bondFrequencyInput = document.getElementById('bondFrequency');

    const bondAmount = parseFloat(bondAmountInput.value.replace(/,/g, ''));
    const interestRate = parseFloat(bondInterestRateInput.value);
    const years = parseInt(bondYearsInput.value);
    const interestFrequency = bondFrequencyInput.value;

    let valid = true;

    // Clear previous validation errors
    clearValidationErrors();

    // Validate form fields
    if (isNaN(bondAmount) || bondAmount <= 0) {
        showValidationError(bondAmountInput);
        valid = false;
    }
    if (isNaN(interestRate) || interestRate <= 0) {
        showValidationError(bondInterestRateInput);
        valid = false;
    }
    if (isNaN(years) || years <= 0) {
        showValidationError(bondYearsInput);
        valid = false;
    }

    if (valid) {
        // Perform bond calculation
        const compoundingPeriods = getCompoundingPeriods(interestFrequency);
        const totalAmount = bondAmount * Math.pow(1 + (interestRate / 100) / compoundingPeriods, compoundingPeriods * years);
        const interestPerPeriod = bondAmount * (interestRate / 100) / compoundingPeriods;

        const resultHTML = `
            <h4>Bond Calculation Result</h4>
            <p><strong>Bond Amount:</strong> TZS ${formatNumberWithCommas(bondAmount.toFixed(2))}</p>
            <p><strong>Interest Rate:</strong> ${interestRate.toFixed(2)}%</p>
            <p><strong>Years:</strong> ${years} years</p>
            <p><strong>Interest Frequency:</strong> ${interestFrequency.charAt(0).toUpperCase() + interestFrequency.slice(1)}</p>
            <hr>
            <p><strong>Interest per ${interestFrequency.charAt(0).toUpperCase() + interestFrequency.slice(1)}:</strong> TZS ${formatNumberWithCommas(interestPerPeriod.toFixed(2))}</p>
            <p><strong>Total Amount After ${years} Years:</strong> TZS ${formatNumberWithCommas(totalAmount.toFixed(2))}</p>
        `;
        showModal(resultHTML);
    }
});

function showValidationError(input) {
    input.classList.add('is-invalid');
}

function clearValidationErrors() {
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.classList.remove('is-invalid');
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

document.getElementById('clearFormBtn').addEventListener('click', function () {
    document.getElementById('calculatorForm').reset();
    clearValidationErrors();
});

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function showModal(content) {
    document.getElementById('modalResult').innerHTML = content;
    const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    resultModal.show();
}