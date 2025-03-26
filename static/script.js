// Select the dark mode toggle button
const darkModeToggle = document.getElementById('darkModeToggle');

// Initialize rotation degree
let rotationDegree = 0; // Start from 0 degrees

// Add an event listener to toggle dark mode
darkModeToggle.addEventListener('click', () => {
    // Toggle dark mode
    const isDarkMode = document.body.classList.toggle('dark');

    // Update rotation degree
    rotationDegree += 180; // Increase rotation by 180 degrees

    // Apply rotation
    darkModeToggle.querySelector('img').style.transform = `rotate(${rotationDegree}deg)`;

    // Save the dark mode setting in localStorage
    localStorage.setItem('darkModeEnabled', isDarkMode);
});

// Check localStorage for saved dark mode setting on page load
window.addEventListener('load', () => {
    const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
    if (darkModeEnabled) {
        document.body.classList.add('dark');
        rotationDegree = 180; // Set to 180 if dark mode is enabled on load
        darkModeToggle.querySelector('img').style.transform = `rotate(${rotationDegree}deg)`;
    }
});

async function sendMessageContact(event) {
    event.preventDefault(); // Prevent default form submission

    const form = document.getElementById('kontakt_form');
    const formData = new URLSearchParams(new FormData(form)).toString(); // Convert FormData to URLSearchParams

    try {
        const response = await fetch('/send-contact-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // Ensure correct content type
            },
            body: formData,
        });

        const result = await response.json();
        if (response.ok) {
            // Redirect or show a success message
            window.location.href = '/index.html'; // Redirect to index.html after success
        } else {
            // Show error message
            alert('Feilmelding: ' + result.message);
        }
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
    }
}

async function sendMessageError(event) {
    event.preventDefault(); // Prevent default form submission

    const form = document.getElementById('errorReportForm'); // Ensure this matches the form's ID
    const formData = new URLSearchParams(new FormData(form)).toString();

    try {
        const response = await fetch('/send-error-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // Ensure correct content type
            },
            body: formData,
        });

        console.log('Response status:', response.status); // Log the response status

        const result = await response.json();
        if (response.ok) {
            // Redirect or show a success message
            window.location.href = '/index.html'; // Redirect to index.html after success
        } else {
            // Show error message
            alert('Feilmelding: ' + result.message);
        }
    } catch (error) {
        console.error('Error sending error report:', error);
        alert('Failed to send error report. Please try again.');
    }
}
