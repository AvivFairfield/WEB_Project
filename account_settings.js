document.getElementById("changePW").addEventListener("click", function() {
    document.getElementById("popup").style.display = "block";
});

function closePopup() {
    document.getElementById("popup").style.display = "none";
}




const labels = ["January 24", "February 24", "March 24", "April 24", "May 24", "June 24","July 24","August 24","Septemper 24","October 24","November 24","December 24"];
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
            label:"",
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
        }
    ],
};


const configLineChart = {
    type: "line",
    data,
    options: {},
};

var chartLine = new Chart(
    document.getElementById("chartLine"),
    configLineChart
);

