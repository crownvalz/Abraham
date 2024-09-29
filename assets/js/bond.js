document.getElementById('calculatorType').addEventListener('change', function() {
    const bondFields = document.getElementById('bondCalculatorFields');
    const loanFields = document.getElementById('loanCalculatorFields');
    if (this.value === 'bond') {
        bondFields.style.display = 'block';
        loanFields.style.display = 'none';
    } else {
        bondFields.style.display = 'none';
        loanFields.style.display = 'block';
    }
});

document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const calculatorType = document.getElementById('calculatorType').value;
    let isValid = true;
    const inputs = calculatorType === 'bond' ? ['bondAmount', 'bondInterestRate', 'bondYears'] : ['loanAmount', 'loanInterestRate', 'loanYears'];

    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (!input.value) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    if (!isValid) return;

    let result;
    if (calculatorType === 'bond') {
        const amount = parseFloat(document.getElementById('bondAmount').value);
        const interestRate = parseFloat(document.getElementById('bondInterestRate').value) / 100;
        const years = parseFloat(document.getElementById('bondYears').value);
        const frequency = document.getElementById('bondFrequency').value;

        // Calculate Bond result (simple example)
        result = amount * Math.pow(1 + interestRate, years);
    } else {
        const amount = parseFloat(document.getElementById('loanAmount').value);
        const interestRate = parseFloat(document.getElementById('loanInterestRate').value) / 100;
        const years = parseFloat(document.getElementById('loanYears').value);

        // Calculate Loan result (simple example)
        const monthlyRate = interestRate / 12;
        const numberOfPayments = years * 12;
        result = amount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    }

    document.getElementById('modalResult').innerText = `The result is: ${result.toFixed(2)} TZS`;
    const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    resultModal.show();
});

document.getElementById('clearFormBtn').addEventListener('click', function() {
    document.getElementById('calculatorForm').reset();
    document.querySelectorAll('.form-control').forEach(input => input.classList.remove('error'));
    document.getElementById('bondCalculatorFields').style.display = 'block';
    document.getElementById('loanCalculatorFields').style.display = 'none';
});