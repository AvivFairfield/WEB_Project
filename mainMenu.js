document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar")
    const closeBtn = document.querySelector(".close-btn")
    const toggleSidebarBtn = document.querySelector(".toggle-sidebar")

    // Initially hide the sidebar and close button
    sidebar.style.left = "-220px"
    closeBtn.style.display = "none"

    // Close sidebar functionality
    closeBtn.addEventListener("click", function () {
        sidebar.style.left = "-220px" // Hide the sidebar
        closeBtn.style.display = "none" // Hide the close button
        toggleSidebarBtn.style.display = "block" // Show the openSidebarBtn
    })

    // Open sidebar functionality
    toggleSidebarBtn.addEventListener("click", function () {
        sidebar.style.left = "0" // Show the sidebar
        closeBtn.style.display = "block" // Show the close button
        toggleSidebarBtn.style.display = "none" // Hide the openSidebarBtn
    })
})

const deleteWorkout = (workoutId) => {
    // Find the card by ID and remove it

    // delete workout from user array via post

    fetch("http://localhost:5000/deleteuserworkouts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: workoutId,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data)
            if (data?.status == "success") {
            } else {
                alert(data?.message) // should return from api the message that says saved succesffuly
            }
        })
        .catch((error) => {
            console.error("Error:", error)
        })

    const card = document.getElementById(workoutId)
    if (card) {
        card.remove()
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("carousel")
    let scrollAmount = 0

    console.log("mainMenu has Loaded")
    const paragraph = document.getElementById("welcome_msg")
    // collect information from localstoraget
    const emailUser = localStorage.getItem("email")
    const newFirstName = localStorage.getItem("firstname")
    const newLastName = localStorage.getItem("lastname")
    const fullName = newFirstName + " " + newLastName
    paragraph.textContent = paragraph.textContent.replace("[name]", fullName)

    // send post to collect workout plans data

    const formatDateTime = (date) => {
        // Format the time
        const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`

        // Format the date
        const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`

        // Combine and return the formatted date and time
        return `${formattedDate} ${formattedTime}`
    }

    fetch("http://localhost:5000/getuserworkouts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: localStorage.getItem("email"),
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            // console.log("Success:", data)
            if (data?.status == "success") {
                console.log(data?.workouts)
                const workoutsData = data?.workouts

                const workout_placeholder = document.getElementById("workoutPlans")
                const htmlContent = workoutsData
                    .map(
                        (item) => `<div id="card-${item.id}" class="card w-full md:w-1/3 p-6 flex-shrink-0">
                            <div class="bg-white rounded-lg shadow">
                                <img src="icons\\workout_images\\${item.current_workout}.jpg" alt="${item.current_workout}" class="rounded-t-lg w-full" />
                                <div class="p-6">
                                    <h5 class="text-lg font-bold">${item.current_workout}</h5>
                                    <p class="text-sm">${item.workout_location}</p>
                                    <p class="text-sm">${formatDateTime(new Date(item.starting_datetime))}</p>
                                    <button onclick="deleteWorkout('card-${item.id}')" >DELETEME</button>
                                </div>
                            </div>
                        </div>`,
                    )
                    .join("")
                workout_placeholder.innerHTML = htmlContent
            } else {
                alert(data?.message) // should return from api the message that says saved succesffuly
                console.log(data?.workouts)
            }
        })
        .catch((error) => {
            console.error("Error:", error)
        })

    document.getElementById("next").addEventListener("click", function () {
        carousel.scrollTo({
            top: 0,
            left: (scrollAmount += 300), // Adjust the scroll value based on card width
            behavior: "smooth",
        })
    })

    document.getElementById("prev").addEventListener("click", function () {
        carousel.scrollTo({
            top: 0,
            left: (scrollAmount -= 300), // Adjust the scroll value based on card width
            behavior: "smooth",
        })
    })
})
