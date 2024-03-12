function formatDateTime(dateTimeStr) {
    const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    const date = new Date(dateTimeStr);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0'+minutes : minutes;
    return `${month} ${day}, ${year} at ${hours}:${minutesStr} ${ampm}`;
} 

function inviteFriend() {
    const trainingType = document.getElementById("trainingType").value
    const location = document.getElementById("location").value
    const workoutDateTime  = document.getElementById("datetimeInput").value

    //Check if the trainingType or location is not selected
    if (trainingType === "Choose a training" || location === "Gym or home?" ||!workoutDateTime) {
        alert("Please fill in all fields before inviting a friend.")
        return //Stop execution if any field is empty or default
    }

    const formattedDateTime = formatDateTime(workoutDateTime);
    //create the message
    const message = `Hey! I'm doing a ${trainingType} workout at the ${location} on ${formattedDateTime}. Wanna join me to my challenge? `

    //Encode the message for a URL
    const encodedMessage = encodeURIComponent(message)

    //WhatsApp link to share the message
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`

    //Open WhatsApp sharing in a new tab
    window.open(whatsappUrl, "_blank")
}

function saveWorkoutDetails() {
    const formatDate = (date) => {
        return (
            [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join("-") +
            " " +
            [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes()), padTo2Digits(date.getSeconds())].join(":")
        );
    }

    const padTo2Digits = (num) => {
        return num.toString().padStart(2, "0");
    }

    // Reference to input fields
    const trainingTypeSelect = document.getElementById("trainingType");
    const locationSelect = document.getElementById("location");
    const durationInput = document.getElementById("duration");
    const dateTimeInput = document.getElementById("datetimeInput");

    // Check if the input fields are filled
    if (trainingTypeSelect.value === "Choose a training" || locationSelect.value === "Gym or home?" || !durationInput.value || !dateTimeInput.value) {
        alert("Please fill in all fields.");
        return; // Stop execution if any field is empty or default
    }

    // Assuming a successful operation, fields should be cleared here
    fetch("http://localhost:5000/saveworkout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: localStorage.getItem("email"),
            trainingType: trainingTypeSelect.value,
            location: locationSelect.value,
            duration: durationInput.value,
            workoutDate: formatDate(new Date(dateTimeInput.value)),
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        alert(data?.message);
        if (data?.status === "success") {
            // Reset form fields here after successful save operation
            trainingTypeSelect.selectedIndex = 0;
            locationSelect.selectedIndex = 0;
            durationInput.value = "";
            dateTimeInput.value = "";
        } else {
            alert(data?.message); // Show message for unsuccessful save operation
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while saving the workout details.");
    });
}


document.addEventListener("DOMContentLoaded", (event) => {
    // const fruits = ["apple", "banana", "orange"]

    console.log("Getting all workouts")

    // get data from api
    fetch("http://localhost:5000/getallworkouts", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data)
            if (data?.status == "success") {
                console.log(data?.workouts)

                const workouts_list = data?.workouts

                const selectBox = document.getElementById("trainingType")

                workouts_list.forEach((workout) => {
                    const option = document.createElement("option")
                    option.value = workout.workout_name
                    option.text = workout.workout_name
                    selectBox.appendChild(option)
                })
            } else {
                alert(data?.message) // should return from api the message that says saved succesffuly
            }
        })
        .catch((error) => {
            console.error("Error:", error)
        })
})
document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('backButton');

    backButton.addEventListener('click', function() {
        // Perform your action here. For navigation, you can use:
        window.location.href = 'mainMenu.html'; // Adjust the URL as needed
    });
});

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