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

// Format number with commas as user types
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

// Add checkmark to validated input
function addCheckMark(field) {
    const validIcon = document.createElement("span");
    validIcon.innerHTML = " &#10003;";
    validIcon.classList.add("text-success", "checkmark");
    field.parentNode.appendChild(validIcon);
}

// Remove any existing checkmarks
function removeCheckMark(field) {
    const checkmarks = field.parentNode.querySelectorAll(".checkmark");
    checkmarks.forEach(mark => mark.remove());
}

// Calculation logic
document.getElementById("calculateBtn").addEventListener("click", function(event) {
    event.preventDefault();

    const isBond = document.getElementById("calculatorType").value === "bond";
    const amountField = isBond ? document.getElementById("bondAmount") : document.getElementById("loanAmount");
    const interestField = isBond ? document.getElementById("bondInterestRate") : document.getElementById("loanInterestRate");
    const yearsField = isBond ? document.getElementById("bondYears") : document.getElementById("loanYears");
    const frequency = isBond ? document.getElementById("bondFrequency").value : "monthly";

    // Validate and apply border colors/checkmarks
    validateInput(amountField);
    validateInput(interestField);
    validateInput(yearsField);
    removeCheckMark(amountField);
    removeCheckMark(interestField);
    removeCheckMark(yearsField);

    if (amountField.value && interestField.value && yearsField.value) {
        addCheckMark(amountField);
        addCheckMark(interestField);
        addCheckMark(yearsField);
    }

    const amount = parseFloat(amountField.value.replace(/,/g, ''));
    const interestRate = parseFloat(interestField.value);
    const years = parseInt(yearsField.value);

    if (isNaN(amount) || isNaN(interestRate) || isNaN(years)) {
        return; // Exit if any field is invalid
    }

    let totalAmount, interest, interestPeriod;

    if (isBond) {
        // Bond calculation logic
        interest = (amount * interestRate / 100) * years;

        // Adjust based on frequency
        switch (frequency) {
            case 'monthly':
                interestPeriod = interest / (years * 12);
                break;
            case 'quarterly':
                interestPeriod = interest / (years * 4);
                break;
            case 'semi-annually':
                interestPeriod = interest / (years * 2);
                break;
            case 'yearly':
                interestPeriod = interest / years;
                break;
        }
        totalAmount = amount + interest;
    } else {
        // Loan calculation logic (example)
        const monthlyRate = interestRate / 100 / 12;
        const months = years * 12;
        const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
        totalAmount = monthlyPayment * months;
        interest = totalAmount - amount;
        interestPeriod = monthlyPayment; // Assuming monthly payments for loans
    }

    // Prepare and display results in a well-organized manner
    const resultContent = `
        <p><strong>Amount:</strong> ${amount.toLocaleString()} TZS</p>
        <p><strong>Interest Rate:</strong> ${interestRate}%</p>
        <p><strong>Duration:</strong> ${years} Years</p>
        <p><strong>Frequency:</strong> ${capitalizeFirstLetter(frequency)}</p>
        <p><strong>Total Interest:</strong> ${interest.toLocaleString()} TZS</p>
        <p><strong>Interest Paid (${capitalizeFirstLetter(frequency)}):</strong> ${interestPeriod.toLocaleString()} TZS</p>
        <p><strong>Total Amount:</strong> ${totalAmount.toLocaleString()} TZS</p>
    `;
    document.getElementById("modalResult").innerHTML = resultContent;
    new bootstrap.Modal(document.getElementById('resultModal')).show();
});

// Clear form and reset fields
document.getElementById("clearFormBtn").addEventListener("click", function() {
    document.getElementById("calculatorForm").reset();
    const fields = document.querySelectorAll(".form-control");
    fields.forEach(field => {
        field.classList.remove("border-danger", "border-success");
        removeCheckMark(field);
    });
    document.getElementById("bondCalculatorFields").style.display = "block";
    document.getElementById("loanCalculatorFields").style.display = "none";
});

// Capitalize first letter for frequency display
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}