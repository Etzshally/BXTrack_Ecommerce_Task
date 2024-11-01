Here's an updated version of the `README.md` file, including sections for challenges encountered and architectural decisions made during the project:

```markdown
# BXTrack E-Commerce Task

This is a full-stack e-commerce project built with separate backend and frontend setups. The backend serves as the API, using Node.js and MongoDB, while the frontend is developed using React and Vite.

## Prerequisites

Ensure you have the following installed on your system:

- Node.js (v14 or above)
- npm (v6 or above)
- MongoDB (for local development)

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Etzshally/BXTrack_Ecommerce_Task.git
cd BXTrack_Ecommerce_Task
```

### 2. Backend Setup

1. **Navigate to the Backend Directory:**
   ```bash
   cd e-commerce-backend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Create the `.env` File:**

   Create a `.env` file in the `e-commerce-backend` folder with the following contents:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET= (your own secret key here)
   PORT=5000
   ```

   Replace `your_mongodb_connection_string` with your actual MongoDB URI.

4. **Create an Uploads Folder:**

   To store product images, create an `uploads` folder in the `e-commerce-backend` directory:

   ```bash
   mkdir uploads
   ```

5. **Run the Backend Server:**
   ```bash
   npm run dev
   ```

   The backend server will start on `http://localhost:5000` (or the port specified in `.env`).

### 3. Frontend Setup

1. **Navigate to the Frontend Directory:**
   ```bash
   cd ../e-commerce-frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Create the `.env` File:**

   Create a `.env` file in the `e-commerce-frontend` folder with the following contents:

   ```env
   VITE_APP_BACKEND_URL=http://localhost:5000
   ```

4. **Run the Frontend Server:**
   ```bash
   npm run dev
   ```

   The frontend will start on a port assigned by Vite, typically `http://localhost:3000`.

## Folder Structure

```plaintext
BXTrack_Ecommerce_Task/
│
├── e-commerce-backend/
│   ├── uploads/               # Folder to store images
│   ├── .env                   # Environment variables for the backend
│   └── ...                    # Other backend files and folders
│
└── e-commerce-frontend/
    ├── .env                   # Environment variables for the frontend
    └── ...                    # Other frontend files and folders
```

## Available Scripts

In both `e-commerce-backend` and `e-commerce-frontend` directories, you can run:

- **`npm run dev`**: Starts the development server for either the frontend or backend, depending on the folder.

## Challenges Encountered

- **CORS Issues**: Initially faced Cross-Origin Resource Sharing (CORS) issues when trying to connect the frontend with the backend. This was resolved by configuring the CORS middleware in the Express backend to allow requests from the frontend URL.
  
- **State Management**: Managing the application state for filtering products based on categories, prices, and ratings became complex. Utilizing React hooks helped streamline state management and component re-renders.

- **Data Validation**: Ensuring the integrity of data sent from the frontend to the backend required implementing validation logic to handle incorrect inputs gracefully using express-validator.

- **Storage for images challenge occured, but i used cloudinary to manage that**

- **Testing not done due to time constraint**

- **Minimal frontend design due to time constraint yet fully functional.**

## Architectural Decisions

- **Separation of Concerns**: The project is structured to maintain a clear separation between the frontend and backend, allowing for independent development and deployment. This separation enhances maintainability and scalability.

- **RESTful API Design**: The backend is designed as a RESTful API, providing endpoints for CRUD operations on products and categories. This standardization allows for easy integration with various frontend frameworks.

- **MongoDB for Data Storage**: Chose MongoDB for its flexibility in handling JSON-like documents, making it easier to adapt the database structure as the application grows.

- **React with Vite**: Selected React paired with Vite for the frontend to benefit from fast development builds and hot module replacement, significantly improving developer experience.


## Improvements that can be made in future (This project is being implemented in only 3 days)

- **Pagination in products listing Apis**

- **Styling and design**

- **Further modularity in components**

- **Better file structure and naming conventions**

- **Microservices and caching**

- **Use any MQ (Messaging Queus for background tasks (i.e emailing etc) and API rate limiting)**