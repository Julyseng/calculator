var numString = ''
var numArray = []
let display = document.getElementById('display')
let isPreviousResult = false

// listening for a click event, and getting a button value

listen()

function listen () {
  document.addEventListener('click', getButtonValue)
}

function getButtonValue () {
  let button = event.target.value
  if (!isNaN(button) || button === '.') {
    // if button is not number or a . then execute number button function
    number(button)
  } else if (button === 'AC') {
    // if the button is AC then execute the all clear function
    allClear()
  } else if (button === 'CE') {
    // if the button is CE then execute the clear function
    clear()
  } else if (button === '=') {
    // otherwise if button is equal to then execute calculate function
    calculate()
  } else {
    // or store the number
    storeNumber(button)
  }
}

// declaring number function with button parameter
function number (button) {
  if (button === '.' && numString.includes('.')) {
    return
    // if button is . and numString includes a . then stop executing
  } else if (numString.charAt(0) === '0' && numString.length === 1 && button === '0') {
    return
    {/* if the position of character 0 is equal to 0 
      and if the length of the string is 1
      and the button is 0
    */}
  } else {
    
    if (isPreviousResult === true){
      numString = ''
      isPreviousResult = false
    }
    numString += button
    display.value = numString
  }
}

function allClear () {
  numString = ''
  numArray = []
  display.value = '0'
}

function clear () {
  numString = ''
  display.value = '0'
}

function storeNumber (button) {
  if (numString === '' && numArray.length === 0) {
    return
  } else if (numString === '') {
    numArray.length = numArray.length - 1
    numArray.push(button)
  } else {
    numArray.push(numString)
    numArray.push(button)
    numString = ''
  }
}

function calculate () {
  numArray.push(numString)
  let currentNumber = Number(numArray[0])
  for (var i = 0; i < numArray.length; i++) {
    let nextNumber = Number(numArray[i + 1])
    let symbol = numArray[i]
    if (symbol === '+') {
      currentNumber += nextNumber
    } else if (symbol === '-') {
      currentNumber -= nextNumber
    } else if (symbol === '*') {
      currentNumber *= nextNumber
    } else if (symbol === '/') {
      currentNumber /= nextNumber
    }
  }
  if (currentNumber < 0) {
    currentNumber = Math.abs(currentNumber) + '-'
  }

  display.value = currentNumber
  numString = JSON.stringify(currentNumber)
  isPreviousResult = true
  numArray = []
}
