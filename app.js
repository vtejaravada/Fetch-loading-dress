
const form = document.getElementById("form");
const cname = document.getElementById("cname");
const email = document.getElementById("email");
const phoneno = document.getElementById("phoneno");
const ntop = document.getElementById("top1");
const itop = document.getElementById("top2");
const jtop = document.getElementById("top3");
const ltop = document.getElementById("top4");
const tandc = document.getElementById("tc");

const resultContainer = document.getElementById("result");

var isValidName = false;
var isValidEmail = false;
var isValidPhoneno = false;
var isValidNtop = false;
var isValidJtop = false;
var isValidLtop = false;
var isValidItop = false;
var isValidTCChecked = false;

cname.addEventListener("keyup", checkUserName)
email.addEventListener("keyup", checkUserEmail)
phoneno.addEventListener("keyup", checkUserphoneno)
ntop.addEventListener("keyup", checkUserntop)
jtop.addEventListener("keyup", checkUserjtop)
itop.addEventListener("keyup", checkUseritop)
ltop.addEventListener("keyup", checkUserltop)

form.addEventListener("submit", (e) => {
    e.preventDefault();
    validate();
});

function validate() {

    // Cname name Check
    checkUserName()

    // email check 
    checkUserEmail()

    // Phoneno Check 
    checkUserphoneno()

    // Product Check 
    checkUserntop()

    // 2
    checkUserjtop()

    // 3
    checkUseritop()

    //4
    checkUserltop()

    // check box 
    if (!tandc.checked) {
        setError(tc, 'click on agree terms checkbox')
    }
    else {
        setSuccess(tc)
        isValidTCChecked = true;
    }

    if (
        isValidTCChecked
    ) {

        // Create and update personal details elements
        const personalDetails = document.createElement("div");
        personalDetails.innerHTML = `
            <h3>Personal Details</h3>
            <p><strong>Name :</strong> ${cname.value}</p>
            <p><strong>Email :</strong> ${email.value}</p>
            <p><strong>Phone No :</strong> ${phoneno.value}</p>
            `;
        resultContainer.appendChild(personalDetails);

        // Calculate total product value
        const ntopValue = parseInt(ntop.value, 10);
        const itopValue = parseInt(itop.value, 10);
        const jtopValue = parseInt(jtop.value, 10);
        const ltopValue = parseInt(ltop.value, 10);

        const totalProductValue = ntopValue + itopValue + jtopValue + ltopValue;

        // Calculate GST (Assuming 18%)
        const gstRate = 0.18;
        const gstAmount = totalProductValue * gstRate;

        // Calculate total amount with GST
        const totalAmount = totalProductValue + gstAmount;

        // Create and update product details elements
        const productDetails = document.createElement("div");
        productDetails.innerHTML = `
            <h3>Product Details</h3>
            <p><strong>Indian Dress :</strong> ${ntopValue}</p>
            <p><strong>Jeans :</strong> ${itopValue}</p>
            <p><strong>Crop Tops :</strong> ${jtopValue}</p>
            <p><strong>Latest Saree :</strong> ${ltopValue}</p>
            <hr>
            <p><strong>Total Product Value :</strong> ${totalProductValue}</p>
            <p><strong>GST (18%) :</strong> ${gstAmount}</p>
            <br>
            <hr>

            <p><strong>Total Amount (with GST) :</strong> ${totalAmount}</p>
            <br>
            `;
        resultContainer.appendChild(productDetails);
    }
}

function setError(input, message) {
    let parent = input.parentElement;
    let small = parent.querySelector('small')
    small.innerText = message
    parent.classList.add('error')
    parent.classList.remove('success')
}

function setSuccess(input) {
    let parent = input.parentElement;
    parent.classList.add('success')
    parent.classList.remove('error')
}

function emailCheck(input) {
    let emailReg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    let valid = emailReg.test(input)
    return valid
}

function checkUserName() {
    let cnameValue = cname.value.trim()
    if (cnameValue === '') {
        setError(cname, 'name cannot be empty')
    }
    else if (cnameValue.length < 4) {
        setError(cname, 'Name should be minimum 4 characters')
    }
    else {
        setSuccess(cname)
        isValidName = true;
    }
}

// email check 

function checkUserEmail() {
    let emailValue = email.value.trim()
    if (emailValue === '') {
        setError(email, 'Email cannot be empty')
    }
    else if (!emailCheck(emailValue)) {
        setError(email, 'Enter vaild Email ID')
    }
    else {
        setSuccess(email)
        isValidEmail = true;
    }
}

function checkUserphoneno() {
    let phonenoValue = phoneno.value.trim()
    if (phonenoValue === '') {
        setError(phoneno, 'Phone no cannot be empty')
    } else if (phonenoValue.length < 10) {
        setError(phoneno, 'PHONE No must be 10 Digits')
    } else {
        setSuccess(phoneno)
        isValidPhoneno = true;
    }
}

function checkUserntop() {
    let ntopValue = ntop.value.trim()
    // Product Check 
    if (ntopValue === '') {
        setError(ntop, 'Cant be empty')
    }
    else if (parseInt(ntopValue, 10) < 5) {
        setError(ntop, 'Minimum Order must be 5')
    }
    else {
        setSuccess(ntop)
        isValidNtop = true;
    }
}

function checkUseritop() {
    let itopValue = itop.value.trim()
    // 2

    if (itopValue === '') {
        setError(itop, 'Cant be empty')
    }
    else if (parseInt(itopValue, 10) < 5) {
        setError(itop, 'Minimum Order must be 5')
    }
    else {
        setSuccess(itop)
        isValidItop = true;
    }
}

function checkUserjtop() {
    let jtopValue = jtop.value.trim()
    // 3

    if (jtopValue === '') {
        setError(jtop, 'Cant be empty')
    }
    else if (parseInt(jtopValue, 10) < 5) {
        setError(jtop, 'Minimum Order must be 5')
    }
    else {
        setSuccess(jtop)
        isValidJtop = true;
    }
}

function checkUserltop() {
    let ltopValue = ltop.value.trim()
    //4

    if (ltopValue === '') {
        setError(ltop, 'Cant be empty')
    }
    else if (parseInt(ltopValue, 10) < 5) {
        setError(ltop, 'Minimum Order must be 5')
    }
    else {
        setSuccess(ltop)
        isValidLtop = true;
    }
}

function clearForm() {
    // Clear input fields
    const inputFields = document.querySelectorAll("input[type='text'], input[type='email'], input[type='tel']");
    for (let i = 0; i < inputFields.length; i++) {
        inputFields[i].value = "";
    }

    // Clear checkbox
    tandc.checked = false;

    // Reset validation styles
    const fields = document.querySelectorAll(".field");
    for (let i = 0; i < fields.length; i++) {
        fields[i].classList.remove("success", "error");
    }

    // Clear result container
    resultContainer.innerHTML = "";
}

// navbar

function navSlide()
    {
        const nav = document.querySelector(".navbar");
        const menu = document.querySelector(".nav_list");
        const burger = document.querySelector(".burger");

        burger.addEventListener("click", ()=>{
            menu.classList.toggle("nav-active");

            burger.classList.toggle("toggle")
        })
    }

    navSlide();
