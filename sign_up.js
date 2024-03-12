function startJourney() {
    // Add your logic for starting the journey here
    //Get values from input fields
    const userEmail = document.getElementById("userEmail").value
    const userPassword = document.getElementById("userPassword").value
    const bd = document.getElementById("birthdate").value
    const fullname = document.getElementById("username").value
    const weight = document.getElementById("weight").value
    const countryCode = document.getElementById("countryCode").value
    const phoneNumber = document.getElementById("phoneNumber").value
    const goal = document.getElementById("goal").value
    const gendercheck = document.getElementById("male").checked
    const fullPhone = countryCode + "-" + phoneNumber
    let gender
    if (gendercheck) {
        gender = "male"
    } else {
        gender = "female"
    }

    fetch("http://localhost:5000/registeruser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userEmail,
            userPassword: userPassword,
            birthdate: bd,
            fullname: fullname,
            weight: weight,
            goal: goal,
            gendervalue: gender,
            fullPhone: fullPhone,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data?.status == "success") {
                alert(data?.message)
            } else {
                alert(data?.message) // should return from api the message that says saved succesffuly
            }
        })
        .catch((error) => {
            console.error("Error:", error)
        })
}

document.getElementById("weight").addEventListener("keydown", function (event) {
    if (event.keyCode === 38) {
        // Up arrow key
        event.preventDefault()
        this.stepUp()
    } else if (event.keyCode === 40) {
        // Down arrow key
        event.preventDefault()
        this.stepDown()
    }
})