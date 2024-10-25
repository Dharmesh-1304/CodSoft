// Get the display element
const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = '';

// Function to update the display
function updateDisplay(value) {
    display.textContent = value;
}

// Get all buttons and add click event listeners
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        
        if (value === 'C') {
            // Clear all inputs
            currentInput = '';
            previousInput = '';
            operator = '';
            updateDisplay('0');
        } else if (value === '=') {
            // Perform calculation
            if (previousInput && operator) {
                calculate();
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            // Handle operator input
            if (currentInput) {
                if (previousInput) {
                    calculate();  // Calculate if there is already an operator
                }
                operator = value;
                previousInput = currentInput;
                currentInput = '';
            }
        } else {
            // Handle number and decimal input
            currentInput += value;
            updateDisplay(currentInput);
        }
    });
});

// Function to perform the calculation
function calculate() {
    let result = 0;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
}
