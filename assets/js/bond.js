// JavaScript for Bond and Loan Calculator

document.addEventListener('DOMContentLoaded', function () {
    const navbarToggler = document.querySelector('.navbar-toggler');

    // Toggle navbar hamburger animation
    navbarToggler.addEventListener('click', function () {
        this.classList.toggle('collapsed');
    });

    // Switch calculator types between bond and loan
    document.getElementById("calculatorType").addEventListener("change", function () {
        const bondFields = document.getElementById("bondCalculatorFields");
        const loanFields = document.getElementById("loanCalculatorFields");

        if (this.value === "bond") {
            bondFields.style.display = "block";
            loanFields.style.display = "none";
        } else {
            bondFields.style.display = "none";
            loanFields.style.display = "block";
        }
    });

    // Format number inputs with commas for currency representation
    window.formatNumber = function (input) {
        const value = input.value.replace(/\D/g, '');
        input.value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Form submission logic for calculation
    document.getElementById('calculatorForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const calculatorType = document.getElementById('calculatorType').value;

        let result;
        if (calculatorType === 'bond') {
            result = calculateBond();
        } else if (calculatorType === 'loan') {
            result = calculateLoan();
        }

        // Display result in modal
        if (result) {
            document.getElementById('modalResult').textContent = result;
            const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
            resultModal.show();
        }
    });

    // Clear form logic
    document.getElementById('clearFormBtn').addEventListener('click', function () {
        document.getElementById('calculatorForm').reset();
    });

    // Function to calculate bond interest
    function calculateBond() {
        const bondAmount = parseFloat(document.getElementById('bondAmount').value.replace(/,/g, '')) || 0;
        const bondInterestRate = parseFloat(document.getElementById('bondInterestRate').value) || 0;
        const bondYears = parseInt(document.getElementById('bondYears').value) || 0;
        const bondFrequency = document.getElementById('bondFrequency').value;

        // Frequency mapping for calculations
        const frequencyMap = {
            'monthly': 12,
            'quarterly': 4,
            'semi-annually': 2,
            'yearly': 1
        };

        const periods = bondYears * frequencyMap[bondFrequency];
        const periodicRate = (bondInterestRate / 100) / frequencyMap[bondFrequency];
        const bondInterest = bondAmount * periodicRate * periods;

        return `Total Bond Interest Over ${bondYears} Years: TZS ${bondInterest.toFixed(2)}`;
    }

    // Function to calculate loan repayment
    function calculateLoan() {
        const loanAmount = parseFloat(document.getElementById('loanAmount').value.replace(/,/g, '')) || 0;
        const loanInterestRate = parseFloat(document.getElementById('loanInterestRate').value) || 0;
        const loanYears = parseInt(document.getElementById('loanYears').value) || 0;

        const monthlyRate = (loanInterestRate / 100) / 12;
        const numberOfPayments = loanYears * 12;
        const monthlyRepayment = loanAmount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

        return `Monthly Loan Repayment Over ${loanYears} Years: TZS ${monthlyRepayment.toFixed(2)}`;
    }
});