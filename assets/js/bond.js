document.addEventListener('DOMContentLoaded', function () {
    const calculatorType = document.getElementById('calculatorType');
    const bondCalculatorFields = document.getElementById('bondCalculatorFields');
    const loanCalculatorFields = document.getElementById('loanCalculatorFields');

    // Show/hide calculator fields based on selection
    calculatorType.addEventListener('change', function () {
        if (this.value === 'bond') {
            bondCalculatorFields.style.display = 'block';
            loanCalculatorFields.style.display = 'none';
        } else {
            bondCalculatorFields.style.display = 'none';
            loanCalculatorFields.style.display = 'block';
        }
    });

    // Add event listener for form submission
    document.getElementById('calculatorForm').addEventListener('submit', function (event) {
        event.preventDefault();
        clearValidationStyles(); // Reset validation styles

        let isValid = validateForm();

        if (isValid) {
            const resultText = calculateResult();
            document.getElementById('modalResult').innerText = resultText;

            // Show the modal after calculation
            const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
            resultModal.show();
        }
    });

    // Format input to add commas for thousands
    const formatAmountField = (inputField) => {
        inputField.value = inputField.value.replace(/,/g, ''); // Remove existing commas
        const value = Number(inputField.value);
        if (!isNaN(value)) {
            inputField.value = value.toLocaleString(); // Format with commas
        }
    };

    const bondAmount = document.getElementById('bondAmount');
    const loanAmount = document.getElementById('loanAmount');

    bondAmount.addEventListener('blur', () => formatAmountField(bondAmount));
    loanAmount.addEventListener('blur', () => formatAmountField(loanAmount));

    // Form validation
    function validateForm() {
        let isValid = true;

        const bondAmount = document.getElementById('bondAmount');
        const bondInterestRate = document.getElementById('bondInterestRate');
        const bondYears = document.getElementById('bondYears');

        const loanAmount = document.getElementById('loanAmount');
        const loanInterestRate = document.getElementById('loanInterestRate');
        const loanYears = document.getElementById('loanYears');

        // Bond validation
        if (bondAmount.value.trim() === '') {
            isValid = false;
            bondAmount.classList.add('is-invalid');
        } else {
            bondAmount.classList.remove('is-invalid');
        }

        if (bondInterestRate.value.trim() === '') {
            isValid = false;
            bondInterestRate.classList.add('is-invalid');
        } else {
            bondInterestRate.classList.remove('is-invalid');
        }

        if (bondYears.value.trim() === '') {
            isValid = false;
            bondYears.classList.add('is-invalid');
        } else {
            bondYears.classList.remove('is-invalid');
        }

        // Loan validation
        if (loanAmount.value.trim() === '') {
            isValid = false;
            loanAmount.classList.add('is-invalid');
        } else {
            loanAmount.classList.remove('is-invalid');
        }

        if (loanInterestRate.value.trim() === '') {
            isValid = false;
            loanInterestRate.classList.add('is-invalid');
        } else {
            loanInterestRate.classList.remove('is-invalid');
        }

        if (loanYears.value.trim() === '') {
            isValid = false;
            loanYears.classList.add('is-invalid');
        } else {
            loanYears.classList.remove('is-invalid');
        }

        return isValid;
    }

    function clearValidationStyles() {
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.classList.remove('is-invalid');
        });
    }

    // Function to calculate results
    function calculateResult() {
        const bondAmountValue = parseFloat(bondAmount.value.replace(/,/g, '')) || 0;
        const bondInterestRateValue = parseFloat(bondInterestRate.value) || 0;
        const bondYearsValue = parseFloat(bondYears.value) || 0;

        const loanAmountValue = parseFloat(loanAmount.value.replace(/,/g, '')) || 0;
        const loanInterestRateValue = parseFloat(loanInterestRate.value) || 0;
        const loanYearsValue = parseFloat(loanYears.value) || 0;

        let resultText = '';

        if (calculatorType.value === 'bond') {
            // Bond calculation logic (simple interest calculation)
            const interest = (bondAmountValue * bondInterestRateValue / 100) * bondYearsValue;
            const totalAmount = bondAmountValue + interest;
            resultText = `Total Amount Payable: TZS ${totalAmount.toLocaleString()}\nInterest: TZS ${interest.toLocaleString()}`;
        } else {
            // Loan calculation logic (simple interest calculation)
            const interest = (loanAmountValue * loanInterestRateValue / 100) * loanYearsValue;
            const totalAmount = loanAmountValue + interest;
            resultText = `Total Amount Payable: TZS ${totalAmount.toLocaleString()}\nInterest: TZS ${interest.toLocaleString()}`;
        }

        return resultText;
    }
});