// This file contains JavaScript code for the Build A Space Program website.
// It may handle interactivity or dynamic content for the website.

document.addEventListener('DOMContentLoaded', function() {
    console.log('Build A Space Program is ready!');
    
    // Example of adding interactivity
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetPage = this.getAttribute('href');
            loadPage(targetPage);
        });
    });
});

function loadPage(page) {
    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('content').innerHTML = html;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}