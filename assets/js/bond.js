document.addEventListener("DOMContentLoaded", function () {
    const calculatorType = document.getElementById('calculatorType');
    const bondCalculatorFields = document.getElementById('bondCalculatorFields');
    const loanCalculatorFields = document.getElementById('loanCalculatorFields');
    const calculatorForm = document.getElementById('calculatorForm');
    const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    const modalResult = document.getElementById('modalResult');
    const clearFormBtn = document.getElementById('clearFormBtn');

    calculatorType.addEventListener('change', function () {
        if (this.value === 'bond') {
            bondCalculatorFields.classList.remove('d-none');
            loanCalculatorFields.classList.add('d-none');
        } else {
            bondCalculatorFields.classList.add('d-none');
            loanCalculatorFields.classList.remove('d-none');
        }
    });

    calculatorForm.addEventListener('submit', function (event) {
        event.preventDefault();
        let result = `<div>Results will be displayed here based on the selected calculator type.</div>`;
        modalResult.innerHTML = result;
        resultModal.show();
    });

    clearFormBtn.addEventListener('click', function () {
        calculatorForm.reset();
        bondCalculatorFields.classList.remove('d-none');
        loanCalculatorFields.classList.add('d-none');
    });
});