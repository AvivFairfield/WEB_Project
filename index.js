function toggleNavbar(collapseID) {
    document.getElementById(collapseID).classList.toggle("hidden")
    document.getElementById(collapseID).classList.toggle("block")
}

const submitLogin = () => {
    const emailUser = document.querySelector("#email").value
    const passwordUser = document.querySelector("#password").value
    if (!emailUser || !passwordUser) {
    } else {
        console.log(emailUser, passwordUser)

        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailUser,
                password: passwordUser,
            }),
        })
            .then((response) => response.json()) // assuming server responds with json
            .then((data) => {
                console.log("Success:", data)
                if (data?.status == "success") {
                    const userEmail = emailUser
                    const userFirtname = data?.first_name
                    const userLastname = data?.last_name
                    localStorage.setItem("email", userEmail)
                    localStorage.setItem("firstname", userFirtname)
                    localStorage.setItem("lastname", userLastname)
                    window.location.href = "mainMenu.html"
                } else {
                    alert(data?.message)
                }
            })
            .catch((error) => {
                console.error("Error:", error)
            })

        // wrap into json object

        // send fetch

        // await the result

        // check result if ok -> move page if not something else

        // window.location.href = "mainMenu.html"
    }
}

function startJourney() {
    // Add your logic for starting the journey here
    alert("Your journey is about to start!")
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