// Format numbers with commas
function formatNumberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Add commas while user is typing
function addCommasOnInput(event) {
    const value = event.target.value.replace(/,/g, ''); // Remove commas first
    if (!isNaN(value) && value !== '') {
        event.target.value = formatNumberWithCommas(value);
    }
}

// Attach event listeners to inputs for adding commas
document.querySelectorAll('.amount-input').forEach(input => {
    input.addEventListener('input', addCommasOnInput);
});

// Function to switch between calculators
document.getElementById('calculatorType').addEventListener('change', function () {
    const calculatorType = this.value;
    
    if (calculatorType === 'bond') {
        document.getElementById('bondCalculator').classList.remove('d-none');
        document.getElementById('loanCalculator').classList.add('d-none');
    } else {
        document.getElementById('bondCalculator').classList.add('d-none');
        document.getElementById('loanCalculator').classList.remove('d-none');
    }
});

// Function to show the result in a modal
function showModal(resultHTML) {
    document.getElementById('modalResult').innerHTML = resultHTML;
    var resultModal = new bootstrap.Modal(document.getElementById('resultModal'), {
        keyboard: false
    });
    resultModal.show();
}

// Bond Calculator Validation and Calculation
document.getElementById('bondCalculator').addEventListener('submit', function (e) {
    e.preventDefault();
    const bondAmount = parseFloat(document.getElementById('bondAmount').value.replace(/,/g, ''));
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const years = parseInt(document.getElementById('years').value);
    const interestFrequency = document.getElementById('interestFrequency').value;

    if (!isNaN(bondAmount) && !isNaN(interestRate) && !isNaN(years)) {
        let compoundingPeriods = 1;
        switch (interestFrequency) {
            case 'monthly': compoundingPeriods = 12; break;
            case 'quarterly': compoundingPeriods = 4; break;
            case 'semi-annually': compoundingPeriods = 2; break;
            case 'yearly': compoundingPeriods = 1; break;
        }

        const totalAmount = bondAmount * Math.pow(1 + (interestRate / 100) / compoundingPeriods, compoundingPeriods * years);
        const interestPerPeriod = bondAmount * (interestRate / 100) / compoundingPeriods;

        const resultHTML = `
            <h4>Bond Calculation Result</h4>
            <p><strong>Bond Amount:</strong> $${formatNumberWithCommas(bondAmount.toFixed(2))}</p>
            <p><strong>Interest Rate:</strong> ${interestRate.toFixed(2)}%</p>
            <p><strong>Years:</strong> ${years} years</p>
            <p><strong>Interest Frequency:</strong> ${interestFrequency.charAt(0).toUpperCase() + interestFrequency.slice(1)}</p>
            <hr>
            <p><strong>Interest per ${interestFrequency.charAt(0).toUpperCase() + interestFrequency.slice(1)}:</strong> $${formatNumberWithCommas(interestPerPeriod.toFixed(2))}</p>
            <p><strong>Total Amount After ${years} Years:</strong> $${formatNumberWithCommas(totalAmount.toFixed(2))}</p>
        `;
        showModal(resultHTML);
    }
});

// Loan Calculator Validation and Calculation (similar logic)
document.getElementById('loanCalculator').addEventListener('submit', function (e) {
    e.preventDefault();
    const loanAmount = parseFloat(document.getElementById('loanAmount').value.replace(/,/g, ''));
    const loanInterestRate = parseFloat(document.getElementById('loanInterestRate').value);
    const loanYears = parseInt(document.getElementById('loanYears').value);

    if (!isNaN(loanAmount) && !isNaN(loanInterestRate) && !isNaN(loanYears)) {
        const monthlyInterest = loanInterestRate / 100 / 12;
        const numPayments = loanYears * 12;
        const loanResult = (loanAmount * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -numPayments));
        const resultHTML = `
            <h4>Loan Calculation Result</h4>
            <p><strong>Loan Amount:</strong> $${formatNumberWithCommas(loanAmount.toFixed(2))}</p>
            <p><strong>Interest Rate:</strong> ${loanInterestRate.toFixed(2)}%</p>
            <p><strong>Years:</strong> ${loanYears} years</p>
            <hr>
            <p><strong>Monthly Payment:</strong> $${formatNumberWithCommas(loanResult.toFixed(2))}</p>
        `;
        showModal(resultHTML);
    }
});