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
    const navbarToggler = document.querySelector('.navbar-toggler');

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

    // Format input with commas
    function formatInput(input) {
        let value = input.value.replace(/,/g, ''); // Remove commas
        if (!isNaN(value) && value.length > 0) {
            input.value = Number(value).toLocaleString('en'); // Add commas
        } else {
            input.value = '';
        }
    }

    // Input field event listeners
    bondAmount.addEventListener('input', function() { formatInput(this); });
    bondInterestRate.addEventListener('input', function() { formatInput(this); });
    bondYears.addEventListener('input', function() { formatInput(this); });
    loanAmount.addEventListener('input', function() { formatInput(this); });
    loanInterestRate.addEventListener('input', function() { formatInput(this); });
    loanYears.addEventListener('input', function() { formatInput(this); });

    // Handle form submission
    calculatorForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Reset validation classes
        resetValidation();

        let isValid = true;

        // Validate Bond Inputs
        if (calculatorType.value === 'bond') {
            if (!bondAmount.value || !bondInterestRate.value || !bondYears.value) {
                isValid = false;
                markInvalid([bondAmount, bondInterestRate, bondYears]);
            } else {
                markValid([bondAmount, bondInterestRate, bondYears]);
            }
        }

        // Validate Loan Inputs
        if (calculatorType.value === 'loan') {
            if (!loanAmount.value || !loanInterestRate.value || !loanYears.value) {
                isValid = false;
                markInvalid([loanAmount, loanInterestRate, loanYears]);
            } else {
                markValid([loanAmount, loanInterestRate, loanYears]);
            }
        }

        // Show result modal if valid
        if (isValid) {
            // Replace with your calculation logic
            const result = calculate(); // Call your calculation function
            modalResult.textContent = `The result is: ${result}`;
            resultModal.show();
        }
    });

    // Clear Form Button
    clearFormBtn.addEventListener('click', function() {
        calculatorForm.reset();
        resetValidation();
    });

    // Function to reset validation
    function resetValidation() {
        const inputs = [
            bondAmount,
            bondInterestRate,
            bondYears,
            loanAmount,
            loanInterestRate,
            loanYears,
        ];
        inputs.forEach(input => {
            input.classList.remove('input-error', 'input-success');
        });
    }

    // Function to mark fields as invalid
    function markInvalid(inputs) {
        inputs.forEach(input => {
            input.classList.add('input-error');
        });
    }

    // Function to mark fields as valid
    function markValid(inputs) {
        inputs.forEach(input => {
            input.classList.add('input-success');
        });
    }

    // Example calculation function (replace with your logic)
    function calculate() {
        // Your calculation logic here
        return "Calculated Value"; // Replace with the actual calculation result
    }
});