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

                // Calculate total interest
                const totalInterest = (amount * interestRate / 100) * years;
                let paymentFrequency;
                let interestPaid;

                // Calculate interest based on selected frequency
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

                // Format results
                result = `
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
            } else {
                // Loan calculation logic
                const amount = parseFloat(loanAmount.value.replace(/,/g, ''));
                const interestRate = parseFloat(loanInterestRate.value);
                const years = parseFloat(loanYears.value);
                const totalPaid = amount + (amount * interestRate / 100) * years;
                const monthlyPayment = totalPaid / (years * 12);

                // Format results
                result = `
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

    // Update navbar toggler icon
    navbarToggler.addEventListener('click', function () {
        if (this.classList.contains('collapsed')) {
            this.classList.remove('collapsed');
        } else {
            this.classList.add('collapsed');
        }
    });
});