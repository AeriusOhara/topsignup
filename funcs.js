// We can add regex patterns below for various other checks
    // as the login form requires
    var regexDict = {
        "name": /^[A-Za-z]+$/,
        "email": /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "phone": /^([+]46)\s*(7[02369])\s*(\d{4})\s*(\d{3})$/,
        "passwd": /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    };

    var errorMessages = {
        "fname": "First name can only contain latin characters from A to Z.",
        "lname": "Last name can only contain latin characters from A to Z.",
        "email": "E-mail must be in the following format: xxx@yyy.zzz",
        "phoneno": "Phone number requires the Swedish format: +46 xx xxxx xxx, without spaces.",
        "pass": "Passwords must be at least 8 characters and contain at least one uppercase character and one number.",
        "cpass": "Passwords must be at least 8 characters and contain at least one uppercase character and one number.",
        "passMatchFail": "Passwords are the not same."
    };

function runRegexValidation(inputId, input_element, regexKey){
    isValid = input_element.value.match(regexDict[regexKey]);

    // If the regex does not match, show the error through both
    // styling the text box red, but also by adding descriptive
    // text underneath to instruct the user on what to fix and how
    if(!isValid){
        showError(inputId, input_element);
    }

    return isValid;
}

// Attach an eventListener using the regexDict above to assign
// which field is checked for which specific regex
function attachEventListenerRegex(inputId, input_element, regexKey){
    input_element.addEventListener("keyup", (event) => {
        if(input_element.value == "" || runRegexValidation(inputId, input_element, regexKey)){
            hideError(inputId, input_element);
        }
    });
}

// Comparelistener will attach to both pass and cpass to compare 
// either one of them on keyup (whenever a key is released.
function attachPassCompareListener(inputId, input_element1, input_element2, errorMessage){
    [input_element1, input_element2].forEach(function(element){
        element.addEventListener("keyup", (event) => {
            if(input_element1.value == "" || input_element2.value == ""){
                return;
            }

            if(input_element1.value == input_element2.value){
                hideErrorVisual(input_element1);
                hideErrorVisual(input_element2);

                hideErrorTextDesc(inputId);
            } else {
                showErrorVisual(input_element1);
                showErrorVisual(input_element2);
                
                showErrorTextDesc(inputId, errorMessages["passMatchFail"]);
            }
        });
    });
}

// Final full validation upon clicking the submit button
const fullValidate = (evt) => {
    validated = 0;
    
    validated += runRegexValidation("fname", fname, "name") ? 0 : 1;
    validated += runRegexValidation("lname", lname, "name") ? 0 : 1;
    validated += runRegexValidation("email", email, "email") ? 0 : 1;
    validated += runRegexValidation("phoneno", phoneno, "phone") ? 0 : 1;
    validated += runRegexValidation("pass", pass, "passwd") ? 0 : 1;
    //validated = runRegexValidation("cpass", cpass, "passwd");

    if(validated > 0){
        evt.preventDefault();
    }
}

function showError(inputId, input_element){
    showErrorVisual(input_element);
    showErrorTextDesc(inputId);
}

function hideError(inputId, input_element){
    hideErrorVisual(input_element);
    hideErrorTextDesc(inputId);
}

function showErrorTextDesc(inputId, errorMessage = ""){
    var errorBox = document.getElementById(inputId + "_error");

    if(errorMessage == ""){
        errorBox.innerText = errorMessages[inputId];
    } else {
        errorBox.innerText = errorMessage;
    }
    
    errorBox.classList.remove("hidden");
}

function hideErrorTextDesc(inputId){
    var errorBox = document.getElementById(inputId + "_error");

    errorBox.innerText = "";
    errorBox.classList.add("hidden");
}

function showErrorVisual(input_element){
    input_element.classList.add("error");
}

function hideErrorVisual(input_element){
    input_element.classList.remove("error");
}

function switchTheme(){
    const root = document.documentElement;
    const curTheme = root.className;
    var newTheme = '';

    themeSwitchBtn = document.querySelector('.theme-switcher');

    if(curTheme == 'light'){
        newTheme = 'dark';
    }
    else {
        newTheme = 'light';
    }

    root.className = newTheme;
    themeSwitchBtn.style.backgroundImage = "url('images/" + newTheme + ".svg')";
}