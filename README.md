# Agent Creation Backend

This is the backend for the Agent Creation project, which provides APIs for user authentication, agent management, and CSV file processing to distribute lists among agents.

## Features

- **User Authentication**: Register and login functionality with JWT authentication.
- **Agent Management**: Add and manage agents with their details.
- **CSV Upload & Distribution**: Upload a CSV file, validate its format, and distribute its data evenly among agents.
- **MongoDB Database**: Store user, agent, and list data securely.

## Tech Stack

- **Node.js** - Server-side runtime
- **Express.js** - Backend framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication token
- **Multer** - File upload handling
- **CSV-Parser** - Processing CSV files
- **bcryptjs** - Password hashing

## Installation

### 1. Clone the Repository
```sh
git clone https://github.com/babludangi6266/AgentCreation-backend.git
cd AgentCreation-backend
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Run the Server
```sh
node server.js
```

The server will start on `http://localhost:5000`.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get JWT token

### Agents
- `POST /api/agents/create` - Add a new agent
- `GET /api/agents` - Get all agents

### CSV Upload & Distribution
- `POST /api/lists/upload` - Upload and distribute CSV data among agents
- `GET /api/lists` - Retrieve distributed lists

## Folder Structure
```
AgentCreation-backend/
│-- models/            # Database models
│-- controllers/       # API controllers
│-- routes/            # Express routes
│-- config/            # Configuration files
│-- middleware/        # Authentication middleware
│-- uploads/           # Directory for uploaded CSV files
│-- .env               # Environment variables
│-- server.js          # Main server entry point
│-- package.json       # Dependencies and scripts
```

---

### 🚀 Happy Coding!

