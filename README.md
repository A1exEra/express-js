# Express.js Starter Project

A Node.js + Express.js web application with **MongoDB**, **Mongoose**, **Sessions**, and **EJS templating**.
Includes user authentication middleware, admin/shop routes, and persistent cart functionality.

---

## Features

- **Express.js** for routing and server handling
- **EJS** template engine for server-side rendering
- **MongoDB + Mongoose** for database and schema modeling
- **connect-mongodb-session** for session storage
- **dotenv** for environment variables
- **Body-parser** for handling form submissions
- **Cookie-parser** for reading cookies
- Basic **User** model with persistent cart
- Preloaded default user if none exists

---
### rm -rf node_modules package-lock.json
API key: 1fb720b97cc13e580c2c35e1138f90f8
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';
