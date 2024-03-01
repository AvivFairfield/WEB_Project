document.addEventListener("DOMContentLoaded", function() {
    // Sidebar functionality
    var sidebar = document.querySelector('.sidebar');
    var closeBtn = document.querySelector('.close-btn');
    var toggleSidebarBtn = document.querySelector('.toggle-sidebar');

    // Function to open the sidebar
    function openSidebar() {
        sidebar.style.left = '0'; // Show the sidebar
        closeBtn.style.display = 'block'; // Show the close button
        toggleSidebarBtn.style.display = 'none'; // Hide the toggle button
    }

    // Function to close the sidebar
    function closeSidebar() {
        sidebar.style.left = '-220px'; // Hide the sidebar
        closeBtn.style.display = 'none'; // Hide the close button
        toggleSidebarBtn.style.display = 'block'; // Show the toggle button
    }

    // Event listener for the toggle button
    toggleSidebarBtn.addEventListener('click', openSidebar);

    // Event listener for the close button
    closeBtn.addEventListener('click', closeSidebar);
});

