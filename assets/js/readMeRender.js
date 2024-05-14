document.addEventListener('DOMContentLoaded', function () {
    // Add click event listeners to all project links
    document.querySelectorAll('a[data-repo]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();  // Prevent the default anchor click behavior
            const repoName = this.getAttribute('data-repo');  // Get the repo name from data-repo attribute
            loadReadMe(repoName);  // Load the README for the clicked project
        });
    });
});

function loadReadMe(repoName) {
    const url = `https://api.github.com/repos/${repoName}/readme`;

    fetch(url, {
        headers: { 'Accept': 'application/vnd.github.VERSION.raw' }  // Fetch the README as raw text
    })
    .then(response => response.ok ? response.text() : Promise.reject('Failed to load'))
    .then(readmeText => {
        // Convert Markdown to HTML
        const readmeHtml = marked.parse(readmeText);
        // Replace the entire body content with README content
        document.body.innerHTML = `<div class="readme-container">${readmeHtml}</div>`;
    })
    .catch(error => console.error('Error loading the README:', error));
}