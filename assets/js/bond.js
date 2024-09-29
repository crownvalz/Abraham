// Switch calculator types
document.getElementById("calculatorType").addEventListener("change", function() {
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

// Format number with commas
function formatNumber(input) {
    let value = input.value.replace(/,/g, ''); // Remove existing commas
    if (!isNaN(value) && value.trim() !== "") {
        input.value = parseInt(value).toLocaleString(); // Add commas
    }
}

// Validate input fields
function validateInput(field) {
    const validIcon = field.nextElementSibling; // To show checkmark icon
    if (field.value.trim() === "") {
        field.classList.add("border", "border-danger");
        field.classList.remove("border-success");
        if (validIcon) validIcon.style.display = "none"; // Hide checkmark
    } else {
        field.classList.add("border", "border-success");
        field.classList.remove("border-danger");
        if (validIcon) validIcon.style.display = "block"; // Show checkmark
    }
}

// Calculation logic
document.getElementById("calculateBtn").addEventListener("click", function(event) {
    event.preventDefault();
    const isBond = document.getElementById("calculatorType").value === "bond";
    const amountField = isBond ? document.getElementById("bondAmount") : document.getElementById("loanAmount");
    const interestField = isBond ? document.getElementById("bondInterestRate") : document.getElementById("loanInterestRate");
    const yearsField = isBond ? document.getElementById("bondYears") : document.getElementById("loanYears");
    const frequency = isBond ? document.getElementById("bondFrequency").value : "monthly";

    // Validate input fields
    validateInput(amountField);
    validateInput(interestField);
    validateInput(yearsField);

    const amount = parseFloat(amountField.value.replace(/,/g, '')); // Remove commas for calculation
    const interestRate = parseFloat(interestField.value);
    const years = parseInt(yearsField.value);

    if (isNaN(amount) || isNaN(interestRate) || isNaN(years)) {
        return; // Exit if any field is invalid
    }

    let totalAmount, interest, interestPerPeriod;
    const periods = { "monthly": 12, "quarterly": 4, "semi-annually": 2, "yearly": 1 };
    
    if (isBond) {
        // Bond calculation logic
        interest = (amount * interestRate / 100) * years;
        totalAmount = amount + interest;
        interestPerPeriod = (amount * (interestRate / 100)) / periods[frequency];
    } else {
        // Loan calculation logic (example)
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
        <p><strong>Interest Paid ${frequency}:</strong> ${interestPerPeriod.toLocaleString()} TZS per ${frequency}</p>
    `;
    document.getElementById("modalResult").innerHTML = resultContent;
    new bootstrap.Modal(document.getElementById('resultModal')).show();
});

// Clear form
document.getElementById("clearFormBtn").addEventListener("click", function() {
    document.getElementById("calculatorForm").reset();
    const fields = document.querySelectorAll(".form-control");
    fields.forEach(field => {
        field.classList.remove("border-danger", "border-success");
        const validIcon = field.nextElementSibling;
        if (validIcon) validIcon.style.display = "none"; // Hide checkmarks
    });
    document.getElementById("bondCalculatorFields").style.display = "block";
    document.getElementById("loanCalculatorFields").style.display = "none";
});