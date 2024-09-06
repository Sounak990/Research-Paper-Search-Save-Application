## Research Paper Search & Save Application

This project allows users to search for research papers using the CrossRef API and save their favourite documents to a local backend server. It features lazy loading of images, custom notifications, and blur effects during various operations. The backend server is built with Node.js, and users can interact with the saved papers in their profile.

### Features
- Search research papers using the CrossRef API
- Save selected papers to a backend server
- View, update, and remove saved research papers
- Lazy loading for images
- Custom blur effects during loading operations
- Notification system for various actions

### Table of Contents
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [File Structure](#file-structure)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)

### Getting Started
These instructions will help you set up the project locally for development and testing.

#### Prerequisites
- Node.js installed on your local machine. You can download it from [here](https://nodejs.org/).
- Basic knowledge of JavaScript, HTML, and CSS.
- CrossRef API Key (not required but recommended for higher API limits).

#### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Sounak990/Research-Paper-Search-Save-Application
    ```
2. Install dependencies for the backend server:
    ```bash
    cd backend
    npm install
    ```
3. Start the backend server:
    ```bash
    node server.js
    ```

# Running the Application
- **Backend**: Ensure the backend server is running by executing the command from the backend folder:
    ```bash
    node server.js
    ```
  **Frontend**: Open the `index.html` file in a browser to load the frontend part of the application. You can also serve the files using a local web server (e.g., Live Server extension for Visual Studio Code or any preferred method).

# Search for Papers
1. Enter the search query in the input field.
2. Click the "Search" button.
3. Results will be displayed below with information about the papers, including title, authors, publication year, and citation count.

# Saving Papers
- After searching, click "Save" to save research papers to the backend.
- A custom notification will appear confirming that the paper has been saved.

# View Saved Papers
- Go to the "Saved Papers" section.
- All saved papers will be displayed with their respective details.
- You can remove any paper by clicking "Remove."

# API Endpoints
- **POST /api/papers/save** - Save a research paper to the backend.
- **GET /api/papers/saved** - Fetch all saved research papers.
- **DELETE /api/papers/delete/:id** - Remove a saved paper by its ID.

# Usage
- **Search for Research Papers**: Enter the search query, click "Search," and view results.
- **Save a Paper**: Click "Save" next to a paper and receive a notification.
- **View Saved Papers**: Check the "Saved Papers" section and manage saved papers.

# Notifications
Custom notifications appear when saving and removing papers to enhance user interaction.

