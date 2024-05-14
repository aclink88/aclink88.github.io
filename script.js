document.getElementById('projectList').addEventListener('click', function(e) {
    e.preventDefault();
    if (e.target && e.target.nodeName === "A") {
        const repo = e.target.getAttribute('data-repo');
        fetchReadme(repo);
    }
});

function fetchReadme(repo) {
    const url = `https://api.github.com/repos/${repo}/readme`;

    fetch(url, {
        headers: {
            'Accept': 'application/vnd.github.VERSION.raw'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(text => {
        displayReadme(text);
    })
    .catch(error => {
        console.error('Failed to fetch README:', error);
    });
}

function displayReadme(readmeContent) {
    const markdownHtml = marked.parse(readmeContent);
    document.getElementById('readmeContent').innerHTML = markdownHtml;
}
