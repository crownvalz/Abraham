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

// Bond Calculator Validation and Calculation
document.getElementById('bondCalculator').addEventListener('submit', function (e) {
    e.preventDefault();
    const bondAmount = parseFloat(document.getElementById('bondAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const years = parseInt(document.getElementById('years').value);

    if (!isNaN(bondAmount) && !isNaN(interestRate) && !isNaN(years)) {
        const bondResult = bondAmount * Math.pow(1 + (interestRate / 100), years);
        document.getElementById('bondResult').textContent = `Total Bond Value: $${bondResult.toFixed(2)}`;
    }
});

// Loan Calculator Validation and Calculation
document.getElementById('loanCalculator').addEventListener('submit', function (e) {
    e.preventDefault();
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const loanInterestRate = parseFloat(document.getElementById('loanInterestRate').value);
    const loanYears = parseInt(document.getElementById('loanYears').value);

    if (!isNaN(loanAmount) && !isNaN(loanInterestRate) && !isNaN(loanYears)) {
        const monthlyInterest = loanInterestRate / 100 / 12;
        const payments = loanYears * 12;
        const loanResult = loanAmount * monthlyInterest / (1 - Math.pow(1 + monthlyInterest, -payments));
        document.getElementById('loanResult').textContent = `Monthly Payment: $${loanResult.toFixed(2)}`;
    }
});