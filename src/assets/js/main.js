// Add event listener for the Reverse button.
document.getElementById("btnSubmit").addEventListener("click", getValue);

// Get the input and select elements
const selectChoose = document.querySelector("#chooseStr");
const selectInput = document.querySelector("#inputStr");

// The select box choice will populate the input element.
selectChoose.addEventListener("change", () => {
    let inputStr = selectChoose.options[selectChoose.selectedIndex].text;
    selectInput.value = inputStr;
});



// This function is called by the button.
function getValue() {
    // Get the value of the input element.
    let userInput = selectInput.value;

    // Pass the userString to the isBalanced helper function.
    let result = isBalanced(userInput);

    // Pass the result to the displayResults helper function.
    displayResults(result, userInput); // Will be bool type; true or false.
}

function isBalanced(exp) {
    // Array to hold the opening brackets for comparison.
    let stack = [];

    // If the string is empty, or has no brackets, prompt user to enter a string with brackets.
    let regExp = /\(|\)|\[|\]|\{|\}/g;
    if (exp.length == 0 || !exp.match(regExp)) {
        alert("Please enter a string with brackets.");
        selectInput.focus();
    }

    // Loop through the string.
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] == "(" || exp[i] == "{" || exp[i] == "[") {
            //Find the opening brackets and put the in the stack array.
            stack.push(exp[i]);
            continue;
        } else if (exp[i] == ")" || exp[i] == "}" || exp[i] == "]") {
            //When we come across a closing bracket, check if it matches the previous opening bracket.

            // First check if the opening brackets stack is empty.
            // If it is, the brackets are balanced and we are done.
            if (stack.length == 0) {
                return false;
            }

            // Take out the most recent opening bracket stored in the stack array.
            let check = stack.pop();

            switch (exp[i]) {
                // If this index is this closing bracket,
                case ")":
                    // And it doesn't match the correct opening bracket pulled from the stack array,
                    if (check != "(") {
                        //Then the brackets are not balanced.
                        return false;
                    }
                    break;

                case "}":
                    if (check != "{") {
                        return false;
                    }
                    break;

                case "]":
                    if (check != "[") {
                        return false;
                    }
                    break;
            };
        }
    }
    // Check to see if the stack array is empty
    if (stack.length > 0) {
        //If it's not empty, the brackets are not balanced.
        return false;
    }
    return true;
}

function displayResults(result, userInput) {
    // Get the element that will display the results.
    let display = document.getElementById("results");

    // Remove all the characters from a string except the brackets for display.
    userInput = userInput.replace(/[^\(|^\)|^\[|^\]|^\{|^\}]/g, "");

    // Check for a truthy value and display the results accordingly.
    if (result) {
        display.innerHTML = `<span style="background-color:lightgray;">&nbsp;${userInput}&nbsp;</span>&nbsp;&nbsp;These brackets are balanced.`
    } else {
        display.innerHTML = `<span style="background-color:lightgray;">&nbsp;${userInput}&nbsp;</span>&nbsp;&nbsp;These brackets are not balanced.`
    }

}
