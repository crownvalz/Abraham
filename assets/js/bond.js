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
});

// Handle form submission (you can add your calculation logic here)
document.getElementById('calculatorForm').addEventListener('submit', function (event) {
    event.preventDefault();
    // Insert your bond/loan calculation logic here
    const modalResult = document.getElementById('modalResult');
    modalResult.innerHTML = '<p>Calculation result will be displayed here.</p>';  // Replace with actual results
    const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    resultModal.show();
});