# Social Media Analytics API & Dashboard

> **Node.js (Express.js) Backend** & **React Frontend** for social media analytics, built with a microservices approach and caching for performance optimization.

---

## Project Overview

This project is a **social media analytics system** with:

- A **backend microservice** handling user and post analytics.
- A **React frontend dashboard** displaying insights in an interactive UI.
- **Caching implementation** for optimized API responses.

---

## Tech Stack

| Component   | Tech Used                             |
| ----------- | ------------------------------------- |
| Backend     | Node.js, Express.js, Axios, dotenv    |
| Frontend    | React (Vite), Tailwind/MUI/Bootstrap  |
| Caching     | In-Memory Caching (Redis planned)     |
| API Testing | Postman / Insomnia                    |
| Deployment  | Localhost (Future: Docker/Kubernetes) |

---

## Project Structure

```bash
Affordmed_social/
│── simple_back/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── config/
│   ├── server.js
│── frontend/
│   ├── src/
│   ├── public/
│   ├── App.js
│   ├── index.js
│── screenshot/
│   ├── Screenshot_1.png
│   ├── Screenshot_2.png
│── postman_collection.json
│── README.md
```

## Features

### Backend Features (API)

- **User Analytics** (`/users`, `/users/top`)
- **Post Analytics** (`/posts`, `/posts/analytics`, `/posts/latest`, `/posts/:id/comments`)
- **Authentication** (`/login`, `/logout`) using **cookie-based auth**

### Frontend Features (Dashboard)

- **Top Users Page** – Shows **top 5 users** by post count.
- **Trending Posts Page** – Shows **top posts** by comments.
- **Live Feed Page** – Displays **latest 5 posts dynamically**.
- **Random Images** – Assigns **random user avatars** for UI enhancement.

---

## Screenshots

### Frontend Dashboard Preview

| Dashboard                                                     | Trending Posts                                                     |
| ------------------------------------------------------------- | ------------------------------------------------------------------ |
| ![Dashboard](screenshot/Screenshot%202025-04-04%20130238.png) | ![Trending Posts](screenshot/Screenshot%202025-04-04%20130622.png) |

### Folder Structure Preview

| Backend (simple_back)                                       | Frontend (React)                                             |
| ----------------------------------------------------------- | ------------------------------------------------------------ |
| ![Backend](screenshot/Screenshot%202025-04-04%20130238.png) | ![Frontend](screenshot/Screenshot%202025-04-04%20130622.png) |

---

## Microservices Architecture

The backend is **split into multiple services**, where each service **handles a specific domain**:

- **Auth Service**: Handles login/logout (`authService.js`).
- **User Service**: Handles user analytics (`userController.js`).
- **Post Service**: Manages post-related data (`postController.js`).
- **Middleware Layer**: Handles authentication and caching.

---

## Caching Implementation

To optimize API response times, **in-memory caching** is used.

- When a request is made, the response is **stored in cache**.
- **Subsequent requests** fetch the **cached response**, reducing API calls.
- This improves **performance** and **reduces server load**.
- Future updates may integrate **Redis** for persistent caching.

---
