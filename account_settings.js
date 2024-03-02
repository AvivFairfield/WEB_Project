console.log("JavaScript file is loaded")

document.addEventListener("DOMContentLoaded", function () {
    const paragraph1 = document.getElementById("fullname")
    const paragraph2 = document.getElementById("user_email")

    const emailUser = localStorage.getItem("email")
    const newFirstName = localStorage.getItem("firstname")
    const newLastName = localStorage.getItem("lastname")
    paragraph1.textContent = paragraph1.textContent.replace("[first]", newFirstName)
    paragraph1.textContent = paragraph1.textContent.replace("[last]", newLastName)
    paragraph2.textContent = paragraph2.textContent.replace("[email]", emailUser)

    const height = document.getElementById("height")
    const weight = document.getElementById("weight")
    const goalWeight = document.getElementById("goalWeight")

    fetch("http://localhost:5000/accountsettings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: emailUser,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data)
            if (data?.status == "success") {
                height.value = data.userHeight
                weight.value = data.userWeight
                goalWeight.value = data.usergoal
            } else {
                alert("message")
            }
        })
        .catch((error) => {
            console.error("Error:", error)
        })

    function togglePopup() {
        var popupOverlay = document.getElementById("popupOverlay")
        if (popupOverlay.style.display === "none" || popupOverlay.style.display === "") {
            popupOverlay.style.display = "flex"
        } else {
            popupOverlay.style.display = "none"
        }
    }
    document.getElementById("editPasswordButton").addEventListener("click", togglePopup)

    document.getElementById("submitPasswordChange").addEventListener("click", function () {
        togglePopup()
    })

    document.getElementById("closePopupButton").addEventListener("click", togglePopup)
})

function commitnewPassword() {
    const currPassword = document.getElementById("currentPassword").value
    const newPassword = document.getElementById("newPassword").value
    const confPassword = document.getElementById("confirmNewPassword").value
    const emailUser = localStorage.getItem("email")

    if (newPassword == confPassword) {
        fetch("http://localhost:5000/changepassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailUser,
                oldpw: currPassword,
                newpw: newPassword,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data)
                if (data?.status == "success") {
                    alert(data?.message) // should return from api the message that says saved succesffuly
                } else {
                    alert(data?.message) // should return from api the message that says saved succesffuly
                }
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    } else {
        alert("password does not match")
    }
}

const labels = ["January 24", "February 24", "March 24", "April 24", "May 24", "June 24", "July 24", "August 24", "Septemper 24", "October 24", "November 24", "December 24"]
const data = {
    labels: labels,
    datasets: [
        {
            label: "Weight",
            backgroundColor: "hsl(252, 82.9%, 67.8%)",
            borderColor: "hsl(252, 82.9%, 67.8%)",
            data: [85, 82, 80, 78, 75, 74, 72],
        },
        {
            label: "",
            backgroundColor: "white",
            borderColor: "white",
            data: [60],
        },
        {
            label: "Goal",
            backgroundColor: "orange",
            borderColor: "orange",
            data: Array(labels.length).fill(75),
            fill: false,
        },
    ],
}

const configLineChart = {
    type: "line",
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
    },
}
var chartLine = new Chart(document.getElementById("chartLine"), configLineChart)
