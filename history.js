document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:5000/getuserhistory", {
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

                const workout_placeholder = document.getElementById("historyWorkouts")
                const htmlContent = workoutsData
                    .map(
                        (item) => ` <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td class="py-4 px-6">${item.current_workout}</td>
                        <td class="py-4 px-6">${item.workout_location}</td>
                        <td class="py-4 px-6">${item.workout_duration}</td>
                        <td class="py-4 px-6">${formatDateTime(new Date(item.starting_datetime))}</td>
                    </tr>`,
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

    // Sidebar functionality
    var sidebar = document.querySelector(".sidebar")
    var closeBtn = document.querySelector(".close-btn")
    var toggleSidebarBtn = document.querySelector(".toggle-sidebar")

    // Function to open the sidebar
    function openSidebar() {
        sidebar.style.left = "0" // Show the sidebar
        closeBtn.style.display = "block" // Show the close button
        toggleSidebarBtn.style.display = "none" // Hide the toggle button
    }

    // Function to close the sidebar
    function closeSidebar() {
        sidebar.style.left = "-220px" // Hide the sidebar
        closeBtn.style.display = "none" // Hide the close button
        toggleSidebarBtn.style.display = "block" // Show the toggle button
    }

    // Event listener for the toggle button
    toggleSidebarBtn.addEventListener("click", openSidebar)

    // Event listener for the close button
    closeBtn.addEventListener("click", closeSidebar)
})
const pageButtons = document.querySelectorAll(".page-btn")
const moreButton = document.querySelector(".more-btn")
const recipeCards = document.querySelectorAll(".recipe-card")
let currentPage = 1
const cardsToShow = 6

function showPage(page) {
    recipeCards.forEach((card, index) => {
        if (index >= (page - 1) * cardsToShow && index < page * cardsToShow) {
            card.classList.remove("hidden")
        } else {
            card.classList.add("hidden")
        }
    })
}

pageButtons.forEach((button) => {
    button.addEventListener("click", function () {
        currentPage = parseInt(this.getAttribute("data-page"));
        showPage(currentPage);
    });
});

moreButton.addEventListener("click", function () {
    currentPage++;
    if (currentPage > pageButtons.length) {
        currentPage = 1; // Wrap around to the first page
    }
    showPage(currentPage);
});

showPage(currentPage); // Initialize the first page


// Function to format date and time
const formatDateTime = (date) => {
    const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
    return `${formattedDate} ${formattedTime}`;
};


showPage(currentPage) // Initialize the first page
