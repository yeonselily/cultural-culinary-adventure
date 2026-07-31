# Cultural Culinary Adventure 

A web application for exploring global cuisines, managing dietary restrictions, and discovering recipes tailored to your ingredients.

## Architecture

This project uses a decoupled architecture separating the user interface from the data processing logic.

### Frontend (Client)
Built with **React.js**, the frontend is responsible for the user experience.
- **Location:** `/src`
- **Key Features:**
  - Interactive recipe browsing
  - User dashboard for allergies & fridge management
  - Client-side routing with `react-router-dom`

### Backend (Server)
Built with **PHP**, the backend serves as the API for the application.
- **Location:** `/backend`
- **Key Features:**
  - REST API endpoints (e.g., [get_user_recipes.php](cci:7://file:///c:/Users/seyeon/cultural-culinary-adventure/cultural-culinary-adventure/backend/get_user_recipes.php:0:0-0:0), [insert_ingredient.php](cci:7://file:///c:/Users/seyeon/cultural-culinary-adventure/cultural-culinary-adventure/backend/insert_ingredient.php:0:0-0:0))
  - Handles database operations (CRUD)
  - Manages data validation and processing

## How to Run

1. **Start the Backend:** Ensure you have a PHP server (like XAMPP or MAMP) running and serving the `/backend` directory.
2. **Start the Frontend:**
   ```bash
   npm start
