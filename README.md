# Todo Application

This is a simple Todo Application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to create, update, delete, and manage tasks.

## Folder Structure

Todo-Application/
├── Backend/
├── Frontend/
├── .gitignore
├── README.md
├── package-lock.json
├── package.json


## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (v6.x or later)
- [MongoDB](https://www.mongodb.com/) (v4.x or later)
- [Git](https://git-scm.com/)

## Cloning the Repository

To clone the repository, run the following command:

```bash
git clone https://github.com/Thanmai-05/Todo-Application.git
cd Todo-Application

Backend Setup
1. Navigate to the Backend directory:
cd Backend
2. Install the backend dependencies:
npm install
3. Create a .env file in the Backend directory and add your environment variables:
touch .env

4. Add the following environment variables to the .env file:
MONGO_URI=mongodb://localhost:27017/
PORT=5000
5. Start the backend server:
npm start
The backend server will start at http://localhost:5000.

Frontend Setup
1. Navigate to the Frontend directory:
cd Frontend
2. Install the frontend dependencies:
npm install
3. Start the frontend server:
npm start
The frontend server will start at http://localhost:3000.

Running the Application
After completing the setup for both backend and frontend, open your browser and navigate to http://localhost:3000 to use the Todo Application.

Key Features
User Authentication (Login/Logout)
Create, Read, Update, Delete (CRUD) operations for tasks
JWT-based authentication
Responsive user interface
Technologies Used
Frontend: React.js, Axios, Material-UI
Backend: Node.js, Express.js, MongoDB, Mongoose, JWT
Troubleshooting
If you encounter any issues, please check the following:

Ensure MongoDB is running.
Verify the .env file.
Check for any errors in the console and server logs.
Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

License
This project is licensed under the MIT License. See the LICENSE file for more details.


Replace `Thanmai-05` with your actual GitHub username in the cloning command. This README provides a comprehensive guide for setting up and running your Todo Application.
