document.addEventListener("DOMContentLoaded", function () {
    const bondCalculatorFields = document.getElementById("bondCalculatorFields");
    const loanCalculatorFields = document.getElementById("loanCalculatorFields");
    const calculatorType = document.getElementById("calculatorType");
    const calculateBtn = document.getElementById("calculateBtn");
    const clearFormBtn = document.getElementById("clearFormBtn");
    const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    const modalResult = document.getElementById('modalResult');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarMenu = document.getElementById('navbarMenu');

    // Toggle calculator types (bond/loan)
    calculatorType.addEventListener("change", function () {
        if (this.value === "bond") {
            bondCalculatorFields.style.display = "block";
            loanCalculatorFields.style.display = "none";
        } else {
            bondCalculatorFields.style.display = "none";
            loanCalculatorFields.style.display = "block";
        }
    });

    // Format number with commas
    function formatNumber(input) {
        let value = input.value.replace(/,/g, '');
        if (!isNaN(value) && value.trim() !== "") {
            input.value = parseInt(value).toLocaleString();
        }
    }

    // Validate input fields
    function validateInput(field) {
        if (field.value.trim() === "") {
            field.classList.add("border", "border-danger");
            field.classList.remove("border-success");
        } else {
            field.classList.add("border", "border-success");
            field.classList.remove("border-danger");
        }
    }

    // Calculation logic
    calculateBtn.addEventListener("click", function (event) {
        event.preventDefault();

        const isBond = calculatorType.value === "bond";
        const amountField = isBond ? document.getElementById("bondAmount") : document.getElementById("loanAmount");
        const interestField = isBond ? document.getElementById("bondInterestRate") : document.getElementById("loanInterestRate");
        const yearsField = isBond ? document.getElementById("bondYears") : document.getElementById("loanYears");
        const frequency = isBond ? document.getElementById("bondFrequency").value : "monthly";

        // Validate fields
        validateInput(amountField);
        validateInput(interestField);
        validateInput(yearsField);

        const amount = parseFloat(amountField.value.replace(/,/g, ''));
        const interestRate = parseFloat(interestField.value);
        const years = parseInt(yearsField.value);

        if (isNaN(amount) || isNaN(interestRate) || isNaN(years)) {
            return; // Exit if any field is invalid
        }

        let totalAmount, interest;
        if (isBond) {
            // Bond calculation logic
            interest = (amount * interestRate / 100) * years;
            totalAmount = amount + interest;
        } else {
            // Loan calculation logic
            const monthlyRate = interestRate / 100 / 12;
            const months = years * 12;
            const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
            totalAmount = monthlyPayment * months;
            interest = totalAmount - amount;
        }

        // Prepare and display results
        const resultContent = `
            <p><strong>Amount:</strong> ${amount.toLocaleString()} TZS</p>
            <p><strong>Interest Rate:</strong> ${interestRate}%</p>
            <p><strong>Duration:</strong> ${years} Years</p>
            <p><strong>Total Interest:</strong> ${interest.toLocaleString()} TZS</p>
            <p><strong>Total Amount:</strong> ${totalAmount.toLocaleString()} TZS</p>
            <p><strong>Interest Paid:</strong> ${interest / years} TZS per year</p>
        `;
        modalResult.innerHTML = resultContent;
        resultModal.show();
    });

    // Clear form and reset styles
    clearFormBtn.addEventListener("click", function () {
        document.getElementById("calculatorForm").reset();
        const fields = document.querySelectorAll(".form-control");
        fields.forEach(field => {
            field.classList.remove("border-danger", "border-success");
        });
        bondCalculatorFields.style.display = "block";
        loanCalculatorFields.style.display = "none";
    });

    // Navbar toggle functionality for mobile
    navbarToggler.addEventListener('click', function () {
        navbarMenu.classList.toggle('show');
        this.classList.toggle('collapsed');
    });

    // Auto-hide navbar on link click in mobile view
    document.querySelectorAll('.nav-link').forEach(function (navLink) {
        navLink.addEventListener('click', function () {
            if (navbarMenu.classList.contains('show')) {
                navbarMenu.classList.remove('show');
                navbarToggler.classList.add('collapsed');
            }
        });
    });
});