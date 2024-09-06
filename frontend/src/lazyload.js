document.addEventListener("DOMContentLoaded", () => {
    // Create and append the blur overlay
    const blurOverlay = document.createElement("div");
    blurOverlay.className = "blur-overlay";
    document.body.appendChild(blurOverlay);

    // Create and append the notification container
    const notificationContainer = document.createElement("div");
    notificationContainer.className = "notification-container";
    notificationContainer.id = "notificationContainer";
    document.body.appendChild(notificationContainer);

    // Create a Set to track saved papers
    const savedPapers = new Set();
    
    // Debounce function to prevent multiple clicks
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

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

    // Function to show the custom notification
    function showNotification(message, isError = false) {
        const notification = document.createElement('div');
        notification.className = 'notification-message';
        notification.textContent = message;

        // Add error class if the notification is an error message
        if (isError) {
            notification.classList.add('error');
        }

        notificationContainer.appendChild(notification);

        // Trigger the show effect
        setTimeout(() => {
            notification.classList.add('show');
        }, 10); // Brief delay for transition

        // Hide the notification after a delay
        setTimeout(() => {
            notification.classList.add('hide');
            // Remove notification from DOM after fade-out
            setTimeout(() => {
                notificationContainer.removeChild(notification);
                // Hide the blur overlay if no more notifications
                if (notificationContainer.children.length === 0) {
                    hideBlur();
                }
            }, 400); // Match with the animation duration
        }, 3000); // Adjust time as needed
    }

    // Function to handle saving a paper with debounce
    const handleSavePaper = debounce((event) => {
        const paperTitle = event.target.parentElement.querySelector('p').textContent;

        if (savedPapers.has(paperTitle)) {
            showNotification(`Paper "${paperTitle}" is already saved.`, true);
        } else {
            savedPapers.add(paperTitle);
            showNotification(`Saved paper: ${paperTitle}`);
        }
    }, 300); // Adjust debounce wait time as needed

    // Custom notification for deleting a paper
    document.querySelectorAll('.remove-paper-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const paperTitle = event.target.parentElement.querySelector('p').textContent;
            showNotification(`Removed paper: ${paperTitle}`);
        });
    });

    // Custom notification for saving a paper
    document.querySelectorAll('.save-paper-btn').forEach(button => {
        button.addEventListener('click', handleSavePaper);
    });

    // Example usage: Show custom error notification
    document.getElementById("showErrorNotificationBtn")?.addEventListener("click", () => {
        showNotification("An error occurred while processing your request.", true);
    });

    // Custom notification for searching
    document.getElementById('searchSubmitBtn').addEventListener('click', () => {
        const query = document.getElementById('searchInput').value;
        if (query) {
            showNotification(`Searching for: "${query}"`);
        } else {
            showNotification("Search query is empty. Please enter a term.", true);
        }
    });

    // Lazy loading images (applies to categories or any lazy-loaded image)
    const lazyImages = document.querySelectorAll('img.lazy');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src; // Set the src from data-src attribute
                img.classList.remove('lazy'); // Remove lazy class
                img.classList.add('lazy-loaded'); // Add class for loaded images
                observer.unobserve(img); // Stop observing this image
            }
        });
    });

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });

    // Section toggle effect (show/hide sections based on user interaction)
    const sectionToggles = document.querySelectorAll('.section-toggle');
    sectionToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const sectionId = toggle.dataset.section;
            const section = document.getElementById(sectionId);

            if (section) {
                document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
                section.classList.add('active');
                showNotification(`Switched to section: ${sectionId}`);
            }
        });
    });

    // Function to handle category click
    function handleCategoryClick(event) {
        const category = event.currentTarget.dataset.category; // Get the category from data attribute
        const searchInput = document.getElementById('searchInput');
        const searchSubmitBtn = document.getElementById('searchSubmitBtn');
    
        searchInput.value = category; // Set the search input value to the category
        searchSubmitBtn.click(); // Trigger the search button click
    }
    
    // Attach click event listeners to each category
    document.querySelectorAll('.category').forEach(category => {
        category.addEventListener('click', handleCategoryClick);
    });
    
    // Function to perform search (example)
    function performSearch(query) {
        // Replace with actual API request code
        console.log(`Searching for: ${query}`);
        // Example API call
        fetch(`https://example.com/api/search?q=${encodeURIComponent(query)}`)
          .then(response => response.json())
          .then(data => {
            // Handle search results
            console.log('Search results:', data);
          })
          .catch(error => {
            console.error('Error fetching search results:', error);
          });
    }
    
    // Event listener for search button
    document.getElementById('searchSubmitBtn').addEventListener('click', () => {
        const query = document.getElementById('searchInput').value;
        performSearch(query);
    });
});
