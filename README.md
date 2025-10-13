# ✍️ Note Taking App

## 📖 Project Overview

**Note Taking** is a simple, secure, and personal note-taking application. Built with the **MERN stack**, this project focuses on **data privacy** by enforcing strong **user authentication** and implementing **advanced encryption** for all note content before it touches the database.

---

## ✨ Core Features

- **🔒 Secure User Authentication:** Dedicated accounts for each user, ensuring personal notes are private and segregated from other users.
- **🛡️ Encrypted Storage:** Note data is encrypted using **`crypto-js`** before being saved, providing an essential layer of security.
- **📝 Simple Management:** A clean interface lets you easily create, view, update, and delete your notes.
- **🧠 MERN Stack:** Built on a modern and scalable foundation of **MongoDB, Express, React, and Node.js**.

---

## 🛠️ Tech Stack

| Category       | Technology                      | Purpose                                                 |
| :------------- | :------------------------------ | :------------------------------------------------------ |
| **Client**     | **React**                       | Builds the responsive user interface.                   |
| **Server**     | **Node.js & Express.js**        | Handles API routing and server-side logic.              |
| **Database**   | **MongoDB & Mongoose**          | Stores user and note data; Mongoose manages the schema. |
| **Security**   | **`bcryptjs` & `jsonwebtoken`** | Handles password hashing and user sessions.             |
| **Encryption** | **`crypto-js`**                 | Manages the encryption/decryption of note content.      |

---

## 🚀 Getting Started

Follow these steps to set up and run the Note Taking application locally.

### Prerequisites

Make sure you have the following installed:

- **Node.js** (LTS recommended)
- **npm** (Node Package Manager)
- A running **MongoDB** instance (local or remote).

### Installation

Clone the repository, then install dependencies for the backend and frontend separately.

```bash
# Clone the repository
git clone <your-repository-link>
cd ntoe-taking-app

# 1. Install Backend dependencies
cd backend
npm install

# 2. Install Frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

You must create a **`.env`** file for both the backend and frontend directories to configure the application.

#### 1\. Backend Configuration (`/backend/.env`)

| Variable                | Description                                             |
| :---------------------- | :------------------------------------------------------ |
| **`PORT`**              | Defines the port the server will run on (e.g., `5000`). |
| **`MONGODB_URI`**       | Your MongoDB connection string.                         |
| **`JWT_SECRET`**        | A long, secure secret for signing JWTs.                 |
| **`NODE_ENV`**          | Set to `"development"` or `"production"`.               |
| **`CRYPTO_SECRET_KEY`** | A secure key for encrypting note data.                  |
| **`FRONTEND_URL`**      | The client's URL (e.g., `http://localhost:5173`).       |

#### 2\. Frontend Configuration (`/frontend/.env`)

| Variable               | Description                                |
| :--------------------- | :----------------------------------------- |
| **`VITE_BACKEND_URL`** | The base URL for your running backend API. |

### Running the Application

Open **two separate terminal windows** and execute the start commands for the client and server.

1.  **Start the Backend Server:**

    ```bash
    cd backend
    npm start
    ```

    _(The server starts on the port defined in your `.env` file.)_

2.  **Start the Frontend Development Server:**

    ```bash
    cd ../frontend
    npm run dev
    ```

    _(The app opens in your browser, typically on `http://localhost:5173`.)_

---
