# 📚 School Management System API

This repository contains a RESTful API for managing a school system, developed as part of a comprehensive online course using **Node.js** and **MongoDB**. The project emphasizes backend architecture, modularization, authentication, and reusable middleware components.

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Database**: MongoDB (with Mongoose ODM)
- **Framework**: Express.js
- **Authentication & Security**:
  - bcryptjs (password hashing)
  - jsonwebtoken (JWT-based auth)
  - dotenv (environment variable management)
- **Development Tools**:
  - nodemon (hot-reloading)
  - morgan (HTTP request logging)
  - express-async-handler (async error handling)

## 💻 Development Environment (VS Code Extensions)

- Prettier (code formatting)
- MongoDB for VS Code
- Night Owl (theme)
- Material Icon Theme

## ✅ Highlights

- Extensive course material covering various aspects of backend development.
- Well-structured and reusable Express middleware.
- Modular controller structure suitable for large-scale API development.
- Practical focus on REST principles and full-stack integration readiness.

## ⚠️ Limitations

- Some code redundancy due to lack of early abstraction.
- Frequent typographical errors by the course instructor.
- Refactoring performed only at the final stages, impacting maintainability during development.

## 📁 Project Structure

school-management-system-api/ ├── config/ # DB and server configuration ├── controllers/ # Request handlers and business logic ├── middleware/ # Custom middlewares (auth, error handling, etc.) ├── models/ # Mongoose schemas and models ├── routes/ # API route definitions ├── .env # Environment variables ├── server.js # Entry point └── package.json # Dependencies and scripts


## 🧪 Getting Started

To run the project locally:

1. **Clone the repository**:
```bash
git clone https://github.com/rmullo/school-management-system-api.git
