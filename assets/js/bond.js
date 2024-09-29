document.addEventListener('DOMContentLoaded', function () {
    const calculatorType = document.getElementById('calculatorType');
    const bondCalculatorFields = document.getElementById('bondCalculatorFields');
    const loanCalculatorFields = document.getElementById('loanCalculatorFields');
    const calculatorForm = document.getElementById('calculatorForm');
    const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    const modalResult = document.getElementById('modalResult');
    const clearFormBtn = document.getElementById('clearFormBtn');
    const navbarToggler = document.querySelector('.navbar-toggler');

    calculatorType.addEventListener('change', function () {
        bondCalculatorFields.style.display = this.value === 'bond' ? 'block' : 'none';
        loanCalculatorFields.style.display = this.value === 'loan' ? 'block' : 'none';
    });

    calculatorForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        // Clear previous errors
        const inputs = this.querySelectorAll('.form-control');
        inputs.forEach(input => input.classList.remove('error'));

        let isValid = true;
        if (calculatorType.value === 'bond') {
            const bondAmount = document.getElementById('bondAmount').value;
            const bondInterestRate = document.getElementById('bondInterestRate').value;
            const bondYears = document.getElementById('bondYears').value;

            if (!bondAmount || !bondInterestRate || !bondYears) {
                isValid = false;
                if (!bondAmount) document.getElementById('bondAmount').classList.add('error');
                if (!bondInterestRate) document.getElementById('bondInterestRate').classList.add('error');
                if (!bondYears) document.getElementById('bondYears').classList.add('error');
            }

            if (isValid) {
                const bondResult = calculateBond(bondAmount, bondInterestRate, bondYears);
                modalResult.innerHTML = bondResult;
                resultModal.show();
            }
        } else if (calculatorType.value === 'loan') {
            const loanAmount = document.getElementById('loanAmount').value;
            const loanInterestRate = document.getElementById('loanInterestRate').value;
            const loanYears = document.getElementById('loanYears').value;

            if (!loanAmount || !loanInterestRate || !loanYears) {
                isValid = false;
                if (!loanAmount) document.getElementById('loanAmount').classList.add('error');
                if (!loanInterestRate) document.getElementById('loanInterestRate').classList.add('error');
                if (!loanYears) document.getElementById('loanYears').classList.add('error');
            }

            if (isValid) {
                const loanResult = calculateLoan(loanAmount, loanInterestRate, loanYears);
                modalResult.innerHTML = loanResult;
                resultModal.show();
            }
        }
    });

    clearFormBtn.addEventListener('click', function () {
        calculatorForm.reset();
        inputs.forEach(input => input.classList.remove('error'));
        bondCalculatorFields.style.display = 'block';
        loanCalculatorFields.style.display = 'none';
    });

    // Toggle Navbar Button
    navbarToggler.addEventListener('click', function () {
        this.classList.toggle('collapsed');
    });

    function calculateBond(amount, interestRate, years) {
        const principal = parseFloat(amount);
        const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest
        const payments = years * 12;

        const monthlyPayment = (principal * rate) / (1 - Math.pow(1 + rate, -payments));
        const totalPayment = monthlyPayment * payments;
        const totalInterest = totalPayment - principal;

        return `
            <p><strong>Bond Calculation Details:</strong></p>
            <p>Monthly Payment: TZS ${monthlyPayment.toFixed(2)}</p>
            <p>Total Payment Over ${years} Years: TZS ${totalPayment.toFixed(2)}</p>
            <p>Total Interest Paid: TZS ${totalInterest.toFixed(2)}</p>
        `;
    }

    function calculateLoan(amount, interestRate, years) {
        const principal = parseFloat(amount);
        const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest
        const payments = years * 12;

        const monthlyPayment = (principal * rate) / (1 - Math.pow(1 + rate, -payments));
        const totalPayment = monthlyPayment * payments;
        const totalInterest = totalPayment - principal;

        return `
            <p><strong>Loan Calculation Details:</strong></p>
            <p>Monthly Payment: TZS ${monthlyPayment.toFixed(2)}</p>
            <p>Total Payment Over ${years} Years: TZS ${totalPayment.toFixed(2)}</p>
            <p>Total Interest Paid: TZS ${totalInterest.toFixed(2)}</p>
        `;
    }
});
