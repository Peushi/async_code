# 🧑‍💻 User Management Dashboard
A simple front-end project that displays a list of users and allows editing user details through a Bootstrap modal.  
The project fetches user data from a local JSON file or a remote REST API, updates users via PUT requests, and dynamically updates the DOM without page reloads.


## 🚀 Features
- Fetches user data from an API (`fetchData.js`)
- Displays users in responsive Bootstrap cards
- Edit users via modal form (`formFactory.js`)
- Updates user data via PUT requests (`putData.js`)
- Automatically updates the corresponding user card in the DOM
- Uses async/await and modular JavaScript (ES Modules)
- Includes loading spinner and alert messages for better UX


## 🧩 Project Structure
├── index.html # Main HTML file
├── script.js # Main logic: fetch, display, update users
├── fetchData.js # Handles GET requests
├── putData.js # Handles PUT requests
├── formFactory.js # Dynamically generates the edit form
├── response.json # Local sample data (for offline mode)
└── README.md # Project documentation