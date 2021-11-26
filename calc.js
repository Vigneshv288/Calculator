class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear () {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            case '^':
                computation = prev ** current
                break    
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
       const stringNumber = number.toString()
       const integerDigits = parseFloat(stringNumber.split('.')[0])
       const decimalDigits = stringNumber.split('.')[1]
       let integerDisplay

       const inputDigits = parseFloat(stringNumber.split('-')[0])
       const minusDigits = stringNumber.split('-')[1]

       if (isNaN(integerDigits)) {
           integerDisplay = ''
       } else {
           integerDisplay = integerDigits.toLocaleString('en', {
               maximumFractionDigits: 0 })
       }
       if (decimalDigits != null) {
           return `${integerDisplay}.${decimalDigits}`
       }
       
       if (isNaN(inputDigits)) {
           integerDisplay = ''
       }
       else {
           integerDisplay = inputDigits.toLocaleString('en', {
               maximumFractionDigits: 0 })
       }
       if (minusDigits != null) {
           return `${integerDisplay}-${minusDigits}`
       }
        else {
           return integerDisplay
       }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`    
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const expPowerButton = document.querySelector('[data-ExponentialOperation]')
const signButton = document.querySelector('[data-inverseSign]')
const equalButton = document.querySelector('[data-equal]')
const delButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-allClear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

signButton.addEventListener('click', () => {
        calculator.appendNumber('-')
        calculator.updateDisplay()
    })

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

expPowerButton.addEventListener('click', () => {
        calculator.chooseOperation('^')
        calculator.updateDisplay()
    })

equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
    calculator.clear()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

delButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
