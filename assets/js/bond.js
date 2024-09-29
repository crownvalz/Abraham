// Toggle animation for hamburger icon
const toggler = document.querySelector('.navbar-toggler');
toggler.addEventListener('click', () => {
    toggler.classList.toggle('collapsed');
});

// Switching between Bond and Loan calculator fields
const calculatorType = document.getElementById('calculatorType');
const bondCalculatorFields = document.getElementById('bondCalculatorFields');
const loanCalculatorFields = document.getElementById('loanCalculatorFields');

calculatorType.addEventListener('change', (event) => {
    if (event.target.value === 'loan') {
        bondCalculatorFields.style.display = 'none';
        loanCalculatorFields.style.display = 'block';
    } else {
        bondCalculatorFields.style.display = 'block';
        loanCalculatorFields.style.display = 'none';
    }
});

// Clear form button functionality
const clearFormBtn = document.getElementById('clearFormBtn');
clearFormBtn.addEventListener('click', () => {
    document.getElementById('calculatorForm').reset();
    bondCalculatorFields.style.display = 'block';
    loanCalculatorFields.style.display = 'none';
    clearValidationStyles();
});

// Handle form submission for Bond Calculator
document.getElementById('calculatorForm').addEventListener('submit', function (event) {
    event.preventDefault();
    clearValidationStyles(); // Reset validation styles
    const modalResult = document.getElementById('modalResult');

    let isValid = validateForm();

    if (isValid) {
        if (calculatorType.value === 'bond') {
            const bondAmount = parseFloat(removeCommas(document.getElementById('bondAmount').value));
            const bondInterestRate = parseFloat(document.getElementById('bondInterestRate').value) / 100;
            const bondYears = parseFloat(document.getElementById('bondYears').value);
            const bondFrequency = document.getElementById('bondFrequency').value;

            // Calculate total payment and interest
            const numberOfPayments = bondYears * getPaymentsPerYear(bondFrequency);
            const monthlyInterestRate = bondInterestRate / getPaymentsPerYear(bondFrequency);
            const bondPayment = (bondAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
            const totalPayment = bondPayment * numberOfPayments;
            const totalInterest = totalPayment - bondAmount;

            // Display results
            modalResult.innerHTML = `
                <p><strong>Bond Payment:</strong> TZS ${bondPayment.toFixed(2)}</p>
                <p><strong>Total Payment:</strong> TZS ${totalPayment.toFixed(2)}</p>
                <p><strong>Total Interest:</strong> TZS ${totalInterest.toFixed(2)}</p>
            `;

        } else if (calculatorType.value === 'loan') {
            const loanAmount = parseFloat(removeCommas(document.getElementById('loanAmount').value));
            const loanInterestRate = parseFloat(document.getElementById('loanInterestRate').value) / 100;
            const loanYears = parseFloat(document.getElementById('loanYears').value);

            // Calculate monthly payment
            const numberOfPayments = loanYears * 12;
            const monthlyInterestRate = loanInterestRate / 12;
            const loanPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
            const totalPayment = loanPayment * numberOfPayments;
            const totalInterest = totalPayment - loanAmount;

            // Display results
            modalResult.innerHTML = `
                <p><strong>Loan Payment:</strong> TZS ${loanPayment.toFixed(2)}</p>
                <p><strong>Total Payment:</strong> TZS ${totalPayment.toFixed(2)}</p>
                <p><strong>Total Interest:</strong> TZS ${totalInterest.toFixed(2)}</p>
            `;
        }

        const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
        resultModal.show();
    }
});

// Function to validate form fields
function validateForm() {
    let isValid = true;
    const requiredFields = document.querySelectorAll('#calculatorForm input, #calculatorForm select');

    requiredFields.forEach(field => {
        if (field.value === '') {
            field.classList.add('is-invalid'); // Add red border
            isValid = false;
        } else {
            field.classList.remove('is-invalid'); // Remove red border if valid
        }
    });

    return isValid;
}

// Function to remove validation styles
function clearValidationStyles() {
    const fields = document.querySelectorAll('#calculatorForm input, #calculatorForm select');
    fields.forEach(field => {
        field.classList.remove('is-invalid');
    });
}

// Function to get the number of payments per year based on frequency
function getPaymentsPerYear(frequency) {
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

// Add comma formatting to bondAmount and loanAmount input fields
const bondAmountInput = document.getElementById('bondAmount');
const loanAmountInput = document.getElementById('loanAmount');

[bondAmountInput, loanAmountInput].forEach(input => {
    if (input) {
        input.addEventListener('input', function (event) {
            const value = event.target.value.replace(/,/g, ''); // Remove existing commas
            if (!isNaN(value) && value.length > 0) {
                event.target.value = addCommas(value);
            }
        });
    }
});

// Function to add commas to a number string
function addCommas(value) {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Function to remove commas from a number string
function removeCommas(value) {
    return value.replace(/,/g, '');
}