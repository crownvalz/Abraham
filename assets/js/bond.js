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
        bondCalculatorFields.style.display = this.value === 'bond' ? 'block' : 'none';
        loanCalculatorFields.style.display = this.value === 'loan' ? 'block' : 'none';
    });

    // Handle form submission
    calculatorForm.addEventListener('submit', function (event) {
        event.preventDefault();
        resetValidation();
        
        let isValid = validateInputs();

        if (isValid) {
            let result;
            if (calculatorType.value === 'bond') {
                result = calculateBond();
            } else {
                result = calculateLoan();
            }

            modalResult.innerHTML = result;
            resultModal.show();
        }
    });

    // Clear form
    clearFormBtn.addEventListener('click', function () {
        calculatorForm.reset();
        resetValidation();
        bondCalculatorFields.style.display = 'block';
        loanCalculatorFields.style.display = 'none';
    });

    // Validation functions
    function resetValidation() {
        [bondAmount, bondInterestRate, bondYears, loanAmount, loanInterestRate, loanYears].forEach(input => {
            input.classList.remove('input-error', 'input-success');
        });
    }

    function markValid(inputs) {
        inputs.forEach(input => {
            input.classList.remove('input-error');
            input.classList.add('input-success');
        });
    }

    function markInvalid(inputs) {
        inputs.forEach(input => {
            input.classList.add('input-error');
        });
    }

    function validateInputs() {
        let isValid = true;
        if (calculatorType.value === 'bond') {
            if (!bondAmount.value || !bondInterestRate.value || !bondYears.value) {
                isValid = false;
                markInvalid([bondAmount, bondInterestRate, bondYears]);
            } else {
                markValid([bondAmount, bondInterestRate, bondYears]);
            }
        } else {
            if (!loanAmount.value || !loanInterestRate.value || !loanYears.value) {
                isValid = false;
                markInvalid([loanAmount, loanInterestRate, loanYears]);
            } else {
                markValid([loanAmount, loanInterestRate, loanYears]);
            }
        }
        return isValid;
    }

    function calculateBond() {
        const amount = parseFloat(bondAmount.value.replace(/,/g, ''));
        const interestRate = parseFloat(bondInterestRate.value);
        const years = parseFloat(bondYears.value);
        const frequency = bondFrequency.value;

        const totalInterest = (amount * interestRate / 100) * years;
        let paymentFrequency;
        let interestPaid;

        if (frequency === 'monthly') {
            interestPaid = totalInterest / (years * 12);
            paymentFrequency = "Monthly";
        } else if (frequency === 'quarterly') {
            interestPaid = totalInterest / (years * 4);
            paymentFrequency = "Quarterly";
        } else if (frequency === 'semi-annually') {
            interestPaid = totalInterest / (years * 2);
            paymentFrequency = "Semi-annually";
        } else if (frequency === 'yearly') {
            interestPaid = totalInterest / years;
            paymentFrequency = "Yearly";
        }

        return `
            <div>
                <h5>Bond Calculation Summary:</h5>
                <hr>
                <p><strong>Bond Amount:</strong> TZS ${amount.toLocaleString()}</p>
                <p><strong>Interest Rate:</strong> ${interestRate}%</p>
                <p><strong>Duration:</strong> ${years} years</p>
                <p><strong>Total Interest:</strong> TZS ${totalInterest.toLocaleString()}</p>
                <p><strong>Interest Paid (${paymentFrequency}):</strong> TZS ${interestPaid.toLocaleString()}</p>
            </div>
        `;
    }

    function calculateLoan() {
        const amount = parseFloat(loanAmount.value.replace(/,/g, ''));
        const interestRate = parseFloat(loanInterestRate.value);
        const years = parseFloat(loanYears.value);
        const totalPaid = amount + (amount * interestRate / 100) * years;
        const monthlyPayment = totalPaid / (years * 12);

        return `
            <div>
                <h5>Loan Calculation Summary:</h5>
                <hr>
                <p><strong>Loan Amount:</strong> TZS ${amount.toLocaleString()}</p>
                <p><strong>Interest Rate:</strong> ${interestRate}%</p>
                <p><strong>Duration:</strong> ${years} years</p>
                <p><strong>Total Payment:</strong> TZS ${totalPaid.toLocaleString()}</p>
                <p><strong>Monthly Payment:</strong> TZS ${monthlyPayment.toLocaleString()}</p>
            </div>
        `;
    }

    // Navbar toggler icon update
    navbarToggler.addEventListener('click', function () {
        this.classList.toggle('collapsed');
    });
});