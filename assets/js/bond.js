document.addEventListener("DOMContentLoaded", function () {
    const calculatorType = document.getElementById('calculatorType');
    const bondCalculatorFields = document.getElementById('bondCalculatorFields');
    const loanCalculatorFields = document.getElementById('loanCalculatorFields');
    const bondAmount = document.getElementById('bondAmount');
    const bondInterestRate = document.getElementById('bondInterestRate');
    const bondYears = document.getElementById('bondYears');
    const loanAmount = document.getElementById('loanAmount');
    const loanInterestRate = document.getElementById('loanInterestRate');
    const loanYears = document.getElementById('loanYears');
    const clearFormBtn = document.getElementById('clearFormBtn');
    const calculatorForm = document.getElementById('calculatorForm');
    const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    const modalResult = document.getElementById('modalResult');
    const bondFrequency = document.getElementById('bondFrequency');

    // Toggle calculator fields
    calculatorType.addEventListener('change', function () {
        if (this.value === 'bond') {
            bondCalculatorFields.style.display = 'block';
            loanCalculatorFields.style.display = 'none';
        } else {
            bondCalculatorFields.style.display = 'none';
            loanCalculatorFields.style.display = 'block';
        }
    });

    // Function to format input with commas
    function formatInput(input) {
        input.value = input.value.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // Add event listeners to format inputs
    [bondAmount, bondInterestRate, bondYears, loanAmount, loanInterestRate, loanYears].forEach(input => {
        input.addEventListener('input', () => formatInput(input));
    });

    // Handle form submission
    calculatorForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Perform validations and calculations here
        let isValid = true;

        // Validate Bond Inputs
        if (calculatorType.value === 'bond') {
            if (!bondAmount.value || !bondInterestRate.value || !bondYears.value) {
                isValid = false;
                [bondAmount, bondInterestRate, bondYears].forEach(input => input.classList.add('error'));
            } else {
                [bondAmount, bondInterestRate, bondYears].forEach(input => input.classList.remove('error'));
                // Show success border
                [bondAmount, bondInterestRate, bondYears].forEach(input => input.classList.add('success'));
            }
        } else {
            // Validate Loan Inputs
            if (!loanAmount.value || !loanInterestRate.value || !loanYears.value) {
                isValid = false;
                [loanAmount, loanInterestRate, loanYears].forEach(input => input.classList.add('error'));
            } else {
                [loanAmount, loanInterestRate, loanYears].forEach(input => input.classList.remove('error'));
                // Show success border
                [loanAmount, loanInterestRate, loanYears].forEach(input => input.classList.add('success'));
            }
        }

        if (isValid) {
            let result;
            if (calculatorType.value === 'bond') {
                // Bond calculation logic
                const amount = parseFloat(bondAmount.value.replace(/,/g, ''));
                const interestRate = parseFloat(bondInterestRate.value);
                const years = parseFloat(bondYears.value);
                const frequency = bondFrequency.value;

                // Calculate interest based on frequency
                let interestPaid = (amount * interestRate / 100) * years;
                let frequencyText = frequency.charAt(0).toUpperCase() + frequency.slice(1);

                result = `For a bond of TZS ${amount.toLocaleString()}, with an interest rate of ${interestRate}%, over ${years} years, the interest paid is TZS ${interestPaid.toLocaleString()} (${frequencyText}).`;
            } else {
                // Loan calculation logic
                const amount = parseFloat(loanAmount.value.replace(/,/g, ''));
                const interestRate = parseFloat(loanInterestRate.value);
                const years = parseFloat(loanYears.value);
                
                result = `For a loan of TZS ${amount.toLocaleString()}, with an interest rate of ${interestRate}%, over ${years} years, the total amount paid is TZS ${(amount + (amount * interestRate / 100) * years).toLocaleString()}.`;
            }

            modalResult.innerHTML = result;
            resultModal.show();
        }
    });

    // Clear Form
    clearFormBtn.addEventListener('click', function () {
        calculatorForm.reset();
        [bondAmount, bondInterestRate, bondYears, loanAmount, loanInterestRate, loanYears].forEach(input => {
            input.classList.remove('error', 'success');
            input.value = '';
        });
        bondCalculatorFields.style.display = 'block';
        loanCalculatorFields.style.display = 'none';
    });
});