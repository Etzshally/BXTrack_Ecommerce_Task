Here is a `README.md` file tailored to your project setup:

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
   JWT_SECRET=djfgh786dfDXJHjHSgds8d76786
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

## Contributing

To contribute, fork the repository, make your changes, and submit a pull request.

## License

This project is open-source. Feel free to contribute or modify it to fit your needs.
```

This README includes setup steps for both frontend and backend, and instructions to add the `uploads` folder in the backend for storing images. Let me know if you need additional customization!