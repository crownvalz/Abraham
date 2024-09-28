// Format numbers with commas
function formatNumberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

    if (!isNaN(bondAmount) && !isNaN(interestRate) && !isNaN(years)) {
        const bondResult = bondAmount * Math.pow(1 + (interestRate / 100), years);
        const resultHTML = `
            <h4>Bond Calculation Result</h4>
            <p><strong>Bond Amount:</strong> $${formatNumberWithCommas(bondAmount.toFixed(2))}</p>
            <p><strong>Interest Rate:</strong> ${interestRate.toFixed(2)}%</p>
            <p><strong>Years:</strong> ${years} years</p>
            <hr>
            <p><strong>Total Bond Value:</strong> $${formatNumberWithCommas(bondResult.toFixed(2))}</p>
        `;
        showModal(resultHTML);
    }
});

// Loan Calculator Validation and Calculation
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