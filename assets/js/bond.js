document.addEventListener('DOMContentLoaded', function () {
    const calculatorType = document.getElementById('calculatorType');
    const bondCalculatorFields = document.getElementById('bondCalculatorFields');
    const loanCalculatorFields = document.getElementById('loanCalculatorFields');
    const clearFormBtn = document.getElementById('clearFormBtn');
    const calculatorForm = document.getElementById('calculatorForm');
    const bondAmountInput = document.getElementById('bondAmount');
    const loanAmountInput = document.getElementById('loanAmount');
    const toggleThemeBtn = document.getElementById('toggleThemeBtn');
    const body = document.body;

    // Theme Toggle (Dark/Light Mode)
    toggleThemeBtn.addEventListener('click', function () {
        body.classList.toggle('dark-mode');
        toggleThemeBtn.textContent = body.classList.contains('dark-mode') ? 'Toggle Light Mode' : 'Toggle Dark Mode';
    });

    // Switching between Bond and Loan calculator fields
    calculatorType.addEventListener('change', function (event) {
        if (event.target.value === 'loan') {
            bondCalculatorFields.style.display = 'none';
            loanCalculatorFields.style.display = 'block';
        } else {
            bondCalculatorFields.style.display = 'block';
            loanCalculatorFields.style.display = 'none';
        }
    });

    // Clear form button functionality
    clearFormBtn.addEventListener('click', function () {
        calculatorForm.reset();
        bondCalculatorFields.style.display = 'block';
        loanCalculatorFields.style.display = 'none';
    });

    // Handle form submission
    calculatorForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const calculatorTypeValue = calculatorType.value;

        if (calculatorTypeValue === 'bond') {
            calculateBond();
        } else if (calculatorTypeValue === 'loan') {
            calculateLoan();
        }
    });

    // Bond Calculation
    function