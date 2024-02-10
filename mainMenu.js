document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const closeBtn = document.querySelector('.close-btn');
    const toggleSidebarBtn = document.querySelector('.toggle-sidebar');

    // Initially hide the sidebar and close button
    sidebar.style.left = '-220px';
    closeBtn.style.display = 'none';

    // Close sidebar functionality
    closeBtn.addEventListener('click', function() {
        sidebar.style.left = '-220px'; // Hide the sidebar
        closeBtn.style.display = 'none'; // Hide the close button
        toggleSidebarBtn.style.display = 'block'; // Show the openSidebarBtn
    });

    // Open sidebar functionality
    toggleSidebarBtn.addEventListener('click', function() {
        sidebar.style.left = '0'; // Show the sidebar
        closeBtn.style.display = 'block'; // Show the close button
        toggleSidebarBtn.style.display = 'none'; // Hide the openSidebarBtn
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    let scrollAmount = 0;

    document.getElementById('next').addEventListener('click', function() {
        carousel.scrollTo({
            top: 0,
            left: (scrollAmount += 300), // Adjust the scroll value based on card width
            behavior: 'smooth',
        });
    });

    document.getElementById('prev').addEventListener('click', function() {
        carousel.scrollTo({
            top: 0,
            left: (scrollAmount -= 300), // Adjust the scroll value based on card width
            behavior: 'smooth',
        });
    });
});
