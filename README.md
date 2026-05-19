# Secure Full-Stack Expense Tracker

A production-style full-stack expense tracking application built using Spring Boot, Spring Security, JWT Authentication, PostgreSQL, React, and Tailwind CSS.

This project demonstrates secure REST API development with authentication, authorization, pagination, filtering, searching, sorting, and multi-user data isolation along with a responsive frontend integrated with protected backend APIs.

> **Note:**
> The backend is deployed on Render's free tier.
> If the application has been inactive for some time, the first request may take around 30–60 seconds while the backend server wakes up.

---

# Live Demo

## Frontend Application

https://expense-tracker-frontend-brown-xi.vercel.app/

## Backend API

https://expense-tracker-ojay.onrender.com

## Swagger Documentation

https://expense-tracker-ojay.onrender.com/swagger-ui/index.html

---

# Features

## Authentication & Security

* User Registration
* Optional Email Registration
* User Login
* JWT Authentication
* BCrypt Password Hashing
* Protected Routes using Spring Security
* Stateless Authentication
* Secure Multi-User Data Isolation
* Authorization-based Expense Ownership Protection

## Expense Management

* Create Expense
* Read Expenses
* Update Expense
* Delete Expense
* Search Expenses
* Filter Expenses by Category
* Sort Expenses
* Pagination Support
* Show All Expenses
* Custom Expense Categories

## Frontend Features

* Responsive Dark UI
* Secure Login & Registration Pages
* Protected Dashboard Route
* JWT Token Storage
* Inline Expense Editing
* Expense Search / Filter / Sorting
* Dynamic Pagination Controls
* Toast Notifications
* Total Expense Calculation

## Backend Engineering

* Layered Architecture
* DTO Pattern
* Global Exception Handling
* Validation using Jakarta Validation
* RESTful API Design
* PostgreSQL Cloud Database (Neon)
* Swagger/OpenAPI Documentation
* Secure Resource Ownership Validation

---

# Tech Stack

## Backend

* Java
* Spring Boot
* Spring Security
* JWT (JJWT)
* Hibernate / JPA
* PostgreSQL
* Maven
* Swagger / OpenAPI
* Neon Database

## Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router
* React Hot Toast

## Deployment

* Render (Backend)
* Vercel (Frontend)

---

# Architecture

```text
React Frontend
       ↓
REST APIs
       ↓
Spring Boot Backend
       ↓
PostgreSQL Database
```

## Authentication Flow

```text
User Login
     ↓
JWT Token Generated
     ↓
Frontend Stores Token
     ↓
Token Sent in Authorization Header
     ↓
JWT Filter Validates Token
     ↓
Spring Security Authenticates Request
```

---

# API Endpoints

## Authentication APIs

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| POST   | `/auth/register` | Register User |
| POST   | `/auth/login`    | Login User    |

---

## Expense APIs

| Method | Endpoint                          | Description           |
| ------ | --------------------------------- | --------------------- |
| GET    | `/expenses`                       | Get All User Expenses |
| GET    | `/expenses/{id}`                  | Get Expense By ID     |
| POST   | `/expenses`                       | Add Expense           |
| PUT    | `/expenses/{id}`                  | Update Expense        |
| DELETE | `/expenses/{id}`                  | Delete Expense        |
| GET    | `/expenses/search?keyword=`       | Search Expenses       |
| GET    | `/expenses/category/{category}`   | Filter By Category    |
| GET    | `/expenses/sorted/{field}`        | Sort Expenses         |
| GET    | `/expenses/paginated?page=&size=` | Paginated Expenses    |

---

# API Documentation

Swagger UI:

```text
http://localhost:8080/swagger-ui/index.html
```

Production Swagger URL:

```text
https://expense-tracker-ojay.onrender.com/swagger-ui/index.html
```

---

# Setup Instructions

## Clone Backend Repository

```bash
git clone https://github.com/CBSINHA/Expense-Tracker
```

## Clone Frontend Repository

```bash
git clone https://github.com/CBSINHA/expense-tracker-frontend
```

---

# Backend Configuration

Create `application.properties` (`example-application.properties` already provided under `src/main/resources/`):

```properties
spring.application.name=expense-tracker

spring.datasource.url=YOUR_DB_URL
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD

spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

jwt.secret=YOUR_SECRET_KEY
jwt.expiration=36000000
```

---

# Run Backend

```bash
mvn spring-boot:run
```

---

# Run Frontend

```bash
npm install
npm run dev
```

---

# Example Authorization Header

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# Key Learnings

* Implemented JWT-based stateless authentication using Spring Security.
* Built secure multi-user REST APIs with resource ownership validation.
* Integrated React frontend with protected backend APIs using Axios interceptors.
* Implemented searching, filtering, sorting, pagination, and CRUD operations.
* Managed CORS configuration for frontend-backend communication.
* Designed layered backend architecture using DTOs and service-repository pattern.
* Implemented validation and global exception handling for robust API responses.
* Deployed a production-style full-stack application using Render and Vercel.

---

# Future Improvements

* Docker Deployment
* Expense Analytics Dashboard
* Budget Management
* Export Features

---

# Author

Shashank Sinha
