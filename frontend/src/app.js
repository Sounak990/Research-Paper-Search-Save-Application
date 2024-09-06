let searchCount = 0;

// Create and append the blur overlay
const blurOverlay = document.createElement("div");
blurOverlay.className = "blur-overlay";
document.body.appendChild(blurOverlay);

// Function to show the blur effect
function showBlur() {
    blurOverlay.style.display = "block";
    setTimeout(() => {
        blurOverlay.classList.add("show");
    }, 10); // Brief delay for transition effect
}

// Function to hide the blur effect
function hideBlur() {
    blurOverlay.classList.remove("show");
    setTimeout(() => {
        blurOverlay.style.display = "none";
    }, 500); // Match with the transition duration
}

// Function to fetch papers from CrossRef API based on user query
function searchPapers(query) {
    showBlur(); // Show blur effect when starting search
    const apiUrl = `https://api.crossref.org/works?query=${query}&rows=10`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const papers = data.message.items;
            displayResults(papers);
            hideBlur(); // Hide blur effect after results are fetched
        })
        .catch(error => {
            console.error('Error fetching data from CrossRef API:', error);
            hideBlur(); // Hide blur effect in case of an error
        });
}

// Function to display search results
function displayResults(papers) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (papers.length === 0) {
        resultsDiv.innerHTML = '<p>No research papers found.</p>';
        return;
    }

    papers.forEach((paper, index) => {
        const title = paper.title ? paper.title[0] : 'No title available';
        const authors = paper.author
            ? paper.author.map(author => author.given + ' ' + author.family).join(', ')
            : 'No authors available';
        const year = paper['published-print'] ? paper['published-print']['date-parts'][0][0] : 'No year available';
        const citations = paper['is-referenced-by-count'] || 0;

        const paperDiv = document.createElement('div');
        paperDiv.classList.add('paper');
        paperDiv.innerHTML = `
            <h3>${title}</h3>
            <p><strong>Authors:</strong> ${authors}</p>
            <p><strong>Year:</strong> ${year}</p>
            <p><strong>Citations:</strong> ${citations}</p>
            <button onclick="savePaper('${title}', '${authors}', '${year}', ${citations})">Save</button>
        `;
        resultsDiv.appendChild(paperDiv);
    });
}

// Function to show notifications
function showNotification(message, type = 'success') {
    const notificationContainer = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = `notification-message ${type}`;
    notification.textContent = message;
    notificationContainer.appendChild(notification);

    // Show the notification
    notification.style.opacity = 1;

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = 0;
        setTimeout(() => {
            notificationContainer.removeChild(notification);
        }, 400); // Matches the transition time
    }, 3000);
}

// Function to save papers to the backend
function savePaper(title, authors, year, citations) {
    showBlur(); // Show blur effect when saving
    const paperToSave = { title, authors, publicationYear: year, citations };

    fetch('http://localhost:5000/api/papers/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paperToSave),
    })
    .then(response => response.json())
    .then(data => {
        fetchSavedPapers(); // Update the list of saved papers
        showNotification('Paper saved successfully!'); // Show success notification
        hideBlur(); // Hide blur effect after saving
    })
    .catch(error => {
        console.error('Error saving paper:', error);
        showNotification('Error saving paper.', 'error'); // Show error notification
        hideBlur(); // Hide blur effect in case of an error
    });
}

// Function to fetch saved papers from the backend
function fetchSavedPapers() {
    fetch('http://localhost:5000/api/papers/saved')
        .then(response => response.json())
        .then(papers => {
            displaySavedPapers(papers);
            updateSavedPaperCount(papers.length); // Update saved paper count
        })
        .catch(error => {
            console.error('Error fetching saved papers:', error);
        });
}

// Function to display saved papers from backend
function displaySavedPapers(papers) {
    const savedResultsDiv = document.getElementById('savedResults');
    savedResultsDiv.innerHTML = '';

    if (papers.length === 0) {
        savedResultsDiv.innerHTML = '<p>No saved papers found.</p>';
        return;
    }

    papers.forEach((paper, index) => {
        const savedPaperDiv = document.createElement('div');
        savedPaperDiv.classList.add('paper');
        savedPaperDiv.innerHTML = `
            <h3>${paper.title}</h3>
            <p><strong>Authors:</strong> ${paper.authors}</p>
            <p><strong>Year:</strong> ${paper.publicationYear}</p>
            <p><strong>Citations:</strong> ${paper.citations}</p>
            <button onclick="removePaper('${paper._id}')">Remove</button>
        `;
        savedResultsDiv.appendChild(savedPaperDiv);
    });
}

// Function to remove papers from the backend
function removePaper(paperId) {
    showBlur(); // Show blur effect when removing
    fetch(`http://localhost:5000/api/papers/delete/${paperId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            fetchSavedPapers(); // Refresh the list of saved papers after removal
            showNotification('Paper removed successfully!'); // Show success notification
            hideBlur(); // Hide blur effect after removal
        })
        .catch(error => {
            console.error('Error removing paper:', error);
            showNotification('Error removing paper.', 'error'); // Show error notification
            hideBlur(); // Hide blur effect in case of an error
        });
}

// Event listener for the search button
document.getElementById('searchSubmitBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    searchPapers(query);
    searchCount++;
    document.getElementById('searchCount').textContent = searchCount;
});

// Function to update saved paper count in both profile and navbar
function updateSavedPaperCount(count) {
    document.getElementById('savedCount').textContent = count;
    document.getElementById('profileSavedCount').textContent = count;
}

// Function to switch between sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}

// Fetch saved papers on page load
document.addEventListener('DOMContentLoaded', fetchSavedPapers);
